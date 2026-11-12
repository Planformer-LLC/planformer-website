import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { leadOffer } from "@/data/siteData";
import { adminDb } from "@/lib/firebase-admin";
import { sendLeadAlert } from "@/lib/leadEmail";

export const runtime = "nodejs";

/** Firestore collection the popup writes to. One document per phone number. */
const COLLECTION = "website_leads";

const bodySchema = z.object({
  phone: z.string().trim().min(7).max(32),
  consent: z.literal(true),
  // Honeypot: hidden in the form, so only bots fill it in.
  company: z.string().max(0).optional(),
  page: z.string().max(500).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
});

/** US/Canada numbers become +1XXXXXXXXXX; "+"-prefixed numbers are kept as E.164. */
function toE164(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

// Light per-instance limit (App Hosting runs at most 2 instances).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Optional: also POST each lead to another server (set LEADS_WEBHOOK_URL). */
async function forwardLead(lead: Record<string, unknown>) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.LEADS_WEBHOOK_SECRET
          ? { "x-leads-secret": process.env.LEADS_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("Lead webhook responded", res.status);
  } catch (error) {
    console.error("Lead webhook failed", error);
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a few minutes." },
      { status: 429 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid phone number and accept the terms." },
      { status: 400 },
    );
  }

  const { phone, company, page, utm } = parsed.data;

  // Pretend success to bots so they don't retry.
  if (company) {
    return NextResponse.json({ ok: true, promoCode: leadOffer.promoCode });
  }

  const e164 = toE164(phone);
  if (!e164) {
    return NextResponse.json(
      { ok: false, error: "That doesn't look like a valid phone number." },
      { status: 400 },
    );
  }

  const lead = {
    phone: e164,
    offer: `${leadOffer.percentOff}% off yearly + 1-on-1 training`,
    promoCode: leadOffer.promoCode,
    source: "website_popup",
    page: page ?? null,
    utm: utm ?? {},
    smsConsent: true,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  };

  let isNew = true;
  let submissions = 1;
  try {
    const ref = adminDb.collection(COLLECTION).doc(e164);
    await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      isNew = !snap.exists;
      submissions = ((snap.get("submissions") as number | undefined) ?? 0) + 1;
      tx.set(
        ref,
        {
          ...lead,
          lastSubmittedAt: FieldValue.serverTimestamp(),
          submissions: FieldValue.increment(1),
          ...(snap.exists
            ? {}
            : {
                createdAt: FieldValue.serverTimestamp(),
                trainingStatus: "to_schedule",
              }),
        },
        { merge: true },
      );
    });
  } catch (error) {
    console.error("Saving lead failed", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await Promise.all([
    forwardLead({ ...lead, submittedAt: new Date().toISOString() }),
    sendLeadAlert({
      phone: e164,
      offer: lead.offer,
      promoCode: lead.promoCode,
      page: lead.page,
      utm: lead.utm,
      isNew,
      submissions,
    }),
  ]);

  return NextResponse.json({ ok: true, promoCode: leadOffer.promoCode });
}

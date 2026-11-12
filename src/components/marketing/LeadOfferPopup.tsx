"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, GraduationCap, Percent, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { leadOffer, pricingPlans, siteData } from "@/data/siteData";

const STORAGE_KEY = "pf_lead_offer";
const MEASUREMENT_ID = "G-SP5MVNQC49";

type Stored = { status: "claimed" } | { status: "snoozed"; until: number };

function readStored(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function writeStored(value: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode etc.): the popup just may show again.
  }
}

/** Formats US numbers as (555) 123-4567 while typing; leaves "+" numbers alone. */
function formatPhone(value: string): string {
  if (value.trim().startsWith("+")) return value;
  const d = value.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"]) {
    const v = params.get(key);
    if (v) utm[key] = v.slice(0, 200);
  }
  return utm;
}

const yearly = pricingPlans.find((p) => p.id === "yearly")!;
const discounted = (yearly.amount * (100 - leadOffer.percentOff)) / 100;
const discountedLabel = `$${discounted % 1 === 0 ? discounted : discounted.toFixed(2)}`;

export default function LeadOfferPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string>(leadOffer.promoCode);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const shown = useRef(false);

  const excluded =
    !leadOffer.enabled ||
    leadOffer.excludedPaths.some((p) => pathname?.startsWith(p));

  const show = useCallback(() => {
    if (shown.current) return;
    const stored = readStored();
    if (stored?.status === "claimed") return;
    if (stored?.status === "snoozed" && stored.until > Date.now()) return;
    shown.current = true;
    setOpen(true);
    window.gtag?.("event", "lead_popup_view", { send_to: MEASUREMENT_ID });
  }, []);

  // Open after a delay, or earlier when a desktop visitor heads for the tab bar.
  useEffect(() => {
    if (excluded) return;
    const timer = window.setTimeout(show, leadOffer.delaySeconds * 1000);
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [excluded, show]);

  const close = useCallback(() => {
    setOpen(false);
    if (status !== "done") {
      writeStored({
        status: "snoozed",
        until: Date.now() + leadOffer.snoozeDays * 24 * 60 * 60 * 1000,
      });
    }
  }, [status]);

  // Escape to close, lock page scroll, focus the field.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 150);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter your full phone number.");
      return;
    }
    if (!consent) {
      setError("Please check the box so we can text you your training invite.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          phone,
          consent: true,
          company,
          page: window.location.pathname,
          utm: readUtm(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        promoCode?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      if (data.promoCode) setPromoCode(data.promoCode);
      writeStored({ status: "claimed" });
      setStatus("done");
      window.gtag?.("event", "generate_lead", {
        send_to: MEASUREMENT_ID,
        lead_source: "website_popup",
      });
    } catch {
      setError("Couldn't connect. Check your connection and try again.");
      setStatus("idle");
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the code is still visible to copy by hand.
    }
  }

  if (excluded) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lead-offer"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-[460px] overflow-hidden rounded-t-[24px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:rounded-[24px]"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="bg-brand px-7 pt-8 pb-7 text-white">
              <p className="text-xs font-extrabold tracking-[0.16em] uppercase opacity-90">
                {status === "done" ? "You're in" : "You've unlocked"}
              </p>
              <h2 id={titleId} className="mt-2 text-[28px] leading-tight font-extrabold">
                {leadOffer.percentOff}% off the Yearly plan
                <br />+ a free 1-on-1 training session
              </h2>
            </div>

            <div className="px-7 pt-6 pb-7">
              {status === "done" ? (
                <div>
                  <p className="text-[15px] text-ink/80">
                    Use this code at checkout when you pick the Yearly plan:
                  </p>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="mt-3 flex h-14 w-full items-center justify-between rounded-xl border-2 border-dashed border-brand bg-[#F2F7FF] px-5 text-lg font-extrabold tracking-[0.12em] text-brand"
                  >
                    {promoCode}
                    <span className="flex items-center gap-1.5 text-xs font-bold tracking-normal">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" /> Copy
                        </>
                      )}
                    </span>
                  </button>
                  <p className="mt-4 text-[15px] text-ink/80">
                    We&apos;ll text you shortly to book your 1-on-1 training session.
                  </p>
                  <a
                    href={siteData.signupHref}
                    className="btn-primary mt-6 h-14 w-full text-base font-bold"
                  >
                    Start free trial
                  </a>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <ul className="space-y-2.5 text-[15px] text-ink/85">
                    <li className="flex gap-2.5">
                      <Percent className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                      <span>
                        Yearly for <strong className="text-ink">{discountedLabel}</strong>{" "}
                        <span className="text-ink/50 line-through">{yearly.price}</span> in your first year
                      </span>
                    </li>
                    <li className="flex gap-2.5">
                      <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                      <span>A free 1-on-1 session to get your first takeoff done</span>
                    </li>
                  </ul>

                  <label htmlFor="lead-phone" className="mt-6 block text-sm font-semibold text-ink">
                    Your phone number
                  </label>
                  <input
                    ref={inputRef}
                    id="lead-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="mt-2 h-14 w-full rounded-[10px] border border-transparent bg-[#F2F2F2] px-4 text-base outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
                  />

                  {/* Honeypot, hidden from people. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <label className="mt-4 flex cursor-pointer gap-2.5 text-[12px] leading-snug text-ink/60">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                    />
                    <span>
                      I agree to receive calls and texts from Planformer at this number,
                      including marketing messages. Consent isn&apos;t a condition of
                      purchase. Msg &amp; data rates may apply. Reply STOP to opt out. See our{" "}
                      <Link href="/privacy" className="underline underline-offset-2">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {error ? (
                    <p role="alert" className="mt-3 text-sm font-semibold text-[#C62828]">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary mt-5 h-14 w-full text-base font-bold disabled:opacity-60"
                  >
                    {status === "sending" ? "Unlocking…" : "Claim my discount"}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-3 w-full text-center text-sm text-ink/50 hover:text-ink/80"
                  >
                    No thanks
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

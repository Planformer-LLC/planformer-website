import { Resend } from "resend";
import { siteData } from "@/data/siteData";

type LeadAlert = {
  phone: string;
  offer: string;
  promoCode: string;
  page: string | null;
  utm: Record<string, string>;
  isNew: boolean;
  submissions: number;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

/** US numbers as (516) 404-6126; anything else stays in E.164. */
function prettyPhone(e164: string) {
  const m = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

/**
 * Emails a new popup lead to the team. Does nothing unless RESEND_API_KEY is
 * set, and never throws: a failed email must not fail the visitor's request.
 */
export async function sendLeadAlert(lead: LeadAlert) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = (process.env.LEADS_EMAIL_TO || siteData.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from =
    process.env.LEADS_EMAIL_FROM || "Planformer Website <leads@planformer.com>";

  const phone = prettyPhone(lead.phone);
  const subject = lead.isNew
    ? `New lead: ${phone} wants 1-on-1 training`
    : `Repeat lead: ${phone} submitted again (${lead.submissions}x)`;

  const utmRows = Object.entries(lead.utm)
    .map(([k, v]) => `<tr><td style="color:#767676;padding:2px 12px 2px 0">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  const html = `
<div style="font-family:Arial,sans-serif;color:#1A1A1A;font-size:15px;line-height:1.5">
  <p style="margin:0 0 4px;font-size:13px;color:#0F83FF;font-weight:bold;letter-spacing:.08em">WEBSITE POPUP LEAD</p>
  <p style="margin:0 0 16px;font-size:24px;font-weight:bold"><a href="tel:${lead.phone}" style="color:#1A1A1A;text-decoration:none">${escapeHtml(phone)}</a></p>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="color:#767676;padding:2px 12px 2px 0">Offer</td><td>${escapeHtml(lead.offer)}</td></tr>
    <tr><td style="color:#767676;padding:2px 12px 2px 0">Code shown</td><td>${escapeHtml(lead.promoCode)}</td></tr>
    <tr><td style="color:#767676;padding:2px 12px 2px 0">Page</td><td>${escapeHtml(lead.page ?? "-")}</td></tr>
    <tr><td style="color:#767676;padding:2px 12px 2px 0">Submissions</td><td>${lead.submissions}</td></tr>
    ${utmRows}
  </table>
  <p style="margin:20px 0 0">Text them to book the 1-on-1 training session, then set <b>trainingStatus</b> to <b>booked</b> in Firestore → website_leads.</p>
</div>`;

  const text = [
    `Website popup lead: ${phone}`,
    `Offer: ${lead.offer}`,
    `Code shown: ${lead.promoCode}`,
    `Page: ${lead.page ?? "-"}`,
    `Submissions: ${lead.submissions}`,
    ...Object.entries(lead.utm).map(([k, v]) => `${k}: ${v}`),
    "",
    "Text them to book the 1-on-1 training, then set trainingStatus to booked in Firestore -> website_leads.",
  ].join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject,
      html,
      text,
    });
    if (error) console.error("Lead email failed", error);
  } catch (error) {
    console.error("Lead email failed", error);
  }
}

import "server-only";

/**
 * Emails Andrew a copy of every lead the website's forms create, so he gets it
 * in his inbox directly instead of relying on IDX's notification email (IDX
 * does not always notify for leads added through its API).
 *
 * Settings (Vercel → Settings → Environment Variables, and .env.local):
 *   RESEND_API_KEY   Resend API key
 *   LEAD_TO_EMAIL    where leads go (default andrew.liberty@compass.com)
 *   LEAD_FROM_EMAIL  sender on a domain verified in Resend, e.g.
 *                    "Andrew Liberty Website <leads@andrewliberty.com>".
 *                    Until a domain is verified, Resend only allows
 *                    onboarding@resend.dev, and only to the Resend account's
 *                    own address.
 *
 * Never throws: a failed email must not fail the form, since the lead is
 * already in IDX. Failures are logged with the lead details.
 */

type LeadBody = Record<string, unknown>;

const clean = (v: unknown, max = 2000) =>
  String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function emailLead(lead: LeadBody, page?: string | null): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || "andrew.liberty@compass.com";
  const from = process.env.LEAD_FROM_EMAIL || "Andrew Liberty Website <onboarding@resend.dev>";

  const name = `${clean(lead.firstName, 100)} ${clean(lead.lastName, 100)}`.trim();
  const email = clean(lead.email, 200);
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", clean(lead.phone, 60)],
    ["Address", clean(lead.address, 300)],
    ["Message", String(lead.comments ?? "").trim().slice(0, 5000)],
    ["Page", clean(page, 500)],
    ["Received", new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }) + " (LA time)"],
  ].filter(([, v]) => v) as [string, string][];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  if (!key) {
    console.error(`[lead-email] RESEND_API_KEY is not set, lead not emailed:\n${text}`);
    return false;
  }

  const html =
    `<h2 style="font-family:Georgia,serif;color:#084446">New website lead</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#6a655c;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join("") +
    `</table><p style="font-family:Arial,sans-serif;font-size:12px;color:#6a655c">This lead is also saved in IDX Broker under Leads.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(email.includes("@") ? { reply_to: email } : {}),
        subject: `New website lead: ${name || email || "Andrew Liberty"}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`[lead-email] Resend refused (${res.status}): ${await res.text().catch(() => "")}\n${text}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead-email] send failed: ${String(err)}\n${text}`);
    return false;
  }
}

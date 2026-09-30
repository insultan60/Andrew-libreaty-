import crypto from "node:crypto";

/**
 * Service-account access tokens for the Google read APIs.
 *
 * Deliberately no `googleapis` dependency. That package is tens of megabytes
 * and carries clients for a hundred products this site will never call; this
 * file is the only thing actually needed from it — sign a JWT, swap it for an
 * access token — and Node ships the crypto to do it. This project has four
 * runtime dependencies and this keeps it at four.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
export const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Env vars are read lazily so a missing key is a dashboard message, not a build failure. */
export function serviceAccount(): { email: string; key: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !raw) return null;
  // Hosts that store secrets as single-line strings keep the newlines escaped;
  // the PEM parser needs them real.
  return { email, key: raw.replace(/\\n/g, "\n") };
}

// One token lasts an hour. Caching it keeps a dashboard refresh from doing a
// pointless extra round trip to Google every time.
const cache = new Map<string, { token: string; expires: number }>();

export async function accessToken(scope: string): Promise<string> {
  const hit = cache.get(scope);
  if (hit && hit.expires > Date.now() + 60_000) return hit.token;

  const sa = serviceAccount();
  if (!sa) throw new Error("Google service account is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({ iss: sa.email, scope, aud: TOKEN_URL, exp: now + 3600, iat: now }),
  );
  const signature = base64url(
    crypto.sign("RSA-SHA256", Buffer.from(`${header}.${claim}`), sa.key),
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cache.set(scope, { token: json.access_token, expires: Date.now() + json.expires_in * 1000 });
  return json.access_token;
}

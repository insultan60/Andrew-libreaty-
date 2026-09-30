/**
 * Shared between the Edge middleware and the Node route handler, so both use
 * Web Crypto rather than node:crypto — middleware has no access to the latter.
 *
 * The cookie holds a digest of the password, never the password itself, so a
 * cookie lifted off a machine cannot be read back into the secret.
 */

export const DASHBOARD_COOKIE = "al_dash";

export async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`andrew-liberty-dashboard:v1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Length-independent compare, so a wrong guess does not leak how wrong it was. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

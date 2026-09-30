import { NextResponse } from "next/server";
import { DASHBOARD_COOKIE, safeEqual, sessionToken } from "@/lib/dashboardAuth";

export async function POST(req: Request) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const form = await req.formData();
  const sent = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/dashboard");

  // Only ever redirect to a path on this site — an attacker-supplied ?next=
  // pointing at another origin would turn the login into an open redirect.
  // Sanitised BEFORE the failure branch, not after: the wrong-password
  // redirect carries ?next= straight back to the login form, so if only the
  // success path cleaned it the hostile value would survive a round trip and
  // arrive back here on the retry.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  if (!safeEqual(sent, password)) {
    const url = new URL("/dashboard/login", req.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", safeNext);
    return NextResponse.redirect(url, { status: 303 });
  }

  const res = NextResponse.redirect(new URL(safeNext, req.url), { status: 303 });
  res.cookies.set(DASHBOARD_COOKIE, await sessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}

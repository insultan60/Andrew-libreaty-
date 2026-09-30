import { NextResponse } from "next/server";
import { DASHBOARD_COOKIE } from "@/lib/dashboardAuth";

/**
 * POST only. A GET sign-out could be triggered by any <img> or link on another
 * site; a form POST from the dashboard's own button cannot be forged that way
 * because the cookie is SameSite=Lax.
 */
export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/dashboard/login", req.url), { status: 303 });
  res.cookies.set(DASHBOARD_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}

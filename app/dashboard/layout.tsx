import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./dashboard.css";

/**
 * Wraps every /dashboard route, the login page included, so both get the
 * stylesheet and neither can be indexed.
 *
 * noindex matters more than it looks. The middleware already refuses anyone
 * without the cookie, so a crawler cannot read the contents — but it can still
 * see the URL, and a redirect to a login form is a perfectly indexable page.
 * "Andrew Liberty dashboard sign in" is not a result this site wants.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return <div className="dash">{children}</div>;
}

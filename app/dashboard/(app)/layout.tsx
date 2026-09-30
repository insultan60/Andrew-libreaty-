import { Suspense, type ReactNode } from "react";
import { collectionStatus, ga4Status, gscStatus } from "@/lib/analytics/status";
import Sidebar from "../components/Sidebar";

/**
 * The shell every dashboard SECTION sits in.
 *
 * It lives in an (app) route group so that /dashboard/login — which must stay
 * reachable to anyone logged out — does not inherit the sidebar. A logged-out
 * visitor seeing a full navigation rail they cannot use would be a confusing
 * way to say "sign in".
 *
 * The status counts are read here rather than passed down, because the sidebar
 * badge should be right on every section without each one having to remember
 * to hand it over.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const sources = [collectionStatus(), ga4Status(), gscStatus()];
  const live = sources.filter((s) => s.state === "live").length;

  return (
    <div className="dash-root">
      {/* Suspense because the sidebar reads the range off the query string to
          carry it between sections. */}
      <Suspense fallback={<div className="dash-rail" />}>
        <Sidebar liveCount={live} total={sources.length} />
      </Suspense>

      <div className="dash-main">{children}</div>
    </div>
  );
}

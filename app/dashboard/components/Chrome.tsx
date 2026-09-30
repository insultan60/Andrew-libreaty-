import Link from "next/link";
import type { ReactNode } from "react";
import { RANGES } from "@/lib/analytics/load";

/**
 * The header every section shares: its name, the date range, and — when
 * something is not reporting — an unmissable note that the numbers below are a
 * setup state rather than a finding.
 */

export function SectionHead({
  title,
  lead,
  days,
  basePath,
  showRange = true,
}: {
  title: string;
  lead?: string;
  days: number;
  /** the route the range buttons should stay on */
  basePath: string;
  showRange?: boolean;
}) {
  return (
    <div className="dash-head">
      <div className="dash-head-text">
        <h1 className="dash-title">{title}</h1>
        {lead ? <p className="dash-lead">{lead}</p> : null}
      </div>

      {showRange ? (
        <nav aria-label="Date range" className="dash-ranges">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`${basePath}?range=${r}`}
              aria-current={r === days ? "page" : undefined}
              className={`dash-range${r === days ? " is-active" : ""}`}
            >
              {r} days
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

/**
 * Sits ABOVE the numbers, never below them: by the time someone has scrolled
 * past a row of zeros they have already drawn a conclusion from them, and
 * "nobody visited" and "nothing is measuring" are opposite conclusions that
 * would lead to opposite decisions.
 */
export function NotLiveBanner({ collecting }: { collecting: boolean }) {
  return (
    <div className="dash-banner">
      <span aria-hidden="true" className="dash-banner-mark">
        !
      </span>
      <div>
        <p className="dash-banner-title">
          {collecting
            ? "Collecting, but not reporting yet"
            : "Every number here is zero because nothing is reporting to this page yet"}
        </p>
        <p className="dash-banner-body">
          {collecting
            ? "The tracking tag is recording visits, but the reporting credentials are incomplete, so this page cannot read them back."
            : "These zeros are a setup state, not a traffic finding. Analytics is also not retrospective — history starts the day a GA4 tag goes live, so nothing before then can be recovered."}{" "}
          <Link href="/dashboard/connections">Set it up</Link>
        </p>
      </div>
    </div>
  );
}

/** Wraps a section's body so every route has the same gutters and rhythm. */
export function Shell({ children }: { children: ReactNode }) {
  return <div className="dash-shell">{children}</div>;
}

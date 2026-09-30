import type { GaReport } from "@/lib/analytics/ga4";
import type { GscReport } from "@/lib/analytics/searchConsole";
import { SITE_PAGES } from "@/lib/analytics/sitePages";

/**
 * Zero-valued reports, so the dashboard renders its real layout before
 * anything is connected.
 *
 * Everything here is 0 or empty. Nothing is invented: the only non-empty part
 * is the page list, which is the site's actual routes reading zero, and the
 * date spine, which is the real calendar window. There are no sample numbers
 * anywhere on this page, because a plausible-looking fake number on an
 * analytics dashboard is worse than a blank — it gets screenshotted and
 * quoted, and by then nobody remembers it was a placeholder.
 */

/** The real dates for the window, so charts draw a proper axis at zero. */
function dateSpine(days: number, lagDays = 0): string[] {
  const out: string[] = [];
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - lagDays);
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function emptyGa(days: number): GaReport {
  return {
    totals: {
      activeUsers: 0,
      newUsers: 0,
      sessions: 0,
      screenPageViews: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
    },
    previousTotals: null,
    daily: dateSpine(days).map((date) => ({ date, users: 0, views: 0 })),
    topPages: SITE_PAGES.filter((p) => p.group !== "Internal")
      .slice(0, 12)
      .map((p) => ({ label: p.path, value: 0, secondary: 0 })),
    channels: ["Organic Search", "Direct", "Organic Social", "Referral", "Paid Search"].map(
      (label) => ({ label, value: 0 }),
    ),
    devices: ["desktop", "mobile", "tablet"].map((label) => ({ label, value: 0 })),
    cities: [],
  };
}

export function emptyGsc(days: number): GscReport {
  return {
    totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    previousTotals: null,
    queries: [],
    pages: [],
    daily: dateSpine(days, 2).map((date) => ({ date, clicks: 0, impressions: 0 })),
  };
}

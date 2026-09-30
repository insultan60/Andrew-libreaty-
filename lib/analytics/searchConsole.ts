import { GSC_SCOPE, accessToken } from "@/lib/analytics/googleAuth";

/**
 * Google Search Console — this is where "impressions" actually comes from.
 *
 * Worth being precise, because the two halves of the dashboard measure
 * different things and it is easy to read them as one:
 *   impressions = how often the site appeared in Google results
 *   clicks      = how often someone chose it from those results
 *   users       = who then arrived (GA4's side of the story)
 * Search Console also lags roughly two days behind, so its window is offset.
 */

export interface GscTotals {
  clicks: number;
  impressions: number;
  /** clicks / impressions */
  ctr: number;
  /** mean position in results */
  position: number;
}

export interface GscRow {
  label: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscReport {
  totals: GscTotals;
  previousTotals: GscTotals | null;
  queries: GscRow[];
  pages: GscRow[];
  daily: { date: string; clicks: number; impressions: number }[];
}

const API = "https://searchconsole.googleapis.com/webmasters/v3/sites";

export function gscConfigured(): boolean {
  return Boolean(process.env.GSC_SITE_URL);
}

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

type ApiRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

async function query(body: Record<string, unknown>): Promise<{ rows?: ApiRow[] }> {
  const site = process.env.GSC_SITE_URL;
  if (!site) throw new Error("GSC_SITE_URL is not set");
  const token = await accessToken(GSC_SCOPE);

  const res = await fetch(`${API}/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Search Console query failed (${res.status}): ${await res.text()}`);
  return res.json();
}

function toRow(r: ApiRow): GscRow {
  return {
    label: r.keys?.[0] ?? "(unknown)",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  };
}

function sum(rowsIn: ApiRow[]): GscTotals {
  const clicks = rowsIn.reduce((a, r) => a + (r.clicks ?? 0), 0);
  const impressions = rowsIn.reduce((a, r) => a + (r.impressions ?? 0), 0);
  // Position has to be weighted by impressions — a query seen once at rank 1
  // must not drag the average as hard as one seen a thousand times at rank 40.
  const weighted = rowsIn.reduce((a, r) => a + (r.position ?? 0) * (r.impressions ?? 0), 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weighted / impressions : 0,
  };
}

export async function fetchSearchConsole(days: number): Promise<GscReport> {
  // GSC data settles about two days late, so the window is shifted back rather
  // than showing a fresh but empty tail.
  const LAG = 2;
  const current = { startDate: isoDaysAgo(days + LAG), endDate: isoDaysAgo(LAG) };
  const previous = { startDate: isoDaysAgo(days * 2 + LAG), endDate: isoDaysAgo(days + LAG + 1) };

  const [daily, prevDaily, queries, pages] = await Promise.all([
    query({ ...current, dimensions: ["date"], rowLimit: 500 }),
    query({ ...previous, dimensions: ["date"], rowLimit: 500 }),
    query({ ...current, dimensions: ["query"], rowLimit: 15 }),
    query({ ...current, dimensions: ["page"], rowLimit: 12 }),
  ]);

  return {
    totals: sum(daily.rows ?? []),
    previousTotals: sum(prevDaily.rows ?? []),
    queries: (queries.rows ?? []).map(toRow),
    pages: (pages.rows ?? []).map(toRow),
    daily: (daily.rows ?? []).map((r) => ({
      date: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    })),
  };
}

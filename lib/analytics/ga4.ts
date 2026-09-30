import { GA_SCOPE, accessToken } from "@/lib/analytics/googleAuth";

/** Google Analytics 4 Data API — visitors, sessions and which pages they read. */

export interface GaTotals {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  screenPageViews: number;
  /** seconds */
  averageSessionDuration: number;
  bounceRate: number;
}

export interface GaRow {
  label: string;
  value: number;
  secondary?: number;
}

export interface GaReport {
  totals: GaTotals;
  previousTotals: GaTotals | null;
  daily: { date: string; users: number; views: number }[];
  topPages: GaRow[];
  channels: GaRow[];
  devices: GaRow[];
  cities: GaRow[];
}

const API = "https://analyticsdata.googleapis.com/v1beta";

export function ga4Configured(): boolean {
  return Boolean(process.env.GA4_PROPERTY_ID);
}

async function runReport(body: unknown) {
  const property = process.env.GA4_PROPERTY_ID;
  if (!property) throw new Error("GA4_PROPERTY_ID is not set");
  const token = await accessToken(GA_SCOPE);

  const res = await fetch(`${API}/properties/${property}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // Analytics is not worth a stale read, but it is worth not hammering the
    // API on every refresh; each page sets its own revalidate window.
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`GA4 report failed (${res.status}): ${await res.text()}`);
  return res.json();
}

type ApiRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };

function num(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function rows(json: { rows?: ApiRow[] }): ApiRow[] {
  return json.rows ?? [];
}

function toRows(json: { rows?: ApiRow[] }, withSecondary = false): GaRow[] {
  return rows(json).map((r) => ({
    label: r.dimensionValues?.[0]?.value ?? "(not set)",
    value: num(r.metricValues?.[0]?.value),
    secondary: withSecondary ? num(r.metricValues?.[1]?.value) : undefined,
  }));
}

const TOTAL_METRICS = [
  { name: "activeUsers" },
  { name: "newUsers" },
  { name: "sessions" },
  { name: "screenPageViews" },
  { name: "averageSessionDuration" },
  { name: "bounceRate" },
];

function readTotals(json: { rows?: ApiRow[] }): GaTotals {
  const m = rows(json)[0]?.metricValues ?? [];
  return {
    activeUsers: num(m[0]?.value),
    newUsers: num(m[1]?.value),
    sessions: num(m[2]?.value),
    screenPageViews: num(m[3]?.value),
    averageSessionDuration: num(m[4]?.value),
    bounceRate: num(m[5]?.value),
  };
}

/**
 * `days` is the window; the same window immediately before it is fetched too so
 * every headline number can carry a change against the comparable period
 * rather than a bare figure with no sense of direction.
 *
 * City rather than country for the geography breakdown. This is one agent
 * working Studio City, Sherman Oaks and the surrounding valley; "United
 * States, 98%" would be a true fact that tells nobody anything, whereas the
 * split between Studio City and Sherman Oaks is the question the site is
 * actually built around.
 */
export async function fetchGa4(days: number): Promise<GaReport> {
  const current = { startDate: `${days}daysAgo`, endDate: "today" };
  const previous = { startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo` };

  const [totals, prev, daily, pages, channels, devices, cities] = await Promise.all([
    runReport({ dateRanges: [current], metrics: TOTAL_METRICS }),
    runReport({ dateRanges: [previous], metrics: TOTAL_METRICS }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 8,
    }),
  ]);

  return {
    totals: readTotals(totals),
    previousTotals: readTotals(prev),
    daily: rows(daily).map((r) => ({
      date: r.dimensionValues?.[0]?.value ?? "",
      users: num(r.metricValues?.[0]?.value),
      views: num(r.metricValues?.[1]?.value),
    })),
    topPages: toRows(pages, true),
    channels: toRows(channels),
    devices: toRows(devices),
    cities: toRows(cities),
  };
}

import { fetchGa4, ga4Configured, type GaReport } from "@/lib/analytics/ga4";
import {
  fetchSearchConsole,
  gscConfigured,
  type GscReport,
} from "@/lib/analytics/searchConsole";
import { emptyGa, emptyGsc } from "@/lib/analytics/empty";
import {
  collectionStatus,
  ga4Status,
  gscStatus,
  type SourceStatus,
} from "@/lib/analytics/status";
import { SITE_PAGES, normalisePath } from "@/lib/analytics/sitePages";

/**
 * One loader for every dashboard section.
 *
 * Each section is its own route, so each one fetches independently. That is
 * cheaper than it looks: `revalidate` caches the rendered result for fifteen
 * minutes per route, so moving between sections does not re-query Google.
 */

export const RANGES = [7, 28, 90] as const;

export function readDays(range?: string): number {
  return RANGES.some((d) => String(d) === range) ? Number(range) : 28;
}

export interface Loaded<T> {
  data: T;
  live: boolean;
  error?: string;
}

/**
 * One source failing must not blank a page. A 403 on Search Console is no
 * reason to hide visitor numbers that loaded perfectly well, so each source is
 * fetched separately and its failure reported in place.
 */
async function load<T>(enabled: boolean, fn: () => Promise<T>, fallback: T): Promise<Loaded<T>> {
  if (!enabled) return { data: fallback, live: false };
  try {
    return { data: await fn(), live: true };
  } catch (e) {
    return { data: fallback, live: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export interface Dashboard {
  days: number;
  ga: Loaded<GaReport>;
  gsc: Loaded<GscReport>;
  sources: SourceStatus[];
  /** true when at least one source is not reporting */
  incomplete: boolean;
  /** a GA4 tag is confirmed in the container, so visits are being recorded */
  collecting: boolean;
}

export async function loadDashboard(range?: string): Promise<Dashboard> {
  const days = readDays(range);

  const [ga, gsc] = await Promise.all([
    load<GaReport>(ga4Configured(), () => fetchGa4(days), emptyGa(days)),
    load<GscReport>(gscConfigured(), () => fetchSearchConsole(days), emptyGsc(days)),
  ]);

  const sources = [collectionStatus(), ga4Status(ga.error), gscStatus(gsc.error)];

  return {
    days,
    ga,
    gsc,
    sources,
    incomplete: sources.some((s) => s.state !== "live"),
    collecting: sources[0].state === "live",
  };
}

export interface PageRow {
  path: string;
  views: number;
  users: number;
}

/**
 * Measured pages when GA4 is live; otherwise the site's real routes at zero,
 * which answers "what pages do we have" and makes the setup state obvious.
 * Paths are normalised on both sides so one page never appears twice under two
 * spellings of the same route.
 */
export function pageRows(ga: Loaded<GaReport>): PageRow[] {
  if (ga.live) {
    return ga.data.topPages.map((p) => ({
      path: normalisePath(p.label),
      views: p.value,
      users: p.secondary ?? 0,
    }));
  }
  const measured = new Map(
    ga.data.topPages.map((p) => [
      normalisePath(p.label),
      { views: p.value, users: p.secondary ?? 0 },
    ]),
  );
  return SITE_PAGES.filter((p) => p.group !== "Internal").map((p) => ({
    path: p.path,
    views: measured.get(p.path)?.views ?? 0,
    users: measured.get(p.path)?.users ?? 0,
  }));
}

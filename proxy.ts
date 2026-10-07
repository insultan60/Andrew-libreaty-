import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DASHBOARD_COOKIE, sessionToken } from "@/lib/dashboardAuth";

/**
 * This file does two unrelated jobs, and they live together because Next runs
 * exactly one proxy per app: retiring dead URLs from the previous site, and
 * gating /dashboard. They share nothing but this entry point, so each keeps
 * its own section below and the dashboard gate returns before the 410 logic is
 * ever consulted.
 */

/* ==========================================================================
   1. The dashboard gate
   ========================================================================== */

/**
 * Fail CLOSED: if DASHBOARD_PASSWORD is unset the route is refused outright
 * rather than served. An open analytics page publishes the site's traffic, its
 * best queries and its weakest pages to anyone who guesses the URL, so "not
 * configured yet" has to mean "nobody gets in", never "everybody does".
 *
 * /dashboard/login is deliberately let through — it is the way in, and gating
 * it would mean nobody could ever sign in. /api/dashboard/login is not under
 * this prefix at all, so it is never matched.
 */
async function dashboardGate(req: NextRequest): Promise<NextResponse | null> {
  const path = req.nextUrl.pathname;
  if (path === "/dashboard/login" || path.startsWith("/dashboard/login/")) return null;

  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return new NextResponse(
      "The dashboard is not configured. Set DASHBOARD_PASSWORD to enable it.",
      { status: 503, headers: { "content-type": "text/plain", "x-robots-tag": "noindex" } },
    );
  }

  const cookie = req.cookies.get(DASHBOARD_COOKIE)?.value;
  if (cookie && cookie === (await sessionToken(password))) return null;

  const loginUrl = new URL("/dashboard/login", req.url);
  loginUrl.searchParams.set("next", path);
  return NextResponse.redirect(loginUrl);
}

/* ==========================================================================
   2. Retired URLs
   --------------------------------------------------------------------------
 * Serves 410 Gone for the URL families carried over from the previous site.
 *
 * These paths are still being crawled and reported in Search Console, but
 * nothing on this site corresponds to them any more:
 *
 *   /properties, /properties/*        the old listing detail pages. This site
 *                                     uses /property/<slug> (singular) with an
 *                                     entirely different slug format, so the
 *                                     old URLs cannot be mapped across.
 *   /home-search/listings/*           the old IDX detail URLs, keyed by a feed
 *                                     id that is no longer in use.
 *   /home-search/auth/*               the old account flow.
 *   /neighborhoods/*                  the nested neighbourhood pages.
 *   /property/<slug>/...              anything deeper than one segment. A
 *                                     single-segment /property/<slug> is a
 *                                     live page again: featured listings live
 *                                     there (app/property/[slug]), sold ones at
 *                                     the root - see listingPath() in lib/idx.
 *                                     /property, /property/active and
 *                                     /property/sold are live listing pages
 *                                     and are held open in KEEP_EXACT below.
 *   /agent, /agent/*                  the old agent profile pages. Note this
 *                                     is distinct from /real-estate-agent-in-*,
 *                                     which are live - the prefix below is
 *                                     anchored at /agent/ so it cannot reach
 *                                     them.
 *
 * 410 rather than 404 on purpose: a 404 means "not found, maybe later", and
 * crawlers keep coming back to check. 410 means "deliberately gone", and
 * search engines drop the URL considerably faster.
 *
 * /neighborhoods/studio-city is deliberately absent from the notes above. It
 * has a permanent redirect in next.config.ts, and next.config redirects run
 * ahead of proxy in the routing chain, so that path is answered before it ever
 * reaches this file.
 */

/** Exact paths that are gone. */
const GONE_EXACT = new Set(["/properties", "/home-search/listings", "/agent"]);

/** Everything under these prefixes is gone. */
const GONE_PREFIXES = [
  "/properties/",
  "/home-search/listings/",
  "/home-search/auth/",
  "/neighborhoods/",
  "/agent/",
];

/**
 * Live pages that sit directly above a retired prefix. Listed explicitly so a
 * matcher that is looser than intended can never take a working page off the
 * site - the decision to serve 410 is made here, not by the matcher.
 */
const KEEP_EXACT = new Set([
  "/neighborhoods",
  "/home-search",
  "/property",
  "/property/active",
  "/property/sold",
]);

function isGone(pathname: string): boolean {
  // Trailing slashes arrive from old inbound links; treat /properties/ as
  // /properties rather than letting it fall through as a live path.
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (KEEP_EXACT.has(path)) return false;
  if (GONE_EXACT.has(path)) return true;
  // /property/<slug> is a live listing page; only deeper paths are retired.
  if (path.startsWith("/property/") && path.split("/").length > 3) return true;
  return GONE_PREFIXES.some((prefix) => path.startsWith(prefix));
}

const BODY = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page no longer available</title>
<style>
  :root { color-scheme: light; }
  body {
    margin: 0; min-height: 100svh;
    display: grid; place-items: center; padding: 24px;
    background: #f6f3ec; color: #17140f;
    font: 400 16px/1.6 ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
  }
  main { max-width: 32rem; text-align: center; }
  h1 { font-size: 1.5rem; font-weight: 500; margin: 0 0 12px; }
  p { margin: 0 0 28px; color: #5b554c; }
  .row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  a {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 13px 26px; border-radius: 999px;
    font-size: .92rem; font-weight: 600; text-decoration: none;
    border: 1px solid #D19852; background: #D19852; color: #fff;
  }
  a.secondary { background: transparent; color: #17140f; border-color: rgba(23,20,15,.16); }
</style>
</head>
<body>
  <main>
    <h1>This page is no longer available</h1>
    <p>It was part of an earlier version of this site and has been retired. The current listings and neighbourhood guides are below.</p>
    <div class="row">
      <a href="/home-search">Search homes</a>
      <a class="secondary" href="/neighborhoods">Neighborhoods</a>
    </div>
  </main>
</body>
</html>`;

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return (await dashboardGate(request)) ?? NextResponse.next();
  }

  if (isGone(request.nextUrl.pathname)) {
    return new NextResponse(BODY, {
      status: 410,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    });
  }
  return NextResponse.next();
}

/**
 * Narrow the paths proxy runs on. For the retired URLs this is a performance
 * filter only - isGone() above is what actually decides. `:path+` requires at
 * least one segment, so the live /neighborhoods and /home-search index pages
 * are not matched.
 *
 * For /dashboard it is load-bearing: this is what puts the gate in front of
 * every section. Everything else on this site stays static and never touches
 * an Edge function.
 */
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/properties",
    "/properties/:path+",
    "/home-search/listings",
    "/home-search/listings/:path+",
    "/home-search/auth/:path+",
    "/neighborhoods/:path+",
    "/agent",
    "/agent/:path+",
    "/property/:path+",
  ],
};

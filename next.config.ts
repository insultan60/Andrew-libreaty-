import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Keep the *.vercel.app deployment URL out of Google.
   *
   * Vercel gives every project a permanent <project>.vercel.app alias that
   * serves the exact same site as the real domain. Google found it, so
   * andrew-libreaty.vercel.app and andrewliberty.com are now two complete
   * copies of one site competing with each other — and since the vercel.app
   * host is the one Google discovered on its own, it can win the URL it picks
   * to show. Every page already carries a canonical pointing at
   * andrewliberty.com, but a canonical is a hint; this is not.
   *
   * Vercel sends X-Robots-Tag: noindex on PREVIEW deployments automatically.
   * It does not send it on the production alias, which is the one indexed
   * here, so it has to be set explicitly.
   *
   * Deliberately a header rather than a robots.txt rule. Disallowing the host
   * in robots.txt would stop Google fetching those URLs at all — and a URL it
   * cannot fetch is a URL whose noindex it never reads, so the pages would sit
   * in the index indefinitely as bare "no information available" results. The
   * page has to stay crawlable for the instruction on it to be obeyed.
   *
   * The match is anchored to .vercel.app and nothing else. That direction
   * matters: an unexpected Host header falls through as indexable, which is
   * recoverable, rather than accidentally noindexing andrewliberty.com, which
   * would take the whole site out of Google.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.*\\.)?vercel\\.app" }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /* /neighborhoods/studio-city was the last page on the old nested
         structure; the rest of the neighbourhoods already live at
         /real-estate-agent-in-*. It was in the sitemap, so search engines know
         it and people may have linked to it — a permanent redirect moves that
         standing to the replacement instead of dropping it on a 404. */
      {
        source: "/neighborhoods/studio-city",
        destination: "/real-estate-agent-in-studio-city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

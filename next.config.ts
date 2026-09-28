import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

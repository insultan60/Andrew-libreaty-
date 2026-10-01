import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ALL as ALL_POSTS } from "./blog/posts";
import { isPublished } from "./blog/bodies";
import { fetchRawListingsServer } from "@/lib/idxServer";

/**
 * Static routes only, as locations — no <lastmod>, <changefreq> or <priority>.
 *
 * Those three were dropped deliberately, and dropping them is a fix rather
 * than a simplification:
 *
 * - changefreq and priority are ignored by Google outright. They were only
 *   ever a hint, and they stopped being read years ago.
 * - lastmod IS read, but only while it stays honest. Every static route here
 *   used to carry `lastModified: now`, so each deploy told Google that all
 *   eighteen pages had just changed — including ones untouched for months.
 *   Google's documented response to a lastmod it finds unreliable is to stop
 *   trusting the site's lastmod altogether, so an inaccurate one is worse than
 *   none. The blog posts do have real authored dates and could carry a true
 *   lastmod; that is a deliberate open choice, not an oversight.
 *
 * Listing pages (/<address-slug>) come from the live IDX feed, the same
 * fifteen-minute cached copy the pages render from, so every URL listed here
 * is one the listing page will serve rather than 404. If IDX does not answer,
 * they are simply left out of that copy of the sitemap — an incomplete
 * sitemap beats one full of URLs that may 404.
 *
 * /my-search-portal is excluded on purpose: it is a signed-in area.
 *
 * The five neighbourhood landing pages and /property/sold are included. An
 * earlier list from the SEO consultant covered 11 URLs against the 25 this
 * site publishes and omitted exactly the pages built to rank for "real estate
 * agent in <neighbourhood>" — the ones with the most to lose from being left
 * out. The current list includes them.
 */
const ROUTES = [
  "/",
  "/property",
  "/home-search",
  "/neighborhoods",
  "/home-valuation",
  "/contact",
  "/team",
  "/team/andrew-liberty",
  "/testimonials",
  "/compass-concierge",
  "/blog",
  "/real-estate-agent-in-studio-city",
  "/real-estate-agent-in-sherman-oaks",
  "/real-estate-agent-in-hollywood-hills",
  "/real-estate-agent-in-laurel-canyon",
  "/real-estate-agent-in-valley-village",
  "/property/active",
  "/property/sold",
] as const;

export const revalidate = 900;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = (await fetchRawListingsServer()) ?? [];
  const listingSlugs = [...new Set(listings.map((raw) => raw.detailsUrlSlug.toLowerCase()))];

  return [
    ...ROUTES.map((path) => ({ url: `${SITE_URL}${path}` })),

    /* Only posts with an authored body. The rest render a "Coming Soon" stub
       and are noindex, so sitemapping them would be asking Google to crawl a
       URL we then tell it not to index. They reappear here automatically once
       isPublished() covers them. */
    ...ALL_POSTS.filter((post) => isPublished(post.slug)).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
    })),

    ...listingSlugs.map((slug) => ({ url: `${SITE_URL}/${slug}` })),
  ];
}

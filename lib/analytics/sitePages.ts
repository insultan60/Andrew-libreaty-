/**
 * Every public page on the site, with a human name.
 *
 * This exists so the pages panel has something true to show before analytics
 * is connected: the real routes, each reading zero, rather than invented rows
 * or an empty box. Once GA4 is live the measured list replaces it, and any
 * path GA4 reports that is not here still displays — the lookup only supplies
 * a nicer label, it never filters.
 *
 * The list is kept in step with app/sitemap.ts by hand, and deliberately so:
 * the two answer different questions. The sitemap is what Google should crawl,
 * which is why /my-search-portal and the IDX detail pages are absent from it.
 * This list is what exists and might be measured, so the portal appears here,
 * grouped as internal and excluded from the counts.
 */

export interface SitePage {
  path: string;
  name: string;
  group: "Core" | "Areas" | "Listings" | "Content" | "Internal";
}

export const SITE_PAGES: SitePage[] = [
  { path: "/", name: "Home", group: "Core" },
  { path: "/team", name: "The team", group: "Core" },
  { path: "/team/andrew-liberty", name: "Andrew Liberty", group: "Core" },
  { path: "/contact", name: "Contact", group: "Core" },
  { path: "/testimonials", name: "Testimonials", group: "Core" },
  { path: "/home-valuation", name: "Home valuation", group: "Core" },
  { path: "/compass-concierge", name: "Compass Concierge", group: "Core" },

  { path: "/neighborhoods", name: "Neighbourhoods", group: "Areas" },
  { path: "/real-estate-agent-in-studio-city", name: "Studio City", group: "Areas" },
  { path: "/real-estate-agent-in-sherman-oaks", name: "Sherman Oaks", group: "Areas" },
  { path: "/real-estate-agent-in-hollywood-hills", name: "Hollywood Hills", group: "Areas" },
  { path: "/real-estate-agent-in-laurel-canyon", name: "Laurel Canyon", group: "Areas" },
  { path: "/real-estate-agent-in-valley-village", name: "Valley Village", group: "Areas" },

  { path: "/property", name: "Properties", group: "Listings" },
  { path: "/property/active", name: "Active listings", group: "Listings" },
  { path: "/property/sold", name: "Sold listings", group: "Listings" },
  { path: "/home-search", name: "Home search", group: "Listings" },

  { path: "/blog", name: "The Journal", group: "Content" },
  {
    path: "/blog/tips-for-showing-your-house",
    name: "Tips for showing your house",
    group: "Content",
  },
  {
    path: "/blog/tips-to-sell-your-home-in-the-fall",
    name: "Tips to sell your home in the fall",
    group: "Content",
  },
  {
    path: "/blog/selling-a-house-as-is-in-california",
    name: "Selling a house as-is in California",
    group: "Content",
  },
  {
    path: "/blog/how-to-buy-a-duplex-in-los-angeles",
    name: "How to buy a duplex in Los Angeles",
    group: "Content",
  },

  { path: "/my-search-portal", name: "Saved search portal", group: "Internal" },
];

const BY_PATH = new Map(SITE_PAGES.map((p) => [p.path, p]));

/** Strips query and trailing slash so GA4 paths line up with the table above. */
export function normalisePath(raw: string): string {
  const noQuery = raw.split("?")[0].split("#")[0];
  if (noQuery.length > 1 && noQuery.endsWith("/")) return noQuery.slice(0, -1);
  return noQuery || "/";
}

/**
 * A readable name for a path.
 *
 * Individual listing pages are the one case worth handling beyond the table:
 * they are generated from IDX at request time, so there is no build-time slug
 * list to register and GA4 will report dozens of them. Naming them by shape
 * keeps the table legible instead of filling it with opaque MLS numbers.
 */
export function pageName(path: string): string {
  const clean = normalisePath(path);
  const known = BY_PATH.get(clean);
  if (known) return known.name;

  const listing = clean.match(/^\/property\/(.+)$/);
  if (listing) return `Listing — ${listing[1].replace(/-/g, " ")}`;

  return clean;
}

export const PUBLIC_PAGE_COUNT = SITE_PAGES.filter((p) => p.group !== "Internal").length;

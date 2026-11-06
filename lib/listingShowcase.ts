/**
 * Andrew's own write-up for a listing, shown on its detail page in place of
 * the MLS remarks. Keyed by the listing's slug (the end of its URL).
 *
 * Everything is optional. A listing with no entry still gets the full page:
 * the headline is built from its beds, type and area, and the MLS remarks
 * become a single "The Home" section.
 *
 * `title` may contain "\n" to break it over two lines, e.g.
 * "Architecture\n& Setting".
 *
 *   "1234-example-drive-los-angeles-90046": {
 *     headline: "A Private Mid-Century Retreat in Laurel Canyon",
 *     sections: [
 *       { title: "Architecture\n& Setting", body: ["First paragraph…", "Second…"] },
 *       { title: "Outdoor Living\n& Views", body: ["…"] },
 *     ],
 *   },
 */

export interface ShowcaseSection {
  title: string;
  body: string[];
}

export interface ShowcaseContent {
  headline?: string;
  sections?: ShowcaseSection[];
}

export const LISTING_SHOWCASE: Record<string, ShowcaseContent> = {};

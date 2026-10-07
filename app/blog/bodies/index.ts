import type { ComponentType } from "react";
import { slugify, TITLES } from "../posts";
import TipsForShowingYourHouse, { FAQS as TIPS_FAQS } from "./tips-for-showing-your-house";
import TipsToSellYourHomeInTheFall, { FAQS as FALL_FAQS } from "./tips-to-sell-your-home-in-the-fall";
import SellingAHouseAsIsInCalifornia, { FAQS as AS_IS_FAQS } from "./selling-a-house-as-is-in-california";
import HowToBuyADuplexInLosAngeles, { FAQS as DUPLEX_FAQS } from "./how-to-buy-a-duplex-in-los-angeles";
import MostAffordablePlacesToLiveInLosAngeles, { FAQS as AFFORDABLE_FAQS } from "./most-affordable-places-to-live-in-los-angeles";

/**
 * Slug -> article body.
 *
 * app/blog/[slug]/page.tsx renders whatever it finds here and falls back to the
 * "Coming Soon" stub when a slug is absent, so adding a post is: write the body
 * component, add the post to ../posts, add one line here.
 *
 * Keys come from slugify(TITLES.x) rather than literal strings so that renaming
 * an article in ../posts follows through to its body instead of quietly
 * orphaning it and reverting the page to a stub.
 */
export const BODIES: Record<string, ComponentType> = {
  [slugify(TITLES.tipsForShowing)]: TipsForShowingYourHouse,
  [slugify(TITLES.sellInFall)]: TipsToSellYourHomeInTheFall,
  [slugify(TITLES.sellAsIs)]: SellingAHouseAsIsInCalifornia,
  [slugify(TITLES.buyDuplexLA)]: HowToBuyADuplexInLosAngeles,
  [slugify(TITLES.affordableLA)]: MostAffordablePlacesToLiveInLosAngeles,
};

/**
 * Slug -> FAQ items, for posts that carry an FAQ section.
 *
 * The page emits these as FAQPage structured data. The same array is rendered
 * as visible copy inside the body component: Google treats schema whose answers
 * do not appear on the page as a violation, not merely a missed rich result,
 * so the two must come from one place.
 */
export const FAQS_BY_SLUG: Record<string, { q: string; a: string }[]> = {
  [slugify(TITLES.tipsForShowing)]: TIPS_FAQS,
  [slugify(TITLES.sellInFall)]: FALL_FAQS,
  [slugify(TITLES.sellAsIs)]: AS_IS_FAQS,
  [slugify(TITLES.buyDuplexLA)]: DUPLEX_FAQS,
  [slugify(TITLES.affordableLA)]: AFFORDABLE_FAQS,
};

/**
 * Whether a post has an authored body, as opposed to rendering the stub.
 *
 * This is the single source of truth for two SEO decisions that have to agree:
 * the stubs carry `noindex, follow` in app/blog/[slug]/page.tsx, and they are
 * left out of app/sitemap.ts. A stub has no content to rank, so indexing it
 * only puts a thin, near-duplicate page in front of Google; `follow` keeps the
 * crawl path through to the posts that do have content.
 *
 * Deriving it from BODIES means a post becomes indexable and sitemapped by the
 * act of being written, with nothing else to remember to flip.
 */
export const isPublished = (slug: string): boolean =>
  Object.prototype.hasOwnProperty.call(BODIES, slug);

export type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  img: string;
  slug: string;
  /**
   * SEO copy supplied with the article, when it differs from what the page
   * would otherwise build. `metaTitle` replaces the "<title> — The Liberty
   * Journal | Andrew Liberty Team" pattern outright; `metaDescription`
   * replaces the excerpt in the description and the social cards.
   *
   * These exist because the supplied copy is written for the SERP, where the
   * excerpt is written for the card on /blog. They are different jobs and the
   * same sentence rarely does both well.
   */
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
};

/**
 * Titles that something outside this file needs to identify a post by.
 *
 * app/blog/bodies keys its registry on slugify() of these, so a title edited
 * here follows through to the body lookup instead of silently orphaning it.
 */
export const TITLES = {
  tipsForShowing: "Tips for Showing Your House",
  sellInFall: "Tips to Sell Your Home in the Fall",
  sellAsIs: "Selling a House As-Is in California",
} as const;

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type RawPost = Omit<Post, "slug">;

/**
 * The Journal's first real article, and currently its only one.
 *
 * Everything that used to sit here and in POSTS_RAW was placeholder copy
 * written to populate the design. It was removed rather than left alongside
 * this: ten "Coming Soon" stubs around one genuine post reads as a site that
 * launched empty, and every one of them was a thin page Google would have been
 * asked to crawl.
 */
const FEATURED_RAW: RawPost = {
  category: "Selling Strategy",
  title: TITLES.tipsForShowing,
  /* Written for the card. The SERP copy supplied with the article is in
     metaDescription — it leads with the keyword, which is right for a search
     result and wrong for a card someone is browsing. */
  excerpt:
    "Clean, bright, clutter-free, and safe — how to get your home ready before buyers walk in, plus a 30-minute checklist you can reuse for every showing.",
  metaTitle: "Tips for Showing Your House | Sell With Confidence",
  metaDescription:
    "Tips for Showing Your House to make a strong first impression. Learn how to clean, declutter, stage, and prepare your home so buyers see its value.",
  date: "Sep 21, 2026",
  read: "9 min read",
  img: "/images/blog/tips-for-showing-your-house.webp",
  tags: ["Selling Strategy", "Home Showings", "Open House", "Seller Checklist"],
};

/**
 * Additional articles, beyond the featured one.
 *
 * This is the list /blog's filter-and-grid section and the article page's
 * "Continue Reading" rail read from; both hide themselves while it is empty,
 * and both came back on their own when the second article landed here.
 */
const POSTS_RAW: RawPost[] = [
  {
    category: "Selling Strategy",
    title: TITLES.sellAsIs,
    /* Written for the card; the SERP copy supplied with the article is in
       metaTitle / metaDescription below. */
    excerpt:
      "Selling as-is is legal in California, but your disclosure duties don't change. What you must tell buyers, the Los Angeles rules that catch sellers off guard, and how listing compares with a cash offer once fees are counted.",
    metaTitle: "Selling a House As-Is in California | LA Agent Guide",
    metaDescription:
      "Selling a house as-is in California? Learn what you must still disclose, how as-is sales are priced, and how cash and agent offers compare.",
    date: "Oct 2, 2026",
    /* About twice the length of the other two posts, so the label says so. */
    read: "17 min read",
    img: "/images/blog/selling-a-house-as-is-in-california.webp",
    tags: ["Selling Strategy", "As-Is Sales", "Seller Disclosures", "Cash Offers", "Los Angeles"],
  },
  {
    category: "Selling Strategy",
    title: TITLES.sellInFall,
    /* Written for the card, where someone is browsing and deciding whether to
       open it. The SERP copy supplied with the article is in metaDescription —
       it leads with the keyword, which is right for a search result and wrong
       here. See the note on Post.metaTitle above. */
    excerpt:
      "Shorter days, falling leaves, and busy holiday calendars change how a home shows. How to price, prepare, light, and photograph yours so autumn works in your favour.",
    metaTitle: "Tips to Sell Your Home in the Fall | Seller Guide",
    metaDescription:
      "Tips to Sell Your Home in the Fall with practical advice on pricing, repairs, staging, curb appeal, photos, and showings to attract buyers.",
    date: "Sep 23, 2026",
    /* Same label as the featured post: the two bodies are within ~1% of each
       other on word count, so a different number would just read as noise. */
    read: "9 min read",
    img: "/images/blog/tips-to-sell-your-home-in-the-fall.webp",
    tags: ["Selling Strategy", "Fall Market", "Home Staging", "Curb Appeal", "Seller Checklist"],
  },
];

const withSlug = (p: RawPost): Post => ({ ...p, slug: slugify(p.title) });

export const FEATURED: Post = withSlug(FEATURED_RAW);
export const POSTS: Post[] = POSTS_RAW.map(withSlug);
export const ALL: Post[] = [FEATURED, ...POSTS];

export const getPost = (slug: string): Post | undefined => ALL.find((p) => p.slug === slug);

/* `isPublished` used to live here as a hand-kept list of slugs. It now derives
   from the body registry instead — see isPublished() in app/blog/bodies. A post
   is published because it HAS an article, which is the fact the SEO rules
   actually care about; keeping a second list in step with the first was a bug
   waiting to happen. */

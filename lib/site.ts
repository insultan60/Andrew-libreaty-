/**
 * Site-level constants shared by metadata, sitemap, robots and JSON-LD.
 *
 * SITE_URL has to be absolute — canonical URLs, Open Graph images and the
 * sitemap are all meaningless as relative paths. NEXT_PUBLIC_SITE_URL still
 * overrides this if it is set in the deploy environment.
 *
 * The fallback used to be andrewlibertyteam.com, which does not resolve — no
 * DNS at all. And because NEXT_PUBLIC_SITE_URL is still not set in the deploy,
 * the fallback is what ships: every canonical tag and every sitemap entry on
 * the live site pointed at a dead host, telling Google the real pages were
 * duplicates of URLs that do not exist.
 *
 * It was then corrected to www on the belief that the apex redirects there.
 * That was backwards, and it was never measured — it came from the sitemap we
 * were sent rather than from the site. Checked against production:
 *
 *     https://andrewliberty.com/       -> 200
 *     https://www.andrewliberty.com/   -> 308  https://andrewliberty.com/
 *
 * and the same on /contact, /blog and /property. The APEX is canonical and www
 * redirects to it. So every canonical tag was naming a URL that immediately
 * redirects, and every sitemap entry was a redirect for Google to follow —
 * which is what Search Console reports as "Page with redirect".
 *
 * If the hosting is ever flipped to prefer www, this constant is the one place
 * to change, and it is worth re-running the two curls above rather than
 * trusting this comment.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrewliberty.com"
).replace(/\/$/, "");

export const SITE_NAME = "Andrew Liberty Team";

/** Absolute URL for a site-relative path. */
export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const AGENT = {
  name: "Andrew Liberty",
  legalName: "Andrew Ruric Liberty II",
  jobTitle: "REALTOR® · Certified Real Estate Negotiation Expert",
  licence: "CA DRE# 01965696",
  brokerage: "Compass California, Inc.",
  brokerageLicence: "CA DRE# 01991628",
  phone: "+1-310-709-0581",
  email: "andrew.liberty@compass.com",
  /**
   * `image` stays the portrait, not the logo.
   *
   * The supplied schema sets image and logo to the same /logo.png. That file is
   * 50x57px — below Google's documented 112x112 minimum for `logo`, and nowhere
   * near the high-resolution image it wants for `image` — so following it
   * literally would swap a valid 900x900 photo for one Google discards. The
   * portrait is also the more useful thing to show: `image` on a LocalBusiness
   * is the picture a searcher sees, and a 50px icon is not it.
   */
  image: "/images/andrew-liberty.jpg",
  /**
   * Was /logo.png, which at 50x57 fails the 112x112 minimum — meaning the logo
   * property has been silently ignored all along. This is the same mark at
   * 1024x533, which passes. /logo.png is still the favicon-scale asset and is
   * fine for that; it was only ever wrong as structured data.
   */
  logo: "/al-logo-lockup.png",
  /**
   * Identity profiles for the BUSINESS entity.
   *
   * Instagram points at the profile root rather than .../reels/: sameAs is an
   * identity claim — "this entity is that profile" — so it wants the profile,
   * not one tab inside it.
   *
   * Facebook was previously dropped here, because the first schema we were sent
   * omitted it and it was not clear whether that was a decision or an oversight.
   * The revised schema includes it, so it is back — that question is answered.
   */
  sameAs: [
    "https://www.instagram.com/iamandrewliberty",
    "https://www.linkedin.com/in/andrew-liberty-7768431a9",
    "https://www.youtube.com/@andrewlibertyrealestate",
    "https://www.facebook.com/andrew.liberty.90/",
    "https://www.compass.com/agents/andrew-liberty/",
  ],

  /**
   * The PERSON's profiles. Same list plus IMDb, which belongs to Andrew the
   * actor rather than to the brokerage practice — putting a filmography on a
   * RealEstateAgent node would be claiming the business is the credit.
   */
  personSameAs: [
    "https://www.imdb.com/name/nm5280936/",
    "https://www.instagram.com/iamandrewliberty",
    "https://www.youtube.com/@andrewlibertyrealestate",
    "https://www.linkedin.com/in/andrew-liberty-7768431a9",
    "https://www.facebook.com/andrew.liberty.90/",
    "https://www.compass.com/agents/andrew-liberty/",
  ],
} as const;

/**
 * The office address, matching what the Footer and Contact page display.
 * Google cross-checks PostalAddress against the address rendered on the page,
 * so these have to stay in sync with app/components/Footer.tsx and
 * app/contact/page.tsx.
 */
export const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "12001 Ventura Pl Ste 100",
  addressLocality: "Studio City",
  addressRegion: "CA",
  postalCode: "91604",
  addressCountry: "US",
} as const;

/**
 * Open hours in schema form, 08:00-19:00 every day.
 *
 * These mirror the "Monday - Sunday / 8:00 AM - 7:00 PM" copy in the Footer and
 * on the Contact page. The SEO brief we were sent listed 07:00-20:00 Mon-Sat
 * and 07:00-19:00 Sun, which contradicts the visible hours; the visible copy is
 * the one the client confirmed, and schema hours that disagree with the page get
 * discounted, so the page wins. If the real hours ever change, change the copy
 * in both components and this constant together.
 */
export const OPENING_HOURS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((dayOfWeek) => ({
  "@type": "OpeningHoursSpecification" as const,
  dayOfWeek,
  opens: "08:00",
  closes: "19:00",
}));

/**
 * Everywhere the team actually works, as schema areaServed place names.
 *
 * These are now written out in full rather than being built by appending
 * ", Los Angeles, CA" to a short name. That template produced "Pasadena, Los
 * Angeles, CA", and Pasadena is not in the city of Los Angeles — it is its own
 * incorporated city in LA County. A place name that does not exist is worse
 * than a vaguer one, because it is the string Google tries to resolve.
 */
export const AREAS_SERVED = [
  "Studio City, Los Angeles, CA",
  "Sherman Oaks, Los Angeles, CA",
  "Valley Village, Los Angeles, CA",
  "Hollywood Hills, Los Angeles, CA",
  "Laurel Canyon, Los Angeles, CA",
  "Pasadena, CA",
] as const;

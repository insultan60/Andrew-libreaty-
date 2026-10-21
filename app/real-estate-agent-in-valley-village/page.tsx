import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import GuideWhy, { type WhyPoint } from "../components/GuideWhy";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Valley Village neighbourhood guide, built to "Valley Village (desktop).pdf"
 * with the copy, tags and FAQ from the October 2026 content brief. As on
 * Studio City and Sherman Oaks, the Meet Andrew bio is replaced by three
 * proof points, which this brief places straight after Start Here.
 *
 * Hero photo: Alex Simpson on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-valley-village";
const AREA_SEARCH = "/home-search?area=valley-village";
const HERO = "/images/valley-village-hero.jpg";

const TITLE = "Real Estate Agent in Valley Village | Condos & Homes";
const DESCRIPTION =
  "Andrew Liberty is a Valley Village real estate agent for condos, townhomes, and ranch homes. Buy, sell, or invest with a buyer agent who knows the area.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    locale: "en_US",
    images: [{ url: HERO, width: 2000, height: 1125, alt: "A quiet tree-lined residential street in Los Angeles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO],
  },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in Valley Village",
    body: "Need a buyer agent in Valley Village? I help you choose between a condo, a townhome, and a house, then negotiate with the right comparable sales behind you.",
    cta: "Browse Valley Village homes",
    href: AREA_SEARCH,
  },
  {
    tag: "Selling",
    title: "Selling in Valley Village",
    body: "Planning to sell a house in Valley Village? I start with a free valuation built on sales from your block or building, then plan the listing around your likely buyers.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in Valley Village",
    body: "Duplexes and small apartment buildings sit near the boulevards. I study rents, rules, and repair costs before you commit.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const WHY: WhyPoint[] = [
  { icon: "building", title: "Knows both kinds of buildings", text: "Condos and houses play by different rules. I read HOA documents as closely as inspection reports, and I price houses by the block, not the boulevard." },
  { icon: "chart", title: "Prices each type on its own terms", text: "My start in commercial real estate taught me to separate what a building earns or costs from how it looks. That matters for condos, duplexes, and small apartment buildings." },
  { icon: "shake", title: "Negotiates with proof", text: "I am a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
];

const GLANCE = [
  ["Location", "A neighborhood in the City of Los Angeles, in the San Fernando Valley, north of Studio City and east of Sherman Oaks."],
  ["Primary ZIP", "91607. Streets near the edges can fall in 91401, 91423, 91601, or 91602, so I confirm the address first."],
  ["Key corridors", "Magnolia Boulevard, Burbank Boulevard, Laurel Canyon Boulevard, Riverside Drive, Whitsett Avenue, and Radford Avenue. The 101 freeway runs along the south edge and the 170 along the east."],
  ["Local character", "Tree-lined residential streets, a walkable Magnolia Boulevard core, and condo buildings along the main corridors."],
  ["Housing stock", "Single-story Spanish and ranch-style homes on residential streets. Condos, townhomes, and small apartment buildings line the boulevards."],
  ["Bordering areas", "Studio City, Sherman Oaks, and North Hollywood."],
];

const LIFESTYLE = [
  ["The Quiet Residential Streets", "Spanish and ranch-style homes sit on tree-lined streets with nice-size lots, away from the boulevards.", "buyers who want a calm street and a yard."],
  ["The Condo Corridors", "Condo and townhome buildings line the main boulevards, including Burbank Boulevard, Whitsett Avenue, and Radford Avenue.", "buyers who want less upkeep and easy access."],
  ["Magnolia Boulevard and the Village Core", "The Valley Village name began with a small post office on Magnolia Boulevard. Today the boulevard has cafes, shops, and services within walking distance of nearby homes.", "buyers who like to walk to errands."],
  ["Getting Around", "The 101 and 170 freeways frame the neighborhood, so Burbank, Hollywood, and downtown are close. Rush hour still slows both.", "commuters who test the route before they commit."],
  ["Schools and Families", "Colfax Charter Elementary, Burbank Boulevard Elementary, and private schools such as Oakwood and The Country School serve local families.", "families who confirm the school zone for each address."],
  ["Parks and Open Space", "Valley Village Park and the Tujunga Wash Greenway offer play areas and walking paths without leaving the neighborhood.", "buyers who want green space close to home."],
];

const HOME_TYPES = [
  ["Condos in Valley Village, CA", "Condo buildings line Burbank Boulevard, Whitsett Avenue, and Radford Avenue. Read the HOA documents, the reserves, and the rental rules before you offer."],
  ["Valley Village Townhomes", "Townhomes in Valley Village often give you more room than a condo, with shared walls and HOA dues. I compare each one with sales in the same complex."],
  ["Ranch-Style Houses", "Single-story Spanish and ranch homes sit on tree-lined streets, many on nice-size lots."],
  ["Duplexes and Small Apartment Buildings", "Small multifamily buildings sit near the boulevards. Rents, rules, and repair costs decide the return."],
  ["Remodels and New Builds", "Updated and newer homes sit beside original ones. The permit history shows what was done and how."],
];

const EVERYDAY = [
  ["Food and drink", "Dining and Errands", "Magnolia Boulevard has cafes, restaurants, and daily services. Burbank Boulevard and Laurel Canyon Boulevard add more shops close by."],
  ["Outdoors", "Parks in Valley Village", "Valley Village Park has a play area, picnic tables, and walking paths. The Tujunga Wash Greenway runs along the western edge."],
  ["Anchors", "Valley Village Schools", "LAUSD schools include Colfax Charter Elementary and Burbank Boulevard Elementary, and North Hollywood High School serves the area. Private options include Oakwood School, Valley Torah High School, and The Country School. Confirm the school for each address."],
  ["Getting around", "Getting Out of Town", "The 101 and 170 freeways meet the neighborhood at its edges, with Studio City and Sherman Oaks next door."],
];

const PROCESS = [
  ["Consultation", "We talk through your goals, your budget, and whether a condo, a townhome, or a house fits."],
  ["Strategy", "You see which streets and buildings match."],
  ["Search or Pricing", "A short list of homes, or a price built on the right comparable sales."],
  ["Negotiation", "Offers backed by comps and, for condos, HOA findings."],
  ["Closing", "Escrow and inspections stay on schedule."],
  ["Ongoing", "You have an advisor for value and improvements after you close."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless. On our first consultation he spent almost two hours explaining the process end to end.",
  "My wife and I have a very high bar for anyone we work with, and without exception Andrew over-delivered. He understood our needs and thought creatively to find the right home in a competitive market.",
];

const FAQ_GROUPS: { label: string; items: { q: string; a: string }[] }[] = [
  {
    label: "Choosing an agent",
    items: [
      { q: "What does a real estate agent in Valley Village do?", a: "A Valley Village real estate agent prices and markets homes, negotiates offers, and guides you through escrow. Here, the job also means knowing the difference between condo buildings, townhomes, and single-family streets, and reading HOA documents as carefully as inspection reports." },
      { q: "How do I choose among real estate agents in Valley Village, CA?", a: "Ask whether the agent works condos and houses equally. Ask how they review HOA documents and which comparable sales they would use for your home. A good Valley Village Realtor answers with specifics, not slogans." },
      { q: "Do I need a buyer agent in Valley Village?", a: "It helps. A buyer agent in Valley Village reviews HOA finances, rental rules, and permit history before you commit, and negotiates when issues appear." },
    ],
  },
  {
    label: "Buying here",
    items: [
      { q: "Where can I find Valley Village homes for sale?", a: "Start with my home search page. It shows every active Valley Village listing, from condos to ranch homes, with live prices and photos. It also covers Valley Village houses for sale on the quiet residential streets, and I can send new listings as they appear." },
      { q: "Are there condos for sale in Valley Village?", a: "Yes, and they are a large part of the neighborhood. Valley Village condos for sale cluster along the main corridors, such as Burbank Boulevard, Whitsett Avenue, and Radford Avenue. Condos in Valley Village, CA come with HOA dues, so compare the monthly cost, not just the price." },
      { q: "Are there townhomes in Valley Village?", a: "Yes. Valley Village townhomes sit among the condo buildings and near the boulevards. Townhomes in Valley Village usually carry HOA dues, so I compare each one with recent sales in the same complex." },
      { q: "What should I check before buying a Valley Village condo?", a: "Read the HOA budget, the reserve fund, the rental rules, and any planned special assessments. Ask about parking and pet rules too. I will review these documents with you before you make an offer." },
    ],
  },
  {
    label: "Selling here",
    items: [
      { q: "What should I do first to sell a house in Valley Village?", a: "Start with a free valuation based on recent sales on your own block. Then plan repairs, photos, and timing around the buyers a Valley Village house attracts. I can walk you through each step in a short meeting." },
      { q: "How can I find my Valley Village home value?", a: "Look at sales from your own block or building, then adjust for condition and updates. Online estimates miss those details. A free personal review from me includes them." },
    ],
  },
];
const FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function ValleyVillagePage() {
  // Whole feed, not the area subset: AreaListings filters it, and shows three
  // of Andrew's other homes when the area has none.
  const listings = await fetchRawListingsServer();

  return (
    <div className="lcn-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Neighborhoods", item: abs("/neighborhoods") },
                { "@type": "ListItem", position: 3, name: "Valley Village", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: "Real Estate Agent in Valley Village | Andrew Liberty",
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              isPartOf: {
                "@type": "CollectionPage",
                "@id": `${abs("/neighborhoods")}#webpage`,
                url: abs("/neighborhoods"),
              },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Valley Village",
                serviceType: "Real estate agent",
                description:
                  "Buying, selling, and investment guidance for condos, townhomes, and houses in Valley Village, with pricing based on sales from your block or your building.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Valley Village",
                  description:
                    "A neighborhood in the City of Los Angeles, in the San Fernando Valley, with tree-lined residential streets of ranch homes and condo corridors along its main boulevards.",
                  image: abs("/images/sold-valley-village.jpg"),
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Valley Village",
                    addressRegion: "CA",
                    postalCode: "91607",
                    addressCountry: "US",
                  },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Valley_Village,_Los_Angeles",
                },
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="lcn-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lcn-hero-bg" src={HERO} alt="" aria-hidden="true" fetchPriority="high" />
        <div className="container lcn-hero-inner">
          <nav className="lcn-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Valley Village</span>
          </nav>
          <p className="lcn-eyebrow">Valley Village, Los Angeles</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Valley Village: <em>Condos to Ranch Homes</em>
          </h1>
          <p className="lcn-hero-sub">
            Valley Village packs quiet ranch-home streets and busy condo corridors into one small neighborhood. As
            a real estate agent in Valley Village, I help you buy, sell, or invest on the right side of that
            difference.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Valley Village Homes
            </Link>
            <Link href="/home-valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Home Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s Your Move in Valley Village?</h2>
            <p className="lcn-sub">Condo, townhome, or house? Pick where to begin.</p>
          </div>
          <div className="lcn-grid-3">
            {START.map((c) => (
              <a key={c.title} href={c.href} className="lcn-card lcn-card-accent lcn-start-card">
                <p className="lcn-tag">{c.tag}</p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="lcn-card-link">
                  {c.cta} <ArrowRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= WHY CHOOSE ANDREW ======================= */}
      <GuideWhy
        subline="Your Valley Village Realtor for condos, townhomes, and houses"
        intro="Valley Village is compact, and its housing is mixed. A condo on Burbank Boulevard and a ranch home two blocks away follow different rules and attract different buyers. Choosing a real estate agent in Valley Village means choosing someone who can speak to both."
        points={WHY}
        meetLink={false}
      />

      {/* ========================= AT A GLANCE ========================= */}
      <section className="lcn-section lcn-stone">
        <div className="container lcn-split">
          <div>
            <div className="lcn-head">
              <p className="lcn-eyebrow">Two Personalities</p>
              <h2 className="lcn-title">Valley Village Real Estate: Quiet Streets and Busy Corridors</h2>
              <p className="lcn-sub">
                Valley Village is small, but it does not live like one market. Where a home sits decides who buys
                it and what it is worth.
              </p>
            </div>
            <dl className="lcn-facts">
              {GLANCE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lcn-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sold-valley-village.jpg" alt="A home on a quiet Valley Village street" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ========================== LIFESTYLE ========================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Lifestyle</p>
            <h2 className="lcn-title">Living in Valley Village: Streets, Corridors, and Village Life</h2>
            <p className="lcn-sub">Six parts of daily life that shape what you buy.</p>
          </div>
          <div className="lcn-grid-3">
            {LIFESTYLE.map(([t, d, best], i) => (
              <div key={t} className="lcn-card lcn-step-card">
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <p className="lcn-best">
                  <strong>Best for:</strong> {best}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== HOME TYPES ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">What You Can Buy</p>
            <h2 className="lcn-title">Valley Village Condos for Sale, and What Else You Can Buy</h2>
            <p className="lcn-sub">
              Valley Village is a condo-friendly neighborhood. Most buyers start by choosing between a condo, a
              townhome, and a house.
            </p>
          </div>
          <div className="lcn-grid-3">
            {HOME_TYPES.map(([t, d]) => (
              <div key={t} className="lcn-card">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-ivory" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Valley Village Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              Browse Valley Village homes for sale from my MLS feed, from condos to single-family houses, with
              recent sales below. Looking for homes for sale in Valley Village, CA? Start with the live listings.
              Open any listing for photos, price, beds, baths, and square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="valley-village" place="Valley Village" />
        </div>
      </section>

      {/* ===================== COFFEE, PARKS, ERRANDS ===================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Around the Neighborhood</p>
            <h2 className="lcn-title">Coffee, Parks, and Errands in Valley Village</h2>
            <p className="lcn-sub">Where Valley Village eats, walks, and learns.</p>
          </div>
          <div className="lcn-grid-4">
            {EVERYDAY.map(([tag, t, d]) => (
              <div key={t} className="lcn-card">
                <p className="lcn-tag">{tag}</p>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">Six Steps From First Call to Closing</h2>
            <p className="lcn-sub">What you no longer have to worry about.</p>
          </div>
          <ol className="lcn-process">
            {PROCESS.map(([t, d], i) => (
              <li key={t}>
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================== TESTIMONIALS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Client Proof</p>
            <h2 className="lcn-title">What Clients Say About Working With Andrew</h2>
            <p className="lcn-sub">What it is like to work with Andrew, in clients’ words.</p>
          </div>
          <div className="lcn-grid-2">
            {QUOTES.map((q) => (
              <figure key={q} className="lcn-card lcn-quote">
                <blockquote>“{q}”</blockquote>
                <figcaption>Verified Client · Buyer</figcaption>
              </figure>
            ))}
          </div>
          <div className="lcn-after">
            <Link href="/testimonials" className="lcn-btn lcn-btn-outline">
              View All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* =========================== VALUATION =========================== */}
      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Free &amp; Confidential</p>
            <h2 className="lcn-title">Know Your Valley Village Home Value</h2>
            <p className="lcn-sub">
              Condos, townhomes, and houses each sell on different comparable sales, so one online estimate
              rarely fits. I review your home personally, using sales from your building or your block, and tell
              you what it is worth.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Based on your building or your block</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Valley Village" title="Get Your Free Valley Village Home Valuation" />
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Valley Village Real Estate Questions, Answered</h2>
            <p className="lcn-sub">Quick answers about choosing an agent, buying, selling, and the neighborhood.</p>
          </div>
          <div className="lcn-qa lcn-faq">
            {FAQ_GROUPS.map((g) => [
              <p key={g.label} className="lcn-faq-group">
                {g.label}
              </p>,
              ...g.items.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              )),
            ])}
          </div>
        </div>
      </section>

      {/* =========================== NEXT STEP =========================== */}
      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Buying or Selling in Valley Village?</h2>
              <p className="lcn-sub">
                Tell me whether you are looking at a condo, a townhome, or a house, and your timing. I’ll tell you
                what the market means for your next move. Free consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Valley Village Homes
              </Link>
              <Link href="/home-valuation" className="lcn-btn lcn-btn-outline-light">
                Get Your Home Value
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

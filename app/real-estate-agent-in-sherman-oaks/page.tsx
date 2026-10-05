import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { inArea } from "@/lib/areas";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Sherman Oaks neighbourhood guide, built to "Sherman Oaks (desktop).pdf".
 *
 * Copy is the design's. Its bracketed notes to Andrew — "Data as of [Month
 * Year]", "[replace with current MLS figures…]", "[confirm local places…]",
 * the third testimonial slot and the extra Meet Andrew line — stay off the
 * page until he supplies the real text.
 */

const PATH = "/real-estate-agent-in-sherman-oaks";
const HERO_IMG = "/images/sold-sherman-oaks.jpg";

const TITLE = "Real Estate Agent in Sherman Oaks | Knows the Boulevard";
const DESCRIPTION =
  "Sherman Oaks stretches from family streets to estates near the Boulevard. Andrew Liberty is a real estate agent in Sherman Oaks who knows both sides.";

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
    images: [{ url: HERO_IMG, alt: "Sherman Oaks, Los Angeles" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [HERO_IMG] },
};

/* The listings are rendered from the server-side IDX feed, cached for fifteen
   minutes in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 900;

const START = [
  {
    tag: "Buying",
    title: "Buying in Sherman Oaks",
    body: "Sherman Oaks has homes for every stage of life, from starter houses to estates south of the boulevard. Andrew helps you find the one that fits.",
    cta: "Start with the buyer guide",
    href: "#buyer-guide",
  },
  {
    tag: "Selling",
    title: "Selling in Sherman Oaks",
    body: "Good schools and tree-lined streets help homes sell, but pricing still matters. Andrew prices your home against sales in its own pocket.",
    cta: "Start with the seller guide",
    href: "#seller-guide",
  },
  {
    tag: "Investing",
    title: "Investing in Sherman Oaks",
    body: "Sherman Oaks holds steady demand from families and renters. Andrew runs the real numbers before he recommends any investment.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const SIDES = [
  {
    tag: "North of Ventura",
    title: "Flat streets with a classic Valley feel",
    facts: [
      ["Lots", "Standard lots near 6,750 square feet."],
      ["Homes", "1930s and 1940s ranches and traditional homes, plus remodels."],
      ["Feel", "Flat, grid-like streets with easy trips to the boulevard."],
      ["Good for", "First-time buyers and families who want a classic Valley home."],
    ],
  },
  {
    tag: "South of Ventura",
    title: "Hills, curves, and more privacy",
    facts: [
      ["Lots", "Larger lots, many on hillsides."],
      ["Homes", "Mid-century homes, new builds, and estates."],
      ["Feel", "Curving streets, cul-de-sacs, and mountain views."],
      ["Good for", "Buyers who want space, privacy, and views."],
    ],
  },
];

const GLANCE = [
  ["Location", "Central San Fernando Valley, City of Los Angeles. Ventura Boulevard runs east to west through the middle."],
  ["Primary ZIP", "91403 covers the central and southern core. Other ZIP codes include 91423, 91401, and 91411."],
  ["Key corridors", "Ventura Boulevard, Van Nuys Boulevard, Woodman Avenue, Sepulveda Boulevard, and Magnolia Boulevard. The 101 and 405 freeways meet here."],
  ["Local character", "A busy commercial spine along Ventura, calm family streets on the flats, and curving hillside streets to the south."],
  ["Housing stock", "Mostly single-family homes. Condos and townhomes sit near the boulevard and on the northern edge."],
  ["Bordering areas", "Studio City, Valley Village, Encino, and Van Nuys."],
];

const LIFESTYLE = [
  ["Ventura Boulevard Corridor", "Ventura Boulevard is the commercial spine. Homes within a short walk get easy dining and errands. They also hear more traffic."],
  ["The Flats North of Ventura", "Streets are flat and grid-like, with standard lots. Neighbors walk, bike, and play outside. Many families buy their first home here."],
  ["South of Ventura and the Estates", "Streets curve into the hills. Lots grow larger and views open up. Check road access and slope on hillside lots."],
  ["Commute and Connectivity", "The 101 and 405 freeways meet here. Trips to Burbank, downtown, and the Westside are easier than from many Valley areas. Rush hour still slows both."],
  ["Family Life and Schools", "Many families choose Sherman Oaks for its schools, parks, and quiet streets. Several schools rank well in LAUSD. Confirm the school for each address."],
  ["Outdoor Living", "Many homes have big yards for pools, play, and outdoor dining. South-side lots add views and privacy."],
];

const INVENTORY = [
  { tag: "Most common", title: "Ranches and Traditional Homes", body: "Single-story and two-story family homes from the 1930s to the 1950s, mostly on the flats.", check: "Roof, plumbing, and permits for added rooms." },
  { tag: "Entry point", title: "Condos and Townhomes", body: "Priced about $600,000 to $950,000. Found near the boulevard and on the northern edge.", check: "HOA fees, reserves, and rental limits." },
  { tag: "Character", title: "Mid-Century Homes", body: "Open plans, large windows, and indoor-outdoor living.", check: "Windows, wiring, and roof age." },
  { tag: "Updated", title: "Remodels and New Builds", body: "Modern finishes on both sides of the boulevard.", check: "Permits and the build quality behind the finish." },
  { tag: "Views", title: "Hillside Homes", body: "Curving streets south of the boulevard, with views and privacy.", check: "Retaining walls, drainage, geology, and parking." },
  { tag: "Upper tier", title: "Estates", body: "Large lots with mature trees and strong privacy.", check: "Comparable sales, lot lines, and privacy walls." },
];

const BUYER_QA: { q: string; a?: string; list?: string[]; wide?: boolean }[] = [
  { q: "Who does Sherman Oaks suit?", a: "Families, first-time buyers, and move-up buyers who want Valley space with quick freeway access." },
  { q: "What should buyers look for?", a: "Confirm the side of Ventura, the lot size, and the school for the exact address. Check permits for added rooms." },
  { q: "How much does location within Sherman Oaks matter?", a: "A lot. The side of Ventura, lot size, hillside, and street noise all change the price. Two homes a few blocks apart can sit in different markets." },
  {
    q: "What should you check before you make an offer?",
    list: [
      "Permit history with the city",
      "The school boundary for the exact address",
      "Noise from Ventura, Van Nuys Boulevard, and the freeways",
      "HOA documents, if the home is a condo",
      "Retaining walls and drainage on hillside lots",
      "Real comps from the same pocket",
    ],
  },
  { q: "What do buyers commonly overlook?", a: "Noise near the boulevard and freeways, small lots that limit additions, and condo fees.", wide: true },
];

const SELLER_STEPS = [
  ["How Sherman Oaks homes are valued", "Andrew places your home on the right side of the boulevard and in the right pocket."],
  ["Preparing for market", "Do work that pays back. Paint, landscaping, and fixes come first."],
  ["Pricing against real comps", "Price goes into the range buyers search. The first two weeks matter most."],
  ["Positioning and marketing", "Photos, video, and words that show lot size, schools, and walkability."],
  ["Evaluating offers", "Price is one term. Check the loan type, contingencies, and closing time."],
  ["Negotiation and closing", "Andrew, a Certified Real Estate Negotiation Expert, handles inspection requests, appraisal, and escrow."],
];

const SNAPSHOT = [
  ["$1.3M to $1.7M", "Typical median price", "Sources measure it differently, so figures vary."],
  ["$1.1M+", "Houses on the north flats", "Entry prices often start near this level."],
  ["$600K to $950K", "Condos and townhomes", "Found near the boulevard and on the northern edge."],
  ["26 to 58 days", "Time to sell", "Well-priced homes sell fastest."],
];

const POCKETS = [
  ["Flat streets north of Ventura", "$1.1M to $1.6M", "Original-condition ranches and family homes on smaller lots", "Families and first-time buyers"],
  ["Northern edge toward Van Nuys", "Condos about $500K to $950K. Some houses $1.1M to $1.3M", "Condos, townhomes, and 1950s remodels", "Buyers who want an entry point"],
  ["Streets just south of Ventura", "$1.2M to $2M+", "Family homes near boulevard dining and parks, such as on Longridge and Kester Avenues", "Buyers who want to walk to the boulevard"],
  ["Hillside streets and Royal Woods", "Often $2M and up", "Larger lots, mature trees, and estate-style homes", "Buyers who want space and privacy"],
];
const POCKET_COLS = ["Typical price", "What it buys", "Good for"];

const EVERYDAY = [
  ["Food and drink", "Dining", "Ventura Boulevard has restaurants and cafes along its whole length. Streets just south of it sit within walking distance."],
  ["Errands", "Shopping and Services", "Westfield Fashion Square and the boulevard cover shopping, groceries, and daily services."],
  ["Outdoors", "Parks and Recreation", "Sherman Oaks Park serves the flats. Santa Monica Mountains trails sit just above the south side."],
  ["Anchors", "Schools", "LAUSD serves most of Sherman Oaks. Private options include Notre Dame High School. Confirm the school for each address."],
];

const CREDENTIALS = [
  "REALTOR®",
  "Certified Real Estate Negotiation Expert (RENE)",
  "RealTrends Verified and Los Angeles Magazine Real Estate All-Star",
  "Residential, investment, and development",
];

const PROCESS = [
  ["Consultation", "Goals, timing, and options. No pressure."],
  ["Strategy", "Value, comps, and conditions first."],
  ["Search or Pricing", "A curated search, or a clear pricing plan."],
  ["Negotiation", "Certified skill at every point of leverage."],
  ["Closing", "Escrow, inspections, and paperwork handled."],
  ["Ongoing", "Advice on value long after closing."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions.",
];

const COMPARE = {
  cols: ["Sherman Oaks", "Studio City"],
  rows: [
    ["Recent median sale price", "About $1.35 million", "About $1.79 million"],
    ["Main appeal", "Two markets: flats and hills, with freeway access", "A walkable village and hillside streets"],
    ["Entry point", "Condos about $600K to $950K", "Condos and townhomes along Ventura"],
  ],
};

const NEARBY = [
  { coords: "Los Angeles · 91604", name: "Studio City", desc: "Just next door, with a walkable village and easy access to the Cahuenga Pass.", href: "/real-estate-agent-in-studio-city" },
  { coords: "Los Angeles · 91607", name: "Valley Village", desc: "Right around the corner, with quieter streets and the same easy Valley access.", href: "/real-estate-agent-in-valley-village" },
];

const FAQS = [
  { q: "What is Sherman Oaks known for?", a: "Sherman Oaks is known for Ventura Boulevard’s shops and restaurants, tree-lined family streets, hillside homes, and quick freeway access." },
  { q: "Where is Sherman Oaks?", a: "Sherman Oaks is a neighborhood in the central San Fernando Valley, in the City of Los Angeles. Ventura Boulevard runs through the middle." },
  { q: "What is the difference between north and south Sherman Oaks?", a: "North of Ventura has flat streets, smaller lots, and lower prices. South of Ventura has hillsides, larger lots, and higher prices. South-side streets are often called the Estates." },
  { q: "How much do homes cost in Sherman Oaks?", a: "Median prices run about $1.3 million to $1.7 million, depending on the source. Houses on the north flats often start near $1.1 million. Condos cost about $600,000 to $950,000." },
  { q: "What ZIP codes are in Sherman Oaks?", a: "The main ZIP codes are 91403, 91423, 91401, and 91411. The 91403 ZIP code covers the central and southern core." },
  { q: "Are the schools good in Sherman Oaks?", a: "Several Sherman Oaks schools rank well in LAUSD, and many families choose the area for them. Confirm the school for each address." },
  { q: "Is it easy to commute from Sherman Oaks?", a: "Yes, compared with many Valley areas. The 101 and 405 freeways meet here, so trips to Burbank, downtown, and the Westside are easier. Rush hour still slows both." },
  { q: "Is Sherman Oaks real estate a good investment?", a: "It can be. Demand from families and renters stays steady on both sides of the boulevard. Check rents, condo fees, and comps for each property." },
  { q: "Do condos make sense in Sherman Oaks?", a: "Yes, for buyers on a budget. Condos and townhomes cost about $600,000 to $950,000. Check HOA fees, reserves, and rental limits first." },
  { q: "Who is the best real estate agent in Sherman Oaks?", a: "Choose an agent with local comps and real negotiation skill. Andrew Liberty is a REALTOR®, a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function ShermanOaksPage() {
  // Only the Sherman Oaks subset goes to the client, not the whole feed.
  const feed = await fetchRawListingsServer();
  const listings = feed ? feed.filter((raw) => inArea(raw, "sherman-oaks")) : null;

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
                { "@type": "ListItem", position: 3, name: "Sherman Oaks", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO_IMG),
              about: { "@type": "Place", name: "Sherman Oaks, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Sherman Oaks, Los Angeles, CA" },
              url: abs(PATH),
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
      <section className="lcn-hero-split">
        <div className="container lcn-hero-split-inner">
          <div>
            <nav className="lcn-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/neighborhoods">Neighborhoods</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Sherman Oaks</span>
            </nav>
            <p className="lcn-eyebrow">Neighborhood Guide · Sherman Oaks</p>
            <h1 className="lcn-hero-title">
              Real Estate Agent in Sherman Oaks <em>Who Knows Both Sides of Ventura</em>
            </h1>
            <p className="lcn-hero-sub">
              Sherman Oaks is a central San Fernando Valley neighborhood in Los Angeles. Ventura Boulevard splits
              it into two markets. North of the boulevard, flat streets offer houses from about $1.1 million. South
              of it, hillside streets often cost more. Andrew Liberty helps people buy, sell, and invest on both
              sides.
            </p>
            <div className="lcn-ctas">
              <Link href="/home-search" className="lcn-btn lcn-btn-dark">
                Browse Sherman Oaks Homes
              </Link>
              <a href="#valuation" className="lcn-btn lcn-btn-outline">
                Get Your Home Value
              </a>
            </div>
          </div>
          <div className="lcn-photo lcn-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="A tree-lined residential street in Sherman Oaks" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s the Move in Sherman Oaks?</h2>
            <p className="lcn-sub">From flat family streets to hillside estates. Pick where to begin.</p>
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

      {/* ========================= AT A GLANCE ========================= */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Orientation</p>
            <h2 className="lcn-title">Sherman Oaks at a Glance</h2>
            <p className="lcn-sub">
              The short version first. Ventura Boulevard splits Sherman Oaks into two markets: flat streets to the
              north and hills to the south.
            </p>
          </div>
          <div className="lcn-sides">
            {SIDES.map((side, i) => (
              <div key={side.tag} className="lcn-side-wrap">
                {i === 1 && <p className="lcn-divide">Ventura Boulevard</p>}
                <div className="lcn-side">
                  <p className="lcn-tag">{side.tag}</p>
                  <h3>{side.title}</h3>
                  <dl>
                    {side.facts.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
          <dl className="lcn-facts lcn-facts-wide">
            {GLANCE.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ========================== LIFESTYLE ========================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Lifestyle</p>
            <h2 className="lcn-title">Living in Sherman Oaks: What to Know Before You Buy</h2>
            <p className="lcn-sub">How close a home sits to the boulevard shapes daily life more than square feet do.</p>
          </div>
          <div className="lcn-grid-3">
            {LIFESTYLE.map(([t, d], i) => (
              <div key={t} className="lcn-card lcn-step-card">
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== INVENTORY ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Inventory</p>
            <h2 className="lcn-title">What Can You Buy in Sherman Oaks?</h2>
            <p className="lcn-sub">Six kinds of homes. Each has its own buyers, its own pricing, and its own checks.</p>
          </div>
          <div className="lcn-grid-3">
            {INVENTORY.map((h) => (
              <div key={h.title} className="lcn-card lcn-card-accent">
                <p className="lcn-tag">{h.tag}</p>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
                <p>
                  <strong>Check:</strong> {h.check}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= BUYER GUIDE ========================= */}
      <section className="lcn-section lcn-ivory" id="buyer-guide">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Buyer Guide</p>
            <h2 className="lcn-title">Buying a Home in Sherman Oaks</h2>
            <p className="lcn-sub">Answers to find before you tour or write an offer.</p>
          </div>
          <div className="lcn-grid-2">
            {BUYER_QA.map((x) => (
              <div key={x.q} className={`lcn-card lcn-qa-card${x.wide ? " lcn-span-2" : ""}`}>
                <h3>{x.q}</h3>
                {x.a && <p>{x.a}</p>}
                {x.list && (
                  <ul className="lcn-bullets">
                    {x.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="lcn-after">
            <Link href="/home-search" className="lcn-btn lcn-btn-dark">
              Browse Sherman Oaks Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= SELLER GUIDE ========================= */}
      <section className="lcn-section lcn-stone" id="seller-guide">
        <div className="container lcn-seller">
          <div>
            <p className="lcn-eyebrow">Seller Guide</p>
            <h2 className="lcn-title">Selling a Home in Sherman Oaks</h2>
            <h3 className="lcn-seller-q">How do you price a Sherman Oaks home?</h3>
            <p className="lcn-sub">
              Andrew prices your home against sales in its own pocket, not the whole ZIP code. North-side flats and
              south-side hills use different comps.
            </p>
            <div className="lcn-ctas">
              <a href="#valuation" className="lcn-btn lcn-btn-dark">
                Get a Sherman Oaks Home Valuation
              </a>
            </div>
          </div>
          <ol className="lcn-steps">
            {SELLER_STEPS.map(([t, d], i) => (
              <li key={t}>
                <h3>
                  <span className="lcn-num-inline">{pad(i)}</span> {t}
                </h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================= MARKET SNAPSHOT ======================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market Snapshot</p>
            <h2 className="lcn-title">Sherman Oaks Market Snapshot</h2>
            <p className="lcn-sub">Numbers change by month and by source. Use them as a guide. Ask Andrew for current sales.</p>
          </div>
          <div className="lcn-grid-4">
            {SNAPSHOT.map(([v, l, d]) => (
              <div key={l} className="lcn-card lcn-stat">
                <p className="lcn-stat-value">{v}</p>
                <p className="lcn-stat-label">{l}</p>
                <p>{d}</p>
              </div>
            ))}
          </div>

          <h3 className="lcn-subhead">Typical prices by pocket</h3>
          <div className="lcn-table-wrap">
            <table className="lcn-table lcn-table-pockets">
              <thead>
                <tr>
                  <th scope="col">Pocket</th>
                  {POCKET_COLS.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {POCKETS.map(([pocket, ...cells]) => (
                  <tr key={pocket}>
                    <th scope="row">{pocket}</th>
                    {cells.map((c, i) => (
                      <td key={i} data-label={POCKET_COLS[i]}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lcn-note lcn-note-small">Sources: 2026 local market guides and Zillow data.</p>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Sherman Oaks Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              See homes on the market now, followed by recent sales. Select any home to view photos, price, beds,
              baths, and square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="sherman-oaks" place="Sherman Oaks" />
        </div>
      </section>

      {/* ========================= EVERYDAY LIFE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Everyday Life</p>
            <h2 className="lcn-title">Local Places and Daily Rhythm</h2>
            <p className="lcn-sub">The places people use week to week.</p>
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

      {/* ========================== MEET ANDREW ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container lcn-andrew lcn-andrew-flip">
          <div>
            <p className="lcn-eyebrow">Local Expertise</p>
            <h2 className="lcn-title">Meet Andrew Liberty</h2>
            <p className="lcn-license">
              Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
            </p>
            <p className="lcn-body">
              I work throughout Sherman Oaks, from family homes near the top school zones to the larger estates
              south of the Boulevard. I am a REALTOR® and a Certified Real Estate Negotiation Expert. I started in
              commercial real estate, so I check the numbers at every price point.
            </p>
            <p className="lcn-body">
              RealTrends Verified status and recognition as a Los Angeles Magazine Real Estate All-Star back up my
              negotiation skills. You do not have to take my word for it.
            </p>
            <ul className="lcn-bullets">
              {CREDENTIALS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="lcn-ctas">
              <Link href="/contact" className="lcn-btn lcn-btn-dark">
                Schedule a Consultation
              </Link>
              <Link href="/team" className="lcn-btn lcn-btn-outline">
                Meet the Team
              </Link>
            </div>
          </div>
          <div className="lcn-photo lcn-photo-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/andrew-liberty.jpg" alt="Andrew Liberty, Sherman Oaks real estate agent" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">How I Work With Clients</h2>
            <p className="lcn-sub">The same clear steps from first call to closing.</p>
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
            <h2 className="lcn-title">Know Your Sherman Oaks Home’s Value</h2>
            <p className="lcn-sub">
              A valuation built on your pocket and your side of the boulevard, not a citywide average. Andrew
              reviews the closest real sales and tells you what, if anything, is worth doing before you list.
            </p>
            <ul className="lcn-bullets">
              <li>Free and no obligation</li>
              <li>Based on real Sherman Oaks sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Sherman Oaks" title="Get Your Free Sherman Oaks Home Valuation" />
        </div>
      </section>

      {/* ========================== NEARBY AREAS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Nearby Areas</p>
            <h2 className="lcn-title">How Sherman Oaks Compares With Studio City</h2>
            <p className="lcn-sub">Sherman Oaks usually costs less than Studio City. Both sit on Ventura Boulevard.</p>
          </div>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <td />
                  {COMPARE.cols.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((c, i) => (
                      <td key={i} data-label={COMPARE.cols[i]}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lcn-note lcn-note-small">Median prices are from a May 2026 local market report.</p>
          <div className="lcn-grid-2">
            {NEARBY.map((n) => (
              <Link key={n.name} href={n.href} className="lcn-card lcn-nearby">
                <p className="lcn-tag">{n.coords}</p>
                <h3>{n.name}</h3>
                <p>{n.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Sherman Oaks Real Estate FAQ</h2>
            <p className="lcn-sub">Direct answers to what buyers and sellers ask most.</p>
          </div>
          <div className="lcn-qa lcn-faq">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== NEXT STEP =========================== */}
      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Buying or Selling in Sherman Oaks?</h2>
              <p className="lcn-sub">
                Start with a conversation about your side of the boulevard, your timing, and what the market means
                for you. Free consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href="/home-search" className="lcn-btn lcn-btn-light">
                Browse Sherman Oaks Homes
              </Link>
              <a href="#valuation" className="lcn-btn lcn-btn-outline-light">
                Get Your Home Value
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

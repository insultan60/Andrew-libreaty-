import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Valley Village neighbourhood guide, built to "Valley Village (desktop).pdf".
 *
 * Copy is the design's. Its bracketed notes to Andrew — "[Andrew: replace
 * with current MLS figures…]", "Data as of [Month Year]", "confirm local
 * places", the third testimonial slot and the extra Meet Andrew line — are
 * left off the page until he supplies the real text.
 *
 * Hero photo: Alex Simpson on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-valley-village";
const AREA_SEARCH = "/home-search?area=valley-village";
const HERO = "/images/valley-village-hero.jpg";

const TITLE = "Real Estate Agent in Valley Village | Quiet Streets Expert";
const DESCRIPTION =
  "Valley Village's quiet streets don't show up in a citywide search. Andrew Liberty is a real estate agent in Valley Village who knows every block.";

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

/* The listings are rendered from the server-side IDX feed, cached for fifteen
   minutes in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 900;

const START = [
  {
    tag: "Buying",
    title: "Buying in Valley Village",
    body: "Valley Village draws families for the schools and the quiet streets. Andrew helps you compare condos and houses, so you find a home that fits how you want to live.",
    cta: "Start with the buyer guide",
    href: "#buyer-guide",
  },
  {
    tag: "Selling",
    title: "Selling in Valley Village",
    body: "Good schools and tree-lined blocks are the biggest draw. Andrew prices your home on real Valley Village sales and markets it to the families looking for exactly that.",
    cta: "Start with the seller guide",
    href: "#seller-guide",
  },
  {
    tag: "Investing",
    title: "Investing in Valley Village",
    body: "Valley Village offers steady demand without the price of its flashier neighbors. Andrew runs the real numbers before he recommends any investment.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Southeast San Fernando Valley, City of Los Angeles. Roughly between Burbank Boulevard to the north and the Ventura Freeway to the south."],
  ["Primary ZIP", "91607. MLS records also use 91601, 91602, and 91401 for nearby streets."],
  ["Key corridors", "Magnolia Boulevard, Burbank Boulevard, Laurel Canyon Boulevard, and Coldwater Canyon Avenue."],
  ["Local character", "Quiet, tree-lined streets, walkable pockets, and small shops along Magnolia."],
  ["Housing stock", "A mix of condos, townhomes, single-family houses, and small apartment buildings."],
  ["Bordering areas", "Studio City, Sherman Oaks, North Hollywood, and Valley Glen."],
];

const LIFESTYLE = [
  ["Magnolia Boulevard and the Village Core", "Magnolia Boulevard is the commercial spine, with cafes, restaurants, and shops. Homes close to it are easy to walk from."],
  ["Quiet Single-Family Streets", "Many streets are calm and tree-lined, with 1940s and 1950s homes. Families like the quiet and the short drive to Studio City."],
  ["Condo and Townhome Corridors", "Buildings cluster along streets such as Burbank Boulevard, Whitsett Avenue, and Radford Avenue. They offer a lower price and low upkeep."],
  ["Walkability and Errands", "Walk Score is about 77, which is high for a Valley neighborhood. Many errands take a short walk. Outlying streets need a car."],
  ["Commute and Connectivity", "The 101 and 170 freeways sit nearby, so trips to Burbank, Hollywood, and downtown are short. Rush hour still slows the main boulevards."],
  ["Family Life and Schools", "Families choose Valley Village for its quiet streets and school options, including Colfax Charter Elementary. Confirm the school for each address."],
];

const INVENTORY = [
  { tag: "Entry point", title: "Condos and Townhomes", body: "Priced from about $600,000. Low upkeep and often close to Magnolia Boulevard.", check: "HOA fees, reserves, and rental limits." },
  { tag: "Most common", title: "Ranch and Traditional Homes", body: "Single-family homes from the 1940s and 1950s on quiet streets.", check: "Roof, plumbing, and permits for added rooms." },
  { tag: "Updated", title: "Remodels", body: "Move-in-ready homes that sell quickly when priced well.", check: "Permits and the quality behind the finish." },
  { tag: "Upper tier", title: "New Builds and Luxury Homes", body: "Some new homes on streets such as La Maida and Bellingham list above $3.5 million.", check: "Permits, comparable sales, and finish quality." },
  { tag: "Income", title: "Duplexes and Small Multi-Unit", body: "Several units on one lot, often near the condo corridors.", check: "Rents, rent rules, and repair costs." },
  { tag: "Larger income", title: "Apartment Buildings", body: "Larger buildings for investors who want more units.", check: "Rent roll, expenses, and rent rules." },
];

const BUYER_QA: { q: string; a: string; list?: string[] }[] = [
  { q: "Who does Valley Village suit?", a: "First-time buyers, young professionals, and families who want quiet streets and good schools close to Studio City, often at a lower price." },
  { q: "What should buyers look for?", a: "Check the exact street, the walkability, and the school for the address. Decide early between a condo and a house." },
  { q: "How much does location within Valley Village matter?", a: "A lot. A home near Magnolia Boulevard feels different from one on a quiet side street or beside a busy boulevard. Price per square foot also changes by building and street." },
  {
    q: "What should you check before you make an offer?",
    a: "Check these six items first:",
    list: [
      "Permit history with the city",
      "HOA documents, fees, and reserves, for condos",
      "The school boundary for the exact address",
      "Noise from the boulevards and freeways",
      "Rent rules, for older multi-unit buildings",
      "Real comps from the same street or building",
    ],
  },
  { q: "What do buyers commonly overlook?", a: "HOA fees and special assessments, parking limits, noise from the boulevards, and rent rules on multi-unit buildings." },
];

const SELLER_STEPS = [
  ["How Valley Village homes are valued", "Andrew starts with sales on your street or in your building. Then he adjusts for size, condition, and parking."],
  ["Preparing for market", "Do work that pays back. Paint, flooring, and landscaping help move-in-ready homes sell."],
  ["Pricing against real comps", "Price goes into the range buyers search. Updated homes get absorbed fast, so the first two weeks matter."],
  ["Positioning and marketing", "Photos, video, and words that show quiet streets, schools, walkability, and parking."],
  ["Evaluating offers", "Price is one term. Check the loan type, contingencies, and closing time."],
  ["Negotiation and closing", "Andrew, a Certified Real Estate Negotiation Expert, handles inspection requests, appraisal, and escrow."],
];

const SNAPSHOT = [
  ["$1.1M to $1.4M", "Typical median price", "Sources measure it differently. Houses alone run higher."],
  ["$600K+", "Condos and townhomes", "The usual entry point for buyers."],
  ["About 42 days", "To go pending", "Updated, well-priced homes go faster."],
  ["About 77", "Walk Score", "High for a Valley neighborhood. Outlying streets need a car."],
];

const EVERYDAY = [
  ["Food and drink", "Dining", "Magnolia Boulevard has cafes, restaurants, and small shops within a short walk of many homes."],
  ["Errands", "Shopping and Services", "Groceries and daily services sit along the main boulevards, a short drive from most streets."],
  ["Outdoors", "Parks and Recreation", "Small neighborhood parks, such as Weddington Park, offer play areas and green space."],
  ["Anchors", "Schools", "LAUSD serves Valley Village through four elementary zones, including Colfax Charter Elementary and Burbank Boulevard Elementary. Oakwood School is a private option. Confirm by address."],
];

const CREDENTIALS = [
  "REALTOR®",
  "Certified Real Estate Negotiation Expert (RENE)",
  "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars",
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
  cols: ["Valley Village", "Studio City", "Sherman Oaks"],
  rows: [
    ["Typical median price", "$1.1M to $1.4M", "About $1.8M", "$1.3M to $1.7M"],
    ["Main appeal", "Quiet streets and a walkable village feel", "A walkable village and hillside streets", "Two markets: flats and hills"],
    ["Entry point", "Condos from about $600K", "Condos and townhomes along Ventura", "Condos about $600K to $950K"],
  ],
};

const NEARBY = [
  { coords: "Los Angeles · 91604", name: "Studio City", desc: "Right next door, with a walkable village and a livelier pace.", href: "/real-estate-agent-in-studio-city" },
  { coords: "Los Angeles · 91403", name: "Sherman Oaks", desc: "Just around the corner, with Ventura Boulevard’s shops and restaurants close by.", href: "/real-estate-agent-in-sherman-oaks" },
];

const FAQS = [
  { q: "What is Valley Village known for?", a: "Valley Village is known for its quiet, tree-lined streets, strong schools, walkable pockets, and easy access to Studio City." },
  { q: "Where is Valley Village?", a: "Valley Village is a neighborhood in the southeast San Fernando Valley, in the City of Los Angeles. It sits between Studio City, Sherman Oaks, and North Hollywood." },
  { q: "How much do homes cost in Valley Village?", a: "Median prices run about $1.1 million to $1.4 million, depending on the source. Condos and townhomes start near $600,000. Single-family houses range from about $900,000 to $2.5 million and up." },
  { q: "What ZIP code is Valley Village?", a: "The main ZIP code is 91607. Some MLS records also use 91601, 91602, and 91401 for nearby streets." },
  { q: "Is Valley Village walkable?", a: "Yes. Walk Score is about 77, which is high for a Valley neighborhood. Most errands near Magnolia Boulevard take a short walk. Outlying streets need a car." },
  { q: "Are the schools good in Valley Village?", a: "Valley Village is known for strong schools, including Colfax Charter Elementary. LAUSD serves the area through four elementary zones, and Oakwood School is a private option. Confirm the school for each address." },
  { q: "Should I buy a condo or a house in Valley Village?", a: "Condos suit buyers who want a lower price and low upkeep. Houses suit buyers who want a yard and more room. Compare the full monthly cost, including HOA fees." },
  { q: "Is Valley Village a good place to invest?", a: "It can be. Condos, duplexes, and small apartment buildings give several ways in. Check rents, rent rules, and repair costs for each property." },
  { q: "Is it easy to commute from Valley Village?", a: "Yes, compared with many Valley areas. The 101 and 170 freeways sit nearby, so trips to Burbank, Hollywood, and downtown are short. Rush hour still slows the main boulevards." },
  { q: "Who is the best real estate agent in Valley Village?", a: "Choose an agent with local comps and real negotiation skill. Andrew Liberty is a REALTOR®, a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
];

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
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              about: { "@type": "Place", name: "Valley Village, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Valley Village, Los Angeles, CA" },
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
          <p className="lcn-eyebrow">Neighborhood Guide · Valley Village</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Valley Village <em>Who Knows Its Quiet Streets</em>
          </h1>
          <p className="lcn-hero-sub">
            Valley Village is a quiet, walkable neighborhood in the southeast San Fernando Valley, in the City of
            Los Angeles. It sits between Studio City, Sherman Oaks, and North Hollywood. Typical median prices run
            about $1.1 million to $1.4 million. Andrew Liberty helps people buy, sell, and invest here.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Valley Village Homes
            </Link>
            <a href="#valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Valley Village Home Value
            </a>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s the Move in Valley Village?</h2>
            <p className="lcn-sub">Quiet streets, strong schools, and a mix of homes. Pick where to begin.</p>
          </div>
          <div className="lcn-grid-3">
            {START.map((c) => (
              <a key={c.title} href={c.href} className="lcn-card lcn-start-card">
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
        <div className="container lcn-split">
          <div>
            <div className="lcn-head">
              <p className="lcn-eyebrow">Orientation</p>
              <h2 className="lcn-title">Valley Village at a Glance</h2>
              <p className="lcn-sub">
                The short version first. Valley Village is a small, quiet neighborhood where condos, townhomes,
                and single-family streets sit side by side.
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
            <h2 className="lcn-title">Living in Valley Village: What to Know Before You Buy</h2>
            <p className="lcn-sub">Your street and your building shape daily life more than square feet do.</p>
          </div>
          <ol className="lcn-rows">
            {LIFESTYLE.map(([t, d], i) => (
              <li key={t}>
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================== INVENTORY ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Inventory</p>
            <h2 className="lcn-title">What Can You Buy in Valley Village?</h2>
            <p className="lcn-sub">Six kinds of properties. Each has its own buyers, its own pricing, and its own checks.</p>
          </div>
          <div className="lcn-grid-2">
            {INVENTORY.map((h) => (
              <div key={h.title} className="lcn-card lcn-type-card">
                <p className="lcn-tag">{h.tag}</p>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                  <p>
                    <strong>Check:</strong> {h.check}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= BUYER GUIDE ========================= */}
      <section className="lcn-section lcn-ivory" id="buyer-guide">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Buyer Guide</p>
            <h2 className="lcn-title">Buying a Home in Valley Village</h2>
            <p className="lcn-sub">Answers to find before you tour or write an offer.</p>
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-dark">
              Browse Valley Village Homes
            </Link>
          </div>
          <div className="lcn-qa">
            {BUYER_QA.map((x) => (
              <div key={x.q}>
                <h3>{x.q}</h3>
                <p>{x.a}</p>
                {x.list && (
                  <ul>
                    {x.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SELLER GUIDE ========================= */}
      <section className="lcn-section lcn-stone" id="seller-guide">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Seller Guide</p>
            <h2 className="lcn-title">Selling a Home in Valley Village</h2>
            <p className="lcn-sub">Six steps. Each one shapes your final price.</p>
          </div>
          <div className="lcn-grid-3">
            {SELLER_STEPS.map(([t, d], i) => (
              <div key={t} className="lcn-card lcn-step-card">
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="lcn-after">
            <a href="#valuation" className="lcn-btn lcn-btn-dark">
              Get a Valley Village Home Valuation
            </a>
          </div>
        </div>
      </section>

      {/* ======================= MARKET SNAPSHOT ======================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market Snapshot</p>
            <h2 className="lcn-title">Valley Village Market Snapshot</h2>
            <p className="lcn-sub">Numbers change by month and by source. Use these as a guide. Ask Andrew for current sales.</p>
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
          <p className="lcn-note lcn-note-small">Sources: Redfin, Zillow, and 2026 local market guides.</p>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Valley Village Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              See homes on the market now, followed by recent sales. Select any home to view photos, price,
              beds, baths, and square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="valley-village" place="Valley Village" />
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
        <div className="container lcn-andrew">
          <div className="lcn-photo lcn-photo-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/andrew-liberty.jpg" alt="Andrew Liberty, Valley Village real estate agent" loading="lazy" />
          </div>
          <div>
            <p className="lcn-eyebrow">Local Expertise</p>
            <h2 className="lcn-title">Meet Andrew Liberty</h2>
            <p className="lcn-license">
              Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
            </p>
            <p className="lcn-body">
              I work throughout Valley Village, where good schools and quiet, tree-lined streets matter more to
              most buyers than anything flashy. I am a REALTOR® and a Certified Real Estate Negotiation Expert. I
              started in commercial real estate, so I analyze condos, multi-unit buildings, and houses with the
              same careful eye.
            </p>
            <p className="lcn-body">I explain each step in plain words. You always know what you are buying or selling.</p>
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
            <h2 className="lcn-title">Know Your Valley Village Home’s Value</h2>
            <p className="lcn-sub">
              A valuation built on your street or your building, not a citywide average. Andrew reviews the
              closest real sales and tells you what, if anything, is worth doing before you list.
            </p>
            <ul className="lcn-bullets">
              <li>Free and no obligation</li>
              <li>Based on real Valley Village sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Valley Village" title="Get Your Free Valley Village Home Valuation" />
        </div>
      </section>

      {/* ========================== NEARBY AREAS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Nearby Areas</p>
            <h2 className="lcn-title">How Valley Village Compares With Nearby Areas</h2>
            <p className="lcn-sub">Valley Village often costs less than Studio City and offers more condos than Sherman Oaks.</p>
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
          <p className="lcn-note lcn-note-small">Prices come from 2026 local market reports and differ by source.</p>
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
            <h2 className="lcn-title">Valley Village Real Estate FAQ</h2>
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
              <h2 className="lcn-title">Buying or Selling in Valley Village?</h2>
              <p className="lcn-sub">
                Start with a conversation about your street, your timing, and what the market means for you. Free
                consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Valley Village Homes
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

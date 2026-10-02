import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import ValuationForm from "./ValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { inArea } from "@/lib/areas";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Scoped to this page: every rule is under .lcn-page.
import "./laurel-canyon.css";

/**
 * Laurel Canyon neighbourhood guide, built to "Laurel Canyon (desktop).pdf".
 *
 * Copy is the design's. Its bracketed notes to Andrew — "[Andrew: replace
 * with current MLS figures…]", "Data as of [Month Year]", the third
 * testimonial slot and the extra Meet Andrew line — are left off the page
 * until he supplies the real text.
 */

const PATH = "/real-estate-agent-in-laurel-canyon";

const TITLE = "Real Estate Agent in Laurel Canyon | Every Home Unique";
const DESCRIPTION =
  "Andrew Liberty is a real estate agent in Laurel Canyon who knows these homes rarely compare to one another. Real comps, not guesswork.";

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
    images: [{ url: "/images/laurel-canyon.jpg", width: 900, height: 562, alt: "Laurel Canyon, Los Angeles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/laurel-canyon.jpg"],
  },
};

/* The listings are rendered from the server-side IDX feed, cached for fifteen
   minutes in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 900;

const START = [
  {
    tag: "Buying",
    title: "Buying in Laurel Canyon",
    body: "Most canyon homes sit back from the road on private, wooded lots. That makes prices hard to compare. Andrew shows you what a home is really worth before you make an offer.",
    cta: "Start with the buyer guide",
    href: "#buyer-guide",
  },
  {
    tag: "Selling",
    title: "Selling in Laurel Canyon",
    body: "Canyon buyers pay for privacy, character, and design, not only square feet. Andrew prices your home on real canyon sales and markets it to the right buyer.",
    cta: "Start with the seller guide",
    href: "#seller-guide",
  },
  {
    tag: "Investing",
    title: "Investing in Laurel Canyon",
    body: "Few homes come up for sale, and each one is different. Andrew checks rents, repair costs, and real sales before you decide.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Hollywood Hills West, City of Los Angeles. The canyon runs from Sunset Boulevard in the south to Ventura Boulevard in Studio City in the north."],
  ["ZIP code", "90046 for most of the canyon. Some blocks fall in 90069 or 91604, so check each address."],
  ["Main roads", "Laurel Canyon Boulevard and Mulholland Drive. Side streets include Wonderland Avenue, Kirkwood Drive, Willow Glen Road, Lookout Mountain Avenue, and Mount Olympus."],
  ["Character", "Wooded, quiet, and private. Narrow roads wind past old cabins and new modern homes."],
  ["Housing", "Mostly single-family homes, from cabins to mid-century to modern. Apartments are rare."],
  ["Price range", "Most character homes sell for about $1.2 million to $3 million. Larger compounds cost more."],
  ["Schools", "LAUSD. Wonderland Avenue Elementary and Gardner Street Elementary serve parts of the canyon. Confirm the school for each address."],
  ["Nearby", "Studio City, the Hollywood Hills, West Hollywood, the Sunset Strip, and Mount Olympus."],
];

const LIFESTYLE = [
  ["The Boulevard and the Country Store", "The Canyon Country Store at 2108 Laurel Canyon Boulevard dates to 1924. Locals treat it as the canyon’s town square. Homes near the boulevard are easy to reach. They also hear more traffic."],
  ["Wooded Side Streets", "Streets like Wonderland Avenue and Kirkwood Drive climb away from the boulevard. Homes sit among trees and feel private. Roads are narrow, and parking is tight."],
  ["Upper Canyon and the Ridge", "Near Mulholland Drive, lots get steeper and views open up. Check road access, slope, and walls before you fall for a view."],
  ["Parks and Nature", "Expect tall trees, wildlife, and quiet nights. Laurel Canyon Park, Fryman Canyon, and Wilacre Park offer trails and open space."],
  ["Commute and Getting Around", "Laurel Canyon Boulevard links Sunset and Ventura. Most errands need a car. Plan for slow traffic at rush hour."],
  ["Music and Creative Roots", "The canyon was home to the 1960s and 1970s folk-rock scene. Joni Mitchell, Frank Zappa, and members of the Doors and the Byrds all lived here. Today it still draws buyers who want quiet near Hollywood."],
];

const INVENTORY = [
  { tag: "Most common", title: "Cabins and Cottages", body: "Small, woodsy homes on private lots.", check: "Foundation, roof, drainage, and parking." },
  { tag: "Character", title: "Mid-Century Homes", body: "Glass walls, open plans, and indoor-outdoor living. A favorite of design-minded buyers.", check: "Old wiring, single-pane windows, and roof age." },
  { tag: "Classic", title: "Spanish Revival and Traditional", body: "Stucco walls, tile roofs, and arched doors.", check: "Plumbing, wiring, and permits for any additions." },
  { tag: "Design-led", title: "Modern and Architectural", body: "New builds and big remodels with clean lines and large windows.", check: "Build quality behind the finish, permits, and slope work." },
  { tag: "Views", title: "Hillside View Homes", body: "Steep lots with city or canyon views, often built in steps.", check: "Retaining walls, drainage, geology report, and road access." },
  { tag: "Upper tier", title: "Estates and Compounds", body: "Large lots with guest houses, gates, and privacy walls. Few sales match them closely.", check: "Road rights, comparable sales, and fire access." },
];

const BUYER_QA: { q: string; a: string; list?: string[] }[] = [
  { q: "Who does Laurel Canyon suit?", a: "Buyers who want privacy, trees, and character close to the city. It fits people who accept a car-based life and winding roads." },
  { q: "What should buyers look for?", a: "Look for safe road access, parking, a usable yard, and permits that match the home. On hillside lots, check walls and drainage." },
  { q: "How much does the road matter?", a: "A lot. Some homes sit on private roads with shared repair costs. Ask who owns the road and who pays for upkeep." },
  {
    q: "What should you check before you make an offer?",
    a: "Check these six items first:",
    list: [
      "Permit history with the city",
      "Fire rating and an insurance quote",
      "Slope, retaining walls, and drainage",
      "The road agreement, if the road is private",
      "A lender with canyon experience",
      "Real comps, including homes that sold and resold",
    ],
  },
  { q: "What do buyers often miss?", a: "Guest parking, steep driveways, insurance costs, and unpermitted rooms listed as finished space." },
];

const SELLER_STEPS = [
  ["How canyon homes are valued", "Andrew starts with the closest real sales. Then he adjusts for lot, privacy, views, road, and condition."],
  ["Preparing for market", "Do work that pays back. Clear brush, fix drainage, and refresh paint and landscaping."],
  ["Pricing against real comps", "Few canyon homes match. Andrew uses a wider set of sales and explains each choice."],
  ["Positioning and marketing", "Photos, video, and words that show privacy, setting, and design to the right buyer."],
  ["Evaluating offers", "Price is one term. Check the loan type, appraisal risk, and closing time. Steep lots and private roads can slow an appraisal."],
  ["Negotiation and closing", "Andrew, a Certified Real Estate Negotiation Expert, handles inspection requests, repairs, the appraisal, and escrow."],
];

const SNAPSHOT = [
  ["$2M to $3M+", "Median price range", "Public sources report different medians. Most fall in this range."],
  ["$1.2M to $3M", "Most character homes", "Larger canyon compounds sell for more."],
  ["18 to 67 days", "Time to sell", "Well-priced, updated homes sell fastest. A typical home takes longer."],
  ["About 34", "Walk Score", "Most errands need a car."],
];

const EVERYDAY = [
  ["Food and drink", "Dining", "The Canyon Country Store has a deli, wine, and pantry basics. Sunset Strip dining sits minutes south. Ventura Boulevard dining sits minutes north."],
  ["Errands", "Shopping and Services", "Small stores cover daily basics. Larger stores are a short drive away in West Hollywood or Studio City."],
  ["Outdoors", "Parks and Recreation", "Laurel Canyon Park, Fryman Canyon, and Wilacre Park offer trails and open space."],
  ["Anchors", "Schools", "LAUSD serves the canyon. Wonderland Avenue Elementary, a public gifted magnet school, and Gardner Street Elementary serve parts of it. Confirm by address."],
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
  cols: ["Laurel Canyon", "Studio City", "Hollywood Hills"],
  rows: [
    ["Typical price band", "$1.2M to $3M+", "$1.3M to $4M", "$3M and up (Bird Streets)"],
    ["Main appeal", "Privacy and a woodsy feel", "A walkable village and flat streets", "Big views and larger homes"],
    ["Getting around", "Car needed", "Walk to Ventura Boulevard", "Car needed"],
  ],
};

const NEARBY = [
  { coords: "Los Angeles · 91604", name: "Studio City", desc: "Down the canyon, with a walkable village and easy access to the Valley.", href: "/real-estate-agent-in-studio-city" },
  { coords: "Los Angeles · 90068", name: "Hollywood Hills", desc: "Just over the ridge, with sweeping views and homes that rarely come up.", href: "/real-estate-agent-in-hollywood-hills" },
];

const FAQS = [
  { q: "What is Laurel Canyon known for?", a: "Laurel Canyon is known for the 1960s and 1970s folk-rock music scene. Today it is known for quiet, wooded streets and private homes." },
  { q: "Where is Laurel Canyon?", a: "Laurel Canyon is a hillside neighborhood in Los Angeles. It sits mostly in ZIP code 90046, along Laurel Canyon Boulevard between Sunset and Ventura." },
  { q: "How much do homes cost in Laurel Canyon?", a: "Most character homes sell for about $1.2 million to $3 million. Larger compounds cost more. Public sources show median prices of about $2 million to $3 million." },
  { q: "Are Laurel Canyon homes at risk of wildfire?", a: "Some are. Risk changes by street, plants, and road access. Check the fire rating and get an insurance quote before you buy." },
  { q: "Are Laurel Canyon roads private or public?", a: "Both exist. Some homes sit on private roads with shared repair costs. Ask for the road agreement before you buy." },
  { q: "Is it hard to get a loan for a canyon home?", a: "Sometimes. Steep lots, private roads, and unusual builds can slow an appraisal. Work with a lender who knows canyon homes." },
  { q: "Why are canyon homes hard to price?", a: "Few homes match. Size, lot, privacy, and setting differ from house to house. Real comps and local knowledge matter most." },
  { q: "What schools serve Laurel Canyon?", a: "The Los Angeles Unified School District serves the canyon. Wonderland Avenue Elementary and Gardner Street Elementary serve parts of it. Confirm the school for each address." },
  { q: "Is Laurel Canyon a good place to invest?", a: "It can be. Few homes come up for sale, and each one is different. Check rents, repair costs, and comps on every property." },
  { q: "How is buying here different from Studio City or the Hollywood Hills?", a: "Laurel Canyon favors privacy and a woodsy feel. Studio City offers a walkable village. The Hollywood Hills often offer bigger views and higher prices." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function LaurelCanyonPage() {
  // Only the Laurel Canyon subset goes to the client, not the whole feed.
  const feed = await fetchRawListingsServer();
  const listings = feed ? feed.filter((raw) => inArea(raw, "laurel-canyon")) : null;

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
                { "@type": "ListItem", position: 3, name: "Laurel Canyon", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs("/images/laurel-canyon.jpg"),
              about: { "@type": "Place", name: "Laurel Canyon, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Laurel Canyon, Los Angeles, CA" },
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
        <img className="lcn-hero-bg" src="/images/laurel-canyon.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        <div className="container lcn-hero-inner">
          <nav className="lcn-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Laurel Canyon</span>
          </nav>
          <p className="lcn-eyebrow">Neighborhood Guide · Laurel Canyon</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Laurel Canyon <em>Where No Two Homes Match</em>
          </h1>
          <p className="lcn-hero-sub">
            Laurel Canyon is a wooded hillside neighborhood in Los Angeles, mostly in ZIP code 90046. Most homes
            are single-family. Many character homes sell for about $1.2 million to $3 million. Andrew Liberty
            helps people buy, sell, and invest here.
          </p>
          <div className="lcn-ctas">
            <Link href="/home-search" className="lcn-btn lcn-btn-light">
              Browse Canyon Homes
            </Link>
            <a href="#valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Canyon Home Value
            </a>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s the Move in Laurel Canyon?</h2>
            <p className="lcn-sub">Every canyon home is its own case. Pick where to begin.</p>
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
              <h2 className="lcn-title">Laurel Canyon at a Glance</h2>
              <p className="lcn-sub">
                The short version first. Laurel Canyon is a narrow canyon that links Sunset Boulevard to Ventura
                Boulevard. Steep land shapes almost everything about life and housing here.
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
            <img src="/images/sold-canyon-midcentury.jpg" alt="A mid-century home in the canyon" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ========================== LIFESTYLE ========================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Lifestyle</p>
            <h2 className="lcn-title">Living in Laurel Canyon: What to Know Before You Buy</h2>
            <p className="lcn-sub">Road, slope, and setting shape daily life here more than square feet do.</p>
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
            <h2 className="lcn-title">What Can You Buy in Laurel Canyon?</h2>
            <p className="lcn-sub">Six home styles. Each has its own buyers, its own pricing, and its own checks.</p>
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
          <p className="lcn-note">Condos and small apartment buildings are rare in the canyon.</p>
        </div>
      </section>

      {/* ========================= BUYER GUIDE ========================= */}
      <section className="lcn-section lcn-ivory" id="buyer-guide">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Buyer Guide</p>
            <h2 className="lcn-title">Buying a Home in Laurel Canyon</h2>
            <p className="lcn-sub">Answers to find before you tour or write an offer.</p>
            <Link href="/home-search" className="lcn-btn lcn-btn-dark">
              Browse Canyon Homes
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
            <h2 className="lcn-title">Selling a Home in Laurel Canyon</h2>
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
              Get a Laurel Canyon Home Valuation
            </a>
          </div>
        </div>
      </section>

      {/* ======================= MARKET SNAPSHOT ======================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market Snapshot</p>
            <h2 className="lcn-title">Laurel Canyon Market Snapshot</h2>
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
          <p className="lcn-note lcn-note-small">Sources: Redfin, Grey Square, and neighborhood data sites.</p>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Laurel Canyon Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              See homes on the market now, followed by recent sales. Select any home to view photos, price,
              beds, baths, and square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="laurel-canyon" place="Laurel Canyon" />
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
            <img src="/images/andrew-liberty.jpg" alt="Andrew Liberty, Laurel Canyon real estate agent" loading="lazy" />
          </div>
          <div>
            <p className="lcn-eyebrow">Local Expertise</p>
            <h2 className="lcn-title">Meet Andrew Liberty</h2>
            <p className="lcn-license">
              Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
            </p>
            <p className="lcn-body">
              I work throughout Laurel Canyon, where privacy, setting, and design matter as much as square feet.
              I am a REALTOR® and a Certified Real Estate Negotiation Expert. I started in commercial real
              estate, so I check the numbers behind every home, even ones with no clear comp.
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
            <h2 className="lcn-title">No Two Canyon Homes Are Alike. Know Yours.</h2>
            <p className="lcn-sub">
              Standard formulas miss what makes a canyon home special. Andrew looks at your home and the closest
              real sales. You get a real number, not a guess.
            </p>
            <ul className="lcn-bullets">
              <li>Free and no obligation</li>
              <li>Based on real canyon sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <ValuationForm />
        </div>
      </section>

      {/* ========================== NEARBY AREAS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Nearby Areas</p>
            <h2 className="lcn-title">How Laurel Canyon Compares With Nearby Areas</h2>
            <p className="lcn-sub">Laurel Canyon costs less than the Hollywood Hills and feels more private than Studio City.</p>
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
          <p className="lcn-note lcn-note-small">Price bands come from a 2026 Grey Square neighborhood guide.</p>
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
            <h2 className="lcn-title">Laurel Canyon Real Estate FAQ</h2>
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
              <h2 className="lcn-title">Buying or Selling in Laurel Canyon?</h2>
              <p className="lcn-sub">
                Start with a conversation about your road, your timing, and what the market means for you. Free
                consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href="/home-search" className="lcn-btn lcn-btn-light">
                Browse Canyon Homes
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

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
 * Hollywood Hills neighbourhood guide, built to "Hollywood Hills (desktop).pdf".
 *
 * Copy is the design's. Its bracketed notes to Andrew — "[Andrew: swap in
 * current MLS figures…]", "Data as of [Month Year]", "confirm local places",
 * the Homes.com sales note — are left off the page. The design's three
 * testimonial slots are all placeholders for Hollywood Hills quotes Andrew
 * has not supplied yet, so the section shows his two general client quotes
 * under a general heading rather than labelling them as Hills clients.
 *
 * Hero photo: Venti Views on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-hollywood-hills";
const AREA_SEARCH = "/home-search?area=hollywood-hills";
const HERO = "/images/hollywood-hills-hero.jpg";

const TITLE = "Real Estate Agent in Hollywood Hills | Knows Every View";
const DESCRIPTION =
  "Not all Hollywood Hills views are priced the same. Andrew Liberty, a real estate agent in Hollywood Hills, knows which holds value.";

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
    images: [{ url: HERO, width: 2000, height: 1171, alt: "The Hollywood Sign above the Hollywood Hills at sunset" }],
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
    title: "Buying in the Hollywood Hills",
    body: "Every home in the Hills is different. Andrew helps you find the right one and make a smart offer, view and all.",
    cta: "See the buyer guide",
    href: "#buyer-guide",
  },
  {
    tag: "Selling",
    title: "Selling in the Hollywood Hills",
    body: "Selling here means showing off the view and the design, not just the square footage. Andrew prices on the view and the lot, not a formula.",
    cta: "See the seller guide",
    href: "#seller-guide",
  },
  {
    tag: "Investing",
    title: "Investing in the Hollywood Hills",
    body: "Homes with strong views, unique architecture, and good access tend to hold their value. Andrew studies the numbers on each lot before he suggests any investment.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Hillside neighborhoods above Hollywood, in the Santa Monica Mountains, City of Los Angeles."],
  ["Primary ZIP", "90068. Parts of the Hills also fall in 90046 and 90069."],
  ["Key corridors", "Mulholland Drive, Nichols Canyon Road, Beachwood Drive, Laurel Canyon Boulevard, and Sunset Boulevard at the base."],
  ["Local character", "Winding streets, steep lots, and city views. Each canyon has its own feel."],
  ["Housing stock", "Spanish, mid-century, storybook, and modern homes. Condos sit near the base of Runyon and Beachwood Canyons."],
  ["Bordering areas", "Laurel Canyon, Studio City, West Hollywood, the Sunset Strip, and Griffith Park."],
];

const LIFESTYLE = [
  ["Beachwood Canyon and Hollywoodland", "Storybook cottages and stone homes sit near Griffith Park trails. The Hollywood Sign rises above the neighborhood."],
  ["Nichols Canyon", "A quiet road with large lots and a spring-fed creek. Mid-century and Spanish homes line the way. Runyon Canyon Park sits on its east side."],
  ["Outpost and Mount Olympus", "Outpost Estates and Mount Olympus, a 1960s planned community, offer private streets and city views."],
  ["Bird Streets and Sunset Plaza", "The Bird Streets are an ultra-luxury area with new view estates. Sunset Plaza puts dining and shops close by."],
  ["Streets and Getting Around", "Streets are steep and narrow, so you drive to nearly everything. Sunset Boulevard, Hollywood Boulevard, and the Cahuenga Pass link you to the rest of the city."],
  ["Nature and Privacy", "Expect trails, tall trees, wildlife, and quiet streets, all minutes from Hollywood."],
];

const INVENTORY = [
  { tag: "Classic", title: "Spanish and Traditional Homes", body: "Stucco walls, tile roofs, and arched doors on canyon streets.", check: "Plumbing, wiring, and permits for additions." },
  { tag: "Character", title: "Mid-Century and Architectural", body: "Post-and-beam frames, glass walls, and open plans. Nichols Canyon holds many.", check: "Original systems, windows, roof age, and records." },
  { tag: "Storybook", title: "Cottages in Beachwood Canyon", body: "Whimsical homes with rolled eaves, turrets, and stone walls.", check: "Foundation, wiring, and small floor plans." },
  { tag: "Design-led", title: "Contemporary and New Builds", body: "Clean lines and big windows, often on view lots.", check: "Build quality, permits, and city hillside rules." },
  { tag: "Entry point", title: "Condos and Older Mid-Rise", body: "1960s and 1970s buildings near the base of Runyon and Beachwood Canyons, about $600,000 to $1.2 million.", check: "HOA dues, reserves, and building age." },
  { tag: "Upper tier", title: "View Estates and Compounds", body: "Large lots with pools, guest houses, and privacy walls.", check: "Comparable sales, retaining walls, fire access, and insurance." },
];

const BUYER_QA: { q: string; a: string; list?: string[] }[] = [
  { q: "Who do the Hollywood Hills suit?", a: "Buyers who want views, privacy, and nature minutes from Hollywood. It fits people who accept steep roads and car trips." },
  { q: "What should buyers look for in the Hollywood Hills?", a: "Look for safe road access, parking, a usable flat yard, and views that will last. Make sure permits match the home." },
  { q: "How much does location within the Hills matter?", a: "A lot. Canyon, street, view, and road width all change the price. Two homes on the same street can differ widely in value based on view, lot, and access." },
  {
    q: "What should you check before an offer in the Hollywood Hills?",
    a: "Six items to confirm before you offer:",
    list: [
      "Permit history for additions and retaining walls",
      "Fire risk and an insurance quote",
      "Geology reports, retaining walls, and drainage",
      "Road width, parking, and who owns the road",
      "View easements and city hillside rules",
      "Real comps from the same canyon",
    ],
  },
  { q: "What do buyers commonly overlook in the Hollywood Hills?", a: "Insurance cost, steep driveways, limits on building size, and views that new houses or trees can block." },
];

const SELLER_STEPS = [
  ["How Hollywood Hills homes are valued", "Andrew starts with sales in your own canyon. Then he adjusts for the view, the lot, the road, and the design."],
  ["Preparing for market", "Do work that pays back. Clear brush, check walls and drainage, and refresh paint and landscaping."],
  ["Pricing against real comps", "Price lands in the band view buyers search. Updated homes with parking move fastest."],
  ["Positioning and marketing", "Buyers pay for the view, the design, and the lifestyle. Professional photos, video, and aerial views show them."],
  ["Evaluating offers", "Price is one term. Compare financing, contingencies, and closing time."],
  ["Negotiation and closing", "Andrew negotiates repairs, geology findings, and escrow terms."],
];

const SNAPSHOT = [
  ["$1.7M to $2.4M", "Typical median price", "Sources measure the Hills differently, so figures vary."],
  ["$600K to $1.2M", "Condos and older mid-rise", "Found near the base of Runyon and Beachwood Canyons."],
  ["50 to 59 days", "Average time to sell", "Well-positioned homes can sell in 18 to 28 days."],
  ["70 homes", "Sold in June 2026", "Down from 85 in June 2025."],
];

const EVERYDAY = [
  ["Food and drink", "Dining", "Beachwood Village and Sunset Plaza have cafes and restaurants. Hollywood and Sunset Boulevards sit minutes below the hills."],
  ["Errands", "Everyday Errands", "Groceries and daily services sit along the base of the hills, on Sunset, Hollywood, and Franklin."],
  ["Outdoors", "Hiking and Parks", "Runyon Canyon Park, Griffith Park, and Lake Hollywood Park offer trails and open space."],
  ["Anchors", "Schools", "LAUSD serves the Hills, and private and charter options exist. Confirm the school for each address."],
];

const CREDENTIALS = [
  "REALTOR®",
  "Certified Real Estate Negotiation Expert (RENE)",
  "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars",
  "Residential, investment, and development",
];

const PROCESS = [
  ["Consultation", "We talk about your goals, your timing, and what the view means to you."],
  ["Strategy", "I compare sales from your canyon and weigh the view, lot, and access."],
  ["Search or Pricing", "A search of view homes, or a price built on the view and the lot."],
  ["Negotiation", "Certified skill on price, repairs, and geology findings."],
  ["Closing", "Escrow, inspections, and reports handled."],
  ["Ongoing", "Advice on value and improvements long after closing."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions.",
];

const COMPARE = {
  cols: ["Hollywood Hills", "Laurel Canyon", "Studio City"],
  rows: [
    ["Typical price", "Median about $1.7M to $2.4M", "Character homes $1.2M to $3M+", "$1.3M to $4M"],
    ["Top of the market", "Bird Streets and estates, $4M to $20M+", "Large compounds above $3M", "Larger hillside and new-build homes"],
    ["Main appeal", "Views, privacy, and many different canyons", "Privacy and a woodsy feel", "A walkable village and flat streets"],
  ],
};

const NEARBY = [
  { coords: "Los Angeles · 90046", name: "Laurel Canyon", desc: "Just over the ridge, with the same quiet, tucked-away feel and even more privacy.", href: "/real-estate-agent-in-laurel-canyon" },
  { coords: "Los Angeles · 91604", name: "Studio City", desc: "Down the hill and a different pace entirely: walkable, lively, and close to everything.", href: "/real-estate-agent-in-studio-city" },
  { coords: "Los Angeles · 91403", name: "Sherman Oaks", desc: "A bit further into the Valley, but a market I work often enough to know well.", href: "/real-estate-agent-in-sherman-oaks" },
];

const FAQS = [
  { q: "What are the Hollywood Hills known for?", a: "The Hollywood Hills are known for city views, winding canyon roads, privacy, and homes that range from cottages to estates." },
  { q: "Where are the Hollywood Hills?", a: "The Hollywood Hills are hillside neighborhoods above Hollywood, in the Santa Monica Mountains. The main ZIP code is 90068. Parts also sit in 90046 and 90069." },
  { q: "How much do homes cost in the Hollywood Hills?", a: "Median prices run about $1.7 million to $2.4 million, depending on the source. Condos start near $600,000. View estates in the Bird Streets reach $20 million and up." },
  { q: "What are the main neighborhoods in the Hollywood Hills?", a: "They include Beachwood Canyon, Hollywoodland, Nichols Canyon, Outpost Estates, Mount Olympus, the Bird Streets, and Laurel Canyon." },
  { q: "Why do Hollywood Hills homes vary so much in price?", a: "Price depends on the view, lot access, privacy, and architectural style. Two homes on the same street can differ widely in value based on these factors alone." },
  { q: "Do I need a specialized agent for hillside properties?", a: "It helps. Hillside homes come with geology reports, access roads, and view easements that a general agent may not handle often. Local experience can prevent costly surprises." },
  { q: "Are Hollywood Hills homes at risk of wildfire?", a: "Some are. Fire risk depends on the street, the brush, and how fire trucks reach the home. Get a fire rating and an insurance quote first." },
  { q: "Can I build an addition on a hillside lot?", a: "Maybe. City hillside rules can limit how large a house can be. Ask for the permit history and check the rules before you plan an addition." },
  { q: "How long does it take to sell a home in the Hollywood Hills?", a: "It varies more than in flatland neighborhoods, since these homes appeal to a smaller buyer pool. Well-priced, well-marketed homes with strong views or architecture tend to move faster." },
  { q: "Who is the best real estate agent in the Hollywood Hills?", a: "Pick an agent with hillside experience and strong negotiation skill. Andrew Liberty is a Certified Real Estate Negotiation Expert, a REALTOR®, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function HollywoodHillsPage() {
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
                { "@type": "ListItem", position: 3, name: "Hollywood Hills", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              about: { "@type": "Place", name: "Hollywood Hills, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Hollywood Hills, Los Angeles, CA" },
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
            <span aria-current="page">Hollywood Hills</span>
          </nav>
          <p className="lcn-eyebrow">Neighborhood Guide · Hollywood Hills</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Hollywood Hills <em>Who Knows the Views and the Value</em>
          </h1>
          <p className="lcn-hero-sub">
            The Hollywood Hills are hillside neighborhoods above Hollywood, in the Santa Monica Mountains. Typical
            median prices run about $1.7 million to $2.4 million, and view estates cost far more. Andrew Liberty
            helps people buy, sell, and invest here, where views, privacy, and architecture matter as much as
            price.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Hollywood Hills Homes
            </Link>
            <a href="#valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Hollywood Hills Home Value
            </a>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s the Move in the Hollywood Hills?</h2>
            <p className="lcn-sub">Not all views are priced the same. Pick where to begin.</p>
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
              <h2 className="lcn-title">Hollywood Hills at a Glance</h2>
              <p className="lcn-sub">
                The short version first. The Hills are a set of canyons and ridges, and each one has its own feel
                and its own price.
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
            <img src="/images/hollywood-hills.jpg" alt="Hillside homes in the Hollywood Hills" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ========================== LIFESTYLE ========================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Lifestyle</p>
            <h2 className="lcn-title">Living in the Hollywood Hills: What to Know Before You Buy</h2>
            <p className="lcn-sub">Your canyon shapes daily life more than square feet do.</p>
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
            <h2 className="lcn-title">What Can You Buy in the Hollywood Hills?</h2>
            <p className="lcn-sub">Six kinds of homes, from storybook cottages to view estates.</p>
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
            <h2 className="lcn-title">Buying a Home in the Hollywood Hills</h2>
            <p className="lcn-sub">What to ask about views, roads, and permits before you offer.</p>
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-dark">
              Browse Hollywood Hills Homes
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
            <h2 className="lcn-title">Selling a Home in the Hollywood Hills</h2>
            <p className="lcn-sub">Six steps that shape what a view is worth at sale.</p>
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
              Get a Hollywood Hills Home Valuation
            </a>
          </div>
        </div>
      </section>

      {/* ======================= MARKET SNAPSHOT ======================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market Snapshot</p>
            <h2 className="lcn-title">Hollywood Hills Market Snapshot</h2>
            <p className="lcn-sub">
              Hills numbers swing by month, canyon, and source. Treat them as a guide, and ask Andrew for current
              sales.
            </p>
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
          <p className="lcn-note lcn-note-small">Sources: Redfin, Zillow, and 2026 local guides.</p>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Hollywood Hills Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              View homes for sale now, then recent sales. Open any listing for photos, price, beds, baths, and
              square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="hollywood-hills" place="Hollywood Hills" />
        </div>
      </section>

      {/* ========================= EVERYDAY LIFE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Everyday Life</p>
            <h2 className="lcn-title">Local Places in the Hollywood Hills</h2>
            <p className="lcn-sub">Where the Hills eat, hike, and run errands.</p>
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
            <img src="/images/andrew-liberty.jpg" alt="Andrew Liberty, Hollywood Hills real estate agent" loading="lazy" />
          </div>
          <div>
            <p className="lcn-eyebrow">Local Expertise</p>
            <h2 className="lcn-title">Meet Your Hollywood Hills Agent</h2>
            <p className="lcn-license">
              Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
            </p>
            <p className="lcn-body">
              I work throughout the Hollywood Hills, where every home is different, from architectural landmarks
              to hillside view lots. I am a REALTOR®, and I earned the Certified Real Estate Negotiation Expert
              designation. I started in commercial real estate, so I have a sharp eye for value on any property,
              luxury or otherwise.
            </p>
            <p className="lcn-body">
              I am hands-on and straightforward. I explain each step in plain words, so you feel confident whether
              you are buying your first home or investing in a luxury property.
            </p>
            <p className="lcn-body">
              My commercial real estate background helps me weigh value on landmark homes where comparable sales
              are thin.
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
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">How I Work With Hollywood Hills Clients</h2>
            <p className="lcn-sub">Six steps from first call to closing, built around the view.</p>
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
            <p className="lcn-eyebrow">Personal Review</p>
            <h2 className="lcn-title">Know Your Hollywood Hills Home’s Value</h2>
            <p className="lcn-sub">
              Automated estimates often get hillside homes wrong. Andrew reviews your property personally,
              factoring in the view, the lot, and what is actually selling nearby, so you get a number you can
              trust.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Built on the view, the lot, and nearby sales</li>
              <li>Reviewed personally by Andrew</li>
            </ul>
          </div>
          <GuideValuationForm place="Hollywood Hills" title="Get Your Free Hollywood Hills Home Valuation" />
        </div>
      </section>

      {/* ========================== NEARBY AREAS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Nearby Areas</p>
            <h2 className="lcn-title">How the Hollywood Hills Compare With Nearby Areas</h2>
            <p className="lcn-sub">The Hills offer more variety and bigger views. Laurel Canyon and Studio City usually cost less.</p>
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
          <p className="lcn-note lcn-note-small">Prices come from 2026 local market guides and differ by source.</p>
          <div className="lcn-grid-3">
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
            <h2 className="lcn-title">Hollywood Hills Real Estate FAQ</h2>
            <p className="lcn-sub">Quick answers about views, hillsides, and prices.</p>
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
              <h2 className="lcn-title">Buying or Selling in the Hollywood Hills?</h2>
              <p className="lcn-sub">
                Start with a conversation about your canyon, your timing, and what the market means for you. Free
                consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Hollywood Hills Homes
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

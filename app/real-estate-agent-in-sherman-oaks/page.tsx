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
 * Sherman Oaks neighbourhood guide, built to "Sherman Oaks (desktop).pdf",
 * with the copy, tags and FAQ from the October 2026 content brief
 * ("Content Optimisation Andrew Liberty", Sherman Oaks tab). As on Studio
 * City, the Meet Andrew bio is replaced by three proof points; the full bio
 * is one click away on his team page.
 */

const PATH = "/real-estate-agent-in-sherman-oaks";
const HERO_IMG = "/images/sold-sherman-oaks.jpg";

const TITLE = "Real Estate Agent in Sherman Oaks | Homes & Condos";
const DESCRIPTION =
  "Andrew Liberty is a Sherman Oaks real estate agent. Browse Sherman Oaks homes and condos, see recent sales, and get advice for both sides of Ventura.";

const IcPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const IcChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
);
const IcShake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
);

const WHY_POINTS = [
  {
    Icon: IcPin,
    title: "Local roots",
    text: "My office is on Ventura Place in Studio City, right next door. I work both sides of Ventura Boulevard in Sherman Oaks, from family homes on the flats to estates in the hills.",
  },
  {
    Icon: IcChart,
    title: "Clear numbers",
    text: "I started in commercial real estate, so I check the numbers at every price point and show you the comps behind every price.",
  },
  {
    Icon: IcShake,
    title: "Strong negotiation",
    text: "I am a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star.",
  },
];

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

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in Sherman Oaks",
    body: "Looking for a Sherman Oaks house, condo, or townhome? I show what your budget buys on each side of Ventura, then negotiate a fair price.",
    cta: "Browse Sherman Oaks homes",
    href: "/home-search?area=sherman-oaks",
  },
  {
    tag: "Selling",
    title: "Selling in Sherman Oaks",
    body: "Want to sell a house in Sherman Oaks? I start with a free home valuation built on recent comps from your own pocket.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in Sherman Oaks",
    body: "I started in commercial real estate, so I run the numbers first: rents, HOA fees, costs, and resale value.",
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
      ["Homes", "1930s and 1940s ranch-style and traditional homes, plus remodels. Houses often start near $1.1 million."],
      ["Feel", "Flat, grid-like streets with easy trips to the boulevard."],
      ["Good for", "First-time buyers and families who want a classic Valley home."],
    ],
  },
  {
    tag: "South of Ventura",
    title: "Hills, curves, and more privacy",
    facts: [
      ["Lots", "Larger lots, many on hillsides below Mulholland Drive."],
      ["Homes", "Mid-century homes, new builds, and estates."],
      ["Feel", "Curving streets, cul-de-sacs, and views of the Santa Monica Mountains."],
      ["Good for", "Buyers who want space, privacy, and views."],
    ],
  },
];

const GLANCE = [
  ["Location", "Central San Fernando Valley, City of Los Angeles. Ventura Boulevard runs east to west through the middle. Founded in 1927 and named for Moses Sherman."],
  ["Primary ZIP", "91403 covers the central and southern core. Other ZIP codes include 91423, 91401, and 91411. I check the exact address first."],
  ["Key corridors", "Ventura Boulevard, Van Nuys Boulevard, Woodman Avenue, Sepulveda Boulevard, and Magnolia Boulevard. The 101 and 405 freeways meet here."],
  ["Local character", "A busy commercial spine along Ventura, calm family streets on the flats, and curving hillside streets to the south. Pockets include Chandler Estates and Magnolia Woods."],
  ["Housing stock", "Mostly single-family houses. Sherman Oaks condos and Sherman Oaks townhomes sit near the boulevard and on the northern edge, usually with HOA fees."],
  ["Bordering areas", "Studio City, Valley Village, Encino, and Van Nuys."],
];

const LIFESTYLE = [
  ["Ventura Boulevard Corridor", "Ventura is the commercial spine, with shops, restaurants, and Westfield Fashion Square nearby. Homes within a short walk get easy errands, and more traffic noise. I help you weigh that trade."],
  ["The Flats North of Ventura", "Streets are flat and grid-like, with standard lots, in pockets such as Chandler Estates and Magnolia Woods. Neighbors walk, bike, and play outside. I compare each house with recent comps on its own blocks."],
  ["South of Ventura and the Estates", "Streets curve into the Santa Monica Mountains, lots grow, and views open up. I check road access, slope, retaining walls, and fire insurance early."],
  ["Commute and Connectivity", "The 101 and 405 freeways meet here, so Burbank, downtown, and the Westside are easier than from many Valley areas. Rush hour still slows both. I help you test your real commute."],
  ["Family Life and Schools", "Many families choose Sherman Oaks for its schools, parks, and quiet streets. I help you confirm which of the Sherman Oaks schools and LAUSD attendance zones serve each address."],
  ["Outdoor Living", "Many homes have big yards for pools, play, and outdoor dining. South-side lots add views and privacy."],
];

const EVERYDAY = [
  ["Food and drink", "Dining", "Ventura Boulevard has restaurants and cafes along its whole length. Streets just south of it sit within walking distance."],
  ["Errands", "Shopping and Services", "Westfield Fashion Square and the boulevard cover shopping, groceries, and daily services."],
  ["Outdoors", "Parks in Sherman Oaks", "Van Nuys Sherman Oaks Park has a pool, gym, and ball fields. Sherman Oaks Castle Park has an arcade and mini golf. Santa Monica Mountains trails sit above the south side."],
  ["Anchors", "Sherman Oaks Schools", "LAUSD options include Sherman Oaks Elementary, Dixie Canyon, and Riverside Drive. Private options include Notre Dame and Buckley. Confirm zones by address."],
];

const PROCESS = [
  ["Consultation", "Goals, timing, and which side of Ventura fits."],
  ["Strategy", "I study your pocket’s sales first."],
  ["Search or Pricing", "A curated search or a pocket-based price."],
  ["Negotiation", "Certified skill on price and terms."],
  ["Closing", "Escrow, inspections, and paperwork handled."],
  ["Ongoing", "Advice on value long after closing."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions.",
];

const FAQS = [
  { q: "What does a real estate agent in Sherman Oaks do?", a: "A real estate agent in Sherman Oaks prices your home or finds the right one, negotiates for you, and manages the steps to closing, including offers, inspections, and escrow. In Sherman Oaks, that also means knowing both sides of Ventura Boulevard, the LAUSD school zones, hillside rules, and the comps that apply to your street." },
  { q: "Who is the best real estate agent in Sherman Oaks?", a: "Look past the words “top” and “best.” A top real estate agent in Sherman Oaks shows recent local sales, a clear pricing method, and reviews you can verify. Ask any agent for those three things. I am a REALTOR®, a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
  { q: "How do I choose among Sherman Oaks real estate agents?", a: "Look for recent sales on streets and in price ranges like yours. Ask how each agent prices, markets, and negotiates, then read recent reviews. An agent who knows both the flats and the hills can save you time." },
  { q: "How much does a home cost in Sherman Oaks?", a: "Median prices run about $1.3 million to $1.7 million, depending on the source. Houses on the north flats often start near $1.1 million. In ZIP 91423, Resideline showed a median sale price of about $1.52 million over the last six months, with 35 active listings and 5 pending sales on October 5, 2026." },
  { q: "How much do Sherman Oaks condos cost?", a: "Sherman Oaks condos, also called Sherman Oaks condominiums, cost about $600,000 to $950,000. Condos in Sherman Oaks, CA sit mostly near Ventura Boulevard and on the northern edge. Check HOA fees, reserves, and rental limits first." },
  { q: "Are there townhomes in Sherman Oaks?", a: "Yes. Sherman Oaks townhomes sit near the boulevard and on the northern edge. Townhomes in Sherman Oaks usually carry HOA fees, so I compare each one with recent sales in the same complex." },
  { q: "Where can I find Sherman Oaks homes for sale?", a: "Search every active listing on my home search page, from condos to hillside houses, with live prices and photos. I can also send new listings as they appear." },
  { q: "What is the difference between north and south Sherman Oaks?", a: "North of Ventura has flat streets, smaller lots, and lower prices. South of Ventura has hillsides, larger lots, and higher prices. South-side streets in the Santa Monica Mountains are often called the Estates." },
  { q: "What parks are in Sherman Oaks?", a: "Van Nuys Sherman Oaks Park has a pool, gym, basketball courts, and ball fields. Sherman Oaks Castle Park has an arcade, batting cages, and mini golf. Trails in the Santa Monica Mountains sit above the south side, and Ernie’s Walk follows the LA River on the north edge." },
  { q: "What are the schools like in Sherman Oaks?", a: "Sherman Oaks schools include LAUSD’s Sherman Oaks Elementary, Dixie Canyon Avenue, Riverside Drive, Kester Avenue, and Chandler elementary schools, plus Louis Armstrong Middle School. Private options include Notre Dame High School and The Buckley School. Which Sherman Oaks, CA schools serve a home depends on its address, so confirm each one with LAUSD." },
  { q: "What should I do first to sell a house in Sherman Oaks?", a: "Start with a free home valuation based on recent sales in your pocket. Then plan repairs, photos, and timing. I can walk you through each step in a short meeting." },
  { q: "Where is Sherman Oaks, and what ZIP codes does it use?", a: "Sherman Oaks is a neighborhood in the city of Los Angeles, in the central San Fernando Valley. It was founded in 1927 and named for Moses Sherman, and the Los Angeles River runs along its northern edge. The main ZIP codes are 91403, 91423, 91401, and 91411, and 91403 covers the central and southern core." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function ShermanOaksPage() {
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
                { "@type": "ListItem", position: 3, name: "Sherman Oaks", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: "Real Estate Agent in Sherman Oaks | Andrew Liberty",
              description:
                "Real estate agent in Sherman Oaks: Andrew Liberty prices homes on both sides of Ventura Boulevard using real comps from each pocket.",
              primaryImageOfPage: abs(HERO_IMG),
              isPartOf: {
                "@type": "CollectionPage",
                "@id": `${abs("/neighborhoods")}#webpage`,
                url: abs("/neighborhoods"),
              },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Sherman Oaks",
                serviceType: "Real estate agent",
                description:
                  "Buying, selling, and investment guidance for homes in Sherman Oaks, with pricing based on real comps from each pocket on both sides of Ventura Boulevard.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Sherman Oaks",
                  description:
                    "A neighborhood in the central San Fernando Valley, City of Los Angeles, split by Ventura Boulevard into flat family streets to the north and hillside streets to the south.",
                  image: abs(HERO_IMG),
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Sherman Oaks",
                    addressRegion: "CA",
                    postalCode: "91403",
                    addressCountry: "US",
                  },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Sherman_Oaks,_Los_Angeles",
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
            <p className="lcn-eyebrow">Sherman Oaks Real Estate Agent</p>
            <h1 className="lcn-hero-title">
              Real Estate Agent in Sherman Oaks <em>Who Knows Both Sides of Ventura</em>
            </h1>
            <p className="lcn-hero-sub">
              Hiring a real estate agent in Sherman Oaks? Choose a licensed REALTOR® who knows both sides of
              Ventura Boulevard. As one of the real estate agents in Sherman Oaks, CA, I price with local comps,
              negotiate with proof, and explain every step plainly.
            </p>
            <div className="lcn-ctas">
              <Link href="/home-search?area=sherman-oaks" className="lcn-btn lcn-btn-dark">
                Browse Sherman Oaks Homes
              </Link>
              <Link href="/home-valuation" className="lcn-btn lcn-btn-outline">
                Get Your Home Valuation
              </Link>
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
            <p className="lcn-eyebrow">The Two Markets</p>
            <h2 className="lcn-title">Sherman Oaks Real Estate: Two Markets, One Boulevard</h2>
            <p className="lcn-sub">
              Sherman Oaks is a neighborhood in the city of Los Angeles, in the central San Fernando Valley.
              Ventura Boulevard splits it into two markets: flat streets to the north and hills to the south. I
              price each side on its own sales.
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
            <p className="lcn-sub">
              How close a home sits to the boulevard shapes daily life and price more than square feet do. Here is
              what I check with each client.
            </p>
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

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Sherman Oaks Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              Browse Sherman Oaks homes for sale, from houses to condos and townhomes, straight from my MLS feed.
              Recent sales follow. Select any home to see photos, price, beds, baths, and square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="sherman-oaks" place="Sherman Oaks" />
          <div className="lcn-after">
            <Link href="/home-search?area=sherman-oaks" className="lcn-btn lcn-btn-dark">
              Search All Sherman Oaks Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= EVERYDAY LIFE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Everyday Life</p>
            <h2 className="lcn-title">Local Places and Daily Rhythm</h2>
            <p className="lcn-sub">Where Sherman Oaks eats, shops, and gets outside.</p>
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

      {/* ======================= WHY CHOOSE ANDREW =======================
          Replaces the Meet Andrew bio (October 2026 brief), as on Studio
          City: brand teal with three white proof cards. The licence line
          stays on the page; the full bio is on his team page. */}
      <section className="lcn-section lcn-why" id="why-andrew">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Why Andrew</p>
            <h2 className="lcn-title">
              Why Choose <em>Andrew Liberty</em>
            </h2>
            <p className="lcn-sub">
              Searching for a top real estate agent in Sherman Oaks, or the best real estate agent in Sherman
              Oaks? Anyone can claim those titles. Proof is harder to fake, and here is mine.
            </p>
          </div>
          <div className="lcn-why-grid">
            {WHY_POINTS.map(({ Icon, title, text }) => (
              <div className="lcn-why-card" key={title}>
                <span className="lcn-why-icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="lcn-ctas lcn-why-ctas">
            <a
              href="https://wa.me/13107090581"
              target="_blank"
              rel="noopener noreferrer"
              className="lcn-btn lcn-btn-light"
            >
              Schedule a Consultation
            </a>
            <Link href="/team/andrew-liberty" className="lcn-btn lcn-btn-outline-light">
              Meet Andrew
            </Link>
          </div>
          <p className="lcn-why-license">
            Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
          </p>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">How I Work With Clients</h2>
            <p className="lcn-sub">Six steps from first call to closing, built around your side of the boulevard.</p>
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
              A home valuation built on your pocket and your side of the boulevard, not a citywide average. I
              review the closest comparable sales and tell you what, if anything, is worth doing before you list.
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

      {/* ============================== FAQ ============================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Sherman Oaks Real Estate FAQ</h2>
            <p className="lcn-sub">Direct answers to what people ask before they hire an agent.</p>
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
                Tell me your side of the boulevard, your timing, and your goal. I’ll tell you what the market means
                for your next move. Free consultation. No pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href="/home-search?area=sherman-oaks" className="lcn-btn lcn-btn-light">
                Browse Sherman Oaks Homes
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

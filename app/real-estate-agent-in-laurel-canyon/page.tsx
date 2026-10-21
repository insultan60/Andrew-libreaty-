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
 * Laurel Canyon neighbourhood guide, built to "Laurel Canyon (desktop).pdf"
 * with the copy, tags and FAQ from the October 2026 content brief. The brief
 * is shorter than the other guides: no At a Glance, Lifestyle or Local
 * Places sections, and the Meet Andrew bio is replaced by three proof points
 * as on Studio City.
 */

const PATH = "/real-estate-agent-in-laurel-canyon";
const AREA_SEARCH = "/home-search?area=laurel-canyon";
const CONSULT = "https://wa.me/13107090581";

const TITLE = "Real Estate Agent in Laurel Canyon | Homes for Sale";
const DESCRIPTION =
  "Andrew Liberty is a Laurel Canyon real estate agent. Browse Laurel Canyon homes for sale with a buyer agent who knows every road and view.";

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

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in Laurel Canyon",
    body: "Need a buyer agent in Laurel Canyon? I help you weigh the road, the slope, and the privacy of each home, then negotiate with real canyon sales behind you.",
    cta: "Browse Laurel Canyon homes for sale",
    href: AREA_SEARCH,
  },
  {
    tag: "Selling",
    title: "Selling in Laurel Canyon",
    body: "Planning to sell a house in Laurel Canyon? Canyon buyers pay for privacy, character, and design. I price your home on real canyon sales and bring it to the right buyer, starting with a free valuation.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in Laurel Canyon",
    body: "Few homes come up for sale, and each one is different. I study rents, repair costs, and true comparables before you decide.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const WHY: WhyPoint[] = [
  { icon: "gem", title: "Prices what has no comp", text: "My start in commercial real estate taught me to value property that does not fit a formula. In the canyon, that describes most homes." },
  { icon: "hills", title: "Reads the road and the slope", text: "Road agreements, access, retaining walls, and fire zone status come before the photos. I ask about them early, so you do not find out late." },
  { icon: "shake", title: "Negotiates with proof", text: "As a Laurel Canyon real estate agent, I bring a Certified Real Estate Negotiation Expert designation, RealTrends Verified status, and a Los Angeles Magazine Real Estate All-Star title. My office is in Studio City, where Laurel Canyon Boulevard reaches the Valley." },
];

const PROCESS = [
  ["Consultation", "You get a clear plan for your road, your timing, and your goals."],
  ["Strategy", "We study the comps that truly apply, and the ones that do not."],
  ["Search or Pricing", "A short list of canyon homes, or a price built on the setting."],
  ["Negotiation", "Offers backed by reports, access findings, and real canyon sales."],
  ["Closing", "Escrow, inspections, and road agreements stay on track."],
  ["Ongoing", "You have an advisor for value and improvements long after closing."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions.",
];

const FAQS = [
  { q: "How do I choose among real estate agents in Laurel Canyon, CA?", a: "Ask how the agent prices a home with no clear comparable. Ask what they check on a steep lot or a private road before an offer. A good Laurel Canyon Realtor answers with specifics, not slogans." },
  { q: "Do I need a buyer agent in Laurel Canyon?", a: "It helps. A buyer agent in Laurel Canyon asks about the road agreement, the slope, the fire zone, and past repairs before you commit, and negotiates when issues appear." },
  { q: "Where can I find Laurel Canyon homes for sale?", a: "Start with my home search page. It shows every active listing, from cabins to modern estates, with live prices and photos. It covers homes for sale in Laurel Canyon, CA and Laurel Canyon houses for sale, and I can send new listings as they appear." },
  { q: "What types of homes are in Laurel Canyon?", a: "Homes with a view sit near the ridge. Vintage cabins, bungalows, and storybook cottages date to the canyon’s early days. Mid-century, modern, and luxury homes sit on private lots. Most are single-family houses." },
  { q: "Can I buy land in Laurel Canyon?", a: "Sometimes, but vacant lots come up rarely, and building rules are strict. The city’s Baseline Hillside Ordinance regulates floor area, height, and stories on hillside lots. Check slope, access, and utilities before you offer." },
  { q: "Are Laurel Canyon roads private or public?", a: "Both exist. Some homes sit on private roads with shared repair costs. Ask for the road agreement before you buy." },
  { q: "Is it hard to get a loan for a canyon home?", a: "Sometimes. Steep lots, private roads, and unusual builds can slow an appraisal. Work with a lender who knows canyon homes." },
  { q: "What should I do first to sell a house in Laurel Canyon?", a: "Start with a free valuation based on real canyon sales. Then plan repairs, photos, and timing around the buyers who value privacy, character, and design. I can walk you through each step in a short meeting." },
  { q: "How can I find my Laurel Canyon home value?", a: "Few homes match, so size alone does not decide the price. Lots, privacy, setting, road access, and design all matter. A free personal review from me weighs each one against real canyon sales." },
  { q: "Are Laurel Canyon homes at risk of wildfire?", a: "Some are. The city’s Very High Fire Hazard Severity Zone covers most of the hilly and mountainous areas of Los Angeles. Risk changes by street, plants, and road access. Check the fire rating and get an insurance quote before you buy." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function LaurelCanyonPage() {
  // The whole feed goes down, not just the canyon subset: when the canyon has
  // nothing, AreaListings shows three of Andrew's other homes instead.
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
                { "@type": "ListItem", position: 3, name: "Laurel Canyon", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: "Real Estate Agent in Laurel Canyon | Andrew Liberty",
              description: DESCRIPTION,
              primaryImageOfPage: abs("/images/laurel-canyon.jpg"),
              isPartOf: {
                "@type": "CollectionPage",
                "@id": `${abs("/neighborhoods")}#webpage`,
                url: abs("/neighborhoods"),
              },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Laurel Canyon",
                serviceType: "Real estate agent",
                description:
                  "Buying, selling, and investment guidance for canyon homes in Laurel Canyon, priced on the privacy, the setting, the road, and real canyon sales.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Laurel Canyon",
                  description:
                    "A wooded hillside neighborhood in the Hollywood Hills West area of Los Angeles, mostly in ZIP code 90046, with narrow winding roads, privacy, and mostly single-family homes.",
                  image: abs("/images/laurel-canyon.jpg"),
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Los Angeles",
                    addressRegion: "CA",
                    postalCode: "90046",
                    addressCountry: "US",
                  },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Laurel_Canyon,_Los_Angeles",
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
        <img className="lcn-hero-bg" src="/images/laurel-canyon.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        <div className="container lcn-hero-inner">
          <nav className="lcn-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Laurel Canyon</span>
          </nav>
          <p className="lcn-eyebrow">Laurel Canyon, Los Angeles</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Laurel Canyon <em>Where No Two Homes Match</em>
          </h1>
          <p className="lcn-hero-sub">
            Every Laurel Canyon home is its own case. As a real estate agent in Laurel Canyon, I price the privacy,
            the setting, and the road as carefully as the square feet.
          </p>
          <div className="lcn-ctas">
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="lcn-btn lcn-btn-light">
              Schedule a Consultation
            </a>
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-outline-light">
              Browse Canyon Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s Your Move in Laurel Canyon?</h2>
            <p className="lcn-sub">Every canyon home is its own case. Pick where to begin.</p>
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
        subline="Your Laurel Canyon Realtor for view homes, vintage cabins, and estates"
        intro="Laurel Canyon homes rarely resemble each other. A cabin on a wooded side street and a glass house near the ridge can sit a short drive apart and follow different rules. Choosing a real estate agent in Laurel Canyon means choosing someone who can price what has no obvious comparable."
        points={WHY}
      />

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Laurel Canyon Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              Browse Laurel Canyon homes for sale from my MLS feed, with recent sales below. Looking for homes for
              sale in Laurel Canyon, CA? Start here. Open any listing for photos, price, beds, baths, and square
              footage.
            </p>
          </div>
          <AreaListings
            initialListings={listings}
            area="laurel-canyon"
            place="Laurel Canyon"
            searchLabel="Search Laurel Canyon Homes for Sale"
          />
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">Six Steps for Your Canyon Move</h2>
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
            <h2 className="lcn-title">Know Your Laurel Canyon Home Value</h2>
            <p className="lcn-sub">
              Standard formulas miss what makes a canyon home special. I look at your home, your road, and the
              closest real sales, so you get a real number, not a guess.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Based on real canyon sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Laurel Canyon" title="Get Your Free Canyon Home Valuation" />
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Frequently Asked Questions</h2>
            <p className="lcn-sub">Quick answers about choosing an agent, buying, selling, and the canyon.</p>
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
              <h2 className="lcn-title">Ready to Find Your Place in the Canyon?</h2>
              <p className="lcn-sub">
                Tell me about the road, the setting, and the kind of home you imagine. Free consultation. No
                pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="lcn-btn lcn-btn-light">
                Schedule a Consultation
              </a>
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-outline-light">
                Browse Laurel Canyon Homes for Sale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

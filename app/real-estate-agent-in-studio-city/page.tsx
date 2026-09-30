import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import WhatsTheMove from "../components/home/WhatsTheMove";
import MeetAndrew from "../components/home/MeetAndrew";
import RecentlySold from "../components/home/RecentlySold";
import Process from "../components/home/Process";
import Neighborhoods from "../components/home/Neighborhoods";
import Valuation from "../components/home/Valuation";
import Testimonials from "../components/home/Testimonials";
import FinalCta from "../components/home/FinalCta";
import Faq from "../components/home/Faq";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";

const PATH = "/real-estate-agent-in-studio-city";

const TITLE = "Real Estate Agent in Studio City | Local & Certified";
const DESCRIPTION =
  "Looking for a real estate agent in Studio City? Andrew Liberty knows the streets, the schools, and every micro-market here. Get a free home valuation today.";

const HERO_SUB =
  "Andrew Liberty is a real estate agent in Studio City, CA, helping you buy, sell, or invest with real local knowledge.";

const HERO_IMG = "/images/studio-city.jpg";

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
    images: [{ url: HERO_IMG, width: 900, height: 562, alt: "Studio City, Los Angeles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMG],
  },
};

const MOVE_CARDS = [
  {
    title: "Buy a Home",
    body: "Studio City homes move fast, especially near the Village. Andrew helps you spot the right one and make a competitive offer without overpaying.",
    ctaLabel: "Start Home Search",
    href: "/home-search",
  },
  {
    title: "Sell a Home",
    body: "Selling in Studio City means competing with well-staged, well-priced homes. Andrew builds a pricing strategy that gets your home noticed and negotiated well.",
    proof: "Priced on real Studio City comps, not a citywide guess",
    ctaLabel: "Get Home Value",
    href: "#valuation",
  },
  {
    title: "Invest Strategically",
    body: "Studio City has strong rental demand and steady long-term value. Andrew evaluates each opportunity, from a duplex to a larger development lot, on real numbers.",
    ctaLabel: "Explore Opportunities",
    href: "/contact",
  },
];

const BIO = [
  "I'm based in Studio City, and it's the market I know best. I'm a REALTOR® and Certified Real Estate Negotiation Expert with a background in commercial real estate, which gives me a sharp eye for value on any deal, whether it's a home, an income property, or a development site.",
  "I have worked with buyers, sellers, and investors here for years, so I know the streets, the schools, and what actually gets a home sold in this neighborhood. I am hands-on and straightforward, and I make sure my clients feel confident at every step.",
];

const NEARBY = [
  {
    coords: "Los Angeles · 91403",
    name: "Sherman Oaks",
    desc: "A neighboring community with its own great restaurants, strong schools, and steady demand from families.",
    img: "/images/sold-sherman-oaks.jpg",
    href: "/real-estate-agent-in-sherman-oaks",
  },
  {
    coords: "Los Angeles · 91607",
    name: "Valley Village",
    desc: "Right next to Studio City, with quieter streets and the same easy access to everything nearby.",
    img: "/images/sold-valley-village.jpg",
    href: "/real-estate-agent-in-valley-village",
  },
  {
    coords: "Los Angeles · 90068",
    name: "Hollywood Hills",
    desc: "A short drive over the hill, with views and homes that don't come around often.",
    img: "/images/hollywood-hills.jpg",
    href: "/real-estate-agent-in-hollywood-hills",
  },
];

const FAQS = [
  {
    q: "What's my Studio City home worth?",
    a: "Your home's value depends on nearby sales, size, condition, and current demand. Andrew can give you a free, accurate number based on real Studio City data, not a generic citywide guess.",
  },
  {
    q: "Is Studio City a good place to buy a home right now?",
    a: "Studio City stays in high demand. It has a walkable village, strong schools, and easy access to both the Valley and the Westside. The right time to buy still depends on your own goals.",
  },
  {
    q: "How competitive is the Studio City real estate market?",
    a: "It's competitive, especially near the Village or in top school zones. Well-priced homes often get multiple offers. Buyers need to move fast, and sellers need strong pricing and positioning.",
  },
  {
    q: "What's the difference between Studio City and Sherman Oaks?",
    a: "Studio City feels more walkable and village-like. Sherman Oaks feels more spacious and family-focused. Both are strong markets, and the right fit depends on lifestyle and budget.",
  },
  {
    q: "Do I need a local agent to buy or sell in Studio City?",
    a: "Yes, it helps a lot. Prices can shift block by block in Studio City. A local agent prices, positions, and negotiates more accurately than someone who works the whole city.",
  },
  {
    q: "How long does it take to sell a home in Studio City?",
    a: "It depends on price and condition. Well-priced homes in Studio City often go under contract within a few weeks, especially in strong school zones.",
  },
];

export default function StudioCityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Neighborhoods", item: abs("/neighborhoods") },
                { "@type": "ListItem", position: 3, name: "Studio City", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO_IMG),
              about: { "@type": "Place", name: "Studio City, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Studio City, Los Angeles, CA" },
              url: abs(PATH),
            },
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="nb-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nb-hero-bg" src={HERO_IMG} alt="" aria-hidden="true" fetchPriority="high" />
        <div className="container">
          <nav className="nb-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="nb-crumb-sep" aria-hidden="true">
              /
            </span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span className="nb-crumb-sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Studio City</span>
          </nav>

          <div className="nb-hero-copy">
            <p className="eyebrow eyebrow-light">Studio City · Compass</p>
            <h1 className="nb-hero-title">
              Real Estate Agent in Studio City
              <br />
              <em>Who Knows the Streets</em>
            </h1>
            <p className="nb-hero-sub">{HERO_SUB}</p>
            <div className="nb-hero-ctas">
              <a href="#valuation" className="btn btn-primary btn-magnetic">
                <span>Get Your Studio City Home Value</span>
                <ArrowRight />
              </a>
              {/* btn-secondary is inked for light sections and disappears on
                  the hero photo; btn-ghost-light is the on-dark variant. */}
              <a href="/home-search" className="btn btn-ghost-light">
                Browse Studio City Listings
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsTheMove
        eyebrow="Start Here"
        title="What’s the Move?"
        sub="Buying, selling, or investing on these streets. Here is where to begin."
        cards={MOVE_CARDS}
      />

      <MeetAndrew
        title="Meet Andrew Liberty"
        bio={BIO}
        imageAlt={`${AGENT.name}, Studio City real estate agent`}
      />

      <RecentlySold
        area="studio-city"
        title="Recently Sold in Studio City"
        subtitle="Closings on these streets, straight from the MLS feed."
      />

      <Process
        title="How I Work With Clients"
        sub="Every client gets the same clear process, from first call to closing, with no surprises."
        ctaLabel="See the Full Process"
        ctaHref="/#process"
      />

      <Neighborhoods
        title="Beyond Studio City"
        sub="Real estate agents come and go, but local knowledge doesn't. I work in these neighboring areas just as closely."
        hoods={NEARBY}
      />

      <Valuation
        eyebrow="Free & Confidential"
        title="Get Your Studio City Home Valuation"
        sub="Get an instant property valuation and expert guidance from Andrew Liberty, your Studio City real estate advisor."
      />

      <Testimonials />

      <FinalCta
        title="Experience You Can Trust in Studio City"
        copy="The Andrew Liberty Team combines local experience, clear strategy, and personalized service to help Studio City clients buy, sell, and invest with confidence. We keep the process simple, provide honest guidance, and focus on making smart real estate decisions."
      />

      <Faq title="Frequently Asked Questions" faqs={FAQS} />
    </>
  );
}

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
import FinalCta from "../components/home/FinalCta";
import Faq from "../components/home/Faq";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";

const PATH = "/real-estate-agent-in-sherman-oaks";

const TITLE = "Real Estate Agent in Sherman Oaks | Knows the Boulevard";
const DESCRIPTION =
  "Sherman Oaks stretches from family streets to estates near the Boulevard. Andrew Liberty is a real estate agent in Sherman Oaks who knows both sides.";

const HERO_SUB =
  "Andrew Liberty knows Sherman Oaks street by street, from family homes near the schools to estates south of the Boulevard. Let's find your next move.";

const HERO_IMG = "/images/sold-sherman-oaks.jpg";

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
    images: [{ url: HERO_IMG, width: 800, height: 671, alt: "Sherman Oaks, Los Angeles" }],
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
    body: "Sherman Oaks has homes for every stage of life, from starter houses to estates south of the Boulevard. I help you find the one that actually fits.",
    ctaLabel: "Start Home Search",
    href: "/home-search",
  },
  {
    title: "Sell a Home",
    body: "Good schools and tree-lined streets sell themselves, but pricing still matters. I position your Sherman Oaks home to reach serious buyers fast.",
    proof: "Priced on real Sherman Oaks comps, not a formula",
    ctaLabel: "Get Home Value",
    href: "#valuation",
  },
  {
    title: "Invest Strategically",
    body: "Sherman Oaks holds steady demand from families and renters alike. I run the real numbers before recommending any investment here.",
    ctaLabel: "Explore Opportunities",
    href: "/contact",
  },
];

const BIO = [
  "I work throughout Sherman Oaks, from family homes near the top school zones to the larger estates south of the Boulevard. I am a REALTOR® and Certified Real Estate Negotiation Expert with a background in commercial real estate, which gives me a sharp eye for value at every price point.",
  "Whether you are looking for someone you can trust with a family home or you need real experience with a higher-end sale, I bring the same approach to both.",
  "My negotiation skills are backed by RealTrends Verified status and recognition as a Los Angeles Magazine Real Estate All-Star, so you are not just taking my word for it. I am hands-on and straightforward, and I will make sure you feel confident every step of the way.",
];

const NEARBY = [
  {
    coords: "Los Angeles · 91604",
    name: "Studio City",
    desc: "Just next door, with a walkable village and easy access to the Cahuenga Pass.",
    img: "/images/studio-city.jpg",
    href: "/real-estate-agent-in-studio-city",
    cta: "Explore Studio City",
  },
  {
    coords: "Los Angeles · 91607",
    name: "Valley Village",
    desc: "Right around the corner, with quieter streets and the same easy Valley access.",
    img: "/images/sold-valley-village.jpg",
    href: "/real-estate-agent-in-valley-village",
    cta: "Explore Valley Village",
  },
];

const FAQS = [
  {
    q: "Why should I work with a real estate agent in Sherman Oaks instead of a citywide agent?",
    a: "A real estate agent in Sherman Oaks knows the difference between north and south of the Boulevard, the school zones, and what's actually driving demand block by block, details a citywide generalist often misses.",
  },
  {
    q: "What's the difference between north and south Sherman Oaks?",
    a: "South of Ventura Boulevard tends to have larger lots, higher prices, and more privacy, often called the “Estates” section. North of the Boulevard is more affordable, with smaller lots and a stronger starter-home market.",
  },
  {
    q: "Are the schools good in Sherman Oaks?",
    a: "Yes, several Sherman Oaks schools rank well within the LAUSD system, which is a major reason families specifically target this neighborhood over similar nearby areas.",
  },
  {
    q: "Who is the best real estate agent in Sherman Oaks?",
    a: "That depends on your specific needs, but look for verified credentials and real negotiation experience. Andrew Liberty is a real estate agent in Sherman Oaks who is RealTrends Verified and a Los Angeles Magazine Real Estate All-Star, with a Certified Real Estate Negotiation Expert designation.",
  },
  {
    q: "Who is the best luxury real estate agent in Sherman Oaks?",
    a: "For a higher-end sale south of the Boulevard, experience with larger, more complex transactions matters most. Andrew Liberty's background in commercial real estate, combined with his negotiation certification, applies directly to luxury deals in this market.",
  },
  {
    q: "Is Sherman Oaks real estate a good investment?",
    a: "Yes, generally. Sherman Oaks has steady demand from both families and renters, which supports stable long-term value across both the north and south sides of the Boulevard.",
  },
];

export default function ShermanOaksPage() {
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
            <span aria-current="page">Sherman Oaks</span>
          </nav>

          <div className="nb-hero-copy">
            <p className="eyebrow eyebrow-light">Sherman Oaks · Compass</p>
            <h1 className="nb-hero-title">
              Real Estate Agent in Sherman Oaks
              <br />
              <em>Who Knows the Boulevard</em>
            </h1>
            <p className="nb-hero-sub">{HERO_SUB}</p>
            <div className="nb-hero-ctas">
              <a href="#valuation" className="btn btn-primary btn-magnetic">
                <span>Get Your Sherman Oaks Home Value</span>
                <ArrowRight />
              </a>
              {/* btn-secondary is inked for light sections and disappears on
                  the hero photo; btn-ghost-light is the on-dark variant. */}
              <a href="/home-search" className="btn btn-ghost-light">
                Browse Sherman Oaks Listings
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsTheMove
        eyebrow="Start Here"
        title="What’s the Move?"
        sub="From the school streets to the Estates. Here is where to begin."
        cards={MOVE_CARDS}
      />

      {/* The brief heads this one "Andrew Liberty", not "Meet Andrew Liberty". */}
      <MeetAndrew
        title="Andrew Liberty"
        bio={BIO}
        imageAlt={`${AGENT.name}, Sherman Oaks real estate agent`}
      />

      {/* Self-hiding: renders only once this neighborhood has closings in
          the feed. See lib/areas.ts for how a listing is placed. */}
      <RecentlySold
        area="sherman-oaks"
        title="Recently Sold in Sherman Oaks"
        subtitle="Closings on both sides of the Boulevard, straight from the MLS feed."
      />

      <Process
        title="How I Work With Clients"
        sub="From a free consultation to strategy, negotiation, closing, and advice after the sale, every client goes through the same clear, six-step process. No surprises, no guesswork."
        ctaLabel="See the Full Process"
        ctaHref="/#process"
      />

      <Neighborhoods
        title="Not Far From Sherman Oaks"
        sub="Two neighborhoods a few minutes away, each with its own case to make."
        hoods={NEARBY}
      />

      <Valuation
        eyebrow="Free & Confidential"
        title="Know Your Sherman Oaks Home’s Value"
        sub="Get an instant property valuation and expert guidance from Andrew Liberty, your Sherman Oaks real estate advisor."
      />

      <FinalCta
        title="More Than Just a Sale"
        copy="The Andrew Liberty Team brings together real-world experience, thoughtful strategy, and a calm, hands-on approach to help Sherman Oaks clients move with clarity. From homes to investments, we focus on smart decisions, not unnecessary complexity."
      />

      <Faq title="Frequently Asked Questions" faqs={FAQS} />
    </>
  );
}

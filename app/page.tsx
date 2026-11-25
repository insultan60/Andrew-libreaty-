import type { Metadata } from "next";
import Hero from "./components/home/Hero";
import WhatsTheMove, { type MoveCard } from "./components/home/WhatsTheMove";
import MeetAndrew from "./components/home/MeetAndrew";
import RecentlySold from "./components/home/RecentlySold";
import Process from "./components/home/Process";
import Neighborhoods, { type Hood } from "./components/home/Neighborhoods";
import Valuation from "./components/home/Valuation";
import Testimonials from "./components/home/Testimonials";
import OfficeMap from "./components/home/OfficeMap";
import Newsletter from "./components/home/Newsletter";
import FinalCta from "./components/home/FinalCta";
import Faq from "./components/home/Faq";
import ValueProps from "./components/home/ValueProps";
import Guides from "./components/home/Guides";
import Header from "./components/Header";
import JsonLd from "./components/JsonLd";
import {
  SITE_URL,
  AGENT,
  ADDRESS,
  OPENING_HOURS,
  AREAS_SERVED,
  abs,
} from "@/lib/site";

/* The one place the home page's title is written. The schema's WebPage.name
   reads from it too, so the <title> tag and the structured data cannot say two
   different things about the same page. */
const HOME_TITLE = "Los Angeles Real Estate Agent | Studio City | Andrew Liberty";

const HOME_DESCRIPTION =
  "Andrew Liberty is a Los Angeles real estate agent based in Studio City. Buy, sell, or invest in Studio City, the Valley, and LA. Book a free consultation.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Studio City, California",
    "geo.position": "34.1396;-118.3875",
    ICBM: "34.1396, -118.3875",
  },
  /* The layout sets Open Graph and Twitter titles site-wide from its own
     constant. Without these two the card shared from the home page would carry
     a different headline from the page itself. */
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/hero-la-aerial.jpg", width: 1400, height: 933 }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/hero-la-aerial.jpg"],
  },
};


/**
 * The site's identity graph — WebSite, WebPage, RealEstateAgent and Person —
 * emitted on the HOME PAGE ONLY.
 *
 * Once, not everywhere. This used to sit in the root layout, so every one of
 * the twenty-odd routes carried its own copy of the same business. An @id is an
 * identifier: it is defined in one place and referenced from others, which is
 * exactly what the neighbourhood pages already do when they name
 * `${SITE_URL}/#agent` as the provider of their Service nodes. Those references
 * keep working — they point at this definition.
 *
 * Values come from lib/site.ts rather than being written out again here, so the
 * schema cannot drift away from the address, hours and phone number that the
 * Footer and Contact page actually display. Google cross-checks those against
 * the visible page, and a mismatch is worse than an omission.
 */
/* Repeated verbatim on the WebSite and WebPage nodes in the supplied schema,
   so they are declared once here rather than typed out twice. */
const SITE_KEYWORDS =
  "real estate agent in Los Angeles, Los Angeles real estate agent, Andrew Liberty";

const AGENT_KEYWORDS =
  "real estate agent in Los Angeles, Los Angeles real estate agent, Studio City real estate agent, Compass agent";

/* November 2026 homepage brief: section copy passed into the shared home
   components, so other pages that reuse them keep their own defaults. */
const HOODS: Hood[] = [
  { coords: "Los Angeles · 91604", name: "Studio City", desc: "Ventura Boulevard dining and the Sunday farmers market sit near quiet residential streets. Hillside homes climb toward Mulholland, and Fryman Canyon trails are close.", img: "/images/studio-city.jpg", href: "/real-estate-agent-in-studio-city", cta: "Explore Studio City" },
  { coords: "Los Angeles · Ventura Blvd", name: "Sherman Oaks", desc: "Next door along Ventura Boulevard, with condos, flat streets, and hillside homes. Buyers often compare it with Studio City on price and feel.", img: "/images/sold-sherman-oaks.jpg", href: "/real-estate-agent-in-sherman-oaks", cta: "Explore Sherman Oaks" },
  { coords: "Los Angeles · 91607", name: "Valley Village", desc: "A quiet, low-rise residential neighborhood just northeast of Studio City, with condos, ranch homes and small multifamily.", img: "/images/sold-valley-village.jpg", href: "/real-estate-agent-in-valley-village", cta: "Explore Valley Village" },
  { coords: "Los Angeles · The Hills", name: "Laurel Canyon", desc: "Secluded canyon living, minutes from both the Valley and the Sunset Strip. Access, parking, and insurance deserve a close look.", img: "/images/laurel-canyon.jpg", href: "/real-estate-agent-in-laurel-canyon", cta: "Explore Laurel Canyon" },
  { coords: "Los Angeles · Iconic views", name: "Hollywood Hills", desc: "Skyline views and architectural homes with a record of holding value. View lots and hillside construction need careful due diligence.", img: "/images/hollywood-hills.jpg", href: "/real-estate-agent-in-hollywood-hills", cta: "Explore Hollywood Hills" },
];

const MOVES: MoveCard[] = [
  { title: "Buy a Home in Studio City and Los Angeles", body: "Homes for sale in Studio City can price very differently from one street to the next. Andrew compares recent sales, explains how hillside and flat-lot homes differ, and builds the full monthly cost before you offer, including closing costs and the supplemental tax bill.", guide: { label: "How to Buy a House in Los Angeles", href: "/blog/how-to-buy-a-house-in-los-angeles" }, ctaLabel: "Start Your Home Search", href: "/home-search" },
  { title: "Sell a House in Studio City or Anywhere in LA", body: "Sellers face transfer taxes, required disclosures, and a pricing decision that shapes every offer. Andrew prices from recent nearby sales, plans the marketing, and shows you a net sheet so you know what you keep.", guide: { label: "Selling a House in Los Angeles", href: "/blog/selling-a-house-in-los-angeles" }, ctaLabel: "Get Your Home Value", href: "/home-valuation" },
  { title: "Invest in Los Angeles Real Estate", body: "Duplexes, small multifamily buildings, and development lots get judged on the numbers first. Andrew’s background in commercial real estate shapes how he reviews cash flow, comps, and local rent rules.", guide: { label: "House Hacking in Los Angeles", href: "/blog/house-hacking-in-los-angeles" }, ctaLabel: "Talk Investment Strategy", href: "/contact" },
];

const BIO = [
  "Andrew Liberty is a Studio City Realtor® and Certified Real Estate Negotiation Expert with Compass. His office is at 12001 Ventura Pl, in the neighborhood he works in every day.",
  "Andrew has a background in commercial real estate, so he reads a home the way an investor does. He checks the price against nearby sales, then looks at condition, lot, and what the next buyer will pay.",
  "Homebuyers get the same approach. He explains each step in plain language and negotiates for your price and terms. Clients say he takes the pressure off. Andrew is RealTrends Verified and a Los Angeles Magazine Real Estate All-Star.",
];

const STEPS = [
  { index: "01", title: "Plan", body: "A free consultation covers your goals, timing, and budget." },
  { index: "02", title: "Price or search", body: "Sellers get a pricing plan built from recent sales. Buyers get a focused home search." },
  { index: "03", title: "Negotiate and close", body: "Andrew handles offers, inspections, and escrow until you have the keys or the proceeds." },
];

const FAQS = [
  { q: "Is Studio City part of Los Angeles?", a: "Yes. Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley. Listing sites may show an address as either Studio City or Los Angeles." },
  { q: "How do I choose a real estate agent in Studio City or Los Angeles?", a: "Ask for recent sales near your price range and how the agent plans to negotiate. Look for local market knowledge and a clear process from first meeting to closing. Meet at least two agents before you decide." },
  { q: "How much money do I need to buy a house in Los Angeles?", a: "You need a down payment, closing costs, and cash reserves. First-time buyers may qualify for help through programs such as CalHFA. Andrew’s buying guide breaks down each cost." },
  { q: "What do sellers pay when selling a house in Los Angeles?", a: "Sellers usually pay transfer taxes, escrow and title fees, and agent compensation. Higher-priced sales may also trigger Measure ULA. A net sheet shows your estimated proceeds before you list." },
  { q: "What should I know before buying a hillside home in Los Angeles?", a: "Hillside homes need extra checks, such as access, retaining walls, drainage, and insurance. Andrew helps buyers line up the right inspections before they commit. This matters in areas like Studio City, Laurel Canyon, and the Hollywood Hills." },
  { q: "Can I buy a duplex in Los Angeles and live in one unit?", a: "Yes, many buyers do. Loan options and Los Angeles rent rules both matter, so review them before you make an offer. Andrew’s house hacking guide walks through a worked example." },
  { q: "How long does it take to sell a house in Studio City?", a: "Timing depends on price, condition, and the street. Andrew reviews nearby sales and gives you a realistic range in your first meeting." },
  { q: "What does a Certified Real Estate Negotiation Expert do?", a: "A certified negotiator has trained in negotiation methods. Andrew uses that training on price, repair requests, and contract terms." },
];

const IDENTITY = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: AGENT.name,
      alternateName: ["Andrew Liberty Team", "andrewliberty.com"],
      description:
        "Official website of Andrew Liberty, a Certified Real Estate Negotiation Expert with Compass, offering strategic guidance for buyers, sellers, and investors across Los Angeles.",
      keywords: SITE_KEYWORDS,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#agent` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      keywords: SITE_KEYWORDS,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#andrew` },
      primaryImageOfPage: abs(AGENT.image),
      inLanguage: "en-US",
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#agent`,
      name: AGENT.name,
      alternateName: "Andrew Liberty Team",
      description:
        "Andrew Liberty is a Studio City real estate agent and Certified Real Estate Negotiation Expert with Compass. He helps buyers, sellers, and investors in Studio City, the San Fernando Valley, and across Los Angeles.",
      keywords: AGENT_KEYWORDS,
      url: SITE_URL,
      image: abs(AGENT.image),
      logo: abs(AGENT.logo),
      telephone: AGENT.phone,
      email: AGENT.email,
      address: ADDRESS,
      openingHoursSpecification: OPENING_HOURS,
      areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
      employee: { "@id": `${SITE_URL}/#andrew` },
      founder: { "@id": `${SITE_URL}/#andrew` },
      award: ["RealTrends Verified", "Los Angeles Magazine Real Estate All-Stars"],
      knowsAbout: [
        "Studio City real estate",
        "Los Angeles real estate",
        "Real estate negotiation",
        "Hillside homes",
        "Investment properties",
        "Duplexes and small multifamily",
        "Development lots",
        "First-time home buying in California",
      ],
      hasMap: "https://www.google.com/maps/search/?api=1&query=12001+Ventura+Pl+Suite+100+Studio+City+CA+91604",
      sameAs: AGENT.sameAs,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#andrew`,
      name: AGENT.name,
      alternateName: [AGENT.legalName, "Andrew R. Liberty"],
      description:
        "Andrew Liberty is a Los Angeles real estate agent, Certified Real Estate Negotiation Expert, and actor. With a background in commercial real estate, he advises buyers, sellers, and investors across Los Angeles.",
      url: SITE_URL,
      image: abs(AGENT.image),
      email: AGENT.email,
      telephone: AGENT.phone,
      jobTitle: AGENT.jobTitle,
      hasOccupation: [
        { "@type": "Occupation", name: "Real Estate Agent" },
        { "@type": "Occupation", name: "Actor" },
      ],
      identifier: AGENT.licence,
      knowsAbout: [
        "Real estate agent in Los Angeles",
        "Los Angeles real estate",
        "Real estate negotiation",
        "Investment properties",
        "Studio City",
        "Hollywood Hills",
        "Laurel Canyon",
      ],
      worksFor: {
        "@type": "Organization",
        name: AGENT.brokerage,
        identifier: AGENT.brokerageLicence,
      },
      sameAs: AGENT.personSameAs,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#neighborhoods`,
      name: "Neighborhoods served by Andrew Liberty",
      itemListElement: HOODS.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${h.name} real estate agent`,
        url: abs(h.href),
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={IDENTITY} />
      <Hero />
      <WhatsTheMove
        eyebrow="Start Here"
        title="Buy, Sell, or Invest in Los Angeles"
        sub="Los Angeles is not one market. Prices, rules, and risks change from the Valley flats to the hills above them. Andrew works from Studio City and helps clients across the city."
        cards={MOVES}
      />
      <MeetAndrew
        title="Meet Andrew Liberty, Your Studio City Realtor®"
        bio={BIO}
        imageAlt="Andrew Liberty, Studio City real estate agent and Los Angeles Realtor"
      />
      <ValueProps />
      <RecentlySold
        title="Homes for Sale and Recently Sold in Studio City"
        subtitle="See current homes for sale in Studio City and across Los Angeles, plus recent sales near you."
      />
      <Neighborhoods
        title="Neighborhoods Andrew Serves in Studio City and Los Angeles"
        sub="Studio City is Andrew’s home base, and the areas below make up most of his work. Looking for a Studio City real estate agent? Start with the Studio City page for streets, home types, and current listings."
        hoods={HOODS}
      />
      <Process
        title="How Andrew Helps You Buy or Sell"
        sub="Three steps from first conversation to keys or proceeds."
        steps={STEPS}
      />
      <Valuation
        title="How Much Is Your Studio City or Los Angeles Home Worth?"
        sub="Enter your address to get a free home valuation based on recent sales near you. Andrew can follow up with a personal review if you want one. There is no obligation."
      />
      <Testimonials title="What Clients Say About Working With Andrew" limit={2} />
      <Guides />
      <Faq title="Los Angeles and Studio City Real Estate FAQs" faqs={FAQS} />
      <OfficeMap />
      <FinalCta
        title="Ready to Buy or Sell in Studio City or Los Angeles?"
        copy="Start with a free conversation about your goals and timing."
      />
      <Newsletter />
    </>
  );
}

import type { Metadata } from "next";
import Hero from "./components/home/Hero";
import WhatsTheMove from "./components/home/WhatsTheMove";
import MeetAndrew from "./components/home/MeetAndrew";
import RecentlySold from "./components/home/RecentlySold";
import Process from "./components/home/Process";
import Neighborhoods from "./components/home/Neighborhoods";
import Valuation from "./components/home/Valuation";
import Testimonials from "./components/home/Testimonials";
import OfficeMap from "./components/home/OfficeMap";
import Newsletter from "./components/home/Newsletter";
import FinalCta from "./components/home/FinalCta";
import Faq from "./components/home/Faq";
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
const HOME_TITLE = "Real Estate Agent in Los Angeles | Certified Negotiator - Andrew Liberty";

const HOME_DESCRIPTION =
  "Work directly with Andrew Liberty, a Certified Real Estate Negotiation Expert in Los Angeles. Get a free consultation for buying, selling, or investing in Los Angeles real estate.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  /* The layout sets Open Graph and Twitter titles site-wide from its own
     constant. Without these two the card shared from the home page would carry
     a different headline from the page itself. */
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: SITE_URL },
  twitter: { title: HOME_TITLE, description: HOME_DESCRIPTION },
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
        "Andrew Liberty is a real estate agent in Los Angeles and Certified Real Estate Negotiation Expert with Compass, helping buyers, sellers, and investors in Studio City, Sherman Oaks, Valley Village, Hollywood Hills, Laurel Canyon, and Pasadena.",
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
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={IDENTITY} />
      <Hero />
      <WhatsTheMove />
      <MeetAndrew />
      <RecentlySold />
      <Process />
      <Neighborhoods />
      <Valuation />
      <Testimonials />
      <OfficeMap />
      <Newsletter />
      <FinalCta />
      <Faq />
    </>
  );
}

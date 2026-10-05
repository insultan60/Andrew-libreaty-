import type { Metadata } from "next";
import HomeSearchClient from "./HomeSearchClient";
import Faq, { type FaqItem } from "../components/home/Faq";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { isAreaKey } from "@/lib/areas";
import { stateFromParams } from "./listings";

const TITLE = "Los Angeles Homes for Sale | Andrew Liberty";
const DESCRIPTION =
  "Search homes for sale in Los Angeles, including Studio City, Sherman Oaks, and the Hollywood Hills. Filter by price, beds, baths, and property type with Andrew Liberty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/home-search" },
  /* The layout's site-wide share titles would otherwise override these on
     cards shared from this page. */
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/home-search" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/* Rendered below the listings. The Faq component emits the matching FAQPage
   structured data from this same array, so the visible answers and the
   schema cannot drift apart. */
const FAQS: FaqItem[] = [
  {
    q: "How much do I need for a down payment to buy a home in Los Angeles?",
    a: "Some loans require as little as 3% to 3.5% down. A larger down payment lowers your monthly payment and can make your offer stronger.",
  },
  {
    q: "Should I get pre-approved before I start touring homes?",
    a: "Yes. A pre-approval letter shows sellers you can afford the home, and most Los Angeles sellers expect one with your offer.",
  },
  {
    q: "What closing costs should I expect when I buy a home in Los Angeles?",
    a: "Expect about 2% to 5% of the purchase price. This covers lender fees, title and escrow fees, an appraisal, and prepaid taxes and insurance.",
  },
  {
    q: "How much are property taxes on a home in Los Angeles?",
    a: "About 1.25% to 1.35% of the purchase price each year. The base rate is 1%, and local bonds and assessments add the rest.",
  },
  {
    q: "Is it harder to get insurance on a home in a fire zone?",
    a: "Yes, it can be. Homes in high fire risk areas, including parts of the Hollywood Hills, may cost more to insure, so get a quote before you make an offer.",
  },
  {
    q: "How long does it take to buy a home in Los Angeles?",
    a: "Most purchases close 30 to 45 days after the seller accepts your offer. Cash buyers can often close faster.",
  },
  {
    q: "What should I check before buying a hillside home?",
    a: "Check the foundation, retaining walls, drainage, and slope stability. Also confirm that remodels have permits, and ask a structural engineer or geologist to look at steep lots.",
  },
  {
    q: "How does a buyer agent get paid?",
    a: "The fee is negotiable and agreed in writing before you tour homes. In many deals the seller offers to cover some or all of it.",
  },
  {
    q: "What is the average cost of a house in Los Angeles?",
    a: "The average home price in Los Angeles is about $1 million to $1.1 million. Condos in Los Angeles cost around $790,000. Single-family homes in Los Angeles average about $1.35 million. The median price for all of Los Angeles County is lower, at $850,000 to $900,000.",
  },
  {
    q: "Where is the cheapest and safest place to live in Los Angeles?",
    a: "No single neighborhood in Los Angeles is both the cheapest and the safest. Sunland, Tujunga, and Mission Hills are among the lower-priced areas. Porter Ranch, Mar Vista, Encino, and Woodland Hills are often listed among the safer areas. Safer neighborhoods usually cost more, so check LAPD crime data for any street before you buy.",
  },
];

export const revalidate = 900;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomeSearchPage({ searchParams }: Props) {
  /* Filters come from the query string (?area=studio-city&beds=3 ...) and are
     applied on the server too, so a neighbourhood link lands on - and the
     HTML carries - only that neighbourhood's homes. The feed itself is still
     the cached one; only the filtering is per request. */
  const [initialListings, params] = await Promise.all([fetchRawListingsServer(), searchParams]);
  const initialState = stateFromParams(params, isAreaKey);
  return (
    <>
      <HomeSearchClient initialListings={initialListings} initialState={initialState} />
      <Faq faqs={FAQS} />
    </>
  );
}

import type { Metadata } from "next";
import HomeSearchClient from "./HomeSearchClient";
import { fetchRawListingsServer } from "@/lib/idxServer";

export const metadata: Metadata = {
  title: "Home Search — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "Search active and sold homes for sale across Los Angeles — Studio City, Sherman Oaks, the Hollywood Hills and more. Filter by price, beds, baths, and property type. Andrew Liberty Team, Compass.",
  alternates: { canonical: "/home-search" },
};

/**
 * Listings are fetched HERE, on the server, rather than only in the browser.
 *
 * This page was being reported as a soft 404. It returned 200 with no listing
 * content at all: the markup carried the header, the filter chrome and the
 * footer, and the results area said "0 results" above a "Loading listings..."
 * spinner. The listings themselves landed about five seconds later from three
 * client-side IDX calls, and Google's renderer does not reliably wait that
 * long - so what it indexed was a page announcing it had nothing on it, which
 * is the definition of a soft 404.
 *
 * Fetching on the server puts real addresses, prices and neighbourhoods in the
 * first byte of HTML. The client still owns filtering, sorting and the map;
 * it simply starts from data instead of from nothing.
 *
 * revalidate caps how often IDX is called: the feed is regenerated at most
 * once every fifteen minutes however much traffic the page takes, which keeps
 * this well inside IDX Broker's hourly rate limit. Listings do not change
 * minute to minute, so nothing is lost by it.
 */
export const revalidate = 900;

export default async function HomeSearchPage() {
  const initialListings = await fetchRawListingsServer();
  return <HomeSearchClient initialListings={initialListings} />;
}

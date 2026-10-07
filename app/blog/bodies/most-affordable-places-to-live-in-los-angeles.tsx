import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Table } from "./_parts";

/**
 * Body for "Most Affordable Places to Live in Los Angeles".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * Copy is the supplied draft as written. blog.css styles h2 and h3 only, so
 * the draft's H4 level is folded up a step: the four suburbs and "Plan for
 * Costs" become h3s, and the short "If You Rent" / "If You Buy" pair become
 * bold lead-ins. The draft's "Affordable Suburbs" H3 sat directly under the
 * at-a-glance table; it is promoted to h2 so it is a sibling of
 * "Budget-Friendly City Neighborhoods", which is the structure the draft means.
 *
 * Sources: the draft names Nora Da Real Estate, LA Metro Home Finder, the
 * Census Bureau and Zillow. Each named source is linked where it first
 * appears (two of them were already linked in the draft). "One guide" /
 * "another guide" are unnamed in the draft and stay unlinked. The two closing
 * calls to action are added; everything else is the supplied text.
 */

const NORADA = "https://www.noradarealestate.com/blog/10-cheapest-neighborhoods-in-los-angeles/";
const LAMHF_BUY = "https://www.lametrohomefinder.com/blog/affordable-neighborhoods-los-angeles-county-2026";
const LAMHF_RENT = "https://www.lametrohomefinder.com/blog/most-affordable-neighborhoods-los-angeles-rent";
const CENSUS_LANCASTER = "https://www.census.gov/quickfacts/fact/table/lancastercitycalifornia/LFE046223";
const CENSUS_PALMDALE = "https://www.census.gov/quickfacts/fact/table/palmdalecitycalifornia/PST045225";
const CENSUS_POMONA = "https://www.census.gov/quickfacts/fact/table/pomonacitycalifornia/INC110223";
const ZILLOW_POMONA = "https://www.zillow.com/home-values/20008/pomona-ca/";
const ZILLOW_LA_COUNTY = "https://www.zillow.com/home-values/3101/los-angeles-county-ca/";

/**
 * Rendered twice: as visible copy below, and as FAQPage structured data in
 * app/blog/[slug]/page.tsx. Google requires the two to match, so they read from
 * this one array and the answers stay plain text.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the cheapest place to live in Los Angeles?",
    a: "Lancaster and Palmdale have the lowest home prices in LA County, at around $450,000 to $500,000. Inside the city, Panorama City is one of the cheapest places to rent. Your best pick depends on how far you can drive to work.",
  },
  {
    q: "Where can I buy a home in LA for under $500,000?",
    a: "Look in Lancaster and Palmdale in the Antelope Valley. LA Metro Home Finder lists 3- and 4-bedroom homes there from about $380,000 to $480,000. Check current listings, since prices move.",
  },
  {
    q: "Where can I rent in LA for under $2,000?",
    a: "Panorama City and Boyle Heights both show one-bedroom rents well under $2,000, near $1,630 and $1,640. The Census Bureau's median rents for Lancaster, Palmdale, and Pomona also fall under $2,000, at about $1,760 to $1,810. One 2026 guide gives a range of $1,300 to $1,750 for low-cost areas. Rents change by building and by month.",
  },
  {
    q: "How much income do I need to rent in Los Angeles?",
    a: "A common rule says rent should take 30% of your income or less. A $1,800 rent needs about $72,000 a year. Multiply your monthly rent by 12, then divide by 0.30.",
  },
  {
    q: "Is Lancaster a good place to live?",
    a: "Yes, if you want lower prices and more space. The trade-off is the commute, which can top two hours at rush hour. Remote workers often handle this best.",
  },
  {
    q: "Is the San Fernando Valley cheaper than the rest of LA?",
    a: "Parts of it are. Panorama City and Van Nuys cost less than most of the city. Studio City and Sherman Oaks cost more, so check each neighborhood.",
  },
  {
    q: "Is it cheaper to rent or buy in Los Angeles?",
    a: "Renting costs less each month. Buying costs more up front, but you own the home. Compare your full monthly cost, including tax, insurance, and HOA fees.",
  },
  {
    q: "What is the cheapest safe neighborhood in LA?",
    a: "No single area is both the cheapest and the safest. Safer areas often cost more. Check recent crime data for the exact street before you decide.",
  },
];

const AT_A_GLANCE: ReactNode[][] = [
  ["Lancaster", "Outer suburb", "About $460,000", "About $1,760 (all unit sizes)", "Far out in the Antelope Valley"],
  ["Palmdale", "Outer suburb", "About $500,000", "About $1,800 (all unit sizes)", "Quiet, small-town feel"],
  ["La Puente", "Suburb", "Some homes under $700,000", "Check listings", "About 20 miles from downtown"],
  ["Pomona", "Suburb", "About $690,000", "About $1,810 (all unit sizes)", "Easy access to LA and the Inland Empire"],
  ["Panorama City", "City neighborhood", "About $670,000", "About $1,630 (1 bedroom)", "Inside the city, in the Valley"],
  ["Boyle Heights", "City neighborhood", "About $670,000", "About $1,640 (1 bedroom)", "Close to downtown, rich culture"],
  ["Van Nuys", "City neighborhood", "Check listings", "Check listings", "Often listed among low-cost rentals"],
];

const CENTRAL: ReactNode[][] = [
  ["Valley Village", "Condos from about $600,000", "About $1.1M to $1.4M", "Quiet, tree-lined streets"],
  ["Sherman Oaks", "Condos about $600,000 to $950,000", "About $1.3M to $1.7M", "Ventura Boulevard and freeway access"],
  ["Studio City", "Condos and townhomes", "About $1.8M", "A walkable village feel"],
  ["Hollywood Hills", "Condos about $600,000 to $1.2M", "About $1.7M to $2.4M", "Views and privacy"],
];

export default function MostAffordablePlacesToLiveInLosAngeles() {
  return (
    <>
      <p>
        The most affordable places to live in the Los Angeles area are Lancaster and Palmdale for
        houses, and Panorama City and Boyle Heights for city living.
      </p>
      <p>
        Lancaster homes sell for about $460,000, and a one-bedroom in Panorama City rents for about
        $1,630, according to <ExternalLink href={NORADA}>Nora Da Real Estate</ExternalLink>.
      </p>
      <p>
        Low prices usually mean a longer drive, so this guide shows the price, rent, and trade-off
        for each area.
      </p>

      <h2>Affordable Places to Live in Los Angeles at a Glance</h2>
      <Table
        label="Affordable places to live in Los Angeles at a glance"
        head={["Area", "Type", "Typical home price", "Typical rent", "Worth knowing"]}
        rows={AT_A_GLANCE}
      />
      <p>
        Suburb rents are U.S. Census Bureau medians for all unit sizes (2020 to 2024). Neighborhood
        rents are one-bedroom averages. Prices are medians or typical values and change by month.
      </p>

      <h2>Affordable Suburbs in LA County</h2>
      <p>
        According to <ExternalLink href={LAMHF_BUY}>LA Metro Home Finder</ExternalLink>, Lancaster
        and Palmdale have the lowest median home prices in LA County, at around $450,000 to
        $500,000. The U.S. Census Bureau&rsquo;s figures below cover 2020 to 2024, so they run lower
        than today&rsquo;s market prices. The other suburbs cost more but sit much closer to the city.
      </p>

      <h3>Lancaster</h3>
      <p>
        Lancaster homes sell for a median price near $460,000. The{" "}
        <ExternalLink href={CENSUS_LANCASTER}>Census Bureau</ExternalLink> puts the median home value
        at $446,600 and median rent at $1,764. The city lies far out in the Antelope Valley, about 60
        miles north of downtown Los Angeles. One guide says rush-hour drives to downtown can take two
        hours.
      </p>

      <h3>Palmdale</h3>
      <p>
        Palmdale offers a quiet, small-town feel. The{" "}
        <ExternalLink href={CENSUS_PALMDALE}>U.S. Census Bureau</ExternalLink> reports a median home
        value of $471,000 and median rent of $1,802. Zillow puts today&rsquo;s typical home value
        closer to $500,000. Like Lancaster, Palmdale sits in the Antelope Valley, so plan for a long
        drive to central LA.
      </p>

      <h3>La Puente</h3>
      <p>
        La Puente lies about 20 miles from downtown Los Angeles. That makes it much closer than the
        Antelope Valley. LA Metro Home Finder lists it among places with single-family homes under
        $700,000.
      </p>

      <h3>Pomona</h3>
      <p>
        <ExternalLink href={ZILLOW_POMONA}>Zillow</ExternalLink> puts the typical Pomona home value
        near $690,000. The <ExternalLink href={CENSUS_POMONA}>Census Bureau&rsquo;s</ExternalLink>{" "}
        2020 to 2024 median is $593,800, with median rent at $1,810. The city gives you easy access to
        both Los Angeles and the Inland Empire. That helps if your job or family sits east of LA.
      </p>

      <h2>Budget-Friendly City Neighborhoods</h2>
      <p>
        City neighborhoods cost more than the far suburbs. They also save you hours on the road.
      </p>

      <h3>Panorama City</h3>
      <p>
        Nora Da Real Estate puts one-bedroom rent near $1,630 and the median home price near
        $674,000. Panorama City lies in the San Fernando Valley, so you stay inside the city. Another
        guide shows one-bedroom rents of $1,300 to $1,750 across several low-cost areas. Sun Valley,
        Sylmar, Pacoima, and Arleta also list single-family homes under $700,000.
      </p>

      <h3>Boyle Heights</h3>
      <p>
        Boyle Heights sits closer to downtown. Nora Da Real Estate shows one-bedroom rent near $1,640
        and a median home price near $672,000. The area offers rich cultural charm.
      </p>

      <h3>Van Nuys</h3>
      <p>
        <ExternalLink href={LAMHF_RENT}>LA Metro Home Finder</ExternalLink> lists Van Nuys among the
        most affordable places to rent in Los Angeles. ZIP code 91401 offers some of the
        Valley&rsquo;s lower-priced housing. Check current listings for exact prices.
      </p>

      <h2>What to Know Before You Pick a Low-Cost Area</h2>

      <h3>Think About Your Commute First</h3>
      <p>A lower price often means a longer drive. Count the time and the gas before you decide.</p>
      <ul>
        <li>
          <strong>Lancaster:</strong> a very long trip to downtown at rush hour
        </li>
        <li>
          <strong>La Puente:</strong> about 20 miles to downtown
        </li>
        <li>
          <strong>Panorama City and Van Nuys:</strong> inside the city, with shorter trips across the
          Valley
        </li>
      </ul>

      <h3>Compare Renting and Buying</h3>
      <p>
        <strong>If you rent:</strong> Renting keeps your upfront cost low. A one-bedroom in Panorama
        City costs about $1,630 a month.
      </p>
      <p>
        <strong>If you buy:</strong> Buying costs more up front, but you own the home.{" "}
        <ExternalLink href={ZILLOW_LA_COUNTY}>Zillow</ExternalLink> puts the typical Los Angeles
        County home value near $873,000, so the areas above cost far less.
      </p>

      <h3>Plan for Costs Beyond the Price</h3>
      <ul>
        <li>
          <strong>Property tax:</strong> California starts at 1% of the purchase price, and local
          charges add more.
        </li>
        <li>
          <strong>Closing costs:</strong> Buyers often pay 2% to 5% of the price.
        </li>
        <li>
          <strong>HOA fees:</strong> Condos and townhomes charge monthly dues.
        </li>
        <li>
          <strong>Insurance:</strong> Get a quote before you make an offer.
        </li>
        <li>
          <strong>As-is homes:</strong> Many lower-priced homes sell as-is, which means the seller
          won&rsquo;t make repairs. The seller must still tell you about problems they know of.
          Andrew&rsquo;s guide to{" "}
          <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>{" "}
          explains how these sales work, so you know what to ask before you offer.
        </li>
      </ul>

      <Cta title="Not Sure What You Can Afford?" label="Talk to Andrew" href="/contact">
        Tell us your budget, commute, and must-haves, and we&rsquo;ll show you which areas fit before
        you spend weekends touring the wrong ones.
      </Cta>

      <h2>Want a More Central Home? Neighborhoods Andrew Knows Best</h2>
      <p>
        A long commute is a deal breaker for many people. If that is you, look closer to the middle
        of LA. These neighborhoods cost more, but they offer walkable streets, schools, and quick
        freeway access. Condos give you the lowest way in.
      </p>
      <Table
        label="Central Los Angeles neighborhoods compared"
        head={["Neighborhood", "Entry point", "Typical median price", "Known for"]}
        rows={CENTRAL}
      />
      <p>
        Prices come from recent local market reports and change often.{" "}
        <a href="tel:+13107090581">Ask Andrew</a> for current sales in each area.
      </p>
      <p>Read more about each area:</p>
      <ul>
        <li>
          <Link href="/real-estate-agent-in-valley-village">Valley Village</Link> has quiet streets
          and the best value of the four.
        </li>
        <li>
          <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link> splits into flat
          streets north of Ventura and hills to the south.
        </li>
        <li>
          <Link href="/real-estate-agent-in-studio-city">Studio City</Link> offers a walkable village
          close to the Cahuenga Pass.
        </li>
        <li>
          <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link> puts views and
          privacy first.
        </li>
      </ul>

      <Cta title="Ready to Compare?" label="Browse Homes for Sale" href="/home-search">
        Browse homes for sale in Los Angeles and filter by price, bedrooms, and property type.
      </Cta>

      <h2>Frequently Asked Questions</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}
    </>
  );
}

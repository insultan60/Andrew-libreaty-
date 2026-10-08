import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Table } from "./_parts";

/**
 * Body for "Studio City vs Sherman Oaks".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * Copy is the supplied draft as written. The draft's at-a-glance table goes
 * through Table; its H2 > H3 structure maps straight onto blog.css's h2/h3.
 * The four negotiation tactics are bold lead-ins, as the draft sets them.
 *
 * Sources: every source the draft names is linked where it first appears —
 * Resideline Market Watch (one page per neighborhood), Cal Fire's hazard zone
 * viewer, the California FAIR Plan, HCD's ADU page and LA City Planning's
 * Ventura-Cahuenga corridor map. The Studio City and Sherman Oaks agent pages
 * are linked from the opening comparison, and the closing paragraph's three
 * offers (home search, valuation, consultation) link to their pages.
 *
 * Figures are the draft's: Resideline's Studio City page updated October 2026
 * and Sherman Oaks September 2026. Those pages update monthly, so the numbers
 * here are a snapshot and should be refreshed if the post is revised.
 *
 * Hero image: aerial of the Studio City hills looking north across the Valley,
 * by Logan Voss on Unsplash (photo-1724280984019-81fe8e9d6794), free under the
 * Unsplash License. Cropped from the bottom to 1600x1000 to drop the overcast
 * sky and keep the homes.
 */

const RESIDELINE_STUDIO_CITY = "https://resideline.com/blog/studio-city-ca-housing-market";
const RESIDELINE_SHERMAN_OAKS = "https://resideline.com/blog/sherman-oaks-ca-housing-market";
const CAL_FIRE_FHSZ =
  "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones";
const FAIR_PLAN = "https://www.cfpnet.com/";
const HCD_ADU = "https://www.hcd.ca.gov/policy-and-research/accessory-dwelling-units";
const LA_CORRIDOR_MAP =
  "https://planning.lacity.gov/odocument/f0387f4a-9132-471b-b1bb-a752bf7bf409/Sherman_Oaks_and_Studio_City_Map.pdf";

/**
 * Rendered twice: as visible copy below, and as FAQPage structured data in
 * app/blog/[slug]/page.tsx. Google requires the two to match, so they read from
 * this one array and the answers stay plain text.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Where exactly is the line between Studio City and Sherman Oaks?",
    a: "The two neighborhoods meet in the area around Coldwater Canyon Avenue and Ventura Boulevard, and LA City Planning's corridor map shows how they connect. Studio City uses ZIP code 91604, while Sherman Oaks uses ZIP codes such as 91423 and 91403. Always confirm the exact boundary for a specific address.",
  },
  {
    q: "Do I need to work in entertainment to live in Studio City?",
    a: "No. Plenty of residents work in tech, medicine, law, education and small business. The studio presence shapes the neighborhood's character, but it is not a requirement for living there.",
  },
  {
    q: "Can I buy for under $1 million in either neighborhood?",
    a: "Yes, mostly through condos and townhomes. About a quarter of tracked sales closed at or below $800,000 in Sherman Oaks and $975,000 in Studio City. Single-family houses at those prices are much harder to find.",
  },
  {
    q: "Are property taxes different between the two?",
    a: "Both sit in Los Angeles County and follow the same California rules under Proposition 13. The rate is capped at 1% of assessed value plus voter-approved debt, and a home is reassessed when ownership changes. Your title company can give you the exact figure for a specific home.",
  },
  {
    q: "Which is the best neighborhood in the San Fernando Valley overall?",
    a: "There is no single winner, because the answer depends on your priorities. Studio City and Sherman Oaks both rank high for location, dining and access to the studios. The right choice is the one that matches your budget, commute and the way you want to spend your weekends.",
  },
];

const AT_A_GLANCE: ReactNode[][] = [
  ["Median sold price (last 6 months)", "$1,780,000", "$1,400,000"],
  ["Median price per sq ft", "$754", "$704"],
  ["Middle half of sales", "$975,000 to $2,350,000", "$800,000 to $2,095,000"],
  ["Median days from listing to contract", "35", "33"],
  ["Sales tracked", "211", "385"],
  ["Feel", "Small village, walkable core", "Larger, more residential"],
  ["Best for", "Walkability, studio access", "Space, value, Westside access"],
];

export default function StudioCityVsShermanOaks() {
  return (
    <>
      <p>
        Studio City and Sherman Oaks share Ventura Boulevard, a border and a lot of the same buyers.
        They do not feel the same once you start touring. This Studio City vs Sherman Oaks guide
        compares prices, lifestyle, commutes, schools and hillside risks so you can pick the one that
        fits your life and your budget.
      </p>

      <h2>Studio City vs Sherman Oaks: The Quick Answer</h2>
      <p>
        Choose <Link href="/real-estate-agent-in-studio-city">Studio City</Link> if you want a
        walkable, village-style neighborhood close to the studios and you are willing to pay more for
        it. Choose <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link> if you want
        more space for your money and faster access to the Westside.
      </p>
      <p>
        Recent sales support that split. According to Resideline Market Watch, Studio City homes
        closed at a median of $1.78 million, while Sherman Oaks homes closed at $1.4 million.
      </p>

      <h2>Studio City vs Sherman Oaks at a Glance</h2>
      <Table
        label="Studio City vs Sherman Oaks at a glance"
        head={["Measure", "Studio City", "Sherman Oaks"]}
        rows={AT_A_GLANCE}
      />
      <p>
        Sources: Resideline Market Watch for{" "}
        <ExternalLink href={RESIDELINE_STUDIO_CITY}>Studio City</ExternalLink> (updated October
        2026) and <ExternalLink href={RESIDELINE_SHERMAN_OAKS}>Sherman Oaks</ExternalLink> (updated
        September 2026). Figures cover tracked closed sales in each postal area and may differ from
        county records.
      </p>

      <h2>Home Prices: What You Actually Pay</h2>

      <h3>Median price and price per square foot</h3>
      <p>
        Studio City&rsquo;s median sold price was $1,780,000. Sherman Oaks came in at $1,400,000. That
        is a gap of about $380,000, or roughly 27%.
      </p>
      <p>
        The price per square foot gap is much smaller. Studio City homes sold at a median of $754 per
        square foot, compared with $704 in Sherman Oaks, which is about 7% higher. That suggests part
        of the headline gap comes from the type of homes that sold, such as larger houses and
        hillside properties, and not only from the address.
      </p>

      <h3>Why a median can mislead you</h3>
      <p>
        Both markets have very wide price ranges. The middle half of Studio City sales closed between
        $975,000 and $2,350,000. In Sherman Oaks, that band ran from $800,000 to $2,095,000.
      </p>
      <p>
        Resideline itself warns that the citywide number cannot price a specific address in either
        market. A condo near Ventura Boulevard and a view home in the hills can sit inside the same
        median and still belong to different markets. Price the specific house with close comparable
        sales, not the neighborhood average.
      </p>

      <h3>What your budget buys</h3>
      <p>
        Studio City offers condos and townhomes near Ventura Boulevard, updated cottages on the flats,
        and hillside homes with views. Sherman Oaks has a similar mix, but it leans toward mid-century
        ranch homes, newer rebuilds and larger yards.
      </p>
      <p>
        For the same budget, Sherman Oaks usually gets you more house or more outdoor space. Studio
        City usually charges extra for location and walkability.
      </p>

      <h2>Lifestyle and Walkability</h2>

      <h3>Studio City: a small-village feel</h3>
      <p>
        Studio City works well if you like walking to coffee and dinner. Ventura Boulevard and Tujunga
        Village have independent restaurants, cafes and shops within a few blocks of each other.
      </p>
      <p>
        The Studio City Farmers Market fills Ventura Place every Sunday with more than 80 vendors.
        Many residents work in film and television, since CBS Studio Center sits inside the
        neighborhood.
      </p>

      <h3>Sherman Oaks: larger and more residential</h3>
      <p>
        Sherman Oaks covers more ground and spreads its activity out. Westfield Fashion Square and the
        Galleria area handle shopping, and Ventura Boulevard has plenty of restaurants.
      </p>
      <p>
        Walkable pockets exist near Ventura and Van Nuys Boulevards. Most daily errands still need a
        car, which is why many buyers describe the streets as quieter.
      </p>
      <p>
        If you are weighing living in Studio City vs Sherman Oaks on walkability alone, Studio City
        wins. If you care more about calm side streets and a bigger lot, Sherman Oaks fits better.
      </p>

      <h2>Commute and Location</h2>

      <h3>Getting to the studios</h3>
      <p>
        Studio City sits next to Universal Studios Hollywood, Warner Bros. and the Disney lot in
        Burbank. The Universal City/Studio City station on the Metro B Line sits inside the
        neighborhood and connects to Hollywood and downtown.
      </p>
      <p>
        Sherman Oaks is still close to those studios through the 101. The drive is a little longer,
        and that trade-off matters if you commute daily.
      </p>

      <h3>Crossing to the Westside</h3>
      <p>
        Sherman Oaks has the edge here because the 405 runs through the Sepulveda Pass toward UCLA,
        Century City and West Los Angeles. Studio City drivers usually cross by Laurel Canyon
        Boulevard or Coldwater Canyon Avenue, or take the 101 over the Cahuenga Pass to Hollywood.
      </p>
      <p>
        Traffic on the 101 and 405 can slow any route at rush hour. Drive your real commute at the
        time you would actually leave before you commit.
      </p>

      <h2>Studio City or Sherman Oaks for Families</h2>

      <h3>Public and private schools</h3>
      <p>
        LAUSD serves both neighborhoods, and school assignment depends on the exact address. In
        Studio City, Carpenter Community Charter is the neighborhood K-5 school. Magnet programs such
        as the Sherman Oaks Center for Enriched Studies admit by application, and despite the name,
        the campus sits in Reseda.
      </p>
      <p>
        Private options are strong on both sides of the boulevard. Harvard-Westlake&rsquo;s Upper
        School and Campbell Hall are in Studio City. The Buckley School and Notre Dame High School are
        in Sherman Oaks. Confirm boundaries and admission rules before you write an offer.
      </p>

      <h3>Parks and outdoor space</h3>
      <p>
        Studio City buyers get quick access to trails at Wilacre Park and Fryman Canyon Park, which
        connect through the Betty B. Dearing Trail. Families who like a hike before school drop-off
        tend to love that.
      </p>
      <p>
        Sherman Oaks has Van Nuys-Sherman Oaks Park for sports and recreation. A bigger yard at home
        often matters more here.
      </p>

      <h2>Hillside, Fire and Insurance Checks</h2>
      <p>
        Both neighborhoods include hillside streets along the Santa Monica Mountains. After Cal
        Fire&rsquo;s latest update, almost everything on both sides of the 405 through the Sepulveda
        Pass is now in the highest hazard category. You can look up any address on{" "}
        <ExternalLink href={CAL_FIRE_FHSZ}>Cal Fire&rsquo;s zone viewer</ExternalLink>.
      </p>
      <p>
        Sellers in high and very high zones must follow disclosure rules, and a defensible space
        inspection must be completed before a sale. That affects timing and cost, so ask about it
        early.
      </p>
      <p>
        Some buyers in brush areas end up on the{" "}
        <ExternalLink href={FAIR_PLAN}>California FAIR Plan</ExternalLink>, the state&rsquo;s
        insurer of last resort. Get an insurance quote before you make an offer on any hillside home,
        not after.
      </p>
      <p>
        Hillside homes also need a closer look at retaining walls, drainage and soil reports. A
        standard inspection will not cover all of that. Ask your agent which specialists to bring in.
      </p>

      <Cta title="Touring Hillside Homes?" label="Talk to Andrew" href="/contact">
        Andrew can tell you which specialists to bring in and what to check before you make an offer
        on a hillside home in either neighborhood.
      </Cta>

      <h2>Who Should Choose Studio City vs Sherman Oaks</h2>

      <h3>Young professionals and entertainment workers</h3>
      <p>
        Studio City suits you if your work is tied to the studios and you want to walk to dinner. You
        pay more per square foot, but you save time on commutes and weekends.
      </p>

      <h3>Families who want a yard</h3>
      <p>
        Sherman Oaks usually gives you more yard and more bedrooms for the money. Studio City works
        for families too, especially if you prefer canyon trails and a smaller-town feel.
      </p>

      <h3>Move-up buyers and downsizers</h3>
      <p>
        Move-up buyers often choose Sherman Oaks for the larger flat lots. Downsizers tend to prefer
        Studio City condos and townhomes near the boulevard, where they can walk to most things.
      </p>

      <h3>Investors</h3>
      <p>
        Both areas attract rental demand from people who work around the studios and Ventura
        Boulevard. State law makes it easier to add a second unit on many single-family lots, and{" "}
        <ExternalLink href={HCD_ADU}>HCD publishes the current ADU rules</ExternalLink>. Zoning and
        hillside limits still change from lot to lot, so run the numbers on each property before you
        assume an ADU will work.
      </p>

      <h2>How to Negotiate in Each Market</h2>
      <p>
        Both neighborhoods move at a similar pace. The median Studio City home went under contract
        about 35 days after listing, and Sherman Oaks took about 33 days. That gives buyers time to
        inspect, ask questions and negotiate, instead of rushing a blind offer.
      </p>
      <p>
        Sherman Oaks recorded 385 tracked sales over six months, compared with 211 in Studio City.
        More sales means more comparable data, which makes it easier to support a price. In Studio
        City, fewer comps and a wider spread make comp selection the main negotiating tool.
      </p>
      <p>A few tactics apply in both places:</p>
      <ul>
        <li>
          <strong>Use close comps.</strong> Match the street, lot size and condition, not just the
          neighborhood.
        </li>
        <li>
          <strong>Ask for repair credits.</strong> Older homes are common here, and inspection
          findings give you real leverage.
        </li>
        <li>
          <strong>Read the listing history.</strong> Price cuts and long days on market tell you how
          firm a seller is.
        </li>
        <li>
          <strong>Know your limits before touring.</strong> Decide your walk-away price early so a
          tour does not decide it for you.
        </li>
      </ul>

      <h2>Your Decision Checklist</h2>
      <p>Answer these before you tour:</p>
      <ul>
        <li>What is your daily commute: studios, Westside, Hollywood or downtown?</li>
        <li>Do you need a large yard, or is a smaller lot fine?</li>
        <li>How much do you value walking to restaurants and cafes?</li>
        <li>Which school path are you planning, and have you checked the address?</li>
        <li>Are you comfortable with a hillside home and its insurance costs?</li>
        <li>Does your budget land closer to the lower or upper half of each price range?</li>
        <li>Have you toured both neighborhoods on a weekday morning and on a weekend?</li>
      </ul>
      <p>Touring both on the same afternoon makes the difference obvious within a couple of hours.</p>

      <h2>FAQs</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling.
          The first answer names LA City Planning's map, so it is linked in the
          visible copy; the schema copy in FAQS stays plain text. */}
      {FAQS.map((item, i) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          {i === 0 ? (
            <p>
              The two neighborhoods meet in the area around Coldwater Canyon Avenue and Ventura
              Boulevard, and{" "}
              <ExternalLink href={LA_CORRIDOR_MAP}>LA City Planning&rsquo;s corridor map</ExternalLink>{" "}
              shows how they connect. Studio City uses ZIP code 91604, while Sherman Oaks uses ZIP
              codes such as 91423 and 91403. Always confirm the exact boundary for a specific address.
            </p>
          ) : (
            <p>{item.a}</p>
          )}
        </Fragment>
      ))}

      <h2>Final Verdict: Studio City vs Sherman Oaks</h2>
      <p>
        In the Studio City vs Sherman Oaks decision, Studio City wins on walkability, village charm
        and studio access. Sherman Oaks wins on space, price per square foot and Westside
        connections. The best neighborhood is the one whose trade-offs you can live with every day.
      </p>
      <p>
        Before you tour, pull recent comparable sales for the exact streets you like. Andrew Liberty
        is a Compass agent and Certified Real Estate Negotiation Expert who works both neighborhoods.
        You can <Link href="/home-search">start a home search</Link>,{" "}
        <Link href="/home-valuation">request a free home valuation</Link>, or{" "}
        <Link href="/contact">schedule a consultation</Link> to talk through your options.
      </p>

      <Cta title="Ready to Compare Both?" label="Browse Homes for Sale" href="/home-search">
        Browse homes for sale in Studio City and Sherman Oaks and filter by price, bedrooms, and
        property type.
      </Cta>
    </>
  );
}

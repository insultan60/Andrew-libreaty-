import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ProsCons, Steps, Table } from "./_parts";

/**
 * Body for "House Hacking in Los Angeles".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * The worked example is a real two-column table (item, amount), so it uses
 * Table. The seven steps are numbered because their order is the point, and
 * the strengths and trade-offs use ProsCons, since the two lists are not
 * paired row by row.
 *
 * Sources are named in the copy as supplied (Freddie Mac, the 2026 county loan
 * limits, the City's Home-Sharing rules, the RSO and AB 1482) without outbound
 * links: the draft did not supply URLs, and a link to the wrong page of an
 * agency site is worse than none.
 *
 * Hero: a hand holding a model house, from the stock artwork supplied with the
 * project, cropped to 16:10.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I use future rent to qualify for the loan?",
    a: "Sometimes. Lenders may count projected rent from the other units on a 2 to 4 unit purchase, but rules differ. FHA applies a self-sufficiency test to three and four-unit properties, which requires 75% of projected rent to cover the full mortgage payment.",
  },
  {
    q: "Can I house hack with a condo?",
    a: "Yes, with a roommate. FHA only lends on condos in HUD-approved projects, and your HOA may limit renting, so check both before you offer.",
  },
  {
    q: "What happens to my taxes when I sell a house hack?",
    a: "The home sale exclusion covers the gain on the part you lived in if you meet the two-of-five-year test. The rental share of the gain is taxable, and depreciation you claimed is recaptured. Talk to a CPA before you sell.",
  },
  {
    q: "How long must I live in the property?",
    a: "With an FHA loan you must move in within 60 days of closing and use it as your primary residence. Lenders generally expect you to stay at least a year, and after that you may be free to rent out the whole building.",
  },
  {
    q: "How do I report rental income?",
    a: "Rental income goes on Schedule E, not Schedule C, and it is generally not subject to self-employment tax when you only rent space. Split expenses between personal and rental use, keep records from day one, and check whether your city requires rental registration.",
  },
];

const WORKED_EXAMPLE: ReactNode[][] = [
  ["Purchase price (duplex in the Valley)", "$1,200,000"],
  ["Down payment (FHA, 3.5%)", "$42,000"],
  ["Loan, with upfront mortgage insurance added", "About $1,178,000"],
  ["Principal and interest (about 7.3%)", "About $8,080 a month"],
  ["Property tax (about 1.2% of price)", "About $1,200 a month"],
  ["Annual FHA mortgage insurance (estimate)", "About $530 a month"],
  ["Landlord insurance (estimate)", "About $300 a month"],
  [<strong key="t">Total monthly cost</strong>, <strong key="tv">About $10,110</strong>],
  ["Rent from the second unit (assumed 2 bedrooms)", "$3,000 a month"],
  [<strong key="n">Your net monthly cost</strong>, <strong key="nv">About $7,110</strong>],
];

const STEPS: [string, ReactNode][] = [
  ["Get pre-approved.", "Ask a lender about FHA and conventional options and your realistic price range."],
  ["Pick the type.", "Choose among a multi-unit building, an ADU, or roommates."],
  ["Check the rules.", "Confirm RSO, AB 1482, permit, and HOA status before you tour."],
  ["Run the numbers on each property.", "Use real rents, rate quotes, tax, and insurance."],
  ["Inspect and review documents.", "Read leases, permits, and operating costs during your contingency period."],
  ["Negotiate and close.", "Use credits and timing, not only price."],
  ["Set up as a landlord.", "Open a separate account, use written leases, and carry the right insurance."],
];

export default function HouseHackingInLosAngeles() {
  return (
    <>
      <p>
        The median home in the Los Angeles metro area sold for about $860,000 in April 2026, and the
        average 30-year mortgage rate reached 7.32% in late October. Those two numbers push many buyers
        out of a normal purchase. House hacking in Los Angeles is one way to narrow the gap: you buy a
        home with a rentable space, live in part of it, and let a tenant cover part of the bill.
      </p>
      <p>
        This guide shows the real math, the LA rules that matter, and where the strategy works best in
        the Valley.
      </p>

      <h2>What Is House Hacking in Los Angeles?</h2>
      <p>
        House hacking means buying a property, living in one part, and renting out the rest. The rent
        offsets your housing cost, and you can use owner-occupant financing instead of an investor loan.
      </p>
      <p>
        It comes in three common forms: a duplex, triplex, or fourplex where you live in one unit; a
        house with an ADU or garage conversion; and a house or condo with roommates. At today’s prices
        and rates, it usually reduces your cost rather than erasing it.
      </p>

      <h2>Does House Hacking Work in Los Angeles? A Worked Example</h2>
      <p>
        Here is an illustration, not a quote. It assumes a $1.2 million duplex in the Valley, FHA
        financing, and a rate near the national average Freddie Mac reported on October 22, 2026.
      </p>
      <Table
        label="Illustrative monthly cost of a $1.2 million Valley duplex house hack"
        head={["Item", "Illustrative amount"]}
        rows={WORKED_EXAMPLE}
      />
      <p>
        Tax uses the roughly 1.2% to 1.25% new buyers pay in the City of Los Angeles. Mortgage insurance,
        landlord insurance, and rent are estimates, so replace them with lender and insurer quotes and
        local rent comps. Cash needed at closing would be about $72,000 with the down payment and an
        estimated 2.5% for closing costs, plus reserves.
      </p>
      <p>
        The rent covers about 30% of the monthly cost, which is real help but not free housing. At a rate
        near 6.5%, principal and interest would drop by roughly $630 a month, so rate moves matter. Lower
        prices, higher rents, or a three or four-unit building change the picture quickly.
      </p>
      <p>
        Prices vary a lot across the Valley. Listings reviewed for this guide in spring 2026 ranged from
        about $1 million for a North Hollywood duplex to $1.5 million and above for multi-unit properties
        in <Link href="/real-estate-agent-in-valley-village">Valley Village</Link> and{" "}
        <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link>.
      </p>

      <h2>Types of House Hacks in LA</h2>
      <h3>Duplex, Triplex, and Fourplex</h3>
      <p>
        You live in one unit and rent the others. For 2026, loan limits in Los Angeles County are
        $1,599,375 for two units, $1,933,200 for three, and $2,402,625 for four, so most Valley
        multi-unit properties fit under them. Our guide to{" "}
        <Link href="/blog/how-to-buy-a-duplex-in-los-angeles">buying a duplex in Los Angeles</Link> covers
        the purchase steps in more depth.
      </p>
      <h3>ADU or Garage Conversion</h3>
      <p>
        State law requires cities to allow an ADU of at least 800 square feet, up to 16 feet tall, with
        4-foot side and rear setbacks, on most residential lots. A garage conversion does not need
        replacement parking. One Los Angeles builder puts a 400 to 500 square foot garage conversion at
        $90,000 to $160,000 in 2026.
      </p>
      <p>
        State law also bars cities from requiring owner occupancy for a standard ADU, though junior ADUs
        generally still need the owner on site. A newly built ADU also falls outside the RSO, and AB 1482
        generally exempts buildings under 15 years old. Always confirm coverage with the Los Angeles
        Housing Department.
      </p>
      <h3>Roommates in a House or Condo</h3>
      <p>
        This is the simplest version, with no construction and no new unit to permit. Check HOA rental
        rules first, since some associations limit renting, and ask your lender how much roommate income
        counts.
      </p>
      <h3>Short-Term Rental Limits</h3>
      <p>
        The City of Los Angeles allows short-term rentals only in your primary residence. A regular
        Home-Sharing registration caps you at 120 days per calendar year, and an extended registration
        allows more. Second homes and investment properties do not qualify, and ADU hosts face the same
        cap.
      </p>
      <p>
        Rentals longer than 30 days count as long-term and do not need that registration. Short-term
        income is rarely the base case in the city, so build your numbers on long-term rent.
      </p>

      <h2>How to Finance a House Hack in Los Angeles</h2>
      <p>
        FHA loans are the most common route. They allow 3.5% down on 1 to 4 units with a credit score of
        580 or higher, plus an upfront mortgage insurance premium of 1.75% and an annual premium that runs
        for 11 years if you put down 10% or more, and for the loan term if you put down less.
      </p>
      <p>
        Conventional loans have caught up. Fannie Mae-backed loans have allowed 5% down on owner-occupied
        2 to 4 unit homes since November 2023, though lenders add their own credit and reserve rules and
        some still ask for more. Conventional mortgage insurance can generally be removed later, while FHA
        premiums on low-down-payment loans last for the loan term.
      </p>
      <p>
        Compare both with a lender before you shop. Rates are above 7% as of late October 2026, so a small
        rate difference changes your monthly cost by hundreds of dollars.
      </p>

      <h2>LA Rules to Know Before You Buy</h2>
      <p>
        The Rent Stabilization Ordinance, or RSO, generally covers buildings with two or more units built
        on or before October 1, 1978 in the City of Los Angeles. In November 2025 the City Council voted to
        cap annual increases for RSO units at 1% to 4%, replacing a 3% to 8% range, so confirm the current
        figure with the Housing Department.
      </p>
      <p>
        For buildings the RSO does not cover, AB 1482 limits increases to 5% plus local inflation, up to
        10%, and the Just Cause Ordinance covers most other City rentals. AB 1482 exempts a duplex where
        the owner lives in one unit, but that does not remove RSO coverage for a pre-1979 duplex.
      </p>
      <p>
        If you buy with tenants in place, they usually stay on their current leases and rents, so build
        their actual rent into your numbers. An unpermitted unit is another risk, since it may not be
        legal to rent, and lenders and insurers can balk. Ask for the permit history before you offer.
      </p>

      <h2>Where House Hacking Works Best in LA</h2>
      <p>
        Andrew’s core Valley areas offer different paths. Valley Village and North Hollywood show up often
        in small multifamily listings, and the average single-family list price in Valley Village was
        around $1.29 million to $1.33 million in May 2026.
      </p>
      <p>
        In <Link href="/real-estate-agent-in-studio-city">Studio City</Link> and Sherman Oaks, house
        hacking tends to mean roommates or an ADU on a single-family lot, since multi-unit listings are
        scarcer and pricier. Hillside areas like{" "}
        <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and the{" "}
        <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link> add permit, access, and
        fire considerations to any ADU plan.
      </p>
      <p>
        If your budget is tighter, our guide to the{" "}
        <Link href="/blog/most-affordable-places-to-live-in-los-angeles">
          most affordable places to live in Los Angeles
        </Link>{" "}
        shows where prices start lower.
      </p>

      <h2>How to Evaluate and Negotiate a House Hack</h2>
      <p>
        Treat the building like a small business. Andrew’s background in commercial real estate shapes
        this step, and these checks come first:
      </p>
      <ul>
        <li>
          <strong>Rent roll and leases.</strong> Compare actual rents to market rents, and note lease end
          dates.
        </li>
        <li>
          <strong>Rent control status.</strong> Confirm the year built and whether the RSO or AB 1482
          applies.
        </li>
        <li>
          <strong>Permit history.</strong> Look for unpermitted units, garage conversions, or additions.
        </li>
        <li>
          <strong>Operating costs.</strong> Ask who pays water, trash, and gardening, and get the last year
          of utility bills.
        </li>
        <li>
          <strong>Condition.</strong> Have roof, plumbing, electrical, and foundation inspected, since you
          will own every repair.
        </li>
      </ul>
      <p>
        Negotiation is where price, repairs, and timing can move your numbers. Andrew is a Certified Real
        Estate Negotiation Expert, and the main levers are the price, repair credits after inspection,
        seller credits toward closing costs, and a possession date that matches tenant notice periods. Our
        guide on{" "}
        <Link href="/blog/how-to-negotiate-a-house-price-in-los-angeles">
          how to negotiate a house price in Los Angeles
        </Link>{" "}
        covers each one.
      </p>

      <Cta title="Run the Numbers on a Real Property" label="Schedule a Consultation" href="/contact">
        Send a listing you are watching, and we will check the rents, the rent control status and the
        permits before you write an offer.
      </Cta>

      <h2>House Hacking Step by Step</h2>
      <Steps items={STEPS} />

      <h2>Is House Hacking Right for You?</h2>
      <ProsCons
        pros={[
          "A low down payment, with FHA at 3.5% and some conventional options at 5%.",
          "Rent that offsets part of your housing cost from the first month.",
          "Equity growth and a hands-on start in real estate investing.",
          "A repeatable plan, since lenders generally ask you to live there for about a year before you can buy again.",
        ]}
        cons={[
          "Less privacy, because you share a lot or a wall.",
          "Landlord duties, from repairs to rent control compliance.",
          "Tight cash flow at today’s rates and prices.",
          "Real upfront cash for the down payment, closing costs, and reserves.",
        ]}
      />

      <h2>Frequently Asked Questions About House Hacking in Los Angeles</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling.
          The answers stay plain text, without links, so they match the
          FAQPage schema exactly. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}

      <h2>Your Next Step in House Hacking in Los Angeles</h2>
      <p>
        House hacking in Los Angeles works when the numbers, the rules, and the property all line up. Run
        the math before you fall for a listing, and confirm rent control, permits, and financing early.
      </p>
      <p>
        Andrew Liberty combines a commercial real estate background with negotiation expertise to evaluate
        these deals. <Link href="/home-search">Browse homes</Link>,{" "}
        <Link href="/neighborhoods">explore neighborhoods</Link>,{" "}
        <Link href="/contact">schedule a consultation</Link>, or call{" "}
        <a href="tel:+13107090581">(310) 709-0581</a>.
      </p>
    </>
  );
}

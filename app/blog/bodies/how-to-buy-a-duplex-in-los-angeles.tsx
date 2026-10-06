import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Steps, Table } from "./_parts";

const ZIMAS = "https://zimas.lacity.org/";
const LAHD_RSO = "https://housing.lacity.gov/residents/rso-overview";
const ASSESSOR_REAL_PROPERTY = "https://assessor.lacounty.gov/homeowners/realproperty";
const FHA_LIMITS = "https://entp.hud.gov/idapp/html/hicostlook.cfm";
const LADBS_SOFT_STORY =
  "https://www.ladbs.org/services/core-services/plan-check-permit/plan-check-permit-special-assistance/mandatory-retrofit-programs/soft-story-retrofit-program";

/**
 * Body for "How to Buy a Duplex in Los Angeles".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * The supplied copy is table-heavy (quick facts, owner vs investor, the LA
 * rules, the loan options, the NOI example, due diligence) and those all go
 * through Table. The ten-step purchase sequence is numbered (Steps) because
 * its order is the content.
 *
 * Links: the three earlier posts the copy names are linked in place. Outbound
 * links (ZIMAS, LAHD's RSO page, the Assessor, HUD's FHA limit lookup and
 * LADBS's soft-story program) go through ExternalLink, so they're nofollow.
 *
 * NOT YET IN: the supplied draft carries an editor's note asking Andrew for one
 * real, anonymized example of something an inspection or tenant review turned
 * up on a duplex he worked on, placed after the estoppel section. That note is
 * an instruction, not copy, so it is not rendered. Add the example as a
 * paragraph after "Talk to the tenants through the seller" once he supplies it.
 */

/**
 * Rendered twice: as visible copy below, and as FAQPage structured data in
 * app/blog/[slug]/page.tsx. Google requires the two to match, so they read from
 * this one array and the answers stay plain text.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is a duplex better than a single-family home with an ADU?",
    a: "Neither is better in every case. A duplex gives you two units under one roof, while a house with an ADU gives you more separation. Check rent control either way, because LAHD lists ADUs and junior ADUs as covered units when they sit on an RSO property.",
  },
  {
    q: "Does two houses on one lot count as a duplex?",
    a: "For rent control, LAHD treats two or more single-family dwellings on the same parcel like other covered property if the lot was built by the cutoff date. For financing, ask your lender how it classifies the property, because detached units can be underwritten differently.",
  },
  {
    q: "Should I buy a duplex in an LLC?",
    a: "Most owner-occupied loans are written to individual borrowers, so an LLC usually does not fit that path. The state's owner-occupied duplex exemption also excludes corporations and LLCs with a corporate member. Ask an attorney and a CPA before you choose how to hold the title.",
  },
  {
    q: "Do I need a property manager?",
    a: "Not required for a duplex you live in, but it depends on your schedule and how comfortable you are handling repairs and tenant questions. If you plan to rent both units or live far away, price a manager into your numbers before you offer.",
  },
  {
    q: "How are taxes different when I live in half the building?",
    a: "The half you live in and the half you rent are generally treated differently, and the rented half can bring deductions such as depreciation. The rules are detailed, so ask a CPA who works with rental property to explain how they apply to you.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  [
    "Lowest down payment if you live in one unit",
    "FHA allows 3.5% with a 580 credit score. Some conventional loans allow 5%.",
  ],
  [
    <ExternalLink key="fha" href={FHA_LIMITS}>
      FHA loan limit for a duplex in LA County (2026)
    </ExternalLink>,
    "$1,599,375",
  ],
  [
    "Does rent control apply?",
    "Often. The City's Rent Stabilization Ordinance (RSO) covers most duplexes built on or before October 1, 1978.",
  ],
  ["How much rent will a lender count?", "Commonly 75% of the rent from the unit you do not live in."],
  ["Do you have to live there?", "For FHA, yes. Plan on at least 12 months."],
  [
    "Is the soft-story retrofit law a concern?",
    "Not for a duplex. LA's mandatory program skips residential buildings with 3 or fewer units.",
  ],
];

const PATHS: ReactNode[][] = [
  ["You live in the building", "Yes, in one unit", "No"],
  ["Common loans", "FHA, VA, conventional owner-occupied", "Conventional investment, DSCR"],
  ["Down payment", "As low as 3.5% with FHA", "Lenders often ask for 20% to 25% or more"],
  [
    "Rent counted to qualify",
    "Commonly 75% of the other unit's rent",
    "Varies by loan. DSCR loans focus on the property's rent",
  ],
  ["Day-to-day work", "You are the on-site landlord", "You or a property manager handle it"],
];

const LA_RULES: ReactNode[][] = [
  [
    "Annual rent increase",
    "LAHD currently lists 3% for RSO units. A newer formula of 90% of CPI, with a 1% floor and a 4% cap, is set to apply going forward. Confirm the current number before you underwrite.",
  ],
  [
    "Rent reset",
    "A new rent level can be set after a tenant moves out voluntarily or is evicted for cause. Until then, increases stay capped.",
  ],
  [
    "Registration",
    "Every RSO unit must be registered with LAHD each year. The fee is $38.75 per unit, and tenants can be charged part of it. Ask the seller for the registration certificates.",
  ],
  [
    "Moving into a tenant's unit",
    "Owner move-in is a no-fault reason for eviction under the RSO, and it may require relocation assistance. You cannot simply move in because you bought the building.",
  ],
  [
    "Buildings built after 1978",
    "The RSO usually does not apply, but the City's Just Cause Ordinance and the state's AB 1482 rules can.",
  ],
];

const LOANS: ReactNode[][] = [
  [
    "FHA",
    "3.5% with a 580 credit score",
    "Yes, move in within 60 days and plan on 12 months",
    "Upfront and monthly mortgage insurance. The 2026 LA County limit for two units is $1,599,375.",
  ],
  [
    "VA",
    "0% for eligible borrowers",
    "Yes",
    "Up to four units if you occupy one. You need VA entitlement.",
  ],
  [
    "Conventional, owner-occupied",
    "As low as 5% on some loans",
    "Yes",
    'Fannie Mae allows up to 95% financing on two-to-four-unit homes you live in, but only for conforming loan amounts. Larger "high-balance" duplex loans have a lower limit.',
  ],
  [
    "Conventional, investment",
    "Often 20% to 25% or more",
    "No",
    "Higher rates and stricter rules than owner-occupied loans",
  ],
  [
    "DSCR",
    "Often 20% to 25%",
    "No",
    "Approval leans on the property's rent. Rates run higher, and some loans carry prepayment penalties.",
  ],
];

const NOI: ReactNode[][] = [
  ["Rent if both units are rented ($3,100 + $2,900 a month)", "$72,000"],
  ["Vacancy and unpaid rent (5%)", "-$3,600"],
  ["Property tax (about 1.2% of price)", "-$12,000"],
  ["Insurance (no earthquake coverage)", "-$4,000"],
  ["Repairs and upkeep (10% of rent)", "-$7,200"],
  ["Utilities the owner pays", "-$3,000"],
  ["City registration and fees", "-$300"],
  ["Net operating income", <strong key="noi">$41,900</strong>],
];

const DUE_DILIGENCE: ReactNode[][] = [
  [
    "Legal unit count and permits",
    "Pull permit history from the City and read the seller's Residential Property Report. City sellers must provide it before escrow. Compare it with what the listing claims.",
  ],
  ["Rent control status", "Look up the address on ZIMAS. Ask for the LAHD registration certificate for each unit."],
  ["Each unit, inside", "Have the inspector enter both units, not just the one that is vacant or easy to reach."],
  ["Plumbing and sewer", "Ask for a sewer line camera scan. Older buildings often have aging drain lines."],
  ["Electrical", "Check each unit's panel and ask whether the wiring was updated under a permit."],
  [
    "Roof, foundation, and drainage",
    "Hire a licensed inspector. On hillside lots, ask about retaining walls and whether a geology report is worth ordering.",
  ],
  ["Pests", "Order a termite inspection that covers the whole structure."],
  ["Utilities", "Confirm which meters serve which unit and who pays for water, gas, and trash."],
];

const STEPS: [string, ReactNode][] = [
  [
    "Pick your path and your budget.",
    "Decide whether you will live in one unit or buy as an investor. Budget for the down payment, closing costs, and a repair and vacancy reserve.",
  ],
  [
    "Get pre-approved by a two-to-four-unit lender.",
    "Share the loan terms and how the lender counts rent, so you search inside the right price range.",
  ],
  [
    "Choose the area and check the jurisdiction.",
    "Confirm whether the parcel is in the City of Los Angeles or another city, then look up its RSO status and zoning on ZIMAS.",
  ],
  [
    "Search with an agent who knows a small multifamily.",
    "Ask for the rent roll, leases, and 12 months of rent deposits before you write an offer.",
  ],
  [
    "Run the numbers.",
    "Build NOI and a cap rate from real income and real expenses, then test a below-market tenant.",
  ],
  [
    "Make the offer with the right contingencies.",
    "Your contract should give you time for inspections, tenant documents, insurance quotes, your loan, and the appraisal.",
  ],
  [
    "Complete due diligence.",
    "Inspect both units, review the permit history and Residential Property Report, collect estoppel certificates, and confirm insurance.",
  ],
  [
    "Clear appraisal and underwriting.",
    "The appraiser may estimate market rent for the second unit, and the lender uses that figure under its own rules.",
  ],
  [
    "Close and take over the tenancy.",
    "Confirm who holds the deposits, send tenants written notice of the new owner and where to pay rent, and check the LAHD registration for each unit.",
  ],
  [
    "Set up the first year.",
    "Keep your insurance active, plan for the supplemental tax bill, and keep a written log of repairs and tenant requests.",
  ],
];


export default function HowToBuyADuplexInLosAngeles() {
  return (
    <>
      <p>
        To buy a duplex in Los Angeles, you need a loan built for owner-occupied multifamily, a clear
        read on rent control, and numbers based on real leases instead of listing promises. The
        purchase works like any other home sale. The difference is that you are also buying a small
        rental business with tenants, rules, and repair bills.
      </p>
      <p>
        This guide covers each step, from financing to inspections, plus the Los Angeles rules that
        change the math. Prices and rules shift often, so use the figures below as a starting point
        and confirm them with a lender, the Los Angeles Housing Department (LAHD), and a real estate
        attorney.
      </p>

      <h2>Duplex Buying in Los Angeles: Quick Facts</h2>
      <Table label="Duplex buying in Los Angeles: quick facts" head={["Question", "Short answer"]} rows={QUICK_FACTS} />
      <p>Each figure is explained, with its source, in the sections below.</p>

      <h2>Is a Duplex Right for You?</h2>
      <p>
        A duplex fits you if you can live next to your tenant and treat renting as a real job. It
        does not fit if you want a hands-off investment or a quiet private yard.
      </p>
      <p>
        Most buyers take one of two paths. Owner-occupants live in one unit and rent the other,
        which many people call house hacking. Investors rent both units and live somewhere else.
      </p>
      <Table label="Owner-occupant and investor paths compared" head={["", "Owner-occupant", "Investor"]} rows={PATHS} />
      <p>
        Living in one unit lowers your cost to get in. It also puts you one wall away from your
        tenant. Think about noise, shared parking, and who handles a broken water heater at 9 p.m.
      </p>
      <p>
        Plan your exit early. FHA and most owner-occupied loans expect you to live in the home for
        about a year. After that, many buyers move out and keep the unit as a rental, but read your
        loan terms before you count on it.
      </p>
      <p>
        Rent will lower your monthly cost, but at Los Angeles prices it rarely erases it. The numbers
        section below shows how to test that for any listing.
      </p>

      <h2>Los Angeles Rules That Change the Math</h2>
      <p>
        Rent control decides how much income a duplex can really produce, so check it before you fall
        for the photos. In the City of Los Angeles, the{" "}
        <ExternalLink href={LAHD_RSO}>Rent Stabilization Ordinance (RSO)</ExternalLink> generally
        covers rental property first built on or before October 1, 1978, and LAHD lists duplexes as a
        covered type. Look up any address on <ExternalLink href={ZIMAS}>ZIMAS</ExternalLink> and open the Housing tab to
        see its RSO status.
      </p>
      <p>
        Living in one unit does not remove the other unit from the RSO. The owner-occupied duplex
        exemption that exists in state law is narrower than most buyers think, and it does not replace
        the City’s rules.
      </p>
      <Table label="Los Angeles rent rules and what they mean for a buyer" head={["Rule", "What it means for a buyer"]} rows={LA_RULES} />

      <h3>The State Rule That Surprises Buyers</h3>
      <p>
        California’s Tenant Protection Act (AB 1482) caps most annual rent increases at 5% plus local
        inflation, or 10%, whichever is lower. It exempts a duplex only if the owner lived in one unit
        at the beginning of the tenancy and still does.
      </p>
      <p>
        That wording matters if you buy a duplex that already has a tenant. You may not qualify for
        the exemption for that tenancy, even after you move into the other unit. The owner must also
        give written notice that the exemption applies. Ask an attorney how this works for your exact
        situation.
      </p>

      <h3>Rules Outside the City of Los Angeles</h3>
      <p>
        Many buyers searching for a Los Angeles duplex end up in another city or in unincorporated
        county areas. Those places can have their own rent control or tenant rules, or none beyond the
        state’s. Always confirm which jurisdiction the parcel sits in.
      </p>

      <h3>Property Tax After You Buy</h3>
      <p>
        In California, a sale usually triggers a reassessment to the purchase price. The base tax rate
        is limited to 1% plus voter-approved local charges, and the county can send a{" "}
        <ExternalLink href={ASSESSOR_REAL_PROPERTY}>supplemental tax bill</ExternalLink> for the gap between the old and new assessed value. Budget for that bill in your first
        year.
      </p>

      <h2>How to Finance a Duplex in Los Angeles</h2>
      <p>
        If you plan to live in one unit, you can finance a duplex like a regular home purchase, often
        with a much smaller down payment than an investor needs. Pick the loan before you pick the
        property, because the loan decides which duplexes you can buy.
      </p>
      <Table
        label="Duplex loan options compared"
        head={["Loan", "Typical down payment", "Must you live there?", "Watch for"]}
        rows={LOANS}
      />
      <p>
        Here is what that looks like on a duplex priced at $1,000,000 (an illustrative price, not a
        market quote). An FHA down payment of 3.5% is $35,000. A 5% conventional down payment is
        $50,000, and 25% for an investment loan is $250,000.
      </p>

      <h3>How Lenders Count Rent From the Second Unit</h3>
      <p>
        Lenders rarely count all of the rent. For owner-occupied duplexes, a common rule is to count
        75% of the other unit’s rent toward your qualifying income. The rent comes from a signed lease
        or from the appraiser’s market rent estimate.
      </p>
      <p>
        The haircut covers vacancy and upkeep. It also means a seller’s &ldquo;projected rent&rdquo;
        does not help you qualify. Only documented or appraised rent does.
      </p>
      <p>
        FHA has a self-sufficiency test for three- and four-unit buildings. Duplexes are exempt, which
        is one reason they are the easiest multifamily property to finance with FHA.
      </p>

      <h3>Talk to the Lender Before You Tour</h3>
      <p>Get pre-approved by a lender who closes two-to-four-unit loans often. Ask three questions:</p>
      <ul>
        <li>Which loan fits my down payment and my plan to live in one unit?</li>
        <li>How will you count the rent from the other unit?</li>
        <li>Does the loan amount stay under the conforming limit for a duplex?</li>
      </ul>
      <p>
        Loan rules change often, so treat the table as a map and your lender’s written terms as the
        final word.
      </p>
      <p>
        If you are selling a home to fund the down payment, two earlier guides can help you keep more
        of the proceeds: <Link href="/blog/tips-for-showing-your-house">tips for showing your house</Link>{" "}
        and <Link href="/blog/tips-to-sell-your-home-in-the-fall">tips to sell your home in the fall</Link>.
      </p>

      <h2>How to Evaluate a Duplex: The Numbers That Matter</h2>
      <p>
        Start with net operating income (NOI), which is rent minus the cost of running the building,
        before any mortgage payment. Divide NOI by the purchase price and you get the cap rate, a quick
        way to compare one duplex against another.
      </p>
      <p>
        The example below uses made-up figures to show the method. Replace every number with the
        seller’s real leases, tax bill, and insurance quotes.
      </p>
      <Table
        label="Illustrative net operating income for a duplex priced at $1,000,000"
        head={["Illustrative duplex priced at $1,000,000", "Per year"]}
        rows={NOI}
      />
      <p>
        NOI of $41,900 on a $1,000,000 price is a cap rate of about 4.2%. This table assumes you
        manage the building yourself, so it has no management fee.
      </p>
      <p>
        Now the owner-occupant view. With 5% down, a 6.5% rate, and a 30-year loan (illustrative
        terms), principal and interest come to about $6,005 a month. Add roughly $1,000 for tax and
        $333 for insurance, and the payment is near $7,340 before any mortgage insurance. If the second
        unit rents for $2,900, your out-of-pocket housing cost is about $4,440 a month.
      </p>
      <p>
        Your lender would count only 75% of that rent, or $2,175, when it checks whether you qualify.
        Both numbers matter: one shows what you pay, the other shows what the bank will approve.
      </p>

      <h3>Test the Deal Against a Below-Market Tenant</h3>
      <p>
        Now suppose the tenant in the second unit pays $1,800, not $2,900, because of long tenancy
        under rent control. That gap is $13,200 a year. NOI falls to about $29,400 and the cap rate
        drops to roughly 2.9%.
      </p>
      <p>
        This is why you verify rent from lease copies and bank deposits, not from the listing. It is
        also why a seller may price a duplex with an old tenant lower. The price should reflect the
        capped rent.
      </p>

      <h3>What to Ask for Before You Run Any Numbers</h3>
      <ul>
        <li>The last 12 months of rent deposits and the current rent roll</li>
        <li>Copies of every lease and any written side agreements</li>
        <li>The latest property tax bill and a current insurance quote</li>
        <li>Two years of utility bills, and which meters serve which unit</li>
        <li>Receipts for major repairs, such as the roof, plumbing, and electrical panel</li>
      </ul>

      <h2>Inspections and Due Diligence for a Los Angeles Duplex</h2>
      <p>
        A duplex needs more checking than a single-family home because you are buying two homes, two
        tenancies, and one set of building systems. Use your inspection period to confirm what the
        building is legally, what it costs to run, and what the tenants have been promised.
      </p>
      <Table label="Duplex due diligence checklist" head={["What to check", "How to check it"]} rows={DUE_DILIGENCE} />

      <h3>Unpermitted Units and Garage Conversions</h3>
      <p>
        A third &ldquo;unit&rdquo; in a garage or back room is common in older Los Angeles
        neighborhoods. It can cause trouble with your lender, your insurer, and the City, and
        legalizing it can be costly. Count the meters, mailboxes, and kitchens, then match them to the
        permits.
      </p>
      <p>
        Older duplexes often sell as-is, so ask what the seller must still disclose. Our guide to{" "}
        <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>{" "}
        covers the disclosure rules from the seller’s side and helps you ask sharper questions.
      </p>

      <h3>Earthquake Risk and the Soft-Story Rule</h3>
      <p>
        LA’s mandatory{" "}
        <ExternalLink href={LADBS_SOFT_STORY}>soft-story retrofit program</ExternalLink> targets older wood-frame buildings with open
        ground-floor parking, but LADBS says it does not apply to residential buildings with three or
        fewer units. A duplex is usually outside it. A duplex with tuck-under parking can still be
        vulnerable, so ask a structural engineer for an opinion and price a voluntary retrofit.
      </p>

      <h3>Insurance Comes Before You Remove Contingencies</h3>
      <p>
        Standard homeowners policies do not cover earthquake damage. A rental duplex also needs a
        landlord policy, ideally with loss-of-rent coverage. Collect quotes during your inspection
        period, because a surprise premium can change whether the deal works.
      </p>

      <h3>Talk to the Tenants Through the Seller</h3>
      <p>
        Ask the seller to deliver a tenant estoppel certificate, which is a signed statement from each
        tenant about their rent, deposit, lease dates, and any promises made by the owner. It catches
        side deals that never appear in the lease. Also confirm the security deposits transfer to you
        at closing, since you become responsible for them. The RSO adds its own rules on interest
        payments on security deposits.
      </p>

      <h2>How to Buy a Duplex in Los Angeles, Step by Step</h2>
      <p>
        The path is the same as any home purchase, with extra document checks added in the middle.
        Here is the order that keeps surprises small.
      </p>
      <Steps items={STEPS} />
      <p>
        If a step feels rushed, that is usually the one to slow down. A duplex is a long-term
        commitment, and the first month is cheaper to fix than the first year.
      </p>

      <h2>Buying a Duplex With Tenants in Place</h2>
      <p>
        When you buy a rented duplex, you take over the tenants and their leases. You cannot end a
        tenancy just because the building changed hands. In the City of Los Angeles, LAHD’s list of
        allowed reasons for evicting an RSO tenant includes owner or family move-in, a resident
        manager, demolition, a government order, and conversion to affordable housing. A sale is not
        on it.
      </p>
      <p>
        If you want to live in a tenant’s unit, the safest plan is to buy a duplex where one unit is
        already vacant, or where the tenant leaves on their own. Do not make an offer that depends on
        an eviction you may not be allowed to carry out.
      </p>
      <p>
        If you later want a tenant to leave in exchange for money, the RSO has a required disclosure
        notice for &ldquo;cash for keys&rdquo; buyout agreements. Talk to a landlord-tenant attorney
        before you offer one.
      </p>

      <h2>Common Mistakes First-Time Duplex Buyers Make</h2>
      <ul>
        <li>
          <strong>Trusting projected rent.</strong> Underwrite from leases and bank deposits, not from
          the listing’s pro forma.
        </li>
        <li>
          <strong>Skipping the rent control check.</strong> A pre-1979 duplex in the City of Los
          Angeles is usually covered, and that changes both income and your options as an owner.
        </li>
        <li>
          <strong>Assuming the owner-occupied exemption protects you.</strong> The state exemption is
          narrow, and the City’s rules still apply.
        </li>
        <li>
          <strong>Reading only the lease, not the tenant.</strong> An estoppel certificate catches side
          agreements the lease leaves out.
        </li>
        <li>
          <strong>Underestimating costs.</strong> Insurance, repairs, utilities, and the supplemental
          tax bill all hit in the first year.
        </li>
        <li>
          <strong>Ignoring unpermitted space.</strong> A garage conversion can make the unit count, the
          insurance, and the loan all harder.
        </li>
        <li>
          <strong>Signing owner-occupant loan papers without planning to live there.</strong> Lenders
          enforce occupancy promises, so only choose that route if you will move in.
        </li>
        <li>
          <strong>Leaving no cash cushion.</strong> One vacancy and one repair in the same quarter can
          strain a thin budget.
        </li>
      </ul>

      <h2>Duplex Buying FAQ</h2>
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

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Steps, Table } from "./_parts";

/**
 * Body for "Selling a House in Los Angeles".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * Tables: the quick facts, the illustrative net sheet and the three selling
 * routes are genuinely tabular (same columns, rows read across), so they use
 * Table. The seven steps and the escrow sequence are numbered because their
 * order is the point.
 *
 * Sources linked are primary or official: Redfin's county market page (the
 * figures quoted are from it), the County Registrar-Recorder's transfer tax
 * page, the City Office of Finance's Measure ULA FAQ, LADBS's Residential
 * Property Report page, the Stanford Woods Institute write-up of the
 * insurance study, IRS Topic 701 and FTB Publication 1016. Zillow's
 * best-time-to-list and MLS studies and the Clever Real Estate commission
 * survey stay as plain text, as in the other posts: the Los Angeles figure
 * from Zillow could not be confirmed against a public page, and an outbound
 * link to a number the page does not show is worse than none.
 *
 * Hero: "A white stucco house with a red tile roof", Los Angeles, by
 * ubeyonroad on Unsplash (free under the Unsplash License), cropped to 16:10.
 */

const REDFIN_LA_COUNTY = "https://www.redfin.com/county/321/CA/Los-Angeles-County/housing-market";
const COUNTY_TRANSFER_TAX = "https://lavote.gov/home/records/property-document-recording/documentary-transfer-taxes";
const CITY_ULA_FAQ = "https://finance.lacity.gov/faq/measure-ula";
const LADBS_RPR = "https://dbs.lacity.gov/services/zoning/residential-property-report";
const STANFORD_INSURANCE =
  "https://woods.stanford.edu/news/californias-home-insurance-crisis-spreading-beyond-wildfire-country";
const IRS_TOPIC_701 = "https://www.irs.gov/taxtopics/tc701";
const FTB_WITHHOLDING = "https://www.ftb.ca.gov/forms/misc/1016.html";

/**
 * Kept as data because it is rendered twice: as visible copy here, and as
 * FAQPage structured data in app/blog/[slug]/page.tsx. Google requires the two
 * to match, so they read from one array — which is also why the answers are
 * plain text, with no links in them.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need a real estate agent to sell my house in Los Angeles?",
    a: "No, California doesn't require one. But selling on your own means you handle pricing, disclosures, marketing, negotiation and the contract yourself, and you may lose MLS reach. Zillow found that homes left off the MLS sold for a median 1.5% less. If you're considering it, get at least one agent's net sheet first so you can compare what you'd save against what you'd risk.",
  },
  {
    q: "How long does it take to sell a house in Los Angeles from start to finish?",
    a: "Plan for roughly three months. Redfin's September data put the county median at 52 days on the market, and a typical escrow runs about 30 days after that, plus a few weeks of prep before you list. Well-priced homes in active areas can move faster, and homes that need a price cut take longer.",
  },
  {
    q: "Should I wait until spring to list?",
    a: "Spring has an edge. Zillow's data pointed to the last two weeks of April for Los Angeles, with about a 2.5% price benefit. But waiting costs you carrying costs, and rates and buyer demand can change. Compare the likely gain with your own cost of waiting. If you have to move sooner, price from the most recent closed sales and don't count on a spring bounce.",
  },
  {
    q: "Do I have to make the repairs a buyer asks for after the inspection?",
    a: "No. A buyer's repair list is a request, not a requirement, and you can accept it, counter with a credit or a smaller scope, or decline. The buyer can then decide whether to proceed, renegotiate or cancel within their contingency period. Your agent should show you how each choice changes your net before you answer.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  [
    "How long does it take?",
    "Median 52 days on the market in LA County (Redfin, September 2026), plus a typical escrow of about 30 days",
  ],
  [
    "What are the main costs?",
    "Agent compensation (negotiable), transfer taxes, escrow and title, and any credits you agree to",
  ],
  ["Transfer tax in the City of LA", "0.56% combined, or $5,600 on a $1,000,000 sale"],
  [
    "Transfer tax elsewhere in LA County",
    "County rate of 0.11%, with special city rates in Culver City, Pomona, Redondo Beach and Santa Monica",
  ],
  [
    "Measure ULA",
    "City of LA only. 4% above $5,400,000 and 5.5% at $10,900,000 or more, for closings after June 30, 2026",
  ],
  [
    "Key disclosures",
    "TDS, Natural Hazard Disclosure, fire-zone documents where they apply, and the LADBS report for City of LA homes",
  ],
  ["Best listing window", "Last two weeks of April for Los Angeles (Zillow, 2025 sales)"],
  [
    "Federal home sale exclusion",
    "Up to $250,000 of gain, or $500,000 on a joint return, if you meet the ownership and use tests",
  ],
];

const SEVEN_STEPS: [string, ReactNode][] = [
  [
    "Get a realistic price.",
    "Your agent pulls recent sales of similar homes nearby, and you set the list price from those, not from the number you hope for.",
  ],
  [
    "Work out what you’ll keep.",
    "Before you list, see what’s left after commission, taxes, escrow charges and your loan payoff.",
  ],
  [
    "Gather your disclosures.",
    "California requires specific forms, and a few depend on where your house sits, such as a hillside or a fire zone.",
  ],
  ["Prepare the house.", "Repairs that matter, a deep clean, staging where it helps, then photos."],
  ["List and show it.", "MLS listing, open houses, private showings."],
  [
    "Review offers and negotiate.",
    "Price is one term among several. Timing, contingencies and credits move your net as much as the headline number.",
  ],
  [
    "Close escrow.",
    "Inspections, appraisal if the buyer has a loan, final walkthrough, recording, and funds.",
  ],
];

const NET_SHEET: ReactNode[][] = [
  ["Sale price", "$1,000,000", ""],
  ["Total agent compensation (5%)", "-$50,000", "Negotiable. Illustrative rate"],
  ["County transfer tax", "-$1,100", "$0.55 per $500"],
  ["City base transfer tax", "-$4,500", "$2.25 per $500"],
  ["Measure ULA", "$0", "Price is under the $5.4M threshold"],
  ["Escrow and title, combined", "-$4,000", "Placeholder. Get a quote"],
  ["LADBS report, pest and hazard reports", "-$700", "Report fee is $70.85. Others are placeholders"],
  ["Repair credit after inspection", "-$10,000", "Placeholder. Could be zero or much more"],
  [<strong key="s">Subtotal after costs</strong>, <strong key="sv">$929,700</strong>, "About 7% of the price in costs"],
  ["Loan payoff", "-$400,000", "Your own balance goes here"],
  [
    <strong key="c">Cash before property tax proration and any tax withholding</strong>,
    <strong key="cv">$529,700</strong>,
    "",
  ],
];

const ESCROW_STEPS: [string, ReactNode][] = [
  [
    "Opening escrow.",
    "The buyer’s deposit goes in and escrow starts collecting documents. You deliver your disclosures.",
  ],
  [
    "Inspections.",
    "The buyer’s inspector, and usually a pest inspector, go through the home. This is where repair requests come from.",
  ],
  ["Appraisal.", "If the buyer has a loan, the lender orders one. A low appraisal can reopen the price conversation."],
  ["Removing contingencies.", "The buyer signs off in writing, or cancels, or asks for more time."],
  [
    "Final walkthrough.",
    "Usually a few days before closing, to confirm the home is in the agreed condition and any negotiated repairs were done.",
  ],
  [
    "Signing and funding.",
    "You sign closing documents with escrow, the buyer’s funds arrive, and the deed records with the county. That recording is the legal moment of closing.",
  ],
];

const ROUTES: ReactNode[][] = [
  [
    "List with an agent",
    "You have time and the home is in marketable condition",
    "Longer timeline, showings, and repair negotiations",
    "The net sheet, and the agent’s recent sales near you",
  ],
  [
    "Sell to a cash buyer or investor",
    "Speed and certainty matter more than top price, or the home needs heavy work",
    "Offers are usually below what open-market buyers would pay, and some buyers are not reputable",
    "Proof of funds, who pays closing costs, and whether the offer can change after inspection",
  ],
  [
    "iBuyer or hybrid offer",
    "You want an instant benchmark with a company’s fees stated up front",
    "Service fees and a repair deduction can narrow the gap",
    "The full fee schedule and a side-by-side net against a listing",
  ],
];

export default function SellingAHouseInLosAngeles() {
  return (
    <>
      <p>
        Selling a house in Los Angeles follows the same path as selling anywhere in California: you
        hire a listing agent, price the home from recent comparable sales, disclose what you know about
        it, negotiate an offer, and close through escrow. What changes here is the money and the map.
      </p>
      <p>
        The money: the City of Los Angeles adds its own transfer tax on top of the county’s, and sales
        above a high price line pick up the Measure ULA surcharge. The map: Los Angeles includes
        neighborhoods where homes sell for under $800,000 and neighborhoods where they sell for several
        million, and your costs change depending on whether your address is in the City of Los Angeles
        or in a separate city like Santa Monica, Culver City or Beverly Hills.
      </p>
      <p>
        This guide covers the steps in order, what each one costs, and where sellers tend to get caught
        off guard. I work mostly in <Link href="/real-estate-agent-in-studio-city">Studio City</Link>,{" "}
        <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link>,{" "}
        <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and the{" "}
        <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link>, so where the Valley and
        the hillside areas behave differently from the Westside, I say so.
      </p>

      <h2>Quick Facts for Los Angeles Sellers</h2>
      <p>Figures are current as of October 2026. Sources are linked in the sections below.</p>
      <Table label="Quick facts for Los Angeles sellers" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>What Does It Take to Sell a House in Los Angeles?</h2>
      <p>Seven steps, in this order. Each has its own section below.</p>
      <Steps items={SEVEN_STEPS} />
      <p>
        Most sellers do steps 1 and 2 backwards. They pick the number they want, then look for sales
        that support it. Starting from the comparable sales and a net sheet keeps every later decision
        honest.
      </p>

      <h2>Is Now a Good Time to Sell in Los Angeles?</h2>
      <p>
        It’s a workable market, not a fast one. For the three months ending September 2026,{" "}
        <ExternalLink href={REDFIN_LA_COUNTY}>Redfin</ExternalLink> puts the median sale price in Los
        Angeles County at about $913,000, down 0.22% from a year earlier. Homes took a median of 52 days
        to sell, one day faster than last year.
      </p>
      <p>
        Two more numbers from that same Redfin page matter when you price. Homes sold for 99.2% of list
        price on average, and 36.2% sold above list. But 18.1% of listings had a price drop, up 2.3
        percentage points from a year ago. Well-priced homes still sell near asking. Homes priced too
        high sit, then get cut.
      </p>
      <p>
        County figures hide a lot. Redfin’s Westside page showed a median near $1.8M and 42 days on
        market this summer. Figures you see elsewhere online will differ, because sites measure the
        city, the county or the whole metro, over different periods. When you compare numbers, check
        which area and which months they cover.
      </p>

      <h3>When to List</h3>
      <p>
        Spring has the edge. A Zillow analysis of 2025 sales in the 35 largest metros found that Los
        Angeles homes listed in the last two weeks of April sold for about 2.5% more, roughly $25,300 on a
        typical home. Zillow itself notes that the best week depends on your local market and that most
        sellers can’t wait for the ideal date.
      </p>
      <p>
        One thing to watch this fall: headlines in early October describe mortgage rates at their
        highest in about three years. Higher rates shrink the pool of buyers who can afford your price,
        so check where rates are when you set your timeline.
      </p>
      <p>
        If you have to sell now, you can. Price from the sales that closed in the last 60 to 90 days, not
        from the spring peak. My{" "}
        <Link href="/blog/tips-to-sell-your-home-in-the-fall">tips for selling your home in the fall</Link>{" "}
        cover the basics.
      </p>

      <h2>How Much Is My Los Angeles Home Worth?</h2>
      <p>
        What your neighbor’s house sold for beats any citywide average. Los Angeles isn’t one market.
        Redfin’s data above shows a Westside median near $1.8M against about $913,000 for the county as a
        whole, and the gap inside a single neighborhood can be wide too.
      </p>
      <p>
        The standard tool is a comparative market analysis, or CMA. Your agent pulls recent sales of
        similar homes close to yours and adjusts for the differences. A good one covers:
      </p>
      <ul>
        <li>
          Sales from the last 60 to 90 days, within a short distance and, where possible, the same street
          pattern or school boundary.
        </li>
        <li>
          Size, lot and condition. A renovated kitchen and a pool change the number. So does a roof near
          the end of its life.
        </li>
        <li>
          Features that buyers pay for in LA: a usable yard, parking, a permitted ADU, views, and a
          quieter street.
        </li>
        <li>What didn’t sell. Expired and cancelled listings tell you where buyers stopped.</li>
      </ul>
      <p>
        Online estimates are a starting point only. They can’t see your updates or your street. If you
        want a first read before talking to anyone, my{" "}
        <Link href="/home-valuation">home valuation page</Link> is a place to start, and I’ll follow up
        with actual comparable sales.
      </p>

      <h3>Why a High List Price Costs You</h3>
      <p>
        Overpricing doesn’t leave negotiating room. It starts the clock. In LA County, 18.1% of listings
        had a price drop in the latest Redfin data, and buyers and their agents can see how long a home
        has been listed and how many times the price changed. A home that has sat for six weeks and
        dropped twice gets lower offers than the same home priced right on day one.
      </p>
      <p>
        In hotter pockets, some sellers price a little under the likely value to draw several offers.
        That works when buyers are active in your area and the home is in good shape. It’s a judgment
        call that depends on the last few weeks of sales near you, so ask your agent to show you the data
        behind it.
      </p>

      <h2>What Does It Cost to Sell a House in Los Angeles?</h2>
      <p>
        Most of your selling cost is a percentage of the price, so it grows with the sale. The biggest
        piece is agent compensation. After that come transfer taxes, escrow and title charges, and
        whatever credits you agree to after inspections. Your loan payoff isn’t a cost, but it comes out
        of the same check, so it belongs on the same sheet.
      </p>

      <h3>Agent Compensation</h3>
      <p>
        Commission has always been negotiable, and the rules changed in August 2024. Offers of
        buyer-agent pay can no longer be posted on the MLS, and buyers generally sign a written agreement
        with their agent before touring homes. So you now decide two things: what you pay your listing
        agent, and whether you offer anything toward the buyer’s agent.
      </p>
      <p>
        For scale only: a Clever Real Estate survey from February 2026 put the national average total
        commission at 5.70%. That is a national figure, not a Los Angeles one. What counts is what you
        sign in your listing agreement.
      </p>

      <h3>Transfer Taxes: City of Los Angeles vs. the Rest of the County</h3>
      <p>Two layers apply, and the second depends on your address.</p>
      <ul>
        <li>
          <strong>County tax, everywhere in LA County:</strong> $0.55 per $500, or $1.10 per $1,000.
        </li>
        <li>
          <strong>City of Los Angeles base tax:</strong> $2.25 per $500, or 0.45%, on top of the county
          tax.
        </li>
      </ul>
      <p>
        Together that is 0.56% inside the City of Los Angeles, or $5,600 on a $1,000,000 sale. Studio
        City, Sherman Oaks, <Link href="/real-estate-agent-in-valley-village">Valley Village</Link> and
        most of the Hollywood Hills are inside the city, but some addresses near the boundary are not, so
        confirm yours with your title company.
      </p>
      <p>
        The county also{" "}
        <ExternalLink href={COUNTY_TRANSFER_TAX}>lists special rates for five cities</ExternalLink>:
        Culver City, Los Angeles, Pomona, Redondo Beach and Santa Monica. Beverly Hills isn’t on that
        list. If you’re selling in a city outside Los Angeles, don’t assume the City of LA numbers apply.
      </p>

      <h3>Measure ULA, the So-Called Mansion Tax</h3>
      <p>
        Measure ULA is an extra transfer tax that applies only to sales inside the City of Los Angeles
        above a high price. The thresholds adjust each July 1. For closings after June 30, 2026, the{" "}
        <ExternalLink href={CITY_ULA_FAQ}>City’s Office of Finance</ExternalLink> lists them at:
      </p>
      <ul>
        <li>Above $5,400,000 and below $10,900,000: 4%</li>
        <li>$10,900,000 or more: 5.5%</li>
      </ul>
      <p>
        The rate applies to the whole sale price, not just the part over the line. At exactly
        $5,400,000 the ULA tax is zero. One dollar higher, the City’s rate table applies 4% to the full
        price, which is about $216,000. If your home is priced near a threshold, talk to your agent and
        escrow officer before you list.
      </p>
      <p>
        The City’s published exemptions are for specific buyers, mainly qualifying affordable-housing
        organizations and certain nonprofits, not for ordinary homeowners selling. Measure ULA has also
        been politically contested, so confirm the current status when you list.
      </p>
      <p>Most Valley homes sell well below the line. Some hillside and luxury sales do not.</p>

      <h3>Escrow, Title and Other Charges</h3>
      <p>
        In Southern California it is customary for the seller to pay the escrow fee and the buyer’s
        title insurance policy, but the contract controls and either can be negotiated. Expect recording
        fees, a natural hazard disclosure report, and a pest inspection. If your home is in the City of
        Los Angeles, add the{" "}
        <ExternalLink href={LADBS_RPR}>LADBS Residential Property Report</ExternalLink>, which carries a
        $70.85 fee. Condos and HOA properties add document and transfer fees.
      </p>

      <h3>An Illustrative Net Sheet</h3>
      <p>
        This is an example of math, not a quote. Every figure other than the transfer tax and the LADBS
        fee is a placeholder. Your actual numbers depend on your loan, your contract and your escrow
        company.
      </p>
      <p>
        Assumptions: a $1,000,000 sale inside the City of Los Angeles, a $400,000 loan payoff, and a 5%
        total commission.
      </p>
      <Table label="Illustrative net sheet for a $1,000,000 sale" head={["Item", "Amount", "Note"]} rows={NET_SHEET} />
      <p>
        The lines that move the result most are the commission you negotiate, the credits you agree to
        during escrow, and whether ULA applies. A credit that looks small in a negotiation comes straight
        off your net, dollar for dollar. That is why I run a net sheet before listing and again before
        accepting an offer, and I compare offers on what you keep, not on the headline price.
      </p>

      <Cta title="See Your Own Numbers" label="Get a Home Valuation" href="/home-valuation">
        Start with a valuation from recent sales near you, and I’ll build a net sheet around your loan,
        your city and your timeline before you decide anything.
      </Cta>

      <h2>What Do You Have to Disclose When Selling in Los Angeles?</h2>
      <p>
        Tell the buyer what you know. California puts most of the disclosure burden on the seller, and a
        problem you hid is far more expensive after closing than a problem you disclosed and priced in.
        The forms below are the ones that come up most often. Your agent will confirm which apply to your
        property.
      </p>
      <ul>
        <li>
          <strong>Transfer Disclosure Statement (TDS).</strong> The standard seller questionnaire for most
          one-to-four-unit homes. You list known defects, past repairs, and conditions that affect value.
          If you’re also selling as-is, this still applies. I cover that in my guide to{" "}
          <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>.
        </li>
        <li>
          <strong>Natural Hazard Disclosure (NHD).</strong> A third-party report that states whether the
          property sits in mapped zones, including very high fire hazard severity zones, earthquake fault
          zones and seismic hazard zones, plus flood and dam-inundation areas. Much of the Hollywood Hills
          and Laurel Canyon is hillside terrain where these zones come up.
        </li>
        <li>
          <strong>Fire hardening and defensible space.</strong> For a home in a high or very high fire
          hazard severity zone, a seller generally has to give the buyer documentation that the property
          complies with defensible-space rules, and older homes carry an additional fire-hardening
          notice. The C.A.R. form for this is part of the standard package in those zones.
        </li>
        <li>
          <strong>LADBS Residential Property Report.</strong> If your home is inside the City of Los
          Angeles, you must apply for this report and deliver it to the buyer before entering an
          agreement of sale or before close of escrow. The fee is $70.85, and a report stays valid for six
          months. The City’s requirements when selling also cover items such as water-conserving plumbing
          fixtures and smoke alarms.
        </li>
        <li>
          <strong>Lead-based paint.</strong> Federal law requires a disclosure for homes built before
          1978.
        </li>
        <li>
          <strong>Edited listing photos.</strong> Since January 1, 2026, California law requires agents
          to disclose digitally altered images in listing advertising and to provide the unaltered
          original. Routine fixes such as lighting and cropping don’t count, but virtual staging and sky
          replacement can. It’s your agent’s obligation, but ask how your photos will be labeled.
        </li>
      </ul>

      <h3>Unpermitted Work</h3>
      <p>
        This is where Los Angeles sellers get stuck most often. Garage conversions, enclosed patios,
        added bathrooms and backyard units built without permits show up in inspections, in the City’s
        records, and sometimes in a buyer’s lender’s questions. If you know of unpermitted work, tell
        your agent before you list. You can sometimes legalize it, price around it, or sell to a buyer
        who wants to deal with it, but you can’t leave it out of the disclosures.
      </p>
      <p>
        This section is general information, not legal advice. If your situation involves an estate, a
        trust, a divorce, or a known major defect, talk to a real estate attorney before you list.
      </p>

      <h2>Hillside, Wildfire and Insurance Issues That Affect Los Angeles Sales</h2>
      <p>
        If your home is in the hills or near a canyon, whether a buyer can get insurance can matter as
        much as your price. Lenders require proof of coverage before they fund a loan. When a buyer
        can’t get a policy at a price they can afford, the sale can stall or fall apart in escrow,
        sometimes weeks after you accept the offer.
      </p>
      <p>
        The numbers show why this has moved from a side issue to a standard question.{" "}
        <ExternalLink href={STANFORD_INSURANCE}>Stanford researchers found</ExternalLink> that the
        state’s insurer of last resort, the California FAIR Plan, covered about 5% of California
        single-family homes as of March 2026, up from 1.5% in December 2020, and that homeowners
        insurance premiums had risen 84% since 2020. In the flats of the Valley this comes up less often.
        In the hills it comes up in almost every conversation.
      </p>
      <p>Here is what I’d gather before listing a hillside or canyon home:</p>
      <ul>
        <li>
          <strong>Your zone.</strong> Know whether the address is in a high or very high fire hazard
          severity zone. The Natural Hazard Disclosure report will state it.
        </li>
        <li>
          <strong>Defensible-space records.</strong> If your zone requires documentation, get the
          inspection done early so it doesn’t hold up escrow.
        </li>
        <li>
          <strong>Home-hardening details.</strong> Roof type, vents, siding, and any ember-resistant
          upgrades. Buyers’ insurers ask, and a complete record answers the question before it’s raised.
        </li>
        <li>
          <strong>Your own insurance history.</strong> Who covers the home now, whether you’ve been
          renewed or dropped, and what the policy costs. A buyer’s agent will want to estimate the
          carrying cost.
        </li>
        <li>
          <strong>Retaining walls, drainage and foundations.</strong> Hillside inspections look closely
          at these. If a wall is leaning or water pools against the foundation, you’re better off finding
          out now and deciding how to handle it than learning about it from the buyer’s inspector.
        </li>
      </ul>
      <p>
        I also tell buyers to get an insurance quote before they submit an offer on a hillside home, and
        as a seller it helps to expect that question. A home with documented mitigation and a clear
        insurance picture is easier to put under contract than one where the buyer has to discover the
        answer during escrow.
      </p>
      <p>
        If you’re not sure how your address is classified, start with the Natural Hazard Disclosure
        report. It’s one of the first documents ordered in any listing.
      </p>

      <h2>How Should You Prepare a Los Angeles Home for Sale?</h2>
      <p>
        Spend money where a buyer’s inspector and your listing photos will look, not on projects you
        like. In order of priority:
      </p>
      <ul>
        <li>
          <strong>Fix what an inspector will flag.</strong> Roof or plumbing leaks, electrical hazards,
          active termite damage, a failing water heater. Handling these on your schedule costs less than
          negotiating them during escrow.
        </li>
        <li>
          <strong>Treat outdoor space as living space.</strong> In LA, a yard, patio or deck is part of
          the floor plan. Clean it, trim it, repair what’s worn, and set it up so a buyer can picture
          using it.
        </li>
        <li>
          <strong>Paint, clean and brighten.</strong> Fresh neutral paint, clean windows, and removing
          heavy window coverings do more per dollar than most renovations.
        </li>
        <li>
          <strong>Declutter and stage.</strong> Pack personal items and thin out furniture. If the home is
          vacant, staging helps buyers read the rooms.
        </li>
        <li>
          <strong>Hold off on a major remodel.</strong> Gutting a kitchen right before listing rarely pays
          for itself. Ask your agent to show you recent sales of similar homes with and without the work
          before you commit.
        </li>
      </ul>

      <h3>Pre-Listing Inspection: A Trade-Off</h3>
      <p>
        An inspection before you list shows you what a buyer’s inspector will find, so you can fix it,
        price for it, or disclose it. It’s especially useful for older homes and hillside properties. The
        trade-off is that anything you learn becomes something you must disclose to buyers. For that
        reason, I decide with each seller, based on the age and condition of the home, rather than
        treating it as a default.
      </p>

      <h3>Photos and Marketing Materials</h3>
      <p>
        Photography is the first showing. Buyers see your listing online before they see your front
        door, so hire a professional photographer and make sure the photos reflect the home as it is. As
        covered above, edits that change what the property looks like have to be labeled under
        California’s 2026 rule. Once buyers start touring, my{" "}
        <Link href="/blog/tips-for-showing-your-house">tips for showing your house</Link> cover what to
        do.
      </p>

      <h2>Listing, Offers and Negotiation</h2>
      <p>
        Get your home in the MLS. Zillow’s research found that homes left off the MLS sold for a median
        1.5% less, a loss of nearly $5,000 on a typical U.S. home. Private or pre-market exposure can work
        as a first step, but it shouldn’t replace the full audience.
      </p>
      <p>
        Once offers come in, price is only one line. Compare them on what you’d actually keep and how
        likely each is to close:
      </p>
      <ul>
        <li>
          <strong>Net, not headline.</strong> A lower offer with no repair credit can beat a higher one
          with a $15,000 credit request.
        </li>
        <li>
          <strong>Contingencies.</strong> Inspection, appraisal and loan contingencies each give the buyer
          a way out. Fewer is safer for you.
        </li>
        <li>
          <strong>Financing.</strong> Cash removes loan risk. A loan with a small down payment adds
          appraisal and underwriting risk.
        </li>
        <li>
          <strong>Timeline.</strong> Match the close of escrow to your own move. A buyer who needs 45 days
          and one who needs 21 aren’t offering the same thing.
        </li>
        <li>
          <strong>Buyer-agent compensation.</strong> Since the 2024 rule changes, an offer may ask you to
          cover some or all of the buyer’s agent fee. Add that to the net.
        </li>
        <li>
          <strong>Possession.</strong> If you need time to move after closing, ask about a rent-back.
        </li>
      </ul>
      <p>
        Redfin’s September data for LA County shows 36.2% of homes selling above list price and 18.1%
        with price drops. Both are true at once. Some homes draw several offers and others don’t. Whether
        you set an offer deadline depends on how much interest you expect, and a deadline only works if
        buyers believe the home will sell to someone else.
      </p>

      <h3>After the Inspection</h3>
      <p>
        This is where deals get renegotiated. Buyers typically respond to inspection findings by asking
        for repairs, a credit, or a lower price. You can say yes, say no, or counter, and each choice
        affects your net and your timeline. A credit is often cleaner than coordinating contractors during
        a 30-day escrow. Repairs you make yourself keep the number on paper intact but put you on a
        deadline.
      </p>
      <p>
        I hold a Certified Real Estate Negotiation Expert credential, and this stage is where I use it
        most. The goal is to resolve the issue without handing back more than the problem is worth.
      </p>

      <h2>Escrow and Closing: What to Expect</h2>
      <p>
        Once you accept an offer, a neutral escrow company holds the money and documents until every
        condition in the contract is met. A 30-day escrow is common in California, but the purchase
        agreement sets the actual date, and cash deals can be faster.
      </p>
      <p>
        The standard C.A.R. purchase agreement gives the buyer 17 days after acceptance to remove
        contingencies such as inspections, appraisal and loan approval, unless the contract says
        otherwise. These don’t expire silently. A buyer has to remove them in writing, and until they do,
        they can still cancel for a good-faith reason covered by a remaining contingency. If a deadline
        passes without removal, your agent can send a notice requiring the buyer to act.
      </p>
      <p>In practice, the weeks look like this:</p>
      <Steps items={ESCROW_STEPS} />
      <p>
        Three things help you here. Answer your agent and escrow officer quickly, because slow signatures
        cause more delays than most problems do. Keep copies of receipts for any repairs. And have your
        payoff request in early if you have a mortgage, since escrow needs your lender’s number to
        calculate your net.
      </p>

      <h2>Taxes After You Sell</h2>
      <p>
        Many owners who sell their main home owe no federal tax on the gain, but not everyone, and not
        always on all of it. Two rules cover most situations.
      </p>
      <p>
        <strong>The home sale exclusion.</strong> The{" "}
        <ExternalLink href={IRS_TOPIC_701}>IRS</ExternalLink> lets you exclude up to $250,000 of gain from
        income, or $500,000 on a joint return, if you owned the home and used it as your main home for at
        least two of the five years before the sale. Generally, you can’t use the exclusion if you
        already excluded the gain on another home within the prior two years. In Los Angeles, a
        long-held home can have gain above these limits, so don’t assume you’re covered. If you bought
        long ago or the house has appreciated a lot, ask a tax professional to run the numbers before you
        list.
      </p>
      <p>
        <strong>California withholding at closing.</strong> Escrow has to address California real estate
        withholding. The Franchise Tax Board’s{" "}
        <ExternalLink href={FTB_WITHHOLDING}>withholding guidelines</ExternalLink> say withholding is
        required on a sale unless an exemption applies, such as a sale price of $100,000 or less or a
        principal residence the seller certifies on Form 593. Without an exemption, the withholding rate
        on Form 593 is 3 1/3% of the sale price unless an alternative calculation is used. Withholding is
        a prepayment of state income tax, not an extra tax. For most owner-occupant sellers, the
        exemption means nothing is withheld, but escrow needs the signed form to treat it that way.
      </p>
      <p>
        Things that change the picture: a second home, a former rental, an inherited property, a home
        you’ve owned for under two years, or a sale by a trust or an estate. In those cases the rules
        differ, and the cost of a wrong assumption can be large.
      </p>
      <p>This is general information, not tax advice. Talk to a CPA or tax attorney about your own numbers.</p>

      <h2>Agent, Cash Buyer or iBuyer: Which Route Fits?</h2>
      <p>
        Most sellers list with an agent. Some have a reason to look at a direct cash sale. These are
        different tools, and I’d rather you compare them honestly than assume one is always right. I make
        money on only one of them, so weigh my view with that in mind.
      </p>
      <Table
        label="Selling routes compared: agent, cash buyer, iBuyer"
        head={["Route", "Fits when", "Trade-off", "Ask before you commit"]}
        rows={ROUTES}
      />
      <p>
        Whichever route you favor, get at least one listing-based net sheet, so you know what the trade
        costs you. Even if you end up taking the cash offer, you’ll know the price of speed.
      </p>
      <p>
        I go deeper on this choice, including how as-is offers are priced and how to spot a cash-buyer
        scam, in my guide to{" "}
        <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>.
      </p>

      <h2>Frequently Asked Questions About Selling a House in Los Angeles</h2>
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

      <Cta title="Thinking About Selling?" label="Request a Free Home Valuation" href="/home-valuation">
        Get a price built from recent sales near you and a net sheet that shows what you’d keep. Request a
        free home valuation or contact me, and we can walk through your timing and your numbers.
      </Cta>
    </>
  );
}

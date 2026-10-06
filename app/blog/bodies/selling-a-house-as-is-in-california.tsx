import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, ProsCons, Steps, Table } from "./_parts";

/**
 * Body for "Selling a House As-Is in California".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * This is the first article with genuinely tabular copy: the quick facts, the
 * three selling routes compared on the same six rows, and the worked net
 * example. Those use Table from ./_parts. The cash-buyer process is numbered
 * (Steps) because its order is the point; everything else stays as the
 * bulleted lists the other posts use.
 *
 * Sources: the two Civil Code sections cited in the body are linked, because
 * they are primary and a seller may want to read them. (The FAQ's citations —
 * section 2079, IRS Topic 701 — stay unlinked; see FAQS.) HomeLight, Clever Real Estate,
 * First Tuesday and the law and accounting firms the copy cites stay as plain
 * text — the first two are competing brokerage portals, the same reason the
 * fall article leaves Zillow unlinked. LADBS, HUD and the DRE booklet are
 * named but not linked: their sites refuse automated requests, so the URLs
 * could not be confirmed, and a dead link from a legal-disclosure article is
 * worse than none.
 */

const CIV = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=${section}`;

const DRE_DISCLOSURES = "https://www.dre.ca.gov/files/pdf/re6.pdf";

/**
 * Kept as data because it is rendered twice: as visible copy here, and as
 * FAQPage structured data in app/blog/[slug]/page.tsx. Google requires the two
 * to match, so they read from one array — which is also why the answers are
 * plain text, with no links in them.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need a real estate attorney to sell as-is in California?",
    a: "No. California sales close through escrow and a title company, not an attorney. Consider hiring one if your situation is complicated, such as a probate sale, a known serious defect, a tenant dispute, or a cash buyer's contract you don't fully understand.",
  },
  {
    q: "What if I don't know everything that is wrong with the house?",
    a: "You disclose what you know. Your agent also has their own duty under Civil Code section 2079 to do a reasonably competent visual inspection of the accessible areas and disclose what they find. If you are unsure about a condition, tell your agent early and let a buyer's inspector check it.",
  },
  {
    q: "Can I back out of an as-is sale after I accept an offer?",
    a: "An accepted offer is a binding contract. You may have cancellation rights if the buyer misses a deadline in the contract, but backing out without a contract reason can lead to a claim against you. Talk to your agent or a real estate attorney before you try.",
  },
  {
    q: "How does selling as-is affect my taxes?",
    a: "The as-is label doesn't change the tax rules, but the lower price changes your gain. If the home is your main home and you owned and lived in it for at least two of the last five years, you may exclude up to $250,000 of gain, or $500,000 on a joint return, according to IRS Topic 701. You also can't deduct a loss on the sale of your main home, so ask a CPA to run your numbers.",
  },
  {
    q: "Do I need a termite report to sell as-is?",
    a: "No. California doesn't require a structural pest inspection for every sale, according to First Tuesday, though many buyers and some lenders ask for one. Who pays for the report and any repairs is negotiable in your contract. If you already know about termite damage, disclose it.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  ["Can you sell as-is?", "Yes"],
  [
    "Are disclosures still required?",
    "Yes. Sellers of one-to-four unit homes complete a Transfer Disclosure Statement and a Natural Hazard Disclosure.",
  ],
  ['Can "as-is" waive the disclosure form?', "No. Civil Code section 1102.1 says it cannot."],
  ["Do you need an attorney?", "No. Sales close through escrow and title."],
  ["Extra step in the City of Los Angeles?", "A Residential Property Report from LADBS, currently $70.85"],
  [
    "Typical price gap",
    "Reported at 15% to 30% below an updated home on the open market, and around 70% of value from cash buyers",
  ],
  ["Typical closing time", "7 to 14 days with cash, 25 to 65 days with a financed buyer"],
];

const ROUTES: ReactNode[][] = [
  [
    "Typical price",
    "Often 15% to 30% below an updated comparable home",
    "Often around 70% of after-repair value, with offers reported from 55% to 85%",
    "Instant offer, minus estimated repairs and service fees",
  ],
  [
    "Speed",
    "Financed buyers commonly take 25 to 65 days to close",
    "Offer in 24 to 48 hours, closing in as little as 7 to 14 days",
    "Fast, but depends on the program",
  ],
  [
    "Effort",
    "Prep, photos, showings, disclosures, negotiation",
    "Low: a walkthrough and a contract",
    "Low to medium",
  ],
  [
    "Negotiation room",
    "Highest, with competing buyers possible",
    "Little, usually take it or leave it",
    "Little",
  ],
  [
    "Best for",
    "Sellers who can wait and want the best price",
    "Sellers who need speed or certainty",
    "Newer, well-kept homes that need little work",
  ],
  [
    "Watch out for",
    "Buyers asking for repairs, financing problems",
    "Low offers, scams, hidden fees",
    "Deductions that shrink the first offer",
  ],
];

const WORKED_EXAMPLE: ReactNode[][] = [
  ["Price as a share of updated value", "80%", "70%", "85%"],
  ["Sale price", "$1,200,000", "$1,050,000", "$1,275,000"],
  ["Commission (5%)", "-$60,000", "$0", "$0"],
  ["Other closing costs (2%)", "-$24,000", "$0, buyer pays", "$0, buyer pays"],
  ["Net before payoff and taxes", <strong key="a">$1,116,000</strong>, <strong key="b">$1,050,000</strong>, <strong key="c">$1,275,000</strong>],
];

const CASH_PROCESS: [string, ReactNode][] = [
  [
    "Contact three to five buyers.",
    "Submit your address and a few details online or by phone. Offers from different buyers can vary a lot for the same house.",
  ],
  ["Get a preliminary offer.", "Expect it within 24 to 48 hours. It usually depends on a walkthrough."],
  [
    "Schedule the walkthrough.",
    "The buyer checks the condition and estimates repair costs. The more work needed, the lower the final number.",
  ],
  [
    "Compare firm offers.",
    "Look at your net proceeds, not the headline price. Check who pays closing costs, how big the deposit is, and whether the buyer keeps an inspection contingency.",
  ],
  [
    "Have someone review the contract.",
    "A real estate attorney or CPA can spot terms that let the buyer walk away or change the price late.",
  ],
  [
    "Close through escrow.",
    "A title company runs the title search and handles escrow. Any liens on the property are usually paid from your proceeds.",
  ],
];

const PROS = [
  "You save the time and money you would spend on repairs and prep.",
  "You have less back and forth over repairs, though not none.",
  "It fits inherited homes, out-of-state owners, and tired landlords.",
  "Selling to a cash buyer can be very fast.",
];

const CONS = [
  "Your sale price is usually lower.",
  "The buyer pool is smaller, because many buyers want a move-in ready home.",
  "Financed buyers may run into appraisal or lender problems.",
  "Buyers can still inspect and negotiate.",
];

export default function SellingAHouseAsIsInCalifornia() {
  return (
    <>
      <p>
        Selling a house as-is in California is legal, and plenty of owners do it. You still have to
        tell buyers what you know about the property, and the as-is label does not change that.
      </p>
      <p>
        What it does change is repairs. You are telling buyers you won’t fix anything, so the price
        has to reflect the condition. The bigger decision is how you sell: list on the open market
        with an agent, or take an offer from a cash buyer. Those two routes can leave you with very
        different amounts after fees.
      </p>
      <p>
        This guide covers what you must disclose, the Los Angeles rules that catch sellers off
        guard, how each route works, and how to estimate what you will actually take home.
      </p>

      <h2>Quick Facts: Selling As-Is in California</h2>
      <Table label="Quick facts: selling as-is in California" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>What Does &ldquo;As-Is&rdquo; Mean When You Sell a House in California?</h2>
      <p>
        An as-is sale means you are not agreeing to make repairs or give credits for fixes. The buyer
        takes the home in its current condition, flaws included.
      </p>
      <p>
        That is less unusual than it sounds. The standard residential purchase agreement most
        California agents use generally says the seller isn’t required to make repairs unless they
        agree to it in writing. Plenty of agents will tell you nearly every home here sells as-is in
        practice, so the label mostly tells buyers where you stand before they write an offer.
      </p>

      <h3>What the As-Is Label Does Not Change</h3>
      <p>
        <strong>Buyers can still inspect.</strong> Most offers include an inspection contingency, a
        set number of days when the buyer can investigate the home and cancel if they don’t like what
        they find.
      </p>
      <p>
        <strong>Buyers can still ask for things.</strong> They can request repairs, a credit, or a
        lower price. You can say no, but they can also walk away during the contingency period, which
        is why many as-is sellers end up negotiating anyway.
      </p>
      <p>
        <strong>Some safety items still apply.</strong> The Transfer Disclosure Statement has you
        certify things like working smoke detectors and a braced water heater by the close of
        escrow. Your agent will walk you through them.
      </p>

      <h3>As-Is Is Not the Same as Cash</h3>
      <p>
        As-is describes the condition terms. Cash describes how the buyer pays. You can sell as-is to
        a buyer with a mortgage, and a cash buyer will still inspect the house and price in what they
        find.
      </p>

      <h2>What Do You Still Have to Disclose When Selling As-Is?</h2>
      <p>
        Everything you know that could affect the home’s value or desirability. As-is changes who
        pays for repairs. It does not change what you have to tell the buyer.
      </p>
      <p>
        California law is direct about this:{" "}
        <ExternalLink href={CIV("1102.1")}>Civil Code section 1102.1</ExternalLink> says the transfer disclosure
        statement cannot be waived in an as-is sale. The same section keeps in place your duty to
        disclose any fact that materially affects value, including previously received inspection
        reports.
      </p>

      <h3>The Transfer Disclosure Statement</h3>
      <p>
        For homes with one to four units, you complete a{" "}
        <ExternalLink href={CIV("1102.6")}>Transfer Disclosure Statement (TDS)</ExternalLink> and
        deliver it to the buyer. The form asks about the features of the home and about problems you
        know of, including:
      </p>
      <ul>
        <li>Water damage, roof leaks, drainage or flooding problems</li>
        <li>Foundation, settling, or slippage issues</li>
        <li>Plumbing, electrical, or other system defects</li>
        <li>Rooms or work done without a permit</li>
        <li>Fire, flood, earthquake, or landslide damage</li>
        <li>Hazardous materials such as asbestos</li>
        <li>Easements, encroachments, and shared features like a common driveway</li>
        <li>Zoning issues, HOA authority, and lawsuits that affect the property</li>
      </ul>

      <h3>The Natural Hazard Disclosure</h3>
      <p>
        You also provide a separate{" "}
        <ExternalLink href={CIV("1103.2")}>Natural Hazard Disclosure</ExternalLink>, which shows whether the property sits
        in a mapped zone for flood, fire hazard, earthquake fault, or seismic hazards such as
        landslide and liquefaction. Sellers usually order it from a third-party company, and your
        agent can arrange it. The California Department of Real Estate explains both documents in{" "}
        <ExternalLink href={DRE_DISCLOSURES}>
          <em>Disclosures in Real Property Transactions</em>
        </ExternalLink>
        .
      </p>

      <h3>Deaths on the Property</h3>
      <p>
        You are generally not required to disclose a death that happened more than three years
        before the buyer’s offer. If a buyer asks you directly, you can’t lie about it.{" "}
        <ExternalLink href={CIV("1710.2")}>Civil Code section 1710.2</ExternalLink> covers the details.
      </p>

      <h3>What Happens If You Hide a Problem</h3>
      <p>
        An as-is clause can protect you from a claim that you didn’t inspect the home. It does not
        protect you from fraud. A California real estate attorney explains that a seller who paints
        over water damage and says nothing can be liable for fraudulent concealment, even in an as-is
        sale.
      </p>
      <p>
        Buyers who discover an undisclosed problem after closing may sue for breach of contract,
        negligence, or fraud. Remedies can include repair costs, lost value, or in some cases undoing
        the sale.
      </p>

      <h3>Who Is Exempt</h3>
      <p>
        A few transfers are exempt from the TDS, such as sales by a fiduciary administering a
        decedent’s estate, a guardianship, or a conservatorship, and foreclosure or tax sales. Your
        agent still has their own disclosure duties either way. If you’re selling a home you
        inherited, talk to your agent and an attorney about which forms apply.
      </p>

      <h2>Los Angeles Rules That Catch As-Is Sellers Off Guard</h2>
      <p>
        If your home is inside the City of Los Angeles, you have extra paperwork on top of the state
        forms. That includes neighborhoods like Studio City, Sherman Oaks, and Valley Village. Nearby
        cities such as Burbank, Glendale, and Beverly Hills have their own rules, so confirm which
        jurisdiction your parcel sits in.
      </p>

      <h3>The City’s Residential Property Report</h3>
      <p>
        Los Angeles Municipal Code section 96.300 requires sellers to apply for a Report of
        Residential Property Records and Pending Special Assessment Liens and give it to the buyer
        before the sale agreement is signed or before close of escrow. The LADBS fee is $70.85. A
        signed waiver cannot replace the report, and a report stays good for six months.
      </p>
      <p>Some agents still call it the 9A report. Order it early, because buyers expect to see it.</p>

      <h3>Point-of-Sale Safety Requirements</h3>
      <p>
        The city also lists requirements for sellers, including smoke alarms on each story, carbon
        monoxide devices, and compliance with the city’s water conservation ordinance. These are
        small, cheap fixes, and an as-is label does not make them optional. Check the LADBS page or
        ask your agent for the current list before you list.
      </p>

      <h3>Unpermitted Work</h3>
      <p>
        If a previous owner converted a garage, finished an attic, or added a room without a permit,
        you have to disclose it on the Transfer Disclosure Statement. The city’s records may not match
        the house you are selling, and buyers and lenders notice. Price it in rather than hoping
        nobody looks.
      </p>

      <h3>Hillsides, Fire Zones, and Insurance</h3>
      <p>
        In hillside areas like <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and
        the <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link>, the Natural Hazard
        Disclosure may flag fire or landslide zones. That matters beyond the form, because buyers may
        struggle to get homeowners insurance in those areas. The California Association of Realtors
        now publishes homeowners insurance resources for exactly this reason.
      </p>

      <h3>Transfer Taxes</h3>
      <p>
        City and county documentary transfer taxes together add up to 0.56% of the sale price, which
        is $5,600 per $1,000,000. Measure ULA adds a 4% tax on sales above $5.4 million and 5.5% at
        $10.9 million and up for closings after June 30, 2026, according to Hanson Bridgett and
        Reeder CPA. Most as-is homes sell well below that line, but if yours is close, talk to your
        agent before setting a price.
      </p>

      <h2>3 Ways to Sell a House As-Is in California</h2>
      <p>
        You can list on the open market, sell to a cash buyer, or take an offer from an iBuyer or
        similar program. Each trades price against speed and effort in a different way.
      </p>
      <p>
        The figures below are ranges reported by HomeLight and Clever Real Estate. They are statewide
        industry numbers, not Los Angeles closed-sale data, so treat them as a starting point.
      </p>
      <Table
        label="Three ways to sell a house as-is in California, compared"
        head={["", "List as-is with an agent", "Sell to a cash buyer or investor", "iBuyer or hybrid program"]}
        rows={ROUTES}
      />

      <h3>How to Choose</h3>
      <p>
        Start with your timeline, not the price. If you can wait six to eight weeks and the house is
        livable, listing with an agent often leaves you with more money. If you need to be out in two
        weeks, a cash buyer may be worth the discount.
      </p>
      <p>
        On a $1,500,000 home, the difference between 70% and 85% of value is $225,000. That is why it
        is worth running the numbers on both before you decide, which the pricing section below walks
        through.
      </p>

      <h2>How to Sell As-Is With a Real Estate Agent</h2>
      <p>
        Listing on the open market gives you the widest pool of buyers, including investors and
        owner-occupants who want a project. Here is the order I would follow.
      </p>

      <h3>1. Pick an Agent Who Has Sold Houses Like Yours</h3>
      <p>
        Ask for recent examples of as-is or fixer-upper sales, and ask how they would market yours. A
        good as-is agent has a network of investors, contractors, and lenders who are comfortable with
        a home that needs work. Some agents also hold the SFR designation, which stands for Short
        Sales and Foreclosure Resource.
      </p>

      <h3>2. Decide on a Pre-Listing Inspection</h3>
      <p>
        Agents disagree on this one. Some say it is wasted money when you are not fixing anything.
        Others say it helps you price accurately and gives buyers confidence.
      </p>
      <p>
        Here is the catch either way: once you have an inspection report, its findings are known to
        you, and you must disclose them.
      </p>

      <h3>3. Price for Condition</h3>
      <p>
        Ask your agent for a comparative market analysis that shows two numbers: what your home would
        sell for in current condition and what an updated version nearby sold for. The gap between
        them is your real discount. Pricing too high on an as-is listing mostly buys you extra days on
        the market.
      </p>

      <h3>4. Do Light Prep That Pays Back</h3>
      <p>
        Skip the roof, the kitchen, and the foundation. Focus on cheap changes that make the house
        easier to picture owning:
      </p>
      <ul>
        <li>Clear it out and clean it</li>
        <li>Paint if the walls are tired and the structure is sound</li>
        <li>Replace stained carpet or damaged flooring</li>
        <li>Cut back the yard so buyers can see the house and reach the door</li>
      </ul>
      <p>
        One agent quoted by HomeLight uses a simple test: every dollar spent should bring back at
        least $1.25. Light work can also help a buyer qualify for financing.
      </p>

      <h3>5. Write the Listing Remarks Carefully</h3>
      <p>
        The MLS has no as-is field, so agents note it in the public or private remarks. State it
        plainly, then lead with what is good about the property: the location, the lot, the layout,
        the light. That keeps the listing honest without leading with the problems.
      </p>

      <h3>6. Set Your Offer Terms</h3>
      <p>
        Decide what you will accept before offers arrive. Many as-is sellers prefer buyers with proof
        of funds or a strong pre-approval, a short inspection period, and no repair requests. Some
        offer a fixed repair credit upfront to widen the buyer pool, which can work when one known
        issue is scaring people off.
      </p>

      <h2>How to Sell As-Is to a Cash Buyer</h2>
      <p>
        A cash buyer skips the mortgage, the lender’s appraisal, and often the showings. That is why
        they can close fast. You pay for that speed with a lower price.
      </p>

      <h3>The Process, Step by Step</h3>
      <Steps items={CASH_PROCESS} />
      <p>Closing can happen in as little as 7 to 14 days, compared with weeks for a financed sale.</p>

      <h3>How to Vet a Cash Buyer</h3>
      <ul>
        <li>Ask for proof of funds, such as a recent bank statement.</li>
        <li>Check reviews and the company’s Better Business Bureau profile.</li>
        <li>Look at how long they have operated and ask for recent local purchases.</li>
        <li>
          Ask who is actually buying. Many &ldquo;we buy houses&rdquo; companies are franchises or
          wholesalers who line up an investor after you sign.
        </li>
        <li>Walk away from anyone who charges upfront fees or pushes you to sign the same day.</li>
      </ul>
      <p>
        Some buyers cover your closing costs, which can be worth a few percent of the price. Make sure
        that benefit is in writing and that the offer is still higher after you account for it.
      </p>

      <h2>How Much Less Will a House Sell For As-Is?</h2>
      <p>
        Expect a discount, and expect different sources to give you different numbers. An agent
        quoted by HomeLight puts as-is homes at 20% to 30% below updated listings. Clever Real Estate
        says 80% to 85% of market value on the open market and around 70% from cash buyers.
      </p>
      <p>
        Your discount depends on what is wrong with the house. Buyers price in an old roof,
        foundation problems, dated kitchens and baths, worn flooring, old windows, and years of
        deferred maintenance.
      </p>
      <p>
        In some neighborhoods, buyers are paying mostly for the lot. Ask your agent whether that is
        true on your street, because it changes how much condition matters.
      </p>

      <h3>A Worked Example</h3>
      <p>
        The numbers below are illustrations, not predictions. They assume an updated comparable home
        would sell for $1,500,000, a 5% commission (which is negotiable), and other seller closing
        costs of 2%. HomeLight reports closing costs of roughly 1% to 3%.
      </p>
      <Table
        label="Worked example: net proceeds by selling route on a $1,500,000 home"
        head={["", "List as-is with an agent", "Cash offer, low end", "Cash offer, high end"]}
        rows={WORKED_EXAMPLE}
      />
      <p>
        Under these assumptions, a cash offer needs to be above about 74% of updated value
        ($1,116,000 divided by $1,500,000) to beat listing at 80%. A low offer loses by $66,000. A
        high offer wins by $159,000.
      </p>
      <p>
        The table leaves out your mortgage payoff, taxes on any gain, repair credits you might grant,
        and what each extra month of owning the house costs you. Add those before you decide. A month
        of mortgage, property tax, insurance, and utilities can wipe out a small price gap.
      </p>

      <Cta title="Get Your Real Numbers" label="Get a Home Valuation" href="/home-valuation">
        Ask your agent for a net sheet that shows your estimated proceeds under each route, using your
        actual mortgage balance and local costs. Then compare it with written cash offers. If you want
        help, my home valuation page is a good place to start.
      </Cta>

      <h2>How to Handle Repair Requests and Offers on an As-Is Listing</h2>
      <p>
        Buyers will still inspect, and many will still ask for something. Decide how you will respond
        before the first offer arrives, not after you are in the middle of a countdown.
      </p>

      <h3>Your Three Options When a Repair Request Arrives</h3>
      <p>
        <strong>Say no.</strong> This is your right under an as-is contract. The risk is that the
        buyer cancels, and the inspection findings can follow the house. As one agent quoted by Clever
        put it, a seller who refuses everything may see the deal fall out of escrow and then has to
        disclose those issues to the next buyer.
      </p>
      <p>
        <strong>Offer a credit or price reduction.</strong> For many sellers this is the cleanest
        path. You skip contractors, permits, and timelines, and the buyer decides how to fix the
        problem.
      </p>
      <p>
        <strong>Counter in the middle.</strong> Agree to deal with one specific item, such as a
        failing water heater or a safety issue, and hold firm on everything else.
      </p>

      <h3>Questions to Ask Before You Answer</h3>
      <ul>
        <li>Is the issue a real defect, or cosmetic?</li>
        <li>Could it block the buyer’s loan? FHA and VA loans have minimum property standards.</li>
        <li>What would a licensed contractor charge to fix it? Ask for a bid, not a guess.</li>
        <li>Does it change what I have to tell the next buyer?</li>
        <li>How committed is this buyer, and what does each extra week cost me?</li>
      </ul>
      <p>A response can be as simple as this:</p>
      <blockquote className="ar-quote">
        &ldquo;The price already reflects the condition of the house. We will consider a credit for
        the specific item in your inspection report if it was not something we knew about.&rdquo;
      </blockquote>

      <h3>Compare Offers on Terms, Not Just Price</h3>
      <p>
        Two offers with the same price can be worth very different amounts. Look at the inspection
        contingency, the closing date, the size of the deposit, and whether the buyer needs a loan.
      </p>
      <p>
        A lower cash offer with no contingencies can be safer than a higher financed offer that might
        fall apart at the appraisal. Ask yourself what the extra 20 days or so of waiting for a loan
        would cost you in interest, taxes, and risk. Then pick the offer that gives you the better
        result, not just the bigger number.
      </p>

      <h2>Can Buyers Get a Loan for an As-Is Home?</h2>
      <p>
        Often yes, as long as the home passes the lender’s appraisal. The appraiser checks value and
        condition, and some loan types add their own property standards.
      </p>
      <p>
        FHA loans are the most common example. An FHA appraisal looks at whether the home is safe,
        sound, and secure, not whether the kitchen is dated. Cosmetic wear usually isn’t a problem.
      </p>
      <p>
        Safety hazards and structural defects are different, and lenders may require those fixed
        before closing. VA and USDA loans have their own minimum standards, and conventional lenders
        can refuse homes with serious damage.
      </p>
      <p>
        Buyers who want a project have another option. HUD’s FHA 203(k) program lets a borrower
        finance the purchase and the repairs in one mortgage. Not every lender offers it, so ask your
        agent whether an interested buyer has a renovation loan lined up.
      </p>

      <h3>What This Means for You</h3>
      <p>
        A financed buyer adds risk to an as-is sale. The appraisal can come in low, the lender can
        flag a safety problem, and the timeline gets longer. A cash buyer avoids the lender’s
        appraisal and can close faster.
      </p>
      <p>
        You can improve your odds without doing major work. Fix the cheap safety items before you
        list: missing smoke alarms, loose railings, exposed wiring, active leaks. Those small repairs
        widen the pool of buyers who can get a loan.
      </p>

      <h2>Common As-Is Situations in California</h2>
      <p>Most as-is sales fall into a few patterns. Here is how each one changes your plan.</p>

      <h3>An Inherited or Probate Home</h3>
      <p>
        These sales often come with clutter, deferred maintenance, and heirs who live elsewhere. That
        makes as-is a natural fit. The forms you must complete can differ if you sell as a fiduciary,
        so ask your agent and an attorney which ones apply.
      </p>
      <p>
        Talk to a CPA about the tax basis too. The basis of an inherited home is often different from
        what the original owner paid, and it affects your gain.
      </p>

      <h3>A Home With a Tenant</h3>
      <p>
        A tenant in place narrows your buyer pool. Owner-occupants usually want a vacant home, while
        investors may buy it as a rental. California and Los Angeles both have tenant protection laws
        that limit how a tenancy can end, so get legal advice before you promise anyone a vacant
        property.
      </p>

      <h3>Fire, Water, or Other Damage</h3>
      <p>
        Damage from fire, flood, earthquake, or landslide goes on the Transfer Disclosure Statement.
        Keep your records: repair invoices, permits, and insurance claims. Buyers and their lenders
        will ask for them, and a clear paper trail often settles worries before they turn into price
        cuts.
      </p>

      <h3>Unpermitted Work</h3>
      <p>
        You have two practical choices. You can disclose it and price the home accordingly, or you can
        ask a contractor what it would cost to bring the work up to code before you list. Either way,
        the city’s records and the real house need to match what you tell buyers.
      </p>

      <h2>Pros and Cons of Selling a House As-Is in California</h2>
      <ProsCons pros={PROS} cons={CONS} />

      <h2>Should You Sell As-Is or Fix It First?</h2>
      <p>
        Use one test: if a repair costs less than the discount buyers apply for it, fix it. If it
        costs more, leave it. Get a licensed contractor’s bid so you are comparing real numbers.
      </p>
      <p>Selling as-is probably makes sense if:</p>
      <ul>
        <li>You need to move quickly</li>
        <li>The home isn’t livable or needs major systems work</li>
        <li>You can’t afford repairs or don’t want to manage them</li>
        <li>You inherited the home or live out of state</li>
      </ul>
      <p>Fixing a few things first probably makes sense if:</p>
      <ul>
        <li>You have time to wait for the best price</li>
        <li>The home is livable and the problems are mostly cosmetic</li>
        <li>Low-cost fixes would remove a big discount</li>
      </ul>

      <h3>A Middle Option</h3>
      <p>
        You don’t have to choose between a full renovation and doing nothing.{" "}
        <Link href="/compass-concierge">Compass Concierge</Link> is a Compass program that fronts the cost
        of services like painting, flooring, staging, and some repairs, with nothing due until
        closing. You repay the cost when the home sells, and terms apply, so read them before you
        sign. It can make light prep possible without paying cash upfront.
      </p>

      <h2>FAQ: Selling a House As-Is in California</h2>
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

      <h2>The Bottom Line on Selling a House As-Is in California</h2>
      <p>
        Selling a house as-is in California can be a smart move when time, condition, or cost make
        repairs a poor deal. It works best when you disclose everything you know, price for the
        condition, and compare your real net across every route before you choose one.
      </p>

      <Cta title="Compare Your Options Side by Side" label="Request a Free Home Valuation" href="/home-valuation">
        Before you decide, get a net sheet from an agent and at least two written cash offers. Seeing
        the numbers side by side usually makes the choice clear. If you want a starting point, request
        a free home valuation or contact me and we can walk through your options.
      </Cta>
    </>
  );
}

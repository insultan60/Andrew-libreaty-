import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Steps, Table } from "./_parts";

/**
 * Body for "How to Buy a House in Los Angeles: First-Time Buyer's Guide".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * The eight steps and the escrow timeline are numbered because their order is
 * the point; the comparisons are real tables. The draft named its sources
 * without URLs, so only the agencies whose addresses are stable (Freddie Mac's
 * weekly survey, AnnualCreditReport.com, LAHD, CalHFA, the County Assessor and
 * the California Earthquake Authority) are linked.
 *
 * Hero: a couple moving into their first home, holding up the keys
 * (Unsplash), cropped to 16:10.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I buy a house in Los Angeles if I'm self-employed?",
    a: "Yes. Lenders usually want two years of tax returns, and they look at your income after business expenses. If your deductions are large, your qualifying income can be lower than you expect, so talk to a lender early.",
  },
  {
    q: "Can I use gift money for my down payment?",
    a: "Often yes. Many loan programs allow gifts from family, and the lender will ask for a signed gift letter and a paper trail showing where the money came from. Don't move gift funds around before you tell your lender.",
  },
  {
    q: "Can a non-citizen or someone with an ITIN buy a house in Los Angeles?",
    a: "There is no citizenship requirement to own property in California. Financing is where it gets different, and some lenders offer ITIN or foreign national loans with larger down payments. Assistance programs set their own rules: LIPA, for example, requires U.S. citizens, lawful permanent residents or other qualified aliens.",
  },
  {
    q: "Do I need a real estate attorney?",
    a: "Not usually. In California, escrow and title companies handle the closing, and your agent uses the standard C.A.R. contract. An attorney can help with unusual situations, like a trust, a divorce or a title problem.",
  },
  {
    q: "Should I wait for mortgage rates to drop?",
    a: "Nobody can predict rates. If you buy now and rates fall later, you may be able to refinance, but you would pay closing costs again and a lender has to approve you. If you wait, prices and competition can change too, so compare your cost of waiting with your cost of buying.",
  },
  {
    q: "How long do I need to stay in a home for buying to beat renting?",
    a: "It depends on your price, down payment, rate and rent. Closing costs and selling costs mean most buyers need several years to come out ahead. My renting vs buying breakdown shows a worked example you can adjust.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  ["What does a typical home cost?", "Median sale price of about $913,000 in LA County (Redfin, three months ending September 2026)"],
  ["How long do homes take to sell?", "Median of 52 days on the market (Redfin, same period)"],
  ["What is the mortgage rate?", "7.24% for a 30-year fixed, weekly average (Freddie Mac, October 29, 2026). Your own quote will differ"],
  ["What is the loan limit?", "$1,249,125 for a one-unit home in LA County in 2026"],
  ["How much do I need down?", "As little as 3% conventional, 3.5% FHA with a 580+ score, 0% VA for eligible buyers"],
  ["Is there down payment help?", "City of LA: up to $161,000 (LIPA) for qualifying buyers. State: CalHFA programs with their own limits"],
  ["How much is earnest money?", "1% to 3% is typical, due to escrow within 3 business days of acceptance"],
  ["How long is the contingency window?", "17 days by default in the standard C.A.R. contract"],
  ["What do buyer closing costs run?", "Commonly 2% to 5% of the price"],
  ["How long is escrow?", "About 30 days is common"],
];

const EIGHT_STEPS: [string, ReactNode][] = [
  ["Check your credit, income and savings.", "Know what a lender will see before you apply."],
  ["Set a monthly budget you can live with.", "Work from the full monthly cost, not the list price."],
  ["Get pre-approved and pick a loan.", "A pre-approval letter is your ticket to make an offer."],
  ["Line up your down payment and closing costs.", "Add up what you need in cash, and check for assistance."],
  ["Choose where to buy.", "Match the neighborhood to your budget, commute and insurance risk."],
  ["Hire a buyer's agent and sign the buyer agreement.", "Read the fee and the term before you tour."],
  ["Search, offer and negotiate.", "Compare homes on total cost, and offers on more than price."],
  ["Go through escrow and close.", "Inspections, appraisal, final walkthrough, signing, keys."],
];

const LOAN_TYPES: ReactNode[][] = [
  ["Conventional", "3% on some programs", "620", "Private mortgage insurance (PMI) until you build about 20% equity"],
  ["FHA", "3.5% with a 580+ score", "580", "Mortgage insurance usually lasts the life of the loan if you put down less than 10%"],
  ["VA", "0%", "Set by the lender", "For eligible veterans and service members. A funding fee applies"],
  ["Jumbo", "Set by the lender", "Set by the lender", "Needed above $1,249,125 in LA County. Rules are usually tighter"],
];

const MONTHLY_COST: ReactNode[][] = [
  ["Principal and interest", "$5,833", "$855,000 at 7.25% over 30 years"],
  ["Property tax", "$938", "About 1.25% of $900,000 per year"],
  ["Homeowners insurance", "$250", "Placeholder. Hillside homes often cost much more"],
  ["Mortgage insurance (PMI)", "$428", "Placeholder. Depends on credit and down payment"],
  ["HOA dues", "$0", "None on most houses. Condos add dues"],
  [<strong key="t">Total</strong>, <strong key="tv">$7,449</strong>, ""],
];

const RATES: ReactNode[][] = [
  ["6.75%", "$5,546", "$7,162"],
  ["7.25%", "$5,833", "$7,449"],
  ["7.75%", "$6,125", "$7,741"],
];

const DOWN_PAYMENTS: ReactNode[][] = [
  ["3%", "$27,000", "Some conventional programs"],
  ["3.5%", "$31,500", "FHA with a 580+ score"],
  ["5%", "$45,000", "Common first-time buyer choice"],
  ["20%", "$180,000", "No PMI on a conventional loan"],
];

const PROGRAMS: ReactNode[][] = [
  [
    "LAHD LIPA",
    "Buyers purchasing inside the City of LA with income up to 80% of area median. In 2026 that is $93,300 for one person and $133,250 for four",
    "Up to $161,000 at 0% interest, deferred, with shared appreciation",
    "Max purchase price $956,465. Middle credit score of 660 or higher. 1% down from your own funds. 8-hour class. Limited reservation rounds",
  ],
  [
    "LAHD MIPA",
    "Buyers in the City of LA with income between 81% and 120% of area median",
    "Up to $115,000",
    "Funding runs out. Confirm status with LAHD before you plan around it",
  ],
  [
    "CalHFA MyHome",
    "First-time buyers statewide using a CalHFA first mortgage",
    "Up to 3.5% of the price on FHA and government loans, up to 3% on conventional, as a deferred loan",
    "Income and price limits vary by county. Repaid when you sell, refinance or pay off the first mortgage",
  ],
  [
    "CalHFA Dream For All",
    "First-generation buyers, chosen by lottery",
    "Up to 20% of the price, capped at $150,000, as a shared appreciation loan",
    "The 2026 registration window closed March 16. No new round had been announced when I wrote this",
  ],
  [
    "CalHFA Mortgage Credit Certificate",
    "Buyers using a CalHFA-approved lender",
    "A federal tax credit on part of your mortgage interest",
    "Ask a tax professional how it applies to you",
  ],
];

const CLOSING_COSTS: ReactNode[][] = [
  ["Lender fees and appraisal", "Buyer", "Listed on your Loan Estimate"],
  ["Lender's title policy", "Buyer", "Required by your lender"],
  ["Owner's title policy", "Seller", "Negotiable in the contract"],
  ["Escrow fee", "Split between buyer and seller", "Negotiable"],
  ["Transfer tax", "Seller", "County and City of LA rates apply"],
  ["Recording fees", "Buyer", "Small, but they add up"],
  ["Prepaids and starting balances", "Buyer", "First-year insurance, plus tax and insurance reserves"],
];

const ESCROW_STEPS: [string, ReactNode][] = [
  ["Open escrow and deposit.", "Your earnest money goes to escrow within 3 business days of acceptance."],
  ["Receive disclosures.", "The seller generally has 7 days after acceptance to deliver them. Read every page."],
  ["Inspect the home.", "You hire the inspectors, and their reports drive your repair requests."],
  ["Appraisal.", "Your lender orders one to confirm the home is worth the loan."],
  ["Loan approval.", "Underwriting reviews your documents again, and may ask for more."],
  ["Remove contingencies in writing.", "Until you do, you can still cancel for a reason the contract covers."],
  ["Final walkthrough.", "Usually a few days before closing, to confirm the home's condition and any agreed repairs."],
  [
    "Sign, fund and record.",
    "You sign with escrow, your funds arrive, and the deed records with the county. Recording is the legal moment you own the home.",
  ],
];

const INSPECTIONS: ReactNode[][] = [
  [
    "General home inspection",
    "Roof, structure, plumbing, electrical, heating and cooling",
    "About $330 average in LA, more for large or older homes",
  ],
  ["Termite and pest", "Wood-destroying pests and damage", "$75 to $325"],
  ["Sewer scope", "Camera inspection of the main sewer line", "Starts around $270, more with hard access"],
  ["Roof, foundation, hillside or pool", "Specialist review of a known concern", "Quoted per job. Get it in writing"],
];

export default function HowToBuyAHouseInLosAngeles() {
  return (
    <>
      <p>
        Buying a house in Los Angeles follows the same path as buying anywhere in California: get
        pre-approved, find a home, make an offer, and close through escrow. If you are a first-time home
        buyer in Los Angeles, what changes is the money, the insurance, and the help available.
      </p>
      <p>
        Prices are high, so the monthly payment is the real test. Insurance can decide a deal, especially in
        the hills. And the biggest down payment programs are small, with limited funding rounds and price
        caps.
      </p>
      <p>
        This guide covers eight steps in order, with real numbers and the places where first-time buyers get
        caught off guard. I work mostly in Studio City, Sherman Oaks, Laurel Canyon and the Hollywood Hills,
        so where the Valley and the hillside areas behave differently, I say so.
      </p>

      <h2>Quick Facts for Los Angeles First-Time Buyers</h2>
      <p>Figures are current as of November 2026. Sources are named in the sections below.</p>
      <Table label="Quick facts for Los Angeles first-time buyers" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>What Does It Take to Buy a House in Los Angeles?</h2>
      <p>Eight steps, in this order. Each one has its own section below.</p>
      <Steps items={EIGHT_STEPS} />
      <p>
        Most first-time buyers start at step 5 or 7. They fall for a house, then work backward to see if they
        can carry it. Starting with the monthly cost in step 2 keeps every later decision honest.
      </p>

      <h2>Step 1: Check Your Credit, Income and Savings</h2>
      <p>
        Lenders look at three things: your credit score, your debt-to-income ratio (DTI), and your savings.
        Check all three before you look at a single listing.
      </p>
      <p>
        Your credit score decides which loans you can use and what rate you pay. HUD lets you put down 3.5%
        on an FHA loan with a score of 580 or higher.
      </p>
      <p>
        Conventional lenders usually want 620 or more, and the best rates often go to scores in the 740s and
        up. Each lender sets its own cutoffs, so ask.
      </p>
      <Table
        label="Loan types for first-time buyers"
        head={["Loan type", "Minimum down payment", "Typical score floor", "Good to know"]}
        rows={LOAN_TYPES}
      />
      <p>
        DTI is simple to work out. Add your monthly debt payments, including the new housing payment, and
        divide by your gross monthly income. A car payment and a student loan count the same as a credit card
        minimum.
      </p>
      <p>
        Many lenders get cautious when DTI reaches the low to mid 40s. Some programs allow more when credit
        and savings are strong.
      </p>
      <p>
        To raise your score before you apply, pay down card balances and pay every bill on time. Hold off on
        new credit, and pull your reports for free at{" "}
        <ExternalLink href="https://www.annualcreditreport.com">AnnualCreditReport.com</ExternalLink>. If you
        are still deciding whether to buy at all, my breakdown of the{" "}
        <Link href="/blog/pros-and-cons-of-renting-vs-buying-a-house">pros and cons of renting vs buying</Link>{" "}
        includes a worked cost example.
      </p>

      <h2>Step 2: How Much House Can I Afford in Los Angeles?</h2>
      <p>
        Start with the monthly payment, not the price. A mortgage payment has more parts than most people
        expect: principal and interest, property tax, homeowners insurance, mortgage insurance if you put
        down less than 20%, and HOA dues for a condo or townhome.
      </p>
      <p>
        Here is an example. It is math, not a quote. The price, down payment and rate are real-world
        assumptions. The insurance and PMI lines are placeholders, so get quotes for your own home.
      </p>
      <p>
        Assumptions: a $900,000 house, 5% down ($45,000), an $855,000 loan, a 30-year fixed rate of 7.25%,
        and property tax at about 1.25% of the price.
      </p>
      <Table
        label="Example monthly cost of a $900,000 home with 5% down"
        head={["Monthly cost", "Amount", "Note"]}
        rows={MONTHLY_COST}
      />
      <p>
        California property tax starts at about 1% of the purchase price under Proposition 13, plus local
        assessments. In LA County that often lands near 1.2% to 1.25%, which is why I use 1.25% above.
      </p>
      <p>
        The interest rate moves the payment more than most buyers expect.{" "}
        <ExternalLink href="https://www.freddiemac.com/pmms">Freddie Mac’s weekly survey</ExternalLink> put
        the 30-year average at 7.24% on October 29, 2026, down slightly from the week before. Here is the
        same house at three rates.
      </p>
      <Table
        label="The same $900,000 home at three interest rates"
        head={["Rate", "Principal and interest", "Total monthly cost"]}
        rows={RATES}
      />
      <p>
        A full percentage point changes the payment by about $579 a month on this loan. That is why I ask a
        lender for a live quote before we set a price range.
      </p>
      <p>
        Now the income side. A common rule of thumb keeps housing at about 28% of gross income. At $7,449 a
        month, that points to roughly $26,600 a month, or about $319,000 a year.
      </p>
      <p>
        Lenders can approve you for a higher share. But the rule shows why a $900,000 purchase takes a high
        household income, or a bigger down payment, a lower price, or a condo.
      </p>
      <p>A pre-approval tells you the most a lender will lend. It does not know how you want to live.</p>
      <p>
        Pick a payment that leaves room for savings, repairs and the occasional bad month. This is general
        information, not financial advice, so run your own numbers with a lender.
      </p>

      <h2>Step 3: Get Pre-Approved and Pick a Loan</h2>
      <p>
        A pre-qualification is a quick estimate based on what you tell a lender. A pre-approval means the
        lender has reviewed your documents. Sellers take a pre-approval letter seriously, and you will need
        one before you make an offer.
      </p>
      <p>
        Expect to provide pay stubs, W-2s, two years of tax returns, recent bank statements and a photo ID.
        Self-employed buyers usually need two years of tax returns, and lenders look at income after business
        expenses. Many pre-approval letters last 60 to 90 days, so ask how long yours is good for.
      </p>
      <p>
        Ask at least two or three lenders for a Loan Estimate. It is the standard three-page form that shows
        your rate, fees and cash to close. Compare the fees, not just the rate.
      </p>
      <p>
        The loan size matters. For 2026, the conforming loan limit for a one-unit home in LA County is
        $1,249,125, set by the Federal Housing Finance Agency. FHA uses the same ceiling in LA County. A loan
        above that is a jumbo loan.
      </p>
      <p>
        If you plan to use city or state help, pick the lender first. LAHD’s programs run through its
        participating lenders, and CalHFA loans require a CalHFA-approved lender. A lender outside those
        lists can’t give you the assistance.
      </p>

      <Cta title="Not Sure What You Can Afford?" label="Book a Free Consultation" href="/contact">
        Tell me your income, savings and timeline. I’ll walk through a realistic price range, show you the
        monthly cost, and connect you with lenders I trust. Or{" "}
        <Link href="/home-search">start your home search</Link>.
      </Cta>

      <h2>Step 4: Line Up Your Down Payment and Closing Costs</h2>
      <p>
        Plan for three cash needs: the down payment, closing costs, and savings you keep after closing. The
        third one gets forgotten most often.
      </p>

      <h3>How Much Do You Need for a Down Payment?</h3>
      <p>It depends on the loan. On a $900,000 home, here is what each option looks like.</p>
      <Table
        label="Down payment options on a $900,000 home"
        head={["Down payment", "Amount", "Typical use"]}
        rows={DOWN_PAYMENTS}
      />
      <p>
        A bigger down payment lowers your payment and your PMI. But it also leaves you with less cash after
        closing. I would rather see a buyer put down 5% and keep a cushion than put down 20% and have nothing
        left for a broken water heater.
      </p>

      <h3>First-Time Buyer Programs in Los Angeles</h3>
      <p>
        Most programs define a first-time buyer as someone with no ownership interest in a home during the
        last three years. Nearly all require a homebuyer education class, and most have income limits. Here
        are the main options, with the terms I could confirm.
      </p>
      <Table
        label="First-time buyer programs in Los Angeles"
        head={["Program", "Who it fits", "What you get", "Things to know"]}
        rows={PROGRAMS}
      />
      <p>
        Here is how LIPA works in practice. The city’s loan covers the gap between the purchase price plus
        closing costs and what your first mortgage, down payment and other funds cover. The loan is due when
        you sell, transfer title, pay off the first mortgage, or reach year 30, and the city also takes a
        share of the home’s appreciation.
      </p>
      <p>
        <ExternalLink href="https://housing.lacity.gov">LAHD</ExternalLink>’s schedule listed a LIPA
        reservation round on November 18, 2026, with 15 reservations, and a MIPA round on December 16 with 13.
        Those numbers are small, and LAHD says the schedule can change. If you want to use this program, talk
        to a participating lender now. For the state programs, see{" "}
        <ExternalLink href="https://calhfa.ca.gov/homebuyer/programs/index.htm">CalHFA’s homebuyer programs</ExternalLink>.
      </p>
      <p>
        Two honest points. Most of this help is a loan, not a gift, so read the repayment terms before you
        count it as free money. And do not build your offer around a lottery. If you win, great, but have a
        plan that works without it.
      </p>
      <p>
        The price cap matters too. LIPA covers purchases up to $956,465 inside the City of Los Angeles only.
      </p>
      <p>
        In Studio City and Sherman Oaks, most single-family homes sell above that cap, so the program there is
        mostly a condo and townhome tool. If your target neighborhood is a separate city, like Santa Monica or
        Culver City, the city programs don’t apply at all.
      </p>

      <h3>What Are Buyer Closing Costs in California?</h3>
      <p>
        Many lenders and agents quote closing costs for buyers in California at 2% to 5% of the purchase
        price. They cover lender fees, title and escrow charges, recording fees, and prepaid items like your
        first year of homeowners insurance and starting balances for tax and insurance accounts. Your Loan
        Estimate gives the real number for your loan.
      </p>
      <p>
        Who pays what depends on local custom. In Southern California, sellers customarily pay for the
        owner’s title policy and the county transfer tax, and buyer and seller split escrow fees. I show the
        seller’s side of this in my{" "}
        <Link href="/blog/selling-a-house-in-los-angeles">Los Angeles seller’s guide</Link>.
      </p>
      <Table
        label="Who customarily pays closing costs in LA County"
        head={["Cost", "Who customarily pays in LA County", "Note"]}
        rows={CLOSING_COSTS}
      />
      <p>
        You can also ask the seller for a credit toward your costs. Loan programs cap how much a seller can
        contribute, so ask your lender before you write the offer.
      </p>
      <p>
        On the same $900,000 home, a 5% down payment is $45,000 and closing costs at 2% to 5% are $18,000 to
        $45,000. That puts cash to close at roughly $63,000 to $90,000, before the savings you keep for after
        closing.
      </p>

      <h3>How Much Is the Earnest Money Deposit?</h3>
      <p>
        The earnest money deposit is your good-faith payment, and it goes to escrow, not to the seller. In
        California, 1% to 3% of the price is typical, and the amount is whatever you and the seller agree to
        in the contract. On a $900,000 home, 3% is $27,000.
      </p>
      <p>
        The standard C.A.R. contract gives you 3 business days after acceptance to deliver it. It counts
        toward your down payment and closing costs at closing, so it is not an extra cost.
      </p>
      <p>
        The risk comes later. Once you remove your contingencies, backing out without a valid reason can cost
        you the deposit. California law limits what a seller can keep as liquidated damages in many
        owner-occupied purchases, but the limit is still real money.
      </p>
      <p>
        Always confirm wire instructions with escrow by phone before you send funds. Wire fraud targets buyers
        at this exact moment.
      </p>

      <h2>Step 5: Choose Where to Buy</h2>
      <p>
        Choose with four filters: the price band you can carry, the type of property, your commute, and
        insurance risk. Los Angeles is not one market. A neighborhood that fits your budget in one part of
        town can be out of reach 10 miles away.
      </p>
      <p>
        Start with price and property type. If your budget is tight, my guide to the{" "}
        <Link href="/blog/most-affordable-places-to-live-in-los-angeles">
          most affordable places to live in Los Angeles
        </Link>{" "}
        covers Lancaster and Palmdale for houses and Panorama City and Boyle Heights for city living, with the
        commute trade-offs. If you are choosing between two Valley neighborhoods,{" "}
        <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs Sherman Oaks</Link> compares prices,
        walkability, schools and hillside risk.
      </p>
      <p>A few neighborhood notes from the areas I know best:</p>
      <ul>
        <li>
          <strong>
            <Link href="/real-estate-agent-in-studio-city">Studio City</Link>:
          </strong>{" "}
          A village feel south of the Boulevard, close to the studios, with sought-after schools.
        </li>
        <li>
          <strong>
            <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link> and{" "}
            <Link href="/real-estate-agent-in-valley-village">Valley Village</Link>:
          </strong>{" "}
          Valley neighborhoods with a range of home types and good freeway access.
        </li>
        <li>
          <strong>
            <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and the{" "}
            <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link>:
          </strong>{" "}
          Hillside living with views, and the insurance and inspection questions that come with it.
        </li>
      </ul>
      <p>
        You can browse all of them on my <Link href="/neighborhoods">neighborhoods page</Link>.
      </p>
      <p>
        If you want rental income to help with the payment, an owner-occupied duplex can work. I explain the
        loan options, rent control and the numbers to check in my guide to{" "}
        <Link href="/blog/how-to-buy-a-duplex-in-los-angeles">buying a duplex in Los Angeles</Link>.
      </p>

      <h3>Condo or House?</h3>
      <p>
        Condos and townhomes cost less up front, but you pay monthly HOA dues, and those belong in your
        budget from step 2. Ask for the HOA budget, the reserve study and the meeting minutes. Low reserves
        and talk of special assessments are warning signs.
      </p>
      <p>
        Houses cost more, but you own the land and the yard. In Los Angeles, outdoor space counts as living
        space.
      </p>

      <h3>Get an Insurance Quote Before You Offer</h3>
      <p>
        Insurance has become part of the price. Stanford researchers found that the California FAIR Plan, the
        state’s insurer of last resort, covered about 5% of single-family homes as of March 2026, up from 1.5%
        in December 2020. They also found premiums up 84% since 2020.
      </p>
      <p>
        In the flats of the Valley this comes up less often. In the hills it comes up in almost every
        conversation. A buyer who can’t get a policy at a price they can carry can’t close, because a lender
        won’t fund a loan without coverage.
      </p>
      <p>
        So get a quote before you submit an offer on any hillside or canyon home, and ask about the roof,
        vents and defensible space. Standard homeowners policies don’t cover earthquake damage, so also price
        a separate policy, such as one from the{" "}
        <ExternalLink href="https://www.earthquakeauthority.com">California Earthquake Authority</ExternalLink>,
        and decide if you want it. I cover the seller’s side of hillside insurance in my{" "}
        <Link href="/blog/selling-a-house-in-los-angeles">seller’s guide</Link>.
      </p>

      <h2>Step 6: Hire a Buyer’s Agent and Sign the Buyer Agreement</h2>
      <p>
        Since August 17, 2024, an agent working with you must sign a written agreement with you before touring
        a home, in person or on a live video tour. You do not need one if you are just talking to an agent at
        an open house.
      </p>
      <p>
        The agreement spells out what services you get, how much your agent is paid, how long the agreement
        lasts, and how to end it. Read all four before you sign.
      </p>
      <p>
        Compensation is negotiable. A seller may agree to pay some or all of it in the contract, but they
        don’t have to. Settle with your agent what happens if the seller doesn’t, before you write your first
        offer.
      </p>
      <p>Ask any agent you interview:</p>
      <ul>
        <li>How many first-time buyers did you close with in the last 12 months?</li>
        <li>How do you handle multiple offers, and what have you seen win?</li>
        <li>What is your fee, and how long is the agreement?</li>
        <li>How do you work with lenders and insurance brokers on hillside homes?</li>
        <li>Who on your team will I speak with day to day?</li>
      </ul>
      <p>
        I earn a commission only if you buy, so weigh my view with that in mind. What I can promise is that I
        run the numbers first and tell you when a home is not worth the price. One buyer wrote that I
        “over-delivered when he helped us buy our first home.” You can read more on my{" "}
        <Link href="/testimonials">testimonials page</Link> or <Link href="/team">meet the team</Link>.
      </p>
      <p>
        Can you buy without an agent? Yes, California doesn’t require one. But the listing agent works for the
        seller, and you would handle pricing, contracts, disclosures and negotiation alone.
      </p>

      <h2>Step 7: Search, Make an Offer and Negotiate</h2>
      <p>
        Set up alerts on my <Link href="/home-search">home search</Link> so new listings reach you the day
        they appear. Tour often, and compare homes on total monthly cost, not list price. A $50,000 difference
        in price is smaller than a $500 difference in monthly insurance.
      </p>
      <p>
        County numbers help set your expectations. Redfin’s data for the three months ending September 2026
        shows homes selling for 99.2% of list price on average, and 36.2% selling above list. That means
        nearly two-thirds sold at or below list.
      </p>
      <p>
        Another 18.1% of listings had a price drop. Well-priced homes still draw competition, and overpriced
        ones sit and get cut. Always check which area and months a number covers.
      </p>

      <h3>What Goes Into an Offer</h3>
      <p>Price is one line. A strong offer also covers:</p>
      <ul>
        <li>
          <strong>Comparable sales.</strong> Look at what similar homes actually sold for in the last 60 to 90
          days, not what they were listed for.
        </li>
        <li>
          <strong>Earnest money.</strong> A larger deposit signals confidence, and it is at risk only after you
          remove contingencies.
        </li>
        <li>
          <strong>Contingencies.</strong> Inspection, appraisal and loan contingencies protect you. Each one
          you drop makes your offer stronger and your risk bigger.
        </li>
        <li>
          <strong>Closing date.</strong> Match it to your lease and the seller’s plans.
        </li>
        <li>
          <strong>Seller credits.</strong> Ask for one if the home needs work.
        </li>
        <li>
          <strong>Rent-back.</strong> A short stay after closing can be worth more to a seller than a few
          thousand dollars.
        </li>
      </ul>
      <p>
        An escalation clause raises your bid automatically up to a cap you set. It can help in a
        multiple-offer situation, but it can also reveal your limit, so talk it through with your agent
        first.
      </p>
      <p>
        Waiving your inspection contingency means you can no longer cancel over what an inspector finds.
        First-time buyers should price that risk honestly before they do it. A pre-approval letter, proof of
        funds for your deposit and down payment, and a clean offer package often matter more than a waiver.
      </p>
      <p>
        After the inspection, you can ask for repairs, a credit or a lower price. A credit is often cleaner
        than coordinating contractors during a 30-day escrow.
      </p>
      <p>
        This stage is where my Certified Real Estate Negotiation Expert training gets the most use. I cover
        the other side of this conversation in my{" "}
        <Link href="/blog/selling-a-house-in-los-angeles">seller’s guide</Link>.
      </p>

      <h2>Step 8: Go Through Escrow and Close</h2>
      <p>
        Once the seller accepts, a neutral escrow company holds your money and documents until every
        condition in the contract is met. A 30-day escrow is common, but the contract sets the date. The
        standard C.A.R. contract gives you 17 days by default to complete your inspections and remove
        contingencies, unless the contract says otherwise.
      </p>
      <p>In practice, the weeks look like this:</p>
      <Steps items={ESCROW_STEPS} />
      <p>
        Your lender must give you the Closing Disclosure at least 3 business days before closing. Compare it
        to your Loan Estimate line by line and ask about anything that changed.
      </p>
      <p>
        Between pre-approval and closing, keep your finances still. Do not change jobs, open new credit,
        finance a car or move large sums between accounts without talking to your lender first. A lender
        re-checks your credit before funding, and a surprise can sink an approval.
      </p>

      <h3>How Much Does a Home Inspection Cost in Los Angeles?</h3>
      <p>
        A general inspection in Los Angeles averages about $330, based on HomeAdvisor data. Larger homes,
        older homes and hillside properties cost more, and specialty inspections are quoted separately.
      </p>
      <Table
        label="Home inspection costs in Los Angeles"
        head={["Inspection", "What it covers", "Typical cost"]}
        rows={INSPECTIONS}
      />
      <p>
        On a home built before 1980, I almost always recommend a sewer scope. On a hillside home, I want the
        retaining walls, drainage and foundation reviewed by someone who does that work every day.
      </p>
      <p>
        The inspection fee is small next to the repairs it can uncover. Get quotes from a few inspectors, and
        ask what each report covers.
      </p>

      <h3>What Disclosures Will You Receive?</h3>
      <p>California puts most of the disclosure burden on the seller. You should expect, at a minimum:</p>
      <ul>
        <li>
          <strong>Transfer Disclosure Statement (TDS).</strong> The seller’s list of known defects and past
          repairs.
        </li>
        <li>
          <strong>Natural Hazard Disclosure.</strong> States whether the property sits in mapped fire,
          earthquake, flood or other hazard zones.
        </li>
        <li>
          <strong>LADBS Residential Property Report.</strong> Required for homes inside the City of Los
          Angeles, and it lists permits and zoning information.
        </li>
        <li>
          <strong>Lead-based paint disclosure.</strong> Federal rule for homes built before 1978.
        </li>
        <li>
          <strong>Preliminary title report.</strong> Shows liens and recorded claims on the property.
        </li>
      </ul>
      <p>
        I walk through each one from the seller’s side in the disclosure section of my{" "}
        <Link href="/blog/selling-a-house-in-los-angeles">seller’s guide</Link>. Pay close attention to
        unpermitted work, like garage conversions, enclosed patios and backyard units.
      </p>
      <p>
        If a seller can’t show permits, ask your agent how that could affect your loan, your insurance and a
        future sale. If you are looking at a home sold as-is, my guide to{" "}
        <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>{" "}
        shows what the seller still has to tell you.
      </p>

      <h3>What If the Appraisal Comes in Low?</h3>
      <p>
        A low appraisal means the lender sees the home as worth less than your offer. You can ask the seller
        to lower the price, cover the gap in cash, challenge the appraisal if you spot an error, or cancel
        under your appraisal contingency. Your agent should show you how each choice changes your cash and
        your risk.
      </p>

      <h2>After You Close</h2>
      <p>Closing is not the last bill. A few things come after you get the keys.</p>
      <p>
        <strong>The supplemental tax bill.</strong> When you buy in California, the county reassesses the home
        at your purchase price. The Assessor then sends a supplemental bill for the difference between the old
        assessed value and the new one, prorated for the rest of the fiscal year, which runs July 1 to June 30.
      </p>
      <p>
        Here is an example. Say the seller’s assessed value was $450,000 and you pay $900,000. The difference
        is $450,000, and at about 1.2% that is roughly $5,400 a year. If eight months of the fiscal year
        remain, the bill is about $3,600.
      </p>
      <p>
        If you close between January and May, you can get two supplemental bills. The LA County Assessor says
        these bills are generally not paid through impound accounts, so keep cash aside. You can estimate
        yours with the{" "}
        <ExternalLink href="https://assessor.lacounty.gov">LA County Assessor</ExternalLink>’s supplemental
        tax estimator, or ask escrow.
      </p>
      <p>
        <strong>The homeowner’s exemption.</strong> File it with the Assessor once you move in. It lowers your
        assessed value by $7,000, which is worth under $100 a year at typical rates. It is small, but it is
        free.
      </p>
      <p>
        <strong>Insurance.</strong> Your lender requires homeowners insurance at closing. Earthquake coverage
        is separate and optional, so decide on it with your broker.
      </p>
      <p>
        <strong>A repair fund.</strong> A common rule of thumb is to set aside about 1% of the home’s value
        each year for maintenance. On a $900,000 home that is $9,000. You will rarely spend it evenly, but a
        roof or a sewer line doesn’t wait for a good month.
      </p>
      <p>This is general information, not tax advice. Talk to a CPA about your own situation.</p>

      <h2>Mistakes First-Time Buyers Make in Los Angeles</h2>
      <ul>
        <li>
          <strong>Shopping at the pre-approval ceiling.</strong> The lender’s maximum is not your budget. Work
          from the monthly cost you can carry through a rough year.
        </li>
        <li>
          <strong>Skipping the insurance quote.</strong> On a hillside home, the quote can change the whole
          deal.
        </li>
        <li>
          <strong>Counting on a program that depends on a lottery.</strong> Have a plan that works without it.
        </li>
        <li>
          <strong>Waiving protections to win.</strong> An offer with fewer contingencies is stronger, but you
          carry the risk if the home has a problem.
        </li>
        <li>
          <strong>Ignoring unpermitted work.</strong> It can complicate your loan, your insurance and your
          resale.
        </li>
        <li>
          <strong>Spending every dollar at closing.</strong> The first year of ownership has surprises, and
          you need savings left to handle them.
        </li>
      </ul>

      <h2>Frequently Asked Questions About Buying a House in Los Angeles</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling.
          The answers stay plain text so they match the FAQPage schema exactly. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}

      <Cta title="Ready to Talk Numbers?" label="Book a Free Consultation" href="/contact">
        Buying your first home in Los Angeles comes down to a few honest numbers: your monthly payment, your
        cash, and your insurance. Tell me your goals and timeline, and I’ll build a plan around them.
      </Cta>
    </>
  );
}

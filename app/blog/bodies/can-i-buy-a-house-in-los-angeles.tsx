import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Steps, Table } from "./_parts";

/**
 * Body for "Can I Buy a House in Los Angeles?".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * The seven buying steps are numbered because their order is the point. The
 * roadblocks are a real two-column table (problem, fix), so they use Table.
 * The draft's two "CTA" markers are rendered as Cta panels.
 *
 * Hero: the keys-on-a-railing image supplied in the draft, cropped to 16:10.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I buy a house in Los Angeles with a normal salary?",
    a: "Yes, in many cases. It depends on the home type and the neighborhood. Condos, townhomes, and areas outside the center often cost less. A lender can tell you how much you can borrow.",
  },
  {
    q: "Can I buy a house in Los Angeles with bad credit?",
    a: "Sometimes. Some loan types accept lower credit scores, often with a larger down payment or a higher rate. Improving your score before you apply can save money.",
  },
  {
    q: "Can I buy a house in Los Angeles with no money down?",
    a: "Sometimes. Eligible veterans can use VA loans with no down payment. Most other buyers need a down payment. Assistance programs can help cover it.",
  },
  {
    q: "Can a first-time buyer buy a house in Los Angeles?",
    a: "Yes. First-time buyers can use special loans and assistance programs. A lender and a buyer agent can show you which ones fit.",
  },
  {
    q: "Is it worth buying a house in Los Angeles?",
    a: "It can be, if you plan to stay for a while and can afford the full monthly cost. Compare it with renting before you decide.",
  },
  {
    q: "How long does it take to buy a house in Los Angeles?",
    a: "Most buyers take a few weeks to a few months from the first search to closing. After your offer is accepted, closing usually takes about a month or two. Pre-approval and a clear budget speed things up.",
  },
  {
    q: "Do I need a buyer agent to buy a house in Los Angeles?",
    a: "You are not required to have one, but it helps. A buyer agent finds homes, explains local rules, writes your offer, and negotiates for you.",
  },
];

const STEPS: [string, ReactNode][] = [
  ["Check your credit and your budget.", "Know your score, your debts, and your monthly limit."],
  ["Save for your down payment and closing costs.", "Set aside both."],
  [
    "Get pre-approved.",
    "A lender reviews your finances and tells you how much you can borrow. Sellers take your offer more seriously with a pre-approval.",
  ],
  [
    "Pick a neighborhood and a home type.",
    "Houses, condos, and townhomes each have different costs and rules.",
  ],
  ["Hire a buyer agent.", "An agent finds homes, writes your offer, and negotiates for you."],
  [
    "Make an offer and get an inspection.",
    "Inspections show repairs you may need to fix or negotiate.",
  ],
  ["Close on the home.", "You sign papers, pay your costs, and get the keys."],
];

const ROADBLOCKS: ReactNode[][] = [
  ["Low credit", "Pay down cards, fix errors, and ask a lender about loan types that fit"],
  ["Small down payment", "Look at low-down-payment loans and assistance programs"],
  ["High monthly debts", "Pay off small balances before you apply"],
  ["Home prices feel too high", "Compare condos, townhomes, and other neighborhoods"],
  ["Not sure where to start", "Talk with a local buyer agent and a lender"],
];

export default function CanIBuyAHouseInLosAngeles() {
  return (
    <>
      <p>
        Yes. You can buy a house in Los Angeles if you have steady income, a down payment, credit that a
        lender will accept, and a plan for your monthly costs.
      </p>
      <p>
        You do not need perfect credit or a huge down payment. Loan programs and help for first-time
        buyers can lower the bar.
      </p>
      <p>
        The harder question is not “Can I?” but “Which home fits my budget?” This guide shows what you
        need and how to start.
      </p>

      <h2>What You Need to Buy a House in Los Angeles</h2>
      <p>You need five things. Each one has more room than most people expect.</p>
      <h3>Steady Income</h3>
      <p>
        Lenders want proof that your income will continue. Pay stubs, tax returns, and bank records usually
        do the job. A job history helps, but you can qualify with other kinds of income too.
      </p>
      <h3>A Down Payment</h3>
      <p>
        Every loan asks for some money upfront. The amount depends on the loan type. Some loans ask for
        less than you may think, and a few veteran loans ask for none. A bigger down payment lowers your
        monthly payment.
      </p>
      <h3>Credit a Lender Accepts</h3>
      <p>
        A higher score gets you a better rate. A lower score can still work with some loan types. Check
        your credit report early, and fix errors before you apply.
      </p>
      <h3>Low Monthly Debts</h3>
      <p>
        Lenders compare your monthly debts to your income. Paying down a card or a car loan before you
        apply can help you qualify.
      </p>
      <h3>Cash for Closing Costs and Reserves</h3>
      <p>
        Closing costs cover fees for the loan, title, and escrow. You also need cash for inspections and
        moving. Keep a cushion after closing for repairs and surprises.
      </p>

      <h2>Can I Afford a House in Los Angeles on My Income?</h2>
      <p>
        It depends on the home and the neighborhood, not only your paycheck. Los Angeles prices vary a lot
        from one area to the next. Your real monthly cost has more parts than the loan payment:
      </p>
      <ul>
        <li>The loan payment</li>
        <li>Property tax</li>
        <li>Home insurance, and extra coverage for earthquake or fire if you want it</li>
        <li>HOA dues, if you buy a condo or townhome</li>
        <li>Repairs and upkeep</li>
      </ul>
      <p>You can lower your cost in a few ways:</p>
      <ul>
        <li>
          <strong>Look at condos and townhomes.</strong> They often cost less than houses.
        </li>
        <li>
          <strong>Compare neighborhoods.</strong> Areas farther from the center usually cost less. See our
          guide to the{" "}
          <Link href="/blog/most-affordable-places-to-live-in-los-angeles">
            most affordable places to live in Los Angeles
          </Link>{" "}
          before you start.
        </li>
        <li>
          <strong>Use a loan program.</strong> Some programs lower the down payment or the rate.
        </li>
        <li>
          <strong>Buy with a partner or co-buyer.</strong> Two incomes can help you qualify.
        </li>
      </ul>

      <Cta title="Ready to See What You Can Buy?" label="Browse Active Listings" href="/home-search">
        I’m Andrew Liberty, a buyer agent in Studio City, Sherman Oaks, Valley Village, and the Hollywood
        Hills. I help you match your budget to the right neighborhood and the right kind of home. Browse
        active listings or <Link href="/contact">schedule a free consultation</Link>.
      </Cta>

      <h2>Help for Los Angeles Buyers</h2>
      <p>
        Yes, help exists. California’s housing finance agency,{" "}
        <ExternalLink href="https://calhfa.ca.gov/homebuyer/programs/index.htm">CalHFA</ExternalLink>,
        offers loan programs to help you buy a home in California, including first mortgages and down
        payment assistance. It also offers several options for down payment and closing cost help.
      </p>
      <p>Keep these points in mind:</p>
      <ul>
        <li>
          <strong>Programs have rules.</strong> Many use income limits and ask you to take a homebuyer
          class.
        </li>
        <li>
          <strong>Programs change.</strong> Funds and terms can change, so check before you count on one.
        </li>
        <li>
          <strong>Lenders make the decision.</strong> Talk with a lender who knows these programs early.
        </li>
      </ul>

      <h2>Steps to Buy a House in Los Angeles</h2>
      <Steps items={STEPS} />

      <h2>Roadblocks and What to Do</h2>
      <Table label="Common roadblocks for Los Angeles buyers" head={["Roadblock", "What to do"]} rows={ROADBLOCKS} />

      <Cta label="See Active Listings" href="/home-search">
        You can buy a house in Los Angeles. The best way to start is to know your budget and see real homes
        in neighborhoods that fit it. See active listings now, or{" "}
        <Link href="/contact">talk with me</Link> about your budget and goals.
      </Cta>

      <h2>Common Questions About Buying in Los Angeles</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling.
          The answers stay plain text so they match the FAQPage schema exactly. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}
    </>
  );
}

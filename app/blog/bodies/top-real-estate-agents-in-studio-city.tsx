import type { ReactNode } from "react";
import Link from "next/link";
import { Cta, Steps } from "./_parts";

/**
 * Body for "Top Real Estate Agents in Studio City, CA (2026 Guide)".
 * Agent details come from public profiles checked on November 27, 2026 and
 * are named in the copy without outbound links, like the other bodies.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do top agents charge more?",
    a: "Not necessarily. Agent compensation is negotiable, and the fee does not predict the result. Compare what you get for the fee, and settle in writing what happens if the other side offers less.",
  },
  {
    q: "Should I hire a Studio City agent or an LA-wide agent?",
    a: "For Studio City property, local knowledge matters most. Ask any agent for sales on your street or one like it. This matters most on hillside lots, where pricing and insurance vary block by block.",
  },
  {
    q: "What is the difference between a Realtor and a real estate agent?",
    a: "Every Realtor is a licensed agent, but not every licensed agent is a Realtor. The term Realtor is a trademark for members of the National Association of Realtors. Check the license either way.",
  },
  {
    q: "Can I switch agents after I sign?",
    a: "It depends on your agreement. Read the termination terms before you sign, and ask the agent or their broker in writing if you need to end it early.",
  },
];

type Agent = { name: string; body: ReactNode[]; best: ReactNode };

const AGENTS: Agent[] = [
  {
    name: "1. Andrew Liberty, Compass",
    body: [
      "I am a Studio City Realtor and a Certified Real Estate Negotiation Expert with Compass (CA DRE# 01965696). My background is in commercial real estate, so I read a home the way an investor does. I check the price against nearby sales, then look at condition, lot, and what the next buyer will pay.",
      "I work with buyers, sellers, and investors across Studio City, the San Fernando Valley, and greater Los Angeles. I am RealTrends Verified and a Los Angeles Magazine Real Estate All-Star. My office is at 12001 Ventura Pl, in the neighborhood I work in every day.",
    ],
    best: (
      <>
        buyers who want the numbers first, sellers who want a net sheet before they list, and investors weighing a
        duplex or small apartment building. <Link href="/team">Meet Andrew</Link> or read my{" "}
        <Link href="/testimonials">client testimonials</Link>.
      </>
    ),
  },
  {
    name: "2. Stefanie Pollack, Compass",
    body: [
      "Stefanie Pollack is a Compass agent who describes herself as a “Realtor and Community Connector” (CA DRE# 01815614). Her Compass profile lists work with buyers and sellers, plus relocation, upsizing and downsizing, starter homes, investment, and off-market properties.",
      "She lives in Studio City, and her Zillow profile lists about 12 years of experience. Recent Studio City sales on that profile run from a condo near $800,000 to a house above $3.6 million. Clients on that profile often mention her local knowledge and responsiveness.",
    ],
    best: "neighbors who want a hands-on local agent, and homeowners planning to downsize or move up.",
  },
  {
    name: "3. Jamie Pearson, Pearson-Cusack Real Estate Group",
    body: [
      "Jamie Pearson was the Studio City branch manager for a Berkshire Hathaway office from 2000 to 2010, according to the team’s profile on Homes.com. The Pearson-Cusack Real Estate Group says it ranks among the top agents in the Berkshire Hathaway network. That ranking is the team’s own claim.",
    ],
    best: "sellers who want an agent with a long history in the neighborhood.",
  },
  {
    name: "4. Gina Michelle and George Ouzounian Team, The Agency",
    body: [
      "RealTrends lists this group as a verified five-agent team at The Agency, serving Calabasas, Studio City, and the San Fernando Valley. A team can give you more hands on a listing, such as showings, paperwork, and marketing.",
    ],
    best: "sellers who want team support, especially on higher-priced homes.",
  },
  {
    name: "5. Levon Arzumanyan and Tatiana, The Agency",
    body: [
      "Levon Arzumanyan and Tatiana work out of The Agency’s Ventura Place office in Studio City. Their FastExpert profile lists 19 years of experience and about $125 million in sales last year, figures the profile reports itself. They list buyer representation and foreclosure work among their specialties.",
    ],
    best: "buyers looking for a Ventura Place agent with experience in distressed and investor-style purchases.",
  },
  {
    name: "6. Andrea Gressinger, Keller Williams",
    body: [
      "Andrea Gressinger’s RealEstateAgents.com profile lists about 20 years of experience and 284 transactions all-time. She says she has been a top producer at Keller Williams since 2006, and she holds the CRS and SRES designations. Her profile also lists 1031 exchange and condo experience.",
    ],
    best: "buyers and sellers who want a veteran agent with experience in condos and tax-deferred exchanges.",
  },
  {
    name: "7. Fong Tidwell, Fong Tidwell Real Estate",
    body: [
      "HomeLight lists 770 home transactions for Fong Tidwell, the highest transaction count I found on its Studio City page. A high count can mean deep experience, but ask how many of those sales were in Studio City and at your price point.",
    ],
    best: "buyers and sellers who want an agent with a large body of past transactions.",
  },
  {
    name: "8. Tracey Pollack, Coldwell Banker Realty",
    body: [
      "Tracey Pollack works from the Coldwell Banker office on Ventura Boulevard in Studio City. Her profile lists over 30 years of sales experience and a luxury property specialty. She is not related to Stefanie Pollack as far as I know, so check the full name when you search online.",
    ],
    best: "luxury buyers and sellers who want a long-tenured agent.",
  },
];

const CHECKS: [string, ReactNode][] = [
  [
    "Check the license.",
    "Use the state’s real estate license lookup. The California Attorney General’s office notes that the state licenses agents, investigates complaints, and disciplines violators.",
  ],
  ["Ask for recent Studio City sales.", "Look for homes in your price range and on streets like yours."],
  ["Read reviews on more than one site.", "Look for details about the process, not just star ratings."],
  [
    "Read the written agreement.",
    <>
      Since August 17, 2024, agents must sign a written agreement with buyers before touring a home. Check the fee,
      the length, and how to end it, as I explain in my{" "}
      <Link href="/blog/can-i-buy-a-house-in-los-angeles">first-time buyer’s guide</Link>.
    </>,
  ],
  ["Meet at least two agents.", "Compare their plans, not just their personalities."],
];

export default function TopRealEstateAgentsInStudioCity() {
  return (
    <>
      <p>
        The top real estate agents in Studio City know the difference between a flat-lot house south of the
        boulevard and a hillside home with a retaining wall. They price from nearby sales, not citywide averages.
        And they tell you the truth when a deal does not work.
      </p>
      <p>
        This guide lists eight Studio City agents and teams, explains how I picked them, and shows how to check
        any agent before you sign. I wrote it on my own site, so I list myself first. The order is not an
        independent ranking.
      </p>

      <h2>How I Chose These Agents</h2>
      <p>
        There is no official list of top agents in Studio City. Directories disagree on the size of the market,
        too. RateMyAgent counts 852 active agents in Studio City, while HomeLight counts 3,465 in a wider area.
      </p>
      <p>
        I looked at four things: a Studio City office or sales history, years in the business, outside
        recognition, and the type of work each agent says they do. I used public profiles, including HomeLight,
        RealEstateAgents.com, and RealTrends. Most figures are self-reported by the agents, so treat them as a
        starting point.
      </p>
      <p>
        I put myself first because this is my site. Stefanie Pollack, a Compass colleague in Studio City, is
        second. Agents three through eight are in no particular order.
      </p>

      <h2>Top Real Estate Agents in Studio City</h2>
      {AGENTS.map((a) => (
        <section key={a.name}>
          <h3>{a.name}</h3>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <strong>Best for:</strong> {a.best}
          </p>
        </section>
      ))}
      <p>
        <em>
          Agent details come from public profiles checked on November 27, 2026. Many figures are self-reported
          and change often, so confirm them directly with any agent you consider.
        </em>
      </p>

      <h2>What Makes a Top Agent in Studio City?</h2>
      <p>A good agent here does five things well.</p>
      <ul>
        <li>
          <strong>Prices block by block.</strong> Studio City is not one market. Homes near Ventura Boulevard, in
          the flats, and on hillside streets sell on different logic, as I explain in my{" "}
          <Link href="/real-estate-agent-in-studio-city">Studio City neighborhood guide</Link>.
        </li>
        <li>
          <strong>Knows your property type.</strong> A hillside home, a condo, and a fourplex each need different
          skills. My guide to{" "}
          <Link href="/blog/property-for-sale-in-studio-city-ca">property for sale in Studio City</Link> shows how
          they differ.
        </li>
        <li>
          <strong>Negotiates beyond price.</strong> Repairs, credits, closing dates, and contingencies all affect
          what you keep. See how this works in my guide to{" "}
          <Link href="/blog/how-to-negotiate-a-house-price-in-los-angeles">
            negotiating a house price in Los Angeles
          </Link>
          .
        </li>
        <li>
          <strong>Has a local team of vendors.</strong> Inspectors, sewer scope specialists, insurance brokers,
          and lenders who know hillside homes can save a deal.
        </li>
        <li>
          <strong>Gives honest advice.</strong> The best agents will tell you to wait, lower your price, or walk
          away when the numbers do not work.
        </li>
      </ul>
      <p>
        The stakes are high. At Zillow’s typical Studio City home value of $1,568,123, a 1% difference in sale
        price is about $15,700.
      </p>

      <h2>How to Check an Agent Before You Hire</h2>
      <p>Take these five steps with any agent, including me.</p>
      <Steps items={CHECKS} />

      <Cta title="Talking to Agents in Studio City?" label="Book a Free Consultation">
        I’m happy to be one of the two you meet. Bring your questions, and I’ll show you recent sales on streets
        like yours.
      </Cta>

      <h2>Questions to Ask Before You Sign</h2>
      <p>These questions work for any Studio City agent.</p>
      <ul>
        <li>How many Studio City sales did you close in the last 12 months, and at what prices?</li>
        <li>Which recent sales would you use to price a home like mine or the one I want?</li>
        <li>Have you handled hillside homes, and who do you use for insurance and inspections?</li>
        <li>Who will I speak with day to day, you or an assistant?</li>
        <li>How do you handle multiple offers?</li>
        <li>What is your fee, and what happens if the seller offers less?</li>
      </ul>
      <p>If an agent cannot answer these in specific terms, keep looking.</p>

      <h2>Frequently Asked Questions</h2>
      {FAQS.map((f) => (
        <section key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}

      <h2>Ready to Meet Top Real Estate Agents in Studio City?</h2>
      <p>
        The right agent is the one who knows your street, your property type, and your budget. Interview at
        least two, check each license, and ask for recent sales before you decide.
      </p>
      <p>
        If you would like to start with me, <Link href="/contact">book a free consultation</Link>. Selling? Get a{" "}
        <Link href="/home-valuation">free home valuation</Link>, or read my guide to{" "}
        <Link href="/blog/selling-a-house-in-los-angeles">selling a house in Los Angeles</Link>.
      </p>
    </>
  );
}

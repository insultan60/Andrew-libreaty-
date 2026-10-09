import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, ExternalLink, Figure, Table } from "./_parts";

/**
 * Body for "Pros and Cons of Renting Vs Buying a House".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * Copy is the supplied draft (Pros and Cons of Renting Vs Buying a House.docx)
 * as written. Its three tables go through Table. blog.css styles h2 and h3
 * only, so the draft's H4s are folded up a step: "Upfront and Exit Costs" and
 * the FAQ questions become h3s. "Your Next Step" was an H3 sitting under the
 * FAQ; it is promoted to h2 because it closes the article, not the FAQ. The
 * draft's bold "When Renting / Buying Makes Sense" lines become h3s, and the
 * reasons under them bold lead-ins.
 *
 * One fix to the copy: the draft's "Buying:" line under Upfront and Exit Costs
 * reads "8,000 to $20,000)." — the start of the sentence was lost. It is
 * rendered as closing costs of $8,000 to $20,000 plus the $80,000 down
 * payment, which is what the numbers fit (2% to 5% of the $400,000 example).
 * Confirm with the writer.
 *
 * Links: the draft's andrewliberty.com links are made internal (/contact,
 * /home-search). Outbound sources (Zillow, the IRS, News 9) go through
 * ExternalLink, so they're nofollow. The "duplex" mention links to the duplex
 * guide, and the Zillow LA County figure links to the same Zillow page the
 * affordable-places post cites. The draft's two "CTA" paragraphs render as
 * Cta panels.
 *
 * Images: the three that ship in the draft, in the draft's positions. The
 * first is the hero (posts.ts); the other two are in-article Figures.
 */

const ZILLOW_RENT_VS_BUY = "https://www.zillow.com/learn/renting-vs-buying-pros-and-cons/";
const IRS_TOPIC_701 = "https://www.irs.gov/taxtopics/tc701";
const NEWS9_SELLING =
  "https://www.news9.com/story/5e350502e0c96e774b36d482/seven-things-you-should-know-when-selling-your-home";
const ZILLOW_LA_COUNTY = "https://www.zillow.com/home-values/3101/los-angeles-county-ca/";

const HIDDEN_COSTS = [
  "Property tax that rises over time",
  "Homeowners insurance",
  "HOA dues, if your home has an HOA",
  "Repairs and upkeep",
  "Closing costs when you buy and selling costs when you leave",
];

/**
 * Rendered twice: as visible copy below, and as FAQPage structured data in
 * app/blog/[slug]/page.tsx. Google requires the two to match, so they read from
 * this one array and the answers stay plain text. The hidden-costs answer is a
 * list in the draft; the schema gets it as one sentence and the page renders
 * the same items as a list (see the FAQ map below).
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is it better to rent or buy a house right now?",
    a: "It depends on your city and your plans. Renting costs less each month in most large cities. Buying can cost less over time if you stay long enough.",
  },
  {
    q: "Is renting throwing money away?",
    a: "No. Rent pays for housing, flexibility, and no repair bills. Owners also spend money they never get back, such as interest, property tax, and upkeep.",
  },
  {
    q: "How long do you have to live in a house for buying to be worth it?",
    a: "Plan on at least five years. Closing costs and selling costs take that long to earn back.",
  },
  {
    q: "How much income do I need to buy a house?",
    a: "A common rule says housing should cost no more than 30% of your income. Lenders also check your debts and credit. Ask a lender for a pre-approval to see your limit.",
  },
  {
    q: "Can I buy a house with a small down payment?",
    a: "Yes. Some loans allow 3% to 3.5% down. A smaller down payment means a bigger loan and a higher monthly cost.",
  },
  {
    q: "What are the hidden costs of owning a home?",
    a: HIDDEN_COSTS.join("; ") + ".",
  },
  {
    q: "Is it smart to rent now and buy later?",
    a: "Yes, if you save a set amount each month and pick a target date. Build your down payment, emergency fund, and credit first.",
  },
  {
    q: "Can renting build wealth?",
    a: "Yes, if you invest the money you save. Many renters do not follow through, so set up automatic savings from day one.",
  },
  {
    q: "What happens if home prices fall after I buy?",
    a: "You may owe more than the home is worth if you put little down and must sell early. Staying longer gives prices time to recover.",
  },
];

const SIDE_BY_SIDE: ReactNode[][] = [
  ["Upfront cost", "Low: first month and a deposit", "High: down payment and closing costs"],
  ["Monthly cost", "Rent, which can rise", "Loan, tax, insurance, and upkeep"],
  ["Equity", "None", "Grows as you pay the loan"],
  ["Repairs", "The landlord pays", "You pay"],
  ["Moving", "Easy at the end of a lease", "Slow and costly"],
  ["Payment stability", "Rent can rise each year", "A fixed-rate loan payment stays the same"],
  ["Control", "Limited", "Full"],
  ["Main risk", "Rent hikes or a landlord who sells", "Falling prices and repair bills"],
];

const MONTHLY: ReactNode[][] = [
  ["Loan payment", "$2,023", "n/a"],
  ["Property tax (1.25% a year)", "$417", "n/a"],
  ["Home insurance", "$125", "n/a"],
  ["Upkeep (1% of price a year)", "$333", "n/a"],
  ["Rent", "n/a", "$2,400"],
  [<strong key="t">Total per month</strong>, <strong key="b">About $2,898</strong>, <strong key="r">$2,400</strong>],
];

const FIVE_QUESTIONS: ReactNode[][] = [
  ["How long will you stay?", "Five years or more", "Under three years"],
  ["How much have you saved?", "You have a down payment plus 3 to 6 months of expenses", "You have little cash saved"],
  ["How steady is your income?", "Stable job and income", "A job change is likely"],
  ["Can you afford it?", "Housing costs 30% of your income or less", "Housing would cost more than 30%"],
  ["What do you value most?", "Control and long-term stability", "Flexibility and low upkeep"],
];

export default function ProsAndConsOfRentingVsBuyingAHouse() {
  return (
    <>
      <p>
        Buy a house if you plan to stay at least five years, have steady income, and can pay the
        upfront costs and repairs. Rent if you may move soon, want to keep your cash free, or could
        not pay for a surprise repair.
      </p>
      <p>
        Renting costs less each month in most large U.S. cities, according to{" "}
        <ExternalLink href={ZILLOW_RENT_VS_BUY}>Zillow&rsquo;s 2025 analysis</ExternalLink>. Buying
        often costs less over many years, because you build equity. This guide shows the pros and
        cons, a real cost example, and five questions that point you to your answer.
      </p>
      <p>
        <strong>Key terms:</strong>
      </p>
      <ul>
        <li>
          <strong>Equity</strong>{" "}
          is the part of your home you own. It equals the home&rsquo;s value minus what you still
          owe.
        </li>
        <li>
          <strong>Down payment</strong> is the cash you pay upfront when you buy.
        </li>
        <li>
          <strong>Closing costs</strong> are the fees you pay to finish a home purchase.
        </li>
        <li>
          <strong>Breakeven</strong> is the point when buying costs the same as renting.
        </li>
      </ul>

      <h2>Renting vs Buying</h2>
      <p>Renting costs less upfront. Buying builds equity.</p>
      <Table
        label="Renting vs buying, side by side"
        head={["Factor", "Renting", "Buying"]}
        rows={SIDE_BY_SIDE}
      />

      <h2>Pros and Cons of Renting</h2>
      <p>Renting gives you flexibility but no ownership.</p>

      <h3>Pros of Renting</h3>
      <ul>
        <li>
          <strong>Low entry cost.</strong> You skip the down payment and closing costs.
        </li>
        <li>
          <strong>No repair bills.</strong> The landlord fixes the roof, plumbing, and appliances.
        </li>
        <li>
          <strong>Easy moves.</strong> You can leave when your lease ends.
        </li>
        <li>
          <strong>More cash for other goals.</strong> You can build savings or invest your money.
        </li>
        <li>
          <strong>No price risk.</strong> Falling home prices do not hurt you.
        </li>
      </ul>

      <h3>Cons of Renting</h3>
      <ul>
        <li>
          <strong>No equity.</strong> Your rent does not build ownership.
        </li>
        <li>
          <strong>Rent can rise.</strong> A higher price at renewal can break your budget.
        </li>
        <li>
          <strong>Less security.</strong> A landlord can sell the home or end your lease.
        </li>
        <li>
          <strong>Less control.</strong> You cannot make big changes without approval.
        </li>
        <li>
          <strong>No home tax breaks.</strong> Renters do not get mortgage interest or property tax
          deductions.
        </li>
      </ul>

      <h2>Pros and Cons of Buying</h2>
      <p>Buying gives you ownership and control but costs more upfront.</p>

      <h3>Pros of Buying</h3>
      <ul>
        <li>
          <strong>Equity grows.</strong> Each loan payment raises the share of the home you own.
        </li>
        <li>
          <strong>Steady loan payment.</strong> With a fixed-rate loan, your loan payment stays the
          same. Tax and insurance can still rise.
        </li>
        <li>
          <strong>Control.</strong> You choose the paint, the upgrades, and how long you stay.
        </li>
        <li>
          <strong>A tax break when you sell.</strong> You may exclude up to $250,000 of gain, or
          $500,000 for married couples filing jointly, if you owned and lived in the home for at
          least two of the last five years. See the{" "}
          <ExternalLink href={IRS_TOPIC_701}>IRS rules on selling your home</ExternalLink>.
        </li>
        <li>
          <strong>Rental income option.</strong> You can rent a spare room or a second unit to help
          pay the loan.
        </li>
      </ul>

      <h3>Cons of Buying</h3>
      <ul>
        <li>
          <strong>High upfront cost.</strong> You pay a down payment and closing costs before you
          move in.
        </li>
        <li>
          <strong>Repairs are your job.</strong> Zillow cites about $6,400 a year in typical upkeep,
          based on Thumbtack data.
        </li>
        <li>
          <strong>Costs can rise.</strong> Property tax, insurance, and HOA dues often go up.
        </li>
        <li>
          <strong>Selling costs a lot.</strong> Selling costs often run 6% to 10% of the sale price,
          mostly agent fees.
        </li>
        <li>
          <strong>No tax deduction for a loss.</strong>{" "}
          <ExternalLink href={NEWS9_SELLING}>You cannot deduct a loss</ExternalLink> from selling
          your main home.
        </li>
        <li>
          <strong>Price risk.</strong> If prices fall and you must sell early, you could owe more
          than the home is worth.
        </li>
      </ul>

      <h2>What Buying Really Costs: A Worked Example</h2>
      <p>
        A $400,000 home costs about $500 more per month than a similar rental in this example. The
        rate and rent below are examples, not quotes.
      </p>
      <p>
        <strong>Example assumptions</strong>
      </p>
      <ul>
        <li>Home price: $400,000</li>
        <li>Down payment: $80,000 (20%)</li>
        <li>Loan: $320,000 at 6.5% for 30 years</li>
        <li>Rent for a similar home: $2,400 a month</li>
      </ul>

      <h3>Monthly Cost</h3>
      <Table
        label="Monthly cost of buying vs renting, worked example"
        head={["Cost", "Buying", "Renting"]}
        rows={MONTHLY}
      />
      <p>
        <strong>What this means:</strong>
      </p>
      <ul>
        <li>
          <strong>Buying costs more each month.</strong> The difference is about $500.
        </li>
        <li>
          <strong>Part of the buyer&rsquo;s payment builds equity.</strong> About $300 a month goes
          toward the loan balance in year one.
        </li>
        <li>
          <strong>The renter keeps the down payment.</strong> The renter can save or invest that
          $80,000.
        </li>
      </ul>

      <h3>Upfront and Exit Costs</h3>
      <ul>
        <li>
          <strong>Buying:</strong> Closing costs of about $8,000 to $20,000, plus the $80,000 down
          payment.
        </li>
        <li>
          <strong>Renting:</strong> The first month and a deposit, often about two months of rent.
        </li>
        <li>
          <strong>Selling later:</strong> 6% to 10% of the price, or $24,000 to $40,000.
        </li>
      </ul>

      <Figure
        src="/images/blog/renting-vs-buying-working-out-the-numbers.webp"
        alt="Two people at a kitchen table comparing housing costs with a calculator, a notebook and a spreadsheet on a laptop, with a house key beside a printed listing"
        width={1200}
        height={800}
      />

      <h3>How Long Until Buying Beats Renting?</h3>
      <p>
        Plan to stay at least five years. In one{" "}
        <ExternalLink href={ZILLOW_RENT_VS_BUY}>2025 Zillow example</ExternalLink>, breakeven came
        at about five years and four months. The average homeowner stays about 13 years. Your own
        breakeven depends on home price growth, rent growth, and your loan rate.
      </p>

      <h3>How to Compare Your Own Numbers</h3>
      <ul>
        <li>
          <strong>Add your monthly owning costs.</strong> Include the loan, tax, insurance, HOA dues,
          and upkeep.
        </li>
        <li>
          <strong>Compare that total to your rent.</strong>
        </li>
        <li>
          <strong>Spread the one-time costs.</strong> Divide closing and selling costs by the years
          you plan to stay.
        </li>
        <li>
          <strong>Add the equity you build</strong> and the money your down payment could earn if
          you invested it.
        </li>
      </ul>

      <Cta title="Want a Faster Answer?" label="Contact Andrew" href="/contact">
        Ask Andrew Liberty for a free rent-versus-buy comparison. Share your rent, savings, and
        plans.
      </Cta>

      <h2>Rent or Buy? Answer These Five Questions</h2>
      <p>Your answers to five questions show which choice fits you.</p>
      <Table
        label="Five questions to decide between renting and buying"
        head={["Question", "Lean toward buying if...", "Lean toward renting if..."]}
        rows={FIVE_QUESTIONS}
      />

      <h3>When Renting Makes Sense</h3>
      <p>Renting fits people with short plans or tight savings.</p>
      <p>
        <strong>You may move within three years.</strong> Selling soon costs too much. Renting
        avoids those fees.
      </p>
      <p>
        <strong>Your income is uncertain.</strong> A flexible lease protects you if your job
        changes.
      </p>
      <p>
        <strong>You have little cash saved.</strong> A down payment with no emergency fund leaves
        you exposed to repair bills.
      </p>

      <h3>When Buying Makes Sense</h3>
      <p>Buying fits people with long plans and steady money.</p>
      <p>
        <strong>You plan to stay five years or more.</strong> Time builds equity and spreads out
        your one-time costs.
      </p>
      <p>
        <strong>You want steady housing costs.</strong> A fixed-rate loan keeps your payment the
        same while rents climb.
      </p>
      <p>
        <strong>You can use the space for income.</strong> A{" "}
        <Link href="/blog/how-to-buy-a-duplex-in-los-angeles">duplex</Link> or a spare unit can help
        pay the loan.
      </p>

      <Figure
        src="/images/blog/renting-vs-buying-two-paths.webp"
        alt="A road splitting in two at sunset, one way lined with apartment buildings and the other with single-family houses"
        width={1200}
        height={800}
      />

      <Cta title="Ready to See What Your Budget Buys?" label="Browse Homes for Sale" href="/home-search">
        Browse homes for sale in Los Angeles and filter by price, bedrooms, and property type.{" "}
        <ExternalLink href={ZILLOW_LA_COUNTY}>Zillow</ExternalLink> puts the typical Los Angeles
        County home value near $873,000, so real listings help you test your numbers.
      </Cta>

      <h2>Frequently Asked Questions</h2>
      {/* Fragment, not a wrapper div: `.ar-body .ar-narrow > p` is a direct-child
          selector, so a wrapper would strip the answers of their body styling.
          The hidden-costs answer is a list in the draft, so it renders as one
          here; FAQS carries the same items as a sentence for the schema. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          {item.q === "What are the hidden costs of owning a home?" ? (
            <ul>
              {HIDDEN_COSTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : (
            <p>{item.a}</p>
          )}
        </Fragment>
      ))}

      <h2>Your Next Step</h2>
      <p>
        Start with three numbers: your monthly budget, your savings, and how long you plan to stay.
        Those three answers point you toward renting or buying.
      </p>
      <p>
        If you are still unsure, <Link href="/contact">talk with Andrew Liberty</Link> for a free,
        no-pressure review of your numbers. If you are ready to look,{" "}
        <Link href="/home-search">search homes for sale in Los Angeles</Link> and compare real prices
        to your rent.
      </p>
    </>
  );
}

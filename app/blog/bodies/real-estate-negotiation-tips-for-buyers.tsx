import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, Steps, Table } from "./_parts";

/**
 * Body for "Real Estate Negotiation Tips for Buyers: Making Offers in Los
 * Angeles". Rendered as direct children of `.ar-narrow`, like the other bodies.
 *
 * Sources (C.A.R., Freddie Mac, LA County market data) are named in the copy as
 * supplied, without outbound links. Hero reuses the negotiation artwork from
 * the house-price post.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is it rude to offer below asking in Los Angeles?",
    a: "No, as long as the offer is backed by data. Offering below asking is normal when a home has been sitting or the comps support a lower number. Send the comps with your offer so the seller sees a reason, not a guess.",
  },
  {
    q: "Can I negotiate on a home that has multiple offers?",
    a: "Yes, but the negotiating moves to terms. Ask the listing agent what the seller cares about most, then make your offer stronger in those areas. A seller with several offers often counters the cleanest one, not the highest one.",
  },
  {
    q: "Can I withdraw my offer after making it?",
    a: "Generally yes, until the seller’s acceptance is delivered to you. Do it in writing through your agent. C.A.R. has a Withdrawal of Offer form for this.",
  },
  {
    q: "Do I need a pre-approval or just a pre-qualification?",
    a: "Get a pre-approval. The California purchase agreement lets you show whether you have a pre-qualification, a pre-approval or a fully underwritten pre-approval, and listing agents notice the difference. The stronger the approval, the stronger the offer.",
  },
  {
    q: "Should I offer over asking in Los Angeles right now?",
    a: "Only when the comps and the competition support it. LA County houses sold slightly below their original list price on average in October 2026, but well-priced homes in high-demand pockets can still go over. Look at the specific home, not the headline average.",
  },
  {
    q: "How much should my deposit be?",
    a: "Around 3% of the price is common in Los Angeles. A larger deposit can strengthen your offer. Know what puts it at risk before you remove contingencies.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  ["How fast are LA homes selling?", "LA County single-family homes averaged 38 days on market in October 2026. Condos and townhomes averaged 53"],
  ["How close to asking do they sell?", "Houses averaged about 97.8% of original list price. Condos averaged about 95.7%"],
  ["How long does the seller have to respond?", "Under the standard C.A.R. contract, your offer expires at 5 PM on the third day after you sign, unless you set a different time"],
  ["How long are the contingency periods?", "17 days by default for the loan, appraisal and investigation contingencies. Each one is a fill-in you can change"],
  ["Which forms are used to counter?", "Seller Counter Offer (SCO), Buyer Counter Offer (BCO) and Seller Multiple Counter Offer (SMCO)"],
  ["Does a counteroffer cancel the original offer?", "Yes. A counter is a rejection of the offer it answers"],
  ["What is a typical deposit?", "Around 3% of the price is common in Los Angeles"],
  ["Current 30-year fixed rate", "7.28% (Freddie Mac weekly average, November 19, 2026)"],
];

const QUICK_STEPS: [string, ReactNode][] = [
  ["Read the market for that home.", "Citywide averages hide big differences between streets and property types."],
  ["Get a full pre-approval before you shop.", "It is the first thing a listing agent checks."],
  ["Price your offer from comps and days on market.", "The asking price is the seller’s opinion, not the market’s."],
  ["Build the whole package.", "Deposit, timing and contingencies can beat a higher price."],
  ["Shorten contingencies before you waive them.", "Speed impresses sellers. Blind risk hurts buyers."],
  ["Treat every counteroffer as a new negotiation.", "Your original offer is gone once the seller counters."],
  ["Set your walk-away number before a bidding war.", "Decide it at your kitchen table, not at 9 PM on offer day."],
  ["Know when to let a home go.", "The right home is the one that still makes sense after closing."],
];

const BELOW_ASKING: ReactNode[][] = [
  ["New listing, priced right, heavy showings", "Competition is likely", "At asking or above. Win on terms"],
  ["Priced in line with comps, 2 to 4 weeks listed", "Normal negotiation", "0% to 3% below asking"],
  ["45+ days listed, or a price cut already", "Seller is motivated", "3% to 7% below, supported by comps"],
  ["Overpriced compared with recent sales", "Price is the problem", "At the value the comps support"],
  ["Needs major work", "Price may not reflect condition", "Below asking by the cost of the work, backed by quotes"],
  ["Condo with longer days on market", "More inventory, more room", "3% to 5% below, after an HOA review"],
];

const EXAMPLE: ReactNode[][] = [
  ["Offer", "Buyer", "$1,310,000", "3% deposit, 17-day contingencies, 30-day close. Comps attached"],
  ["Counter (SCO)", "Seller", "$1,375,000", "Same terms"],
  ["Counter (BCO)", "Buyer", "$1,345,000", "Investigation shortened to 12 days, 21-day close"],
  ["Agreement", "Both", "$1,350,000", "Buyer’s shorter timeline accepted"],
];

const OFFER_TERMS: ReactNode[][] = [
  ["Purchase price", "What you will pay", "Back it with comps"],
  ["Deposit (earnest money)", "Money into escrow within days of acceptance", "A larger deposit signals commitment"],
  ["Financing", "Loan type and down payment", "More down usually reads as stronger"],
  ["Contingencies", "Your rights to cancel for loan, appraisal and investigation", "Shorter periods read as stronger"],
  ["Close of escrow", "How many days until you own it", "Match the seller’s timing if you can"],
  ["Possession and rent-back", "When the seller moves out", "A short free rent-back can be worth thousands to a seller"],
  ["Seller credits", "Money toward your closing costs", "Often better asked for after inspection"],
  ["Expiration", "How long the seller has to respond", "Short enough to keep momentum"],
];

const ORDER_STEPS: [string, ReactNode][] = [
  ["Get pre-approved.", "Ask your lender for a full pre-approval, not a quick pre-qualification."],
  ["Pull the comps.", "Recent sales, pending sales and active competition."],
  ["Talk to the listing agent.", "Ask what matters to the seller: price, timing, certainty or a rent-back."],
  ["Set the terms.", "Price, deposit, contingency periods and close date."],
  ["Send the offer with support.", "Pre-approval letter, proof of funds and comps if you are offering below asking."],
  ["Set a response time.", "Then wait, and do not bid against yourself."],
];

const COMPETITIVE: ReactNode[][] = [
  ["Price", "Far below comps with no support", "At or near comp value, with data"],
  ["Financing", "Pre-qualification letter", "Full pre-approval, lender reachable by phone"],
  ["Down payment", "Minimum down", "More down, or cash"],
  ["Deposit", "1%", "Around 3%"],
  ["Contingencies", "17 days on everything", "Shorter periods you can actually meet"],
  ["Timing", "Your schedule only", "The seller’s preferred close date"],
  ["Extras", "Long list of addenda", "Short, clean offer"],
];

const CONTINGENCIES: ReactNode[][] = [
  ["Investigation", "17 days", "The home’s physical condition", "Shorten it. Rarely waive it"],
  ["Loan", "17 days", "Your financing coming through", "Shorten if your lender is confident"],
  ["Appraisal", "17 days", "The home appraising at the price", "Consider covering a set gap instead"],
  ["Seller documents and title", "17 days, or 5 days after delivery", "Disclosures, HOA documents and the title report", "Keep it"],
  ["Sale of your current home", "Only if added", "Your ability to sell first", "Weakens most LA offers"],
];

const APPRAISAL_GAP: ReactNode[][] = [
  ["Appraised value", "$1,240,000", "$1,200,000"],
  ["Loan (80% of the lower number)", "$992,000", "$960,000"],
  ["Cash for down payment", "$248,000", "$280,000"],
  ["Extra cash you need", "None", "$32,000"],
];

export default function RealEstateNegotiationTipsForBuyers() {
  return (
    <>
      <p>
        The best real estate negotiation tips for buyers start before the inspection, before the
        counteroffer, and before you fall in love with a kitchen. In Los Angeles, most of your leverage is
        set by the offer you write.
      </p>
      <p>
        This guide covers how much to offer below asking, how to make an offer on a house in LA, how to write
        a competitive offer, how counteroffers work in California, which contingencies to keep, and how to
        win a bidding war without overpaying. I work mostly in Studio City, Sherman Oaks, Laurel Canyon and
        the Hollywood Hills, so I point out where those markets behave differently.
      </p>
      <p>
        As a Certified Real Estate Negotiation Expert, I treat an offer as a package. Price is one lever. It
        is rarely the only one.
      </p>

      <h2>Quick Facts: Negotiating an Offer in Los Angeles</h2>
      <p>
        Figures are current as of November 2026. Market data shifts monthly, and contract terms can vary by
        form version, so confirm yours with your agent.
      </p>
      <Table label="Quick facts" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>Real Estate Negotiation Tips for Buyers: The Quick Version</h2>
      <p>Here are the eight moves that matter most. Each gets its own section below.</p>
      <Steps items={QUICK_STEPS} />

      <h2>Read the Market Before You Write the Offer</h2>
      <p>
        Your negotiating room comes from the market, not from how hard you push. Before I write any offer, I
        look at three numbers for that specific home and its comps.
      </p>

      <h3>What Sale-to-List and Days on Market Tell You</h3>
      <ul>
        <li>
          <strong>Sale-to-list ratio</strong> is the sale price divided by the list price. At 100%, homes sell
          at asking. Above 100%, buyers are competing. Below 100%, sellers are giving ground.
        </li>
        <li>
          <strong>Days on market</strong> tells you how much the seller needs you. A home in its first week
          has options. A home in its seventh week is wondering what went wrong.
        </li>
        <li>
          <strong>Price history</strong> shows whether the seller has already cut. One reduction often means
          the seller is listening. Two means they are motivated.
        </li>
      </ul>

      <h3>Houses vs Condos: Two Different LA Markets</h3>
      <p>
        In October 2026, LA County houses sold in 38 days on average at about 97.8% of their original price.
        Condos and townhomes took 53 days and sold at about 95.7%.
      </p>
      <p>
        That gap matters. A condo buyer usually has more room to negotiate than a house buyer in the same
        neighborhood. Condo buyers also have more to review, including HOA documents, reserves and any special
        assessments. My guide to{" "}
        <Link href="/blog/buying-a-condo-in-los-angeles">buying a condo in Los Angeles</Link> walks through
        each one.
      </p>

      <h3>What I See in Studio City, Sherman Oaks and the Hills</h3>
      <p>Countywide averages blend very different markets. On the ground, I see three patterns.</p>
      <ul>
        <li>
          <strong>Flat-street Valley homes priced right draw the most competition.</strong> In Studio City and
          Sherman Oaks, a well-presented home on a flat lot can still get multiple offers in the first week.
        </li>
        <li>
          <strong>Hillside homes usually give buyers more time.</strong> Geology, drainage, access and
          insurance questions slow some buyers down, which can open room on price and terms.
        </li>
        <li>
          <strong>Overpriced listings sit, in any neighborhood.</strong> If a home has been listed for six
          weeks while its comps sold in two, the price is the problem, and the seller usually knows it.
        </li>
      </ul>
      <p>
        For a side-by-side look at two of these markets, see my guide to{" "}
        <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs Sherman Oaks</Link>.
      </p>

      <h2>How Much to Offer Below Asking</h2>
      <p>
        There is no fixed percentage. The right offer comes from what similar homes sold for and how long this
        one has been sitting. A percentage rule you read online ignores both.
      </p>
      <p>Use this table as a starting point, not a rule.</p>
      <Table
        label="Where offers often start"
        head={["Situation", "What it usually signals", "Where offers often start"]}
        rows={BELOW_ASKING}
      />

      <h3>When an Offer Below Asking Works</h3>
      <p>
        A lower offer lands best when it comes with reasons. Send the comps that support your number, and keep
        the rest of your terms clean. A seller can reject a low price. It is harder to dismiss a low price
        backed by data, a solid pre-approval and a short close.
      </p>

      <h3>When It Backfires</h3>
      <p>
        On a fresh, well-priced listing, a low offer usually just loses. The seller counters someone else, or
        ignores you. It can also set a cold tone that follows you through escrow. If the comps say the home is
        priced right, offer close to asking and negotiate on terms instead.
      </p>

      <h3>A Worked Example</h3>
      <p>This is an illustration, not a real listing.</p>
      <p>
        A Sherman Oaks home is listed at $1,395,000. It has been on the market 62 days with no price cut.
        Three recent sales nearby, adjusted for size and condition, point to about $1,340,000.
      </p>
      <Table label="Worked negotiation example" head={["Round", "Who", "Price", "Key terms"]} rows={EXAMPLE} />
      <p>
        The buyer lands about 3.2% below asking, close to what the comps supported. That $45,000 is not small.
        At 20% down and a 7.28% rate, it saves roughly $250 a month in principal and interest, plus about $45 a
        month in property tax, for as long as you own the home.
      </p>
      <p>
        To build an offer from adjusted comps step by step, read my guide to{" "}
        <Link href="/blog/how-to-negotiate-a-house-price-in-los-angeles">negotiating a house price in Los Angeles</Link>.
      </p>

      <h2>How to Make an Offer on a House in LA</h2>
      <p>
        In California, your offer is usually written on the C.A.R. Residential Purchase Agreement (RPA). Your
        agent prepares it, but you decide every term in it.
      </p>

      <h3>What Goes Into a California Offer</h3>
      <Table
        label="What goes into a California offer"
        head={["Term", "What it means", "Negotiating angle"]}
        rows={OFFER_TERMS}
      />

      <h3>The Order of Operations</h3>
      <Steps items={ORDER_STEPS} />

      <h3>How Long the Seller Has to Respond</h3>
      <p>
        Under the standard C.A.R. contract, your offer expires at 5 PM on the third day after you sign it,
        unless you choose another date. You can shorten that. A shorter window can push a seller to decide
        before more offers arrive.
      </p>
      <p>
        The full buying process, from deposits to escrow, is in my guide to{" "}
        <Link href="/blog/how-to-buy-a-house-in-los-angeles">buying a house in Los Angeles</Link>.
      </p>

      <h2>How to Write a Competitive Offer</h2>
      <p>
        Most buyers focus on the price. Most sellers look at the whole offer. When two offers are close on
        price, the seller usually picks the one most likely to close on time.
      </p>
      <Table
        label="Weaker vs stronger offer"
        head={["What sellers compare", "Weaker offer", "Stronger offer"]}
        rows={COMPETITIVE}
      />
      <p>A few moves I use often:</p>
      <ul>
        <li>
          <strong>Have your lender call the listing agent.</strong> A two-minute call from a lender who knows
          your file is worth more than a letter.
        </li>
        <li>
          <strong>Ask about the seller’s timing first.</strong> Some sellers need a quick close. Others need 60
          days to find their next home.
        </li>
        <li>
          <strong>Offer a short rent-back.</strong> If the seller needs time to move, a few free days after
          closing can tip the decision.
        </li>
        <li>
          <strong>Keep it clean.</strong> Every extra request is one more thing the seller has to say yes to.
        </li>
      </ul>

      <h3>Should You Write a Buyer Letter?</h3>
      <p>
        I usually advise against it. Personal letters can reveal details about you that raise fair housing
        concerns, and some listing agents will not present them. Let your terms do the talking.
      </p>

      <Cta title="Found a Home You Want to Offer On?" label="Book a Free Consultation">
        Send me the listing. I’ll pull the comps and show you what a competitive offer looks like for that
        street.
      </Cta>

      <h2>Contingencies: Which to Keep, Shorten or Waive</h2>
      <p>
        Contingencies are your exits. Each one lets you cancel and keep your deposit if something specific goes
        wrong. Sellers like offers with fewer of them, so this is where buyers feel the most pressure.
      </p>
      <Table
        label="Contingencies"
        head={["Contingency", "Default period", "What it protects", "My usual take"]}
        rows={CONTINGENCIES}
      />

      <h3>Shorten Before You Waive</h3>
      <p>
        A 10-day investigation period tells the seller you are serious. Waiving it entirely means you buy the
        home’s problems sight unseen. In most deals, a short contingency gives you 80% of the competitive
        benefit with a fraction of the risk.
      </p>
      <p>Book your inspector before you write the offer. A shorter window is only safe if you can meet it.</p>

      <h3>Covering an Appraisal Gap</h3>
      <p>
        If the appraisal comes in low, your lender lends on the lower number, and you cover the difference in
        cash. Instead of waiving the appraisal contingency, you can offer to cover a set amount.
      </p>
      <p>Here is how that works on a $1,240,000 purchase with 20% down. This is an illustration.</p>
      <Table
        label="Appraisal gap example"
        head={["", "Appraises at price", "Appraises $40,000 low"]}
        rows={APPRAISAL_GAP}
      />
      <p>Only offer to cover a gap you can pay without draining your reserves.</p>

      <h3>What Waiving Really Costs You</h3>
      <p>
        Once a contingency is removed, backing out over that issue can cost you your deposit. On a $1,240,000
        home, a 3% deposit is $37,200. Waive only when you understand exactly what you are giving up.
      </p>
      <p>
        After you are in contract, the investigation period becomes its own negotiation. I cover it in my guide
        to{" "}
        <Link href="/blog/how-to-negotiate-after-home-inspection-in-california">
          negotiating after a home inspection in California
        </Link>
        .
      </p>

      <h2>Counteroffers in California: How They Work</h2>
      <p>
        Counteroffers are where most LA deals get made. They also trip up more buyers than anything else in
        the offer stage.
      </p>

      <h3>Seller Counter Offer (SCO) vs Buyer Counter Offer (BCO)</h3>
      <p>
        A seller who wants to change your offer responds on a Seller Counter Offer. If you want to change their
        counter, you respond on a Buyer Counter Offer. Each round lists only the terms that change. Everything
        else stays as written in the original offer.
      </p>

      <h3>Multiple Counter Offers: Why a Counter Doesn’t Mean You Won</h3>
      <p>
        A seller with several offers can send a Seller Multiple Counter Offer (SMCO) to more than one buyer at
        once. The form protects the seller from accidentally selling the home twice. If you receive one,
        assume other buyers did too. Your signature on it is not the final word. The seller still has to sign
        again after you accept.
      </p>

      <h3>A Counteroffer Rejects the Original Offer</h3>
      <p>
        This is the part most buyers miss. Once you counter a seller’s counter, the seller’s counter is gone.
        You cannot go back and accept it later if they say no to yours.
      </p>
      <p>
        So before you counter, ask yourself one question: if the seller refuses this, would I have taken their
        last number? If yes, consider accepting it now.
      </p>

      <h3>How to Respond</h3>
      <ul>
        <li>
          <strong>Accept</strong> when the counter is within your range and the home fits.
        </li>
        <li>
          <strong>Counter back</strong> when you are close. Trade terms for price, such as a shorter
          contingency for a lower number.
        </li>
        <li>
          <strong>Walk away</strong> when the gap is about value, not negotiation.
        </li>
      </ul>
      <p>
        Keep your response window short, and keep each counter focused on one or two terms. Long counters
        invite long counters back.
      </p>

      <h2>How to Win a Bidding War in LA</h2>
      <p>
        A bidding war is not only a price contest. The buyer with the most certain, cleanest offer often wins,
        even when someone else offered more.
      </p>

      <h3>Set Your Walk-Away Number First</h3>
      <p>
        Before offer day, decide the most you will pay for this home. Base it on the comps, your monthly budget
        and how long you plan to stay. Write it down. When the pressure hits, that number is your guardrail.
      </p>

      <h3>Escalation Clauses: How They Work and the Risks</h3>
      <p>
        An escalation clause automatically raises your price above competing offers, up to a cap. It can
        create a binding contract when drafted properly, but C.A.R. advises buyers to have their own attorney
        review the language first.
      </p>
      <p>Here is the math. This is an illustration.</p>
      <ul>
        <li>Your offer: $1,200,000</li>
        <li>Escalation: $5,000 above the highest competing offer</li>
        <li>Cap: $1,260,000</li>
        <li>Best competing offer: $1,235,000</li>
        <li>
          <strong>Your new price: $1,240,000</strong>
        </li>
      </ul>
      <p>
        The risk is that the seller sees your cap, which tells them exactly how far you will go. Many LA
        listing agents also prefer a straight “best and final” round. Ask the listing agent before you use one.
      </p>

      <h3>“Best and Final” Rounds</h3>
      <p>
        When the seller asks for highest and best offers, give your real number. There may not be another
        round. Tighten your terms at the same time: shorter contingencies, a larger deposit and the seller’s
        preferred close date.
      </p>

      <h3>Win on Terms, Not Just Price</h3>
      <p>If you are near your limit on price, compete on terms:</p>
      <ul>
        <li>
          <strong>Certainty:</strong> full pre-approval, more down, or proof of cash
        </li>
        <li>
          <strong>Speed:</strong> shorter contingencies and a quick close
        </li>
        <li>
          <strong>Flexibility:</strong> a rent-back, or the seller’s preferred close date
        </li>
        <li>
          <strong>Appraisal protection for the seller:</strong> cover a set appraisal gap
        </li>
      </ul>

      <h3>When to Let It Go</h3>
      <p>
        Some bidding wars end above what the home is worth to you. That is not a loss. The buyers who do best
        over time are the ones who walk away from deals that stop making sense.
      </p>
      <p>
        If you are weighing smaller homes or income property to make the numbers work, my guide to{" "}
        <Link href="/blog/house-hacking-in-los-angeles">house hacking in Los Angeles</Link> shows how a duplex
        can offset your payment.
      </p>

      <h2>Negotiation Mistakes Buyers Make at the Offer Stage</h2>
      <ul>
        <li>
          <strong>Lowballing a fresh, well-priced listing.</strong> You lose the home and the seller’s goodwill.
        </li>
        <li>
          <strong>Sending a pre-qualification instead of a pre-approval.</strong> It tells the seller you are
          not ready.
        </li>
        <li>
          <strong>Waiving contingencies you do not understand.</strong> Your deposit is on the line.
        </li>
        <li>
          <strong>Countering a counter you would have accepted.</strong> That counter disappears the moment you
          respond.
        </li>
        <li>
          <strong>Bidding past your walk-away number.</strong> The adrenaline wears off. The payment does not.
        </li>
        <li>
          <strong>Ignoring expiration times.</strong> A late acceptance may not be binding.
        </li>
        <li>
          <strong>Sending a long list of extras.</strong> Each one gives the seller a reason to pick someone
          else.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      {/* Plain-text answers so they match the FAQPage schema exactly. */}
      {FAQS.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}

      <h2>Conclusion</h2>
      <p>
        The best real estate negotiation tips for buyers come down to preparation. Read the market for that
        specific home, price your offer from comps, build the whole package, and know your walk-away number
        before you need it. In Los Angeles, the buyer with the clearest plan usually gets the better deal, even
        when they are not the highest bidder.
      </p>
      <p>
        If you have found a home and want a second opinion on your offer, let’s talk it through.{" "}
        <Link href="/contact">Book a free consultation</Link>, or{" "}
        <Link href="/home-search">start your home search</Link> if you are still looking. You can also explore
        the neighborhoods I know best, including{" "}
        <Link href="/real-estate-agent-in-studio-city">Studio City</Link>,{" "}
        <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link>,{" "}
        <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and the{" "}
        <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link>.
      </p>
    </>
  );
}

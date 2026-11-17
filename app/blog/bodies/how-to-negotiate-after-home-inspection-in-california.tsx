import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, Steps, Table } from "./_parts";

/**
 * Body for "How to Negotiate After a Home Inspection in California".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies (see the
 * note in how-to-negotiate-a-house-price-in-los-angeles.tsx).
 *
 * Sources (C.A.R., Freddie Mac, lender concession limits) are named in the copy
 * as supplied, without outbound links: the draft's citation tags carried no
 * URLs.
 *
 * Hero: a model house held in an open hand, from the valuation artwork already
 * on the site, cropped to 16:10.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I still negotiate if I waived my inspection contingency?",
    a: "You can still ask, but you have lost your leverage. Without a contingency, you cannot cancel over what the inspector finds, so the seller has little reason to agree. Talk to your agent right away about what disclosures the seller provided and whether anything was left out.",
  },
  {
    q: "Should I ask for a home warranty instead of repairs?",
    a: "It can work as a fallback. If a seller will not make repairs, cut the price or give a credit, they may buy a home warranty policy for you. Read the exclusions first, because warranties often do not cover problems that existed before the policy started.",
  },
  {
    q: "What if the appraisal comes in low after we agree on repairs?",
    a: "The lender will not lend more than the appraised value. You can ask the seller to lower the price, cover the gap, or challenge the appraisal if there is an error. Your agent can show you what each choice does to your cash.",
  },
  {
    q: "Do I need a specialist after a general inspection?",
    a: "Often, yes. A general inspector spots problems, but a roofer, plumber, electrician or structural engineer prices and diagnoses them. If the report flags a possible big-ticket item, book the specialist the same day, because you are on a deadline.",
  },
  {
    q: "How do I know the repairs were done properly?",
    a: "Ask for invoices, permits and the contractor’s license number, and check the work at your final walkthrough. For termite work, the pest company provides a Certificate of Completion once repairs are done.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  ["How long do I have to investigate?", "17 days under the standard C.A.R. contract, but the number is a fill-in on the contract, so check yours"],
  ["Which form do I use?", "The C.A.R. Request for Repair (Form RR)"],
  ["Does the seller have to agree?", "No. The purchase agreement does not require the seller to respond to repair requests"],
  ["What can I ask for?", "Repairs, pest report Section 1 or 2 work, a credit, or a price adjustment"],
  ["What does signing remove?", "Your signature on the RR (Section 3) removes the contingencies you list, even without a separate removal form"],
  ["How big can a seller credit be?", "Depends on your loan. Conventional limits run 3%, 6% or 9% based on your down payment. FHA allows up to 6%"],
  ["Who pays for inspections?", "Usually the buyer"],
];

const QUICK_STEPS: [string, ReactNode][] = [
  ["Read the report and sort the findings.", "Separate safety and structure from cosmetic items."],
  ["Get contractor quotes.", "Numbers make your request credible."],
  ["Pick your ask.", "Repairs, a credit or a price cut each work differently."],
  ["Write the Request for Repair.", "Itemize it and attach the reports."],
  ["Read the seller’s response.", "Accept, counter or start a new request."],
  ["Negotiate the gap.", "Trade flexibility for the items that matter."],
  ["Remove contingencies or walk away.", "Do it before your deadline, and do it on purpose."],
];

const FORMS: ReactNode[][] = [
  ["RR (Request for Repair)", "Lists your requests for repairs, pest work, credits or a price reduction, and removes the specified contingencies when you sign", "Buyer, then seller"],
  ["RRRR (Seller Response and Buyer Reply)", "Lets the seller propose a different answer. The buyer can accept it, counter, or make a new request", "Seller, then buyer"],
  ["CR (Contingency Removal)", "Removes any other contingencies, such as loan or appraisal, that the RR does not cover", "Buyer"],
  ["AEA (Amendment of Existing Agreement)", "A blank form for custom terms. It is an offer that expires within 3 days after it is made", "Both"],
];

const TIMELINE: ReactNode[][] = [
  ["0", "Offer accepted, escrow opens, deposit delivered"],
  ["1 to 7", "Schedule the general, pest and any specialist inspections. Seller disclosures usually arrive"],
  ["5 to 10", "Reports come in. Review them with your agent"],
  ["8 to 12", "Get contractor quotes and send the Request for Repair"],
  ["12 to 16", "Seller responds. You counter or accept"],
  ["17", "Default deadline to finish investigating and remove contingencies, or cancel"],
];

const PRIORITIES: ReactNode[][] = [
  ["Must fix", "Active roof or plumbing leaks, electrical hazards, a failed sewer line, structural movement, pest Section 1 items", "Repairs by a licensed contractor, or a credit or price cut large enough to cover them"],
  ["Ask for a credit", "An aging roof, a water heater or HVAC near the end of life, drainage issues, pest Section 2 items", "A credit or price reduction"],
  ["Let go", "Paint, worn flooring, small cracks, dated fixtures, sticking doors", "Nothing. Fix them yourself"],
];

const OPTIONS: ReactNode[][] = [
  ["What you get", "Work done before closing", "Cash toward your closing costs", "A lower purchase price"],
  ["Who controls quality", "The seller picks the contractor", "You", "You"],
  ["Cash at closing", "No change", "Lower", "Slightly lower down payment"],
  ["Monthly payment", "No change", "No change", "Lower"],
  ["Property tax effect", "None", "None", "Lowers your starting assessed value"],
  ["Loan limits", "Pest clearance may be required", "Capped by loan type", "No cap"],
  ["Best when", "Safety items, lender-required fixes", "You are short on cash or want your own contractor", "You have savings and plan to stay"],
];

const EXAMPLE: ReactNode[][] = [
  ["Purchase price", "$900,000", "$885,000"],
  ["Loan amount (95%)", "$855,000", "$840,750"],
  ["Principal and interest", "About $5,752", "About $5,656"],
  ["Property tax per month", "About $900", "About $885"],
  ["Cash to you at closing", "$15,000 toward closing costs", "None"],
  ["Monthly savings", "None", "About $111"],
];

const SAMPLE_REQUEST: ReactNode[][] = [
  ["Sewer line", "Cracked section on camera scope, report page 4", "$7,800 (attached)", "Seller repairs with permit, or a $7,800 credit"],
  ["Roof", "Active leak above hall bathroom", "$2,400 (attached)", "Seller repairs by licensed roofer"],
  ["Pest, Section 1", "Active drywood termites in garage framing", "Pest company bid attached", "Seller completes Section 1 work and provides clearance"],
  ["Water heater", "17 years old, no leaks", "N/A", "No request"],
];

export default function HowToNegotiateAfterHomeInspectionInCalifornia() {
  return (
    <>
      <p>
        Knowing how to negotiate after a home inspection can save a California buyer thousands of dollars,
        but the process runs on a clock and a few specific forms. Miss either one and you lose leverage.
      </p>
      <p>
        This guide covers the 17-day window, the Request for Repair, credit vs. repairs vs. a price cut, and
        when to walk away. I work mostly in Studio City, Sherman Oaks, Laurel Canyon and the Hollywood Hills,
        so I point out where hillside homes change the math.
      </p>
      <p>
        As a Certified Real Estate Negotiation Expert, I treat an inspection report as a pricing document,
        not a punch list.
      </p>

      <h2>Quick Facts: Negotiating After a Home Inspection in California</h2>
      <p>
        Figures are current as of November 2026. Contract dates and form versions can differ, so confirm
        yours with your agent.
      </p>
      <Table label="Quick facts" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>How to Negotiate After a Home Inspection: The Quick Version</h2>
      <p>Here is the whole process in seven steps. Each one gets its own section below.</p>
      <Steps items={QUICK_STEPS} />

      <h2>How the Home Inspection Contingency Works in California</h2>
      <p>
        The home inspection contingency in California is your right to investigate the property and cancel
        or renegotiate based on what you find. In the standard C.A.R. contract it is called the investigation
        contingency. The contract gives you an automatic 17-day period to investigate all aspects of the
        property.
      </p>
      <p>
        That period is the outside limit, not a target. C.A.R. advises buyers to schedule inspections early,
        so there is time to negotiate before the deadline.
      </p>

      <h3>The Forms You Will See</h3>
      <p>Your agent handles the paperwork, but you should know what each form does before you sign.</p>
      <Table label="California repair negotiation forms" head={["Form", "What it does", "Who signs"]} rows={FORMS} />
      <p>
        One detail matters a lot. The seller’s agreement is conditional, because the buyer must accept the
        release language and remove the listed contingencies for it to bind. Read that release before you
        sign.
      </p>

      <h3>A Sample Timeline</h3>
      <p>Your contract controls the dates. This is how a typical 17-day window can run.</p>
      <Table label="Sample 17-day timeline" head={["Day", "What happens"]} rows={TIMELINE} />

      <h3>What Happens If You Miss the Deadline</h3>
      <p>
        Missing it does not make the contingency disappear on its own. The seller can serve a formal Notice to
        Buyer to Perform, and the buyer then has a short window, often two business days, to remove the
        contingency or cancel. That is a stressful spot, so aim to settle everything before day 17.
      </p>

      <h2>Step 1: What to Ask For After a Home Inspection</h2>
      <p>
        Most reports list dozens of items. Most are normal for an older home, and asking for all of them
        weakens your request. Sort the findings into three groups.
      </p>
      <Table label="How to sort inspection findings" head={["Priority", "Examples", "Typical ask"]} rows={PRIORITIES} />

      <h3>Pest Reports: Section 1 and Section 2</h3>
      <p>
        California pest reports split findings into two groups. Section 1 conditions are active and causing
        damage, while Section 2 conditions are likely to cause damage if left alone.
      </p>
      <p>
        Who pays is negotiable. It is common for the seller to pay for Section 1 items and the buyer for
        Section 2 items, though both are negotiable. Lenders usually require at least Section 1 to be
        cleared, and sometimes Section 2 too.
      </p>

      <h3>Issues I See in Studio City and the Hills</h3>
      <p>Older Valley homes bring a few repeat findings. In the hills the list gets longer.</p>
      <ul>
        <li>
          <strong>Sewer lines.</strong> On homes built before 1980, a camera scope often finds cracks or root
          intrusion. Repairs can run into five figures.
        </li>
        <li>
          <strong>Retaining walls and drainage.</strong> On hillside lots, cracks, leaning walls and poor
          drainage are structural questions. Ask a specialist, not just a general inspector.
        </li>
        <li>
          <strong>Old wiring and plumbing.</strong> Knob-and-tube, aluminum wiring and galvanized pipes can
          affect insurance and the loan.
        </li>
        <li>
          <strong>Unpermitted work.</strong> Garage conversions and enclosed patios may not have permits. Ask
          your agent how that affects your loan, your insurance and a future sale.
        </li>
      </ul>
      <p>
        I cover typical inspection costs and the disclosures you should expect in my guide to{" "}
        <Link href="/blog/how-to-buy-a-house-in-los-angeles">buying a house in Los Angeles</Link>. For
        hillside risk by neighborhood, see <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs Sherman Oaks</Link>.
      </p>

      <h2>Step 2: Get Quotes Before You Ask</h2>
      <p>
        A request with a dollar figure is hard to dismiss. “The roof looks old” is an opinion. “A licensed
        roofer quoted $9,200 to replace it” is a number the seller can price.
      </p>
      <p>
        Get at least one written estimate for each must-fix item. For the sewer, foundation, roof and
        electrical, use a specialist who does that work every day, because a general inspector flags problems
        and does not price them.
      </p>
      <p>
        Do this fast. Quotes take days, and your deadline does not move. If a quote will not arrive in time,
        ask your agent about extending the contingency period in writing.
      </p>

      <h2>Seller Credit vs Repairs vs Price Reduction</h2>
      <p>
        This is the choice that decides how much you really save. Each option moves money and risk in a
        different way.
      </p>
      <Table
        label="Seller repairs vs seller credit vs price reduction"
        head={["", "Seller repairs", "Seller credit", "Price reduction"]}
        rows={OPTIONS}
      />

      <h3>Why Repairs Can Go Wrong</h3>
      <p>
        Seller repairs sound ideal, but the seller wants the cheapest fix that clears the item. Work done in a
        rush before closing can be hard to verify. Ask for invoices, permits and the contractor’s license
        number.
      </p>

      <h3>How Credits Work, and Their Limits</h3>
      <p>
        A credit reduces the cash you bring to closing. It does not change the price, so the home’s appraisal
        and your loan amount stay the same.
      </p>
      <p>
        Lenders cap what a seller can contribute. On a conventional loan the limit is 3% with less than 10%
        down, 6% with 10% to under 25% down, and 9% with 25% or more down. FHA caps it at 6%. A credit also
        cannot exceed the closing costs it covers, so ask your lender before you write the request.
      </p>

      <h3>Why a Price Cut Is Different in California</h3>
      <p>
        California reassesses a home at its purchase price under Proposition 13. A lower price is usually
        better than a credit if your property taxes are based on the purchase price and you can pay for
        repairs yourself, while a credit suits buyers who are short on cash.
      </p>

      <h3>A Worked Example</h3>
      <p>Here is the math on a $15,000 issue. It is an illustration, not a quote.</p>
      <p>
        Assumptions: a $900,000 purchase, 5% down, a 30-year fixed rate of 7.11% (Freddie Mac’s November 12
        weekly average), and property tax at about 1.2% of the price. Mortgage insurance is left out to keep
        it simple.
      </p>
      <Table
        label="Credit vs price cut on a $15,000 issue"
        head={["", "Credit of $15,000", "Price cut of $15,000"]}
        rows={EXAMPLE}
      />
      <p>
        The price cut saves about $111 a month, or roughly $1,330 a year. The credit gives you $15,000 up
        front to pay for the work.
      </p>
      <p>
        My rule of thumb: if the repair is urgent and your savings are thin, take the credit. If you have cash
        set aside and plan to stay for years, the price cut lowers your costs every month. In some deals a
        credit can also fund a rate buydown, which I compare in my guide to{" "}
        <Link href="/blog/how-to-negotiate-a-house-price-in-los-angeles">negotiating a house price in Los Angeles</Link>.
      </p>

      <h2>Step 3: Write the Request for Repair</h2>
      <p>
        Your agent will complete the C.A.R. Request for Repair, but you decide what goes in it. The form lets
        you ask for repairs, pest report Section 1 or 2 work, a credit, or a price adjustment, and you should
        attach the inspection reports.
      </p>
      <p>
        A strong request has four parts: a short itemized list, the report page for each item, a quote where
        you have one, and one clear ask per item. Add a response date in your cover note.
      </p>
      <p>
        The date matters because the form does not do that job for you. The RR and the purchase agreement
        have historically set no time limit for the seller to respond. Some form versions have changed this,
        so ask your agent which version you are using, and never assume the clock is open-ended.
      </p>

      <h3>Sample Request Items</h3>
      <p>The numbers below are made up to show the format.</p>
      <Table label="Sample Request for Repair items" head={["Item", "Finding", "Estimate", "Ask"]} rows={SAMPLE_REQUEST} />

      <h3>Mistakes That Weaken a Request</h3>
      <ul>
        <li>Sending a list of 40 minor items. It signals that you are hunting for a discount.</li>
        <li>Vague asks like “address roof issues.” Say repair, credit or price cut, and give a number.</li>
        <li>Emotional language about the seller’s upkeep. Stick to the report.</li>
      </ul>

      <Cta title="Found Problems in Your Inspection?" label="Book a Free Consultation">
        Send me the report. I’ll show you which items to push on, which to let go, and what a fair request
        looks like in your neighborhood.
      </Cta>

      <h2>Step 4: How the Seller Responds</h2>
      <h3>Can a Seller Refuse Repairs After an Inspection?</h3>
      <p>
        Yes. California contracts sell homes as-is, and the purchase agreement does not require the seller to
        agree to or answer your request. A refusal does not end the deal, because most sellers want to close
        and expect some negotiation.
      </p>
      <p>Silence is also an answer. If the seller does not respond, C.A.R. treats that as a no to the request.</p>

      <h3>If the Seller Agrees, Partly Agrees or Counters</h3>
      <p>
        A seller who agrees to everything or nothing can respond on the RR itself, while a seller who agrees
        to some items or changes the request uses the RRRR. Credits written on these forms are also separate
        from any credits already in your contract, unless the form says otherwise (C.A.R. added that caveat
        to both forms).
      </p>
      <p>
        Then you choose. On an RRRR you can accept the seller’s response, counter the terms, or make a new
        Request for Repair. If you change anything, the seller must sign again, or there is no binding
        agreement.
      </p>

      <h3>If the Seller Says No or Goes Quiet</h3>
      <p>You have four options:</p>
      <ul>
        <li>
          <strong>Switch the ask.</strong> If the seller will not fix the roof, ask for a credit or a price
          reduction for the same item.
        </li>
        <li>
          <strong>Narrow the list.</strong> Drop the minor items and hold firm on two or three must-fix issues.
        </li>
        <li>
          <strong>Accept the home as-is.</strong> Remove your contingency only if you can live with the problems.
        </li>
        <li>
          <strong>Cancel.</strong> Do this in writing before your deadline, under the terms of your contract.
        </li>
      </ul>

      <h2>Negotiation Tactics That Work in Los Angeles</h2>
      <p>Leverage comes from the market and your preparation, not from volume. These are the moves I use most.</p>
      <ul>
        <li>
          <strong>Read the market first.</strong> Days on market, price cuts and the number of offers tell you
          how much room you have. A home that sat for six weeks gives you more room than one that sold in four
          days.
        </li>
        <li>
          <strong>Lead with safety and structure.</strong> Sellers rarely argue against a leaking roof or a
          cracked sewer line. They push back on long lists.
        </li>
        <li>
          <strong>Bundle your asks.</strong> One organized request lands better than a stream of small ones.
        </li>
        <li>
          <strong>Trade flexibility for money.</strong> A later closing date or a short rent-back can be worth
          more to a seller than a few thousand dollars.
        </li>
        <li>
          <strong>Support price cuts with comps.</strong> If the repair costs change the home’s value, show
          recent sales of similar homes in better condition.
        </li>
        <li>
          <strong>Stay professional.</strong> The seller’s agent talks to many buyers, and the polite ones get
          the best terms.
        </li>
      </ul>
      <p>
        If you want to see how I build offers from comparable sales, read my guide to{" "}
        <Link href="/blog/how-to-negotiate-a-house-price-in-los-angeles">negotiating a house price in Los Angeles</Link>.
      </p>

      <h2>When to Walk Away</h2>
      <p>A good price does not fix every problem. Walk away, or at least pause, if you see one of these.</p>
      <ul>
        <li>
          <strong>Structural failure.</strong> Foundation movement or a failing hillside wall can cost more
          than the home’s discount.
        </li>
        <li>
          <strong>Uninsurable risk.</strong> If you cannot get a policy at a price you can carry, the lender
          will not fund the loan.
        </li>
        <li>
          <strong>Unpermitted work that blocks your loan or insurance.</strong> Ask your agent how it affects
          both before you commit.
        </li>
        <li>
          <strong>A seller who will not engage.</strong> If they will not discuss even a safety item, expect
          more trouble in escrow.
        </li>
      </ul>
      <p>
        Your cancellation rights come with the contingency. During the 17-day period, a buyer can cancel for
        reasons related to the property’s physical condition by delivering written notice. Once you remove
        contingencies, backing out without a valid reason can cost you the earnest money deposit.
      </p>

      <h2>Mistakes Buyers Make After the Inspection</h2>
      <ul>
        <li>
          <strong>Waiting until day 16.</strong> You need time for quotes, a response and a counter.
        </li>
        <li>
          <strong>Asking for everything.</strong> A long list buries the items that matter.
        </li>
        <li>
          <strong>Skipping the quotes.</strong> Without numbers, the seller sets the price of your problem.
        </li>
        <li>
          <strong>Removing contingencies too early.</strong> Do it only when the deal is settled.
        </li>
        <li>
          <strong>Signing without reading the release language.</strong> The seller’s agreement is conditional on it.
        </li>
        <li>
          <strong>Forgetting insurance.</strong> Get your quote before you remove the contingency, especially
          in the hills.
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
      <p>
        For more on low appraisals, see my <Link href="/blog/how-to-buy-a-house-in-los-angeles">buyer’s guide</Link>.
        If you are buying a home that is being sold as-is, my guide to{" "}
        <Link href="/blog/selling-a-house-as-is-in-california">selling a house as-is in California</Link>{" "}
        explains what the seller still has to disclose.
      </p>

      <h2>Conclusion</h2>
      <p>
        Knowing how to negotiate after a home inspection in California comes down to timing, evidence and a
        clear choice between repairs, a credit and a price cut. Start early, get quotes, ask for what matters,
        and know your walk-away point before the report arrives.
      </p>
      <p>
        If you are under contract and the report just landed, let’s look at it together.{" "}
        <Link href="/contact">Book a free consultation</Link>, or{" "}
        <Link href="/home-search">start your home search</Link> if you are still shopping. You can also learn
        about the neighborhoods I know best, including{" "}
        <Link href="/real-estate-agent-in-studio-city">Studio City</Link>,{" "}
        <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon</Link> and the{" "}
        <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills</Link>.
      </p>
    </>
  );
}

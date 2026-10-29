import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, Steps, Table } from "./_parts";

/**
 * Body for "How to Negotiate a House Price in Los Angeles".
 *
 * Rendered as DIRECT children of `.ar-narrow`, like the other bodies —
 * blog.css styles body copy with `.ar-body .ar-narrow > p`, so wrapping any of
 * this in an extra element silently drops the type styling.
 *
 * The leverage table, the comps illustration and the buydown comparison are
 * genuinely tabular (same columns, rows read across), so they use Table. The
 * checklist is numbered because its order is the point. The sample counter
 * lines are a plain list: blog.css has no blockquote style.
 *
 * Sources are named in the copy as supplied (Redfin, Zillow, the C.A.R.
 * purchase agreement, the FAIR Plan, the NAR settlement) without outbound
 * links: the draft did not supply URLs.
 *
 * Hero: an agent talking a buyer through a house, from the stock artwork
 * supplied with the project, cropped to 16:10.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is a low offer rude?",
    a: "Not if the numbers support it. Sellers expect offers that reflect comps, and a respectful low offer usually earns a counter. Very low offers on strong new listings tend to be ignored, which costs you the chance to negotiate at all.",
  },
  {
    q: "How long does a seller have to respond?",
    a: "Under the standard contract, an offer expires at 5 p.m. on the third day unless you change the date and time, and a counteroffer works the same way. You can shorten or extend that window in the offer.",
  },
  {
    q: "Can I negotiate my agent’s compensation?",
    a: "Yes. Since the August 2024 NAR settlement, buyers sign a written agreement with their agent before touring, and the fee is negotiable. A seller can contribute through a concession, but that offer cannot appear on the MLS, and lenders treat such concessions differently, so check with yours.",
  },
  {
    q: "Can I negotiate on new construction?",
    a: "Often, but builders usually protect list prices because they affect every other buyer. Ask for incentives instead, such as closing credits, a rate buydown, or upgrades.",
  },
  {
    q: "How do probate and estate sales work?",
    a: "Some estate sales need court confirmation, which means your accepted offer can be overbid at a hearing. The first overbid must exceed your price by 10% of the first $10,000 plus 5% of the rest, so a $1,000,000 accepted offer needs a first overbid of at least $1,050,500. Ask your agent early whether a sale is court-confirmed.",
  },
];

const LEVERAGE: ReactNode[][] = [
  [
    "New listing, priced at or below recent comps",
    "Low",
    "Clean, strong terms and a fair price. Do not expect much price room.",
  ],
  ["Priced above comps, a few weeks on market", "Medium", "Offer at comp value and ask for credits to bridge the gap."],
  ["Long time on market with repeated price cuts", "High", "Offer below list, backed by adjusted comps."],
  ["Estate sale or vacant home", "Varies", "Learn the seller’s timeline. Flexible terms may be worth more than price."],
  ["Any home while rates sit above 7%", "Moderate", "Ask for credits toward a rate buydown or closing costs."],
];

const COMPS: ReactNode[][] = [
  ["Comp A, renovated kitchen and a pool", "$1,455,000", "-$30,000 (subject has neither)", "$1,425,000"],
  ["Comp B, no garage", "$1,390,000", "+$25,000 (subject has a garage)", "$1,415,000"],
  ["Comp C, quiet side street", "$1,440,000", "-$10,000 (subject is on a busier street)", "$1,430,000"],
  [<strong key="a">Average adjusted value</strong>, "", "", <strong key="av">About $1,423,000</strong>],
];

const BUYDOWN: ReactNode[][] = [
  ["No concession", "About $5,485", "None"],
  ["$20,000 price cut (loan drops to $780,000)", "About $5,347", "About $137 lower, permanently"],
  ["Seller credit of about $19,000 for a 2-1 buydown, year one", "About $4,442", "About $1,042 lower"],
  ["Same buydown, year two", "About $4,952", "About $533 lower"],
];

const CHECKLIST: [string, ReactNode][] = [
  ["Get pre-approved", "and confirm which concession cap applies to your loan."],
  ["Pull adjusted comps", "and write down your value range and your ceiling."],
  ["Study the listing:", "price history, time on market, vacancy, and seller situation."],
  ["Build the offer", "with price, deposit, contingency periods, and closing date."],
  ["Trade in counters,", "one term at a time, tied to evidence."],
  ["Inspect early", "and request credits or repairs with contractor bids."],
  ["Verify insurance and appraisal", "before you remove contingencies."],
];

export default function HowToNegotiateAHousePriceInLosAngeles() {
  return (
    <>
      <p>
        A buyer who offers 5% under asking on every Los Angeles listing will lose some homes and overpay on
        others. Learning how to negotiate a house price in Los Angeles starts with one fact: leverage
        depends on the listing, not the city.
      </p>
      <p>
        With the average 30-year mortgage rate at 7.32% in late October, even a small price move changes
        your monthly payment. This guide shows where the room is, which terms save the most, and how the
        California contract process works.
      </p>

      <h2>Can You Negotiate a House Price in Los Angeles Right Now?</h2>
      <p>
        It depends on the home. In May 2026, Redfin reported a median of 49 days on market in Los Angeles,
        and about 34% of listings sold above their original list price. Zillow’s November 2025 data showed
        the other side: 54.4% of sales closed under list, with a median sale-to-list ratio of 0.991.
      </p>
      <p>
        So roughly a third of homes draw competition, and more than half sell below asking. Your job is to
        figure out which kind of listing you are looking at.
      </p>
      <Table
        label="Negotiating leverage by listing situation"
        head={["Listing situation", "Your leverage", "Best move"]}
        rows={LEVERAGE}
      />
      <p>
        This table is a rule of thumb, not a statistic. Your agent’s read of the specific street and price
        band should override it.
      </p>

      <h2>Know the Real Value First</h2>
      <p>
        List price is the seller’s hope. The number that matters is what similar homes sold for recently,
        adjusted for the differences you can see.
      </p>
      <p>
        Pull closed sales from the same neighborhood, then adjust for features that move price in Los
        Angeles: a pool, a garage, a renovated kitchen, lot shape, hillside access, and street noise. Here
        is a made-up example for a home listed at $1,495,000.
      </p>
      <Table
        label="Illustrative comparable sales for a home listed at $1,495,000"
        head={["Comparable sale (illustration)", "Sold price", "Adjustment", "Adjusted value"]}
        rows={COMPS}
      />
      <p>
        The adjusted comps point to about $1.42 million, or roughly 5% under the list price. That gap is
        your evidence. Adjustments are judgment calls, so ask your agent to show the reasoning behind each
        one.
      </p>

      <h2>Read the Seller and the Listing</h2>
      <p>
        Price history tells you the most. A cut after three weeks says the first price missed, and two
        cuts say the seller is under pressure. Compare the home’s time on market with similar homes
        nearby, not with the city average.
      </p>
      <p>
        Look for other signals too: a vacant house, an estate or trust sale, a seller who already bought
        elsewhere, or MLS remarks that invite offers. Early-access and off-market listings can also mean
        fewer competing buyers, so ask your agent what is coming.
      </p>
      <p>
        Before you write anything, ask the listing agent three questions. What matters to the seller
        besides price? Are other offers expected? What closing timeline would suit them?
      </p>

      <h2>Build an Offer That Gets a Yes</h2>
      <p>
        Price is one lever, and sellers weigh the whole package. A slightly lower price with a fast,
        certain close can beat a higher price with long contingencies and a thin deposit.
      </p>
      <p>
        The standard California Residential Purchase Agreement gives buyers 17 days after acceptance to
        investigate the property. You can shorten that period to strengthen your offer, but every day you
        cut is protection you give up. Decide how much risk you can carry before you promise anything.
      </p>
      <p>
        Set a short offer expiration, too. The standard contract revokes an offer at 5 p.m. on the third
        day unless the seller signs, and you can shorten that window so your offer is not shopped around.
      </p>

      <h2>How to Handle the Counteroffer</h2>
      <p>
        A counteroffer is a new offer with its own terms and its own expiration, which defaults to three
        days. Treat each round as a trade, not a surrender: every time you give something, ask for
        something in return.
      </p>
      <p>
        Change one term at a time so you can see what moves the seller. Short, factual lines work best,
        for example:
      </p>
      <ul>
        <li>“We can move $10,000 on price if the seller covers the inspection credit we discussed.”</li>
        <li>“Our number rests on these three sales. Which comps is your seller using?”</li>
        <li>“We can close on your timeline, and in return we need the price to reflect the roof age.”</li>
      </ul>
      <p>
        The approach that tends to work is calm, specific requests tied to evidence, rather than
        round-number demands with no reasoning behind them.
      </p>

      <h2>Credits That Can Save More Than a Price Cut</h2>
      <p>
        At a rate near 7.3%, the way you take a concession matters. Take a $1 million home with 20% down. A
        $20,000 price cut lowers the payment by about $137 a month, while a seller credit of about $19,000
        for a 2-1 buydown lowers it by roughly $1,042 a month in year one.
      </p>
      <Table
        label="$1 million home, $800,000 loan at about 7.3% (illustration)"
        head={["$1M home, $800K loan at about 7.3%", "Monthly payment", "Change"]}
        rows={BUYDOWN}
      />
      <p>
        A 2-1 buydown cuts your rate by two points in year one and one point in year two, then returns to
        the note rate. The tradeoff is that it is temporary, while a price cut is permanent and also lowers
        your property tax base. A buydown works best if you expect to refinance or can handle the full
        payment later.
      </p>
      <p>
        Concession limits depend on your loan. Conventional loans generally allow 3% with under 10% down,
        6% with 10% to 25% down, and 9% above that. FHA allows up to 6% and VA up to 4%, plus normal
        closing costs, and concessions cannot exceed your actual costs. Confirm the exact cap with your
        lender before you write the number into an offer.
      </p>
      <p>
        Other terms that carry real value include closing costs, a home warranty, included appliances, a
        flexible closing date, and a rent-back if the seller needs time.
      </p>

      <Cta title="Want a Second Read on an Offer?" label="Schedule a Consultation" href="/contact">
        Send the listing you are looking at, and we will pull adjusted comps and show which credits would
        save you the most each month.
      </Cta>

      <h2>Negotiating After the Inspection</h2>
      <p>
        The inspection is your second round of negotiation. The standard 17-day period is also your
        deadline, so schedule inspections early and leave time to talk.
      </p>
      <p>
        In California, you ask for repairs on the Request for Repair form. The contract does not require
        the seller to respond, and the seller can answer on a separate response form or propose a credit or
        price change instead. Agreeing in writing can remove your inspection contingency, so confirm what
        you are releasing before you sign.
      </p>
      <p>
        Focus on the issues that cost real money or affect safety. In Los Angeles that often means
        foundation and drainage on hillside lots, retaining walls, sewer laterals, old plumbing or wiring,
        termite findings, and unpermitted work. Bring written bids from licensed contractors, and consider
        asking for a credit rather than repairs so you control the quality.
      </p>
      <p>
        Get a homeowners insurance quote before you remove contingencies. The California FAIR Plan caps
        residential coverage at $3 million, and a high premium or a coverage gap is a legitimate reason to
        renegotiate or walk.
      </p>

      <h2>What to Do When the Appraisal Comes in Low</h2>
      <p>An appraisal below your price leaves a gap the lender will not finance. You have several moves:</p>
      <ul>
        <li>Ask the seller to lower the price to the appraised value.</li>
        <li>Split the gap, with the seller dropping some and you covering the rest in cash.</li>
        <li>Cover the gap yourself, if you have the cash and still think the home is worth it.</li>
        <li>Challenge the appraisal by giving your lender comps the appraiser missed.</li>
        <li>Cancel under your appraisal contingency, if you kept one.</li>
      </ul>
      <p>
        FHA and VA buyers also have separate appraisal protections in the contract, so ask your agent how
        the amendatory clause applies to your loan before you waive anything.
      </p>

      <h2>Negotiating in a Multiple-Offer Situation</h2>
      <p>
        When several buyers compete, price is not the only thing the seller compares. Certainty, speed, and
        a clean file often decide it. A strong lender letter, a reasonable deposit, and a short, clear
        timeline help you stand out without bidding blind.
      </p>
      <p>
        Sellers in California can send counteroffers to more than one buyer using a multiple counter offer
        form. If you receive one, you are in a best-and-final round, so know your ceiling before you open
        the document.
      </p>
      <p>
        Write your maximum price down before you start, and share it with your agent. Think carefully
        before you waive the appraisal or inspection contingency, because that moves risk to you. Waive
        only what you can afford to lose.
      </p>

      <h2>When to Walk Away</h2>
      <p>Walking away is a negotiating tool, and sometimes the right answer. Consider it when:</p>
      <ul>
        <li>The price stays above your adjusted comps after two rounds.</li>
        <li>The seller refuses to address a safety or structural defect.</li>
        <li>You cannot get insurance at a price you can carry.</li>
        <li>Permit problems or unpermitted work would be expensive to fix.</li>
        <li>The deal only works if you stretch past the ceiling you set.</li>
      </ul>

      <h2>Mistakes That Cost Los Angeles Buyers</h2>
      <ul>
        <li>
          <strong>Anchoring to the list price.</strong> Start from adjusted comps instead.
        </li>
        <li>
          <strong>Negotiating price only.</strong> Credits and terms often save more per month.
        </li>
        <li>
          <strong>Inspecting late.</strong> You lose the time you need to negotiate repairs.
        </li>
        <li>
          <strong>Revealing your ceiling.</strong> Keep your maximum between you and your agent.
        </li>
        <li>
          <strong>Waiving protections without cash behind them.</strong> A waived contingency is a bet you
          have to be able to lose.
        </li>
        <li>
          <strong>Skipping insurance quotes.</strong> Coverage cost can change the real price of a home.
        </li>
      </ul>

      <h2>Negotiation Checklist</h2>
      <Steps items={CHECKLIST} />

      <h2>Frequently Asked Questions About Negotiating a House Price in Los Angeles</h2>
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

      <h2>Your Next Step in Negotiating a House Price in Los Angeles</h2>
      <p>
        Good negotiating starts before the offer, with real value, a clear ceiling, and a read on the
        seller. Use credits and terms, not only price, and protect yourself with early inspections and
        insurance quotes.
      </p>
      <p>
        Andrew Liberty brings a Certified Real Estate Negotiation Expert credential and a commercial real
        estate background to his clients’ offers. <Link href="/home-search">Browse homes</Link>, read our
        guides to <Link href="/blog/house-hacking-in-los-angeles">house hacking in Los Angeles</Link> and{" "}
        <Link href="/blog/how-to-buy-a-duplex-in-los-angeles">buying a duplex</Link>,{" "}
        <Link href="/contact">schedule a consultation</Link>, or call{" "}
        <a href="tel:+13107090581">(310) 709-0581</a>.
      </p>
    </>
  );
}

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Cta, Steps, Table } from "./_parts";

/**
 * Body for "Buying a Condo in Los Angeles". Rendered as direct children of
 * `.ar-narrow`, like the other bodies. Sources (C.A.R., Freddie Mac, LADBS,
 * SB 326, LA County market data) are named in the copy without outbound links.
 */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Are condos harder to sell in LA?",
    a: "They can take longer. LA County condos and townhomes averaged 53 days on market in October 2026, against 38 days for houses. A well-run building with healthy reserves, good parking and few restrictions sells faster.",
  },
  {
    q: "Can I rent out my LA condo?",
    a: "Usually, on a long-term lease. California generally stops HOAs from banning rentals of 30 days or more, but many restrict short-term rentals, and some require approval or a minimum lease term. Check the CC&Rs before you buy.",
  },
  {
    q: "What is a good HOA fee in LA?",
    a: "There is no single number. A higher fee that includes earthquake insurance and well-funded reserves can be a better deal than a low fee in an underfunded building. Compare what the dues cover and how healthy the reserves are.",
  },
  {
    q: "Who pays a special assessment approved during escrow?",
    a: "It is negotiable. Assessments already due are often the seller’s, and future installments are often negotiated. Put the agreement in writing in the contract.",
  },
  {
    q: "Do I need earthquake insurance for a condo?",
    a: "It is not required, but consider it. Check whether the master policy covers earthquakes. If it does not, a condo earthquake policy with loss-assessment coverage protects you against a large assessment after a quake.",
  },
  {
    q: "Can I use an FHA loan for any condo?",
    a: "No. The project generally needs FHA approval, though single-unit approvals are sometimes possible. Ask your lender to check before you make an offer.",
  },
];

const QUICK_FACTS: ReactNode[][] = [
  ["How fast are LA condos selling?", "LA County condos and townhomes averaged 53 days on market in October 2026"],
  ["How close to asking do they sell?", "About 95.7% of original list price, which leaves more room than houses"],
  ["What does a Valley Village condo cost?", "Median list price around $632,000"],
  ["What are HOA dues in Valley Village?", "Roughly $380 to $620 a month on recent listings"],
  ["What do I actually own?", "The interior of your unit, plus a shared interest in the common areas"],
  ["Which HOA documents must the seller provide?", "Governing documents, the budget, assessments, unresolved violations, board minutes if you request them, and the latest balcony inspection report"],
  ["What is the balcony inspection rule?", "Required in HOA buildings with 3 or more units. The first was due by January 1, 2025, then every 9 years"],
  ["Can I use FHA on any condo?", "No. The project generally needs FHA approval"],
  ["Current 30-year fixed rate", "7.28% (Freddie Mac weekly average, November 19, 2026)"],
];

const QUICK_STEPS: [string, ReactNode][] = [
  ["Budget with the HOA included.", "Dues count against what you can borrow."],
  ["Talk to your lender about condos before you shop.", "Some buildings limit your loan options."],
  ["Shortlist buildings, not just units.", "The building’s health decides your future costs."],
  ["Check retrofit and balcony status early.", "Unfinished work often means an assessment."],
  ["Write an offer that protects your HOA review.", "Keep time to read the documents."],
  ["Read the reserve study, budget and minutes.", "This is where the real risks show up."],
  ["Inspect the unit and ask about the building.", "Your inspector covers the unit; the HOA covers the rest."],
  ["Negotiate on what you find, then close.", "Use the documents as leverage."],
];

const OWNERSHIP: ReactNode[][] = [
  ["What you own", "Interior space plus a share of common areas", "Often the structure, sometimes the land below it", "House and land"],
  ["Exterior maintenance", "HOA", "Usually HOA, sometimes the owner", "You"],
  ["HOA dues", "Yes, usually the highest", "Yes, often lower", "Sometimes, rarely in the Valley"],
  ["Insurance", "HO-6 for the interior", "Depends on the HOA documents", "Full homeowners policy"],
  ["Control", "Limited by CC&Rs", "Limited", "Mostly yours, within city rules"],
  ["Typical price", "Lowest", "Middle", "Highest"],
];

const MONTHLY: ReactNode[][] = [
  ["Principal and interest ($504,000 loan)", "About $3,448"],
  ["Property tax", "About $630"],
  ["HOA dues", "$500 (example)"],
  ["HO-6 insurance", "About $50 (estimate)"],
  ["Total", "About $4,628"],
];

const DOCUMENTS: ReactNode[][] = [
  ["CC&Rs, bylaws and rules", "Rental limits, pets, renovation rules, parking, and who maintains what"],
  ["Annual budget report", "Whether dues cover operating costs, plus the reserve summary"],
  ["Assessment statement", "Current dues, special assessments, and approved increases not yet due"],
  ["Notices of violations", "Unresolved issues tied to the unit"],
  ["Construction defect notices", "Defect claims against the builder"],
  ["Rental or leasing restrictions", "Whether you can rent the unit later"],
  ["Board minutes (last 12 months, on request)", "Repairs discussed, disputes, and assessments being considered"],
  ["Balcony inspection report (SB 326)", "Findings on balconies, walkways and stairs, and any urgent repairs"],
];

const VV_PRICES: ReactNode[][] = [
  ["Median condo list price", "About $632,000"],
  ["Typical 1-bedroom", "Often in the low $400,000s"],
  ["Typical 2-bedroom", "Often $450,000 to $650,000, depending on size, condition and building"],
  ["HOA dues on recent listings", "About $380 to $620 a month"],
];

const COMPARE: ReactNode[][] = [
  ["Feel", "Quiet, residential, tree-lined", "Village feel near Ventura Boulevard dining", "Larger, busier, more condo choices"],
  ["Condo prices", "Usually the lowest", "Usually the highest", "In between, with a wide range"],
  ["Best for", "Value and a quiet street", "Walkability and dining", "Choice and freeway access"],
];

const TIMELINE: ReactNode[][] = [
  ["0", "Offer accepted, escrow opens. Order the HOA documents and the lender’s condo questionnaire right away"],
  ["1 to 3", "Deposit goes into escrow"],
  ["1 to 7", "Unit inspection. Seller disclosures arrive"],
  ["5 to 12", "HOA documents arrive. Read the reserve study, budget, minutes and balcony report"],
  ["8 to 14", "Ask the HOA or management your questions. Negotiate on what you find"],
  ["17", "Default deadline to remove contingencies or cancel"],
  ["30 to 45", "Close of escrow, depending on your contract"],
];

export default function BuyingACondoInLosAngeles() {
  return (
    <>
      <p>
        Buying a condo in Los Angeles is often the most realistic way into homeownership here. The price is
        lower than a house in the same neighborhood, and the HOA handles the roof, the grounds and the pool.
      </p>
      <p>
        But with a condo, you are buying a building, not just a unit. The building’s finances, insurance,
        repairs and rules decide what you will pay for years, so they deserve as much attention as the
        kitchen.
      </p>
      <p>
        I work mostly in Valley Village, Studio City, Sherman Oaks, Laurel Canyon and the Hollywood Hills. As a
        Certified Real Estate Negotiation Expert, I read the HOA documents with my buyers before they commit,
        and I use what we find to shape the offer.
      </p>

      <h2>Quick Facts: Buying a Condo in Los Angeles</h2>
      <p>Figures are current as of November 2026. Confirm the details for your building with your agent.</p>
      <Table label="Quick facts" head={["Question", "Short answer"]} rows={QUICK_FACTS} />

      <h2>Buying a Condo in Los Angeles: The Quick Version</h2>
      <p>Here is the whole process in eight steps. Each one gets its own section below.</p>
      <Steps items={QUICK_STEPS} />

      <h2>Condo vs Townhouse vs House: What You’re Really Buying</h2>
      <p>
        The words describe ownership, not just style. What you own decides what you maintain, what you insure
        and how much control you have.
      </p>
      <Table
        label="Condo vs townhouse vs house"
        head={["", "Condo", "Townhouse", "Single-family house"]}
        rows={OWNERSHIP}
      />
      <p>Townhouse ownership lines vary from building to building, so read the CC&amp;Rs to see what you own.</p>

      <h3>Is a Condo a Good Investment in LA?</h3>
      <p>It can be, if you buy the right building for the right reasons.</p>
      <p>
        <strong>The case for:</strong>
      </p>
      <ul>
        <li>A lower entry price in areas where houses are out of reach</li>
        <li>Less maintenance, if the HOA is healthy</li>
        <li>Amenities and locations that would cost far more as a house</li>
        <li>Building equity instead of paying rent</li>
      </ul>
      <p>
        <strong>The case against:</strong>
      </p>
      <ul>
        <li>Prices tend to rise more slowly than houses</li>
        <li>Dues usually go up over time</li>
        <li>Special assessments can arrive with little warning</li>
        <li>Rental rules and financing limits shrink the pool of future buyers</li>
      </ul>
      <p>
        My view: buy a condo you plan to live in for five years or more, not as a quick flip. If you are still
        weighing whether to buy at all, my guide to{" "}
        <Link href="/blog/pros-and-cons-of-renting-vs-buying-a-house">renting vs buying</Link> runs the numbers.
      </p>

      <h2>What a Condo Really Costs Each Month</h2>
      <p>
        The mortgage is only part of it. HOA dues, property tax and insurance can add more than $1,000 a month.
      </p>

      <h3>A Worked Example</h3>
      <p>
        This is an illustration. A $630,000 two-bedroom condo in Valley Village, 20% down, a 30-year fixed rate
        of 7.28%, and property tax at about 1.2% of the price.
      </p>
      <Table label="Monthly cost of a $630,000 condo" head={["Cost", "Per month"]} rows={MONTHLY} />
      <p>
        For comparison, the typical Valley Village home value is about $1.25 million. With 20% down, that is
        about $6,840 a month in loan payment plus about $1,250 in property tax, before insurance. The condo
        costs about $3,500 a month less, even with the HOA dues.
      </p>

      <h3>What HOA Dues Cover, and What They Don’t</h3>
      <p>
        Dues usually cover building insurance, common-area maintenance, landscaping, trash, water, the pool or
        gym, management and reserves. Some buildings also include earthquake insurance, gas or internet.
      </p>
      <p>
        Dues do not cover the inside of your unit, your own HO-6 policy, or special assessments. Ask for a
        line-item budget: two buildings with $500 dues can be very different deals.
      </p>

      <h3>Special Assessments: The Cost Nobody Budgets For</h3>
      <p>
        A special assessment is a one-time charge when reserves fall short, often for a roof, a repipe, balcony
        repairs or a seismic retrofit. In one Orange County case, an SB 326 balcony inspection led to a $2.5
        million repair and an assessment of about $30,000 per unit.
      </p>
      <p>
        The warning signs usually show up first in the reserve study and the board minutes, which is why I
        read both before an offer goes firm.
      </p>

      <h3>Earthquake Insurance: Building Policy vs Your Own</h3>
      <p>
        Most master policies exclude earthquake coverage. Ask whether the building’s policy includes it and,
        if so, what the deductible is. Then ask your insurance agent about a condo earthquake policy with
        loss-assessment coverage, which helps if the HOA bills owners after a quake.
      </p>

      <h2>Financing a Condo in LA</h2>
      <p>
        With a condo, the lender approves you and often the building too. Ask your lender about condo rules
        before you start touring.
      </p>

      <h3>Warrantable vs Non-Warrantable Condos</h3>
      <p>
        A warrantable condo meets Fannie Mae and Freddie Mac rules. A building can fail those rules if one
        investor owns too many units, too many owners are behind on dues, the HOA is in litigation, there is
        too much commercial space, or the insurance is inadequate.
      </p>
      <p>
        A non-warrantable condo can still be financed, but usually with a bigger down payment, a higher rate
        or a portfolio lender.
      </p>

      <h3>FHA and VA Approval: Check the List First</h3>
      <p>
        FHA loans need the project to be FHA-approved, and VA keeps its own list of approved condos. A
        single-unit approval is sometimes possible when the building is not on the list.
      </p>

      <h3>What Your Lender Will Ask the HOA For</h3>
      <p>
        Expect a condo questionnaire, the master insurance policy, the budget, and information on delinquencies
        and lawsuits. Some HOAs charge for these and take a week or more, so order them early, because your
        loan contingency clock is already running.
      </p>
      <p>
        For down payment help such as CalHFA, see my guide{" "}
        <Link href="/blog/can-i-buy-a-house-in-los-angeles">Can I Buy a House in Los Angeles?</Link>
      </p>

      <h2>The HOA Documents to Read Before You Remove Contingencies</h2>
      <p>
        California requires the seller to provide these documents. Once you remove your contingencies, any
        problem in them becomes yours.
      </p>
      <Table label="HOA documents" head={["Document", "What to look for"]} rows={DOCUMENTS} />
      <p>Ask for the board minutes in writing. The seller only has to provide them if you request them.</p>

      <h3>How to Read a Reserve Study</h3>
      <p>
        A reserve study lists the building’s major components, how long each will last and what it will cost
        to replace. California HOAs need a full study with a site inspection at least every three years, with
        updates in between. Look at three things:
      </p>
      <ul>
        <li>
          <strong>Percent funded.</strong> Higher is better. A low number means the HOA is underfunded.
        </li>
        <li>
          <strong>Big projects due soon.</strong> A roof, repipe or elevator within five years, with thin
          reserves, points to an assessment.
        </li>
        <li>
          <strong>The funding plan.</strong> Is the board raising dues to catch up, or hoping for the best?
        </li>
      </ul>

      <h3>Board Minutes: Where the Real Problems Show Up</h3>
      <p>
        Minutes record leaks, plumbing failures, insurance increases, contractor bids, disputes between owners
        and talk of assessments. If the board discussed a $1 million repipe three months ago, you want to know
        before you remove contingencies.
      </p>

      <h3>Rental Limits, Pet Rules and Other Restrictions</h3>
      <p>
        California generally stops HOAs from banning rentals of 30 days or more, but many limit short-term
        rentals or set minimum lease terms. Also check the rules on pets, renovation approval, parking and
        storage.
      </p>

      <h3>Lawsuits and Why They Matter</h3>
      <p>
        Litigation drains reserves, raises dues and can hurt future buyers’ financing. Construction defect
        claims in particular can make a building hard to finance until they are settled.
      </p>

      <Cta title="Looking at a Condo?" label="Book a Free Consultation">
        Send me the listing. I’ll go through the HOA documents with you and flag anything that should change
        your offer.
      </Cta>

      <h2>Building Risks Specific to Los Angeles</h2>
      <p>In LA, two building issues matter more than anything inside the unit.</p>

      <h3>Soft-Story Buildings and Tuck-Under Parking</h3>
      <p>
        Older Valley buildings that sit over ground-floor parking supported by posts did poorly in past
        earthquakes. LA’s soft-story retrofit program covers older wood-frame buildings with two or more
        stories, four or more units, and weak or open ground floors. Many of them are in the Valley.
      </p>
      <p>What to check:</p>
      <ul>
        <li>
          <strong>Is the building on the city’s soft-story list?</strong> LADBS keeps the records, including a
          list of condo buildings.
        </li>
        <li>
          <strong>Is the retrofit finished and signed off?</strong> Ask for the permit and the final inspection.
        </li>
        <li>
          <strong>How was it paid for?</strong> If the work is still ahead, expect an assessment. If it is done,
          check whether the HOA borrowed to pay for it.
        </li>
      </ul>
      <p>A completed retrofit is a plus. An unfinished one is a cost to price into your offer.</p>

      <h3>SB 326 Balcony and Walkway Inspections</h3>
      <p>
        HOAs with three or more units must have balconies, walkways and stairs inspected by a licensed engineer
        or architect. The first inspection was due by January 1, 2025, then every nine years, and the seller
        must give you the latest report.
      </p>
      <p>
        Read it for immediate safety findings and recommended repairs. Then check that those repairs appear in
        the reserve study and the budget. If they do not, ask how the HOA plans to pay for them.
      </p>

      <h3>Older Buildings: Plumbing, Roofs and Elevators</h3>
      <p>Much of the Valley’s condo stock dates from the 1960s and 1970s. Ask about:</p>
      <ul>
        <li>
          <strong>Plumbing.</strong> Original galvanized or cast-iron pipes may need an expensive, disruptive
          repipe.
        </li>
        <li>
          <strong>Roof.</strong> Its age and when replacement is scheduled.
        </li>
        <li>
          <strong>Elevators.</strong> Modernization can cost hundreds of thousands of dollars.
        </li>
        <li>
          <strong>Water damage history.</strong> Leaks between units are a common source of disputes.
        </li>
      </ul>
      <p>
        Your inspector covers your unit. For the building, the reserve study, the minutes and the management
        company are your sources.
      </p>

      <h2>How to Negotiate on a Condo</h2>
      <p>
        Condos usually give buyers more room. LA County condos sold at about 95.7% of their original price in
        October 2026, against about 97.8% for houses, and they took longer to sell. The documents give you
        leverage:
      </p>
      <ul>
        <li>
          <strong>A pending special assessment.</strong> Ask the seller to pay it or credit it.
        </li>
        <li>
          <strong>Thin reserves with big projects ahead.</strong> Use the reserve study to support a lower price.
        </li>
        <li>
          <strong>An unfinished retrofit or balcony repair.</strong> Price in your likely share.
        </li>
        <li>
          <strong>Long days on market.</strong> Condos that sit accept lower offers, especially when similar
          units are listed in the same building.
        </li>
      </ul>
      <p>
        Keep the rest of the offer clean, and back your number with comps from the same building or similar
        buildings nearby. For more, see my{" "}
        <Link href="/blog/real-estate-negotiation-tips-for-buyers">real estate negotiation tips for buyers</Link>{" "}
        and my guide to{" "}
        <Link href="/blog/how-to-negotiate-after-home-inspection-in-california">
          negotiating after a home inspection
        </Link>
        .
      </p>

      <h2>Valley Village Condos: What Buyers Should Know</h2>
      <p>
        Valley Village sits between Studio City and North Hollywood, with quiet tree-lined streets, quick
        access to the 101, 134 and 170 freeways, and a Walk Score of 77. For many buyers it offers a Studio
        City lifestyle at a lower condo price.
      </p>

      <h3>Prices and HOA Dues</h3>
      <Table label="Valley Village condo prices" head={["Measure", "Recent figure"]} rows={VV_PRICES} />
      <p>
        Prices vary widely by building. A 1960s courtyard building with one parking space trades very
        differently from a newer building with a gated garage.
      </p>

      <h3>Building Types You’ll See</h3>
      <ul>
        <li>
          <strong>1960s and 1970s courtyard buildings.</strong> Often a pool and garden courtyard at a lower
          price. Check the plumbing, roof and retrofit status.
        </li>
        <li>
          <strong>Tuck-under parking buildings.</strong> Common on side streets. Confirm the soft-story retrofit
          is complete.
        </li>
        <li>
          <strong>Newer construction.</strong> Pricier, with gated parking and modern systems. There may be less
          maintenance history, so read the reserve study closely.
        </li>
      </ul>

      <h3>Who Valley Village Condos Fit</h3>
      <p>
        First-time buyers, people who want a short commute to the Burbank and Studio City studios, and buyers
        who want walkability without Studio City prices. They suit people who plan to stay five years or more.
      </p>

      <h3>Valley Village vs Studio City vs Sherman Oaks Condos</h3>
      <Table
        label="Valley Village vs Studio City vs Sherman Oaks condos"
        head={["", "Valley Village", "Studio City", "Sherman Oaks"]}
        rows={COMPARE}
      />
      <p>
        For more on the other two, see <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs Sherman Oaks</Link>,
        or read my <Link href="/real-estate-agent-in-valley-village">Valley Village neighborhood guide</Link>.
      </p>

      <h2>A Condo Escrow Timeline</h2>
      <p>
        Your contract sets the dates. Under the standard C.A.R. contract, most contingencies default to 17
        days, with extra time if the HOA documents arrive late.
      </p>
      <Table label="Condo escrow timeline" head={["Day", "What happens"]} rows={TIMELINE} />
      <p>
        The full process is in my guide to{" "}
        <Link href="/blog/how-to-buy-a-house-in-los-angeles">buying a house in Los Angeles</Link>. Most of it
        applies to condos too.
      </p>

      <h2>Mistakes Condo Buyers Make</h2>
      <ul>
        <li>
          <strong>Budgeting without the HOA.</strong> Dues affect your monthly cost and how much you can borrow.
        </li>
        <li>
          <strong>Falling for the unit and ignoring the building.</strong> The building’s finances decide your
          future costs.
        </li>
        <li>
          <strong>Skipping the board minutes.</strong> They are often where big problems first appear.
        </li>
        <li>
          <strong>Not checking retrofit status.</strong> An unfinished soft-story retrofit can mean a major
          assessment.
        </li>
        <li>
          <strong>Assuming any loan works.</strong> Check FHA approval and warrantability before you offer.
        </li>
        <li>
          <strong>Missing the rental rules.</strong> Restrictions limit your options and your future buyers.
        </li>
        <li>
          <strong>Removing contingencies before the documents arrive.</strong> Wait until you have read them.
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
        Buying a condo in Los Angeles means buying the building as carefully as the unit. Budget with the HOA
        included, confirm your financing early, read the reserve study and the minutes, and check the retrofit
        and balcony status before you remove contingencies.
      </p>
      <p>
        If you are looking at a condo in Valley Village, Studio City or Sherman Oaks, let’s review the building
        together. <Link href="/contact">Book a free consultation</Link>, or{" "}
        <Link href="/home-search">start your home search</Link>. You can also explore my guides to{" "}
        <Link href="/real-estate-agent-in-valley-village">Valley Village</Link>,{" "}
        <Link href="/real-estate-agent-in-studio-city">Studio City</Link> and{" "}
        <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks</Link>.
      </p>
    </>
  );
}

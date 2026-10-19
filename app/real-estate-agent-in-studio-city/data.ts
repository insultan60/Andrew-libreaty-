export type LifestyleItem = {
  num: string;
  title: string;
  desc: string;
  img: string;
  captionTitle: string;
  captionSub: string;
};

export const LIFESTYLE_ITEMS: LifestyleItem[] = [
  {
    num: "01",
    title: "Ventura Boulevard & the Village",
    desc: "The stretch around Ventura Place is the closest thing Studio City has to a downtown, with independent restaurants, cafes, boutiques, and a Sunday farmers market. Homes within walking distance cost more and hear some boulevard noise. I help you decide if that trade is worth it.",
    img: "/images/hero-poster.jpg",
    captionTitle: "The Village & Ventura Place",
    captionSub: "Walkable dining, independent boutiques & weekly farmers market",
  },
  {
    num: "02",
    title: "The Residential Flats",
    desc: "Quiet, tree-lined streets sit behind the boulevard. Pockets such as Colfax Meadows hold 1920s to 1950s homes on regular lots. I compare each house with sales on its own blocks, because one street can price differently from the next.",
    img: "/images/sold-studio-city.jpg",
    captionTitle: "The Tree-Lined Flats",
    captionSub: "Generous lots, peaceful residential streets & strong school boundaries",
  },
  {
    num: "03",
    title: "Hillside & Canyon Streets",
    desc: "Streets climb toward Mulholland Drive with bigger lots, views, and narrow roads. I check road access, retaining walls, and fire insurance early, so you have no surprises after you fall for a view.",
    img: "/images/laurel-canyon.jpg",
    captionTitle: "Hillside & Canyon Enclaves",
    captionSub: "Expansive valley views, secluded lots & celebrated architecture",
  },
  {
    num: "04",
    title: "Parks & Outdoor Access",
    desc: "Wilacre Park, Fryman Canyon Park, and Beeman Park are close, and a path runs along the LA River on the north side. I show you how close each home is, and how that shows up in the price.",
    img: "/images/hollywood-hills.jpg",
    captionTitle: "Fryman Canyon & Trailheads",
    captionSub: "Immediate access to hiking, Wilacre Park, and community green spaces",
  },
  {
    num: "05",
    title: "Commute & Connectivity",
    desc: "The 101 freeway, Ventura Boulevard, and the Metro B Line station link you to Burbank, Hollywood, and downtown. Laurel Canyon Boulevard crosses to West Hollywood. I help you test your real commute before you offer.",
    img: "/images/hero-la-aerial.jpg",
    captionTitle: "Canyon Routes to the Westside",
    captionSub: "Direct routes over Laurel and Coldwater into Beverly Hills & Hollywood",
  },
  {
    num: "06",
    title: "Entertainment Industry Access",
    desc: "Mack Sennett built a studio here in 1927, and today it is Radford Studio Center, formerly CBS Studio Center. If you work in film, TV, or music, I help you weigh the Universal City and Burbank commute.",
    img: "/images/sold-toluca-lake.jpg",
    captionTitle: "Historic Entertainment Heritage",
    captionSub: "Radford Studio Center and the Burbank studio corridor minutes away",
  },
];

export type FaqItem = {
  q: string;
  a: string;
};

/* Questions and answers from the October 2026 content brief, in its order.
   The market figures are dated (Zillow and Resideline, October 2026) and go
   stale: refresh them, or the page quotes last season's market. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I choose a real estate agent in Studio City?",
    a: "Ask how many Studio City homes the agent sold in the last 12 months, and which sales they would use to price yours. Ask for proof, not titles like “top” or “best.” Check licenses, reviews, and how clearly they explain each step.",
  },
  {
    q: "How do I choose an agent as a first-time buyer in Studio City?",
    a: "Pick someone who explains the process in plain words and shows you both condos and houses. Studio City condos often cost less than houses, so compare both before you decide.",
  },
  {
    q: "How much does a real estate agent cost in Studio City?",
    a: "Agent fees are negotiable. Total commissions often run about 5% to 6% of the sale price. Ask for the fee in writing before you sign.",
  },
  {
    q: "How much does a home cost in Studio City?",
    a: "Zillow shows a median sale price near $1.64 million, and Resideline shows about $1.78 million over the last six months in ZIP 91604. Condos often start in the $600,000s to $700,000s, and houses often start near $1 million. Hillside and luxury homes reach $3 million and up.",
  },
  {
    q: "How do I find my home’s value before I sell a house in Studio City?",
    a: "Start with recent sales from your own pocket. Then adjust for lot size, view, condition, and updates. I do this in a free valuation. Online estimates often miss these details.",
  },
  {
    q: "What should sellers know about the current market?",
    a: "On October 5, 2026, Resideline counted 64 active listings and 3 pending sales in ZIP 91604, which it reads as a balanced market. Zillow shows homes going pending in about 40 days. Asking prices run above sold prices, so price against recent sales, not other listings.",
  },
  {
    q: "What types of homes can I buy in Studio City, and where?",
    a: "Mostly single-family houses: traditional and ranch homes in the flats, and mid-century and modern homes in the hills. Condos and townhomes sit near Ventura Boulevard, and duplexes and small apartment buildings sit near the boulevard and the eastern edge.",
  },
  {
    q: "How does Studio City compare with Sherman Oaks?",
    a: "Studio City often costs more and has a village feel along Ventura Boulevard. Sherman Oaks often costs less, and Ventura splits it into flat streets to the north and hills to the south.",
  },
  {
    q: "What is the ZIP code for Studio City, and is it part of LA?",
    a: "The main ZIP code is 91604. Some blocks use 91602 or 91607. Yes, Studio City is a neighborhood in the City of Los Angeles, just west of the Cahuenga Pass.",
  },
];

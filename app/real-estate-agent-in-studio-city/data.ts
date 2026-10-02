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
    desc: "The commercial spine. The stretch around Ventura Place is the closest thing Studio City has to a downtown — independent restaurants, cafés, boutiques and the Sunday farmers market. Homes within walking distance carry a premium, and also carry boulevard noise on the streets closest in.",
    img: "/images/hero-poster.jpg",
    captionTitle: "The Village & Ventura Place",
    captionSub: "Walkable dining, independent boutiques & weekly farmers market",
  },
  {
    num: "02",
    title: "The Residential Flats",
    desc: "North of Ventura, the grid flattens into wide, tree-canopied streets with generous lots. This is where most family buyers concentrate, and where school boundaries do the most work on price.",
    img: "/images/sold-studio-city.jpg",
    captionTitle: "The Tree-Lined Flats",
    captionSub: "Generous lots, peaceful residential streets & strong school boundaries",
  },
  {
    num: "03",
    title: "Hillside & Canyon Streets",
    desc: "South of Ventura the land climbs toward Mulholland. Winding streets, view lots, more architectural inventory, more privacy — and more to check on: access, grading, slope, insurance and brush clearance.",
    img: "/images/laurel-canyon.jpg",
    captionTitle: "Hillside & Canyon Enclaves",
    captionSub: "Expansive valley views, secluded lots & celebrated architecture",
  },
  {
    num: "04",
    title: "Parks & Outdoor Access",
    desc: "Fryman Canyon and Wilacre Park put real trail access minutes from the boulevard. Beeman Park serves the flats, and the LA River greenway continues to expand on the north edge.",
    img: "/images/hollywood-hills.jpg",
    captionTitle: "Fryman Canyon & Trailheads",
    captionSub: "Immediate access to hiking, Wilacre Park, and community green spaces",
  },
  {
    num: "05",
    title: "Commute & Connectivity",
    desc: "Laurel Canyon and Coldwater Canyon cross to the Westside and Hollywood; the 101 runs along the north side. Which canyon route you're nearest to meaningfully changes your commute.",
    img: "/images/hero-la-aerial.jpg",
    captionTitle: "Canyon Routes to the Westside",
    captionSub: "Direct routes over Laurel and Coldwater into Beverly Hills & Hollywood",
  },
  {
    num: "06",
    title: "Entertainment Industry Access",
    desc: "CBS Studio Center sits inside the neighborhood, with Universal, Warner Bros. and Disney a short drive away. That proximity has shaped the buyer pool here for decades.",
    img: "/images/sold-toluca-lake.jpg",
    captionTitle: "Historic Entertainment Heritage",
    captionSub: "CBS Studio Center and Burbank studio corridor minutes away",
  },
];

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is Studio City known for?",
    a: "A walkable stretch of Ventura Boulevard, quiet tree-lined residential flats, hillside streets climbing toward Mulholland, and a long-standing connection to the entertainment industry through CBS Studio Center and the nearby studios.",
  },
  {
    q: "What types of homes are available in Studio City?",
    a: "Predominantly single-family: 1920s—40s character homes and postwar ranches in the flats, mid-century and contemporary architectural homes in the hills. Condos, townhomes and small multifamily buildings cluster near the boulevard.",
  },
  {
    q: "What are the main neighborhoods within Studio City?",
    a: "The pockets buyers ask about most are Colfax Meadows, Beeman Park, Tujunga Village, Silver Triangle, Wrightwood Estates, Fryman Canyon Estates, Longridge Estates and Footbridge Square. Each has a distinct character and price range.",
  },
  {
    q: "How much does a home cost in Studio City?",
    a: "Median sale price currently sits around $1,895,000 — but the spread is wide. Flats homes and hillside architectural properties occupy different price worlds, so a neighborhood-level median is a starting point, not an answer for a specific address.",
  },
  {
    q: "What affects Studio City home values most?",
    a: "Street and pocket, verified school boundary, usable lot, condition and permit history, architecture, views, privacy and the accuracy of the comparable set used to price it.",
  },
  {
    q: "What should I know before buying here?",
    a: "Confirm permitted square footage and the school boundary for the exact address, understand noise exposure from Ventura and the 101, and on hillside properties budget time for geology, drainage and access review.",
  },
  {
    q: "How do I determine my home's value?",
    a: "Start with a pocket-level comparable analysis rather than an automated estimate. Request a valuation and you'll get the comps used, the adjustments applied and the reasoning behind the range.",
  },
  {
    q: "How does Studio City compare with Sherman Oaks?",
    a: "Studio City is more compact and village-like with better trail access; Sherman Oaks is more spread out with a wider range of lot sizes and price points. Both are established markets — the right one depends on how you want daily life to work.",
  },
  {
    q: "What should sellers know about the current market?",
    a: "With days on market up and sale-to-list just under 100%, accurate launch pricing matters more than it did at the peak. Homes priced into the band buyers are searching are still performing; homes priced above it are sitting and then reducing.",
  },
  {
    q: "Do I need a local agent to buy or sell in Studio City?",
    a: "It helps materially. Pricing shifts block by block here, and school boundaries don't follow neighborhood edges. An agent working this specific market prices, positions and negotiates against the right comparable set.",
  },
];

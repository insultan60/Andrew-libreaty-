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

/* November 2026 (v2) brief. Grouped and rendered open on the page, so every
   answer is in the HTML; FAQPage schema is built from the same list. Market
   figures are dated: refresh them with the Market Snapshot table. */
export type FaqGroup = { title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Choosing an Agent",
    items: [
      {
        q: "What should I look for in a real estate agent in Studio City?",
        a: "Ask for recent Studio City sales that match your home type and price range, and ask how the agent decides on a list price in your specific pocket. Check licenses and reviews, and meet at least two agents. I’m a Certified Real Estate Negotiation Expert with a commercial real estate background, and I’m happy to show you the sales behind any recommendation.",
      },
      {
        q: "Do I need a buyer’s agent in Studio City?",
        a: "It helps. An agent can read HOA documents on a condo, check permits and slope on a hillside lot, and negotiate repairs when inspections turn up problems.",
      },
    ],
  },
  {
    title: "The Area",
    items: [
      { q: "Is Studio City part of LA?", a: "Yes. Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley." },
      {
        q: "What is the ZIP code for Studio City?",
        a: "Most of Studio City uses ZIP code 91604, including addresses written as “Studio City, CA 91604.” Some blocks near the edges use 91602 or 91607, so confirm the exact address.",
      },
      {
        q: "Which schools serve Studio City homes?",
        a: "It depends on the address. Carpenter Community Charter, Rio Vista Elementary and Walter Reed Middle School are Studio City schools, and some addresses are zoned for nearby schools in Sherman Oaks or Valley Village. Verify the assignment with LAUSD before you make an offer.",
      },
      {
        q: "How does Studio City compare with Sherman Oaks?",
        a: "Studio City is smaller and more village-like, with a compact walkable center and hillside pockets to the south. Sherman Oaks is larger and splits into two very different markets on either side of Ventura Boulevard.",
      },
    ],
  },
  {
    title: "Buying",
    items: [
      {
        q: "How much does a home cost in Studio City?",
        a: "It depends on the type and the date. Recent sources put the median sale price between about $1.45 million and $1.81 million depending on the time window, with houses at roughly $2.34 million and condos mostly below $1 million. See the Market Snapshot above for each figure and its source.",
      },
      {
        q: "How much do Studio City condos cost?",
        a: "The average condo sold for about $873,000 over the past year, with one-bedroom medians near $540,000 and two-bedroom medians near $770,000. Always compare monthly dues and building finances, not just the price.",
      },
      {
        q: "Are Studio City homes at risk of wildfire?",
        a: "Some are, especially in the hills. Redfin’s Fire Factor rating for Studio City is moderate, with roughly 42% of properties facing some wildfire risk over the next 30 years. Risk varies by street, vegetation and road access, so I recommend getting an insurance quote before you commit to a hillside home.",
      },
    ],
  },
  {
    title: "Selling",
    items: [
      {
        q: "How do I find my Studio City home’s value?",
        a: "Start with recent sales on your own block or in your own building, then adjust for condition, updates and lot. Online estimates miss those details. I offer a free personal review that includes them.",
      },
      {
        q: "How long does it take to sell a house in Studio City?",
        a: "Recent data shows a median of about 70 days on the market (Redfin, September 2026) and about 40 days to pending (Zillow, August 2026). Pricing, condition and timing drive where your home lands in that range.",
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);

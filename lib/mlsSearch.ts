/* Full-MLS search links.
 *
 * The site's own listing feed (clients/featured + clients/soldpending) is only
 * Andrew's handful of homes, so filtering it can never answer "3 bed houses in
 * Sherman Oaks under $2M". The IDX Broker account does carry the whole MLS
 * (CLAW, idxID e025) on its hosted results page, which takes the filters as
 * query parameters. Every "search the MLS" control on the site builds its link
 * here, so the filters a visitor picks are the filters the MLS search runs.
 *
 *   idxID=e025  pt=1 sale | 11 lease | 10 income (multi-family) | 7 land
 *   ccz=city&city[]=<id>  or  ccz=zipcode&zipcode[]=<zip>  (can't mix: the
 *   page ANDs them)  lp/hp price  bd beds  tb baths  sqft  a_propSubType[]
 *   srt newest | pra | prd | bdd | sqftd
 */

import { MLS_CITY_IDS } from "./mlsCities";
import type { AreaKey } from "./areas";

export const MLS_RESULTS_URL = "https://andrewliberty.idxbroker.com/idx/results/listings";
const MLS_ID = "e025";
const LOS_ANGELES = MLS_CITY_IDS["Los Angeles"];

type Where = { cities: number[]; zips: string[]; label: string };

/* Neighborhoods the MLS does not file as cities, and the site's own area
   keys. Hollywood Hills and Laurel Canyon homes are mostly filed under city
   "Los Angeles", so they search by ZIP (the "Hollywood Hills" city has a
   handful of listings at most). */
const AREA_WHERE: Record<AreaKey, Where> = {
  "studio-city": { cities: [MLS_CITY_IDS["Studio City"]], zips: [], label: "Studio City" },
  "sherman-oaks": { cities: [MLS_CITY_IDS["Sherman Oaks"]], zips: [], label: "Sherman Oaks" },
  "valley-village": { cities: [MLS_CITY_IDS["Valley Village"]], zips: [], label: "Valley Village" },
  "laurel-canyon": { cities: [], zips: ["90046"], label: "Laurel Canyon (90046)" },
  "hollywood-hills": { cities: [], zips: ["90068", "90046", "90069"], label: "Hollywood Hills" },
};

const ALIASES: Record<string, Where> = {
  "hollywood hills": AREA_WHERE["hollywood-hills"],
  "hollywood hills west": { cities: [], zips: ["90046", "90069"], label: "Hollywood Hills West" },
  "laurel canyon": AREA_WHERE["laurel-canyon"],
  la: { cities: [LOS_ANGELES], zips: [], label: "Los Angeles" },
  "l.a.": { cities: [LOS_ANGELES], zips: [], label: "Los Angeles" },
  noho: { cities: [MLS_CITY_IDS["North Hollywood"]], zips: [], label: "North Hollywood" },
  "toluca lake": { cities: [MLS_CITY_IDS["Toluca Lake"]], zips: [], label: "Toluca Lake" },
};

/* Neighborhoods inside the City of Los Angeles. The MLS has "city" entries
   for some of them (Silver Lake, Los Feliz, Westwood...) but agents file
   almost every listing as "Los Angeles", so those return 0-4 homes. Their
   ZIP codes find the real inventory. */
const LA_NEIGHBORHOOD_ZIPS: Record<string, string[]> = {
  hollywood: ["90028", "90038"],
  "hollywood hills east": ["90068"],
  "beachwood canyon": ["90068"],
  "silver lake": ["90026", "90039"],
  silverlake: ["90026", "90039"],
  "echo park": ["90026"],
  "los feliz": ["90027"],
  "atwater village": ["90039"],
  "bel air": ["90077"],
  "bel-air": ["90077"],
  "mar vista": ["90066"],
  "del rey": ["90066"],
  palms: ["90034"],
  "eagle rock": ["90041"],
  "highland park": ["90042"],
  "glassell park": ["90065"],
  "mount washington": ["90065"],
  "mt washington": ["90065"],
  "cypress park": ["90065"],
  "el sereno": ["90032"],
  "lincoln heights": ["90031"],
  "montecito heights": ["90031"],
  "boyle heights": ["90033"],
  westwood: ["90024"],
  westchester: ["90045"],
  "west los angeles": ["90025"],
  "west la": ["90025"],
  sawtelle: ["90025"],
  "hancock park": ["90004"],
  larchmont: ["90004"],
  koreatown: ["90005", "90006", "90010", "90020"],
  "mid-city": ["90019"],
  "mid city": ["90019"],
  fairfax: ["90036", "90048"],
  "beverly grove": ["90048"],
  "cheviot hills": ["90064"],
  beverlywood: ["90035"],
  "leimert park": ["90008"],
  "baldwin hills": ["90008"],
  crenshaw: ["90008", "90043"],
  "west adams": ["90016", "90018"],
  downtown: ["90012", "90013", "90014", "90015", "90017", "90021", "90071"],
  dtla: ["90012", "90013", "90014", "90015", "90017", "90021", "90071"],
  "downtown los angeles": ["90012", "90013", "90014", "90015", "90017", "90021", "90071"],
  "valley glen": ["91401"],
};
for (const [name, zips] of Object.entries(LA_NEIGHBORHOOD_ZIPS)) {
  ALIASES[name] ??= {
    cities: [],
    zips,
    label: name.replace(/\b[a-z]/g, (c) => c.toUpperCase()),
  };
}

const CITY_BY_LOWER = new Map(Object.entries(MLS_CITY_IDS).map(([name, id]) => [name.toLowerCase(), { name, id }]));

/** Turn free text ("Studio City", "91604", "Encino, Sherman Oaks") into MLS
 *  location filters. `unmatched` lists the parts it could not place. */
export function resolveLocation(text: string): Where & { unmatched: string[] } {
  const parts = text
    .split(/,|;|\/|\bor\b|&/i)
    .map((p) => p.trim().replace(/\s+(ca|california)$/i, "").trim())
    .filter((p) => p && !/^(ca|california|usa)$/i.test(p));
  const cities: number[] = [];
  const zips: string[] = [];
  const labels: string[] = [];
  const unmatched: string[] = [];
  for (const raw of parts) {
    const p = raw.toLowerCase().replace(/\s+/g, " ");
    const zip = p.match(/\b\d{5}\b/);
    const alias = ALIASES[p] ?? (p.replace(/ /g, "-") in AREA_WHERE ? AREA_WHERE[p.replace(/ /g, "-") as AreaKey] : undefined);
    const city = CITY_BY_LOWER.get(p);
    if (zip) {
      zips.push(zip[0]);
      labels.push(zip[0]);
    } else if (alias) {
      cities.push(...alias.cities);
      zips.push(...alias.zips);
      labels.push(alias.label);
    } else if (city) {
      cities.push(city.id);
      labels.push(city.name);
    } else {
      unmatched.push(raw);
    }
  }
  return { cities: [...new Set(cities)], zips: [...new Set(zips)], label: labels.join(", "), unmatched };
}

export type MlsQuery = {
  /** Free-text location; ignored when `area` is set. */
  location?: string;
  area?: AreaKey | "";
  rent?: boolean;
  priceMin?: number | null;
  priceMax?: number | null;
  beds?: number;
  baths?: number;
  sqft?: number;
  /** The site's type names: House, Condo, Townhouse, Multi-Family, Land. */
  types?: string[];
  sort?: string;
};

const SUBTYPES: Record<string, string[]> = {
  House: ["Single Family Residence"],
  Condo: ["Condominium", "Stock Cooperative"],
  Townhouse: ["Townhouse"],
  "Multi-Family": ["Duplex", "Triplex", "Quadruplex"],
};
const SORTS: Record<string, string> = {
  newest: "newest",
  "price-desc": "prd",
  "price-asc": "pra",
  "beds-desc": "bdd",
  "sqft-desc": "sqftd",
};

/** The full-MLS results URL for a set of filters, plus a readable place name.
 *  With no location given (or none recognised) it searches the City of Los
 *  Angeles, the agent's market, rather than the whole state. */
export function mlsSearch(q: MlsQuery): { url: string; place: string; unmatched: string[] } {
  let where: Where & { unmatched: string[] };
  if (q.area) where = { ...AREA_WHERE[q.area], unmatched: [] };
  else where = resolveLocation(q.location ?? "");
  if (!where.cities.length && !where.zips.length) {
    where = { cities: [LOS_ANGELES], zips: [], label: "Los Angeles", unmatched: where.unmatched };
  }

  const p = new URLSearchParams();
  p.set("idxID", MLS_ID);

  const types = q.types ?? [];
  const homeTypes = types.filter((t) => SUBTYPES[t]);
  let pt = "1";
  if (q.rent) pt = "11";
  else if (types.length === 1 && types[0] === "Land") pt = "7";
  p.set("pt", pt);

  // The page ANDs city and ZIP, so send one kind. ZIPs are the narrower ask.
  if (where.zips.length) {
    p.set("ccz", "zipcode");
    for (const z of where.zips) p.append("zipcode[]", z);
  } else {
    p.set("ccz", "city");
    for (const c of where.cities) p.append("city[]", String(c));
  }

  if (q.priceMin) p.set("lp", String(q.priceMin));
  if (q.priceMax) p.set("hp", String(q.priceMax));
  if (q.beds) p.set("bd", String(q.beds));
  if (q.baths) p.set("tb", String(q.baths));
  if (q.sqft) p.set("sqft", String(q.sqft));
  if (pt !== "7") for (const t of homeTypes) for (const s of SUBTYPES[t]) p.append("a_propSubType[]", s);
  p.set("srt", SORTS[q.sort ?? ""] ?? "newest");

  const url = MLS_RESULTS_URL + "?" + p.toString().replace(/%5B%5D/g, "[]");
  return { url, place: where.label, unmatched: where.unmatched };
}

/** Every active MLS listing in one of the site's neighborhoods. */
export function mlsAreaUrl(area: AreaKey): string {
  return mlsSearch({ area }).url;
}

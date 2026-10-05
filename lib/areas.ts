/** Neighborhood matching for IDX listings.
 *
 * The neighborhood pages want to show what has actually closed nearby, but
 * IDX has no "neighborhood" field — only cityName, zipcode and a lat/lon.
 * How well those identify a neighborhood varies, so the matching does too:
 *
 *  - Studio City, Sherman Oaks and Valley Village are cities as far as the
 *    MLS is concerned, so cityName identifies them. Zip is checked as well
 *    because the feed is not consistent: 3377 and 3378 Canton Lane are two
 *    sides of the same street, and the first is filed under "Los Angeles"
 *    while the second is filed under "Studio City". Both are 91604. Matching
 *    on city alone drops one of them.
 *
 *  - Laurel Canyon and the Hollywood Hills are not MLS cities and their zips
 *    do not describe them. 90046 covers the canyon and a large piece of the
 *    Fairfax flats below it — 735 N Stanley Avenue is a 90046 sale sitting at
 *    latitude 34.0848, about two and a half miles south of the canyon proper.
 *    Calling that a Laurel Canyon comp would be wrong, so these two match on
 *    a coordinate box instead.
 *
 * The boxes are deliberately conservative and the two do not overlap: the
 * ridge line at longitude -118.360 splits them, which is the same "just over
 * the ridge" the page copy describes. They are approximations of neighborhood
 * lines that are themselves informally drawn, so treat them as tunable — if
 * a closing shows up on the wrong page, it is these four numbers to adjust.
 */

import type { RawIdxListing } from "@/lib/idx";

type Box = { minLat: number; maxLat: number; minLon: number; maxLon: number };

type Area = {
  /** Matched against IDX cityName. Empty for areas the MLS does not name. */
  cities: string[];
  /** Matched against IDX zipcode. */
  zips: string[];
  /** When present, a listing must fall inside this box — city/zip alone
   *  is not specific enough for the area to claim it. */
  box?: Box;
};

export const AREAS = {
  "studio-city": { cities: ["Studio City"], zips: ["91604"] },
  "sherman-oaks": { cities: ["Sherman Oaks"], zips: ["91403", "91423"] },
  "valley-village": { cities: ["Valley Village"], zips: ["91607"] },
  "laurel-canyon": {
    cities: [],
    zips: ["90046"],
    box: { minLat: 34.098, maxLat: 34.14, minLon: -118.395, maxLon: -118.36 },
  },
  "hollywood-hills": {
    cities: [],
    zips: ["90068", "90046"],
    box: { minLat: 34.098, maxLat: 34.145, minLon: -118.36, maxLon: -118.31 },
  },
} as const satisfies Record<string, Area>;

export type AreaKey = keyof typeof AREAS;

function inBox(raw: RawIdxListing, box: Box): boolean {
  const lat = Number(raw.latitude);
  const lon = Number(raw.longitude);
  // A listing with no usable coordinates cannot be placed, and for these
  // areas the zip is not enough on its own — so it is left out rather than
  // attributed to a neighborhood it may not be in.
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
  return lat >= box.minLat && lat <= box.maxLat && lon >= box.minLon && lon <= box.maxLon;
}

/** Display names, for the home search's area chip and heading. */
export const AREA_LABELS: Record<AreaKey, string> = {
  "studio-city": "Studio City",
  "sherman-oaks": "Sherman Oaks",
  "valley-village": "Valley Village",
  "laurel-canyon": "Laurel Canyon",
  "hollywood-hills": "Hollywood Hills",
};

export function isAreaKey(v: unknown): v is AreaKey {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(AREAS, v);
}

/** Is this listing in the given neighborhood? */
export function inArea(raw: RawIdxListing, key: AreaKey): boolean {
  const area: Area = AREAS[key];
  const nearby =
    area.zips.includes(raw.zipcode) || area.cities.includes(raw.cityName);
  if (!nearby) return false;
  return area.box ? inBox(raw, area.box) : true;
}

/** Every area a listing falls in (most fall in none or one). */
export function areasOf(raw: RawIdxListing): AreaKey[] {
  return (Object.keys(AREAS) as AreaKey[]).filter((k) => inArea(raw, k));
}

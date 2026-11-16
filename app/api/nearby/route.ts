import { NextRequest, NextResponse } from "next/server";

/*
 * Nearby places for a listing (groceries, schools, transit…), from
 * OpenStreetMap via the public Overpass API. Runs on the server so that:
 *  - several Overpass servers can be tried in turn (the public ones are often
 *    busy and answer 502/504), and
 *  - each location's answer is cached for a week (fetch revalidate plus a CDN
 *    s-maxage), so one slow Overpass call serves every visitor to that home.
 */

const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];
const WEEK = 60 * 60 * 24 * 7;
const RADIUS = 1600; // metres

function query(lat: number, lng: number) {
  const a = `(around:${RADIUS},${lat},${lng})`;
  return `[out:json][timeout:20];(` +
    `nwr["shop"~"^(supermarket|grocery|greengrocer|health_food|mall|department_store|clothes|shoes|boutique|books|gift|jewelry)$"]["name"]${a};` +
    `nwr["amenity"~"^(restaurant|cafe|school|kindergarten|childcare)$"]["name"]${a};` +
    `nwr["leisure"~"^(park|fitness_centre)$"]["name"]${a};` +
    `node["highway"="bus_stop"]${a};` +
    `nwr["railway"="station"]${a};` +
    `);out center tags;`;
}

type El = { type: string; id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> };

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get("lat"));
  const lng = Number(req.nextUrl.searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }
  // Round to ~10 m so the cache key is stable for the same home.
  const q = query(Number(lat.toFixed(4)), Number(lng.toFixed(4)));

  for (const mirror of MIRRORS) {
    try {
      const res = await fetch(`${mirror}?data=${encodeURIComponent(q)}`, {
        headers: { "User-Agent": "andrewliberty.com nearby-places" },
        signal: AbortSignal.timeout(15000),
        next: { revalidate: WEEK },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { elements?: El[] };
      if (!Array.isArray(data.elements)) continue;
      // Only what the page needs: position, name and the category tags.
      const elements = data.elements.map((e) => {
        const t = e.tags ?? {};
        const keep: Record<string, string> = {};
        for (const k of ["name", "shop", "amenity", "leisure", "highway", "railway", "public_transport"]) if (t[k]) keep[k] = t[k];
        return { type: e.type, id: e.id, lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon, tags: keep };
      });
      return NextResponse.json(
        { elements },
        { headers: { "Cache-Control": `public, max-age=86400, s-maxage=${WEEK}, stale-while-revalidate=${WEEK}` } },
      );
    } catch {
      // Timed out or unreachable: try the next server.
    }
  }
  return NextResponse.json({ error: "Nearby places are unavailable right now" }, { status: 503, headers: { "Cache-Control": "no-store" } });
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";

/*
 * "What's nearby" for a listing: groceries, restaurants, schools, transit and
 * the rest within about a 20-minute walk, from OpenStreetMap through the free
 * Overpass API, through /api/nearby (cached per home for a week). Fetched
 * only when the section scrolls into view. Our own stand-in for the Local Logic panel on the IDX pages,
 * which needs its own Local Logic licence.
 */

const WALK_M_PER_MIN = 80;

type Cat = { key: string; label: string; icon: string; match: (t: Record<string, string>) => boolean };

const CATS: Cat[] = [
  { key: "groceries", label: "Groceries", icon: "🛒", match: (t) => /^(supermarket|grocery|greengrocer|health_food)$/.test(t.shop ?? "") },
  { key: "restaurants", label: "Restaurants", icon: "🍽️", match: (t) => t.amenity === "restaurant" },
  { key: "cafes", label: "Cafes", icon: "☕", match: (t) => t.amenity === "cafe" },
  { key: "shopping", label: "Shopping", icon: "🛍️", match: (t) => /^(mall|department_store|clothes|shoes|boutique|books|gift|jewelry)$/.test(t.shop ?? "") },
  { key: "parks", label: "Parks", icon: "🌳", match: (t) => t.leisure === "park" },
  { key: "fitness", label: "Gyms", icon: "🏋️", match: (t) => t.leisure === "fitness_centre" },
  { key: "schools", label: "Schools", icon: "🏫", match: (t) => t.amenity === "school" },
  { key: "daycares", label: "Daycares", icon: "🧸", match: (t) => t.amenity === "kindergarten" || t.amenity === "childcare" },
  { key: "transit", label: "Transit", icon: "🚌", match: (t) => t.highway === "bus_stop" || t.railway === "station" || t.public_transport === "station" },
];

type Place = { id: string; name: string; lat: number; lng: number; dist: number; cat: string };

function metres(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const walk = (m: number) => {
  const min = Math.max(1, Math.round(m / WALK_M_PER_MIN));
  return min > 25 ? `${(m / 1609).toFixed(1)} mi` : `${min} min walk`;
};

export default function NearbyPlaces({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const leafletRef = useRef<typeof L | null>(null);
  const [visible, setVisible] = useState(false);
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(CATS[0].key);

  // Wait until the section is near the screen before calling Overpass.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        io.disconnect();
      }
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const ctrl = new AbortController();
    fetch(`/api/nearby?lat=${lat}&lng=${lng}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { elements: { type: string; id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> }[] }) => {
        const out: Place[] = [];
        for (const el of data.elements) {
          const t = el.tags ?? {};
          const pLat = el.lat ?? el.center?.lat;
          const pLng = el.lon ?? el.center?.lon;
          if (pLat == null || pLng == null) continue;
          const cat = CATS.find((c) => c.match(t));
          if (!cat) continue;
          const name = t.name || (cat.key === "transit" ? "Bus stop" : "");
          if (!name) continue;
          out.push({ id: `${el.type}${el.id}`, name, lat: pLat, lng: pLng, dist: metres(lat, lng, pLat, pLng), cat: cat.key });
        }
        out.sort((a, b) => a.dist - b.dist);
        setPlaces(out);
      })
      .catch((e) => {
        if (!ctrl.signal.aborted) setFailed(true);
        void e;
      });
    return () => ctrl.abort();
  }, [visible, lat, lng]);

  const byCat = useMemo(() => {
    const m: Record<string, Place[]> = {};
    for (const c of CATS) m[c.key] = [];
    for (const p of places ?? []) {
      // One entry per name, so a chain's many bus stops don't flood the list.
      if (!m[p.cat].some((q) => q.name === p.name)) m[p.cat].push(p);
    }
    return m;
  }, [places]);

  // Map: created once the section is visible.
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let ro: ResizeObserver | undefined;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      leafletRef.current = leaflet;
      const map = leaflet.map(mapEl.current, { zoomControl: false, scrollWheelZoom: false }).setView([lat, lng], 15);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 })
        .addTo(map);
      leaflet
        .marker([lat, lng], {
          icon: leaflet.divIcon({ className: "pd-pin-wrap", html: `<span class="pd-pin">${label.replace(/[<>&"]/g, "")}</span>`, iconSize: [0, 0] }),
          zIndexOffset: 1000,
        })
        .addTo(map);
      layerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(mapEl.current);
    })();
    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [visible, lat, lng, label]);

  // Pins for the selected category.
  const shown = useMemo(() => byCat[active] ?? [], [byCat, active]);
  useEffect(() => {
    const leaflet = leafletRef.current;
    const layer = layerRef.current;
    const map = mapRef.current;
    if (!leaflet || !layer || !map) return;
    layer.clearLayers();
    const icon = CATS.find((c) => c.key === active)?.icon ?? "•";
    const pts: [number, number][] = [[lat, lng]];
    shown.slice(0, 12).forEach((p) => {
      leaflet
        .marker([p.lat, p.lng], {
          icon: leaflet.divIcon({ className: "nb-pin-wrap", html: `<span class="nb-pin" title="${p.name.replace(/[<>&"]/g, "")}">${icon}</span>`, iconSize: [0, 0] }),
        })
        .bindTooltip(`${p.name} · ${walk(p.dist)}`)
        .addTo(layer);
      pts.push([p.lat, p.lng]);
    });
    if (pts.length > 1) map.fitBounds(leaflet.latLngBounds(pts), { padding: [40, 40], maxZoom: 16 });
    else map.setView([lat, lng], 15);
  }, [active, shown, lat, lng, places]);

  return (
    <section ref={sectionRef} className="pd-section nb" id="nearby">
      <h2 className="pd-section-title">What&rsquo;s Nearby</h2>
      <div className="nb-grid">
        <div className="nb-side">
          <ul className="nb-cats" role="tablist" aria-label="Nearby place categories">
            {CATS.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === c.key}
                  className={`nb-cat${active === c.key ? " is-active" : ""}`}
                  onClick={() => setActive(c.key)}
                >
                  <span aria-hidden="true">{c.icon}</span>
                  {c.label}
                  <em>{places ? byCat[c.key].length : ""}</em>
                </button>
              </li>
            ))}
          </ul>
          <ol className="nb-list" aria-live="polite">
            {failed ? (
              <li className="nb-note">Nearby places couldn&rsquo;t load right now. Try again in a moment.</li>
            ) : !places ? (
              <li className="nb-note">Loading nearby places…</li>
            ) : shown.length === 0 ? (
              <li className="nb-note">None found within about a mile.</li>
            ) : (
              shown.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <span>{p.name}</span>
                  <em>{walk(p.dist)}</em>
                </li>
              ))
            )}
          </ol>
        </div>
        <div ref={mapEl} className="pd-map nb-map" />
      </div>
      <p className="nb-credit">Places from OpenStreetMap contributors. Walking times are estimates.</p>
    </section>
  );
}

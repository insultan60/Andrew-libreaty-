"use client";

import { useEffect, useRef } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTR = "&copy; OpenStreetMap contributors";

export default function PropertyMap({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | undefined;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;
      const map = leaflet
        .map(elRef.current, { zoomControl: false, scrollWheelZoom: false })
        .setView([lat, lng], 15);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      leaflet.tileLayer(OSM_URL, { attribution: OSM_ATTR, maxZoom: 19 }).addTo(map);
      const icon = leaflet.divIcon({
        className: "pd-pin-wrap",
        html: `<span class="pd-pin">${label.replace(/[<>&"]/g, "")}</span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      leaflet.marker([lat, lng], { icon }).addTo(map);
      mapRef.current = map;
      ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(elRef.current);
    })();
    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label]);

  return <div ref={elRef} className="pd-map" />;
}

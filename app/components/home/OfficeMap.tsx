"use client";

import { useMemo } from "react";
import MapPanel, { type OfficeMarker } from "../../home-search/MapPanel";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toListing } from "@/lib/idx";

const OFFICE: OfficeMarker = { lat: 34.1479, lng: -118.396, label: "Andrew Liberty Team" };

export default function OfficeMap() {
  const { data } = useIdxListings();
  const sold = useMemo(
    () => (data ?? []).map((raw, i) => toListing(raw, i)).filter((l) => l.status === "Sold"),
    [data]
  );

  return (
    <section className="contact-map-band" id="office-map">
      <div className="container">
        <div className="contact-map-head">
          <p className="eyebrow">Find Us</p>
          <h2 className="contact-map-title">Visit the Office</h2>
          <p className="contact-map-addr">12001 Ventura Pl Ste 100, Studio City, CA 91604</p>
        </div>
        <div className="office-map-frame">
          <MapPanel
            items={sold}
            mapType="map"
            officeMarker={OFFICE}
            onOpen={(l) => {
              window.location.href = `/${l.slug}`;
            }}
          />
        </div>
      </div>
    </section>
  );
}

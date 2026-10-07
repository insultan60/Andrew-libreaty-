import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Neighborhoods — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "The Los Angeles neighborhoods the Andrew Liberty Team knows best — Studio City, Laurel Canyon, the Hollywood Hills, Sherman Oaks, Valley Village and Pasadena.",
  alternates: { canonical: "/neighborhoods" },
};

/* Places, not properties. The band under "Neighborhoods" shows four views that
   are recognisably Los Angeles, and none of them repeat anywhere else on the
   site — an earlier version reused three of the grid's own photos and the
   homepage hero frame, so the page showed the same pictures twice.

   Free stock from Unsplash (Unsplash License: free for commercial use, no
   attribution required). Source pages, should they need swapping later:
     hillside-homes-hollywood-sign  unsplash.com/photos/QQ5CpZsqDRY  (Gerson Repreza)
     palm-lined-street              unsplash.com/photos/7A3pvzBoEeM  (Rihards Sergis)
     city-below-the-hills           unsplash.com/photos/Rp2LG-_ABqY  (Logan Voss)
     santa-monica-mountains         unsplash.com/photos/Yw2ny6nM7CI  (Benjamin Ashton)
   Replace with Andrew's own photography of these areas when it exists. */
const HERO_GALLERY = [
  { src: "/images/neighborhoods/hillside-homes-hollywood-sign.jpg", alt: "Hillside homes below the Hollywood Sign" },
  { src: "/images/neighborhoods/palm-lined-street.jpg", alt: "A palm-lined residential street in Los Angeles" },
  { src: "/images/neighborhoods/city-below-the-hills.jpg", alt: "Los Angeles spreading out below the green hills" },
  { src: "/images/neighborhoods/santa-monica-mountains.jpg", alt: "Golden light over the hills of the Santa Monica Mountains" },
];

type Area = { name: string; img: string; alt: string; href: string; size: "tall" | "short" | "full" };
// Three columns. The first two weave one tall + one short tile (tall-short /
// short-tall) so the middle column's second tile rides up — the Figma masonry.
// The third holds a single tile stretched to the full column height: Pasadena
// used to sit under Hollywood Hills, but it has no page of its own, and every
// tile here links to its neighborhood's page.
const COLUMNS: Area[][] = [
  [
    { name: "Studio City", img: "/images/studio-city.jpg", alt: "Studio City, Los Angeles", href: "/real-estate-agent-in-studio-city", size: "tall" },
    { name: "Sherman Oaks", img: "/images/sold-sherman-oaks.jpg", alt: "Sherman Oaks, Los Angeles", href: "/real-estate-agent-in-sherman-oaks", size: "short" },
  ],
  [
    { name: "Laurel Canyon", img: "/images/laurel-canyon.jpg", alt: "Laurel Canyon, Los Angeles", href: "/real-estate-agent-in-laurel-canyon", size: "short" },
    { name: "Valley Village", img: "/images/sold-valley-village.jpg", alt: "Valley Village, Los Angeles", href: "/real-estate-agent-in-valley-village", size: "tall" },
  ],
  [
    { name: "Hollywood Hills", img: "/images/hollywood-hills.jpg", alt: "Hollywood Hills, Los Angeles", href: "/real-estate-agent-in-hollywood-hills", size: "full" },
  ],
];

// Same order as the client's copy doc. Plain text by the client's call — the
// photo tiles above are the links to each area's page.
const GLANCE: { name: string; homes: string; bestFor: string }[] = [
  { name: "Studio City", homes: "Single-family homes, condos, townhomes", bestFor: "Walkability and dining" },
  { name: "Sherman Oaks", homes: "Flat-street and hillside homes", bestFor: "A suburban feel near Ventura Boulevard" },
  { name: "Laurel Canyon", homes: "Hillside homes", bestFor: "Privacy and a wooded setting" },
  { name: "Valley Village", homes: "Single-family homes, multi-unit properties", bestFor: "Quiet streets near Studio City" },
  { name: "Hollywood Hills", homes: "Hillside homes with views", bestFor: "Views and privacy" },
  { name: "Pasadena, CA", homes: "Historic homes", bestFor: "Historic architecture and a walkable downtown" },
];

export default function NeighborhoodsPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hood-hero">
        <div className="container">
          <h1 className="hood-hero-title">Neighborhoods</h1>
          <div className="hood-hero-gallery">
            {HERO_GALLERY.map((g) => (
              <div className="hood-tile" key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AREAS OF EXPERTISE ============ */}
      <section className="prop-section">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Areas of Expertise</h2>
            <p className="section-sub">Insight into the areas we know best — and why they make sense.</p>
          </div>
          <div className="areas-grid">
            {COLUMNS.map((col, i) => (
              <div className="areas-col" key={i}>
                {col.map((a) => (
                  <a
                    key={a.name}
                    href={a.href}
                    className={`area-card is-${a.size}`}
                    aria-label={`Explore ${a.name}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.img} alt={a.alt} loading="lazy" />
                    <span className="area-name">{a.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AT A GLANCE ============ */}
      <section className="hood-glance">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="section-title">Neighborhoods at a Glance</h2>
          </div>
          <div className="hood-glance-card reveal">
            <table className="hood-glance-table">
              <thead>
                <tr>
                  <th scope="col">Neighborhood</th>
                  <th scope="col">Typical homes</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {GLANCE.map((n) => (
                  <tr key={n.name}>
                    <th scope="row">
                      {n.name}
                    </th>
                    <td data-label="Typical homes">{n.homes}</td>
                    <td data-label="Best for">{n.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ NOT SURE WHICH AREA FITS ============ */}
      <section className="prop-searchband-wrap hood-fit-wrap">
        <div className="container">
          <div className="prop-searchband hood-fit-band reveal">
            <div>
              <h2>Not Sure Which Area Fits?</h2>
              <p>
                Tell Andrew your budget, timing, and what you want from a neighborhood. He will
                point you to the areas worth seeing first.
              </p>
            </div>
            <a href="/contact" className="btn btn-gold btn-magnetic">
              <span>Contact Andrew</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

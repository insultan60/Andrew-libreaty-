import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Neighborhoods — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "The Los Angeles neighborhoods the Andrew Liberty Team knows best — Studio City, Laurel Canyon, the Hollywood Hills, Sherman Oaks, Valley Village and Pasadena.",
  alternates: { canonical: "/neighborhoods" },
};

/* Places, not properties. This band ran four listing photos before — modern
   houses shot against blank sky, the kind that could be in any city in the
   world, and one of them (sold-sherman-oaks) was the same file as a card
   further down the page. Under the word "Neighborhoods" that said nothing
   about these neighborhoods.
   These four are the images in the library that are recognisably Los Angeles:
   the reservoir in the hills, a shaded stretch of village sidewalk, the Valley
   under the San Gabriels, and the canyon from above. Three of them also appear
   in the grid below, which is the point rather than an oversight — the band
   previews the areas the grid then lets you open. Ordered so that no tile sits
   directly above its own card: the grid opens on Studio City, so the Studio
   City frame is third here, not first.
   The real fix for the repetition is photography of these areas that the site
   does not have yet; everything else in /public/images is a listing shot of a
   modern house against blank sky, which is what this band was using. */
const HERO_GALLERY = [
  { src: "/images/hollywood-hills.jpg", alt: "Lake Hollywood and the ridge line of the Hollywood Hills" },
  { src: "/images/hero-poster.jpg", alt: "A shaded sidewalk on a walkable Los Angeles village street" },
  { src: "/images/studio-city.jpg", alt: "The Valley below the San Gabriel Mountains, seen from Studio City" },
  { src: "/images/laurel-canyon.jpg", alt: "Homes tucked into the hillside above Laurel Canyon" },
];

type Area = { name: string; img: string; alt: string; href: string; tall?: boolean };
// Three columns, each with one tall + one short tile (tall-short / short-tall / tall-short)
// so the middle column's second tile rides up — a woven masonry matching the Figma.
//
// Each tile links to that neighborhood's own agent page. Pasadena is the
// exception: it has no page of its own, so it still goes to the search. If one
// is written for it, point it here too — a card that looks like its neighbours
// but lands somewhere else is the kind of thing that gets missed.
const COLUMNS: Area[][] = [
  [
    { name: "Studio City", img: "/images/studio-city.jpg", alt: "Studio City, Los Angeles", href: "/real-estate-agent-in-studio-city", tall: true },
    { name: "Sherman Oaks", img: "/images/sold-sherman-oaks.jpg", alt: "Sherman Oaks, Los Angeles", href: "/real-estate-agent-in-sherman-oaks" },
  ],
  [
    { name: "Laurel Canyon", img: "/images/laurel-canyon.jpg", alt: "Laurel Canyon, Los Angeles", href: "/real-estate-agent-in-laurel-canyon" },
    { name: "Valley Village", img: "/images/sold-valley-village.jpg", alt: "Valley Village, Los Angeles", href: "/real-estate-agent-in-valley-village", tall: true },
  ],
  [
    { name: "Hollywood Hills", img: "/images/hollywood-hills.jpg", alt: "Hollywood Hills, Los Angeles", href: "/real-estate-agent-in-hollywood-hills", tall: true },
    { name: "Pasadena", img: "/images/hero-la-aerial.jpg", alt: "Pasadena, Los Angeles", href: "/home-search" },
  ],
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
                    className={`area-card${a.tall ? " is-tall" : " is-short"}`}
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

      {/* ============ START YOUR SEARCH ============ */}
      <section className="prop-searchband-wrap">
        <div className="container">
          <div className="prop-searchband reveal">
            <h2>Start Your Property Search</h2>
            <a href="/home-search" className="btn btn-gold btn-magnetic">
              <span>Browse Homes</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ============ BEYOND THE TRANSACTION ============ */}
      <section className="prop-beyond-wrap">
        <div className="container">
          <div className="prop-beyond reveal">
            <p className="eyebrow">The Long View</p>
            <h2>Beyond the Transaction</h2>
            <p>
              Our team brings together real-world experience, thoughtful strategy, and a calm,
              hands-on approach to help clients move with clarity. From homes to investments, we
              focus on smart decisions, not unnecessary complexity.
            </p>
            <div className="prop-beyond-ctas">
              <a href="/contact" className="btn btn-gold btn-magnetic">
                <span>Contact Us</span>
                <ArrowRight />
              </a>
              <a href="/home-search" className="btn btn-secondary">
                Browse Homes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

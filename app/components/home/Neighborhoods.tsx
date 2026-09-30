import { ArrowRight } from "../icons";

export type Hood = {
  coords: string;
  name: string;
  desc: string;
  img: string;
  /** Where the card goes: that neighborhood's own page. Required, so a card
   *  can never quietly fall back to the /neighborhoods hub. */
  href: string;
  /** Card link text. Defaults to "Learn More"; the Valley Village and
   *  Sherman Oaks briefs name theirs ("Explore Studio City"), which reads
   *  better anyway when the card leads to that neighborhood's own page. */
  cta?: string;
};

const DEFAULT_HOODS: Hood[] = [
  {
    coords: "Los Angeles · 91604",
    name: "Studio City",
    desc: "Village feel south of the Boulevard, minutes from the studios, with sought-after schools.",
    img: "/images/studio-city.jpg",
    href: "/real-estate-agent-in-studio-city",
  },
  {
    coords: "Los Angeles · The Hills",
    name: "Laurel Canyon",
    desc: "Secluded canyon living, minutes from both the Valley and the Sunset Strip.",
    img: "/images/laurel-canyon.jpg",
    href: "/real-estate-agent-in-laurel-canyon",
  },
  {
    coords: "Los Angeles · Iconic views",
    name: "Hollywood Hills",
    desc: "Skyline views and architectural pedigree that holds value across market cycles.",
    img: "/images/hollywood-hills.jpg",
    href: "/real-estate-agent-in-hollywood-hills",
  },
];

type Props = {
  title?: string;
  sub?: string;
  hoods?: Hood[];
};

export default function Neighborhoods({
  title = "Neighborhood Insights",
  sub = "Three neighborhoods we know street by street.",
  hoods = DEFAULT_HOODS,
}: Props = {}) {
  // The grid is built for three across; a two-card set gets a narrower,
  // centred track so it doesn't sit lopsided with an empty third column.
  const pair = hoods.length === 2;

  return (
    <section className="section section-neighborhoods" id="neighborhoods">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">{title}</h2>
          {sub ? <p className="section-sub">{sub}</p> : null}
        </div>

        <div className={`hood-grid${pair ? " hood-grid--pair" : ""}`}>
          {hoods.map((hood, i) => (
            <a
              key={hood.name}
              href={hood.href}
              className="hood-card reveal"
              data-reveal-delay={i === 0 ? undefined : i * 100}
              aria-label={`Learn more about ${hood.name}`}
            >
              <div className="hood-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hood.img} alt={hood.name} loading="lazy" data-hood-parallax />
              </div>
              <div className="hood-overlay">
                <p className="hood-coords">{hood.coords}</p>
                <h3>{hood.name}</h3>
                <p className="hood-desc">{hood.desc}</p>
                <span className="hood-cta">
                  {hood.cta ?? "Learn More"}
                  <ArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="hood-all reveal">
          <a href="/neighborhoods" className="btn btn-secondary">
            <span>Explore Neighborhoods</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

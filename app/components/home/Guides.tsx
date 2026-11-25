import { ArrowRight } from "../icons";

const GUIDES = [
  { title: "How to Negotiate After Home Inspection in California", body: "The 17-day window, repair requests, and when to walk away.", href: "/blog/how-to-negotiate-after-home-inspection-in-california" },
  { title: "How to Negotiate a House Price in Los Angeles", body: "Build an offer from adjusted comps.", href: "/blog/how-to-negotiate-a-house-price-in-los-angeles" },
  { title: "Studio City vs Sherman Oaks", body: "Prices, walkability, commutes, and schools compared.", href: "/blog/studio-city-vs-sherman-oaks" },
  { title: "Most Affordable Places to Live in Los Angeles", body: "Typical prices, rents, and commute trade-offs.", href: "/blog/most-affordable-places-to-live-in-los-angeles" },
];

export default function Guides() {
  return (
    <section className="section section-move" id="guides">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">Studio City and Los Angeles Real Estate Guides</h2>
          <p className="section-sub">Practical guides on buying, selling, and investing, written by Andrew.</p>
        </div>
        <div className="move-grid move-grid--4">
          {GUIDES.map((g, i) => (
            <a key={g.href} href={g.href} className="move-card reveal" data-reveal-delay={i ? i * 80 : undefined}>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
              <span className="btn btn-secondary btn-card">
                <span>Read the Guide</span>
                <ArrowRight />
              </span>
            </a>
          ))}
        </div>
        <div className="hood-all reveal">
          <a href="/blog" className="btn btn-secondary">
            <span>Read All Guides</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

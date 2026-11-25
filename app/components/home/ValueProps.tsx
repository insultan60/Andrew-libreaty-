/* "What You Get With Andrew" (November 2026 homepage brief). Reuses the
   move-card styles so it sits in the same visual system. */
const POINTS = [
  { title: "A negotiator on your side", body: "Andrew holds the Certified Real Estate Negotiation Expert designation. He uses it on price, repair requests, and contract terms." },
  { title: "Numbers before opinions", body: "He looks at comps, costs, and returns before he gives advice. You see the reasoning behind each recommendation." },
  { title: "An advisor, not just an agent", body: "Andrew keeps in touch after closing. When the next move makes sense, you hear from him first." },
];

export default function ValueProps() {
  return (
    <section className="section section-move" id="why-andrew">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">What You Get With Andrew</h2>
        </div>
        <div className="move-grid">
          {POINTS.map((p, i) => (
            <article key={p.title} className="move-card reveal" data-reveal-delay={i ? i * 100 : undefined}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

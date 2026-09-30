import { ArrowRight } from "../icons";
import { HomeHashtagIcon, DollarSquareIcon, FavoriteChartIcon } from "../vuesax";

export type MoveCard = {
  title: string;
  body: string;
  /** Small reassurance line — only the middle (featured) card shows one. */
  proof?: string;
  ctaLabel: string;
  href: string;
};

/* Fixed per position: buy / sell / invest. The copy varies by page, the
   iconography doesn't. */
const ICONS = [HomeHashtagIcon, DollarSquareIcon, FavoriteChartIcon];

const DEFAULT_CARDS: MoveCard[] = [
  {
    title: "Buy a Home",
    body: "Find the right home in Los Angeles at the right price, with a certified negotiator reading the market on your side.",
    ctaLabel: "Start Home Search",
    href: "#sold",
  },
  {
    title: "Sell a Home",
    body: "Price it right, position it well, and let a certified negotiation expert handle offers on your Los Angeles home.",
    ctaLabel: "Get Home Value",
    href: "#valuation",
  },
  {
    title: "Invest Strategically",
    body: "From duplexes to development lots, every Los Angeles investment deal gets evaluated on the numbers first.",
    ctaLabel: "Explore Opportunities",
    href: "/contact",
  },
];

type Props = {
  eyebrow?: string;
  title?: string;
  sub?: string;
  cards?: MoveCard[];
};

export default function WhatsTheMove({
  eyebrow = "Start Here",
  title = "What’s the Move?",
  sub = "A clearer path forward starts with the right first step.",
  cards = DEFAULT_CARDS,
}: Props = {}) {
  return (
    <section className="section section-move" id="move">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
          {sub ? <p className="section-sub">{sub}</p> : null}
        </div>

        <div className="move-grid">
          {cards.map((card, i) => {
            const Icon = ICONS[i] ?? ICONS[0];
            return (
              <article
                key={card.title}
                className={`move-card reveal${i === 1 ? " move-card-featured" : ""}`}
                data-reveal-delay={i === 0 ? undefined : i * 100}
              >
                <div className="move-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {card.proof ? <p className="move-proof">{card.proof}</p> : null}
                <a href={card.href} className="btn btn-secondary btn-card">
                  <span>{card.ctaLabel}</span>
                  <ArrowRight />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

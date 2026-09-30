import { ArrowRight } from "../icons";

/* Defaults are the homepage's copy, so pages that render <FinalCta /> bare are
   unchanged. The neighborhood pages pass their own closing pitch. */
type Props = {
  title?: string;
  copy?: string;
  contactHref?: string;
};

export default function FinalCta({
  title = "Beyond the Transaction",
  copy = "The Andrew Liberty Team brings together real-world experience, thoughtful strategy, and a calm, hands-on approach to help Los Angeles clients move with clarity. From homes to investments, we focus on smart decisions, not unnecessary complexity.",
  contactHref = "/contact",
}: Props = {}) {
  return (
    <section className="section section-final">
      <div className="container final-inner">
        <h2 className="final-title reveal">{title}</h2>
        <p className="final-copy reveal" data-reveal-delay="60">
          {copy}
        </p>
        <div className="final-ctas reveal" data-reveal-delay="120">
          <a href={contactHref} className="btn btn-primary btn-magnetic">
            <span>Contact Us</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Testimonials — Andrew Liberty Team | Client Reviews",
  description:
    "Read reviews and testimonials from clients who have bought or sold homes with the Andrew Liberty Team at Compass in Los Angeles.",
  alternates: { canonical: "/testimonials" },
};

const TESTIMONIALS_COL1 = [
  {
    type: "Buyer",
    quote:
      "I truly feel lucky to have found Andrew. I can't begin to explain his professionalism, patience, expertise, and kindness. He made the whole process of purchasing a home, in an incredibly difficult housing market, seamless. On our first consultation, he spent almost two hours explaining the purchase process from beginning to end. He was thorough in everything he did and so personable with everyone we came in contact with throughout the process. He took care of essentially everything and took the burden off of me as much as he could. I'm so fortunate to have worked with him, and I think he was the reason I was able to purchase my first home quickly and efficiently. My family now has a REALTOR® for life.",
  },
  {
    type: "Buyer",
    quote:
      "My wife and I have incredibly high standards for ourselves and a very high bar for anyone we work with. Without exception, we can say that Andrew Liberty over-delivered on our expectations when he helped us buy our first home. Andrew knows that he's not just selling real estate, he's helping to make people's dreams a reality. He excelled at understanding our needs and thinking creatively to find the right home for us in such a competitive market. Andrew was there for us every step of the way, and he made the entire process a joy, yes, even during some of the stressful moments. He has that way of making you feel at ease and confident that everything will work out the way it should. And even when we had our offer accepted, he was there for us with his deep knowledge and professional network, ensuring that we were, in fact, getting the home of our dreams. We can't say enough great things about Andrew as a REALTOR®, but we're also grateful to now have him as a friend.",
  },
];

const TESTIMONIALS_COL2 = [
  {
    type: "Buyer",
    quote:
      "My wife and I have incredibly high standards for ourselves and a very high bar for anyone we work with. Without exception, we can say that Andrew Liberty over-delivered on our expectations when he helped us buy our first home. Andrew knows that he's not just selling real estate, he's helping to make people's dreams a reality. He excelled at understanding our needs and thinking creatively to find the right home for us in such a competitive market. Andrew was there for us every step of the way, and he made the entire process a joy, yes, even during some of the stressful moments. He has that way of making you feel at ease and confident that everything will work out the way it should. And even when we had our offer accepted, he was there for us with his deep knowledge and professional network, ensuring that we were, in fact, getting the home of our dreams. We can't say enough great things about Andrew as a REALTOR®, but we're also grateful to now have him as a friend.",
  },
  {
    type: "Seller",
    quote:
      "No doubt: Andrew Liberty was a great choice for us! He was extremely active in advising us how to prepare our property and how to price it well. Throughout the process, he was honest, ethical, and very competent. He sold our property while we were 3000 miles away on the opposite coast and directed us with great care. I would say that this was the best real estate experience we have ever had. Highly recommended!",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="test-hero">
        <div className="container">
          <h1 className="test-hero-title">Testimonials</h1>
          <div className="test-hero-gallery">
            <div className="test-tile test-tile-h">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/valuation-interior.jpg"
                alt="Staged modern interior living space"
                loading="eager"
              />
            </div>
            <div className="test-tile test-tile-v">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sold-hollywood-hills.jpg"
                alt="Luxury estate with pool in Hollywood Hills"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS LIST ============ */}
      <section className="test-section">
        <div className="container">
          <div className="test-grid">
            <div className="test-col">
              {TESTIMONIALS_COL1.map((t, idx) => (
                <article key={idx} className="test-card reveal">
                  <h3 className="test-card-type">{t.type}</h3>
                  <span className="test-card-quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="test-card-text">{t.quote}</p>
                </article>
              ))}
            </div>
            <div className="test-col">
              {TESTIMONIALS_COL2.map((t, idx) => (
                <article key={idx} className="test-card reveal">
                  <h3 className="test-card-type">{t.type}</h3>
                  <span className="test-card-quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="test-card-text">{t.quote}</p>
                </article>
              ))}
            </div>
          </div>

          {/* ============ PAGINATION ============ */}
          <div className="test-pagination reveal">
            <button className="test-page-btn is-active" aria-label="Page 1">
              1
            </button>
            <button className="test-page-btn" aria-label="Page 2">
              2
            </button>
            <button className="test-page-btn" aria-label="Page 3">
              3
            </button>
            <button className="test-next-btn">
              <span>Next</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============ BEYOND THE TRANSACTION ============ */}
      <section className="prop-beyond-wrap" style={{ paddingBottom: "110px" }}>
        <div className="container">
          <div className="prop-beyond reveal">
            <h2>Beyond the Transaction</h2>
            <p>
              Our team brings together real-world experience, thoughtful strategy, and a calm,
              hands-on approach to help clients move with clarity. From homes to investments, we
              focus on smart decisions, not unnecessary complexity.
            </p>
            <div className="prop-beyond-ctas" style={{ marginTop: "24px" }}>
              <a href="/contact" className="btn btn-gold btn-magnetic">
                <span>Contact us</span>
                <ArrowRight />
              </a>
              <Link href="/client-stories" className="btn btn-secondary">
                <span>Watch Client Stories</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

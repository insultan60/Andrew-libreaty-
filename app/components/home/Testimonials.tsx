"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "../icons";

const TESTIMONIALS_ALL = [
  {
    type: "Buyer",
    quote:
      "I truly feel lucky to have found Andrew. His professionalism, patience, expertise, and kindness made purchasing a home in an incredibly difficult market seamless. On our first consultation he spent almost two hours explaining the process from beginning to end, and he took the burden off me at every step.",
  },
  {
    type: "Buyer",
    quote:
      "My wife and I have a very high bar for anyone we work with, and without exception Andrew over-delivered when he helped us buy our first home. He understood our needs and thought creatively to find the right home in a competitive market — and made the whole process a joy.",
  },
  {
    type: "Buyer",
    quote:
      "Andrew and his team made the whole process so easy. We were still green to everything, and he always had time to answer our questions clearly and on time. The experience was personal and caring — we will continue to recommend him to anyone looking to buy or sell.",
  },
];

export default function Testimonials({
  title = "Clients Move With Confidence",
  limit,
}: { title?: string; limit?: number } = {}) {
  const TESTIMONIALS = limit ? TESTIMONIALS_ALL.slice(0, limit) : TESTIMONIALS_ALL;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startAuto = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopAuto();
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 6000);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const restart = () => {
    stopAuto();
    startAuto();
  };

  return (
    <section className="section section-testimonials" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="section-title">{title}</h2>
        </div>

        <div
          className="testimonial-stage reveal"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onFocus={stopAuto}
          onBlur={startAuto}
        >
          <span className="quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <div className="testimonial-track" aria-live="polite">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                className={`testimonial${i === current ? " is-active" : ""}`}
                data-type={t.type}
              >
                <p>{t.quote}</p>
                <footer>
                  <cite>Verified client</cite>
                  <span className="testimonial-type">{t.type}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="testimonial-nav">
            <button
              className="carousel-btn"
              aria-label="Previous testimonial"
              onClick={() => {
                goTo(current - 1);
                restart();
              }}
            >
              <ArrowLeft />
            </button>
            <div className="testimonial-dots" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot${i === current ? " is-active" : ""}`}
                  role="tab"
                  aria-label={`Testimonial ${i + 1}`}
                  aria-selected={i === current}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              className="carousel-btn"
              aria-label="Next testimonial"
              onClick={() => {
                goTo(current + 1);
                restart();
              }}
            >
              <ArrowRight className="" />
            </button>
          </div>

          <a href="/testimonials" className="btn btn-secondary testimonial-all">
            View All Testimonials
          </a>
        </div>
      </div>
    </section>
  );
}

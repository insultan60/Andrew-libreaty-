"use client";

import { useMemo, useState } from "react";
import type { Post } from "./posts";

const CATEGORIES = ["All", "Market Updates", "Neighborhoods", "Buying Tips", "Selling Strategy", "Lifestyle", "Investment"];
const PER_PAGE = 9;

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function BlogList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const base = cat === "All" ? posts : posts.filter((p) => p.category === cat);
    return order === "newest" ? base : [...base].reverse();
  }, [posts, cat, order]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(page, pages - 1);
  const start = current * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  const pickCat = (c: string) => {
    setCat(c);
    setPage(0);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="container">
        <div className="bl-toolbar">
          <div className="bl-tabs" role="tablist" aria-label="Article categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`bl-tab${c === cat ? " is-active" : ""}`}
                role="tab"
                aria-selected={c === cat}
                onClick={() => pickCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="bl-sort">
            <select
              value={order}
              aria-label="Sort articles"
              onChange={(e) => {
                setOrder(e.target.value as "newest" | "oldest");
                setPage(0);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bl-list">
        <div className="container">
          {visible.length === 0 ? (
            <p className="bl-empty">No articles in this category yet — check back soon.</p>
          ) : (
            <div className="bl-grid">
              {visible.map((p) => (
                <a className="bl-card" key={p.title} href={`/blog/${p.slug}`} aria-label={p.title}>
                  <div className="bl-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" loading="lazy" />
                  </div>
                  <div className="bl-card-body">
                    <div className="bl-card-top">
                      <span className="bl-cat">{p.category}</span>
                      <span className="bl-dot" />
                      <span className="bl-card-date">{p.date}</span>
                    </div>
                    <h3 className="bl-card-title">{p.title}</h3>
                    <p className="bl-card-excerpt">{p.excerpt}</p>
                    <div className="bl-card-foot">
                      <span className="bl-readmeta">
                        <ClockIcon />
                        {p.read}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {total > 0 && (
            <nav className="bl-pager" aria-label="Blog pages">
              <p className="bl-pager-count">
                Showing <b>{start + 1}&ndash;{start + visible.length}</b> of <b>{total}</b> articles
              </p>
              <div className="bl-pager-nav">
                <button className="bl-page-btn" disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Previous page">
                  &larr;
                </button>
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    className={`bl-page-btn${i === current ? " is-active" : ""}`}
                    aria-current={i === current ? "page" : undefined}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="bl-page-btn" disabled={current >= pages - 1} onClick={() => setPage(current + 1)} aria-label="Next page">
                  &rarr;
                </button>
              </div>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

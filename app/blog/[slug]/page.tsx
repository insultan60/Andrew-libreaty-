import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "../../components/icons";
import NewsletterForm from "../NewsletterForm";
import ArticleShare from "./ArticleShare";
import JsonLd from "../../components/JsonLd";
import { ALL, POSTS, getPost } from "../posts";
import { BODIES, FAQS_BY_SLUG, isPublished } from "../bodies";

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  // Unknown slug: this renders notFound(), so keep it out of the index too.
  if (!post) return { title: "Article — The Liberty Journal", robots: { index: false, follow: false } };
  /* An article can ship with its own SERP copy; fall back to the house pattern
     and the card excerpt when it does not. See Post.metaTitle in ../posts. */
  const title = post.metaTitle ?? `${post.title} — The Liberty Journal | Andrew Liberty Team`;
  const description = post.metaDescription ?? post.excerpt;
  const url = `/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // Posts still showing the "Coming Soon" stub have no body worth ranking, so
    // they are noindex until written — but `follow` so Google still crawls
    // through to /blog and the posts that do have content. See isPublished().
    ...(isPublished(post.slug) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: post.img ? [post.img] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.img ? [post.img] : undefined,
    },
  };
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const Body = BODIES[slug];
  const faqs = FAQS_BY_SLUG[slug];

  return (
    <article className="ar-page">
      {/* FAQPage schema, for posts that carry an FAQ section. The answers below
          are the same array the body renders as visible copy — schema whose
          answers are not on the page is a violation, not a free rich result. */}
      {faqs && faqs.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      ) : null}

      {/* ============ HEAD ============ */}
      <header className="ar-head">
        <div className="container">
          <div className="ar-narrow">
            <a href="/blog" className="ar-back">
              <BackArrow />
              Back to the Journal
            </a>
            <div className="ar-cat-row">
              <span className="bl-cat">{post.category}</span>
              <span className="bl-dot" />
              <span className="date">{post.date}</span>
            </div>
            <h1 className="ar-title">{post.title}</h1>
            <div className="ar-meta">
              <div className="ar-meta-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/team/IMG-42.png" alt="Andrew Liberty" />
                <div>
                  <p className="">Andrew Liberty</p>
                  <p className="ar-meta-sub">Founder &amp; Lead Agent · {post.read}</p>
                </div>
              </div>
              <ArticleShare title={post.title} />
            </div>
          </div>
        </div>
      </header>

      {/* ============ HERO IMAGE ============ */}
      <div className="ar-hero-img">
        <div className="container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.img} alt={post.title} width={post.imgWidth} height={post.imgHeight} />
        </div>
      </div>

      {/* ============ BODY ============ */}
      {Body ? (
        <div className="ar-body">
          <div className="container">
            <div className="ar-narrow">
              {/* Bodies render as direct children of .ar-narrow on purpose:
                  blog.css styles body copy with `.ar-body .ar-narrow > p`. */}
              <Body />

              {post.tags && post.tags.length > 0 ? (
                <div className="ar-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}

              {/* Shared, not per-article. It used to sit inside the one hardcoded
                  body, which would have meant copying it into every new post. */}
              <div className="ar-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/team/IMG-42.png" alt="Andrew Liberty" />
                <div>
                  <p className="ar-author-name">Andrew Liberty</p>
                  <p className="ar-author-role">Founder &amp; Lead Agent</p>
                  <p className="ar-author-bio">
                    A Los Angeles based REALTOR® and certified Real Estate Negotiation Expert, Andrew
                    blends strategy and real-world experience to help clients move forward with clarity —
                    across Studio City and greater LA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="ar-narrow ar-soon">
            <span className="ar-soon-badge">Coming Soon</span>
            <h1>This article is on the way.</h1>
            <p>
              We&rsquo;re putting the finishing touches on &ldquo;{post.title}.&rdquo; In the meantime,
              explore the rest of the Journal or reach out with a question.
            </p>
            <a href="/blog" className="btn btn-gold btn-magnetic">
              <span>Back to the Journal</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      )}

      {/* ============ CONTINUE READING ============ */}
      {/* Hidden when this is the only article — an empty "Continue
          Reading" rail is worse than no rail. */}
      {related.length > 0 ? (
        <section className="ar-related">
          <div className="container">
            <div className="ar-related-head">
              <h2>Continue Reading</h2>
              <a href="/blog">View all articles →</a>
            </div>
            <div className="bl-grid">
              {related.map((p) => (
                <a className="bl-card" key={p.slug} href={`/blog/${p.slug}`} aria-label={p.title}>
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
          </div>
        </section>
      ) : null}

      {/* ============ NEWSLETTER ============ */}
      <section className="bl-news-wrap">
        <div className="container">
          <div className="bl-news">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2>The Liberty Brief</h2>
              <p>Market perspective, smart analysis, and opportunities — delivered with clarity.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </article>
  );
}

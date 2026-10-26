import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import { StoryPlayer } from "../[slug]/SuccessStory";
import { CLIENT_STORIES } from "@/lib/listingVideos";
import { AGENT, SITE_NAME, abs } from "@/lib/site";
import "../detail.css";
import "./client-stories.css";

/* /client-stories — the team's client success-story videos, in the clients'
   own words. Each story lives in lib/listingVideos.ts (LISTING_STORIES) and
   also plays on its listing's page. */

const TITLE = "Client Stories — Andrew Liberty Team | Real Client Experiences";
const DESCRIPTION =
  "Watch clients of the Andrew Liberty Team at Compass share, in their own words, what it was like to buy and sell homes in Los Angeles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/client-stories" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/client-stories",
    images: CLIENT_STORIES[0] ? [`https://i.ytimg.com/vi/${CLIENT_STORIES[0].youtube}/maxresdefault.jpg`] : undefined,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": abs("/client-stories#webpage"),
      url: abs("/client-stories"),
      name: "Client Stories",
      description: DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: abs("/") },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CLIENT_STORIES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoObject",
            name: s.title,
            description: s.intro,
            thumbnailUrl: `https://i.ytimg.com/vi/${s.youtube}/maxresdefault.jpg`,
            uploadDate: s.uploadDate,
            duration: s.duration,
            contentUrl: `https://www.youtube.com/watch?v=${s.youtube}`,
            embedUrl: `https://www.youtube.com/embed/${s.youtube}`,
            publisher: { "@type": "Organization", name: SITE_NAME, url: abs("/") },
            about: { "@type": "Person", name: AGENT.name },
          },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: "Client Stories", item: abs("/client-stories") },
      ],
    },
  ],
};

export default function ClientStoriesPage() {
  return (
    <>
      <JsonLd data={schema} />

      <section className="cs-hero">
        <div className="container">
          <p className="cs-eyebrow">In Their Own Words</p>
          <h1 className="cs-title">Client Stories</h1>
          <p className="cs-lede">
            Real estate is about more than buying and selling homes. It&rsquo;s about trust, relationships,
            and being there for people during life&rsquo;s important transitions. Hear it from the clients
            themselves.
          </p>
        </div>
      </section>

      <section className="cs-list">
        <div className="container">
          {CLIENT_STORIES.map((s) => (
            <article key={s.youtube} className="cs-story reveal">
              <StoryPlayer youtube={s.youtube} title={s.title} />
              <div className="cs-story-body">
                <p className="pd-story-eyebrow">{s.client}</p>
                <h2 className="cs-story-title">{s.title}</h2>
                <p className="cs-story-address">{s.address}</p>
                <p className="cs-story-intro">{s.intro}</p>
                <div className="cs-story-links">
                  <a href={`/property/${s.slug}`} className="btn btn-secondary">
                    <span>View the Home</span>
                    <ArrowRight />
                  </a>
                  <a
                    href={`https://www.youtube.com/watch?v=${s.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-story-link"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prop-beyond-wrap" style={{ paddingBottom: "110px" }}>
        <div className="container">
          <div className="prop-beyond reveal">
            <h2>Your Story Starts Here</h2>
            <p>
              Whether you&rsquo;re buying your first home or selling one you&rsquo;ve loved for years, the team
              is here to guide you with clarity and care. Read more from past clients on the{" "}
              <Link href="/testimonials" style={{ textDecoration: "underline" }}>testimonials page</Link>.
            </p>
            <div className="prop-beyond-ctas" style={{ marginTop: "24px" }}>
              <Link href="/contact" className="btn btn-gold btn-magnetic">
                <span>Contact us</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

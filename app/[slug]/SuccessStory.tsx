"use client";

import { useState } from "react";
import Link from "next/link";
import { LISTING_STORIES } from "@/lib/listingVideos";

/** A YouTube video that shows only its thumbnail and a play button until it
 *  is clicked, so pages with stories stay fast. Also used on /client-stories. */
export function StoryPlayer({ youtube, title }: { youtube: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="pd-story-frame">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="pd-story-play" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`} alt="" loading="lazy" width={1280} height={720} />
          <span className="pd-story-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}

/** A seller's success-story video for a listing (see lib/listingVideos.ts). */
export default function SuccessStory({ slug }: { slug: string }) {
  const story = LISTING_STORIES[slug.toLowerCase()];
  if (!story) return null;

  return (
    <section className="pd-section pd-story" id="story">
      <p className="pd-story-eyebrow">Client Success Story</p>
      <h2 className="pd-section-title">{story.title}</h2>
      <p className="pd-story-intro">{story.intro}</p>
      <StoryPlayer youtube={story.youtube} title={story.title} />
      <div className="pd-story-links">
        <Link className="pd-story-link" href="/client-stories">More client stories</Link>
        <a className="pd-story-link" href={`https://www.youtube.com/watch?v=${story.youtube}`} target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      </div>
    </section>
  );
}

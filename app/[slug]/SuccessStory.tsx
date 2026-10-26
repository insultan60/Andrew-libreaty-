"use client";

import { useState } from "react";
import { LISTING_STORIES } from "@/lib/listingVideos";

/** A seller's success-story video for a listing (see lib/listingVideos.ts).
 *  Shows YouTube's thumbnail with a play button and only loads the player
 *  when it is clicked, so the listing page stays fast. */
export default function SuccessStory({ slug }: { slug: string }) {
  const story = LISTING_STORIES[slug.toLowerCase()];
  const [playing, setPlaying] = useState(false);
  if (!story) return null;

  return (
    <section className="pd-section pd-story" id="story">
      <p className="pd-story-eyebrow">Client Success Story</p>
      <h2 className="pd-section-title">{story.title}</h2>
      <p className="pd-story-intro">{story.intro}</p>
      <div className="pd-story-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${story.youtube}?autoplay=1&rel=0`}
            title={story.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="pd-story-play" onClick={() => setPlaying(true)} aria-label={`Play video: ${story.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${story.youtube}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              width={1280}
              height={720}
            />
            <span className="pd-story-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <a
        className="pd-story-link"
        href={`https://www.youtube.com/watch?v=${story.youtube}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube
      </a>
    </section>
  );
}

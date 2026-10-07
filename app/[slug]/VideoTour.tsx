"use client";

import { useEffect, useRef } from "react";
import { LISTING_VIDEOS } from "@/lib/listingVideos";

declare global {
  interface Window {
    Dropbox?: { embed: (options: Record<string, unknown>, element: HTMLElement) => unknown };
  }
}

/**
 * Dropbox app key for the Embedder. Created at dropbox.com/developers/apps,
 * with this site's domain(s) listed under "Chooser / Saver / Embedder
 * domains" — the embed refuses to load on any domain not listed there.
 * Without a key this component renders nothing, so a listing never shows an
 * empty or broken player.
 */
const APP_KEY = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY;

let scriptPromise: Promise<void> | null = null;
function loadDropins(appKey: string): Promise<void> {
  if (window.Dropbox) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://www.dropbox.com/static/api/2/dropins.js";
      s.id = "dropboxjs";
      s.dataset.appKey = appKey;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Dropbox embedder failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/** A listing's video tour, streamed from Dropbox (see lib/listingVideos.ts). */
export default function VideoTour({ slug }: { slug: string }) {
  const video = LISTING_VIDEOS[slug.toLowerCase()];
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video || !APP_KEY || !box.current) return;
    const el = box.current;
    let cancelled = false;
    loadDropins(APP_KEY)
      .then(() => {
        if (cancelled || !window.Dropbox) return;
        el.innerHTML = "";
        window.Dropbox.embed({ link: video.dropbox, file: { zoomType: "best" } }, el);
      })
      .catch(() => {
        /* Leave the section empty rather than throw on the listing page. */
      });
    return () => {
      cancelled = true;
    };
  }, [video]);

  if (!video || !APP_KEY) return null;

  return (
    <section className="pd-section" id="video">
      <h2 className="pd-section-title">Video Tour</h2>
      <div
        ref={box}
        aria-label={video.title}
        style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 14, overflow: "hidden", background: "#111" }}
      />
    </section>
  );
}

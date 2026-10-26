/**
 * Video tours for individual listings, keyed by the listing's IDX slug.
 *
 * `dropbox` is a Dropbox shared link to the video file. It is shown with the
 * Dropbox Embedder (app/[slug]/VideoTour.tsx), which plays Dropbox's own
 * streaming preview, so the original file never has to be downloaded or
 * re-hosted. Remove the tracking params Dropbox adds when copying (`st`, `e`,
 * `bmus`); keep `rlkey`, which the link needs to open.
 */
export const LISTING_VIDEOS: Record<string, { title: string; dropbox: string }> = {
  "3377-canton-lane-los-angeles-91604": {
    title: "3377 Canton Lane — video tour",
    dropbox:
      "https://www.dropbox.com/scl/fo/g2c0lkletyb17j96we8v8/AJAGBuw07lzddrITl6UME4M/Tati%20Youtbe%2014.mp4?rlkey=dv3m2u9fy0lkigm4kwnjimduc&dl=0",
  },
};

/**
 * Client success stories on YouTube, keyed by the listing's IDX slug. Each one
 * shows on that listing's page (app/[slug]/SuccessStory.tsx) and on the
 * /client-stories page, newest first. `youtube` is the 11-character video id
 * (the `v=` in the watch URL); `uploadDate` and `duration` (ISO 8601) come
 * from the YouTube page and feed the VideoObject schema on /client-stories.
 */
export type ClientStory = {
  title: string;
  youtube: string;
  /** Who is telling the story, e.g. "Becky, Seller". */
  client: string;
  address: string;
  intro: string;
  uploadDate: string;
  duration: string;
};

export const LISTING_STORIES: Record<string, ClientStory> = {
  "3377-canton-lane-los-angeles-91604": {
    title: "Canton Lane Story with Becky",
    youtube: "Hp15DTxbEqQ",
    client: "Becky, Seller",
    address: "3377 Canton Lane, Los Angeles, CA 91604",
    intro:
      "What started as a connection between neighbors turned into a genuine friendship. Becky shares how she first met Andrew, the friendship they built over the years, and her experience selling her home.",
    uploadDate: "2026-10-26T13:19:39-07:00",
    duration: "PT19M57S",
  },
};

/** Every story with its listing slug, newest first. */
export const CLIENT_STORIES = Object.entries(LISTING_STORIES)
  .map(([slug, story]) => ({ slug, ...story }))
  .sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));

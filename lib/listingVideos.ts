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

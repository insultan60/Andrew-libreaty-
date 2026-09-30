import type { Metadata } from "next";
import { Fraunces, Onest, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./home-search.css";
import "./property.css";
import "./valuation.css";
import "./contact.css";
import "./testimonials/testimonials.css";
import "./agent.css";
import "./compass-concierge/concierge.css";
import "./blog/blog.css";
import "./detail.css";
import "./neighborhood.css";
import "./buttons.css";
import "./my-search-portal/portal.css";
import Footer from "./components/Footer";
import SiteChrome from "./components/SiteChrome";
import { LeadProvider } from "@/hooks/useLead";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const TITLE = "Andrew Liberty Team — Strategic Real Estate in Los Angeles";
const DESCRIPTION =
  "Good moves aren't accidental. Strategic real estate guidance for buyers, sellers, and investors across Los Angeles. Andrew Liberty Team, Compass.";

export const metadata: Metadata = {
  // Without metadataBase every canonical and og:image resolves as a relative
  // path, which crawlers and link unfurlers ignore.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // No `alternates.canonical` or `openGraph.url` here on purpose: metadata in
  // the root layout is inherited by every route that doesn't override it, so a
  // canonical of "/" would tell Google that /contact, /team and the rest are
  // all duplicates of the homepage. Canonicals are set per page.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/hero-la-aerial.jpg",
        width: 1400,
        height: 933,
        alt: "Los Angeles from above",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/hero-la-aerial.jpg"],
  },
  verification: {
    google: "koQHdUxBYmda27d2oTyeUG2n4_wCoCQJEI4DRTvipWg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`js ${fraunces.variable} ${onest.variable} ${instrumentSerif.variable}`}>
      <body>
        {/* Tag Manager and the UserWay widget moved into SiteChrome, which is
            where the rest of the public site's furniture lives. Both are for
            visitors, and /dashboard has neither: an admin page that fires the
            site's own analytics tag would record every visit to it as site
            traffic, which is the one page whose numbers must not appear in the
            numbers it is reporting. */}
        {/*
          The RealEstateAgent / Person identity used to be emitted here, which
          put the same entity on every route - twenty-odd copies of one
          business. It now lives once, on the home page, as a single @graph.
          That is the pattern the rest of the site already assumed: the
          neighbourhood pages reference `${SITE_URL}/#agent` as the provider of
          their Service nodes, and an @id is meant to be DEFINED once and
          REFERENCED everywhere else, not restated on every page.
        */}
        <LeadProvider>
          {/* Header, footer and the mobile CTA bar live in SiteChrome so the
              private /dashboard routes can render without them. */}
          <SiteChrome footer={<Footer />}>{children}</SiteChrome>
        </LeadProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
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
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalEffects from "./components/GlobalEffects";
import MobileCtaBar from "./components/MobileCtaBar";
import AuthModal from "./components/AuthModal";
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
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NC52RXBT');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC52RXBT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
          <GlobalEffects />
          <a className="skip-link" href="#main">
            Skip to main content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCtaBar />
          <AuthModal />
        </LeadProvider>
        <Script src="https://cdn.userway.org/widget.js" data-account="Wpzt1Vuecx" strategy="afterInteractive" />
      </body>
    </html>
  );
}

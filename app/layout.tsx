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
import JsonLd from "./components/JsonLd";
import { LeadProvider } from "@/hooks/useLead";
import { SITE_URL, SITE_NAME, AGENT, AREAS_SERVED, ADDRESS, OPENING_HOURS, abs } from "@/lib/site";

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
        {/* Site-wide identity. Sits in the layout so every route carries it. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": `${SITE_URL}/#agent`,
            /* "Andrew Liberty", per the supplied schema — not SITE_NAME
               ("Andrew Liberty Team"). The entity Google is being asked to
               recognise is the agent, and that is the name on the licence, the
               Compass profile and every sameAs below. SITE_NAME still drives
               page titles and Open Graph, which is a different job. */
            name: AGENT.name,
            /* The supplied schema has https://andrewliberty.com — the APEX —
               and that was right. This briefly forced www on the mistaken
               belief that the apex redirects there; production says the
               opposite (see SITE_URL in lib/site.ts). SITE_URL is now the apex,
               so this matches both the supplied schema and every canonical. */
            url: SITE_URL,
            image: abs(AGENT.image),
            logo: abs(AGENT.logo),
            telephone: AGENT.phone,
            email: AGENT.email,
            address: ADDRESS,
            openingHoursSpecification: OPENING_HOURS,
            areaServed: AREAS_SERVED.map((name) => ({
              "@type": "Place",
              name: `${name}, Los Angeles, CA`,
            })),
            sameAs: AGENT.sameAs,
            employee: {
              "@type": "Person",
              name: AGENT.name,
              alternateName: AGENT.legalName,
              jobTitle: AGENT.jobTitle,
              identifier: AGENT.licence,
              worksFor: { "@type": "Organization", name: AGENT.brokerage },
            },
          }}
        />
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

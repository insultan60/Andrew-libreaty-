"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "./Header";
import GlobalEffects from "./GlobalEffects";
import MobileCtaBar from "./MobileCtaBar";
import AuthModal from "./AuthModal";
import { GTM_CONTAINER_ID } from "@/lib/site";

/**
 * The public site's furniture: header, footer, the mobile call bar, the sign-in
 * modal, the global scroll effects, the Tag Manager container and the UserWay
 * accessibility widget.
 *
 * It exists so /dashboard can opt out of all of it. The dashboard is a private
 * tool with its own navigation rail; the marketing header, the "Call Andrew"
 * bar pinned across the bottom of every phone screen and the lead-capture modal
 * all belong to a visitor being sold to, not to whoever is reading last week's
 * traffic.
 *
 * Tag Manager is the one that matters beyond appearances. Left in the root
 * layout it fired on /dashboard too, so every time someone opened the
 * dashboard to read the site's traffic, that visit was recorded AS site
 * traffic — the agent's own sessions inflating the numbers they were looking
 * at, concentrated on whichever pages they checked most. That is a measurement
 * error, not a cosmetic one, so the container loads for visitors only.
 *
 * Why a client component rather than a check in the root layout: a server
 * layout cannot know the pathname without reading headers(), and reading
 * headers() in the ROOT layout would opt the entire site out of static
 * rendering — every marketing page paying for one private route. A route group
 * with its own <html> shell would also work, but that means moving all twenty
 * route folders into app/(site)/, and the CSS imports and relative module paths
 * in this tree make that a much bigger change than the problem deserves.
 *
 * The footer arrives as a prop rather than an import on purpose. Footer is a
 * server component; importing it here would pull it and its icon set into the
 * client bundle on every page of the site. Passed in as a slot it stays
 * server-rendered.
 */

const BARE = ["/dashboard"];

export default function SiteChrome({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const bare = BARE.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (bare) {
    // Still <main id="main">, so the skip link target and the page's own
    // landmark structure stay valid on these routes too.
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <GlobalEffects />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      {footer}
      <MobileCtaBar />
      <AuthModal />
      <Script
        src="https://cdn.userway.org/widget.js"
        data-account="Wpzt1Vuecx"
        strategy="afterInteractive"
      />
    </>
  );
}

import type { SVGProps } from "react";

/**
 * The seven icons this dashboard needs, drawn inline.
 *
 * The version of this dashboard on the other site uses lucide-react. Pulling
 * that in here would add a dependency — and its tree-shaking depends on the
 * bundler getting it right — to a project that deliberately has four, for
 * seven glyphs. The site's own icon set (app/components/icons.tsx and
 * vuesax.tsx) is drawn the same way.
 *
 * Every one is aria-hidden: each is beside a text label, so announcing it
 * would only make a screen reader say the same thing twice.
 */

function Base({ children, ...props }: SVGProps<SVGSVGElement> & { children: React.ReactNode }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </Base>
  );
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M14 3v5h5" />
      <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7z" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Base>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 20v-1.5a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 5.74" />
    </Base>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </Base>
  );
}

export function PlugIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M9 2v6" />
      <path d="M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
      <path d="M12 17v5" />
    </Base>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base width={18} height={18} {...props}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </Base>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Base>
  );
}

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base width={14} height={14} {...props}>
      <path d="M13 4h7v7" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Base>
  );
}

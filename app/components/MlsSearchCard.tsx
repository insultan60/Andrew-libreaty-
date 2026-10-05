import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * The "Search My Full MLS" card that fills out a short listings row.
 *
 * Same look as the one on /property (styles in app/property.css). `beside` is
 * how many listing cards share its row: with one it spans the remaining two
 * columns, with none it runs the full width.
 */
export default function MlsSearchCard({
  href,
  place,
  beside,
}: {
  href: string;
  /** Display name, e.g. "Laurel Canyon". */
  place: string;
  beside: number;
}) {
  return (
    <Link href={href} className="prop-mls-card" data-beside={beside}>
      <p className="eyebrow">Search Every Listing</p>
      <h3>Search My Full MLS</h3>
      <p>
        {beside === 0
          ? `Nothing in ${place} is on the market with Andrew right now. Search every ${place} home for sale, straight from the MLS.`
          : `Beyond Andrew’s own listings, search every ${place} home for sale, straight from the MLS.`}
      </p>
      <span className="btn btn-gold">
        <span>Search {place} Homes</span>
        <ArrowRight />
      </span>
    </Link>
  );
}

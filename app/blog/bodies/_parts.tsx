import type { ReactNode } from "react";
import { ArrowRight } from "../../components/icons";

/**
 * Pieces shared by more than one article body.
 *
 * Underscore-prefixed so it reads as "not an article" next to the slug-named
 * files around it; nothing scans this directory, index.ts imports each body by
 * name, so the prefix is a signal to people rather than to the build.
 *
 * Figure and Cta lived inside tips-for-showing-your-house.tsx while it was the
 * only post. They moved here when the second article needed them, rather than
 * being copied — the alternative is two definitions drifting apart the first
 * time one of them is adjusted.
 */

/**
 * An in-article image. `width`/`height` are the asset's real pixel dimensions
 * so the browser reserves the right box before the file arrives — without them
 * the copy below jumps down as each image loads, which is the layout shift
 * Core Web Vitals measures.
 */
export function Figure({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="ar-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </figure>
  );
}

/**
 * In-article CTA panel.
 *
 * `title` is optional: without it this renders exactly the markup it always
 * did, so the existing article is untouched. With it, the heading line is a
 * `<p class="ar-cta-title">` rather than a real heading — these are
 * promotional interruptions, not document structure, and putting them in the
 * outline would drop three extra headings between the article's actual h2s.
 */
export function Cta({
  children,
  label,
  title,
  href = "/contact",
}: {
  children: ReactNode;
  label: string;
  title?: string;
  href?: string;
}) {
  return (
    <div className="ar-cta">
      {title ? (
        <div className="ar-cta-copy">
          <p className="ar-cta-title">{title}</p>
          <p>{children}</p>
        </div>
      ) : (
        <p>{children}</p>
      )}
      <a href={href} className="btn btn-gold btn-magnetic">
        <span>{label}</span>
        <ArrowRight />
      </a>
    </div>
  );
}

/**
 * A pros-and-cons panel.
 *
 * The source copy supplies this as a two-column table. It is rendered as two
 * lists instead: the rows are not actually paired — reading across row 3 gives
 * "Strong curb appeal" against "More outdoor maintenance", which are unrelated
 * — and a real table of sentence-length cells has nowhere to go on a phone but
 * a horizontal scrollbar. Two lists stack.
 */
type ProsConsItem = string | [string, string];

/** A [lead, rest] pair renders its lead in bold; a plain string is a whole
 *  sentence with no lead, for copy that is not written as label-then-detail. */
function ProsConsLine({ item }: { item: ProsConsItem }) {
  if (typeof item === "string") return <li>{item}</li>;
  const [lead, rest] = item;
  return (
    <li>
      <strong>{lead}</strong> {rest}
    </li>
  );
}

const itemKey = (item: ProsConsItem) => (typeof item === "string" ? item : item[0]);

export function ProsCons({ pros, cons }: { pros: ProsConsItem[]; cons: ProsConsItem[] }) {
  return (
    <div className="ar-proscon">
      <div className="ar-proscon-pros">
        <p className="ar-proscon-head">Pros</p>
        <ul>
          {pros.map((item) => (
            <ProsConsLine key={itemKey(item)} item={item} />
          ))}
        </ul>
      </div>
      <div className="ar-proscon-cons">
        <p className="ar-proscon-head">Cons</p>
        <ul>
          {cons.map((item) => (
            <ProsConsLine key={itemKey(item)} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * A real data table, for copy that genuinely is one: rows compared across the
 * same columns, where reading across a row means something. (ProsCons above
 * is the counter-case.)
 *
 * The first cell of each row is its header (`th scope="row"`), so a screen
 * reader announces "Speed, Sell to a cash buyer: ..." rather than a bare
 * value. The wrapper scrolls sideways on a phone instead of crushing four
 * sentence-length columns into slivers; it is focusable and labelled so that
 * scroll can be reached from the keyboard.
 */
export function Table({
  label,
  head,
  rows,
}: {
  /** names the table for assistive tech; not shown */
  label: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="ar-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table className="ar-table">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={c}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Numbered steps, where the order is the content (a process to follow), as
 * opposed to the bulleted lists the rest of the copy uses. Each item is a
 * bold lead and the sentence after it.
 */
export function Steps({ items }: { items: [string, ReactNode][] }) {
  return (
    <ol className="ar-steps">
      {items.map(([lead, rest]) => (
        <li key={lead}>
          <strong>{lead}</strong> {rest}
        </li>
      ))}
    </ol>
  );
}

"use client";

import { useEffect, useState } from "react";
import { fetchRawListings, type RawIdxListing } from "@/lib/idx";

type ListingsState = { data: RawIdxListing[] | null; loading: boolean; error: string | null };

// Module-level cache so every page/component using this hook shares one
// fetch instead of each firing its own request against IDX Broker's
// (fairly low) hourly rate limit.
let cache: Promise<RawIdxListing[]> | null = null;

function loadListings(): Promise<RawIdxListing[]> {
  if (!cache) {
    cache = fetchRawListings().catch((err: unknown) => {
      cache = null; // let the next mount retry instead of caching a failure forever
      throw err;
    });
  }
  return cache;
}

/** Real IDX Broker listings (featured/active + sold/pending) for this
 *  account. Returns the raw combined array — call toListing()/
 *  toDetailListing() from lib/idx.ts to get the shape a given page needs.
 *
 *  `initial` lets a server component hand over listings it has already
 *  fetched. When it is supplied the hook starts populated and never fetches:
 *  the markup is then identical on both sides, which is what lets the page be
 *  indexed with real content instead of an empty shell. Every existing caller
 *  passes nothing and behaves exactly as before. */
export function useIdxListings(initial?: RawIdxListing[] | null): ListingsState {
  const seeded = Boolean(initial && initial.length > 0);
  const [state, setState] = useState<ListingsState>(
    seeded
      ? { data: initial as RawIdxListing[], loading: false, error: null }
      : { data: null, loading: true, error: null }
  );

  useEffect(() => {
    if (seeded) return;
    let cancelled = false;
    loadListings()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err instanceof Error ? err.message : "Failed to load listings" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [seeded]);

  return state;
}

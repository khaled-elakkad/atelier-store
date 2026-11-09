import Link from "next/link";
import { Fragment } from "react";
import { EditorialTile } from "@/components/home/editorial-tile";
import { FILTER_PANEL_ID, FilterPanel } from "@/components/listing/filter-panel";
import { ProductCard } from "@/components/product/product-card";
import type { Editorial } from "@/lib/catalog";
import {
  activeFilterCount,
  applyListingQuery,
  COLOR_OPTIONS,
  parseListingQuery,
  PRICE_RANGES,
  sortLabel,
} from "@/lib/listing";
import { getProducts } from "@/lib/products";
import type { CategorySlug } from "@/types/product";

/** Editorial tile goes after this many products (end of row 2 on desktop). */
const FEATURE_POSITION = 6;

export async function ListingResults({
  category,
  basePath,
  searchParams,
  feature,
}: {
  category: CategorySlug | null;
  basePath: string;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  feature?: Editorial;
}) {
  const query = parseListingQuery(await searchParams);
  const items = applyListingQuery(await getProducts(category ?? undefined), query);
  const filterCount = activeFilterCount(query);
  const showFeature = feature && filterCount === 0 && items.length > FEATURE_POSITION + 2;

  const summary = [
    ...query.colors.map((c) => COLOR_OPTIONS.find((o) => o.value === c)!.label),
    ...(query.price ? [PRICE_RANGES.find((r) => r.value === query.price)!.label] : []),
  ];

  return (
    <>
      {/* Toolbar: count + sort on the left, filter trigger on the right */}
      <div className="container-bleed flex items-center justify-between gap-4 py-4">
        <p>
          {items.length} {items.length === 1 ? "item" : "items"}
          <span className="hidden text-muted-foreground sm:inline"> sorted by </span>
          <button
            type="button"
            popoverTarget={FILTER_PANEL_ID}
            className="link hidden cursor-pointer sm:inline"
          >
            {sortLabel(query.sort)}
          </button>
        </p>
        <button
          type="button"
          popoverTarget={FILTER_PANEL_ID}
          className="link flex cursor-pointer items-center gap-2"
        >
          <FilterIcon />
          Filter and sort
          {filterCount > 0 && <span className="price">({filterCount})</span>}
        </button>
      </div>

      {summary.length > 0 && (
        <div className="container-bleed -mt-2 flex flex-wrap items-baseline gap-x-2 pb-4 text-muted-foreground">
          <span>Showing</span>
          <span className="text-foreground">{summary.join(", ")}</span>
          <span aria-hidden>·</span>
          <Link href={basePath} scroll={false} className="link">
            Clear all
          </Link>
        </div>
      )}

      {items.length === 0 ? (
        <div className="container-page flex flex-col items-center gap-4 py-section text-center">
          <p className="text-lead">No pieces match these filters.</p>
          <Link href={basePath} scroll={false} className="btn btn-secondary">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((product, index) => (
            <Fragment key={product.id}>
              {showFeature && index === FEATURE_POSITION && (
                <EditorialTile
                  item={feature}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  frameClassName="grid-feature aspect-[4/5] md:aspect-auto"
                />
              )}
              <ProductCard product={product} />
            </Fragment>
          ))}
        </div>
      )}

      <FilterPanel basePath={basePath} query={query} />
    </>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 3.5h14M0 10.5h14" />
      <circle cx="4.5" cy="3.5" r="1.75" fill="var(--color-background)" />
      <circle cx="9.5" cy="10.5" r="1.75" fill="var(--color-background)" />
    </svg>
  );
}

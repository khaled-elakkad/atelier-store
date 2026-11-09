// Sorting and filtering for product listings, driven by URL search params:
//   ?sort=price-asc&color=black&color=red&price=500-1500
import type { Product, ProductColor } from "@/types/product";

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Price bands in cents. `max` is exclusive. */
export const PRICE_RANGES = [
  { value: "under-500", label: "Under $500", min: 0, max: 50000 },
  { value: "500-1500", label: "$500 – $1,500", min: 50000, max: 150000 },
  { value: "1500-3000", label: "$1,500 – $3,000", min: 150000, max: 300000 },
  { value: "over-3000", label: "Over $3,000", min: 300000, max: Infinity },
] as const;

export type PriceValue = (typeof PRICE_RANGES)[number]["value"];

/** Swatch colors are product data, not theme tokens. */
export const COLOR_OPTIONS: { value: ProductColor; label: string; swatch: string }[] = [
  { value: "black", label: "Black", swatch: "#111111" },
  { value: "white", label: "White", swatch: "#f4f2ee" },
  { value: "neutral", label: "Neutral", swatch: "#d6c7ad" },
  { value: "brown", label: "Brown", swatch: "#7b4a2b" },
  { value: "red", label: "Red", swatch: "#a8262b" },
  { value: "pink", label: "Pink", swatch: "#e5b3b5" },
  { value: "blue", label: "Blue", swatch: "#2f4a74" },
  { value: "yellow", label: "Yellow", swatch: "#e2b93b" },
  { value: "gold", label: "Gold", swatch: "#c2a14d" },
  {
    value: "multi",
    label: "Multi",
    swatch: "conic-gradient(#a8262b, #e2b93b, #2f4a74, #a8262b)",
  },
];

export type ListingQuery = {
  sort: SortValue;
  colors: ProductColor[];
  price: PriceValue | null;
};

type RawParams = Record<string, string | string[] | undefined>;

const asArray = (v: string | string[] | undefined) =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

/** Parse and validate search params; unknown values are ignored. */
export function parseListingQuery(params: RawParams): ListingQuery {
  const sort = asArray(params.sort)[0];
  const price = asArray(params.price)[0];
  const colorValues = new Set(COLOR_OPTIONS.map((c) => c.value as string));

  return {
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortValue) : "recommended",
    colors: asArray(params.color).filter((c): c is ProductColor => colorValues.has(c)),
    price: PRICE_RANGES.some((r) => r.value === price) ? (price as PriceValue) : null,
  };
}

export function applyListingQuery(products: Product[], query: ListingQuery) {
  const range = PRICE_RANGES.find((r) => r.value === query.price);

  const filtered = products.filter(
    (p) =>
      (query.colors.length === 0 || query.colors.includes(p.color)) &&
      (!range || (p.price >= range.min && p.price < range.max)),
  );

  switch (query.sort) {
    case "newest":
      return filtered.toSorted((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "price-asc":
      return filtered.toSorted((a, b) => a.price - b.price);
    case "price-desc":
      return filtered.toSorted((a, b) => b.price - a.price);
    default:
      return filtered;
  }
}

/** Number of active filters (sort is not a filter). */
export function activeFilterCount(query: ListingQuery) {
  return query.colors.length + (query.price ? 1 : 0);
}

export function sortLabel(sort: SortValue) {
  return SORT_OPTIONS.find((o) => o.value === sort)!.label;
}

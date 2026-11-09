import type { Product } from "@/types/product";

/** At or below this, show "Only N left". */
export const LOW_STOCK_THRESHOLD = 3;

export type StockState =
  | { status: "in-stock"; label: string }
  | { status: "low-stock"; label: string }
  | { status: "sold-out"; label: string };

export function getStockState(product: Pick<Product, "stock">): StockState {
  if (product.stock <= 0) return { status: "sold-out", label: "Sold out" };
  if (product.stock <= LOW_STOCK_THRESHOLD)
    return { status: "low-stock", label: `Only ${product.stock} left` };
  return { status: "in-stock", label: "In stock" };
}

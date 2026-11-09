import { getStockState } from "@/lib/stock";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

/** Monochrome stock indicator: filled dot, half dot or hollow dot plus label. */
export function StockStatus({ product }: { product: Product }) {
  const { status, label } = getStockState(product);

  return (
    <p className={cn("flex items-center gap-2", status === "sold-out" && "text-muted-foreground")}>
      <span
        aria-hidden
        className={cn(
          "size-2 shrink-0 rounded-full border border-current",
          status === "in-stock" && "bg-current",
          status === "low-stock" && "bg-linear-to-r from-current from-50% to-transparent to-50%",
        )}
      />
      {label}
    </p>
  );
}

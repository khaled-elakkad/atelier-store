import Image from "next/image";
import Link from "next/link";
import { getStockState } from "@/lib/stock";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = getStockState(product).status === "sold-out";

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article>
        <div className="media-frame">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            // Most source photos are landscape (3:2); filling a 3:4 frame
            // needs ~2x the frame width, so request double the column width.
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="card-body pb-8">
          {/* Fixed-height line keeps names aligned whether or not a tag is set. */}
          <p className="h-4 text-caption text-muted-foreground">
            {soldOut ? "Sold out" : product.badge}
          </p>
          <h3>{product.name}</h3>
          <p className="price">{formatPrice(product.price)}</p>
        </div>
      </article>
    </Link>
  );
}

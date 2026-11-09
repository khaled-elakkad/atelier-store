import type { productColor } from "@/db/schema";

/** Categories live in the database, so a slug is any string. */
export type CategorySlug = string;

export type ProductColor = (typeof productColor.enumValues)[number];

export type Product = {
  id: number;
  /** Human-facing product code, e.g. "P-001". */
  code: string;
  slug: string;
  name: string;
  description: string;
  /** Price in the smallest currency unit (e.g. cents). */
  price: number;
  imageUrl: string;
  category: CategorySlug;
  color: ProductColor;
  /** ISO date the product was added; drives "Newest" sorting. */
  addedAt: string;
  /** Units available. 0 = sold out. */
  stock: number;
  /** Short merchandising tag shown on the card, e.g. "New". */
  badge: string | null;
};

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
};

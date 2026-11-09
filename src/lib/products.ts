// Catalog queries. Every reader is cached with `use cache` so pages stay in
// the prerendered shell; writes should call `revalidateTag(CATALOG_TAG)`.
import { and, asc, desc, eq, gt, inArray, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Category, CategorySlug, Product } from "@/types/product";

export const CATALOG_TAG = "catalog";

function cacheCatalog() {
  cacheTag(CATALOG_TAG);
  // Short lifetime so stock edited directly in the database shows up soon.
  cacheLife("minutes");
}

const productColumns = {
  id: products.id,
  code: products.code,
  slug: products.slug,
  name: products.name,
  description: products.description,
  price: products.priceCents,
  imageUrl: products.imageUrl,
  category: categories.slug,
  color: products.color,
  addedAt: products.addedAt,
  stock: products.stock,
  badge: products.badge,
};

/** Products joined to their category slug, in the `Product` view shape. */
function selectProducts() {
  return db
    .select(productColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id));
}

const categoryColumns = {
  slug: categories.slug,
  title: categories.title,
  description: categories.description,
};

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheCatalog();
  return db.select(categoryColumns).from(categories).orderBy(asc(categories.position));
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  "use cache";
  cacheCatalog();
  const [row] = await db
    .select(categoryColumns)
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return row;
}

/**
 * Products in one category (catalog order), or all products interleaved
 * across categories so "Recommended" reads as a mixed edit rather than one
 * category after another.
 */
export async function getProducts(category?: CategorySlug): Promise<Product[]> {
  "use cache";
  cacheCatalog();
  if (category) {
    return selectProducts().where(eq(categories.slug, category)).orderBy(asc(products.id));
  }
  const rank = sql`row_number() over (partition by ${products.categoryId} order by ${products.id})`;
  return selectProducts().orderBy(rank, asc(categories.position));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheCatalog();
  const [row] = await selectProducts().where(eq(products.slug, slug)).limit(1);
  return row;
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheCatalog();
  const rows = await db.select({ slug: products.slug }).from(products).orderBy(asc(products.id));
  return rows.map((r) => r.slug);
}

/** Other in-stock products from the same category, newest first. */
export function getRelatedProducts(product: Product, limit = 4) {
  return getRelated(product.id, product.category, limit);
}

async function getRelated(id: number, category: CategorySlug, limit: number): Promise<Product[]> {
  "use cache";
  cacheCatalog();
  return selectProducts()
    .where(and(eq(categories.slug, category), ne(products.id, id), gt(products.stock, 0)))
    .orderBy(desc(products.addedAt), asc(products.id))
    .limit(limit);
}

/** Products by code ("P-001"), in the order given. Throws on an unknown code. */
export async function getProductsByCode(codes: string[]): Promise<Product[]> {
  "use cache";
  cacheCatalog();
  const rows = await selectProducts().where(inArray(products.code, codes));
  const byCode = new Map(rows.map((p) => [p.code, p]));
  return codes.map((code) => {
    const product = byCode.get(code);
    if (!product) throw new Error(`Unknown product code: ${code}`);
    return product;
  });
}

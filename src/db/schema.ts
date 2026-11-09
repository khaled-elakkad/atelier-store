import { relations, sql } from "drizzle-orm";
import { check, date, index, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const productColor = pgEnum("product_color", [
  "black",
  "white",
  "neutral",
  "brown",
  "red",
  "pink",
  "blue",
  "yellow",
  "gold",
  "multi",
]);

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text().notNull(),
  /** Display order: category tabs and the "Recommended" interleave. */
  position: integer().notNull().default(0),
});

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    /** Human-facing product code, e.g. "P-001". */
    code: text().notNull().unique(),
    slug: text().notNull().unique(),
    name: text().notNull(),
    description: text().notNull(),
    /** Price in cents. */
    priceCents: integer().notNull(),
    imageUrl: text().notNull(),
    categoryId: integer()
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    color: productColor().notNull(),
    /** Short merchandising tag shown on the card, e.g. "New". */
    badge: text(),
    /** Units available. 0 = sold out. */
    stock: integer().notNull().default(0),
    /** Date the product was added; drives "Newest" sorting. */
    addedAt: date({ mode: "string" }).notNull(),
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    check("products_price_nonneg", sql`${t.priceCents} >= 0`),
    check("products_stock_nonneg", sql`${t.stock} >= 0`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
}));

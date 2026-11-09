// Resets the catalog tables and inserts the sample data. Safe to re-run.
//   npm run db:seed
import { loadEnvConfig } from "@next/env";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { unsplash } from "../lib/unsplash";
import * as schema from "./schema";
import { DEFAULT_STOCK, seedCategories, seedProducts, stockOverrides } from "./seed-data";

loadEnvConfig(process.cwd());

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema, casing: "snake_case" });

  try {
    await db.transaction(async (tx) => {
      await tx.execute(sql`TRUNCATE ${schema.products}, ${schema.categories} RESTART IDENTITY CASCADE`);

      const inserted = await tx
        .insert(schema.categories)
        .values(seedCategories.map((c, position) => ({ ...c, position })))
        .returning({ id: schema.categories.id, slug: schema.categories.slug });
      const categoryId = new Map(inserted.map((c) => [c.slug, c.id]));

      // Inserted in array order, so identity ids follow it (used for "Recommended").
      await tx.insert(schema.products).values(
        seedProducts.map((p) => {
          const id = categoryId.get(p.category);
          if (id === undefined) throw new Error(`Unknown category "${p.category}" on ${p.id}`);
          return {
            code: p.id.toUpperCase(),
            slug: slugify(p.name),
            name: p.name,
            description: p.description,
            priceCents: p.price,
            imageUrl: unsplash(p.image),
            categoryId: id,
            color: p.color,
            badge: p.badge ?? null,
            stock: stockOverrides[p.id] ?? DEFAULT_STOCK,
            addedAt: p.addedAt,
          };
        }),
      );
    });
    console.log(`Seeded ${seedCategories.length} categories and ${seedProducts.length} products.`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

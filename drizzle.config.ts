import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

// `generate` works offline; `migrate`, `studio` and `push` need DATABASE_URL.
// On Supabase, migrate through the direct/session connection, not the
// transaction pooler.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
});

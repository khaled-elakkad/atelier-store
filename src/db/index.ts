import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type Db = NodePgDatabase<typeof schema> & { $client: Pool };

// Reuse one pool across dev hot reloads instead of opening a new one per edit.
const globalForDb = globalThis as unknown as { db?: Db };

function createDb(): Db {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env (see .env.example).");
  }
  return drizzle(new Pool({ connectionString }), { schema, casing: "snake_case" });
}

export const db = globalForDb.db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;

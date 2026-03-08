import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/pingpong";

export const db = drizzle(DATABASE_URL, { schema });
export { pongs } from "./schema.js";
export type { Pong } from "./schema.js";
export { desc } from "drizzle-orm";

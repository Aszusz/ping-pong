import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

if (!process.env.DATABASE_URL)
  throw new Error("Missing required env variable: DATABASE_URL");

export const db = drizzle(process.env.DATABASE_URL, { schema });
export { pongs } from "./schema.js";
export type { Pong } from "./schema.js";
export { desc } from "drizzle-orm";

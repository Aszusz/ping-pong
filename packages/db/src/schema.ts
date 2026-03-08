import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const pongs = pgTable("pongs", {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export type Pong = typeof pongs.$inferSelect;

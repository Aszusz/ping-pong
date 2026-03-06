import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const pongs = pgTable("pongs", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Pong = typeof pongs.$inferSelect;
export type NewPong = typeof pongs.$inferInsert;

import { FastifyInstance } from "fastify";
import { db, pongs, desc } from "@ping-pong/db";
import type { Pong } from "@ping-pong/shared";

export async function pongRoutes(app: FastifyInstance) {
  app.get("/pongs", async (): Promise<Pong[]> => {
    const rows = await db.select().from(pongs).orderBy(desc(pongs.createdAt));
    return rows;
  });

  app.post("/pongs", async (): Promise<Pong> => {
    const [row] = await db.insert(pongs).values({}).returning();
    return row;
  });

  app.delete("/pongs", async () => {
    await db.delete(pongs);
    return { ok: true };
  });
}

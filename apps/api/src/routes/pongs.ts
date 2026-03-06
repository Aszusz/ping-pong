import { FastifyPluginAsync } from "fastify";
import { db, pongs } from "@ping-pong/db";
import { desc } from "drizzle-orm";

export const pongRoutes: FastifyPluginAsync = async (app) => {
  app.get("/pongs", async () => {
    return db.select().from(pongs).orderBy(desc(pongs.createdAt));
  });

  app.post("/pongs", async (_req, reply) => {
    const [pong] = await db.insert(pongs).values({}).returning();
    return reply.status(201).send(pong);
  });

  app.delete("/pongs", async (_req, reply) => {
    await db.delete(pongs);
    return reply.status(204).send();
  });
};

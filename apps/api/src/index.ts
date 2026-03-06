import Fastify from "fastify";
import cors from "@fastify/cors";
import { pongRoutes } from "./routes/pongs.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(pongRoutes);

app.listen({ host: "0.0.0.0", port: Number(process.env.PORT ?? 3000) });

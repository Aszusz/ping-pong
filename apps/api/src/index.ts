import fastify from "fastify";
import cors from "@fastify/cors";
import { pongRoutes } from "./routes/pongs.js";

const app = fastify({
  logger: { transport: { target: "pino-pretty" } },
});

const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

await app.register(cors, {
  origin: corsOrigin,
  methods: ["GET", "POST", "DELETE"],
});
await app.register(pongRoutes);

app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

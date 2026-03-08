import fastify from "fastify";
import cors from "@fastify/cors";
import { pongRoutes } from "./routes/pongs.js";

const app = fastify({
  logger:
    process.env.NODE_ENV === "production"
      ? true
      : { transport: { target: "pino-pretty" } },
});

if (!process.env.PORT) throw new Error("Missing required env variable: PORT");
if (!process.env.CORS_ORIGIN)
  throw new Error("Missing required env variable: CORS_ORIGIN");

const port = Number(process.env.PORT);
const corsOrigin = process.env.CORS_ORIGIN;

await app.register(cors, {
  origin: corsOrigin,
  methods: ["GET", "POST", "DELETE"],
});
await app.register(pongRoutes);

app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

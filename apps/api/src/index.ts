import fastify from "fastify";
import cors from "@fastify/cors";
import { pongRoutes } from "./routes/pongs.js";

const app = fastify({
  logger: { transport: { target: "pino-pretty" } },
});

await app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
});
await app.register(pongRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

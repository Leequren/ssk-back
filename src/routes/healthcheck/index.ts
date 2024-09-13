import { FastifyInstance } from "fastify";
import { HealthCheckHandler } from "./HealthCheckHanderl";

export async function HealthCheckRoutes(app: FastifyInstance) {
  app.get("/health", HealthCheckHandler);
}

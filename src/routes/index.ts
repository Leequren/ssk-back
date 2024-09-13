import { FastifyInstance } from "fastify";
import { setupProductsRoutes } from "./products";

export async function setupRoutes(app: FastifyInstance) {
  await app.register(setupProductsRoutes);
}

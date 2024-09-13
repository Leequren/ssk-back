import { FastifyInstance } from "fastify";
import { setupProductsRoutes } from "./products";
import { setupUploadRoutes } from "./upload";

export async function setupRoutes(app: FastifyInstance) {
  await app.register(setupProductsRoutes);
  await app.register(setupUploadRoutes);
}

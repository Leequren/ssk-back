import { FastifyInstance } from "fastify";
import { setupProductsRoutes } from "./products";
import { setupUploadRoutes } from "./upload";
import { setupFeedbackFormRoutes } from "./feedBackForm";

export async function setupRoutes(app: FastifyInstance) {
  await app.register(setupProductsRoutes);
  await app.register(setupUploadRoutes);
  await app.register(setupFeedbackFormRoutes);
}

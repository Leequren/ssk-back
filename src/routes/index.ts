import { FastifyInstance } from "fastify";
import { setupProductsRoutes } from "./products";
import { setupUploadRoutes } from "./upload";
import { setupFeedbackFormRoutes } from "./feedBackForm";
import { setupUserRoutes } from "./users";
import { setupPartProductRoutes } from "./partsProduct";

export async function setupRoutes(app: FastifyInstance) {
  await app.register(setupPartProductRoutes);
  await app.register(setupProductsRoutes);
  await app.register(setupUploadRoutes);
  await app.register(setupFeedbackFormRoutes);
  await app.register(setupUserRoutes);
}

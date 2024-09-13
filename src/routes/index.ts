import { FastifyInstance } from "fastify";
import { HealthCheckRoutes } from "./healthcheck";
import { userRoutes } from "./user";
import { userPasswordsRoutes } from "./userPasswords";

export async function SetupRoutes(app: FastifyInstance) {
  app.register(HealthCheckRoutes);
  app.register(userRoutes);
  app.register(userPasswordsRoutes);
}

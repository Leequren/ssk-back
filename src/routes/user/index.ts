import { FastifyInstance } from "fastify";
import { LoginHandler, RegisterHandler } from "./AuthRegisterHandlers";

export async function userRoutes(app: FastifyInstance) {
  console.log(app.authenticate);
  app.post("/api/register", RegisterHandler);
  app.post("/api/login", { onRequest: app.authenticate }, LoginHandler);
}

import { FastifyInstance } from "fastify";
import { verifyAuth } from "./auth";

export async function setupDecorators(app: FastifyInstance) {
  app.decorate("authenticate", verifyAuth);
  // console.log(app.authenticate);
}

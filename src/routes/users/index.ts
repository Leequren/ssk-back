import { FastifyInstance } from "fastify";
import { getUserTokenHandler } from "./getUserToken";
import { changePasswordHandler } from "./changePassword";

export async function setupUserRoutes(app: FastifyInstance) {
  app.post("/user", getUserTokenHandler);
  app.post(
    "/user/changePassword",
    { preHandler: app.authenticate },
    changePasswordHandler
  );
}

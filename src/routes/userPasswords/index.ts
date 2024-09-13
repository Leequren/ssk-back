import { FastifyInstance } from "fastify";
import {
  createUserLoginDetailsHandler,
  getOneUserLoginDetailsByIdHandler,
  getUserLoginDetailsHadler as getUserLoginDetailsHadler,
} from "./userPasswordsHandler";

export async function userPasswordsRoutes(app: FastifyInstance) {
  app.get(
    "/api/userLoginDetails/",
    { onRequest: app.authenticate },
    getUserLoginDetailsHadler
  );
  app.put(
    "/api/userLoginDetails/create",
    { onRequest: app.authenticate },
    createUserLoginDetailsHandler
  );
  app.get(
    "/api/userLoginDetails/getOne:idLoginDetails",
    { onRequest: app.authenticate },
    getOneUserLoginDetailsByIdHandler
  );
}

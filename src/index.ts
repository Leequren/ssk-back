import fastify from "fastify";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { setupProductsRoutes } from "./routes/products";
import { setupRoutes } from "./routes";
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import fastifyJwt, { FastifyJwtNamespace } from "@fastify/jwt";
import { jwtKey } from "./config/consts";
import { setupDecorators } from "./hooks";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const prisma = new PrismaClient();

declare module "fastify" {
  export interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; login: string };
  }
}
async function checkDdatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Подключение к базе данных успешно установлено");
  } catch (err) {
    console.error("Ошибка подключение к базе данных", err);
  } finally {
    await prisma.$disconnect();
  }
}

const main = async () => {
  try {
    const app = fastify();
    const PORT = Number(process.env.PORT) || 5000;
    console.log(typeof PORT);

    await app.register(cors);
    await app.register(fastifyMultipart);
    await app.register(fastifyFormbody);
    await app.register(fastifyStatic, {
      root: path.join(__dirname, "../", "public/"),
      prefix: "/public",
    });

    await app.register(fastifyJwt, {
      secret: jwtKey,
    });
    setupDecorators(app);
    console.log(app.authenticate);
    await app.register(setupRoutes);
    await checkDdatabaseConnection();

    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
};

main();

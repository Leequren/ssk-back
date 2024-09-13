import fastify from "fastify";
import dotenv from "dotenv";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { SetupRoutes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { setupDecorators } from "./hooks";
import { verifyAuth } from "./hooks/auth";
import { FastifyJwtNamespace } from "@fastify/jwt";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

declare module "fastify" {
  export interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; name: string; email: string };
  }
}

const BACKEND_PORT = process.env.BACKEND_PORT
  ? parseInt(process.env.BACKEND_PORT)
  : 4500;

const JWT_KEY = process.env.JWT_KEY || "jwt keyyyy";
export const prisma = new PrismaClient();
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Подключение к базе данных успешно установлено.");
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const main = async () => {
  const app = fastify();

  await app.register(fastifyJwt, {
    secret: JWT_KEY,
  });

  await setupDecorators(app);
  console.log("Setup decorators");

  await app.register(SetupRoutes);

  await checkDatabaseConnection();

  await app.listen({ port: BACKEND_PORT });
  console.log(`Сервер запущен на порту: ${BACKEND_PORT}`);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

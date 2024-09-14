import { FastifyInstance } from "fastify";
import { getProductsHandler } from "./getProducts";
import { addProductHandler } from "./addProduct";
import { removeProductHandler } from "./removeProduct";

export async function setupProductsRoutes(app: FastifyInstance) {
  app.post(
    "/products/add",
    { preHandler: app.authenticate },
    addProductHandler
  );
  app.get("/products", getProductsHandler);
  app.post(
    "/products/remove",
    { preHandler: app.authenticate },
    removeProductHandler
  );
}

import { FastifyInstance } from "fastify";
import { getProductsHandler } from "../products/getProducts";
import {
  createPartProductHandler,
  getPartsProductHandler,
  removePartByIdHandler,
} from "./actions";
import { removeProductHandler } from "../products/removeProduct";

export async function setupPartProductRoutes(app: FastifyInstance) {
  app.get("/product/part/", getPartsProductHandler);
  app.post("/product/part/", createPartProductHandler);
  app.delete("/product/part/", removePartByIdHandler);
}

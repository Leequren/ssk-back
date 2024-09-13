import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function getProductsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await prisma.product.findMany();
    return reply.send(products);
  } catch (err) {
    console.error(err);
    reply.code(500).send("Что-то пошло не так");
  }
}

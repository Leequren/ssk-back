import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function removeProductHandler(
  req: FastifyRequest<{
    Body: {
      idProduct: number;
    };
  }>,
  reply: FastifyReply
) {
  const { idProduct } = req.body;

  try {
    const deleteProduct = await prisma.product.delete({
      where: { id: idProduct },
    });

    reply.status(200).send({ message: "Product removed successfully" });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ message: "product not found" });
  }
}

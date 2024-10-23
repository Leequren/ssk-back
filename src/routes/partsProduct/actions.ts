import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function createPartProductHandler(
  req: FastifyRequest<{
    Body: {
      title: string;
      imageUrl: string;
      description: string;
      characteristics: string[];
      price: number;
    };
  }>,
  reply: FastifyReply
) {
  const data = req.body;
  try {
    const partProduct = await prisma.partProduct.create({ data: data });
    await reply.status(201).send(partProduct);
  } catch (err) {
    console.error(err);
    return reply.status(500).send("Error creating part product");
  }
}

export async function getPartsProductHandler(
  _req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const partProducts = await prisma.partProduct.findMany();
    return reply.send(partProducts);
  } catch (err) {
    console.error(err);
    reply.status(500).send("Error getting part products");
  }
}

export async function removePartByIdHandler(
  req: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  try {
    await prisma.partProduct.delete({ where: { id } });
    return reply.send("Part product deleted successfully");
  } catch (err) {
    console.log(err);
    return reply.status(500).send("Error deleting part product");
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function addProductHandler(
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
  const { title, imageUrl, description, characteristics, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        title,
        imageUrl,
        description,
        characteristics,
        price,
      },
    });
    return reply.send(product);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Что-то пошло не так с добавлением продукта");
  }
}

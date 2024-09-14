import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";
import { unlink } from "fs";
import path from "path";
import { uploadDir } from "../../config/consts";

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

    unlink(
      path.join(uploadDir, `/${deleteProduct.imageUrl.split("/")[2]}`),
      function (err) {
        if (err) {
          console.error(err);
          return reply.send({ message: "error deleted image product" });
        }
        console.log(`File ${deleteProduct.imageUrl} deleted!`);
      }
    );

    reply.status(200).send({ message: "Product removed successfully" });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ message: "product not found" });
  }
}

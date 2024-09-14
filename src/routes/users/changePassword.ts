import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";
import { encrypt } from "../../utils/cryptAndDecrypt";
import { passwordKey } from "../../config/consts";

export async function changePasswordHandler(
  req: FastifyRequest<{
    Body: {
      newPassword: string;
    };
  }>,
  reply: FastifyReply
) {
  const { newPassword } = req.body;
  const hashedPassword = encrypt(newPassword, passwordKey);
  await prisma.user.update({
    where: { id: req.user.id },
    data: { hashedPassword },
  });
  return reply.send({ message: "password changed" });
}

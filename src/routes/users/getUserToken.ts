import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { prisma } from "../..";
import { decrypt } from "../../utils/cryptAndDecrypt";
import { passwordKey } from "../../config/consts";

export async function getUserTokenHandler(
  req: FastifyRequest<{
    Body: {
      login: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { login, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        login: login,
      },
    });
    if (!user) {
      return reply
        .code(404)
        .send({ status: "error", message: "User not found" });
    }
    const decriptedPassword = decrypt(user.hashedPassword, passwordKey);
    console.log(decriptedPassword);
    if (password === decriptedPassword) {
      const token = req.server.jwt.sign({
        id: user.id,
        login: user.login,
      });
      return reply.send({ token });
    }
    return reply.send({ message: "invalid login or password" });
  } catch (err) {
    console.log(err);
    return reply.send({ status: "ok" });
  }
}

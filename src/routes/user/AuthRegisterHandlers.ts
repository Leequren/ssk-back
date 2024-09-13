import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";
import { generateArrayNumericPasswords } from "../../utils/createRandomPasswords";

export async function RegisterHandler(
  req: FastifyRequest<{
    Body: {
      login: string;
      password: string;
      name: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }>,
  reply: FastifyReply
) {
  const { login, password, name, lastName, email, phone } = req.body;
  const passwords = generateArrayNumericPasswords(10, 10);
  try {
    const user = await prisma.user.create({
      data: {
        login,
        hashedPassword: password,
        name,
        lastname: lastName,
        email,
        phone: phone,
        additionalPasswords: passwords,
      },
    });

    const token = req.server.jwt.sign({
      id: user.id_user,
      name: user.name,
      email: user.email,
    });

    reply.send({
      message: "register successfull",
      additionalPasswords: passwords,
      token: token,
    });
  } catch (err) {
    console.log(err);
    reply.status(400);
    reply.send({ message: "register failed" });
    return;
  }
}

export async function LoginHandler(req: FastifyRequest, reply: FastifyReply) {
  console.log(req.user);
  reply.send({ message: "success" });
}

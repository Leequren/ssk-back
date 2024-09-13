import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function createFormHandler(
  req: FastifyRequest<{
    Body: {
      name: string;
      email: string;
      phone: string;
      text: string;
    };
  }>,
  reply: FastifyReply
) {
  const { name, email, phone, text } = req.body;
  try {
    const feedbackForm = await prisma.feedbackForm.create({
      data: {
        name,
        email,
        phone,
        text,
      },
    });
    return reply.send(feedbackForm);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Failed to create feedback form" });
  }
}

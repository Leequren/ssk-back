import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function getFormsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const feedbackForms = await prisma.feedbackForm.findMany();
  return reply.send({ forms: feedbackForms });
}

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";

export async function setReplyTrueHandler(
  req: FastifyRequest<{
    Body: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  if (!id) {
    return reply.status(400).send({ message: "Missing id" });
  }
  await prisma.feedbackForm.update({
    where: {
      id: id,
    },
    data: {
      checkReply: true,
    },
  });
  return reply
    .status(200)
    .send({ message: "Reply status updated successfully" });
}

export async function setReplyFalseHandler(
  req: FastifyRequest<{
    Body: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  if (!id) {
    return reply.status(400).send({ message: "Missing id" });
  }
  await prisma.feedbackForm.update({
    where: {
      id: id,
    },
    data: {
      checkReply: false,
    },
  });
  return reply
    .status(200)
    .send({ message: "Reply status updated successfully" });
}

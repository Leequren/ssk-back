import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    console.error(err);
    reply.send(err);
  }
}

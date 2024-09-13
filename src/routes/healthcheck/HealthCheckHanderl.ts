import { FastifyReply, FastifyRequest } from "fastify";

export function HealthCheckHandler(req: FastifyRequest, reply: FastifyReply) {
  reply.send("Backend status is ok");
}

import { FastifyInstance } from "fastify";
import { createFormHandler } from "./createForm";
import { getFormsHandler } from "./getForms";
import { setReplyFalseHandler, setReplyTrueHandler } from "./setReply";

export async function setupFeedbackFormRoutes(app: FastifyInstance) {
  app.post("/feedbackForms/create", createFormHandler);
  app.get("/feedbackForms", getFormsHandler);
  app.post("feedbackForms/setReplyTrueForm", setReplyTrueHandler);
  app.post("feedbackForms/setReplyFalseForm", setReplyFalseHandler);
}

-- CreateTable
CREATE TABLE "FeedbackForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkReply" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FeedbackForm_pkey" PRIMARY KEY ("id")
);

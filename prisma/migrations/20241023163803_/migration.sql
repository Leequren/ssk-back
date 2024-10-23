-- CreateTable
CREATE TABLE "PartProduct" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" TEXT[],
    "price" INTEGER NOT NULL,

    CONSTRAINT "PartProduct_pkey" PRIMARY KEY ("id")
);

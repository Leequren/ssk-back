-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "additionalPasswords" TEXT[],
    "subcribe" BOOLEAN NOT NULL DEFAULT false,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id_chapter" SERIAL NOT NULL,
    "nameChapter" TEXT NOT NULL,
    "descrChapter" TEXT NOT NULL,
    "imgChapter" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id_chapter")
);

-- CreateTable
CREATE TABLE "KeyDecrept" (
    "id_key_decrept" SERIAL NOT NULL,
    "keyDecreptName" TEXT NOT NULL,

    CONSTRAINT "KeyDecrept_pkey" PRIMARY KEY ("id_key_decrept")
);

-- CreateTable
CREATE TABLE "loginDetails" (
    "id_login_details" SERIAL NOT NULL,
    "websiteLoginDetail" TEXT NOT NULL,
    "nameLoginDetail" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "logoUserDetails" TEXT NOT NULL,
    "descriptionLoginDetail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "keyDecreptId" INTEGER NOT NULL,

    CONSTRAINT "loginDetails_pkey" PRIMARY KEY ("id_login_details")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginDetails" ADD CONSTRAINT "loginDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginDetails" ADD CONSTRAINT "loginDetails_keyDecreptId_fkey" FOREIGN KEY ("keyDecreptId") REFERENCES "KeyDecrept"("id_key_decrept") ON DELETE RESTRICT ON UPDATE CASCADE;

import { Prisma, PrismaClient } from "@prisma/client";
import { encrypt } from "../src/utils/cryptAndDecrypt";
import { passwordKey } from "../src/config/consts";

const prisma = new PrismaClient();

async function createAdminUser(login: string, password: string) {
  const hashedPassword = encrypt(password, passwordKey);
  const user = await prisma.user.create({
    data: {
      login,
      hashedPassword,
    },
  });
  console.log(user);
}

createAdminUser("admin", "artem505050");

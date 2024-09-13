import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../..";
import {
  encrypt,
  decrypt,
  generateKey,
} from "../../utils/CryptAndDecryptPasswords";

export async function getUserLoginDetailsHadler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.user;
  try {
    const loginDetails = await prisma.loginDetail.findMany({
      where: {
        userId: id,
      },
      select: {
        id_login_details: true,
        nameLoginDetail: true,
        logoUserDetails: true,
      },
    });
    reply.send(loginDetails);
  } catch (err) {
    console.log(err);
    reply.status(500).send({ message: "internal server error" });
  }
}

export async function createUserLoginDetailsHandler(
  req: FastifyRequest<{
    Body: {
      website: string;
      login: string;
      password: string;
      logoUrl: string;
      description: string;
    };
  }>,
  reply: FastifyReply
) {
  const { website, login, password, logoUrl, description } = req.body;
  const { id } = req.user;
  try {
    const key = generateKey();
    const newKeyDecrept = await prisma.keyDecrept.create({
      data: {
        keyDecreptName: key,
      },
    });
    console.log(newKeyDecrept);
    const hashedPassword = encrypt(password, key);
    const newLoginDetail = await prisma.loginDetail.create({
      data: {
        userId: id,
        websiteLoginDetail: website,
        nameLoginDetail: login,
        hashedPassword: hashedPassword,
        logoUserDetails: logoUrl,
        descriptionLoginDetail: description,
        keyDecreptId: newKeyDecrept.id_key_decrept,
      },
    });
    reply.send(newLoginDetail);
  } catch (err) {
    console.log(err);
    reply.status(500).send({ message: "internal server error" });
  }
}

export async function getOneUserLoginDetailsByIdHandler(
  req: FastifyRequest<{
    Querystring: {
      idLoginDetails: number;
    };
  }>,
  reply: FastifyReply
) {
  // console.log(req.query);
  try {
    const loginDetails = await prisma.loginDetail.findFirst({
      where: {
        id_login_details: +req.query.idLoginDetails,
      },
      select: {
        id_login_details: true,
        websiteLoginDetail: true,
        nameLoginDetail: true,
        logoUserDetails: true,
        descriptionLoginDetail: true,
        hashedPassword: true,
        keyDecreptKey: {
          select: {
            keyDecreptName: true,
          },
        },
      },
    });
    if (!loginDetails) {
      reply.status(404).send({ message: "not found" });
      return;
    }
    const decriptedPassword = decrypt(
      loginDetails?.hashedPassword,
      loginDetails?.keyDecreptKey.keyDecreptName
    );
    reply.send({ ...loginDetails, decriptedPassword });
  } catch (err) {
    console.log(err);
    reply.status(500).send({ message: "internal server error" });
  }
}

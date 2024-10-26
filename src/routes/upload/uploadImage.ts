import { FastifyReply, FastifyRequest } from "fastify";
import { uploadDir } from "../../config/consts";
import { createWriteStream, writeFile } from "fs";
import path from "path";
import { uniqueNameGenerator } from "../../utils/nameGenerator";

export async function uploadImageHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const image = await req.file();

  if (!image) {
    return reply.send("Error uploadings");
  }
  const { file } = image;
  const filename = uniqueNameGenerator(image.filename);
  const saveTo = path.join(uploadDir, filename);
  console.log(saveTo);

  const writeStreamPromise = new Promise<void>((resolve, reject) => {
    const writeStream = createWriteStream(saveTo);
    file.pipe(writeStream);

    writeStream.on("finish", () => {
      resolve();
    });

    writeStream.on("error", (error) => {
      reject(error);
    });
  });

  try {
    await writeStreamPromise;
    return reply.send({ path: `/public/${filename}` });
  } catch (error) {
    return reply.send({ message: "error uploading" });
  }
}

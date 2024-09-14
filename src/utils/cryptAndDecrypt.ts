import {
  Cipher,
  createCipheriv,
  createDecipheriv,
  Decipher,
  randomBytes,
} from "node:crypto";

// Функция для шифрования данных
export function encrypt(text: string, secretKey: string): string {
  const iv: Buffer = randomBytes(16);
  const cipher: Cipher = createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted: Buffer = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// Функция для расшифровки данных
export function decrypt(text: string, secretKey: string): string {
  const textParts: string[] = text.split(":");
  const iv: Buffer = Buffer.from(textParts.shift()!, "hex");
  const encryptedText: Buffer = Buffer.from(textParts.join(":"), "hex");
  const decipher: Decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let decrypted: Buffer = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

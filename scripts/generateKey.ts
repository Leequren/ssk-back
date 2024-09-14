import { randomBytes } from "crypto";

function createRandomKey() {
  console.log(randomBytes(32).toString("hex"));
}

createRandomKey();

import { createRandomStringGenerator } from "@better-auth/utils/random";
// src/crypto/random.ts
const generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
export { generateRandomString };

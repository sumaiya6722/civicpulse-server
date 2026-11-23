import { initMinimal } from "../context/init-minimal.mjs";
import { createBetterAuth } from "./base.mjs";
// src/auth/minimal.ts
/**
* Better Auth initializer for minimal mode (without Kysely)
*/
const betterAuth = (options) => {
	return createBetterAuth(options, initMinimal);
};
export { betterAuth };

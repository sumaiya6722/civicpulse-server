import { Auth } from "../types/auth.mjs";
import "../types/index.mjs";
import { BetterAuthOptions } from "@better-auth/core";
/**
 * Better Auth initializer for minimal mode (without Kysely)
 */
export declare const betterAuth: <Options extends BetterAuthOptions>(options: Options & {}) => Auth<Options>;
export type { BetterAuthOptions };
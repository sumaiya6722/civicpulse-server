import { AuthContext, LiteralString } from "@better-auth/core";
export declare function decryptOAuthToken(token: string, ctx: AuthContext): string | Promise<string>;
export declare function setTokenUtil(token: string | null | undefined, ctx: AuthContext): string | Promise<string> | null | undefined;
export declare function getOAuthCallbackPath(provider: {
  id: LiteralString;
  callbackPath?: string | undefined;
}): string;
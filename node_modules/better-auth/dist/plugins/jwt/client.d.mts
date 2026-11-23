import { jwt } from "./index.mjs";
import { JWKOptions, JWSAlgorithms, Jwk, JwtOptions, ResolvedSigningKey } from "./types.mjs";
import { BetterAuthClientOptions, ClientFetchOption, ClientStore } from "@better-auth/core";
import { JSONWebKeySet } from "jose";
import { BetterFetch } from "@better-fetch/fetch";
interface JwtClientOptions {
  jwks?: {
    /**
     * The path of the endpoint exposing the JWKS.
     * Must match the server configuration.
     *
     * @default /jwks
     */
    jwksPath?: string;
  };
}
export declare const jwtClient: (options?: JwtClientOptions) => {
  id: "better-auth-client";
  version: string;
  $InferServerPlugin: ReturnType<typeof jwt>;
  pathMethods: {
    [x: string]: "GET";
  };
  getActions: ($fetch: BetterFetch, _$store: ClientStore, _options: BetterAuthClientOptions | undefined) => {
    jwks: (fetchOptions?: ClientFetchOption) => Promise<{
      data: null;
      error: {
        message?: string | undefined;
        status: number;
        statusText: string;
      };
    } | {
      data: JSONWebKeySet;
      error: null;
    }>;
  };
};
export type { JWKOptions, JWSAlgorithms, Jwk, JwtOptions, ResolvedSigningKey };
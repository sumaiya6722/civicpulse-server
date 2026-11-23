import { AwaitableFunction } from "../types/helper.mjs";
import "../types/index.mjs";
import { OAuth2Tokens, ProviderOptions } from "./oauth-provider.mjs";
import { TokenEndpointAuth, TokenEndpointSecretAuthentication } from "./token-endpoint-auth.mjs";
interface RefreshAccessTokenRequestInput {
  refreshToken: string;
  options: AwaitableFunction<Partial<ProviderOptions>>;
  authentication?: TokenEndpointSecretAuthentication | undefined;
  tokenEndpointAuth?: TokenEndpointAuth | undefined;
  tokenEndpoint?: string | undefined;
  extraParams?: Record<string, string> | undefined;
  resource?: (string | string[]) | undefined;
  /**
   * Extra headers to send to the token endpoint. Client authentication
   * headers are applied after these and take precedence.
   */
  headers?: Record<string, string> | undefined;
}
interface RefreshAccessTokenInput extends RefreshAccessTokenRequestInput {
  options: Partial<ProviderOptions>;
  tokenEndpoint: string;
}
export declare function refreshAccessTokenRequest({ refreshToken, options, authentication, tokenEndpointAuth, tokenEndpoint, extraParams, resource, headers }: RefreshAccessTokenRequestInput): Promise<{
  body: URLSearchParams;
  headers: Record<string, string>;
}>;
export declare function refreshAccessToken({ refreshToken, options, tokenEndpoint, authentication, tokenEndpointAuth, extraParams, resource, headers: extraHeaders }: RefreshAccessTokenInput): Promise<OAuth2Tokens>;
export {};
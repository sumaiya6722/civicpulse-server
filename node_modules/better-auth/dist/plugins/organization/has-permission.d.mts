import { HasPermissionBaseInput } from "./permission.mjs";
import { GenericEndpointContext } from "@better-auth/core";
export declare const hasPermission: (input: {
  organizationId: string;
  /**
   * Reuse roles already loaded for this organization in the current request.
   * The cache ends with the request.
   *
   * @default false
   */
  useMemoryCache?: boolean | undefined;
} & HasPermissionBaseInput, ctx: GenericEndpointContext) => Promise<boolean>;
import { BetterAuthOptions } from "@better-auth/core";
import { DBFieldAttribute } from "@better-auth/core/db";
import { ResolvedDBTableIndex } from "@better-auth/core/db/internal";
export declare function getSchema(config: BetterAuthOptions): Record<string, {
  fields: Record<string, DBFieldAttribute>;
  indexes?: readonly ResolvedDBTableIndex[] | undefined;
  order: number;
  disableMigrations?: boolean | undefined;
}>;
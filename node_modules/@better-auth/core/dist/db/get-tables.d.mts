import { ResolvedDBTableIndex } from "./database-index.mjs";
import "../types/index.mjs";
import { BetterAuthOptions } from "../types/init-options.mjs";
import { BetterAuthDBSchema } from "./type.mjs";
export declare function getAuthTablesWithResolvedIndexes(options: BetterAuthOptions): {
  indexesByTable: ReadonlyMap<string, readonly ResolvedDBTableIndex[]>;
  tables: BetterAuthDBSchema;
};
export declare const getAuthTables: (options: BetterAuthOptions) => BetterAuthDBSchema;
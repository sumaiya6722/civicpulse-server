import { DBAdapterDebugLogOption } from "@better-auth/core/db/adapter";
import { BetterAuthOptions } from "@better-auth/core";
interface MemoryDB {
  [key: string]: any[];
}
interface MemoryAdapterConfig {
  debugLogs?: DBAdapterDebugLogOption | undefined;
}
export declare const memoryAdapter: (db: MemoryDB, config?: MemoryAdapterConfig | undefined) => (options: BetterAuthOptions) => import("@better-auth/core/db/adapter").DBAdapter<BetterAuthOptions>;
export type { MemoryAdapterConfig, MemoryDB };
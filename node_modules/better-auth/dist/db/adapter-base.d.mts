import { BetterAuthOptions } from "@better-auth/core";
import { DBAdapter } from "@better-auth/core/db/adapter";
export declare function getBaseAdapter(options: BetterAuthOptions, handleDirectDatabase: (options: BetterAuthOptions) => Promise<DBAdapter<BetterAuthOptions>>): Promise<DBAdapter<BetterAuthOptions>>;
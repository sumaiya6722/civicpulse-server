import { BetterAuthOptions } from "@better-auth/core";
import { DBAdapter } from "@better-auth/core/db/adapter";
export declare function getAdapter(options: BetterAuthOptions): Promise<DBAdapter<BetterAuthOptions>>;
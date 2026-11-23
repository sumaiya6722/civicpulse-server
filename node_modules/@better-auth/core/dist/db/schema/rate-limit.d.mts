import "../../types/index.mjs";
import { Prettify } from "../../types/helper.mjs";
import { BetterAuthOptions } from "../../types/init-options.mjs";
import { InferDBFieldsFromOptions, InferDBFieldsFromPlugins } from "../type.mjs";
import * as z from "zod";
export declare const rateLimitSchema: z.ZodObject<{
  key: z.ZodString;
  count: z.ZodNumber;
  lastRequest: z.ZodNumber;
}, z.core.$strip>;
export type BaseRateLimit = z.infer<typeof rateLimitSchema>;
/**
 * Rate limit schema type used by better-auth for rate limiting
 */
export type RateLimit<DBOptions extends BetterAuthOptions["rateLimit"] = BetterAuthOptions["rateLimit"], Plugins extends BetterAuthOptions["plugins"] = BetterAuthOptions["plugins"]> = Prettify<BaseRateLimit & InferDBFieldsFromOptions<DBOptions> & InferDBFieldsFromPlugins<"rateLimit", Plugins>>;
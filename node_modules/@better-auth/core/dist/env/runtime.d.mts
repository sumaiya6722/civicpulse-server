/**
 * Runtimes Better Auth supports, named by their WinterTC runtime keys.
 * Add a key together with its detection.
 *
 * @see https://runtime-keys.proposal.wintertc.org/
 */
export type RuntimeName = "workerd" | "deno" | "bun" | "node";
/**
 * @see https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
 */
export declare const isWorkerd: () => boolean;
export declare const isDeno: () => boolean;
export declare const isBun: () => boolean;
/**
 * Also true on runtimes with Node.js compatibility, such as Deno, Bun, and
 * Workers with `nodejs_compat`. Use {@link getRuntimeName} to tell them apart.
 */
export declare const isNode: () => boolean;
/**
 * The current runtime, or `undefined` for a runtime Better Auth does not
 * detect.
 */
export declare function getRuntimeName(): RuntimeName | undefined;
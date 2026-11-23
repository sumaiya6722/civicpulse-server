import { InternalLogger } from "../env/logger.mjs";
/**
 * Wraps a function to log a deprecation warning at once.
 */
export declare function deprecate<T extends (...args: any[]) => any>(fn: T, message: string, logger?: InternalLogger): T;
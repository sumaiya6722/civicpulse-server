import { AsyncLocalStorage } from "node:async_hooks";
export declare function getAsyncLocalStorage(): Promise<typeof AsyncLocalStorage>;
export type { AsyncLocalStorage };
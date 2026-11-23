import { OneTimeTokenOptions, oneTimeToken } from "./index.mjs";
export declare const oneTimeTokenClient: () => {
  id: "one-time-token";
  version: string;
  $InferServerPlugin: ReturnType<typeof oneTimeToken>;
};
export type { OneTimeTokenOptions };
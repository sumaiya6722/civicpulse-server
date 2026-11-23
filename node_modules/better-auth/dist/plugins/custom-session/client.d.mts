import { BetterAuthOptions } from "../../types/index.mjs";
import { Auth } from "better-auth";
export declare const customSessionClient: <A extends Auth | {
  options: BetterAuthOptions;
}>() => {
  id: "infer-server-plugin";
  version: string;
  $InferServerPlugin: (A extends {
    options: infer O;
  } ? O : A)["plugins"] extends (infer P)[] ? P extends {
    id: "custom-session";
  } ? P : never : never;
};
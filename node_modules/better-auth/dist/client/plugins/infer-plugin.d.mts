import { BetterAuthOptions } from "@better-auth/core";
export declare const InferServerPlugin: <AuthOrOption extends BetterAuthOptions | {
  options: BetterAuthOptions;
}, ID extends string>() => {
  id: "infer-server-plugin";
  version: string;
  $InferServerPlugin: (AuthOrOption extends {
    options: infer O;
  } ? O : AuthOrOption)["plugins"] extends (infer P)[] ? P extends {
    id: ID;
  } ? P : never : never;
};
import { siwe } from "./index.mjs";
export declare const siweClient: () => {
  id: "siwe";
  version: string;
  $InferServerPlugin: ReturnType<typeof siwe>;
  pathMethods: {
    "/siwe/nonce": "POST";
    "/siwe/get-nonce": "POST";
  };
};
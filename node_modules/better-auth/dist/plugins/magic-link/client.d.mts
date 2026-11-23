import { magicLink } from "./index.mjs";
export declare const magicLinkClient: () => {
  id: "magic-link";
  version: string;
  $InferServerPlugin: ReturnType<typeof magicLink>;
};
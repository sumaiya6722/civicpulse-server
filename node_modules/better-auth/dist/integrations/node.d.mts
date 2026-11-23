import { Auth } from "../types/auth.mjs";
import "../types/index.mjs";
import { IncomingHttpHeaders } from "node:http";
export declare const toNodeHandler: (auth: {
  handler: Auth["handler"];
} | Auth["handler"]) => (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => Promise<void>;
export declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;
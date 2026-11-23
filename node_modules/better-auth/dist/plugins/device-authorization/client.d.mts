import { DeviceAuthorizationGrant, deviceAuthorization } from "./index.mjs";
export declare const deviceAuthorizationClient: <Grant extends DeviceAuthorizationGrant | undefined = undefined>() => {
  id: "device-authorization";
  version: string;
  $InferServerPlugin: ReturnType<typeof deviceAuthorization<Grant>>;
  pathMethods: {
    "/device/code": "POST";
    "/device/token": "POST";
    "/device": "GET";
    "/device/approve": "POST";
    "/device/deny": "POST";
  };
};
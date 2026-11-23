import { PACKAGE_VERSION } from "../../version.mjs";
// src/plugins/siwe/client.ts
const siweClient = () => {
	return {
		id: "siwe",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {},
		pathMethods: {
			"/siwe/nonce": "POST",
			"/siwe/get-nonce": "POST"
		}
	};
};
export { siweClient };

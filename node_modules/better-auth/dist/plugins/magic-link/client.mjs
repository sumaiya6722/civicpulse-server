import { PACKAGE_VERSION } from "../../version.mjs";
// src/plugins/magic-link/client.ts
const magicLinkClient = () => {
	return {
		id: "magic-link",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {}
	};
};
export { magicLinkClient };

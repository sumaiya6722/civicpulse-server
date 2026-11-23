import { PACKAGE_VERSION } from "../../version.mjs";
// src/client/plugins/infer-plugin.ts
const InferServerPlugin = () => {
	return {
		id: "infer-server-plugin",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {}
	};
};
export { InferServerPlugin };

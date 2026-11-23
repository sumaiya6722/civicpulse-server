import { PACKAGE_VERSION } from "../../version.mjs";
// src/plugins/additional-fields/client.ts
const inferAdditionalFields = (schema) => {
	return {
		id: "additional-fields-client",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {}
	};
};
export { inferAdditionalFields };

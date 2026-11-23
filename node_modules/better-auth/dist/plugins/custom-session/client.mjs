import { InferServerPlugin } from "../../client/plugins/infer-plugin.mjs";
// src/plugins/custom-session/client.ts
const customSessionClient = () => {
	return InferServerPlugin();
};
export { customSessionClient };

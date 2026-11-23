import { isAPIError } from "./is-api-error.mjs";
// src/utils/plugin-helper.ts
const getEndpointResponse = async (ctx) => {
	const returned = ctx.context.returned;
	if (!returned) return null;
	if (returned instanceof Response) {
		if (returned.status !== 200) return null;
		return await returned.clone().json();
	}
	if (isAPIError(returned)) return null;
	return returned;
};
export { getEndpointResponse };

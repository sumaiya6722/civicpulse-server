// src/env/runtime.ts
/**
* @see https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
*/
const isWorkerd = () => globalThis.navigator?.userAgent === "Cloudflare-Workers";
const isDeno = () => "Deno" in globalThis;
const isBun = () => "Bun" in globalThis;
/**
* Also true on runtimes with Node.js compatibility, such as Deno, Bun, and
* Workers with `nodejs_compat`. Use {@link getRuntimeName} to tell them apart.
*/
const isNode = () => Boolean(globalThis.process?.versions?.node);
/**
* The current runtime, or `undefined` for a runtime Better Auth does not
* detect.
*/
function getRuntimeName() {
	if (isWorkerd()) return "workerd";
	if (isDeno()) return "deno";
	if (isBun()) return "bun";
	if (isNode()) return "node";
}
export { getRuntimeName, isBun, isDeno, isNode, isWorkerd };

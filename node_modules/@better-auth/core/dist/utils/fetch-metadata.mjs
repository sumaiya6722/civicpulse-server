// src/utils/fetch-metadata.ts
function isBrowserFetchRequest(headers) {
	return headers?.get("sec-fetch-mode") === "cors";
}
export { isBrowserFetchRequest };

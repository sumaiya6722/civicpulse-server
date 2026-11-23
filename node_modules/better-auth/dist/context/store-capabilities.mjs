// src/context/store-capabilities.ts
function hasServerSessionStore(options) {
	return !!options.database || !!options.secondaryStorage;
}
function hasServerAccountStore(options) {
	return !!options.database;
}
function shouldBindAccountCookieToSessionUser(options) {
	return hasServerAccountStore(options);
}
export { hasServerSessionStore, shouldBindAccountCookieToSessionUser };

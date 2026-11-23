// src/client/online-manager.ts
const kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = globalThis.navigator?.onLine ?? true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const target = window;
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		target.addEventListener("online", onOnline, false);
		target.addEventListener("offline", onOffline, false);
		return () => {
			target.removeEventListener("online", onOnline, false);
			target.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
export { getGlobalOnlineManager, kOnlineManager };

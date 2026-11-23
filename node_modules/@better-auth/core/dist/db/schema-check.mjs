import { isWorkerd } from "../env/runtime.mjs";
import { SchemaMismatchError } from "./schema-diff.mjs";
// src/db/schema-check.ts
/**
* Internal schema validation infrastructure for built-in adapters.
*
* Intended to become a public core extension point for community database
* adapter authors once the registration and lifecycle contracts are stabilized.
*/
/**
* Whether the adapter validates its schema. Enabled in every environment
* unless explicitly disabled.
*/
function checksSchema(options) {
	return options.advanced?.database?.validateSchema !== false;
}
const schemaChecks = /* @__PURE__ */ new WeakMap();
const schemaRevisions = /* @__PURE__ */ new WeakMap();
/** Invalidates cached checks after Better Auth changes this database's schema. */
function invalidateSchemaChecks(database) {
	const revision = schemaRevisions.get(database);
	if (revision) revision.value++;
}
/**
* Attaches a check to the adapter it verifies. The adapter object itself is
* left untouched, so this works for adapters Better Auth does not own.
*/
function registerSchemaCheck(adapter, check, options = {}) {
	const runtimeEnabled = options.runtimeEnabled ?? true;
	schemaChecks.set(adapter, {
		check,
		runtimeEnabled
	});
}
/**
* The registered check, regardless of whether runtime validation is enabled.
*/
function schemaCheckFor(adapter) {
	return schemaChecks.get(adapter)?.check;
}
/**
* The check used by runtime paths, when runtime validation is enabled.
*/
function runtimeSchemaCheckFor(adapter) {
	const registration = schemaChecks.get(adapter);
	return registration?.runtimeEnabled ? registration.check : void 0;
}
/**
* Turns a schema comparison into a check shared by one adapter instance.
*
* Concurrent calls share one `find` until a completed result is available. On
* Cloudflare Workers each call runs its own, and a newer lookup's result
* replaces an older one's. A
* clean result is cached until invalidation. A mismatch is kept as one
* {@link SchemaMismatchError} and rethrown on every later call without asking
* the store again, until a migration invalidates it. When a database identity is supplied,
* checks for that identity share its schema revision. Pending callers follow
* the new check if their revision is invalidated. A failure to reach
* the store is not kept, so the next call asks again.
*
* @example
* ```ts
* const checkSchema = createSchemaCheck(
*   () => findSchemaProblems(db, "postgres", expected),
*   "database",
* );
* const pending = checkSchema();
* if (pending) await pending;
* ```
*/
function createSchemaCheck(find, source, database) {
	const revision = database ? schemaRevisions.get(database) ?? { value: 0 } : void 0;
	if (database && revision) schemaRevisions.set(database, revision);
	const sharesLookups = !isWorkerd();
	let verdict;
	let pending;
	let lookupSequence = 0;
	const runLookup = (currentRevision) => {
		const sequence = ++lookupSequence;
		return Promise.resolve().then(find).then((findings) => {
			if (revision?.value !== currentRevision || verdict && sequence < verdict.sequence) return checkSchema();
			const error = findings.length ? new SchemaMismatchError(findings, source) : void 0;
			verdict = {
				revision: currentRevision,
				sequence,
				error
			};
			if (error) throw error;
		}, (error) => {
			if (revision?.value !== currentRevision) return checkSchema();
			throw error;
		});
	};
	const checkSchema = () => {
		const currentRevision = revision?.value;
		if (verdict && verdict.revision === currentRevision) return verdict.error ? Promise.reject(verdict.error) : void 0;
		if (!sharesLookups) return runLookup(currentRevision);
		if (pending && pending.revision === currentRevision) return pending.lookup;
		const lookup = runLookup(currentRevision).finally(() => {
			if (pending?.lookup === lookup) pending = void 0;
		});
		pending = {
			revision: currentRevision,
			lookup
		};
		return lookup;
	};
	checkSchema.source = source;
	return checkSchema;
}
export { checksSchema, createSchemaCheck, invalidateSchemaChecks, registerSchemaCheck, runtimeSchemaCheckFor, schemaCheckFor };

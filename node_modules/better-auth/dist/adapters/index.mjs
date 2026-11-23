import { createAdapterFactory, initGetDefaultFieldName, initGetDefaultModelName, initGetFieldAttributes, initGetFieldName, initGetIdField, initGetModelName } from "@better-auth/core/db/adapter";
export * from "@better-auth/core/db/adapter";
// src/adapters/index.ts
/**
* @deprecated Use `createAdapterFactory` instead.
*/
const createAdapter = createAdapterFactory;
export { createAdapter, createAdapterFactory, initGetDefaultFieldName, initGetDefaultModelName, initGetFieldAttributes, initGetFieldName, initGetIdField, initGetModelName };

import { defineErrorCodes } from "@better-auth/core/utils/error-codes";
// src/plugins/multi-session/error-codes.ts
const MULTI_SESSION_ERROR_CODES = defineErrorCodes({ INVALID_SESSION_TOKEN: "Invalid session token" });
export { MULTI_SESSION_ERROR_CODES };

import { defineErrorCodes } from "@better-auth/core/utils/error-codes";
// src/plugins/email-otp/error-codes.ts
const EMAIL_OTP_ERROR_CODES = defineErrorCodes({
	OTP_EXPIRED: "OTP expired",
	INVALID_OTP: "Invalid OTP",
	TOO_MANY_ATTEMPTS: "Too many attempts"
});
export { EMAIL_OTP_ERROR_CODES };

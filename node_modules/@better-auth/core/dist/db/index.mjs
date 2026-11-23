import { getAuthTables } from "./get-tables.mjs";
import { accountSchema } from "./schema/account.mjs";
import { rateLimitSchema } from "./schema/rate-limit.mjs";
import { sessionSchema } from "./schema/session.mjs";
import { coreSchema } from "./schema/shared.mjs";
import { userSchema } from "./schema/user.mjs";
import { verificationSchema } from "./schema/verification.mjs";
export { accountSchema, coreSchema, getAuthTables, rateLimitSchema, sessionSchema, userSchema, verificationSchema };

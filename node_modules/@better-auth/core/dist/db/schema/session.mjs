import { coreSchema } from "./shared.mjs";
import * as z from "zod";
// src/db/schema/session.ts
const sessionSchema = coreSchema.extend({
	userId: z.coerce.string(),
	expiresAt: z.date(),
	token: z.string(),
	ipAddress: z.string().nullish(),
	userAgent: z.string().nullish()
});
export { sessionSchema };

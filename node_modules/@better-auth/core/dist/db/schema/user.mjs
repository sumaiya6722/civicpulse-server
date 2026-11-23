import { coreSchema } from "./shared.mjs";
import * as z from "zod";
// src/db/schema/user.ts
const userSchema = coreSchema.extend({
	email: z.string().transform((val) => val.toLowerCase()),
	emailVerified: z.boolean().default(false),
	name: z.string(),
	image: z.string().nullish()
});
export { userSchema };

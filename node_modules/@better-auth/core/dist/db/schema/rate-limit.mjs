import * as z from "zod";
// src/db/schema/rate-limit.ts
const rateLimitSchema = z.object({
	/**
	* The key to use for rate limiting
	*/
	key: z.string(),
	/**
	* The number of requests made
	*/
	count: z.number(),
	/**
	* The last request time in milliseconds
	*/
	lastRequest: z.number()
});
export { rateLimitSchema };

import * as z from "zod";
// src/db/schema/shared.ts
const coreSchema = z.object({
	id: z.string(),
	createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
	updatedAt: z.date().default(() => /* @__PURE__ */ new Date())
});
export { coreSchema };

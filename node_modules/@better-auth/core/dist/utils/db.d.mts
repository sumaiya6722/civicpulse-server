import { DBFieldAttribute } from "../db/type.mjs";
import "../db/index.mjs";
/**
 * Filters output data by removing fields with the `returned: false` attribute.
 * This ensures sensitive fields are not exposed in API responses.
 */
export declare function filterOutputFields<T extends Record<string, unknown> | null>(data: T, additionalFields: Record<string, DBFieldAttribute> | undefined): T;
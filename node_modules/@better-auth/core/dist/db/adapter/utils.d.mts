import { DBFieldAttribute } from "../type.mjs";
export declare function withApplyDefault(value: any, field: DBFieldAttribute, action: "create" | "update" | "findOne" | "findMany"): any;
export declare function deepmerge<T>(target: T, source: Partial<T>): T;
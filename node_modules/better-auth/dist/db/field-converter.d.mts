import { DBFieldAttribute } from "@better-auth/core/db";
export declare function convertToDB<T extends Record<string, any>>(fields: Record<string, DBFieldAttribute>, values: T): T;
export declare function convertFromDB<T extends Record<string, any>>(fields: Record<string, DBFieldAttribute>, values: T | null): T | null;
import { BetterAuthDBSchema } from "../type.mjs";
export declare const initGetFieldName: ({ schema, usePlural }: {
  schema: BetterAuthDBSchema;
  usePlural: boolean | undefined;
}) => ({ model: modelName, field: fieldName }: {
  model: string;
  field: string;
}) => string;
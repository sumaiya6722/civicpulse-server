import { BetterAuthDBSchema } from "../type.mjs";
export declare const initGetDefaultFieldName: ({ schema, usePlural }: {
  schema: BetterAuthDBSchema;
  usePlural: boolean | undefined;
}) => ({ field, model: inputModel }: {
  model: string;
  field: string;
}) => string;
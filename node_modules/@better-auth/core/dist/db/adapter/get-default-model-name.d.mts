import { BetterAuthDBSchema } from "../type.mjs";
export declare const initGetDefaultModelName: ({ usePlural, schema }: {
  usePlural: boolean | undefined;
  schema: BetterAuthDBSchema;
}) => (model: string) => string;
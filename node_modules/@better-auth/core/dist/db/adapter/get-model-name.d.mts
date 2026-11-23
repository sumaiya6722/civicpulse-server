import { BetterAuthDBSchema } from "../type.mjs";
export declare const initGetModelName: ({ usePlural, schema }: {
  usePlural: boolean | undefined;
  schema: BetterAuthDBSchema;
}) => (model: string) => string;
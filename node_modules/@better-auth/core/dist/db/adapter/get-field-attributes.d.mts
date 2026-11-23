import "../index.mjs";
import { BetterAuthOptions } from "../../types/init-options.mjs";
import "../../types/index.mjs";
import { BetterAuthDBSchema, DBFieldAttribute, DBFieldType } from "../type.mjs";
export declare const initGetFieldAttributes: ({ usePlural, schema, options, customIdGenerator, disableIdGeneration }: {
  usePlural?: boolean;
  schema: BetterAuthDBSchema;
  options: BetterAuthOptions;
  disableIdGeneration?: boolean;
  customIdGenerator?: ((props: {
    model: string;
  }) => string) | undefined;
}) => ({ model, field }: {
  model: string;
  field: string;
}) => DBFieldAttribute<DBFieldType>;
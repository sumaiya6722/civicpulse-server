import "../index.mjs";
import { BetterAuthOptions } from "../../types/init-options.mjs";
import "../../types/index.mjs";
import { BetterAuthDBSchema, DBPrimitive } from "../type.mjs";
/**
 * Encodes a digest as a primary key that the configured
 * `advanced.database.generateId` strategy keeps when the record is created
 * with `forceAllowId`.
 *
 * Single-use records key their row by an id derived from the value they
 * guard, so a duplicate insert is the first-writer-wins gate. The id field
 * replaces a forced id that does not fit the strategy with a fresh one, which
 * would let every insert win. Under `"uuid"` the first 16 bytes are formatted
 * with version 5 and RFC 9562 variant bits, the shape the id field accepts.
 * Other string strategies get the base64url digest. Under `"serial"` the
 * base64url digest is still replaced by a database number, so the record is
 * not single use; this logs a warning once per process.
 *
 * When the adapter reports an ObjectId id column for `model` (Prisma with
 * `@db.ObjectId`), the first 12 bytes become 24 hex characters, the only id
 * that column accepts. Every other column keeps the base64url digest.
 *
 * @internal Shared by Better Auth packages; not a supported public API.
 * @param digest - A hash of the guarded value, at least 16 bytes long.
 * @param target - The adapter the record is written through and its model.
 * Optional so plugins built against an older core keep working.
 */
export declare function encodeDeterministicId(digest: Uint8Array, options: Pick<BetterAuthOptions, "advanced">, target?: {
  adapter: {
    options?: Record<string, unknown> | undefined;
  };
  model: string;
}): string;
export declare const initGetIdField: ({ usePlural, schema, disableIdGeneration, options, customIdGenerator, supportsUUIDs }: {
  usePlural?: boolean;
  schema: BetterAuthDBSchema;
  options: BetterAuthOptions;
  disableIdGeneration?: boolean;
  customIdGenerator?: ((props: {
    model: string;
  }) => string) | undefined;
  supportsUUIDs?: boolean;
}) => ({ customModelName, forceAllowId }: {
  customModelName?: string;
  forceAllowId?: boolean;
}) => {
  transform: {
    input: (value: DBPrimitive) => string | number | true | unknown[] | Date | Record<string, unknown> | undefined;
    output: (value: DBPrimitive) => string | undefined;
  };
  defaultValue?: (() => string | false | undefined) | undefined;
  type: "string" | "number";
  required: boolean;
};
import { SessionQueryParams } from "./types.mjs";
import { ClientFetchOption } from "@better-auth/core";
import { PreinitializedWritableAtom } from "nanostores";
import { BetterFetch, BetterFetchError } from "@better-fetch/fetch";
export type AuthQueryState<T> = {
  data: null | T;
  error: null | BetterFetchError;
  isPending: boolean;
  isRefetching: boolean;
  refetch: (queryParams?: {
    query?: SessionQueryParams;
  } | undefined) => Promise<void>;
};
export type AuthQueryAtom<T> = PreinitializedWritableAtom<AuthQueryState<T>>;
export declare const useAuthQuery: <T>(initializedAtom: PreinitializedWritableAtom<any> | PreinitializedWritableAtom<any>[], path: string, $fetch: BetterFetch, options?: (((value: {
  data: null | T;
  error: null | BetterFetchError;
  isPending: boolean;
}) => ClientFetchOption) | ClientFetchOption) | undefined) => AuthQueryAtom<T>;
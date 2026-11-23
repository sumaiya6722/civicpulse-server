import { BetterAuthClientOptions } from "@better-auth/core";
import { WritableAtom } from "nanostores";
export interface SessionRefreshOptions {
  fetchSession: () => Promise<void>;
  shouldPollSession?: () => boolean;
  sessionSignal: WritableAtom<boolean>;
  options?: BetterAuthClientOptions | undefined;
}
export declare function createSessionRefreshManager(opts: SessionRefreshOptions): {
  init: () => void;
  cleanup: () => void;
  triggerRefetch: (event?: {
    event?: "poll" | "visibilitychange" | "storage";
  } | undefined) => void;
  broadcastSessionUpdate: (trigger: "signout" | "getSession" | "updateUser") => void;
};
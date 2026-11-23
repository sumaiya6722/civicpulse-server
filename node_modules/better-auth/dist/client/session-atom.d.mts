import { Session, User } from "../types/models.mjs";
import "../types/index.mjs";
import "./query.mjs";
import { BetterAuthClientOptions } from "@better-auth/core";
import { BetterFetch } from "@better-fetch/fetch";
export type SessionData = {
  user: User;
  session: Session;
} & Record<string, any>;
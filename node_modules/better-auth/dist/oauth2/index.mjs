import { applyUpdateUserInfoOnLink, handleOAuthUserInfo, linkOAuthAccount } from "./link-account.mjs";
import { generateIdTokenNonce, generateState, parseState } from "./state.mjs";
import { decryptOAuthToken, getOAuthCallbackPath, setTokenUtil } from "./utils.mjs";
export * from "@better-auth/core/oauth2";
export { applyUpdateUserInfoOnLink, decryptOAuthToken, generateIdTokenNonce, generateState, getOAuthCallbackPath, handleOAuthUserInfo, linkOAuthAccount, parseState, setTokenUtil };

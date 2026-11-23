import * as z from "zod";
/**
 * Returns whether a parsed redirect URI uses an authority-free, reverse-domain
 * private-use scheme as recommended by RFC 8252 §7.1.
 */
export declare function isReverseDomainPrivateUseRedirectUri(uri: URL): boolean;
/** RFC 8252 recommended form or a host-bearing non-reserved custom scheme. */
export declare function isNativePrivateUseRedirectUri(uri: URL): boolean;
/**
 * Zod schema for the shape of an OAuth redirect URI, without a transport
 * policy. Use it where the caller applies its own HTTPS rule, as the OAuth
 * provider does for operators that allow `http:` on private networks.
 *
 * - Rejects dangerous schemes (`javascript:`, `data:`, `vbscript:`).
 * - Rejects URIs with a fragment component (`#...`) per RFC 6749 §3.1.2.
 */
export declare const RedirectUriSyntaxSchema: z.ZodURL;
/** Error message for an `http:` redirect URI on a non-loopback host. */
export declare const INSECURE_REDIRECT_URI_MESSAGE = "Redirect URI must use HTTPS (HTTP allowed only for loopback hosts)";
/**
 * Zod schema for OAuth redirect URIs and other developer-supplied URLs that the
 * server stores and later hands back to a browser.
 *
 * - Applies {@link RedirectUriSyntaxSchema}.
 * - Requires HTTPS, except for loopback hosts (`127.0.0.0/8`, `[::1]`,
 *   `*.localhost` per RFC 6761), where HTTP is allowed for local development.
 * - Allows custom schemes for mobile apps (e.g. `myapp://callback`).
 *
 * This is the single source of truth for redirect-URI validation across the
 * OAuth provider plugins. Consume it from `@better-auth/core/utils/redirect-uri`
 * rather than re-implementing the scheme policy per plugin.
 */
export declare const SafeUrlSchema: z.ZodURL;
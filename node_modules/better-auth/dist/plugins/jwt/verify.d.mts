import { JwtOptions } from "./types.mjs";
import { JWTPayload } from "jose";
/**
 * Verify a JWT token using the JWKS public keys
 * Returns the payload if valid, null otherwise
 */
export declare function verifyJWT<T extends JWTPayload = JWTPayload>(token: string, options?: JwtOptions): Promise<(T & Required<Pick<JWTPayload, "sub" | "aud">>) | null>;
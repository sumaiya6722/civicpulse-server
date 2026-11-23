// src/utils/state.ts
/**
* Verification key for database-backed OAuth and SAML relay state.
*/
const getAuthStateVerificationIdentifier = (state) => `auth-state:${state}`;
export { getAuthStateVerificationIdentifier };

import type { KeycloakToken } from './keycloak-types';

/**
 * Check if a token is still valid (not expired)
 */
export function isTokenValid(token: KeycloakToken | null): boolean {
	if (!token || !token.exp) return false;

	// exp is in seconds, Date.now() is in milliseconds
	const now = Math.floor(Date.now() / 1000);
	return token.exp > now;
}

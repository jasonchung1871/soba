import { decodeJwt } from './decode-jwt';
import type { KeycloakToken } from './keycloak-types';
import { getToken } from './token';
import { isTokenValid } from './validate-token';

export async function getServerSession(): Promise<KeycloakToken | null> {
	const token = await getToken();
	if (!token) return null;

	const decoded = decodeJwt<KeycloakToken>(token);
	if (!isTokenValid(decoded)) return null;

	return decoded;
}

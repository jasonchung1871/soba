import type { NextRequest } from 'next/server';
import { decodeJwt } from '@/app/lib/auth/decode-jwt';
import type { KeycloakToken } from '@/app/lib/auth/keycloak-types';
import { isTokenValid } from '@/app/lib/auth/validate-token';

export function getSessionFromProxy(req: NextRequest): KeycloakToken | null {
	const token = req.cookies.get('kc_token')?.value;
	if (!token) return null;

	const decoded = decodeJwt<KeycloakToken>(token);
	if (!isTokenValid(decoded)) return null;

	return decoded;
}

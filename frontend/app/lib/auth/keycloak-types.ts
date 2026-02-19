export interface KeycloakToken {
	exp: number;
	iat: number;
	auth_time: number;
	jti: string;
	iss: string;
	aud: string | string[];
	sub: string;
	typ: string;
	azp: string;
	session_state: string;
	acr: string;
	realm_access?: {
		roles: string[];
	};
	resource_access?: Record<string, { roles: string[] }>;
	scope?: string;
	email?: string;
	preferred_username?: string;
	name?: string;
}

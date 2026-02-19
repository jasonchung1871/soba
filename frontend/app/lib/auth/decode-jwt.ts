export function decodeJwt<T = unknown>(token: string): T | null {
	try {
		const [, payload] = token.split('.');
		if (!payload) return null;
		const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
		return decoded as T;
	} catch {
		return null;
	}
}

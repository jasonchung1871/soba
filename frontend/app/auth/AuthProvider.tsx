'use client';

import Keycloak from 'keycloak-js';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
	kc: Keycloak | null;
	isAuthenticated: boolean;
	token: string | null;
	login: (options?: LoginOptions) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	kc: null,
	isAuthenticated: false,
	token: null,
	login: (_options?: LoginOptions) => {},
	logout: () => {},
});

interface LoginOptions {
	idpHint?: string;
	redirectUri?: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [kc, setKc] = useState<Keycloak | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const kcUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string;
		const kcRealm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string;
		const kcClientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string;
		const instance = new Keycloak({
			url: kcUrl,
			realm: kcRealm,
			clientId: kcClientId,
		});

		instance
			.init({
				onLoad: 'check-sso',
				silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
			})
			.then((authenticated) => {
				setKc(instance);
				setIsAuthenticated(authenticated);
				setToken(instance.token ?? null);
				if (authenticated) {
					// biome-ignore lint/suspicious/noDocumentCookie: client-side cookies are the correct way to pass the KC token to the server
					document.cookie = `kc_token=${instance.token}; path=/;`;
					// This is how formio fetches the token
					localStorage.setItem('formioToken', instance.token ?? '');
				}
			});

		const refreshInterval = setInterval(async () => {
			if (!instance.authenticated) return;

			try {
				const refreshed = await instance.updateToken(30); // Refresh if the token will expire in 30 seconds
				if (refreshed) {
					// biome-ignore lint/suspicious/noDocumentCookie: client-side cookies are the correct way to pass the KC token to the server
					document.cookie = `kc_token=${instance.token}; path=/;`;
					setToken(instance.token ?? null);
					localStorage.setItem('formioToken', instance.token ?? '');
				}
			} catch (err) {
				console.error('Failed to refresh token', err);
				instance.logout();
			}
		}, 10_000); // Refresh every 10 seconds

		return () => clearInterval(refreshInterval);
	}, []);

	const login = (options: LoginOptions = {}) => {
		const { idpHint, redirectUri } = options;

		const currentHref = window.location.href;
		const currentPath = window.location.pathname;
		const isLoginPage = currentPath.endsWith('/login') || currentPath.includes('/login?');

		const finalRedirectUri = redirectUri ?? (isLoginPage ? window.location.origin : currentHref);

		kc?.login({ idpHint, redirectUri: finalRedirectUri });
	};

	const logout = () => {
		// biome-ignore lint/suspicious/noDocumentCookie: client-side cookies are the correct way to pass the KC token to the server
		document.cookie = `kc_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
		localStorage.removeItem('formioToken');
		kc?.logout();
	};

	return (
		<AuthContext.Provider value={{ kc, isAuthenticated, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}

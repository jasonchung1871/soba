import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { handleAuthentication } from '@/lib/proxy/auth';
import { handleLocaleRouting } from '@/lib/proxy/locale';
import { isStaticAsset } from '@/lib/proxy/static';

export function proxy(request: NextRequest) {
	// Skip static assets
	if (isStaticAsset(request)) {
		return;
	}

	// Handle locale routing
	const localeResponse = handleLocaleRouting(request);
	if (localeResponse) return localeResponse;

	// Handle authentication for protected routes
	const authResponse = handleAuthentication(request);
	if (authResponse) return authResponse;

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next|bootstrap|formio|favicon.ico|robots.txt|sitemap.xml|images|icons|silent-check-sso.html).*)',
	],
};

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionFromProxy } from '@/app/lib/auth/session-proxy';

const LOCALE_PREFIX = /^\/[a-z]{2}(?=\/)/;

export function handleAuthentication(request: NextRequest) {
	const session = getSessionFromProxy(request);
	const pathname = request.nextUrl.pathname;
	const normalized = pathname.replace(LOCALE_PREFIX, '');

	// Protect /builder route
	if (!session && normalized.startsWith('/builder')) {
		const locale = pathname.split('/')[1];
		return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
	}

	return null;
}

import { match } from '@formatjs/intl-localematcher';
import { type NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
	const accept = request.headers.get('accept-language') || '';
	const languages = accept.split(',').map((part) => part.split(';')[0].trim());
	return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip static assets
	if (
		pathname.startsWith('/bootstrap') ||
		pathname.startsWith('/formio') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/robots') ||
		pathname.startsWith('/sitemap') ||
		pathname.startsWith('/images') ||
		pathname.startsWith('/icons')
	) {
		return;
	}

	// Check if there is any supported locale in the pathname
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ['/((?!_next|bootstrap|formio|favicon.ico|robots.txt|sitemap.xml|images|icons).*)'],
};

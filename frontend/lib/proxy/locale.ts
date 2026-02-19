import { match } from '@formatjs/intl-localematcher';
import { type NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
	const accept = request.headers.get('accept-language') || '';
	const languages = accept.split(',').map((part) => part.split(';')[0].trim());
	return match(languages, locales, defaultLocale);
}

export function handleLocaleRouting(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if there is any supported locale in the pathname
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (!pathnameHasLocale) {
		// Redirect if there is no locale
		const locale = getLocale(request);
		request.nextUrl.pathname = `/${locale}${pathname}`;
		return NextResponse.redirect(request.nextUrl);
	}

	return null;
}

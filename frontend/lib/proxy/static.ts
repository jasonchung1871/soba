import type { NextRequest } from 'next/server';

const STATIC_ASSETS = [
	'/bootstrap',
	'/formio',
	'/favicon',
	'/robots',
	'/sitemap',
	'/images',
	'/icons',
];

export function isStaticAsset(request: NextRequest): boolean {
	const { pathname } = request.nextUrl;
	return STATIC_ASSETS.some((asset) => pathname.startsWith(asset));
}

import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { isValidLang, defaultLang } from '$lib/i18n';
import { resolveRedirect } from '$lib/redirects';

export const handleError: HandleServerError = ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();
	const err = error instanceof Error ? error : null;

	console.error(
		JSON.stringify({
			level: 'error',
			errorId,
			status,
			method: event.request.method,
			url: event.url.pathname + event.url.search,
			message: err?.message ?? message,
			stack: err?.stack,
			timestamp: new Date().toISOString()
		})
	);

	return {
		message: 'An unexpected error occurred. Please try again.',
		errorId
	};
};

const CSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"font-src 'self' https://fonts.gstatic.com",
	"img-src 'self' data:",
	"frame-src 'self' https://www.google.com https://challenges.cloudflare.com",
	"connect-src 'self'",
	"frame-ancestors 'self'",
	"base-uri 'self'",
	"form-action 'self'",
	"object-src 'none'",
	'upgrade-insecure-requests'
].join('; ');

function applySecurityHeaders(headers: Headers) {
	headers.set('Strict-Transport-Security', 'max-age=15552000');
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set('X-Frame-Options', 'DENY');
	headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()'
	);
	headers.set('Content-Security-Policy', CSP);
}

export const handle: Handle = async ({ event, resolve }) => {
	// Legacy WordPress URL handling — MUST run before lang resolution.
	// During prerender SvelteKit blocks reading url.search/searchParams; treat as empty.
	let searchParams = new URLSearchParams();
	try {
		searchParams = new URLSearchParams(event.url.search);
	} catch {
		/* prerendering — no query string available */
	}
	const resolution = resolveRedirect(event.url.pathname, searchParams);
	if (resolution?.kind === 'redirect') {
		throw redirect(301, resolution.to);
	}
	if (resolution?.kind === 'gone') {
		return new Response(
			'<!doctype html><html><head><meta name="robots" content="noindex"><title>410 Gone</title></head><body><h1>410 Gone</h1><p>This page is no longer available.</p><p><a href="/hr">Sprinter homepage</a></p></body></html>',
			{
				status: 410,
				headers: {
					'Content-Type': 'text/html; charset=utf-8',
					'X-Robots-Tag': 'noindex'
				}
			}
		);
	}

	const segment = event.url.pathname.split('/')[1] ?? '';
	const lang = isValidLang(segment) ? segment : defaultLang;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paramLang%', lang)
	});

	applySecurityHeaders(response.headers);
	return response;
};

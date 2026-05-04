import { redirect, type Handle } from '@sveltejs/kit';
import { isValidLang, defaultLang } from '$lib/i18n';
import { resolveRedirect } from '$lib/redirects';

export const handle: Handle = async ({ event, resolve }) => {
	// 301 redirects for legacy WordPress URLs — MUST run before lang resolution.
	// During prerender SvelteKit blocks reading url.search/searchParams; treat as empty.
	let searchParams = new URLSearchParams();
	try {
		searchParams = new URLSearchParams(event.url.search);
	} catch {
		/* prerendering — no query string available */
	}
	const redirectTo = resolveRedirect(event.url.pathname, searchParams);
	if (redirectTo) {
		throw redirect(301, redirectTo);
	}

	const segment = event.url.pathname.split('/')[1] ?? '';
	const lang = isValidLang(segment) ? segment : defaultLang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paramLang%', lang)
	});
};

import { redirect, type Handle } from '@sveltejs/kit';
import { isValidLang, defaultLang } from '$lib/i18n';
import { resolveRedirect } from '$lib/redirects';

export const handle: Handle = async ({ event, resolve }) => {
	// 301 redirects for legacy WordPress URLs — MUST run before lang resolution
	const redirectTo = resolveRedirect(event.url.pathname, event.url.searchParams);
	if (redirectTo) {
		throw redirect(301, redirectTo);
	}

	const segment = event.url.pathname.split('/')[1] ?? '';
	const lang = isValidLang(segment) ? segment : defaultLang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paramLang%', lang)
	});
};

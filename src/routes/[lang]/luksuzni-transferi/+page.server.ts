import { getGoogleReviews } from '$lib/server/google-reviews';
import { getStaticReviews } from '$lib/server/static-reviews';
import type { Lang } from '$lib/i18n';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const lang = params.lang as Lang;

	// Prefer live data from the Places API; fall back to the static set when env
	// vars aren't configured. The Reviews component renders both identically.
	const reviews = (await getGoogleReviews(lang, fetch)) ?? getStaticReviews(lang);

	// Edge-cache the rendered HTML for 24h; serve stale for another 12h while
	// revalidating. Mirrors the cleaning page's reviews caching.
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=43200'
	});

	return { reviews };
};

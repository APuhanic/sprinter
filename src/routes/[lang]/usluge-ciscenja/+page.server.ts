import { getGoogleReviews } from '$lib/server/google-reviews';
import { getStaticReviews } from '$lib/server/static-reviews';
import type { Lang } from '$lib/i18n';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const lang = params.lang as Lang;

	// Prefer live data from Places API; fall back to the static set when env
	// vars aren't configured (current state, pre-launch). Reviews component
	// renders both identically.
	const reviews = (await getGoogleReviews(lang, fetch)) ?? getStaticReviews(lang);

	// Edge-cache the rendered HTML for 24h; serve stale for another 12h while
	// revalidating. Static fallback is effectively free to recompute, but the
	// header costs nothing and helps once the live API is wired in.
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=43200'
	});

	return { reviews };
};

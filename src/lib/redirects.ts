/**
 * Legacy WordPress URL handling for the migration to the SvelteKit site.
 *
 * Two outcomes:
 *   - `pathRedirects` (HTTP 301): the WP page maps cleanly onto a live page
 *     here (cleaning, transfers, contact, privacy). Equity is preserved.
 *   - `goneList`     (HTTP 410): the WP feature is not part of the new site
 *     scope (car classifieds, user accounts, listing management, moving
 *     service, paused rental product, junk like /test). 410 tells crawlers
 *     to drop the URL — faster deindex, no equity leak to homepage.
 *
 * Live site scope = home + cleaning + transfers + contact + privacy.
 * Rental (`/najam-vozila`) and transport (`/usluge-prijevoza`) routes exist
 * in code but are paused and noindexed; legacy URLs that point to them are
 * therefore 410, not 301.
 *
 * Source: live sprinter.hr Yoast sitemap (sitemap_index.xml + sub-sitemaps),
 * crawled 2026-05-15. Add to this file any new legacy URL discovered in
 * post-launch Google Search Console "Pages > Not indexed" reports.
 */

export const pathRedirects: Record<string, string> = {
	'/usluge-ciscenja': '/hr/usluge-ciscenja',
	'/usluga-ciscenja': '/hr/usluge-ciscenja', // singular variant in Yoast sitemap
	'/luksuzni-transferi-s-osobnim-vozacem': '/hr/luksuzni-transferi',
	'/kontakt': '/hr/kontakt',
	// Transport ad (currently paused) points here; route exists but is
	// noindexed in backup state — kept live so paid traffic doesn't 404
	'/usluge-prijevoza': '/hr/usluge-prijevoza',
	// Cookie content is now subsumed by the privacy notice — equity flows
	// to the same topic. Previously 410'd; promoted to 301 on audit advice.
	'/cookie-policy': '/hr/pravila-privatnosti'
};

/**
 * URLs that should return HTTP 410 Gone. The feature behind each URL is no
 * longer part of the site; do not redirect to homepage (would dilute the
 * homepage's relevance signal with car-rental / user-account keywords).
 */
export const goneList: ReadonlySet<string> = new Set<string>([
	// Paused rental product — list + WP individual vehicle URLs
	'/rent-a-car',
	'/najam-kombi-vozila',
	'/ponuda-vozila',
	'/ponuda-gospodarskih-vozila',
	'/rent-a-car/mercedes-benz-e-300-avantgarde',
	'/rent-a-car/mercedec-v-klassa-putnicki-71',
	'/rent-a-car/renault-master-l3h2',
	'/rent-a-car/mercedes-benz-sprinter-l4h2',
	'/rent-a-car/renault-trafic-l2h1',
	'/rent-a-car/5858',

	// Car-classifieds / used-car module (was a WP marketplace, never offered now)
	'/automobili',
	'/automobili/suzuki-baleno-2011',

	// Residential moving service ("selidba") — not the same as goods transport
	'/usluga-selidbe',

	// Rental terms document — relevant only when rental product is live
	'/pravila-i-uvjeti-najma-vozila',

	// Defunct user-account features
	'/registracija',
	'/prijava',
	'/verifikacija',
	'/mora-se-verifikacija',
	'/moj-profil',

	// Defunct listing-management features
	'/add-renta-car',
	'/edit-renta-car',
	'/add-oglas-automobili-gospodarska',
	'/add-oglas-gospodarska-vozila',

	// WP default + dev artifacts that ended up indexed
	'/primjer-stranice',
	'/test',

	// WP admin entry point — should never resolve on the new site
	'/wp-login.php'
]);

/**
 * Partner deep-links. A short branded path (e.g. /monumenti, handed to a hotel
 * for their guests / QR codes) lands on the transfer calculator with the pickup
 * prefilled, so the guest only picks a destination and books.
 *
 * Coordinates are stored inline (not geocoded at runtime): a partner is a fixed
 * known location, and the project's Maps key does NOT have the Geocoding API
 * enabled — only Maps JS + Places. Hardcoding the lat/lng (sourced once from the
 * Places API) keeps prefill instant, free, and dependency-free. The label is
 * what the guest sees + what the dispatcher receives.
 *
 * The redirect is 302 (temporary), not 301: the partnership / address may
 * change and we don't want browsers caching the mapping. Add a slug to onboard.
 */
export const partnerPickups: Record<string, { label: string; lat: number; lng: number }> = {
	monumenti: {
		label: 'Monumenti Heritage Hotel, Ul. Vallelunga 89, Pula',
		lat: 44.8760933,
		lng: 13.8181913
	}
};

/**
 * Redirects that key on a query-string match rather than just path.
 */
export const queryRedirects: Array<{
	path: string;
	param: string;
	value: string;
	to: string;
}> = [
	// The /?page_id=3 form is what old Yoast emitted for the privacy page —
	// preserve it because external sites may still link by that form.
	{ path: '/', param: 'page_id', value: '3', to: '/hr/pravila-privatnosti' }
];

export type RedirectResolution =
	| { kind: 'redirect'; to: string; preserveQuery: boolean; status?: 301 | 302 }
	| { kind: 'gone' }
	| null;

/** Resolve an incoming URL to a redirect, a 410, or null if neither applies. */
export function resolveRedirect(
	pathname: string,
	searchParams: URLSearchParams
): RedirectResolution {
	const normalized =
		pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	// Query-string redirects win (more specific than path-only). The matched
	// query (e.g. ?page_id=3) is a legacy WP locator with no meaning on the new
	// site, so the target is the clean URL — don't carry the stale param over.
	for (const rule of queryRedirects) {
		if (normalized === rule.path && searchParams.get(rule.param) === rule.value) {
			return { kind: 'redirect', to: rule.to, preserveQuery: false };
		}
	}

	// Partner deep-links: /<slug> → calculator with the pickup prefilled. Carry
	// the slug (not the address) so the page resolves label + coords from the
	// shared map. Don't preserve the incoming query (target has its own).
	// Temporary (302) — see partnerPickups.
	const slug = normalized.replace(/^\//, '');
	if (slug in partnerPickups) {
		return { kind: 'redirect', to: `/hr/luksuzni-transferi?partner=${slug}`, preserveQuery: false, status: 302 };
	}

	// Path redirects keep the query string so utm_* (Google Ads, GBP) survive.
	if (normalized in pathRedirects) {
		return { kind: 'redirect', to: pathRedirects[normalized], preserveQuery: true };
	}

	if (goneList.has(normalized)) {
		return { kind: 'gone' };
	}

	return null;
}

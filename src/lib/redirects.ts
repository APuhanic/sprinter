/**
 * 301 redirect map for migrating from the old WordPress site.
 *
 * Keys: old WP path (with leading slash, optionally trailing slash).
 * Values: new canonical path.
 *
 * Matched exactly by pathname (trailing slash normalized by caller).
 * Query-string-based redirects go in `queryRedirects` below.
 *
 * Run `wget --spider -r https://sprinter.hr` or export Yoast sitemap to find
 * any URL that isn't listed here before DNS cutover.
 */
export const pathRedirects: Record<string, string> = {
	'/usluge-ciscenja': '/hr/usluge-ciscenja',
	'/najam-kombi-vozila': '/hr/najam-vozila',
	'/ponuda-vozila': '/hr/najam-vozila',
	'/luksuzni-transferi-s-osobnim-vozacem': '/hr/luksuzni-transferi',
	'/kontakt': '/hr/kontakt',
	'/cookie-policy': '/hr/cookies',
	'/pravila-i-uvjeti-najma-vozila': '/hr/uvjeti-najma',

	// Individual vehicle pages
	'/rent-a-car/mercedes-benz-e-300-avantgarde': '/hr/najam-vozila/mercedes-e300',
	'/rent-a-car/mercedec-v-klassa-putnicki-71': '/hr/najam-vozila/mercedes-v-klassa',
	'/rent-a-car/renault-master-l3h2': '/hr/najam-vozila/renault-master',
	'/rent-a-car/mercedes-benz-sprinter-l4h2': '/hr/najam-vozila/mercedes-sprinter',
	'/rent-a-car/renault-trafic-l2h1': '/hr/najam-vozila/renault-trafic',

	// Dropped features — redirect to rental list so users don't land on 404
	'/add-oglas-automobili-gospodarska': '/hr/najam-vozila'

	// /rent-a-car/5858/ — numeric ID, need to know which vehicle it was
	// before mapping. If encountered in analytics, add it here.
};

/**
 * Redirects that key on a query-string match rather than just path.
 * Matched as (path, param, value) → destination.
 */
export const queryRedirects: Array<{
	path: string;
	param: string;
	value: string;
	to: string;
}> = [
	{ path: '/', param: 'page_id', value: '3', to: '/hr/pravila-privatnosti' }
];

/** Resolve an incoming URL to its new location, or null if no redirect applies. */
export function resolveRedirect(pathname: string, searchParams: URLSearchParams): string | null {
	// Normalize trailing slash (except root)
	const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	// Query-string redirects win over path-only (more specific)
	for (const rule of queryRedirects) {
		if (normalized === rule.path && searchParams.get(rule.param) === rule.value) {
			return rule.to;
		}
	}

	if (normalized in pathRedirects) {
		return pathRedirects[normalized];
	}

	return null;
}

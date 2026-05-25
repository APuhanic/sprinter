/**
 * Google Maps JS API loader (client-side only).
 *
 * Lazy: the script tag is appended on the first call. Subsequent callers reuse
 * the same promise. Caller passes the desired UI language; once the script is
 * loaded the language is fixed for the page lifetime (Maps does not support
 * post-load relocalization for autocomplete — fine for our case).
 *
 * Falls back to a rejection if PUBLIC_GOOGLE_MAPS_API_KEY is empty so callers
 * can degrade gracefully (plain inputs + WhatsApp inquiry).
 */

import { env } from '$env/dynamic/public';

const CALLBACK = '__sprinter_gmaps_ready__';

let loaderPromise: Promise<typeof google> | null = null;

function getKey(): string {
	return env.PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
}

export function hasGoogleMapsKey(): boolean {
	return Boolean(getKey());
}

export function loadGoogleMaps(lang: 'hr' | 'en' | 'de' = 'hr'): Promise<typeof google> {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('Google Maps loader called during SSR'));
	}
	if (loaderPromise) return loaderPromise;
	const key = getKey();
	if (!key) {
		return Promise.reject(new Error('PUBLIC_GOOGLE_MAPS_API_KEY is not set'));
	}

	loaderPromise = new Promise((resolve, reject) => {
		// Already loaded by another path on the page → resolve immediately.
		if ((window as unknown as { google?: typeof google }).google?.maps) {
			resolve((window as unknown as { google: typeof google }).google);
			return;
		}

		(window as unknown as Record<string, unknown>)[CALLBACK] = () => {
			delete (window as unknown as Record<string, unknown>)[CALLBACK];
			resolve((window as unknown as { google: typeof google }).google);
		};

		const params = new URLSearchParams({
			key,
			libraries: 'places',
			callback: CALLBACK,
			language: lang,
			loading: 'async'
		});

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
		script.async = true;
		script.defer = true;
		script.onerror = () => {
			loaderPromise = null;
			delete (window as unknown as Record<string, unknown>)[CALLBACK];
			reject(new Error('Failed to load Google Maps script'));
		};
		document.head.appendChild(script);
	});

	return loaderPromise;
}

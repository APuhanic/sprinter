import { env } from '$env/dynamic/private';

// Places API (New) — see https://developers.google.com/maps/documentation/places/web-service/place-details
// We request a small field mask so we only pay for what we use.
const FIELDS = 'id,displayName,rating,userRatingCount,googleMapsUri,reviews';
const ENDPOINT = 'https://places.googleapis.com/v1/places';

// 24h. Reviews change slowly and the API has per-month quota.
const TTL_MS = 24 * 60 * 60 * 1000;

export interface GoogleReview {
	id: string;
	rating: number;
	relativeTime: string;
	publishTime: string;
	author: { name: string; photo?: string; profileUri?: string };
	text: string;
	textLanguage: string;
	originalText?: string;
	originalLanguage?: string;
	googleMapsUri?: string;
}

export interface GoogleReviewsData {
	rating: number;
	userRatingCount: number;
	placeUri: string;
	reviews: GoogleReview[];
}

type CacheEntry = { at: number; data: GoogleReviewsData | null };
const cache = new Map<string, CacheEntry>();

export async function getGoogleReviews(
	lang: 'hr' | 'en' | 'de',
	fetchImpl: typeof fetch = fetch
): Promise<GoogleReviewsData | null> {
	const apiKey = env.GOOGLE_PLACES_API_KEY;
	const placeId = env.GOOGLE_PLACE_ID;
	if (!apiKey || !placeId) return null;

	const cacheKey = `${placeId}:${lang}`;
	const cached = cache.get(cacheKey);
	if (cached && Date.now() - cached.at < TTL_MS) return cached.data;

	try {
		const url = `${ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=${lang}`;
		const res = await fetchImpl(url, {
			headers: {
				'X-Goog-Api-Key': apiKey,
				'X-Goog-FieldMask': FIELDS,
				Accept: 'application/json'
			}
		});

		if (!res.ok) {
			console.warn(`[google-reviews] ${res.status} ${res.statusText}`);
			cache.set(cacheKey, { at: Date.now(), data: null });
			return null;
		}

		const json = (await res.json()) as RawPlace;
		const data = normalise(json);
		cache.set(cacheKey, { at: Date.now(), data });
		return data;
	} catch (err) {
		console.warn('[google-reviews] fetch failed', err);
		cache.set(cacheKey, { at: Date.now(), data: null });
		return null;
	}
}

interface RawText {
	text?: string;
	languageCode?: string;
}
interface RawReview {
	name?: string;
	relativePublishTimeDescription?: string;
	rating?: number;
	text?: RawText;
	originalText?: RawText;
	authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
	publishTime?: string;
	googleMapsUri?: string;
}
interface RawPlace {
	rating?: number;
	userRatingCount?: number;
	googleMapsUri?: string;
	reviews?: RawReview[];
}

function normalise(p: RawPlace): GoogleReviewsData {
	const reviews: GoogleReview[] = (p.reviews ?? [])
		.filter((r) => r.text?.text && r.rating && r.authorAttribution?.displayName)
		.map((r) => {
			const translated = r.text!.text!;
			const original = r.originalText?.text;
			const translatedLang = r.text!.languageCode ?? '';
			const originalLang = r.originalText?.languageCode ?? '';
			const isTranslated = !!original && !!originalLang && originalLang !== translatedLang;
			return {
				id: r.name ?? `${r.authorAttribution!.displayName}-${r.publishTime}`,
				rating: r.rating!,
				relativeTime: r.relativePublishTimeDescription ?? '',
				publishTime: r.publishTime ?? '',
				author: {
					name: r.authorAttribution!.displayName!,
					photo: r.authorAttribution?.photoUri,
					profileUri: r.authorAttribution?.uri
				},
				text: translated,
				textLanguage: translatedLang,
				originalText: isTranslated ? original : undefined,
				originalLanguage: isTranslated ? originalLang : undefined,
				googleMapsUri: r.googleMapsUri
			};
		});

	return {
		rating: p.rating ?? 0,
		userRatingCount: p.userRatingCount ?? 0,
		placeUri: p.googleMapsUri ?? '',
		reviews
	};
}

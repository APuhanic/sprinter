import type { GoogleReviewsData } from './google-reviews';
import type { Lang } from '$lib/i18n';

// Fallback dataset used when the Places API env vars are missing. Sourced
// manually from the live GBP on 2026-05-17. When GOOGLE_PLACES_API_KEY +
// GOOGLE_PLACE_ID are set, the live API takes over and this is bypassed.
//
// To refresh: pull latest from the GBP, update entries below. The shape must
// stay aligned with GoogleReviewsData so the Reviews component renders both
// transparently.

// GBP share link — clicking "see all on Google" lands on the live business
// profile where visitors can read the rest and leave their own.
const PLACE_URI = 'https://share.google/v0PpkxoKhESOU7iWk';

interface StaticReviewSource {
	authorName: string;
	rating: 1 | 2 | 3 | 4 | 5;
	/** ISO date for JSON-LD + sorting. Approximate is fine. */
	publishTime: string;
	/** Original Croatian text, shown as "Show original" toggle on EN/DE. */
	originalText: string;
	/** Per-language body. Croatian here is the same string as originalText. */
	body: Record<Lang, string>;
	/** Per-language relative-time string. Manually localized. */
	relative: Record<Lang, string>;
}

const SOURCES: StaticReviewSource[] = [
	{
		authorName: 'Selena Jacimovic',
		rating: 5,
		publishTime: '2026-05-03T12:00:00Z',
		originalText:
			'Profesionalni, pouzdani i detaljni sve očišćeno u dogovorenom roku. Topla preporuka svima koji traže uslugu čišćenja.',
		body: {
			hr: 'Profesionalni, pouzdani i detaljni sve očišćeno u dogovorenom roku. Topla preporuka svima koji traže uslugu čišćenja.',
			en: 'Professional, reliable and thorough — everything cleaned within the agreed timeframe. Warm recommendation to anyone looking for a cleaning service.',
			de: 'Professionell, zuverlässig und gründlich — alles wurde im vereinbarten Zeitraum gereinigt. Wärmste Empfehlung an alle, die einen Reinigungsservice suchen.'
		},
		relative: {
			hr: 'prije 2 tjedna',
			en: '2 weeks ago',
			de: 'vor 2 Wochen'
		}
	},
	{
		authorName: 'Tonči Marcan',
		rating: 5,
		publishTime: '2026-05-10T12:00:00Z',
		originalText: 'Brzo i pedantno čišćenje, sve preporuke!',
		body: {
			hr: 'Brzo i pedantno čišćenje, sve preporuke!',
			en: 'Fast and meticulous cleaning — full recommendations!',
			de: 'Schnelle und sorgfältige Reinigung — volle Empfehlung!'
		},
		relative: {
			hr: 'prije tjedan dana',
			en: 'a week ago',
			de: 'vor einer Woche'
		}
	},
	{
		authorName: 'Katarina Malkoč',
		rating: 5,
		publishTime: '2026-05-03T12:00:00Z',
		originalText: 'Dogovor vrlo jednostavan, ljubazni i profesionalni djelatnici. Topla preporuka.',
		body: {
			hr: 'Dogovor vrlo jednostavan, ljubazni i profesionalni djelatnici. Topla preporuka.',
			en: 'Very easy to arrange, kind and professional staff. Warm recommendation.',
			de: 'Sehr einfache Terminabsprache, freundliche und professionelle Mitarbeiter. Wärmste Empfehlung.'
		},
		relative: {
			hr: 'prije 2 tjedna',
			en: '2 weeks ago',
			de: 'vor 2 Wochen'
		}
	},
	{
		authorName: 'Davor Tavić',
		rating: 5,
		publishTime: '2026-05-10T12:00:00Z',
		originalText: 'Preporučio ih kolegi, sve pohvale s njegove strane.',
		body: {
			hr: 'Preporučio ih kolegi, sve pohvale s njegove strane.',
			en: 'Recommended them to a colleague — nothing but praise from his side.',
			de: 'Habe sie einem Kollegen empfohlen — von seiner Seite nur Lob.'
		},
		relative: {
			hr: 'prije tjedan dana',
			en: 'a week ago',
			de: 'vor einer Woche'
		}
	}
];

// Aggregate values shown above the reviews. Update when the live counts on
// the GBP drift meaningfully from these.
const AGGREGATE_RATING = 5.0;
const AGGREGATE_COUNT = 9;

export function getStaticReviews(lang: Lang): GoogleReviewsData {
	return {
		rating: AGGREGATE_RATING,
		userRatingCount: AGGREGATE_COUNT,
		placeUri: PLACE_URI,
		reviews: SOURCES.map((src) => {
			const isTranslated = lang !== 'hr';
			return {
				id: `static-${src.authorName.toLowerCase().replace(/\s+/g, '-')}`,
				rating: src.rating,
				relativeTime: src.relative[lang],
				publishTime: src.publishTime,
				author: { name: src.authorName },
				text: src.body[lang],
				textLanguage: lang,
				originalText: isTranslated ? src.originalText : undefined,
				originalLanguage: isTranslated ? 'hr' : undefined
			};
		})
	};
}

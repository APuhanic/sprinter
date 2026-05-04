export interface Testimonial {
	/** Reviewer's display name, e.g. "Ana M." */
	name: string;
	/** Optional context, e.g. "Turistički vodič", "Corporate client" */
	role?: string;
	/** Which service this review is about. Controls where it surfaces. */
	service: 'cleaning' | 'rental' | 'transfers' | 'general';
	/** The review text itself — keep to 1–3 sentences for impact. */
	content: string;
	/** 1–5 stars. Omit if unknown. */
	rating?: 1 | 2 | 3 | 4 | 5;
	/** ISO date of the review, e.g. "2026-02-14". Used for display + sorting. */
	date?: string;
	/** Optional source label, e.g. "Google Review", "Email" */
	source?: string;
}

/**
 * Add testimonials here. The Testimonials section only renders when this array
 * is non-empty, so it's safe to leave empty until real reviews come in.
 *
 * Example entry (copy, uncomment, edit):
 *
 * {
 *   name: 'Ana M.',
 *   role: 'Turistički vodič',
 *   service: 'transfers',
 *   content: 'Odličan transfer od aerodroma Osijek do Osijeka. Vozač je bio točan, vozilo čisto, cijena fer. Preporučujem.',
 *   rating: 5,
 *   date: '2026-03-12',
 *   source: 'Google'
 * }
 */
export const testimonials: Testimonial[] = [];

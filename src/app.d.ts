// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			errorId?: string;
		}
		// interface Locals {}
		interface PageData {
			// Per-page Open Graph image path (e.g. '/images/og/transfers-og.jpg').
			// Rendered as the single og:image in the layout; falls back to default.
			ogImage?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

<script lang="ts">
	import type { GoogleReviewsData } from '$lib/server/google-reviews';
	import type { Translations } from '$lib/i18n';

	interface Props {
		data: GoogleReviewsData;
		t: Translations;
		/** Max reviews to render. Places API returns up to 5. */
		limit?: number;
	}

	let { data, t, limit = 5 }: Props = $props();

	let items = $derived(data.reviews.slice(0, limit));
	let avgRating = $derived(data.rating.toFixed(1));
	let openOriginals = $state<Record<string, boolean>>({});

	function toggleOriginal(id: string) {
		openOriginals[id] = !openOriginals[id];
	}

	function stars(rating: number): boolean[] {
		return [0, 1, 2, 3, 4].map((i) => i < Math.round(rating));
	}
</script>

{#if items.length > 0}
	<section class="section section--tight reviews">
		<div class="wrap">
			<div class="reviews__head">
				<div class="eyebrow">{t.testimonials.eyebrow}</div>
				<h2 class="section-title">{t.testimonials.title}</h2>
				<div class="reviews__agg">
					<div class="reviews__agg-stars" aria-label={`${avgRating} / 5`}>
						{#each stars(data.rating) as filled}
							<svg class="star {filled ? 'star--on' : ''}" viewBox="0 0 20 20" aria-hidden="true">
								<path
									d="M10 1.5l2.7 5.5 6 .9-4.4 4.3 1 6-5.4-2.8L4.6 18.2l1-6L1.3 7.9l6-.9L10 1.5z"
								/>
							</svg>
						{/each}
					</div>
					<div class="reviews__agg-text">
						<strong>{avgRating}</strong>
						<span>· {t.testimonials.basedOn.replace('{n}', String(data.userRatingCount))}</span>
					</div>
				</div>
			</div>

			<div class="reviews__grid">
				{#each items as r (r.id)}
					<figure class="review">
						<div class="review__head">
							{#if r.author.photo}
								<img
									class="review__avatar"
									src={r.author.photo}
									alt=""
									referrerpolicy="no-referrer"
									loading="lazy"
								/>
							{:else}
								<div class="review__avatar review__avatar--fallback" aria-hidden="true">
									{r.author.name.charAt(0)}
								</div>
							{/if}
							<div class="review__who">
								<div class="review__name">{r.author.name}</div>
								<div class="review__meta">{r.relativeTime}</div>
							</div>
							<div class="review__rating" aria-label={`${r.rating} / 5`}>
								{#each stars(r.rating) as filled}
									<svg
										class="star {filled ? 'star--on' : ''}"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path
											d="M10 1.5l2.7 5.5 6 .9-4.4 4.3 1 6-5.4-2.8L4.6 18.2l1-6L1.3 7.9l6-.9L10 1.5z"
										/>
									</svg>
								{/each}
							</div>
						</div>
						<blockquote class="review__body">
							{openOriginals[r.id] && r.originalText ? r.originalText : r.text}
						</blockquote>
						{#if r.originalText}
							<div class="review__translation">
								<span>{t.testimonials.translatedBy}</span>
								<button type="button" class="review__toggle" onclick={() => toggleOriginal(r.id)}>
									{openOriginals[r.id] ? t.testimonials.hideOriginal : t.testimonials.showOriginal}
								</button>
							</div>
						{/if}
					</figure>
				{/each}
			</div>

			{#if data.placeUri}
				<div class="reviews__footer">
					<a class="reviews__all" href={data.placeUri} target="_blank" rel="noopener noreferrer">
						{t.testimonials.viewAll}
						<span class="arrow" aria-hidden="true">→</span>
					</a>
				</div>
			{/if}
		</div>
	</section>
{/if}

<style>
	.reviews__head {
		max-width: 60ch;
		margin-bottom: 40px;
	}
	.reviews__agg {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 16px;
	}
	.reviews__agg-stars {
		display: inline-flex;
		gap: 2px;
	}
	.reviews__agg-text {
		font-size: 0.95rem;
		color: var(--muted);
	}
	.reviews__agg-text strong {
		color: var(--accent);
		font-weight: 600;
	}

	.reviews__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
	}

	.review {
		background: color-mix(in srgb, var(--bg) 60%, white);
		border: 1px solid color-mix(in srgb, var(--accent) 12%, transparent);
		border-radius: 14px;
		padding: 22px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.review__head {
		display: grid;
		grid-template-columns: 40px 1fr auto;
		gap: 12px;
		align-items: center;
	}
	.review__avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}
	.review__avatar--fallback {
		display: grid;
		place-items: center;
		background: var(--accent);
		color: var(--bg);
		font-weight: 600;
		font-size: 1.1rem;
	}
	.review__name {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.review__meta {
		font-size: 0.8rem;
		color: var(--muted);
	}
	.review__rating {
		display: inline-flex;
		gap: 1px;
	}

	.review__body {
		font-size: 0.95rem;
		line-height: 1.55;
		margin: 0;
		color: inherit;
		font-style: normal;
		quotes: '\201C' '\201D';
	}
	.review__body::before {
		content: open-quote;
		opacity: 0.4;
	}
	.review__body::after {
		content: close-quote;
		opacity: 0.4;
	}

	.review__translation {
		font-size: 0.78rem;
		color: var(--muted);
		display: flex;
		gap: 8px;
		align-items: center;
		flex-wrap: wrap;
	}
	.review__toggle {
		background: none;
		border: none;
		padding: 0;
		color: var(--accent);
		cursor: pointer;
		font: inherit;
		font-size: 0.78rem;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.review__toggle:hover {
		opacity: 0.8;
	}

	.star {
		width: 14px;
		height: 14px;
		fill: color-mix(in srgb, var(--muted) 30%, transparent);
		flex-shrink: 0;
	}
	.star--on {
		fill: var(--accent);
	}
	.reviews__agg-stars .star {
		width: 18px;
		height: 18px;
	}

	.reviews__footer {
		margin-top: 28px;
	}
	.reviews__all {
		color: var(--accent);
		font-size: 0.95rem;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.reviews__all:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.reviews__all .arrow {
		transition: transform 0.2s;
	}
	.reviews__all:hover .arrow {
		transform: translateX(3px);
	}
</style>

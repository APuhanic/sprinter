<script lang="ts">
	import { onMount } from 'svelte';
	import type { GoogleReviewsData } from '$lib/server/google-reviews';
	import type { Translations } from '$lib/i18n';

	interface Props {
		data: GoogleReviewsData;
		t: Translations;
		/** Max reviews to render. Places API returns up to 5. */
		limit?: number;
		/** Render as an auto-scrolling carousel instead of a static grid. */
		carousel?: boolean;
	}

	let { data, t, limit = 5, carousel = false }: Props = $props();

	let items = $derived(data.reviews.slice(0, limit));
	let avgRating = $derived(data.rating.toFixed(1));
	let openOriginals = $state<Record<string, boolean>>({});

	function toggleOriginal(id: string) {
		openOriginals[id] = !openOriginals[id];
	}

	function stars(rating: number): boolean[] {
		return [0, 1, 2, 3, 4].map((i) => i < Math.round(rating));
	}

	// --- Carousel: native scroll-snap track with gentle autoplay. ---------
	// We drive a real overflow-x scroller (so touch swipe + keyboard work for
	// free) and nudge it one card at a time on a timer. Autoplay pauses on any
	// interaction and is disabled entirely under prefers-reduced-motion.
	let track = $state<HTMLDivElement | null>(null);
	let active = $state(0);
	let paused = $state(false);
	let reduceMotion = false;
	let resumeTimer: ReturnType<typeof setTimeout> | undefined;
	let rafId: number | undefined;

	// Native smooth `scrollTo` is silently cancelled on a scroll-snap:mandatory
	// container in Chromium, so we ease scrollLeft by hand with rAF — snap only
	// kicks in once the animation settles on a card's start edge.
	function animateScrollTo(targetLeft: number) {
		const el = track;
		if (!el) return;
		if (rafId) cancelAnimationFrame(rafId);
		const start = el.scrollLeft;
		const dist = targetLeft - start;
		if (reduceMotion || Math.abs(dist) < 1) {
			el.scrollLeft = targetLeft;
			return;
		}
		const duration = 550;
		let t0: number | null = null;
		const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
		const step = (ts: number) => {
			if (t0 === null) t0 = ts;
			const p = Math.min((ts - t0) / duration, 1);
			el.scrollLeft = start + dist * easeOutCubic(p);
			if (p < 1) rafId = requestAnimationFrame(step);
		};
		rafId = requestAnimationFrame(step);
	}

	function cardTarget(i: number): number {
		const el = track;
		const card = el?.children[i] as HTMLElement | undefined;
		if (!el || !card) return 0;
		// Clamp so the last "page" (several cards visible) doesn't overscroll.
		return Math.min(card.offsetLeft, el.scrollWidth - el.clientWidth);
	}

	// Advance one card; loop back to the start once the track is scrolled to its
	// end (handles desktop, where 3 cards are visible and the tail clamps).
	function advance() {
		const el = track;
		if (!el) return;
		const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
		animateScrollTo(atEnd ? 0 : cardTarget(Math.min(active + 1, items.length - 1)));
	}

	function onScroll() {
		const el = track;
		if (!el) return;
		// Whichever card sits closest to the left edge is the active one.
		let nearest = 0;
		let min = Infinity;
		for (let i = 0; i < el.children.length; i++) {
			const d = Math.abs((el.children[i] as HTMLElement).offsetLeft - el.scrollLeft);
			if (d < min) {
				min = d;
				nearest = i;
			}
		}
		active = nearest;
	}

	function pause() {
		paused = true;
		clearTimeout(resumeTimer);
	}
	function resumeSoon() {
		clearTimeout(resumeTimer);
		resumeTimer = setTimeout(() => (paused = false), 5000);
	}

	function goTo(i: number) {
		animateScrollTo(cardTarget(i));
		pause();
		resumeSoon();
	}

	onMount(() => {
		if (!carousel) return;
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion || items.length <= 1) return;
		const id = setInterval(() => {
			if (paused || !track) return;
			advance();
		}, 4500);
		return () => {
			clearInterval(id);
			clearTimeout(resumeTimer);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

{#snippet reviewCard(r: (typeof items)[number])}
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
					<svg class="star {filled ? 'star--on' : ''}" viewBox="0 0 20 20" aria-hidden="true">
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
{/snippet}

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

			{#if carousel}
				<div
					class="reviews__track"
					bind:this={track}
					onscroll={onScroll}
					onmouseenter={pause}
					onmouseleave={() => (paused = false)}
					onfocusin={pause}
					onfocusout={() => (paused = false)}
					onpointerdown={pause}
					onpointerup={resumeSoon}
					role="group"
					aria-roledescription="carousel"
					aria-label={t.testimonials.title}
				>
					{#each items as r (r.id)}
						{@render reviewCard(r)}
					{/each}
				</div>

				{#if items.length > 1}
					<div class="reviews__dots" role="tablist" aria-label={t.testimonials.title}>
						{#each items as r, i (r.id)}
							<button
								type="button"
								class="reviews__dot"
								role="tab"
								aria-selected={active === i}
								aria-label={`${i + 1} / ${items.length}`}
								onclick={() => goTo(i)}
							></button>
						{/each}
					</div>
				{/if}
			{:else}
				<div class="reviews__grid">
					{#each items as r (r.id)}
						{@render reviewCard(r)}
					{/each}
				</div>
			{/if}

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
	/* Keep the eyebrow clear of the title — tall accents (e.g. the Š caron on
	   "Što kažu…") otherwise collide with the label above. */
	.reviews__head .eyebrow {
		display: block;
		margin-bottom: 14px;
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

	/* Carousel track — a real horizontal scroller with snap points. */
	.reviews__track {
		position: relative;
		display: flex;
		gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		/* Breathing room + so focus rings on the cards aren't clipped. */
		padding: 4px 4px 8px;
		margin: -4px -4px 0;
	}
	.reviews__track::-webkit-scrollbar {
		display: none;
	}
	.reviews__track > .review {
		scroll-snap-align: start;
		flex: 0 0 clamp(260px, 82%, 380px);
	}
	@media (min-width: 720px) {
		.reviews__track > .review {
			/* ~3 cards across, accounting for the two 20px gaps. */
			flex-basis: calc((100% - 40px) / 3);
		}
	}

	.reviews__dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: 24px;
	}
	.reviews__dot {
		width: 8px;
		height: 8px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: color-mix(in srgb, var(--muted) 35%, transparent);
		cursor: pointer;
		transition:
			width 0.25s ease,
			background 0.25s ease,
			border-radius 0.25s ease;
	}
	.reviews__dot:hover {
		background: color-mix(in srgb, var(--accent) 60%, transparent);
	}
	.reviews__dot[aria-selected='true'] {
		width: 22px;
		border-radius: 4px;
		background: var(--accent);
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
		margin-top: auto;
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

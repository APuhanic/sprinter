<script lang="ts">
	import type { PageData } from './$types';
	import { slugs } from '$lib/i18n';
	import { vehicles } from '$lib/data/vehicles';
	import { onMount } from 'svelte';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	let slides = $derived([
		{
			href: `/${lang}/${slugs[lang].cleaning}`,
			imageWebp: '/images/hero/cleaning-hero.webp',
			imageJpg: '/images/hero/cleaning-hero.jpg',
			title: t.home.heroCleaningTitle,
			subtitle: t.home.heroCleaningSubtitle,
			cta: t.home.learnMore
		},
		{
			href: `/${lang}/${slugs[lang].rental}`,
			imageWebp: '/images/hero/rental-hero.webp',
			imageJpg: '/images/hero/rental-hero.jpg',
			title: t.home.heroRentalTitle,
			subtitle: t.home.heroRentalSubtitle,
			cta: t.home.requestQuote
		},
		{
			href: `/${lang}/${slugs[lang].transfers}`,
			imageWebp: '/images/transfers/e-class.webp',
			imageJpg: '/images/transfers/e-class.jpg',
			title: t.home.heroTransfersTitle,
			subtitle: t.home.heroTransfersSubtitle,
			cta: t.home.learnMore
		}
	]);

	let currentSlide = $state(0);
	let isHovered = $state(false);
	let isPlaying = $state(true);
	let prefersReducedMotion = $state(false);

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	}

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mq.matches;
		if (mq.matches) isPlaying = false;

		const onChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
			if (e.matches) isPlaying = false;
		};
		mq.addEventListener('change', onChange);

		const interval = setInterval(() => {
			if (isPlaying && !isHovered) nextSlide();
		}, 6000);

		return () => {
			clearInterval(interval);
			mq.removeEventListener('change', onChange);
		};
	});
</script>

<svelte:head>
	<title>Sprinter d.o.o. — {t.nav.home}</title>
</svelte:head>

<!-- Hero carousel -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	class="relative h-[420px] md:h-[600px] overflow-hidden bg-slate-900"
	aria-label="Featured services"
	aria-roledescription="carousel"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	onfocusin={() => (isHovered = true)}
	onfocusout={() => (isHovered = false)}
>
	{#each slides as slide, i}
		<a
			href={slide.href}
			class="absolute inset-0 group transition-opacity duration-700 ease-in-out {i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
			aria-hidden={i !== currentSlide}
			tabindex={i === currentSlide ? 0 : -1}
		>
			<picture>
				<source srcset={slide.imageWebp} type="image/webp" />
				<img
					src={slide.imageJpg}
					alt={slide.title}
					loading={i === 0 ? 'eager' : 'lazy'}
					decoding="async"
					fetchpriority={i === 0 ? 'high' : 'auto'}
					class="absolute inset-0 w-full h-full object-cover transition-transform duration-[7000ms] ease-out {i === currentSlide ? 'scale-105' : 'scale-100'}"
				/>
			</picture>
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
			<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
				<h2 class="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg whitespace-pre-line">{slide.title}</h2>
				<p class="text-lg md:text-2xl opacity-95 mb-8 max-w-2xl drop-shadow">{slide.subtitle}</p>
				<span class="inline-block border-2 border-white px-8 py-3 text-sm md:text-base font-semibold rounded hover:bg-white hover:text-slate-900 transition-colors">
					{slide.cta}
				</span>
			</div>
		</a>
	{/each}

	<!-- Prev / next buttons -->
	<button
		type="button"
		onclick={prevSlide}
		class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 text-white hover:text-slate-900 rounded-full p-3 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
		aria-label={t.home.carouselPrev}
	>
		<svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>
	<button
		type="button"
		onclick={nextSlide}
		class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 text-white hover:text-slate-900 rounded-full p-3 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
		aria-label={t.home.carouselNext}
	>
		<svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>

	<!-- Dots + pause control -->
	<div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
		<div class="flex gap-2">
			{#each slides as _, i}
				<button
					type="button"
					onclick={() => (currentSlide = i)}
					class="h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 {i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}"
					aria-label="{t.home.carouselGoTo} {i + 1}"
					aria-current={i === currentSlide}
				></button>
			{/each}
		</div>
		<button
			type="button"
			onclick={() => (isPlaying = !isPlaying)}
			class="ml-1 bg-white/20 hover:bg-white/90 text-white hover:text-slate-900 rounded-full p-1.5 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
			aria-label={isPlaying ? t.home.carouselPause : t.home.carouselPlay}
		>
			{#if isPlaying}
				<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
			{:else}
				<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
			{/if}
		</button>
	</div>
</section>

<!-- Vehicle showcase -->
<section class="bg-slate-50 py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex items-center justify-center gap-6 text-sm text-slate-600 mb-8">
			<div class="flex items-center gap-2">
				<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.home.deliveryAvailable}</span>
			</div>
			<div class="flex items-center gap-2">
				<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.home.driverAvailable}</span>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each vehicles as vehicle}
				<VehicleCard {vehicle} {t} {lang} />
			{/each}
		</div>

		<p class="text-center text-sm text-brand-red font-medium mt-8">
			{t.home.rentalTermsNotice}
		</p>
	</div>
</section>

<Testimonials {t} />

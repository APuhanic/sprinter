<script lang="ts">
	import type { PageData } from './$types';
	import { slugs } from '$lib/i18n';
	import { vehicles } from '$lib/data/vehicles';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>Sprinter d.o.o. — {t.nav.home}</title>
</svelte:head>

<!-- Hero sections -->
<section class="grid grid-cols-1 md:grid-cols-3">
	<!-- Cleaning hero -->
	<a
		href="/{lang}/{slugs[lang].cleaning}"
		class="relative group h-80 md:h-[500px] overflow-hidden"
	>
		<img
			src="/images/cleaning/ciscenje.jpg"
			alt={t.home.heroCleaningTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-bold mb-2">{t.home.heroCleaningTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroCleaningSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-medium rounded hover:bg-white hover:text-slate-900 transition-colors">
				{t.home.learnMore}
			</span>
		</div>
	</a>

	<!-- Rental hero -->
	<a
		href="/{lang}/{slugs[lang].rental}"
		class="relative group h-80 md:h-[500px] overflow-hidden"
	>
		<img
			src="/images/cleaning/1.jpg"
			alt={t.home.heroRentalTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-bold mb-2 whitespace-pre-line">{t.home.heroRentalTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroRentalSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-medium rounded hover:bg-white hover:text-slate-900 transition-colors">
				{t.home.requestQuote}
			</span>
		</div>
	</a>

	<!-- Transfers hero -->
	<a
		href="/{lang}/{slugs[lang].transfers}"
		class="relative group h-80 md:h-[500px] overflow-hidden"
	>
		<img
			src="/images/cleaning/naslovna-hq.jpg"
			alt={t.home.heroTransfersTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-bold mb-2">{t.home.heroTransfersTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroTransfersSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-medium rounded hover:bg-white hover:text-slate-900 transition-colors">
				{t.home.learnMore}
			</span>
		</div>
	</a>
</section>

<!-- Vehicle showcase -->
<section class="bg-slate-50 py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="text-center mb-4">
			<p class="text-sm text-slate-600">{t.home.deliveryAvailable}</p>
			<p class="text-sm text-slate-600">{t.home.driverAvailable}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
			{#each vehicles as vehicle}
				<div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
					<div class="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
						<!-- Placeholder for vehicle images — we'll add real ones later -->
						<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h14.25m-14.25 0V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v4.5h6.75a1.125 1.125 0 011.125 1.125v2.25" />
						</svg>
					</div>
					<div class="p-4">
						<h3 class="font-bold text-slate-900">{vehicle.name}</h3>
						<p class="text-sm text-slate-500 mb-3">{vehicle.year} · {vehicle.type}</p>
						<div class="grid grid-cols-2 gap-2 text-xs text-slate-600">
							<span>👥 {vehicle.seats}</span>
							<span>⚙️ {vehicle.gearbox}</span>
							{#if vehicle.hasAC}<span>❄️ Klima</span>{/if}
							{#if vehicle.hasCruise}<span>🚗 Tempomat</span>{/if}
							{#if vehicle.capacity}<span>📦 {vehicle.capacity}</span>{/if}
							{#if vehicle.payload}<span>⚖️ {vehicle.payload}</span>{/if}
						</div>
						<a
							href="https://wa.me/385957226918"
							target="_blank"
							rel="noopener noreferrer"
							class="mt-4 block text-center bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
						>
							{t.home.rentMe}
						</a>
					</div>
				</div>
			{/each}
		</div>

		<p class="text-center text-sm text-red-600 font-medium mt-8">
			{t.home.rentalTermsNotice}
		</p>
	</div>
</section>

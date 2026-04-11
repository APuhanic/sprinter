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
			src="/images/hero/cleaning-hero.jpg"
			alt={t.home.heroCleaningTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">{t.home.heroCleaningTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroCleaningSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-semibold rounded hover:bg-white hover:text-slate-900 transition-colors">
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
			src="/images/hero/rental-hero.jpg"
			alt={t.home.heroRentalTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg whitespace-pre-line">{t.home.heroRentalTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroRentalSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-semibold rounded hover:bg-white hover:text-slate-900 transition-colors">
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
			src="/images/transfers/driver-hero.jpg"
			alt={t.home.heroTransfersTitle}
			class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
		<div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
			<h2 class="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">{t.home.heroTransfersTitle}</h2>
			<p class="text-lg opacity-90 mb-6">{t.home.heroTransfersSubtitle}</p>
			<span class="inline-block border-2 border-white px-6 py-2 text-sm font-semibold rounded hover:bg-white hover:text-slate-900 transition-colors">
				{t.home.learnMore}
			</span>
		</div>
	</a>
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
				<a
					href="/{lang}/{slugs[lang].rental}/{vehicle.slug}"
					class="block bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
				>
					<div class="h-52 bg-slate-100 overflow-hidden">
						{#if vehicle.images[0]}
							<img src={vehicle.images[0]} alt={vehicle.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
						{/if}
					</div>
					<div class="p-5">
						<h3 class="font-bold text-brand-red text-lg group-hover:underline">{vehicle.name}</h3>
						<p class="text-sm text-slate-500 mb-3">{vehicle.year} · {vehicle.type}</p>
						<div class="grid grid-cols-2 gap-2 text-sm text-slate-600">
							<div class="flex items-center gap-1.5">
								<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
								<span>{vehicle.seats}</span>
							</div>
							<div class="flex items-center gap-1.5">
								<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
								<span>{vehicle.gearbox}</span>
							</div>
							{#if vehicle.hasAC}
								<div class="flex items-center gap-1.5">
									<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
									<span>Klima</span>
								</div>
							{/if}
							{#if vehicle.hasCruise}
								<div class="flex items-center gap-1.5">
									<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
									<span>Tempomat</span>
								</div>
							{/if}
							{#if vehicle.capacity}
								<div class="flex items-center gap-1.5">
									<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
									<span>{vehicle.capacity}</span>
								</div>
							{/if}
							{#if vehicle.payload}
								<div class="flex items-center gap-1.5">
									<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
									<span>{vehicle.payload}</span>
								</div>
							{/if}
						</div>
						<div class="mt-5 block text-center bg-brand-red text-white py-2.5 rounded font-medium group-hover:brightness-110 transition">
							{t.home.rentMe}
						</div>
					</div>
				</a>
			{/each}
		</div>

		<p class="text-center text-sm text-brand-red font-medium mt-8">
			{t.home.rentalTermsNotice}
		</p>
	</div>
</section>

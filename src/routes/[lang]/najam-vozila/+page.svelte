<script lang="ts">
	import type { PageData } from './$types';
	import { vehicles } from '$lib/data/vehicles';
	import { slugs } from '$lib/i18n';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.rental.title} — Sprinter d.o.o.</title>
</svelte:head>

<!-- Header -->
<section class="bg-white border-b border-slate-200">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<h1 class="text-3xl font-bold text-slate-900">{t.rental.title}</h1>
		<p class="text-sm text-slate-500 mt-1">Home / {t.rental.breadcrumb}</p>
	</div>
</section>

<!-- Vehicle grid -->
<section class="bg-slate-50 py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each vehicles as vehicle}
				<div class="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
					<!-- Vehicle image -->
					<div class="h-52 bg-slate-100 flex items-center justify-center overflow-hidden">
						{#if vehicle.images[0]}
							<img src={vehicle.images[0]} alt={vehicle.name} class="w-full h-full object-cover" />
						{:else}
							<div class="text-slate-300 flex flex-col items-center gap-2">
								<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h14.25m-14.25 0V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v4.5h6.75a1.125 1.125 0 011.125 1.125v2.25" />
								</svg>
							</div>
						{/if}
					</div>

					<!-- Vehicle info -->
					<div class="p-5">
						<div class="flex items-start justify-between gap-2 mb-4">
							<h2 class="text-lg font-bold text-red-600">{vehicle.name}</h2>
						</div>

						<!-- Specs grid -->
						<div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span class="text-slate-500">{t.rental.seats}:</span>
								<span class="text-slate-800 font-medium">{vehicle.seats}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span class="text-slate-500">{t.rental.year}:</span>
								<span class="text-slate-800 font-medium">{vehicle.year}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span class="text-slate-500">{t.rental.gearboxLabel}:</span>
								<span class="text-slate-800 font-medium">{vehicle.gearbox}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
								</svg>
								<span class="text-slate-500">{t.rental.climate}:</span>
								<span class="text-slate-800 font-medium">{vehicle.hasAC ? t.rental.yes : t.rental.no}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								<span class="text-slate-500">{t.rental.cruise}:</span>
								<span class="text-slate-800 font-medium">{vehicle.hasCruise ? t.rental.yes : t.rental.no}</span>
							</div>
							{#if vehicle.capacity}
								<div class="flex items-center gap-2">
									<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
									</svg>
									<span class="text-slate-500">{t.rental.capacity}:</span>
									<span class="text-slate-800 font-medium">{vehicle.capacity}</span>
								</div>
							{/if}
							{#if vehicle.payload}
								<div class="flex items-center gap-2">
									<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
									</svg>
									<span class="text-slate-500">{t.rental.payload}:</span>
									<span class="text-slate-800 font-medium">{vehicle.payload}</span>
								</div>
							{/if}
						</div>

						<!-- CTA -->
						<a
							href="/{lang}/{slugs[lang].rental}/{vehicle.slug}"
							class="mt-5 block text-center bg-brand-red text-white py-2.5 rounded font-medium hover:brightness-110 transition"
						>
							{t.rental.rentMe}
						</a>
					</div>
				</div>
			{/each}
		</div>

		<!-- Notices -->
		<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.deliveryNote}</span>
			</div>
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.driverNote}</span>
			</div>
		</div>

		<!-- Terms notice -->
		<div class="mt-8 text-center">
			<p class="text-sm text-red-600 font-medium mb-3">{t.rental.termsNotice}</p>
			<a
				href="/{lang}/uvjeti-najma"
				class="inline-block border-2 border-red-600 text-red-600 px-6 py-2 rounded font-medium text-sm hover:bg-red-600 hover:text-white transition-colors"
			>
				{t.rental.viewTerms}
			</a>
		</div>
	</div>
</section>

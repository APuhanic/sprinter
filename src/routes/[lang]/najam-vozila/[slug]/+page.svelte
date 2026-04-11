<script lang="ts">
	import type { PageData } from './$types';
	import { slugs } from '$lib/i18n';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
	let vehicle = $derived(data.vehicle);
</script>

<svelte:head>
	<title>{vehicle.name} — Sprinter d.o.o.</title>
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-white border-b border-slate-200">
	<div class="mx-auto max-w-7xl px-4 py-4">
		<nav class="flex items-center gap-2 text-sm text-slate-500">
			<a href="/{lang}" class="hover:text-brand-red transition-colors">{t.nav.home}</a>
			<span>/</span>
			<a href="/{lang}/{slugs[lang].rental}" class="hover:text-brand-red transition-colors">{t.rental.title}</a>
			<span>/</span>
			<span class="text-slate-800 font-medium">{vehicle.name}</span>
		</nav>
	</div>
</section>

<!-- Vehicle detail -->
<section class="bg-white py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
			<!-- Image (left, 3 cols) -->
			<div class="lg:col-span-3">
				<div class="rounded-lg overflow-hidden bg-slate-100">
					{#if vehicle.imageUrl}
						<img
							src={vehicle.imageUrl}
							alt={vehicle.name}
							class="w-full h-auto object-cover"
						/>
					{/if}
				</div>
			</div>

			<!-- Specs sidebar (right, 2 cols) -->
			<div class="lg:col-span-2">
				<h1 class="text-2xl font-extrabold text-slate-900 mb-1">{vehicle.name}</h1>
				<p class="text-slate-500 mb-6">{vehicle.year} · {vehicle.type}</p>

				<div class="space-y-3 text-sm">
					<div class="flex items-center justify-between py-2 border-b border-slate-100">
						<span class="text-slate-500">{t.rental.type}</span>
						<span class="font-medium text-slate-800">{vehicle.type}</span>
					</div>
					<div class="flex items-center justify-between py-2 border-b border-slate-100">
						<span class="text-slate-500">{t.rental.seats}</span>
						<span class="font-medium text-slate-800">{vehicle.seats}</span>
					</div>
					<div class="flex items-center justify-between py-2 border-b border-slate-100">
						<span class="text-slate-500">{t.rental.year}</span>
						<span class="font-medium text-slate-800">{vehicle.year}</span>
					</div>
					<div class="flex items-center justify-between py-2 border-b border-slate-100">
						<span class="text-slate-500">{t.rental.gearboxLabel}</span>
						<span class="font-medium text-slate-800">{vehicle.gearbox}</span>
					</div>
					<div class="flex items-center justify-between py-2 border-b border-slate-100">
						<span class="text-slate-500">{t.rental.climate}</span>
						<span class="font-medium {vehicle.hasAC ? 'text-brand-green' : 'text-slate-400'}">{vehicle.hasAC ? t.rental.yes : t.rental.no}</span>
					</div>
					<div class="flex items-center justify-between py-2 {vehicle.capacity ? 'border-b border-slate-100' : ''}">
						<span class="text-slate-500">{t.rental.cruise}</span>
						<span class="font-medium {vehicle.hasCruise ? 'text-brand-green' : 'text-slate-400'}">{vehicle.hasCruise ? t.rental.yes : t.rental.no}</span>
					</div>
					{#if vehicle.capacity}
						<div class="flex items-center justify-between py-2 {vehicle.payload ? 'border-b border-slate-100' : ''}">
							<span class="text-slate-500">{t.rental.capacity}</span>
							<span class="font-medium text-slate-800">{vehicle.capacity}</span>
						</div>
					{/if}
					{#if vehicle.payload}
						<div class="flex items-center justify-between py-2">
							<span class="text-slate-500">{t.rental.payload}</span>
							<span class="font-medium text-slate-800">{vehicle.payload}</span>
						</div>
					{/if}
				</div>

				{#if vehicle.speedLimit}
					<div class="mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded">
						<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
						<span>{t.rental.speedLimitNotice.replace('{limit}', String(vehicle.speedLimit))}</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Description -->
		<div class="mt-12 max-w-4xl">
			<h2 class="text-xl font-bold text-slate-900 mb-4">{vehicle.name}</h2>

			<!-- Extended stay notice -->
			<p class="text-slate-600 italic mb-6">
				{t.rental.extendedStayNotice.replace('{days}', String(vehicle.maxDaysBeforeContact))}
			</p>

			{#each vehicle.description as paragraph}
				<p class="text-slate-600 leading-relaxed mb-4">{paragraph}</p>
			{/each}
		</div>

		<!-- Pricing table -->
		<div class="mt-12">
			<h2 class="text-xl font-bold text-slate-900 mb-4">{t.rental.pricingTitle}</h2>

			<div class="overflow-x-auto">
				<table class="w-full max-w-3xl text-sm border border-slate-200 rounded-lg overflow-hidden">
					<thead class="bg-slate-800 text-white">
						<tr>
							<th class="text-left px-4 py-3 font-medium">{t.rental.colDays}</th>
							<th class="text-left px-4 py-3 font-medium">{t.rental.colPrice}</th>
							<th class="text-left px-4 py-3 font-medium">{t.rental.colKm}</th>
							<th class="text-left px-4 py-3 font-medium">{t.rental.colExtraKm}</th>
						</tr>
					</thead>
					<tbody>
						{#each vehicle.pricing as row, i}
							<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100">
								<td class="px-4 py-3 text-slate-700">
									{row.days} {row.days === 1 ? t.rental.day : t.rental.days}
								</td>
								<td class="px-4 py-3 text-slate-900 font-semibold">{row.price} €</td>
								<td class="px-4 py-3 text-slate-700">{t.rental.upTo} {row.includedKm} km</td>
								<td class="px-4 py-3 text-slate-700">{row.extraKmRate.toFixed(2)} €/km</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="mt-4 max-w-3xl space-y-2 text-sm text-slate-500">
				<p>{t.rental.pricingVatNote}</p>
				<p>{t.rental.pricingDisclaimer}</p>
			</div>
		</div>

		<!-- Delivery / driver notes -->
		<div class="mt-10 flex flex-col sm:flex-row gap-4">
			<div class="flex items-center gap-2 text-sm text-slate-600">
				<svg class="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.deliveryNote}</span>
			</div>
			<div class="flex items-center gap-2 text-sm text-slate-600">
				<svg class="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.driverNote}</span>
			</div>
		</div>

		<!-- CTAs -->
		<div class="mt-10 p-6 bg-slate-50 rounded-lg max-w-3xl">
			<h2 class="text-lg font-bold text-slate-800 mb-4">{t.rental.contactUs}</h2>
			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="https://wa.me/385957226918?text={encodeURIComponent(vehicle.name)}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-3 rounded-lg font-medium hover:brightness-110 transition"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
					</svg>
					{t.rental.whatsappInquiry}
				</a>
				<a
					href="tel:+385957226918"
					class="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3 rounded-lg font-medium hover:brightness-110 transition"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
					</svg>
					{t.rental.callUs}
				</a>
			</div>
			<div class="mt-4">
				<a href="/{lang}/uvjeti-najma" class="text-sm text-brand-red font-medium hover:underline">
					{t.rental.viewTerms} &rarr;
				</a>
			</div>
		</div>

		<!-- Terms notice -->
		<div class="mt-8 text-center">
			<p class="text-sm text-brand-red font-medium">{t.rental.termsNotice}</p>
		</div>

		<!-- Back link -->
		<div class="mt-8">
			<a
				href="/{lang}/{slugs[lang].rental}"
				class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-red transition-colors"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				{t.rental.backToList}
			</a>
		</div>
	</div>
</section>

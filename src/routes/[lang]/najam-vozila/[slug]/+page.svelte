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
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
			<!-- Image -->
			<div class="rounded-lg overflow-hidden bg-slate-100">
				{#if vehicle.imageUrl}
					<img
						src={vehicle.imageUrl}
						alt={vehicle.name}
						class="w-full h-full object-cover min-h-80"
					/>
				{:else}
					<div class="w-full h-80 flex items-center justify-center text-slate-300">
						<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h14.25m-14.25 0V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v4.5h6.75a1.125 1.125 0 011.125 1.125v2.25" />
						</svg>
					</div>
				{/if}
			</div>

			<!-- Info -->
			<div>
				<h1 class="text-3xl font-extrabold text-slate-900 mb-2">{vehicle.name}</h1>
				<p class="text-lg text-slate-500 mb-8">{vehicle.year} · {vehicle.type}</p>

				<!-- Specs table -->
				<h2 class="text-lg font-bold text-slate-800 mb-4">{t.rental.specifications}</h2>
				<div class="border border-slate-200 rounded-lg overflow-hidden">
					<table class="w-full text-sm">
						<tbody>
							<tr class="border-b border-slate-100">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-40">{t.rental.type}</td>
								<td class="px-4 py-3 text-slate-800">{vehicle.type}</td>
							</tr>
							<tr class="border-b border-slate-100">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.seats}</td>
								<td class="px-4 py-3 text-slate-800">{vehicle.seats}</td>
							</tr>
							<tr class="border-b border-slate-100">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.year}</td>
								<td class="px-4 py-3 text-slate-800">{vehicle.year}</td>
							</tr>
							<tr class="border-b border-slate-100">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.gearboxLabel}</td>
								<td class="px-4 py-3 text-slate-800">{vehicle.gearbox}</td>
							</tr>
							<tr class="border-b border-slate-100">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.climate}</td>
								<td class="px-4 py-3 text-slate-800">
									{#if vehicle.hasAC}
										<span class="text-brand-green font-medium">{t.rental.yes}</span>
									{:else}
										<span class="text-slate-400">{t.rental.no}</span>
									{/if}
								</td>
							</tr>
							<tr class="{vehicle.capacity || vehicle.payload ? 'border-b border-slate-100' : ''}">
								<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.cruise}</td>
								<td class="px-4 py-3 text-slate-800">
									{#if vehicle.hasCruise}
										<span class="text-brand-green font-medium">{t.rental.yes}</span>
									{:else}
										<span class="text-slate-400">{t.rental.no}</span>
									{/if}
								</td>
							</tr>
							{#if vehicle.capacity}
								<tr class="{vehicle.payload ? 'border-b border-slate-100' : ''}">
									<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.capacity}</td>
									<td class="px-4 py-3 text-slate-800">{vehicle.capacity}</td>
								</tr>
							{/if}
							{#if vehicle.payload}
								<tr>
									<td class="px-4 py-3 bg-slate-50 font-medium text-slate-600">{t.rental.payload}</td>
									<td class="px-4 py-3 text-slate-800">{vehicle.payload}</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>

				<!-- Delivery/driver notes -->
				<div class="mt-6 space-y-2">
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
				<div class="mt-8">
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
				</div>

				<!-- Terms link -->
				<div class="mt-6">
					<a
						href="/{lang}/uvjeti-najma"
						class="text-sm text-brand-red font-medium hover:underline"
					>
						{t.rental.viewTerms} &rarr;
					</a>
				</div>
			</div>
		</div>

		<!-- Back link -->
		<div class="mt-10">
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

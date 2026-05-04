<script lang="ts">
	import type { Vehicle } from '$lib/data/vehicles';
	import type { Translations, Lang } from '$lib/i18n';
	import { slugs } from '$lib/i18n';

	interface Props {
		vehicle: Vehicle;
		t: Translations;
		lang: Lang;
	}

	let { vehicle, t, lang }: Props = $props();
</script>

<a
	href="/{lang}/{slugs[lang].rental}/{vehicle.slug}"
	data-testid="vehicle-card"
	class="block bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
>
	<div class="h-52 bg-slate-100 overflow-hidden">
		{#if vehicle.images[0]}
			<img
				src={vehicle.images[0]}
				alt={vehicle.name}
				loading="lazy"
				decoding="async"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			/>
		{/if}
	</div>

	<div class="p-5">
		<h3 class="font-bold text-brand-red text-lg group-hover:underline">{vehicle.name}</h3>
		<p class="text-sm text-slate-500 mb-3">{vehicle.year} · {vehicle.type}</p>

		<div class="grid grid-cols-2 gap-2 text-sm text-slate-600">
			<div class="flex items-center gap-1.5">
				<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span>{vehicle.seats}</span>
			</div>
			<div class="flex items-center gap-1.5">
				<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span>{vehicle.gearbox}</span>
			</div>
			{#if vehicle.hasAC}
				<div class="flex items-center gap-1.5">
					<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					<span>{t.rental.climate}</span>
				</div>
			{/if}
			{#if vehicle.hasCruise}
				<div class="flex items-center gap-1.5">
					<svg class="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					<span>{t.rental.cruise}</span>
				</div>
			{/if}
			{#if vehicle.capacity}
				<div class="flex items-center gap-1.5">
					<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
					</svg>
					<span>{vehicle.capacity}</span>
				</div>
			{/if}
			{#if vehicle.payload}
				<div class="flex items-center gap-1.5">
					<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
					</svg>
					<span>{vehicle.payload}</span>
				</div>
			{/if}
		</div>

		<div class="mt-5 block text-center bg-brand-red text-white py-2.5 rounded font-medium group-hover:brightness-110 transition">
			{t.rental.rentMe}
		</div>
	</div>
</a>

<!--
	BACKUP ROUTE — not part of the live site scope (live = home, cleaning, transfers, contact, legal).
	The rental product is paused: this route still resolves so it can be re-enabled quickly,
	but it is not linked from nav/footer, not in the sitemap, and crawlers are told to skip it.
	To bring rental back to live: add to nav (+layout.svelte navItems), re-add to sitemap.xml/+server.ts,
	and remove the robots noindex below.
-->
<script lang="ts">
	import type { PageData } from './$types';
	import { vehicles, type Vehicle } from '$lib/data/vehicles';
	import VehicleCard from '$lib/components/VehicleCard.svelte';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	type Filter = 'all' | 'passenger' | 'cargo';
	type Sort = 'default' | 'year' | 'price';

	let filter = $state<Filter>('all');
	let sort = $state<Sort>('default');

	const CARGO_TYPES = new Set(['L2H1', 'L3H2', 'L4H2']);

	function isCargo(v: Vehicle) {
		return CARGO_TYPES.has(v.type);
	}

	function pricePerDay(v: Vehicle) {
		if (!v.pricing.length) return Infinity;
		const first = v.pricing[0];
		return first.price / first.days;
	}

	let filteredVehicles = $derived.by(() => {
		let list = vehicles.slice();
		if (filter === 'passenger') list = list.filter((v) => !isCargo(v));
		if (filter === 'cargo') list = list.filter(isCargo);
		if (sort === 'year') list.sort((a, b) => b.year - a.year);
		if (sort === 'price') list.sort((a, b) => pricePerDay(a) - pricePerDay(b));
		return list;
	});
</script>

<svelte:head>
	<title>Sprinter - {t.rental.title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Header -->
<section class="bg-white border-b border-slate-200">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<h1 class="text-3xl font-bold text-slate-900">{t.rental.title}</h1>
		<p class="text-sm text-slate-500 mt-1">{t.nav.home} / {t.rental.breadcrumb}</p>
	</div>
</section>

<!-- Vehicle grid -->
<section class="bg-slate-50 py-12">
	<div class="mx-auto max-w-7xl px-4">
		<!-- Filter + sort -->
		<div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
			<div>
				<label for="filter" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
					{t.rental.filterLabel}
				</label>
				<select
					id="filter"
					bind:value={filter}
					class="px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red"
				>
					<option value="all">{t.rental.filterAll}</option>
					<option value="passenger">{t.rental.filterPassenger}</option>
					<option value="cargo">{t.rental.filterCargo}</option>
				</select>
			</div>
			<div>
				<label for="sort" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
					{t.rental.sortLabel}
				</label>
				<select
					id="sort"
					bind:value={sort}
					class="px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red"
				>
					<option value="default">{t.rental.sortDefault}</option>
					<option value="year">{t.rental.sortYear}</option>
					<option value="price">{t.rental.sortPriceAsc}</option>
				</select>
			</div>
			<div class="sm:ml-auto text-sm text-slate-500 self-end">
				{filteredVehicles.length} / {vehicles.length}
			</div>
		</div>

		{#if filteredVehicles.length === 0}
			<p class="text-center text-slate-500 py-12">{t.rental.noResults}</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredVehicles as vehicle (vehicle.slug)}
					<VehicleCard {vehicle} {t} {lang} />
				{/each}
			</div>
		{/if}

		<!-- Notices -->
		<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.deliveryNote}</span>
			</div>
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<span>{t.rental.driverNote}</span>
			</div>
		</div>

		<!-- Terms notice -->
		<div class="mt-8 text-center">
			<p class="text-sm text-brand-red font-medium mb-3">{t.rental.termsNotice}</p>
			<a
				href="/{lang}/uvjeti-najma"
				class="inline-block border-2 border-brand-red text-brand-red px-6 py-2 rounded font-medium text-sm hover:bg-brand-red hover:text-white transition-colors"
			>
				{t.rental.viewTerms}
			</a>
		</div>
	</div>
</section>

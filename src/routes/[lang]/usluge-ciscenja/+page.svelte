<script lang="ts">
	import type { PageData } from './$types';
	import { telHref, waHref } from '$lib/contact';
	import { cleaningService } from '$lib/jsonld';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	const serviceJsonLd = JSON.stringify(cleaningService());
</script>

<svelte:head>
	<title>{t.cleaning.title} — Sprinter d.o.o.</title>
	{@html `<script type="application/ld+json">${serviceJsonLd}</` + `script>`}
</svelte:head>

<!-- Hero -->
<section class="relative h-72 md:h-96 overflow-hidden">
	<img
		src="/images/cleaning/ciscenje-terasa.jpg"
		alt={t.cleaning.title}
		class="absolute inset-0 w-full h-full object-cover"
	/>
	<div class="absolute inset-0 bg-black/50"></div>
	<div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
		<h1 class="text-4xl md:text-5xl font-bold text-white">{t.cleaning.title}</h1>
		<p class="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">{t.cleaning.heroSubtitle}</p>
	</div>
</section>

<!-- Founder vision -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
			<div>
				<h2 class="text-3xl font-bold text-slate-900 mb-6">{t.cleaning.visionTitle}</h2>
				<div class="space-y-4 text-slate-700 leading-relaxed">
					<p>{t.cleaning.visionPara1}</p>
					<p>{t.cleaning.visionPara2}</p>
					<p>{t.cleaning.visionPara3}</p>
					<p>{t.cleaning.visionPara4}</p>
				</div>
				<p class="text-sm text-slate-500 mt-6 italic">{t.cleaning.byFounder}</p>
			</div>
			<div>
				<img
					src="/images/cleaning/sprinter-van.jpg"
					alt={t.cleaning.title}
					class="w-full rounded-xl shadow-md"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Specializations -->
<section class="py-16 bg-slate-50">
	<div class="mx-auto max-w-4xl px-4">
		<h2 class="text-3xl font-bold text-slate-900 mb-4">{t.cleaning.exclusivityTitle}</h2>
		<p class="text-lg text-slate-600 mb-10">{t.cleaning.exclusivityDesc}</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- Residences -->
			<div class="bg-white rounded-lg overflow-hidden shadow-sm">
				<img
					src="/images/cleaning/ciscenje-kuhinja.jpg"
					alt={t.cleaning.residencesTitle}
					class="w-full h-56 object-cover"
				/>
				<div class="p-6">
					<h3 class="text-lg font-bold text-slate-900 mb-2">{t.cleaning.residencesTitle}</h3>
					<p class="text-slate-600 text-sm leading-relaxed">{t.cleaning.residencesDesc}</p>
				</div>
			</div>

			<!-- Accommodations -->
			<div class="bg-white rounded-lg overflow-hidden shadow-sm">
				<img
					src="/images/cleaning/ciscenje-kauc.jpg"
					alt={t.cleaning.accommodationsTitle}
					class="w-full h-56 object-cover"
				/>
				<div class="p-6 space-y-3">
					<h3 class="text-lg font-bold text-slate-900">{t.cleaning.accommodationsTitle}</h3>
					<p class="text-slate-600 text-sm leading-relaxed">{t.cleaning.accommodationsDesc}</p>
					<p class="text-slate-600 text-sm leading-relaxed">{t.cleaning.accommodationsStaging}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Standards -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-4xl px-4">
		<h2 class="text-3xl font-bold text-slate-900 mb-8">{t.cleaning.standardsTitle}</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="flex items-start gap-4 p-6 border border-slate-200 rounded-lg">
				<div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
					<svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div>
					<h3 class="font-bold text-slate-900">{t.cleaning.standardTech}</h3>
					<p class="text-sm text-slate-600 mt-1">{t.cleaning.standardTechDesc}</p>
				</div>
			</div>
			<div class="flex items-start gap-4 p-6 border border-slate-200 rounded-lg">
				<div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
					<svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
					</svg>
				</div>
				<div>
					<h3 class="font-bold text-slate-900">{t.cleaning.standardDiscipline}</h3>
					<p class="text-sm text-slate-600 mt-1">{t.cleaning.standardDisciplineDesc}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Positioning -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-5xl px-4">
		<div class="rounded-xl p-10 md:p-14 text-center text-white bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
			<h2 class="text-3xl font-bold mb-4">{t.cleaning.positioningTitle}</h2>
			<p class="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">{t.cleaning.positioningBody}</p>
			<p class="text-lg italic opacity-80 mt-6 max-w-3xl mx-auto">{t.cleaning.positioningQuote}</p>
		</div>
	</div>
</section>

<!-- Pricing cards -->
<section class="py-16 bg-slate-50">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center mb-10">
			<h2 class="text-3xl font-bold text-slate-900">{t.cleaning.pricesTitle}</h2>
			<p class="text-sm text-slate-500 mt-2">{t.cleaning.pricesVatNote}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each t.services as service}
				<div class="bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
					<div class="p-6 flex-1">
						<h3 class="font-bold text-slate-900 text-lg leading-tight">{service.name}</h3>
						<p class="text-sm text-brand-red font-medium mt-1">{service.subtitle}</p>
						<p class="text-sm text-slate-600 mt-3 leading-relaxed">{service.description}</p>
					</div>
					<div class="px-6 pb-6 pt-2 border-t border-slate-100 mt-auto">
						<div class="flex justify-between items-center">
							<span class="text-xs text-slate-500">{service.duration}</span>
							<span class="text-lg font-bold text-slate-900">{service.price}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Disclaimer -->
		<div class="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-lg">
			<p class="text-sm text-amber-800 leading-relaxed">
				<span class="font-bold">{t.cleaning.pricingDisclaimerLabel}</span>
				{t.cleaning.pricingDisclaimer}
			</p>
		</div>
		<p class="text-center text-sm text-slate-500 italic mt-6">{t.cleaning.pricingFooterNote}</p>
	</div>
</section>

<!-- Contact section -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-3xl font-bold text-slate-900 mb-4">{t.cleaning.contactTitle}</h2>
		<p class="text-lg text-slate-600 mb-8">{t.cleaning.contactDesc}</p>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a
				href={waHref()}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				{t.common.whatsapp}
			</a>
			<a
				href={telHref}
				class="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
				</svg>
				{t.common.phone}
			</a>
		</div>

		<p class="text-sm text-slate-500 mt-6">{t.cleaning.serviceArea}</p>
	</div>
</section>

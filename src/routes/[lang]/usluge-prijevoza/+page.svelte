<!--
	BACKUP ROUTE — goods-transport product is paused. Not linked from nav/footer, not in sitemap, noindex.
	To re-enable: add to nav (+layout.svelte navItems), re-add to sitemap.xml/+server.ts,
	remove the robots noindex below.
-->
<script lang="ts">
	import type { PageData } from './$types';
	import { telHref, waHref } from '$lib/contact';
	import { transportService } from '$lib/jsonld';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	const serviceJsonLd = JSON.stringify(transportService());
</script>

<svelte:head>
	<title>Sprinter - {t.transport.title}</title>
	<meta name="robots" content="noindex, nofollow" />
	{@html `<script type="application/ld+json">${serviceJsonLd}</` + `script>`}
</svelte:head>

<!-- Hero -->
<section class="relative h-72 md:h-96 overflow-hidden">
	<img
		src="/images/transport/prijevoz-1.jpg"
		alt={t.transport.heroTitle}
		class="absolute inset-0 w-full h-full object-cover"
	/>
	<div class="absolute inset-0 bg-black/50"></div>
	<div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
		<h1 class="text-4xl md:text-5xl font-bold text-white">{t.transport.heroTitle}</h1>
		<p class="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">{t.transport.heroSubtitle}</p>
	</div>
</section>

<!-- Intro -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-4xl px-4 space-y-5 text-lg text-slate-700 leading-relaxed">
		<p>{t.transport.introPara1}</p>
		<p>{t.transport.introPara2}</p>
	</div>
</section>

<!-- Why choose -->
<section class="py-16 bg-slate-50">
	<div class="mx-auto max-w-6xl px-4">
		<h2 class="text-3xl font-bold text-slate-900 text-center mb-10">{t.transport.whyTitle}</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
				<div class="text-3xl mb-3" aria-hidden="true">🚐</div>
				<h3 class="font-bold text-slate-900 mb-2">{t.transport.whyFleetTitle}</h3>
				<p class="text-sm text-slate-600 leading-relaxed">{t.transport.whyFleetDesc}</p>
			</div>
			<div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
				<div class="text-3xl mb-3" aria-hidden="true">🗺️</div>
				<h3 class="font-bold text-slate-900 mb-2">{t.transport.whyAreaTitle}</h3>
				<p class="text-sm text-slate-600 leading-relaxed">{t.transport.whyAreaDesc}</p>
			</div>
			<div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
				<div class="text-3xl mb-3" aria-hidden="true">💪</div>
				<h3 class="font-bold text-slate-900 mb-2">{t.transport.whyAssistTitle}</h3>
				<p class="text-sm text-slate-600 leading-relaxed">{t.transport.whyAssistDesc}</p>
			</div>
			<div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
				<div class="text-3xl mb-3" aria-hidden="true">📡</div>
				<h3 class="font-bold text-slate-900 mb-2">{t.transport.whyTechTitle}</h3>
				<p class="text-sm text-slate-600 leading-relaxed">{t.transport.whyTechDesc}</p>
			</div>
		</div>
	</div>
</section>

<!-- Logistics "Do praga" -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
			<div>
				<h2 class="text-3xl font-bold text-slate-900 mb-6">{t.transport.logisticsTitle}</h2>
				<div class="space-y-4 text-slate-700 leading-relaxed">
					<p>{t.transport.logisticsPara1}</p>
					<p>
						<span class="font-bold text-slate-900">{t.transport.logisticsPara2Label}</span>
						{t.transport.logisticsPara2}
					</p>
					<p>
						<span class="font-bold text-slate-900">{t.transport.logisticsPara3Label}</span>
						{t.transport.logisticsPara3}
					</p>
				</div>
			</div>
			<div>
				<img
					src="/images/transport/prijevoz-2.jpg"
					alt={t.transport.logisticsTitle}
					class="w-full rounded-xl shadow-md"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Quote info -->
<section class="py-16 bg-slate-50">
	<div class="mx-auto max-w-5xl px-4">
		<div class="rounded-xl p-10 md:p-14 text-white bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
			<h2 class="text-3xl font-bold text-center mb-4">{t.transport.quoteTitle}</h2>
			<p class="text-center text-lg opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
				{t.transport.quoteIntro}
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
				<div class="bg-white/10 rounded-lg p-5 font-semibold">1. {t.transport.quoteItem1}</div>
				<div class="bg-white/10 rounded-lg p-5 font-semibold">2. {t.transport.quoteItem2}</div>
				<div class="bg-white/10 rounded-lg p-5 font-semibold">3. {t.transport.quoteItem3}</div>
				<div class="bg-white/10 rounded-lg p-5 font-semibold">4. {t.transport.quoteItem4}</div>
			</div>
		</div>
	</div>
</section>

<!-- Contact -->
<section class="py-16 bg-white">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-3xl font-bold text-slate-900 mb-3">{t.transport.contactTitle}</h2>
		<p class="text-lg text-slate-600 mb-8">{t.transport.contactDesc}</p>

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

		<p class="text-sm text-slate-500 mt-6">{t.transport.baseNote}</p>
	</div>
</section>

<!-- Closing -->
<section class="py-10 bg-slate-50">
	<p class="text-center text-lg font-bold text-slate-700">{t.transport.closing}</p>
</section>

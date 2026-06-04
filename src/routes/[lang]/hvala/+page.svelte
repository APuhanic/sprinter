<script lang="ts">
	import type { PageData } from './$types';
	import { slugs } from '$lib/i18n';
	import { waHref } from '$lib/contact';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>Sprinter - {t.thankYou.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="bg-slate-50 min-h-[60vh] flex items-center justify-center py-20">
	<div class="mx-auto max-w-xl text-center px-4">
		<div
			class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/15 text-brand-green mb-6"
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M5 13l4 4L19 7"
				/>
			</svg>
		</div>
		<h1 class="text-2xl md:text-3xl font-bold text-slate-900">{t.thankYou.title}</h1>
		<p class="text-slate-600 mt-3">{t.thankYou.subtitle}</p>
		<p class="text-slate-500 text-sm mt-2">{t.thankYou.responseTime}</p>
		<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
			<a
				href="/{lang}"
				class="inline-block bg-brand-red text-white px-6 py-2.5 rounded font-medium hover:brightness-110 transition"
			>
				{t.thankYou.goHome}
			</a>
			<a
				href="/{lang}/{slugs[lang].rental}"
				class="inline-block border-2 border-brand-red text-brand-red px-6 py-2.5 rounded font-medium hover:bg-brand-red hover:text-white transition-colors"
			>
				{t.thankYou.goRental}
			</a>
		</div>
		<p class="text-sm text-slate-500 mt-8">
			{t.thankYou.meanwhileWhatsapp}
			<a
				href={waHref()}
				target="_blank"
				rel="noopener noreferrer"
				class="text-brand-green hover:underline font-medium ml-1"
			>
				WhatsApp →
			</a>
		</p>
	</div>
</section>

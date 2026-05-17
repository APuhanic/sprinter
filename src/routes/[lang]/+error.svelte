<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { slugs } from '$lib/i18n';

	let { data }: { data: LayoutData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
	let status = $derived($page.status);
</script>

<svelte:head>
	<title>Sprinter - {status} {t.error.notFoundTitle}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="bg-slate-50 min-h-[60vh] flex items-center justify-center py-20">
	<div class="mx-auto max-w-xl text-center px-4">
		<p class="text-brand-red text-7xl md:text-8xl font-extrabold tracking-tight">{status}</p>
		<h1 class="text-2xl md:text-3xl font-bold text-slate-900 mt-4">{t.error.notFoundTitle}</h1>
		<p class="text-slate-600 mt-3">{t.error.notFoundDesc}</p>
		{#if $page.error?.errorId}
			<p class="text-slate-400 text-xs mt-4 font-mono">Ref: {$page.error.errorId}</p>
		{/if}
		<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
			<a
				href="/{lang}"
				class="inline-block bg-brand-red text-white px-6 py-2.5 rounded font-medium hover:brightness-110 transition"
			>
				{t.error.goHome}
			</a>
			<a
				href="/{lang}/{slugs[lang].cleaning}"
				class="inline-block border-2 border-brand-red text-brand-red px-6 py-2.5 rounded font-medium hover:bg-brand-red hover:text-white transition-colors"
			>
				{t.error.goCleaning}
			</a>
		</div>
	</div>
</section>

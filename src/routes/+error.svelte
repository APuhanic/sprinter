<script lang="ts">
	import { page } from '$app/stores';

	let status = $derived($page.status);
</script>

<svelte:head>
	<title>{status} — Sprinter d.o.o.</title>
</svelte:head>

<section class="bg-slate-50 min-h-screen flex items-center justify-center py-20 font-sans">
	<div class="mx-auto max-w-xl text-center px-4">
		<p class="text-brand-red text-7xl md:text-8xl font-extrabold tracking-tight">{status}</p>
		<h1 class="text-2xl md:text-3xl font-bold text-slate-900 mt-4">Stranica nije pronađena</h1>
		<p class="text-slate-600 mt-3">Page not found · Seite nicht gefunden</p>
		<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
			<a
				href="/hr"
				class="inline-block bg-brand-red text-white px-6 py-2.5 rounded font-medium hover:brightness-110 transition"
			>
				Početna
			</a>
			<a
				href="/en"
				class="inline-block border-2 border-brand-red text-brand-red px-6 py-2.5 rounded font-medium hover:bg-brand-red hover:text-white transition-colors"
			>
				Home (EN)
			</a>
		</div>
	</div>
</section>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Translations, Lang } from '$lib/i18n';

	interface Props {
		t: Translations;
		lang: Lang;
	}

	let { t, lang }: Props = $props();

	const STORAGE_KEY = 'sprinter-cookie-consent';

	let visible = $state(false);

	onMount(() => {
		if (!localStorage.getItem(STORAGE_KEY)) {
			visible = true;
		}
	});

	function accept() {
		localStorage.setItem(STORAGE_KEY, 'accepted');
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed bottom-0 inset-x-0 z-[60] bg-slate-900 text-white shadow-2xl border-t border-slate-700"
		role="region"
		aria-label="Cookie notice"
	>
		<div class="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
			<p class="text-sm flex-1">
				{t.cookieBanner.message}
				<a href="/{lang}/cookies" class="underline hover:text-brand-green ml-1">{t.cookieBanner.learnMore}</a>
			</p>
			<button
				type="button"
				onclick={accept}
				class="shrink-0 bg-brand-green text-white px-5 py-2 rounded font-medium text-sm hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-white"
			>
				{t.cookieBanner.accept}
			</button>
		</div>
	</div>
{/if}

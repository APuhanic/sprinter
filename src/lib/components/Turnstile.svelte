<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	const siteKey = env.PUBLIC_TURNSTILE_SITE_KEY;

	onMount(() => {
		if (!siteKey) return;
		if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) return;
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	});
</script>

{#if siteKey}
	<div class="cf-turnstile" data-sitekey={siteKey}></div>
{/if}

<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		message: string;
		privacy: string;
		accept: string;
		reject: string;
		privacyHref: string;
	};
	let { message, privacy, accept, reject, privacyHref }: Props = $props();

	const STORAGE_KEY = 'sprinter-consent';
	let visible = $state(false);

	// Globals set by the Consent Mode bootstrap + GTM in app.html.
	type ConsentWindow = {
		gtag?: (...args: unknown[]) => void;
		dataLayer?: unknown[];
		fbq?: (...args: unknown[]) => void;
	};
	const w = () => window as unknown as ConsentWindow;

	onMount(() => {
		try {
			if (!localStorage.getItem(STORAGE_KEY)) visible = true;
		} catch {
			// localStorage blocked (private mode) — show the banner, just can't remember.
			visible = true;
		}
	});

	function persist(value: 'granted' | 'denied') {
		try {
			localStorage.setItem(STORAGE_KEY, value);
		} catch {
			/* private mode — the choice simply isn't remembered next visit */
		}
		visible = false;
	}

	function acceptAll() {
		const win = w();
		win.gtag?.('consent', 'update', {
			ad_storage: 'granted',
			ad_user_data: 'granted',
			ad_personalization: 'granted',
			analytics_storage: 'granted'
		});
		win.dataLayer?.push({ event: 'consent_granted' });
		win.fbq?.('consent', 'grant');
		persist('granted');
	}

	function rejectAll() {
		// Consent Mode defaults are already 'denied' (set in app.html) — just record it.
		w().fbq?.('consent', 'revoke');
		persist('denied');
	}
</script>

{#if visible}
	<div class="consent" role="region" aria-label="Cookie consent">
		<p class="consent__text">
			{message}
			<a class="consent__link" href={privacyHref}>{privacy}</a>
		</p>
		<div class="consent__actions">
			<button type="button" class="consent__btn consent__btn--ghost" onclick={rejectAll}>
				{reject}
			</button>
			<button type="button" class="consent__btn consent__btn--solid" onclick={acceptAll}>
				{accept}
			</button>
		</div>
	</div>
{/if}

<style>
	.consent {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 14px 24px;
		padding: 16px clamp(16px, 4vw, 32px);
		background: #0d0f12;
		border-top: 1px solid rgba(255, 255, 255, 0.14);
		color: #ffffff;
		box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.28);
	}
	.consent__text {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
		line-height: 1.5;
		max-width: 68ch;
	}
	.consent__link {
		color: #ffffff;
		text-decoration: underline;
		text-underline-offset: 2px;
		white-space: nowrap;
	}
	.consent__actions {
		display: flex;
		gap: 10px;
		flex-shrink: 0;
	}
	/* Reject and Accept are equal-weight, equal-size taps (EU: reject must be as
	   easy as accept). Accept is the rust primary; reject is an outlined ghost. */
	.consent__btn {
		padding: 11px 24px;
		border-radius: 2px;
		font-family: inherit;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid transparent;
		transition: background 0.18s ease, border-color 0.18s ease;
	}
	.consent__btn--ghost {
		background: transparent;
		border-color: rgba(255, 255, 255, 0.45);
		color: #ffffff;
	}
	.consent__btn--ghost:hover {
		border-color: #ffffff;
	}
	.consent__btn--solid {
		background: #a84c28;
		border-color: #a84c28;
		color: #ffffff;
	}
	.consent__btn--solid:hover {
		background: #b85631;
	}
	@media (max-width: 640px) {
		.consent {
			gap: 12px;
		}
		.consent__actions {
			width: 100%;
		}
		.consent__btn {
			flex: 1;
		}
	}
</style>

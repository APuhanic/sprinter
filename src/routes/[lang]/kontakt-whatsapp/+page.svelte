<script lang="ts">
	import type { PageData } from './$types';
	import { telHref, waHref, contact } from '$lib/contact';

	let { data }: { data: PageData } = $props();
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.contactWa.title}</title>
	<meta name="description" content={t.contactWa.metaDescription} />
	<meta property="og:title" content={t.contactWa.title} />
	<meta property="og:description" content={t.contactWa.metaDescription} />
</svelte:head>

<main class="page-fade">
	<section class="section">
		<div class="wrap">
			<div class="kwa">
				<div class="eyebrow kwa__eyebrow">{t.contactWa.eyebrow}</div>
				<h1 class="display kwa__title">{t.contactWa.h1}</h1>

				<div class="kwa__lede">
					<p>{t.contactWa.intro1}</p>
					<p>{t.contactWa.intro2}</p>
					<p>{t.contactWa.intro3}</p>
				</div>

				<div class="kwa__cta-wrap">
					<a class="kwa__cta" href={waHref()} target="_blank" rel="noopener noreferrer">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
							/>
						</svg>
						<span>{t.contactWa.ctaButton}</span>
					</a>
					<p class="kwa__phone">
						{t.contactWa.phoneFallback}
						<a href={telHref}>{contact.phone}</a>
					</p>
				</div>

				<div class="kwa__tips">
					<div class="kwa__tips-title">{t.contactWa.tipsTitle}</div>
					<ul>
						{#each t.contactWa.tipsList as tip (tip)}
							<li>{tip}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.kwa {
		max-width: 56ch;
		margin: 0 auto;
		padding: clamp(20px, 4vw, 56px) 0;
	}
	.kwa__eyebrow {
		margin-bottom: 24px;
	}
	.kwa__title {
		font-size: clamp(32px, 5vw, 56px);
		line-height: 1.05;
		letter-spacing: -0.01em;
		margin-bottom: 28px;
	}
	.kwa__lede {
		font-size: clamp(15px, 1.6vw, 17px);
		line-height: 1.65;
		color: var(--fg);
	}
	.kwa__lede p {
		margin: 0 0 16px;
	}
	.kwa__lede p:last-child {
		margin-bottom: 0;
	}
	.kwa__cta-wrap {
		margin: 36px 0 28px;
		text-align: center;
	}
	.kwa__cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		min-height: 56px;
		padding: 16px 28px;
		background: #25d366;
		color: #0a3d1a;
		border-radius: 2px;
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-decoration: none;
		transition:
			background 0.18s ease,
			box-shadow 0.18s ease,
			transform 0.05s ease;
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
	}
	.kwa__cta:hover {
		background: #1ebe5a;
		box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
	}
	.kwa__cta:active {
		transform: translateY(1px);
	}
	.kwa__cta:focus-visible {
		outline: 3px solid rgba(37, 211, 102, 0.4);
		outline-offset: 2px;
	}
	@media (min-width: 600px) {
		.kwa__cta {
			width: auto;
			padding: 18px 40px;
		}
	}
	.kwa__phone {
		margin-top: 18px;
		font-size: 14px;
		color: var(--muted);
	}
	.kwa__phone a {
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.kwa__tips {
		margin-top: 32px;
		padding: 22px 24px;
		background: color-mix(in srgb, var(--accent) 4%, var(--bg));
		border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
		border-radius: 2px;
	}
	.kwa__tips-title {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 12px;
	}
	.kwa__tips ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.kwa__tips li {
		font-size: 14px;
		color: var(--fg);
		padding: 6px 0;
		line-height: 1.55;
	}
	.kwa__tips li::before {
		content: '— ';
		color: var(--accent);
		margin-right: 4px;
	}
</style>

<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { telHref, waHref, contact } from '$lib/contact';
	import { partnerPickups } from '$lib/redirects';
	import { transferService } from '$lib/jsonld';
	import TransferCalculator from '$lib/components/TransferCalculator.svelte';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	// Partner deep-links (e.g. /monumenti → ?partner=monumenti) prefill the
	// calculator's pickup so a hotel guest only has to choose a destination.
	let prefillPickup = $derived(partnerPickups[$page.url.searchParams.get('partner') ?? '']);

	// Arriving via a partner link → land the guest on the calculator (it sits
	// below the hero), so the prefilled pickup is immediately in view.
	onMount(() => {
		if (prefillPickup) {
			requestAnimationFrame(() =>
				document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			);
		}
	});

	const serviceJsonLd = JSON.stringify(transferService());

	const eClassImg = '/images/transfers/e-class-1.jpg';
	const vClassImg = '/images/transfers/v-class-1.jpg';

	let metaDescription = $derived(t.transfersPage.companyText.slice(0, 200));
</script>

<svelte:head>
	<title>Sprinter - {t.transfersPage.title}{t.transfersPage.titleSuffix}</title>
	<meta name="description" content={metaDescription} />
	<meta property="og:title" content="Sprinter - {t.transfersPage.title}{t.transfersPage.titleSuffix}" />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content="https://sprinter.hr/images/og/transfers-og.jpg" />
	{@html `<script type="application/ld+json">${serviceJsonLd}</` + `script>`}
</svelte:head>

<main class="page-fade">
	<!-- Hero (typographic) -->
	<section class="hero" data-variant="typographic" style="padding-bottom:clamp(24px, 4vw, 56px);">
		<div class="wrap">
			<div class="eyebrow" style="margin-bottom:32px;">{t.transfersPage.eyebrow}</div>
			<h1 class="display tr-hero__title">
				{t.transfersPage.title}
				<em class="tr-hero__title-suffix">{t.transfersPage.titleSuffix.replace(/^ /, '')}</em>
			</h1>
			<p class="lede" style="margin-top:32px; max-width:48ch;">
				{t.transfersPage.leadOne}
			</p>
		</div>
	</section>

	<!-- Calculator -->
	<section class="section section--tight" id="kalkulator">
		<div class="wrap">
			<TransferCalculator
				lang={lang as 'hr' | 'en' | 'de'}
				strings={t.transferCalc}
				whatsAppNumber={contact.whatsappNumber}
				phoneNumber={contact.tel}
				emailAddress={contact.email}
				{prefillPickup}
			/>
		</div>
	</section>

	<!-- Company text -->
	<section class="section section--tight">
		<div class="wrap">
			<p class="tr-company-text">{t.transfersPage.companyText}</p>
		</div>
	</section>

	<!-- Terms -->
	<section class="section section--tight">
		<div class="wrap">
			<div class="tr-terms">
				<h2 class="tr-terms__title">{t.transfersPage.termsTitle}</h2>
				<ul class="tr-terms__list">
					{#each t.transfersPage.terms as term (term)}
						<li>{term}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Fleet -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.transfersPage.fleetEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">{t.transfersPage.fleetTitle}</h2>
					<p class="section-sub" style="margin-top:24px;">{t.transfersPage.fleetSub}</p>
				</div>
			</div>

			<div class="tr-fleet">
				<article class="tr-fleet__card">
					<div class="tr-fleet__image">
						<img src={eClassImg} alt={t.transfersPage.eClassName} loading="lazy" />
					</div>
					<div class="tr-fleet__body">
						<h3 class="tr-fleet__name display">{t.transfersPage.eClassName}</h3>
						<p class="tr-fleet__desc">{t.transfersPage.eClassDesc}</p>
						<div class="tr-fleet__meta">
							<span>{t.transferCalc.eClassRange}</span>
						</div>
					</div>
				</article>

				<article class="tr-fleet__card">
					<div class="tr-fleet__image">
						<img src={vClassImg} alt={t.transfersPage.vClassName} loading="lazy" />
					</div>
					<div class="tr-fleet__body">
						<h3 class="tr-fleet__name display">{t.transfersPage.vClassName}</h3>
						<p class="tr-fleet__desc">{t.transfersPage.vClassDesc}</p>
						<div class="tr-fleet__meta">
							<span>{t.transferCalc.vClassRange}</span>
						</div>
					</div>
				</article>
			</div>
		</div>
	</section>

	<!-- Contact island -->
	<section class="section section--tight">
		<div class="wrap">
			<div class="contact-island">
				<div>
					<div class="eyebrow" style="color:rgba(255,255,255,0.5); margin-bottom:18px;">
						{t.home.contactEyebrow}
					</div>
					<h2>
						{t.home.contactTitle} <em>{t.home.contactTitleAccent}</em>.
					</h2>
					<p class="small" style="margin-top:18px; max-width:44ch;">{t.home.contactSub}</p>
					<div class="ctas">
						<a
							class="btn btn--primary"
							data-variant="pill"
							href={waHref()}
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="flex-shrink:0;">
								<circle cx="7" cy="7" r="6" fill="#25D366" />
								<path
									d="M4.6 5.2c.1-.4.4-.5.6-.5h.4c.1 0 .2.1.3.3l.4.9c.1.2 0 .3 0 .4l-.3.4c.4.7.9 1.2 1.6 1.6l.4-.3c.1-.1.2-.1.4 0l.9.4c.2.1.3.2.3.3v.4c0 .3-.2.5-.5.6-.4.1-.8.1-1.2 0a4.6 4.6 0 0 1-3-3c-.1-.4-.1-.8 0-1.1z"
									fill="#fff"
								/>
							</svg>
							<span>{t.transferCalc.whatsapp}</span>
							<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
						</a>
						<a class="btn btn--ghost" data-variant="pill" href={telHref}>
							{t.home.ctaCall} · {t.banner.phone}
						</a>
					</div>
				</div>
				<dl class="info">
					<div>
						<dt>{t.home.hoursLabel}</dt>
						<dd>{t.banner.hours}</dd>
					</div>
					<div>
						<dt>{lang === 'hr' ? 'Adresa' : lang === 'de' ? 'Adresse' : 'Address'}</dt>
						<dd>{t.banner.address}</dd>
					</div>
					<div>
						<dt>WhatsApp</dt>
						<dd>{t.banner.phone}</dd>
					</div>
					<div>
						<dt>Email</dt>
						<dd>{t.common.email}</dd>
					</div>
				</dl>
			</div>
		</div>
	</section>
</main>

<style>
	.tr-hero__title {
		/* Single line, never the awkward "Privatni transferi /" + "taxi" break.
		   7vw-ish keeps it one line at any width; clamp caps it big on desktop,
		   small enough to fit the narrowest phone (the beach/sun test). */
		font-size: clamp(26px, 7.6vw, 70px);
		line-height: 1.1;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.tr-hero__title-suffix {
		display: block;
		/* Darker rust than --accent for stronger contrast on the beige hero. */
		color: #9a4a2a;
		font-style: italic;
		font-weight: 600;
		font-size: 0.6em;
		margin-top: 6px;
		letter-spacing: -0.005em;
		white-space: normal;
	}

	.tr-company-text {
		max-width: 60ch;
		margin: 0 auto;
		text-align: center;
		font-size: clamp(15px, 1.6vw, 17px);
		line-height: 1.65;
		color: var(--muted);
	}

	.tr-terms {
		max-width: 720px;
		margin: 0 auto;
	}
	.tr-terms__title {
		font-family: var(--font-display);
		font-size: clamp(22px, 2.4vw, 28px);
		margin: 0 0 18px;
		letter-spacing: -0.005em;
	}
	.tr-terms__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.tr-terms__list li {
		position: relative;
		padding-left: 22px;
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--fg);
	}
	.tr-terms__list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 10px;
		width: 8px;
		height: 1px;
		background: var(--accent);
	}

	.tr-fleet {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 28px;
	}
	@media (max-width: 800px) {
		.tr-fleet {
			grid-template-columns: 1fr;
		}
	}
	.tr-fleet__card {
		background: var(--bg);
		border: 1px solid var(--line);
	}
	.tr-fleet__image {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--soft);
	}
	.tr-fleet__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.tr-fleet__body {
		padding: clamp(20px, 3vw, 32px);
	}
	.tr-fleet__name {
		font-size: clamp(24px, 2.4vw, 30px);
		margin: 0 0 10px;
	}
	.tr-fleet__desc {
		color: var(--muted);
		line-height: 1.6;
		font-size: 15px;
		margin: 0 0 14px;
	}
	.tr-fleet__meta span {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}
</style>

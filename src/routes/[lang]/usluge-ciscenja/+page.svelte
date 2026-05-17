<script lang="ts">
	import type { PageData } from './$types';
	import { telHref, waHref } from '$lib/contact';
	import { cleaningService } from '$lib/jsonld';
	import Reviews from '$lib/components/Reviews.svelte';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
	let reviews = $derived(data.reviews);

	// Enrich the Service JSON-LD with AggregateRating + Review[] when we have
	// reviews. Google attaches review rich-results to the Service entity here.
	const serviceJsonLd = JSON.stringify(
		(() => {
			const base = cleaningService();
			if (!reviews || reviews.reviews.length === 0) return base;
			return {
				...base,
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: reviews.rating.toFixed(1),
					reviewCount: reviews.userRatingCount,
					bestRating: '5',
					worstRating: '1'
				},
				review: reviews.reviews.map((r) => ({
					'@type': 'Review',
					reviewRating: {
						'@type': 'Rating',
						ratingValue: r.rating,
						bestRating: '5',
						worstRating: '1'
					},
					author: { '@type': 'Person', name: r.author.name },
					datePublished: r.publishTime,
					reviewBody: r.originalText ?? r.text
				}))
			};
		})()
	);

	// FAQ — first item open by default
	let openFaq = $state(0);

	// Quote calculator state
	type CalcType = 'turnover' | 'deep' | 'regular' | 'office' | 'yacht';
	type CalcFreq = 'oneoff' | 'weekly' | 'fortnight' | 'monthly';
	let calcType = $state<CalcType>('turnover');
	let calcSize = $state(60);
	let calcFreq = $state<CalcFreq>('oneoff');

	let showFreq = $derived(calcType === 'regular' || calcType === 'office');
	let showSize = $derived(calcType !== 'yacht');

	// Canonical pricing tiers from sprinter.hr/usluge-ciscenja — see also
	// the cleaningServices i18n entries. Calculator must agree with what
	// the on-page tier table shows so quote messages don't contradict it.
	function calcEstimate(type: CalcType, size: number, freq: CalcFreq): [number, number] {
		if (type === 'turnover') {
			// Apartmani u Istri tiers: do 50 m² 70€, do 80 m² 100€, do 100 m² 120€, preko 100 m² 140€
			let base: number;
			if (size <= 50) base = 70;
			else if (size <= 80) base = 100;
			else if (size <= 100) base = 120;
			else base = 140 + Math.max(0, Math.ceil((size - 100) / 25)) * 15;
			return [Math.round(base / 5) * 5, Math.round((base * 1.3) / 5) * 5];
		}
		if (type === 'deep') {
			// Generalno čišćenje: 2 €/m², 80€ floor so small flats stay sensible
			const min = Math.max(80, Math.round(size * 2));
			return [Math.round(min / 5) * 5, Math.round((min * 1.4) / 5) * 5];
		}
		if (type === 'regular') {
			// Redovno (stanovi/kuće): do 45 m² 45€, 45–90 m² 60€, scale beyond
			let base: number;
			if (size <= 45) base = 45;
			else if (size <= 90) base = 60;
			else base = 60 + Math.ceil((size - 90) / 15) * 10;
			const mult = { oneoff: 1.15, weekly: 0.9, fortnight: 0.95, monthly: 1.0 }[freq];
			return [
				Math.round((base * mult) / 5) * 5,
				Math.round((base * mult * 1.4) / 5) * 5
			];
		}
		if (type === 'office') {
			// Poslovni prostori: 0,75 – 2 €/m²; floor 45€ for tiny offices
			const low = Math.max(45, Math.round(size * 0.75));
			const high = Math.max(90, Math.round(size * 2));
			return [Math.round(low / 5) * 5, Math.round(high / 5) * 5];
		}
		// yacht — quote-only, broad range surfaced
		return [80, 240];
	}

	let estimate = $derived(calcEstimate(calcType, calcSize, calcFreq));
	let typeLabel = $derived(t.calc.types.find((x) => x.id === calcType)?.label ?? '');
	let freqLabel = $derived(showFreq ? (t.calc.freqs.find((x) => x.id === calcFreq)?.label ?? '') : '');

	let calcWaUrl = $derived.by(() => {
		const [low, high] = estimate;
		const sizePart = showSize ? `~${calcSize} m²` : '';
		const freqPart = freqLabel ? ` (${freqLabel.toLowerCase()})` : '';
		const msg = `${t.calc.msgPrefix} ${typeLabel.toLowerCase()} ${t.calc.msgFor}${sizePart}${freqPart}${t.calc.msgEstimate} €${low}–€${high}. ${t.calc.msgCanYou}`;
		return waHref(msg);
	});

	function renderName(name: string, accent: string) {
		const i = name.toLowerCase().indexOf(accent.toLowerCase());
		if (i < 0) return { before: name, accent: '', after: '' };
		return {
			before: name.slice(0, i),
			accent: name.slice(i, i + accent.length),
			after: name.slice(i + accent.length)
		};
	}

	let calcTitleParts = $derived(renderName(t.calc.title, t.calc.titleAccent));
	let faqTitleParts = $derived(renderName(t.cleaningPage.faqTitle, t.cleaningPage.faqAccent));

	// Real photos paired by service id. Anything not in the map keeps the placeholder.
	const servicePhotos: Record<string, string> = {
		turnover: '/images/cleaning/ciscenje-kuhinja.jpg',
		deep: '/images/cleaning/ciscenje-kauc.jpg',
		regular: '/images/cleaning/sprinter-van.jpg',
		yacht: '/images/cleaning/ciscenje-terasa.jpg'
	};
</script>

<svelte:head>
	<title>Sprinter - {t.cleaningPage.titleA} {t.cleaningPage.titleB}</title>
	<meta name="description" content={t.cleaningPage.sub} />
	<meta property="og:title" content="Sprinter - {t.cleaningPage.titleA} {t.cleaningPage.titleB}" />
	<meta property="og:description" content={t.cleaningPage.sub} />
	{@html `<script type="application/ld+json">${serviceJsonLd}</` + `script>`}
</svelte:head>

<main class="page-fade">
	<!-- Hero -->
	<section class="hero" data-variant="typographic" style="padding-bottom:clamp(32px, 5vw, 80px);">
		<div class="wrap">
			<div class="eyebrow" style="margin-bottom:32px;">{t.cleaningPage.eyebrow}</div>
			<h1 class="hero__title display" style="max-width:16ch;">
				{t.cleaningPage.titleA} <em>{t.cleaningPage.titleB}</em>.
			</h1>
			<p class="lede hero__sub" style="margin-top:32px; max-width:60ch;">{t.cleaningPage.sub}</p>
			<div class="hero__cta">
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
					<span>{t.home.ctaWhatsapp}</span>
					<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
				</a>
				<a class="btn btn--ghost" data-variant="pill" href={telHref}>
					{t.home.ctaCall} · {t.banner.phone}
				</a>
			</div>
		</div>
	</section>

	<!-- Owner / Vision -->
	<section class="section section--tight owner-section">
		<div class="wrap">
			<div class="eyebrow" style="margin-bottom:20px;">{t.cleaningPage.owner.eyebrow}</div>
			<h2 class="section-title owner-section__title">
				{t.cleaningPage.owner.title}
			</h2>

			<figure class="owner-photo owner-photo--landscape">
				<img
					src="/images/owner/sprinter-vlasnica-portret.jpg"
					alt={t.cleaningPage.owner.portraitAlt}
					loading="lazy"
				/>
			</figure>

			<div class="owner-narrative">
				<p class="owner__quote">"{t.cleaningPage.owner.quote}"</p>
				{#if t.cleaningPage.owner.bio[0]}
					<p class="owner-narrative__para">{t.cleaningPage.owner.bio[0]}</p>
				{/if}
			</div>

			<div class="owner-action-row">
				<figure class="owner-photo owner-photo--vertical">
					<img
						src="/images/owner/sprinter-vlasnica-akcija.jpg"
						alt={t.cleaningPage.owner.actionAlt}
						loading="lazy"
					/>
				</figure>
				<div class="owner-action-row__text">
					{#if t.cleaningPage.owner.bio[1]}
						<p class="owner-narrative__para">{t.cleaningPage.owner.bio[1]}</p>
					{/if}
					<div class="owner__sig">
						<strong>{t.owner.name}</strong>
						<span>{t.owner.role}</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- TOC strip -->
	<nav class="toc-strip" aria-label={t.cleaningPage.eyebrow}>
		<div class="wrap">
			<span class="eyebrow">{t.cleaningPage.index}</span>
			{#each t.cleaningServices as s}
				<a href="#{s.id}"><span>{s.num}</span>{s.name}</a>
			{/each}
		</div>
	</nav>

	<!-- Service detail blocks -->
	<section class="section section--tight">
		<div class="wrap">
			{#each t.cleaningServices as s (s.id)}
				{@const parts = renderName(s.name, s.nameAccent)}
				<div
					class="svc-detail"
					class:svc-detail--no-photo={!servicePhotos[s.id]}
					id={s.id}
				>
					<div class="svc-detail__text">
						<div class="svc-detail__num">{s.num} / 05</div>
						<h2 class="svc-detail__title">
							{#if parts.accent}
								{parts.before}<em>{parts.accent}</em>{parts.after}
							{:else}
								{s.name}
							{/if}
						</h2>
						<p class="svc-detail__desc">{s.long}</p>
						<ul class="svc-detail__list">
							{#each s.bullets as b}
								<li>{b}</li>
							{/each}
						</ul>
						<div class="svc-detail__price">
							<span class="from">{t.cleaningPage.priceLabel}</span>
							<span class="amt">{s.price}</span>
							<span class="from">· {s.priceNote}</span>
						</div>
						{#if s.tiers && s.tiers.length}
							<ul class="svc-detail__tiers">
								{#each s.tiers as tier}
									<li>
										<span class="svc-detail__tiers-range">{tier.range}</span>
										<span class="svc-detail__tiers-price">{tier.price}</span>
									</li>
								{/each}
							</ul>
						{/if}
						<p class="svc-detail__disclaimer">{t.cleaningPage.priceDisclaimer}</p>
						<div style="margin-top:28px; display:flex; gap:12px; flex-wrap:wrap;">
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
								<span>{t.home.ctaWhatsapp}</span>
								<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
							</a>
							<a class="btn btn--ghost" data-variant="pill" href={telHref}>
								{t.cleaningPage.sendInquiry}
							</a>
						</div>
					</div>
					{#if servicePhotos[s.id]}
						<div>
							<div class="svc-detail__photo">
								<img src={servicePhotos[s.id]} alt={s.photoTag} loading="lazy" />
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Short-term rental note -->
	<section class="section section--tight">
		<div class="wrap">
			<aside class="airbnb-note">
				<div class="airbnb-note__tag">{t.cleaningPage.airbnbTag}</div>
				<p class="airbnb-note__text">{t.cleaningPage.airbnbNote}</p>
			</aside>
		</div>
	</section>

	<!-- Process -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.cleaningPage.processEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">{t.cleaningPage.processTitle}</h2>
					<p class="section-sub" style="margin-top:24px;">{t.cleaningPage.processSub}</p>
				</div>
			</div>
			<div class="steps">
				{#each t.process as s}
					<div class="step">
						<div class="step__num">STEP {s.num}</div>
						<h3 class="step__title">{s.title}</h3>
						<p class="step__desc">{s.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Areas -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.cleaningPage.areasEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">{t.cleaningPage.areasTitle}</h2>
					<p class="section-sub" style="margin-top:24px;">{t.cleaningPage.areasSub}</p>
				</div>
			</div>
			<div class="areas">
				{#each t.areas as a}
					<span class="area-tag" class:primary={a.primary}>{a.name}</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- Quote calculator -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.calc.eyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">
						{#if calcTitleParts.accent}{calcTitleParts.before}<em>{calcTitleParts.accent}</em>{calcTitleParts.after}{:else}{t.calc.title}{/if}
					</h2>
					<p class="section-sub" style="margin-top:24px;">{t.calc.sub}</p>
				</div>
			</div>
			<div class="calc">
				<div class="calc__form">
					<div role="group" aria-labelledby="calc-type-label">
						<span id="calc-type-label" class="calc__label">{t.calc.typeLabel}</span>
						<div class="calc__opts">
							{#each t.calc.types as opt}
								<button
									class="calc__opt"
									aria-pressed={calcType === opt.id}
									onclick={() => (calcType = opt.id)}
									type="button"
								>
									{opt.label}
								</button>
							{/each}
						</div>
					</div>
					{#if showSize}
						<div>
							<label for="calc-size">{t.calc.sizeLabel}</label>
							<div class="calc__slider-row">
								<input
									id="calc-size"
									type="range"
									min="25"
									max="220"
									step="5"
									bind:value={calcSize}
								/>
								<span class="calc__size">{calcSize} m²</span>
							</div>
						</div>
					{/if}
					{#if showFreq}
						<div role="group" aria-labelledby="calc-freq-label">
							<span id="calc-freq-label" class="calc__label">{t.calc.freqLabel}</span>
							<div class="calc__opts">
								{#each t.calc.freqs as opt}
									<button
										class="calc__opt"
										aria-pressed={calcFreq === opt.id}
										onclick={() => (calcFreq = opt.id)}
										type="button"
									>
										{opt.label}
									</button>
								{/each}
							</div>
						</div>
					{/if}
					{#if calcType === 'yacht'}
						<p class="small" style="margin-top:-4px;">{t.calc.yachtNote}</p>
					{/if}
				</div>
				<div class="calc__result">
					<div>
						<div class="calc__amount-from">{t.calc.estimateLabel}</div>
						<div class="calc__amount">
							€{estimate[0]}<em>–</em>€{estimate[1]}
						</div>
					</div>
					<p class="calc__breakdown">
						<strong>{typeLabel}</strong>{#if showSize} · {calcSize} m²{/if}{#if showFreq} · {freqLabel}{/if}
					</p>
					<div class="calc__cta">
						<a
							class="btn btn--primary"
							data-variant="pill"
							href={calcWaUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{t.calc.cta}
							<span class="arrow" aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.cleaningPage.faqEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">
						{#if faqTitleParts.accent}{faqTitleParts.before}<em>{faqTitleParts.accent}</em>{faqTitleParts.after}{:else}{t.cleaningPage.faqTitle}{/if}
					</h2>
					<p class="section-sub" style="margin-top:24px;">{t.cleaningPage.faqSub}</p>
				</div>
			</div>
			<div class="faq">
				{#each t.faq as item, i}
					<div class="faq-item" data-open={openFaq === i ? '1' : '0'}>
						<button
							class="faq-q"
							onclick={() => (openFaq = openFaq === i ? -1 : i)}
							aria-expanded={openFaq === i}
						>
							<span class="faq-q__text">{item.q}</span>
							<span class="faq-q__icon">+</span>
						</button>
						<div class="faq-a">{item.a}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Live Google reviews — silently absent when API key/place id missing -->
	{#if reviews && reviews.reviews.length > 0}
		<Reviews data={reviews} {t} />
	{/if}

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
							<span>{t.home.ctaWhatsapp}</span>
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

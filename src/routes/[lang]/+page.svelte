<script lang="ts">
	import type { PageData } from './$types';
	import { slugs } from '$lib/i18n';
	import { telHref, mailHref, waHref } from '$lib/contact';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	let cleaningHref = $derived(`/${lang}/${slugs[lang].cleaning}`);

	// Marquee items doubled so the loop seams don't show
	let marqueeItems = $derived([...t.home.marquee, ...t.home.marquee]);
</script>

<svelte:head>
	<title>Sprinter — {t.nav.cleaning}, Pula i Istra</title>
	<meta
		name="description"
		content={t.home.sub}
	/>
</svelte:head>

<main class="page-fade">
	<!-- Hero — typographic -->
	<section class="hero" data-variant="typographic">
		<div class="wrap">
			<div class="eyebrow" style="margin-bottom:32px;">{t.home.eyebrow}</div>
			<h1 class="hero__title display">
				{t.home.titleA} <em>{t.home.titleB}</em>.
			</h1>
			<p class="lede hero__sub">{t.home.sub}</p>
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
			<div class="hero__meta">
				{#each t.home.meta as m}
					<div class="hero__meta-item">
						<h5>{m.label}</h5>
						<p>{m.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Marquee -->
	<div class="marquee" aria-hidden="true">
		<div class="marquee__track">
			{#each marqueeItems as it}
				<span>{it}</span>
			{/each}
		</div>
	</div>

	<!-- Services -->
	<section class="section" id="services-anchor">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.home.servicesEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">{t.home.servicesTitle}</h2>
					<p class="section-sub" style="margin-top:24px;">{t.home.servicesSub}</p>
				</div>
			</div>

			<div class="service-grid">
				{#each t.homeServices as s}
					{@const idx = s.name.toLowerCase().indexOf(s.nameAccent.toLowerCase())}
					<a class="service" href="{cleaningHref}#{s.id}">
						<div class="service__num">{s.num}</div>
						<h3 class="service__name display">
							{#if idx >= 0}
								{s.name.slice(0, idx)}<em>{s.name.slice(idx, idx + s.nameAccent.length)}</em>{s.name.slice(idx + s.nameAccent.length)}
							{:else}
								{s.name}
							{/if}
						</h3>
						<p class="service__desc">{s.short}</p>
						<div class="service__cta">
							{t.home.ctaLearn} <span style="margin-left:6px;">→</span>
						</div>
					</a>
				{/each}
			</div>

			<div style="margin-top:48px; display:flex; justify-content:flex-end;">
				<a class="btn btn--ghost" data-variant="pill" href={cleaningHref}>
					{t.home.ctaSeeAll}
					<span class="arrow" aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Hours strip -->
	<div class="hours-strip">
		<div>
			<h5>WhatsApp</h5>
			<p>{t.banner.phone}</p>
		</div>
		<div>
			<h5>Email</h5>
			<p>{t.common.email}</p>
		</div>
		<div>
			<h5>{t.home.hoursLabel}</h5>
			<p>{t.home.hoursValue}</p>
		</div>
	</div>

	<!-- Process -->
	<section class="section">
		<div class="wrap">
			<div class="section-head">
				<div>
					<div class="eyebrow">{t.home.processEyebrow}</div>
				</div>
				<div>
					<h2 class="section-title">{t.home.processTitle}</h2>
					<p class="section-sub" style="margin-top:24px;">{t.home.processSub}</p>
				</div>
			</div>
			<div class="steps">
				{#each t.process as s}
					<div class="step">
						<div class="step__num">STEP {s.num}</div>
						<h4 class="step__title">{s.title}</h4>
						<p class="step__desc">{s.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Owner -->
	<section class="section">
		<div class="wrap">
			<div class="eyebrow" style="margin-bottom:32px;">{t.owner.eyebrow}</div>
			<div class="owner" style="grid-template-columns: 1fr;">
				<div>
					<p class="owner__quote">
						"{t.owner.quote}<em>{t.owner.quoteAccent}</em>"
					</p>
					<p class="fg-muted" style="margin-top:28px; font-size:16px; line-height:1.55; max-width:52ch;">
						{t.owner.bio}
					</p>
					<div class="owner__sig">
						<strong>{t.owner.name}</strong>
						<span>{t.owner.role}</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!--
		"Sprinter ne staje na čišćenju" upsell section — hidden 2026-05-15 while
		rental + goods-transport products are paused. Cleaning + transfers are the
		only live products, so the section had two of three cards pointing to
		backup pages. Restore this block (and the otherHref helper / otherServices
		i18n keys) when those products come back.
	-->

	<!-- Contact island -->
	<section class="section section--tight">
		<div class="wrap">
			<div class="contact-island">
				<div>
					<div
						class="eyebrow"
						style="color:rgba(255,255,255,0.5); margin-bottom:18px;"
					>
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

<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { languages, slugs, type Lang } from '$lib/i18n';
	import { telHref, mailHref, waHref } from '$lib/contact';
	import { localBusiness } from '$lib/jsonld';

	let { data, children }: { data: LayoutData; children: any } = $props();

	let lang = $derived(data.lang);
	let t = $derived(data.t);

	const businessJsonLd = JSON.stringify(localBusiness());

	function switchLangUrl(targetLang: Lang): string {
		const currentPath = $page.url.pathname;
		const rest = currentPath.replace(new RegExp(`^/${lang}(?=/|$)`), '');
		return `/${targetLang}${rest}`;
	}

	function isActive(href: string): boolean {
		const current = $page.url.pathname;
		if (href === `/${lang}`) return current === `/${lang}` || current === `/${lang}/`;
		return current.startsWith(href);
	}

	let navItems = $derived([
		{ href: `/${lang}`, label: t.nav.home },
		{ href: `/${lang}/${slugs[lang].cleaning}`, label: t.nav.cleaning },
		{ href: `/${lang}/${slugs[lang].transfers}`, label: t.nav.transfers },
		{ href: `/${lang}/kontakt`, label: t.nav.contact }
	]);

	const SITE_URL = 'https://sprinter.hr';
	let canonicalPath = $derived($page.url.pathname);
	let canonical = $derived(`${SITE_URL}${canonicalPath}`);
	let hreflangs = $derived(
		(Object.keys(languages) as Lang[]).map((l) => ({
			hreflang: l,
			href: `${SITE_URL}${canonicalPath.replace(new RegExp(`^/${lang}(?=/|$)`), `/${l}`)}`
		}))
	);

	let waPhone = '+385 95 722 6918';
	let callLabel = $derived(lang === 'hr' ? 'Nazovi' : lang === 'de' ? 'Anrufen' : 'Call');
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	{#each hreflangs as alt}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={`${SITE_URL}${canonicalPath.replace(new RegExp(`^/${lang}(?=/|$)`), '/hr')}`}
	/>
	<meta property="og:site_name" content="Sprinter d.o.o." />
	<meta
		property="og:locale"
		content={lang === 'hr' ? 'hr_HR' : lang === 'de' ? 'de_DE' : 'en_US'}
	/>
	<meta property="og:url" content={canonical} />
	<!-- Default OG: cleaning-themed. /luksuzni-transferi overrides with its own. -->
	<meta property="og:image" content={`${SITE_URL}/images/og/cleaning-og.jpg`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	{@html `<script type="application/ld+json">${businessJsonLd}</` + `script>`}
</svelte:head>

<!-- Top utility strip -->
<div class="utility">
	<div class="wrap">
		<span><span class="pulse" aria-hidden="true"></span>{t.banner.notice}</span>
		<span class="utility__group">
			<span>{t.banner.hours}</span>
			<span>{t.banner.address}</span>
			<a href={telHref}>{t.banner.phone}</a>
		</span>
	</div>
</div>

<!-- Header -->
<header class="site-header">
	<div class="wrap site-header__bar">
		<a href="/{lang}" class="brand" aria-label="Sprinter">
			<span class="brand__mark" aria-hidden="true">S</span>
			<span class="brand__word">Sprinter</span>
		</a>

		<nav class="nav" aria-label="Main">
			{#each navItems as item}
				<a href={item.href} class:active={isActive(item.href)}>{item.label}</a>
			{/each}
		</nav>

		<div class="lang-toggle" role="tablist" aria-label="Language">
			{#each Object.keys(languages) as l}
				{@const targetLang = l as Lang}
				<a
					href={switchLangUrl(targetLang)}
					class:on={targetLang === lang}
					role="tab"
					aria-selected={targetLang === lang}
				>
					{targetLang.toUpperCase()}
				</a>
			{/each}
		</div>
	</div>
</header>

<!-- Page content -->
<main>
	{@render children()}
</main>

<!-- Footer -->
<footer class="site-footer">
	<div class="wrap">
		<div class="footer-grid">
			<div>
				<a href="/{lang}" class="brand" aria-label="Sprinter">
					<span class="brand__mark" aria-hidden="true">S</span>
					<span class="brand__word">Sprinter</span>
				</a>
				<p style="margin-top:16px; font-size:14px; opacity:0.7; max-width:32ch; line-height:1.5;">
					{t.footerNew.tag}
				</p>
				<p
					style="margin-top:24px; font-size:12px; opacity:0.5; max-width:44ch; line-height:1.5; font-family:var(--font-mono);"
				>
					{t.footer.complaint}
				</p>
			</div>
			<div>
				<h3>{t.footerNew.colsServices}</h3>
				<ul>
					{#each t.homeServices as s}
						<li>
							<a href="/{lang}/{slugs[lang].cleaning}#{s.id}">{s.name}</a>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3>{t.footerNew.colsCompany}</h3>
				<ul>
					<li><a href="/{lang}/{slugs[lang].cleaning}">{t.nav.cleaning}</a></li>
					<li><a href="/{lang}/{slugs[lang].transfers}">{t.nav.transfers}</a></li>
				</ul>
			</div>
			<div>
				<h3>{t.footerNew.colsContact}</h3>
				<ul>
					<li><a href={telHref}>{t.banner.phone}</a></li>
					<li><a href={mailHref}>{t.common.email}</a></li>
					<li>{t.banner.address}</li>
					<li>{t.banner.hours}</li>
				</ul>
			</div>
		</div>
		<div class="footer-bottom">
			<span>{t.footerNew.legal[0]}</span>
			<span><a href="/{lang}/pravila-privatnosti">{t.footerNew.legal[1]}</a></span>
		</div>
	</div>
</footer>

<!-- Mobile sticky CTA bar -->
<div class="mobile-bar" role="region" aria-label="Quick contact">
	<a href={waHref()} class="primary" target="_blank" rel="noopener noreferrer">
		<svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
			<circle cx="7" cy="7" r="6" fill="#fff" />
			<path
				d="M4.6 5.2c.1-.4.4-.5.6-.5h.4c.1 0 .2.1.3.3l.4.9c.1.2 0 .3 0 .4l-.3.4c.4.7.9 1.2 1.6 1.6l.4-.3c.1-.1.2-.1.4 0l.9.4c.2.1.3.2.3.3v.4c0 .3-.2.5-.5.6-.4.1-.8.1-1.2 0a4.6 4.6 0 0 1-3-3c-.1-.4-.1-.8 0-1.1z"
				fill="var(--accent)"
			/>
		</svg>
		<span>WhatsApp</span>
	</a>
	<a href={telHref} class="ghost"><span>{callLabel}</span></a>
</div>

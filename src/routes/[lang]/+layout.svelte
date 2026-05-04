<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { languages, slugs, type Lang } from '$lib/i18n';
	import { telHref, mailHref, waHref } from '$lib/contact';
	import SiteNotice from '$lib/components/SiteNotice.svelte';
	import { localBusiness } from '$lib/jsonld';

	let { data, children } = $props();

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

	let mobileMenuOpen = $state(false);

	let navItems = $derived([
		{ href: `/${lang}`, label: t.nav.home },
		{ href: `/${lang}/${slugs[lang].cleaning}`, label: t.nav.cleaning },
		{ href: `/${lang}/${slugs[lang].transport}`, label: t.nav.transport },
		{ href: `/${lang}/${slugs[lang].rental}`, label: t.nav.rental },
		{ href: `/${lang}/${slugs[lang].transfers}`, label: t.nav.transfers },
		{ href: `/${lang}/${slugs[lang].contact}`, label: t.nav.contact }
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
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	{#each hreflangs as alt}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${SITE_URL}${canonicalPath.replace(new RegExp(`^/${lang}(?=/|$)`), '/hr')}`} />
	<meta property="og:site_name" content="Sprinter d.o.o." />
	<meta property="og:locale" content={lang === 'hr' ? 'hr_HR' : lang === 'de' ? 'de_DE' : 'en_US'} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={`${SITE_URL}/images/hero/rental-hero.jpg`} />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="908" />
	<meta name="twitter:card" content="summary_large_image" />
	{@html `<script type="application/ld+json">${businessJsonLd}</` + `script>`}
</svelte:head>

<!-- Top banner — dark bar matching WP -->
<div class="bg-brand-dark text-white text-sm">
	<div class="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
		<span class="text-green-400 font-medium">{t.banner.notice}</span>
		<div class="hidden sm:flex flex-wrap items-center gap-4 text-slate-300">
			<span>{t.banner.address}</span>
			<a href={telHref} class="hover:text-white transition-colors">{t.banner.phone}</a>
			<span>{t.banner.hours}</span>
		</div>
	</div>
</div>

<!-- Navigation -->
<header class="sticky top-0 z-50 bg-white shadow-sm">
	<nav class="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
		<!-- Logo -->
		<a href="/{lang}" class="shrink-0">
			<img src="/images/logo/logo-red.png" alt="Sprinter" class="h-12" />
		</a>

		<!-- Desktop nav -->
		<div class="hidden lg:flex items-center gap-5">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm font-medium uppercase tracking-wide transition-colors {isActive(item.href)
						? 'text-brand-red'
						: 'text-slate-700 hover:text-brand-red'}"
				>
					{item.label}
				</a>
			{/each}

			<!-- Language switcher -->
			<div class="flex items-center gap-0.5 ml-3 border-l pl-3 border-slate-200">
				{#each Object.keys(languages) as l}
					{@const targetLang = l as Lang}
					<a
						href={switchLangUrl(targetLang)}
						class="px-2 py-1 text-xs font-bold rounded transition-colors {targetLang === lang
							? 'bg-brand-red text-white'
							: 'text-slate-400 hover:text-brand-red'}"
					>
						{targetLang.toUpperCase()}
					</a>
				{/each}
			</div>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="lg:hidden p-2 text-slate-700"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label="Menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if mobileMenuOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
			{#each navItems as item}
				<a
					href={item.href}
					class="block py-2.5 text-sm font-medium uppercase transition-colors {isActive(item.href)
						? 'text-brand-red'
						: 'text-slate-700 hover:text-brand-red'}"
					onclick={() => (mobileMenuOpen = false)}
				>
					{item.label}
				</a>
			{/each}

			<div class="flex items-center gap-1 pt-2 border-t border-slate-100">
				{#each Object.keys(languages) as l}
					{@const targetLang = l as Lang}
					<a
						href={switchLangUrl(targetLang)}
						class="px-3 py-1.5 text-xs font-bold rounded {targetLang === lang
							? 'bg-brand-red text-white'
							: 'text-slate-400 hover:text-brand-red'}"
						onclick={() => (mobileMenuOpen = false)}
					>
						{targetLang.toUpperCase()}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>

<!-- Page content -->
<main>
	{@render children()}
</main>

<!-- Site notice -->
<SiteNotice {t} {lang} />

<!-- WhatsApp floating button -->
<a
	href={waHref()}
	target="_blank"
	rel="noopener noreferrer"
	class="fixed bottom-6 right-6 z-50 bg-brand-green hover:brightness-110 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
	aria-label="WhatsApp"
>
	<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
	</svg>
</a>

<!-- Footer -->
<footer class="bg-brand-footer text-slate-300">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<!-- Footer logo -->
		<div class="mb-8">
			<img src="/images/logo/logo-white.png" alt="Sprinter" class="h-10" />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Legal links -->
			<div>
				<div class="space-y-2 text-sm">
					<a href="/{lang}/cookies" class="block hover:text-white transition-colors">{t.footer.cookies}</a>
					<a href="/{lang}/pravila-privatnosti" class="block hover:text-white transition-colors">{t.footer.privacy}</a>
					<a href="/{lang}/uvjeti-najma" class="block hover:text-white transition-colors">{t.footer.rentalTerms}</a>
				</div>
			</div>

			<!-- How to reach us -->
			<div>
				<h3 class="text-white font-bold text-sm uppercase tracking-wide mb-4">{t.footer.howToReachUs}</h3>
				<p class="text-sm mb-4">{t.footer.advisory}</p>
				<div class="space-y-1.5 text-sm mt-4">
					<p class="font-medium text-white">{t.footer.addressLabel}</p>
					<p>{t.common.address}</p>
					<p><a href={telHref} class="hover:text-white transition-colors">{t.common.phone}</a></p>
					<p><a href={mailHref} class="hover:text-white transition-colors">{t.common.email}</a></p>
				</div>
				<!-- Social links -->
				<div class="flex gap-4 mt-4">
					<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Facebook">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
					</a>
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Instagram">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
					</a>
				</div>
			</div>

			<!-- Working hours -->
			<div>
				<h3 class="text-white font-bold text-sm uppercase tracking-wide mb-4">{t.contact.workingHours}</h3>
				<p class="text-sm">{t.banner.hours}</p>
			</div>

			<!-- Complaint info -->
			<div>
				<h3 class="text-white font-bold text-sm uppercase tracking-wide mb-4">
					{t.footer.complaintTitle}
				</h3>
				<p class="text-xs text-slate-400">{t.footer.complaint}</p>
			</div>
		</div>

		<div class="border-t border-slate-600/50 mt-10 pt-6 text-center text-sm text-slate-400">
			<p>{new Date().getFullYear()} {t.footer.copyright}</p>
		</div>
	</div>
</footer>

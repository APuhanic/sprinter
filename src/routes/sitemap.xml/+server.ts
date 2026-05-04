import type { RequestHandler } from './$types';
import { languages, slugs, type Lang } from '$lib/i18n';
import { vehicles } from '$lib/data/vehicles';

const SITE_URL = 'https://sprinter.hr';

function xmlEscape(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

type Entry = { path: string; changefreq: string; priority: string };

function pagesForLang(lang: Lang): Entry[] {
	const s = slugs[lang];
	const base: Entry[] = [
		{ path: `/${lang}`, changefreq: 'weekly', priority: '1.0' },
		{ path: `/${lang}/${s.cleaning}`, changefreq: 'monthly', priority: '0.8' },
		{ path: `/${lang}/${s.rental}`, changefreq: 'weekly', priority: '0.9' },
		{ path: `/${lang}/${s.transfers}`, changefreq: 'monthly', priority: '0.8' },
		{ path: `/${lang}/${s.contact}`, changefreq: 'yearly', priority: '0.5' },
		{ path: `/${lang}/uvjeti-najma`, changefreq: 'yearly', priority: '0.3' },
		{ path: `/${lang}/pravila-privatnosti`, changefreq: 'yearly', priority: '0.3' },
		{ path: `/${lang}/cookies`, changefreq: 'yearly', priority: '0.3' }
	];

	const vehiclePages: Entry[] = vehicles.map((v) => ({
		path: `/${lang}/${s.rental}/${v.slug}`,
		changefreq: 'monthly',
		priority: '0.7'
	}));

	return [...base, ...vehiclePages];
}

export const GET: RequestHandler = async () => {
	const langs = Object.keys(languages) as Lang[];
	const today = new Date().toISOString().split('T')[0];

	const urls = langs.flatMap((lang) => pagesForLang(lang));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
	.map((entry) => {
		const alternates = langs
			.map((l) => {
				const s = slugs[l];
				const currentSeg = entry.path.split('/').slice(2).join('/');
				const altPath = currentSeg ? `/${l}/${currentSeg}` : `/${l}`;
				return `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(SITE_URL + altPath)}" />`;
			})
			.join('\n');
		return `  <url>
    <loc>${xmlEscape(SITE_URL + entry.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternates}
  </url>`;
	})
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

export const prerender = true;

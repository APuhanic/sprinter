import { test, expect } from '@playwright/test';

test('root redirects to /hr', async ({ page }) => {
	const response = await page.goto('/');
	expect(page.url()).toContain('/hr');
	expect(response?.status()).toBeLessThan(400);
});

test('homepage renders in all three languages', async ({ page }) => {
	for (const [lang, title] of [
		['hr', 'Početna'],
		['en', 'Home'],
		['de', 'Startseite']
	] as const) {
		await page.goto(`/${lang}`);
		await expect(page).toHaveTitle(new RegExp(title));
		await expect(page.locator('html')).toHaveAttribute('lang', lang);
	}
});

test('hero carousel controls are interactive', async ({ page }) => {
	await page.goto('/hr');
	const nextBtn = page.getByRole('button', { name: 'Sljedeći slajd' });
	const pauseBtn = page.getByRole('button', { name: /Pauziraj|Pokreni/ });
	await expect(nextBtn).toBeVisible();
	await expect(pauseBtn).toBeVisible();
	await nextBtn.click();
	await pauseBtn.click();
});

test('rental list filter narrows vehicles', async ({ page }) => {
	await page.goto('/hr/najam-vozila');
	const cards = page.locator('[data-testid="vehicle-card"]');
	const initial = await cards.count();
	expect(initial).toBeGreaterThan(0);
	await page.selectOption('#filter', 'cargo');
	await expect.poll(() => cards.count()).toBeLessThan(initial);
	expect(await cards.count()).toBeGreaterThan(0);
});

test('vehicle detail page emits Product JSON-LD', async ({ page }) => {
	await page.goto('/hr/najam-vozila/mercedes-e300');
	const schemas = await page.$$eval(
		'script[type="application/ld+json"]',
		(nodes) => nodes.map((n) => JSON.parse(n.textContent || '{}')['@type'])
	);
	expect(schemas).toContain('Product');
	expect(schemas).toContain('AutoRental');
});

test('contact page has map + get-directions link', async ({ page }) => {
	await page.goto('/hr/kontakt');
	await expect(page.locator('iframe[src*="google.com/maps"]')).toBeVisible();
	await expect(page.getByRole('link', { name: /Upute za dolazak/ })).toBeVisible();
});

test('404 page renders branded error', async ({ page }) => {
	const response = await page.goto('/hr/does-not-exist');
	expect(response?.status()).toBe(404);
	await expect(page.getByText('404')).toBeVisible();
});

test('sitemap.xml returns valid XML with all languages', async ({ request }) => {
	const res = await request.get('/sitemap.xml');
	expect(res.status()).toBe(200);
	const body = await res.text();
	expect(body).toContain('<?xml');
	expect(body).toContain('/hr');
	expect(body).toContain('/en');
	expect(body).toContain('/de');
	expect(body).toContain('hreflang=');
});

test('robots.txt points to sitemap', async ({ request }) => {
	const res = await request.get('/robots.txt');
	expect(res.status()).toBe(200);
	const body = await res.text();
	expect(body).toContain('Sitemap:');
	expect(body).toContain('sitemap.xml');
});

test('contact form submits and redirects to /hvala', async ({ page }) => {
	await page.goto('/hr/kontakt');
	await page.locator('#name').fill('Playwright Test');
	await page.locator('#email').fill('test@example.com');
	await page.locator('#phone').fill('+385 91 234 5678');
	await page.locator('#message').fill('End-to-end smoke test. Please ignore.');
	await page.locator('#privacy').check();
	await page.getByRole('button', { name: /Pošalji/ }).click();
	await page.waitForURL('**/hr/hvala');
	await expect(page.getByRole('heading', { name: 'Hvala na upitu' })).toBeVisible();
});

test('contact form rejects empty submission', async ({ page }) => {
	await page.goto('/hr/kontakt');
	// Bypass HTML5 required validation by removing the attribute, so we hit server-side validation
	await page.evaluate(() => {
		document.querySelectorAll('input[required], textarea[required]').forEach((el) => el.removeAttribute('required'));
	});
	await page.getByRole('button', { name: /Pošalji/ }).click();
	await expect(page).toHaveURL(/\/hr\/kontakt/);
});

test('301 redirects from legacy WordPress URLs that map to live pages', async ({ request }) => {
	const cases = [
		{ from: '/kontakt', to: '/hr/kontakt' },
		{ from: '/usluge-ciscenja', to: '/hr/usluge-ciscenja' },
		{ from: '/usluga-ciscenja', to: '/hr/usluge-ciscenja' },
		{ from: '/luksuzni-transferi-s-osobnim-vozacem', to: '/hr/luksuzni-transferi' },
		{ from: '/luksuzni-transferi-s-osobnim-vozacem/', to: '/hr/luksuzni-transferi' }
	];
	for (const { from, to } of cases) {
		const res = await request.get(from, { maxRedirects: 0 });
		expect(res.status(), `${from} should 301`).toBe(301);
		expect(res.headers()['location'], `${from} → ${to}`).toBe(to);
	}
});

test('410 Gone for legacy WordPress URLs whose feature is no longer offered', async ({
	request
}) => {
	const goneUrls = [
		// paused rental
		'/rent-a-car',
		'/rent-a-car/mercedes-benz-e-300-avantgarde',
		'/rent-a-car/5858',
		'/najam-kombi-vozila',
		// car classifieds
		'/automobili',
		'/automobili/suzuki-baleno-2011',
		// moving service
		'/usluga-selidbe',
		// user accounts
		'/registracija',
		'/prijava',
		// listing management
		'/add-renta-car',
		// removed cookie policy
		'/cookie-policy',
		// WP junk
		'/test',
		'/primjer-stranice'
	];
	for (const url of goneUrls) {
		const res = await request.get(url, { maxRedirects: 0 });
		expect(res.status(), `${url} should be 410 Gone`).toBe(410);
	}
});

test('legacy privacy policy query-string URL redirects', async ({ request }) => {
	const res = await request.get('/?page_id=3', { maxRedirects: 0 });
	expect(res.status()).toBe(301);
	expect(res.headers()['location']).toBe('/hr/pravila-privatnosti');
});

test('vehicle inquiry form computes live quote and submits', async ({ page }) => {
	await page.goto('/hr/najam-vozila/mercedes-e300');
	// Default dates: tomorrow → day-after-tomorrow-plus (3 days rental)
	// Days counter + estimated price should be visible
	await expect(page.getByText('Procjena cijene')).toBeVisible();
	// Fill contact fields
	await page.locator('#inq-name').fill('Playwright Test');
	await page.locator('#inq-email').fill('test@example.com');
	await page.getByRole('button', { name: /Pošalji upit/ }).click();
	await page.waitForURL('**/hr/hvala');
	await expect(page.getByRole('heading', { name: 'Hvala na upitu' })).toBeVisible();
});

// TODO: transfers page now uses TransferCalculator which posts to WhatsApp (no /hvala redirect).
// Rewrite this test to exercise the calculator's quote computation + WhatsApp link assembly.
test.skip('transfers inquiry form submits and redirects to /hvala', async ({ page }) => {
	await page.goto('/hr/luksuzni-transferi');
});

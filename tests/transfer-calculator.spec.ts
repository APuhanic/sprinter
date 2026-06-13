import { test, expect, type Page } from '@playwright/test';
import { calcFare } from '../src/lib/data/transferPricing';

/**
 * Transfer calculator coverage (replaces the old skipped TODO in smoke.spec).
 *
 * Google Maps is stubbed via addInitScript: we install a fake `window.google`
 * BEFORE the page scripts run, so `loadGoogleMaps()` resolves to our stub and
 * never loads the real SDK. That makes autocomplete + routing deterministic —
 * no API key, no network, stable distances we control from each test.
 */

// ── Maps stub ────────────────────────────────────────────────────────────────
// Runs in the browser. Exposes window.__pickPlace(input, name) to simulate the
// user choosing an autocomplete suggestion, and window.__stubRouteMeters to set
// the distance the next route() returns.
function installMapsStub() {
	// default 20 km / 25 min unless a test overrides it
	(window as any).__stubRouteMeters = 20_000;
	(window as any).__stubRouteSecs = 1_500;

	class FakeLatLng {
		constructor(
			private _lat: number,
			private _lng: number
		) {}
		lat() {
			return this._lat;
		}
		lng() {
			return this._lng;
		}
	}
	class FakeAutocomplete {
		_place: any = null;
		_cb: (() => void) | null = null;
		constructor(input: any) {
			input.__ac = this;
		}
		addListener(ev: string, cb: () => void) {
			if (ev === 'place_changed') this._cb = cb;
			return { remove() {} };
		}
		getPlace() {
			return this._place;
		}
	}
	class FakeDirectionsService {
		route(_req: any, cb: (res: any, status: string) => void) {
			cb(
				{
					routes: [
						{
							legs: [
								{
									distance: { value: (window as any).__stubRouteMeters },
									duration: { value: (window as any).__stubRouteSecs }
								}
							]
						}
					]
				},
				'OK'
			);
		}
	}
	class FakeMap {
		constructor() {}
	}
	class FakeDirectionsRenderer {
		constructor() {}
		setDirections() {}
	}
	class FakeGeocoder {
		geocode(req: any, cb: (r: any, s: string) => void) {
			cb(
				[
					{
						formatted_address: req?.address || 'Stub Address',
						geometry: { location: new FakeLatLng(44.87, 13.85) }
					}
				],
				'OK'
			);
		}
	}

	(window as any).google = {
		maps: {
			DirectionsService: FakeDirectionsService,
			Map: FakeMap,
			DirectionsRenderer: FakeDirectionsRenderer,
			Geocoder: FakeGeocoder,
			LatLng: FakeLatLng,
			TravelMode: { DRIVING: 'DRIVING' },
			places: { Autocomplete: FakeAutocomplete },
			event: { removeListener() {} }
		}
	};

	(window as any).__pickPlace = (input: any, name: string) => {
		input.value = name;
		const ac = input.__ac;
		if (!ac) throw new Error('Autocomplete not initialised on input yet');
		ac._place = {
			name,
			formatted_address: name,
			geometry: { location: new FakeLatLng(44.8, 13.8) }
		};
		ac._cb?.();
	};
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const fromInput = (p: Page) => p.locator('input[placeholder*="Aerodrom"]');
const toInput = (p: Page) => p.locator('input[placeholder*="Rovinj"]');
const nameInput = (p: Page) => p.getByRole('textbox', { name: 'Ime' });
const priceEl = (p: Page) => p.locator('.tr-calc__result-price');
const errorEl = (p: Page) => p.locator('.tr-calc__error');
const reserveLink = (p: Page) => p.getByRole('link', { name: 'Rezerviraj na WhatsApp' });

async function chooseMode(p: Page, mode: 'now' | 'later') {
	await p.getByRole('button', { name: mode === 'now' ? 'Vožnja odmah' : 'Za kasnije' }).click();
}

async function setRouteKm(p: Page, km: number) {
	await p.evaluate((km) => ((window as any).__stubRouteMeters = km * 1000), km);
}

/** Simulate picking both addresses from the (stubbed) autocomplete → computes a route. */
async function pickRoute(p: Page, km = 20) {
	await setRouteKm(p, km);
	await p.evaluate(() => {
		const f = document.querySelector('input[placeholder*="Aerodrom"]');
		const t = document.querySelector('input[placeholder*="Rovinj"]');
		(window as any).__pickPlace(f, 'Pula, Hrvatska');
		(window as any).__pickPlace(t, 'Medulin, Hrvatska');
	});
}

/** Decoded href of the reserve button (the assembled WhatsApp deep-link text). */
async function reserveText(p: Page): Promise<string> {
	const href = await reserveLink(p).getAttribute('href');
	return decodeURIComponent(href ?? '');
}

test.beforeEach(async ({ page }) => {
	await page.addInitScript(installMapsStub);
	await page.goto('/hr/luksuzni-transferi');
});

// ── Pricing: pure unit tests (no DOM) ────────────────────────────────────────
test.describe('calcFare (pricing)', () => {
	test('returns null for zero or negative distance', () => {
		expect(calcFare(0, 'e')).toBeNull();
		expect(calcFare(-5, 'e')).toBeNull();
		expect(calcFare(0, 'v')).toBeNull();
	});

	test('E-class cascading tiers: 10 km = 28 €', () => {
		// 4 start + 5·2.5 + 5·2.3 = 4 + 12.5 + 11.5 = 28
		expect(calcFare(10, 'e')).toBe(28);
	});

	test('V-class is always pricier than E-class for the same distance', () => {
		for (const km of [3, 10, 25, 50, 90, 100, 200]) {
			expect(calcFare(km, 'v')!).toBeGreaterThan(calcFare(km, 'e')!);
		}
	});

	test('fare increases monotonically with distance', () => {
		const sampled = [1, 5, 10, 20, 40, 60, 80, 95, 100, 120, 200];
		for (const v of ['e', 'v'] as const) {
			for (let i = 1; i < sampled.length; i++) {
				expect(calcFare(sampled[i], v)!).toBeGreaterThan(calcFare(sampled[i - 1], v)!);
			}
		}
	});

	test('past 100 km switches to the flat far-rate', () => {
		// 101 km · 1.71 = 172.71 → 173 (E), 101 · 2.23 = 225.23 → 225 (V)
		expect(calcFare(101, 'e')).toBe(173);
		expect(calcFare(101, 'v')).toBe(225);
	});

	test('100 km boundary still uses the segment tariff (not the flat rate)', () => {
		// flat would be round(100·1.71)=171; segment total is lower
		expect(calcFare(100, 'e')).toBeLessThan(171);
	});
});

// ── Gating + mode behaviour ──────────────────────────────────────────────────
test.describe('booking-mode gate', () => {
	test('calculator is locked until a mode is chosen', async ({ page }) => {
		await expect(page.getByText('Odaberite opciju za izračun')).toBeVisible();
		await expect(page.locator('.tr-calc')).toHaveAttribute('aria-disabled', 'true');
	});

	test('choosing "Vožnja odmah" unlocks inputs and hides date/time', async ({ page }) => {
		await chooseMode(page, 'now');
		await expect(page.getByText('Odaberite opciju za izračun')).toHaveCount(0);
		// inputs are now editable
		await fromInput(page).fill('Test');
		await expect(fromInput(page)).toHaveValue('Test');
		// date/time hidden in "now" mode
		await expect(page.locator('input[type="date"]')).toHaveCount(0);
		await expect(page.locator('select')).toHaveCount(0);
	});

	test('choosing "Za kasnije" reveals date and time fields', async ({ page }) => {
		await chooseMode(page, 'later');
		await expect(page.locator('.tr-calc__date')).toBeVisible();
		await expect(page.locator('select.tr-calc__input')).toBeVisible();
	});
});

// ── Quote computation ────────────────────────────────────────────────────────
test.describe('quote', () => {
	test('computes a price from the picked route, matching calcFare', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await expect(priceEl(page)).toHaveText(`${calcFare(20, 'e')} €`);
	});

	test('switching vehicle E → V raises the price', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 40);
		await expect(priceEl(page)).toHaveText(`${calcFare(40, 'e')} €`);
		await page.getByRole('button', { name: /V-klasa/ }).click();
		await expect(priceEl(page)).toHaveText(`${calcFare(40, 'v')} €`);
	});

	test('selecting the Ford wagon lowers the price below E-class', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 40);
		await expect(priceEl(page)).toHaveText(`${calcFare(40, 'e')} €`);
		await page.getByRole('button', { name: /Ford karavan/ }).click();
		await expect(priceEl(page)).toHaveText(`${calcFare(40, 'f')} €`);
		expect(calcFare(40, 'f')!).toBeLessThan(calcFare(40, 'e')!);
	});

	test('Ford selection carries the vehicle into the WhatsApp text', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await page.getByRole('button', { name: /Ford karavan/ }).click();
		await nameInput(page).fill('Ivan');
		const text = await reserveText(page);
		expect(text).toContain('Ford karavan');
		expect(text).toContain(`${calcFare(20, 'f')} €`);
	});

	test('long trips (>100 km) are flagged as estimates (~)', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 120);
		await expect(priceEl(page)).toHaveText(`~${calcFare(120, 'e')} €`);
		await expect(page.getByText('okvirno')).toBeVisible();
	});

	test('very long trips (>150 km) show the long-haul caveat', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 200);
		await expect(page.locator('.tr-calc__longhaul')).toBeVisible();
	});
});

// ── Validation messages (the bug this suite was written for) ─────────────────
test.describe('booking validation', () => {
	test('REGRESSION: "now" + addresses typed but no route → route message, not date/time', async ({
		page
	}) => {
		await chooseMode(page, 'now');
		await fromInput(page).fill('Pula aerodrom');
		await toInput(page).fill('Medulin');
		await nameInput(page).fill('Ivan');
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText(
			'Odaberite polazište i odredište iz popisa da izračunamo cijenu.'
		);
		// must NOT mention date/time in "now" mode
		await expect(errorEl(page)).not.toContainText('datum');
	});

	test('"now" + route but no name → name message', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText('Molimo unesite svoje ime.');
	});

	test('"later" + route + name but no date/time → date/time message', async ({ page }) => {
		await chooseMode(page, 'later');
		await pickRoute(page, 20);
		await nameInput(page).fill('Ivan');
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText('Molimo odaberite datum i vrijeme.');
	});

	test('"now" happy path: no error, WhatsApp text has VOŽNJA ODMAH + price + name', async ({
		page
	}) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await nameInput(page).fill('Ivan');
		await expect(errorEl(page)).toHaveCount(0);
		const text = await reserveText(page);
		expect(text).toContain('VOŽNJA ODMAH');
		expect(text).toContain(`${calcFare(20, 'e')} €`);
		expect(text).toContain('Ime: Ivan');
		expect(text).toContain('Pula, Hrvatska');
		expect(text).toContain('Medulin, Hrvatska');
	});

	test('"later" happy path: WhatsApp text has REZERVACIJA + scheduled date', async ({ page }) => {
		await chooseMode(page, 'later');
		await pickRoute(page, 20);
		// pick a future date + a time
		const d = new Date();
		d.setDate(d.getDate() + 3);
		const iso = d.toISOString().split('T')[0];
		const [, mo, da] = iso.split('-');
		// flatpickr keeps the input read-only (calendar-only); set the date through
		// its instance so onChange fires and the ISO value flows into the message.
		await page.evaluate((iso) => {
			const el = document.querySelector('.tr-calc__date') as HTMLInputElement & {
				_flatpickr?: { setDate: (d: Date, fire: boolean) => void };
			};
			el._flatpickr?.setDate(new Date(iso), true);
		}, iso);
		await page.locator('select.tr-calc__input').selectOption('12:00');
		await nameInput(page).fill('Ivan');
		await expect(errorEl(page)).toHaveCount(0);
		const text = await reserveText(page);
		expect(text).toContain('REZERVACIJA');
		expect(text).toContain(`${da}.${mo}.`);
		expect(text).toContain('12:00');
	});

	test('switching "now" → "later" clears the auto-filled date/time', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await nameInput(page).fill('Ivan');
		// now mode would submit; switch to later and the auto date/time must clear
		await chooseMode(page, 'later');
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText('Molimo odaberite datum i vrijeme.');
	});
});

// ── Edge cases ───────────────────────────────────────────────────────────────
test.describe('edge cases', () => {
	test('editing an address after a quote invalidates the stale price', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await expect(priceEl(page)).toBeVisible();
		// type into the destination without re-picking a suggestion → route is stale
		await toInput(page).fill('Rovinj umjesto Medulina');
		await expect(priceEl(page)).toHaveCount(0);
		await nameInput(page).fill('Ivan');
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText(
			'Odaberite polazište i odredište iz popisa da izračunamo cijenu.'
		);
	});

	test('round-trip now → later → now restores the auto date/time and submits', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await chooseMode(page, 'later');
		await chooseMode(page, 'now'); // back to now → date/time auto-filled again
		await nameInput(page).fill('Ivan');
		await expect(errorEl(page)).toHaveCount(0);
		expect(await reserveText(page)).toContain('VOŽNJA ODMAH');
	});

	test('whitespace-only name is rejected', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await nameInput(page).fill('   ');
		await reserveLink(page).click();
		await expect(errorEl(page)).toHaveText('Molimo unesite svoje ime.');
	});

	test('long-haul WhatsApp text carries the caveat', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 200);
		await nameInput(page).fill('Ivan');
		const text = await reserveText(page);
		expect(text).toContain('okvirne'); // longHaulCaveat copy
	});

	test('optional note + phone flow into the WhatsApp text', async ({ page }) => {
		await chooseMode(page, 'now');
		await pickRoute(page, 20);
		await nameInput(page).fill('Ivan');
		await page.getByRole('textbox', { name: /Telefon/ }).fill('+385 91 111 2222');
		await page.getByRole('textbox', { name: /Napomena/ }).fill('Dva kofera');
		const text = await reserveText(page);
		expect(text).toContain('+385 91 111 2222');
		expect(text).toContain('Dva kofera');
	});

	test('error copy is localized in EN and DE', async ({ page }) => {
		const cases = [
			{
				lang: 'en',
				msg: 'Select pickup and drop-off from the list so we can calculate the price.'
			},
			{
				lang: 'de',
				msg: 'Bitte wählen Sie Abhol- und Zielort aus der Liste, damit wir den Preis berechnen können.'
			}
		];
		for (const { lang, msg } of cases) {
			await page.goto(`/${lang}/luksuzni-transferi`);
			await page.locator('.tr-mode__btn').first().click(); // "now" in any language
			await page.locator('.tr-calc__send').click(); // no route yet
			await expect(page.locator('.tr-calc__error')).toHaveText(msg);
		}
	});
});

// ── Partner deep-link prefill (/monumenti) ───────────────────────────────────
const HOTEL = 'Monumenti Heritage Hotel, Ul. Vallelunga 89, Pula';

test.describe('partner pickup prefill', () => {
	test('/monumenti redirects (302) to the calculator with the partner slug', async ({
		request
	}) => {
		const res = await request.get('/monumenti', { maxRedirects: 0 });
		expect(res.status()).toBe(302);
		expect(res.headers()['location']).toBe('/hr/luksuzni-transferi?partner=monumenti');
	});

	test('unknown partner slug is ignored (no prefill, no crash)', async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi?partner=does-not-exist');
		await chooseMode(page, 'now');
		await expect(fromInput(page)).toHaveValue('');
	});

	test('?partner= prefills the pickup label', async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi?partner=monumenti');
		await expect(fromInput(page)).toHaveValue(HOTEL);
	});

	test('arriving via a partner link auto-activates the calculator (no grey gate)', async ({
		page
	}) => {
		await page.goto('/hr/luksuzni-transferi?partner=monumenti');
		await expect(fromInput(page)).toHaveValue(HOTEL);
		await expect(page.locator('.tr-calc')).toHaveAttribute('aria-disabled', 'false');
		await expect(page.getByText('Odaberite opciju za izračun')).toHaveCount(0);
		// "now" is pre-selected → time select is hidden
		await expect(page.locator('select')).toHaveCount(0);
	});

	test('partner link scrolls down to the calculator', async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi?partner=monumenti');
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
	});

	test('prefilled pickup has coords, so a destination alone yields a price', async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi?partner=monumenti');
		await expect(fromInput(page)).toHaveValue(HOTEL);
		// no chooseMode — the deep-link already activated "now"; just pick a destination
		await setRouteKm(page, 12);
		await page.evaluate(() => {
			(window as any).__pickPlace(
				document.querySelector('input[placeholder*="Rovinj"]'),
				'Pula Airport'
			);
		});
		await expect(priceEl(page)).toHaveText(`${calcFare(12, 'e')} €`);
		// pickup carries into the WhatsApp text
		await nameInput(page).fill('Guest');
		expect(await reserveText(page)).toContain(HOTEL);
	});

	test('no partner param leaves the pickup field empty', async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi');
		await chooseMode(page, 'now');
		await expect(fromInput(page)).toHaveValue('');
	});
});

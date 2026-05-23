import { test, expect } from '@playwright/test';

test.describe('DateInput component (mounted in TransferCalculator)', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/hr/luksuzni-transferi');
		await page.locator('select').first().selectOption('airport');
		await page.locator('select').nth(1).selectOption({ index: 1 });
		await page.getByRole('button', { name: /Izračunaj cijenu/ }).click();
		await page.locator('#tr-booking').waitFor();
	});

	test('outbound date shows dd.mm.yyyy. placeholder', async ({ page }) => {
		const input = page.locator('.date-input__text').first();
		await expect(input).toHaveAttribute('placeholder', 'dd.mm.gggg.');
	});

	test('typing dd.mm.yyyy. converts to ISO internally', async ({ page }) => {
		const input = page.locator('.date-input__text').first();
		await input.fill('15.06.2026.');
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('2026-06-15');
	});

	test('typing invalid date marks the field invalid', async ({ page }) => {
		const wrap = page.locator('.date-input').first();
		const input = wrap.locator('.date-input__text');
		await input.fill('99.99.9999.');
		await expect(wrap).toHaveClass(/date-input--invalid/);
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('');
	});

	test('rejects date before min', async ({ page }) => {
		const wrap = page.locator('.date-input').first();
		const input = wrap.locator('.date-input__text');
		// min is set to today via the outbound date in TransferCalculator
		await input.fill('01.01.2020.');
		await expect(wrap).toHaveClass(/date-input--invalid/);
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('');
	});

	test('clearing the input clears the bound ISO value', async ({ page }) => {
		const input = page.locator('.date-input__text').first();
		await input.fill('15.06.2026.');
		await input.fill('');
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('');
	});
});

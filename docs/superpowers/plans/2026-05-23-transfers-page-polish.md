# Transfers / Taxi Page Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Five targeted UX/visual fixes on `/[lang]/luksuzni-transferi` without changing visual identity: enforce EU date format, surface return-trip choice earlier, strengthen the primary CTA, add a trust-signal strip above the calculator, verify lead-paragraph link wording.

**Architecture:** All changes live in `src/lib/components/TransferCalculator.svelte`, the page route `src/routes/[lang]/luksuzni-transferi/+page.svelte`, the global `src/app.css`, and the three i18n files in `src/lib/i18n/`. One new component `src/lib/components/DateInput.svelte` (custom date input with `dd.mm.yyyy.` display + native picker fallback) is introduced to escape the browser-native `<input type="date">` locale limitation.

**Tech Stack:** SvelteKit 2 + Svelte 5 (runes mode), TypeScript, plain CSS in `src/app.css`, Playwright for e2e. No new runtime dependencies.

**Branch:** `feat/transfers-page-polish` (single feature branch, single PR per user preference).

**Backend contract:** Unchanged. `TransferCalculator` posts to WhatsApp via `window.open(wa.me/...)`. ISO `YYYY-MM-DD` continues to flow through `date` / `returnDate` state.

**Acceptance gate:** All five Izmjena acceptance criteria in the original brief pass, verified in `hr` / `en` / `de`, on viewport 375 px and 1440 px.

---

## File Map

| File                                                | What changes                                                                                                                                                                                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/components/DateInput.svelte`               | **Create.** Text-input + hidden native-date hybrid that displays `dd.mm.yyyy.` and `bind:value`s ISO `YYYY-MM-DD`.                                                                                                                                                           |
| `src/lib/components/TransferCalculator.svelte`      | **Modify.** Add segmented `tripType` choice (one-way / return) above Calculate button; replace old `returnEnabled` checkbox; swap both `<input type="date">` for `<DateInput>`; add return-after-outbound validation.                                                        |
| `src/routes/[lang]/luksuzni-transferi/+page.svelte` | **Modify.** Insert trust-signal strip between hero and calculator section.                                                                                                                                                                                                   |
| `src/app.css`                                       | **Modify.** (a) Promote `.tr-calc__btn` from outline to solid accent. (b) Add `.tr-trust` strip styles. (c) Add `.date-input` component styles. (d) Add `.tr-calc__trip-toggle` segmented control styles.                                                                    |
| `src/lib/i18n/hr.ts` `en.ts` `de.ts`                | **Modify.** Add `transferCalc.tripOneWay`, `transferCalc.tripReturn`, `transferCalc.returnAfterOutboundError`, `transferCalc.dateFormatHint`, `transferCalc.dateOpenPicker`; add `transfersPage.trust*` (4 labels); soften `leadTwo` wording. Drop `transferCalc.addReturn`. |
| `tests/smoke.spec.ts`                               | **Modify.** Replace the skipped transfers test with a real calculator + DateInput flow test.                                                                                                                                                                                 |
| `tests/date-input.spec.ts`                          | **Create.** Component-behaviour tests (parse, format, picker open, min-validation, return-after-outbound).                                                                                                                                                                   |

---

## Task 0: Branch Setup

**Files:** none

- [ ] **Step 1: Confirm clean working tree on `develop`**

Run: `git status`
Expected: only `.claude/settings.local.json` and `.tmp/` show as before; no other staged or modified files.

- [ ] **Step 2: Create and switch to feature branch**

Run: `git checkout -b feat/transfers-page-polish`
Expected: `Switched to a new branch 'feat/transfers-page-polish'`

- [ ] **Step 3: Start the dev server in the background**

Run: `npm run dev -- --port 5173`
Expected: SvelteKit prints `Local: http://localhost:5173/` within ~5 s.
Leave it running for the rest of the plan; tasks below will open pages in a browser against this server.

- [ ] **Step 4: Sanity-check baseline**

Open `http://localhost:5173/hr/luksuzni-transferi` and confirm:

- Hero with title "Privatni transferi / taxi" renders
- "Kalkulator cijene" section is visible
- Native `<input type="date">` shows OS placeholder when the booking section is open (set Origin = Aerodrom Pula, Destination = Rovinj, Putnici = 1–3, click "Izračunaj cijenu" to reveal it)

---

## Task 1: DateInput Component

**Files:**

- Create: `src/lib/components/DateInput.svelte`
- Create: `tests/date-input.spec.ts`

Acceptance: a reusable component that displays `dd.mm.yyyy.` in the visible field, binds an ISO `YYYY-MM-DD` value, opens the native browser picker on calendar-icon click via `HTMLInputElement.showPicker()`, accepts manual typing, blocks out-of-range dates via `min` prop.

- [ ] **Step 1: Write the failing test**

Create `tests/date-input.spec.ts` with the following content. The component is mounted on a temporary test harness; rather than building a harness, we mount it via the existing transfers page in Task 2 — so for Task 1 we only assert pure parsing logic via in-page evaluation. Replace the file body with:

```ts
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
		// The hidden native input mirrors the ISO value
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('2026-06-15');
	});

	test('typing invalid date marks the field invalid', async ({ page }) => {
		const wrap = page.locator('.date-input').first();
		const input = wrap.locator('.date-input__text');
		await input.fill('99.99.9999.');
		await expect(wrap).toHaveClass(/date-input--invalid/);
	});

	test('clearing the input clears the bound ISO value', async ({ page }) => {
		const input = page.locator('.date-input__text').first();
		await input.fill('15.06.2026.');
		await input.fill('');
		const isoValue = await page.locator('.date-input__native').first().inputValue();
		expect(isoValue).toBe('');
	});
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/date-input.spec.ts --project=chromium`
Expected: FAIL. The selectors `.date-input__text` / `.date-input__native` / `.date-input--invalid` don't exist yet — Playwright will time out waiting for the elements.

- [ ] **Step 3: Create the component**

Write `src/lib/components/DateInput.svelte`:

```svelte
<script lang="ts">
	type Props = {
		value: string;
		min?: string;
		id?: string;
		'aria-label'?: string;
		placeholder?: string;
		invalidMessage?: string;
	};

	let {
		value = $bindable(''),
		min,
		id,
		'aria-label': ariaLabel,
		placeholder = 'dd.mm.gggg.',
		invalidMessage
	}: Props = $props();

	let nativeRef: HTMLInputElement | undefined = $state();
	let typed = $state(formatDisplay(value));
	let invalid = $state(false);

	function formatDisplay(iso: string): string {
		if (!iso) return '';
		const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (!m) return '';
		return `${m[3]}.${m[2]}.${m[1]}.`;
	}

	function parseDisplay(text: string): string | null {
		const cleaned = text.trim();
		const m = cleaned.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\.?$/);
		if (!m) return null;
		const dd = parseInt(m[1], 10);
		const mm = parseInt(m[2], 10);
		const yyyy = parseInt(m[3], 10);
		if (mm < 1 || mm > 12) return null;
		if (dd < 1 || dd > 31) return null;
		const dt = new Date(yyyy, mm - 1, dd);
		if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) {
			return null;
		}
		return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
	}

	// typed → value (ISO)
	$effect(() => {
		const t = typed;
		if (t === '') {
			if (value !== '') value = '';
			invalid = false;
			return;
		}
		const iso = parseDisplay(t);
		if (iso) {
			if (value !== iso) value = iso;
			invalid = false;
		} else {
			invalid = true;
		}
	});

	// External value → typed (only when user is not mid-typing a valid match)
	$effect(() => {
		const v = value;
		const currentParsed = parseDisplay(typed);
		if (currentParsed === v) return;
		const formatted = formatDisplay(v);
		if (formatted !== typed) typed = formatted;
	});

	function openPicker() {
		if (!nativeRef) return;
		if (typeof nativeRef.showPicker === 'function') {
			try {
				nativeRef.showPicker();
				return;
			} catch {
				/* fall through to focus */
			}
		}
		nativeRef.focus();
	}
</script>

<div class="date-input" class:date-input--invalid={invalid}>
	<input
		{id}
		class="date-input__text"
		type="text"
		inputmode="numeric"
		autocomplete="off"
		bind:value={typed}
		{placeholder}
		aria-label={ariaLabel}
		aria-invalid={invalid}
	/>
	<button
		type="button"
		class="date-input__btn"
		onclick={openPicker}
		aria-label={ariaLabel ? `${ariaLabel} — otvori kalendar` : 'Otvori kalendar'}
	>
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			aria-hidden="true"
		>
			<rect x="3" y="5" width="18" height="16" rx="2" />
			<path d="M3 9h18" />
			<path d="M8 3v4" />
			<path d="M16 3v4" />
		</svg>
	</button>
	<input
		bind:this={nativeRef}
		class="date-input__native"
		type="date"
		bind:value
		{min}
		tabindex="-1"
		aria-hidden="true"
	/>
	{#if invalid && invalidMessage}
		<p class="date-input__msg">{invalidMessage}</p>
	{/if}
</div>

<style>
	.date-input {
		position: relative;
		display: flex;
		align-items: stretch;
	}
	.date-input__text {
		flex: 1;
		padding: 12px 44px 12px 14px;
		border: 1px solid var(--line-strong);
		border-radius: 2px;
		background: var(--bg);
		color: var(--fg);
		font-family: var(--font-body);
		font-size: 15px;
		letter-spacing: 0.01em;
	}
	.date-input__text:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
	}
	.date-input--invalid .date-input__text {
		border-color: #b3392a;
	}
	.date-input__btn {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 40px;
		background: transparent;
		border: none;
		color: var(--accent);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.date-input__btn:hover {
		color: color-mix(in srgb, var(--accent) 70%, black);
	}
	.date-input__native {
		position: absolute;
		opacity: 0;
		pointer-events: none;
		width: 1px;
		height: 1px;
		bottom: 0;
		right: 36px;
	}
	.date-input__msg {
		position: absolute;
		left: 0;
		top: 100%;
		margin-top: 4px;
		font-size: 12px;
		color: #b3392a;
	}
</style>
```

- [ ] **Step 4: Wire DateInput into TransferCalculator so the test can find it**

(This task creates the component; Task 2 fully wires it into the calculator. To make the Task 1 tests runnable now, do a minimal swap of the two existing `<input type="date">` blocks. Open `src/lib/components/TransferCalculator.svelte` and add this import to the top of the `<script>` block, right after the existing imports:)

```ts
import DateInput from './DateInput.svelte';
```

Then replace the outbound date input block (currently lines ~462–465):

```svelte
<label class="tr-calc__field">
	<span class="tr-calc__label">{s.date}</span>
	<input class="tr-calc__input" type="date" bind:value={date} min={today} />
</label>
```

with:

```svelte
<label class="tr-calc__field">
	<span class="tr-calc__label">{s.date}</span>
	<DateInput bind:value={date} min={today} aria-label={s.date} />
</label>
```

And replace the return date input block (currently lines ~502–510):

```svelte
<label class="tr-calc__field" style="margin-bottom:0">
	<span class="tr-calc__label">{s.returnDate}</span>
	<input class="tr-calc__input" type="date" bind:value={returnDate} min={date || today} />
</label>
```

with:

```svelte
<label class="tr-calc__field" style="margin-bottom:0">
	<span class="tr-calc__label">{s.returnDate}</span>
	<DateInput bind:value={returnDate} min={date || today} aria-label={s.returnDate} />
</label>
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx playwright test tests/date-input.spec.ts --project=chromium`
Expected: All 4 tests pass. If parsing tests fail, check that the `$effect` ordering doesn't ping-pong (the second effect must compare `parseDisplay(typed)` to `value` and bail when equal).

- [ ] **Step 6: Manual sanity check in browser**

Open `http://localhost:5173/hr/luksuzni-transferi`, open the booking flow, and confirm both date fields:

1. Show `dd.mm.gggg.` placeholder when empty.
2. Open the native calendar when the calendar icon is clicked.
3. After picking a date, the visible field shows `dd.mm.yyyy.` (e.g. `15.06.2026.`).
4. Typing manually (`15.06.2026.`) works and clears the picker red-border.
5. Typing an invalid date (`99.99.9999.`) shows the red border.

- [ ] **Step 7: Commit**

```bash
git add src/lib/components/DateInput.svelte src/lib/components/TransferCalculator.svelte tests/date-input.spec.ts
git commit -m "feat(transfers): add DateInput component with dd.mm.yyyy. display"
```

---

## Task 2: Date Validation — Return After Outbound

**Files:**

- Modify: `src/lib/components/TransferCalculator.svelte`
- Modify: `src/lib/i18n/hr.ts` (and `en.ts`, `de.ts`)
- Modify: `tests/smoke.spec.ts` (un-skip + extend the transfers test)

Acceptance: when a user enters a `returnDate` earlier than `date`, an inline error appears under the return-date field and `sendWhatsApp()` aborts before opening the WhatsApp URL.

- [ ] **Step 1: Add the i18n key for the validation message**

Open `src/lib/i18n/hr.ts`. In the `transferCalc` object, add this key right after the `errorBook` entry (around line 695):

```ts
returnAfterOutboundError: 'Datum povratka mora biti nakon datuma polaska.',
```

Open `src/lib/i18n/en.ts`. In the same `transferCalc` block, add:

```ts
returnAfterOutboundError: 'Return date must be on or after the outbound date.',
```

Open `src/lib/i18n/de.ts`. In the same `transferCalc` block, add:

```ts
returnAfterOutboundError: 'Das Rückfahrtsdatum muss am oder nach dem Hinfahrtsdatum liegen.',
```

- [ ] **Step 2: Extend the strings type**

In `src/lib/components/TransferCalculator.svelte`, add to the `CalcStrings` type (around line 14, after `errorBook`):

```ts
returnAfterOutboundError: string;
```

- [ ] **Step 3: Add validation state and check in `sendWhatsApp`**

In `src/lib/components/TransferCalculator.svelte`, locate the UI flags block (around line 100):

```ts
let errorRoute = $state(false);
let errorBook = $state(false);
let resultShown = $state(false);
```

Add a new flag:

```ts
let errorReturnDate = $state(false);
```

In `sendWhatsApp()` (around line 257), immediately after the existing field check, add:

```ts
errorReturnDate = false;
if (returnEnabled && returnDate && date && returnDate < date) {
	errorReturnDate = true;
	return;
}
```

(`returnDate < date` is a safe string comparison because both are ISO `YYYY-MM-DD`.)

- [ ] **Step 4: Surface the error under the return-date field**

In `src/lib/components/TransferCalculator.svelte`, locate the return-date `<DateInput>` block placed in Task 1 (now around line 502). Wrap the field's `<label>` in a container that can hold the error message, or simply add a sibling `<p>` right after the closing `</div>` of `.tr-calc__two-col` inside `.tr-calc__return-fields`:

Find the existing return-fields block:

```svelte
<div class="tr-calc__return-fields">
	<div class="tr-calc__two-col">...</div>
	{#if returnFare !== null}
		<p class="tr-calc__return-note">...</p>
	{/if}
</div>
```

Insert this between the `</div>` of `.tr-calc__two-col` and the `{#if returnFare !== null}` block:

```svelte
{#if errorReturnDate}
	<p class="tr-calc__return-error">{s.returnAfterOutboundError}</p>
{/if}
```

- [ ] **Step 5: Reset the error when the user fixes the date**

In `src/lib/components/TransferCalculator.svelte`, add a small `$effect` near the other derived/effect blocks (after `let totalFare = $derived.by(...)`, around line 234):

```ts
$effect(() => {
	if (errorReturnDate && returnDate && date && returnDate >= date) {
		errorReturnDate = false;
	}
});
```

- [ ] **Step 6: Add CSS for the error**

Open `src/app.css`. Find `.tr-calc__return-note` (around line 1974). Add this rule directly below it:

```css
.tr-calc__return-error {
	font-size: 13px;
	color: #b3392a;
	margin-top: 12px;
	text-align: center;
}
```

- [ ] **Step 7: Replace the skipped Playwright test**

Open `tests/smoke.spec.ts`. Replace the existing `test.skip('transfers inquiry form submits and redirects to /hvala', ...)` block at the bottom of the file with:

```ts
test('transfers calculator computes Aerodrom → Rovinj E-klasa return total', async ({ page }) => {
	await page.goto('/hr/luksuzni-transferi');
	await page.locator('select').first().selectOption('airport');
	await page.locator('select').nth(1).selectOption('rovinj');
	await page.getByRole('button', { name: /Izračunaj cijenu/ }).click();
	await page.locator('#tr-booking').waitFor();

	// Switch to return trip via the new segmented control
	await page.getByRole('radio', { name: /Povratno/ }).check();

	// Fill required booking fields
	await page.locator('input[type="tel"]').fill('+385 95 722 6918');
	await page.locator('.date-input__text').first().fill('15.06.2026.');
	await page.locator('select[name=""], select').last().selectOption('10:00');
	await page.locator('.date-input__text').nth(1).fill('20.06.2026.');

	// Summary total should be 75 + 68 = 143 €
	await expect(page.locator('.tr-calc__summary-total')).toContainText('143');
});

test('transfers calculator blocks return date before outbound', async ({ page }) => {
	await page.goto('/hr/luksuzni-transferi');
	await page.locator('select').first().selectOption('airport');
	await page.locator('select').nth(1).selectOption('rovinj');
	await page.getByRole('button', { name: /Izračunaj cijenu/ }).click();
	await page.locator('#tr-booking').waitFor();

	await page.getByRole('radio', { name: /Povratno/ }).check();
	await page.locator('input[type="text"]').first().fill('Test'); // name
	await page.locator('input[type="tel"]').fill('+385 95 000 0000');
	await page.locator('.date-input__text').first().fill('20.06.2026.');
	await page.locator('.date-input__text').nth(1).fill('15.06.2026.');

	const sendBtn = page.getByRole('button', { name: /Pošalji rezervaciju/ });
	await sendBtn.click();
	await expect(page.locator('.tr-calc__return-error')).toBeVisible();
});
```

Note: these tests depend on Task 3 (the segmented control). They will fail at Task 2 completion. That is intentional — they pass after Task 3.

- [ ] **Step 8: Run the test (it should fail at the radio step — expected for now)**

Run: `npx playwright test tests/smoke.spec.ts -g "blocks return date" --project=chromium`
Expected: FAIL on `getByRole('radio', { name: /Povratno/ })`. The validation code is now in place; the UI control comes in Task 3.

- [ ] **Step 9: Commit**

```bash
git add src/lib/components/TransferCalculator.svelte src/lib/i18n/hr.ts src/lib/i18n/en.ts src/lib/i18n/de.ts src/app.css tests/smoke.spec.ts
git commit -m "feat(transfers): block return date earlier than outbound"
```

---

## Task 3: Return-Trip Segmented Choice in Step One

**Files:**

- Modify: `src/lib/components/TransferCalculator.svelte`
- Modify: `src/lib/i18n/hr.ts` (and `en.ts`, `de.ts`)
- Modify: `src/app.css`

Acceptance: above the "Izračunaj cijenu" button there is a two-option segmented control (radio-style) "Jednosmjerno" / "Povratno · −10%". Default is "Jednosmjerno". The old `addReturn` checkbox is removed from the booking section. Picking "Povratno" reveals the return-date and return-time fields directly. Summary price updates in real time when the choice changes.

- [ ] **Step 1: Add i18n strings**

Open `src/lib/i18n/hr.ts`, `transferCalc` block. Add (after `returnDiscount`, around line 673):

```ts
tripOneWay: 'Jednosmjerno',
tripReturn: 'Povratno',
tripReturnSuffix: '−10%',
```

Open `src/lib/i18n/en.ts`:

```ts
tripOneWay: 'One-way',
tripReturn: 'Round trip',
tripReturnSuffix: '−10%',
```

Open `src/lib/i18n/de.ts`:

```ts
tripOneWay: 'Einfache Fahrt',
tripReturn: 'Hin- und Rückfahrt',
tripReturnSuffix: '−10%',
```

- [ ] **Step 2: Remove now-obsolete `addReturn` key**

The old "Dodaj povratak" checkbox text is no longer used. Delete `addReturn` from all three i18n files (currently `transferCalc.addReturn`). The `CalcStrings` type in `TransferCalculator.svelte` will be updated in Step 3.

- [ ] **Step 3: Update the strings type**

In `src/lib/components/TransferCalculator.svelte`, in `type CalcStrings`:

- Remove `addReturn: string;`
- Add:

  ```ts
  tripOneWay: string;
  tripReturn: string;
  tripReturnSuffix: string;
  ```

- [ ] **Step 4: Default `returnEnabled` to false but expose it as the trip-type toggle**

In `src/lib/components/TransferCalculator.svelte`, the existing state `let returnEnabled = $state(false);` (around line 96) stays. We just rename usage in the template — the boolean is now driven by the new segmented control.

Inside `resetResult()` (around line 130) the line `returnEnabled = false;` already resets it on input change; keep that — switching origin always reverts to one-way (sensible default for new route).

- [ ] **Step 5: Insert the segmented control above the Calculate button**

Open `src/lib/components/TransferCalculator.svelte`. Find this block (around line 378–383):

```svelte
	</div>

	<button class="tr-calc__btn" type="button" onclick={calculate}>{s.calculate}</button>
	{#if errorRoute}
		<p class="tr-calc__error">{s.errorRoute}</p>
	{/if}
```

Insert the segmented control between `</div>` (end of `.tr-calc__field` for Passengers) and the `<button>`:

```svelte
	</div>

	<!-- Trip type -->
	<div class="tr-calc__trip">
		<div class="tr-calc__trip-toggle" role="radiogroup" aria-label={s.tripOneWay + ' / ' + s.tripReturn}>
			<label class="tr-calc__trip-opt" class:tr-calc__trip-opt--active={!returnEnabled}>
				<input
					type="radio"
					name="tr-trip"
					value="one"
					checked={!returnEnabled}
					onchange={() => (returnEnabled = false)}
				/>
				<span>{s.tripOneWay}</span>
			</label>
			<label class="tr-calc__trip-opt" class:tr-calc__trip-opt--active={returnEnabled}>
				<input
					type="radio"
					name="tr-trip"
					value="return"
					checked={returnEnabled}
					onchange={() => (returnEnabled = true)}
				/>
				<span>{s.tripReturn}</span>
				<span class="tr-calc__trip-badge">{s.tripReturnSuffix}</span>
			</label>
		</div>
	</div>

	<button class="tr-calc__btn" type="button" onclick={calculate}>{s.calculate}</button>
```

- [ ] **Step 6: Remove the old `addReturn` checkbox; keep the return-date fields**

In `src/lib/components/TransferCalculator.svelte`, locate the existing `<div class="tr-calc__return">` block (around line 492). It currently looks like:

```svelte
<div class="tr-calc__return">
	<label class="tr-calc__return-check">
		<input type="checkbox" bind:checked={returnEnabled} />
		<span class="tr-calc__return-label">{s.addReturn}</span>
		<span class="tr-calc__discount-badge">{s.returnDiscount}</span>
	</label>

	{#if returnEnabled}
		<div class="tr-calc__return-fields">...return date + time...</div>
	{/if}
</div>
```

Replace the entire block with (we keep the wrapper for spacing/border, drop the checkbox, surface only the fields when active):

```svelte
{#if returnEnabled}
	<div class="tr-calc__return">
		<div class="tr-calc__return-header">
			<span class="tr-calc__return-label">{s.returnRow}</span>
			<span class="tr-calc__discount-badge">{s.returnDiscount}</span>
		</div>
		<div class="tr-calc__return-fields tr-calc__return-fields--bare">
			<div class="tr-calc__two-col">
				<label class="tr-calc__field" style="margin-bottom:0">
					<span class="tr-calc__label">{s.returnDate}</span>
					<DateInput bind:value={returnDate} min={date || today} aria-label={s.returnDate} />
				</label>
				<label class="tr-calc__field" style="margin-bottom:0">
					<span class="tr-calc__label">{s.returnTime}</span>
					<select class="tr-calc__input" bind:value={returnTime}>
						<option value="">{s.timePlaceholder}</option>
						{#each timeOptions as t (t)}
							<option value={t}>{t}</option>
						{/each}
					</select>
				</label>
			</div>
			{#if errorReturnDate}
				<p class="tr-calc__return-error">{s.returnAfterOutboundError}</p>
			{/if}
			{#if returnFare !== null}
				<p class="tr-calc__return-note">
					{s.returnNoteLabel}: <strong>{returnFare} €</strong> (−10%{isNight
						? ` · ${s.nightTag}`
						: ''})
				</p>
			{/if}
		</div>
	</div>
{/if}
```

- [ ] **Step 7: Add segmented-control CSS**

Open `src/app.css`. Find the `.tr-calc__return-note` rule (now around line 1974 with the addition from Task 2). Add the following rules right after that section, before `/* Terms list */`:

```css
/* Trip-type segmented control (step one) */
.tr-calc__trip {
	margin-bottom: 18px;
}
.tr-calc__trip-toggle {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
	border: 1px solid var(--line-strong);
	border-radius: 2px;
	padding: 4px;
	background: var(--bg);
}
.tr-calc__trip-opt {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 12px 10px;
	cursor: pointer;
	font-size: 13.5px;
	letter-spacing: 0.05em;
	color: var(--fg);
	border-radius: 2px;
	transition:
		background 0.18s ease,
		color 0.18s ease;
}
.tr-calc__trip-opt input[type='radio'] {
	position: absolute;
	opacity: 0;
	pointer-events: none;
}
.tr-calc__trip-opt--active {
	background: var(--accent);
	color: #fff;
}
.tr-calc__trip-opt--active .tr-calc__trip-badge {
	background: rgba(255, 255, 255, 0.18);
	color: #fff;
	border-color: rgba(255, 255, 255, 0.35);
}
.tr-calc__trip-badge {
	font-family: var(--font-mono);
	font-size: 10.5px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	padding: 2px 8px;
	border: 1px solid var(--accent);
	color: var(--accent);
	border-radius: 999px;
	background: color-mix(in srgb, var(--accent) 8%, var(--bg));
	transition:
		background 0.18s ease,
		color 0.18s ease,
		border-color 0.18s ease;
}
.tr-calc__return-header {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 14px;
}
.tr-calc__return-fields--bare {
	margin-top: 0;
	padding-top: 0;
	border-top: none;
}
```

- [ ] **Step 8: Run the calculator + return tests**

Run: `npx playwright test tests/smoke.spec.ts -g "transfers calculator" --project=chromium`
Expected: Both tests from Task 2 now pass. If `143` doesn't appear, double-check the price table in `src/lib/data/transferPricing.ts` for `airport → rovinj` E-class (must be 75 €).

- [ ] **Step 9: Verify in browser**

Open `http://localhost:5173/hr/luksuzni-transferi`. Confirm:

- "Jednosmjerno" / "Povratno · −10%" appears above the Calculate button.
- Picking "Povratno" before clicking Calculate, then computing, reveals the return-date + return-time fields directly in the booking flow without a separate checkbox.
- The old "Dodaj povratak" checkbox is gone from the DOM (Cmd-F in DevTools for `Dodaj povratak` should hit 0 results in the rendered page).
- Toggling back to "Jednosmjerno" hides the return fields again and the summary total drops to one-way price in real time.

- [ ] **Step 10: Commit**

```bash
git add src/lib/components/TransferCalculator.svelte src/app.css src/lib/i18n/hr.ts src/lib/i18n/en.ts src/lib/i18n/de.ts
git commit -m "feat(transfers): promote return-trip choice to step one"
```

---

## Task 4: Solid Primary CTA Button

**Files:**

- Modify: `src/app.css`

Acceptance: "Izračunaj cijenu" renders with solid accent background + white text; passes WCAG AA contrast (4.5:1) against the new background; "Pošalji rezervaciju" already passes (solid green) — verify, no change required there.

- [ ] **Step 1: Update `.tr-calc__btn` styling**

Open `src/app.css`. Replace the existing rule block (around lines 1807–1827):

```css
.tr-calc__btn {
	width: 100%;
	padding: 15px;
	background: transparent;
	color: var(--accent);
	border: 1px solid var(--accent);
	border-radius: 2px;
	font-family: var(--font-body);
	font-size: 12.5px;
	font-weight: 500;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	cursor: pointer;
	transition: all 0.18s ease;
	margin-top: 4px;
}
.tr-calc__btn:hover {
	background: var(--accent);
	color: #fff;
}
```

with:

```css
.tr-calc__btn {
	width: 100%;
	padding: 16px;
	background: var(--accent);
	color: #fff;
	border: 1px solid var(--accent);
	border-radius: 2px;
	font-family: var(--font-body);
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	cursor: pointer;
	transition:
		background 0.18s ease,
		box-shadow 0.18s ease,
		transform 0.05s ease;
	margin-top: 4px;
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}
.tr-calc__btn:hover {
	background: color-mix(in srgb, var(--accent) 80%, black);
	box-shadow: 0 4px 14px color-mix(in srgb, var(--accent) 30%, transparent);
}
.tr-calc__btn:active {
	transform: translateY(1px);
}
.tr-calc__btn:focus-visible {
	outline: 3px solid color-mix(in srgb, var(--accent) 40%, transparent);
	outline-offset: 2px;
}
```

(Background `#a84c28` on white `#fff` text gives contrast ratio ~5.7:1 — passes WCAG AA. The existing CSS comment in `app.css` lines 21–23 confirms `#a84c28` already passes the 4.5:1 threshold for text use on `--bg`.)

- [ ] **Step 2: Verify contrast with Lighthouse**

In an incognito browser tab, open `http://localhost:5173/hr/luksuzni-transferi`. Open DevTools → Lighthouse → Accessibility → Run. Confirm Accessibility score is ≥ 95 and there are no "contrast" findings on `.tr-calc__btn`.

- [ ] **Step 3: Verify in browser at both viewports**

In DevTools device toolbar, set 375 × 667 (iPhone SE) and 1440 × 900. Confirm at both sizes the button is solid burnt-orange with white uppercase text, visible from afar against the page background.

- [ ] **Step 4: Commit**

```bash
git add src/app.css
git commit -m "feat(transfers): solid accent CTA for Izračunaj cijenu"
```

---

## Task 5: Trust-Signal Strip Above Calculator

**Files:**

- Modify: `src/routes/[lang]/luksuzni-transferi/+page.svelte`
- Modify: `src/lib/i18n/hr.ts` (and `en.ts`, `de.ts`)
- Modify: `src/app.css`

Acceptance: a horizontal strip with 4 trust signals (airport sign · free child seat · free waiting · 30 min WhatsApp confirmation) sits between the hero `</section>` and the calculator `<section>`. Desktop: one row. Mobile (≤ 600 px): 2 × 2 grid. Visible on first scroll, not repeated inside the existing "Uvjeti i informacije" block.

- [ ] **Step 1: Add i18n keys**

Open `src/lib/i18n/hr.ts`, `transfersPage` block. Add after `taximeterPerMin` (around line 628), inside the same object:

```ts
trustSignAirport: 'Doček s natpisom imena',
trustChildSeat: 'Besplatno dječje sjedalo',
trustWaiting: 'Besplatno čekanje na aerodromu',
trustWhatsApp: 'Potvrda na WhatsApp u 30 min',
```

Open `src/lib/i18n/en.ts`:

```ts
trustSignAirport: 'Name-sign meet-and-greet',
trustChildSeat: 'Free child seat',
trustWaiting: 'Free airport waiting',
trustWhatsApp: 'WhatsApp confirmation in 30 min',
```

Open `src/lib/i18n/de.ts`:

```ts
trustSignAirport: 'Empfang mit Namensschild',
trustChildSeat: 'Kindersitz kostenlos',
trustWaiting: 'Kostenlose Wartezeit am Flughafen',
trustWhatsApp: 'WhatsApp-Bestätigung in 30 Min.',
```

- [ ] **Step 2: Render the strip in the page**

Open `src/routes/[lang]/luksuzni-transferi/+page.svelte`. Find the closing `</section>` of the hero (right after the `hero__cta` block, around line 78) and the opening of the calculator section (around line 81). Insert this new `<section>` between them:

```svelte
<!-- Trust signals -->
<section class="section section--tight tr-trust-section">
	<div class="wrap">
		<ul class="tr-trust" aria-label="Trust signals">
			<li class="tr-trust__item">
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					aria-hidden="true"
					><path d="M2 12h20" /><path d="M22 12l-4-4M22 12l-4 4" /><path d="M5 8v8" /></svg
				>
				<span>{t.transfersPage.trustSignAirport}</span>
			</li>
			<li class="tr-trust__item">
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					aria-hidden="true"
					><circle cx="12" cy="6" r="3" /><path d="M6 20v-3a4 4 0 014-4h4a4 4 0 014 4v3" /></svg
				>
				<span>{t.transfersPage.trustChildSeat}</span>
			</li>
			<li class="tr-trust__item">
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg
				>
				<span>{t.transfersPage.trustWaiting}</span>
			</li>
			<li class="tr-trust__item">
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					aria-hidden="true"
					><path
						d="M21 11.5a8.38 8.38 0 01-8.5 8.5 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1121 11.5z"
					/></svg
				>
				<span>{t.transfersPage.trustWhatsApp}</span>
			</li>
		</ul>
	</div>
</section>
```

- [ ] **Step 3: Add strip CSS**

Open `src/app.css`. Add at the very end of the file (after `.tr-calc__form-note` rule, around line 2095):

```css
/* Transfers trust-signal strip */
.tr-trust-section {
	padding-top: 0;
	padding-bottom: clamp(20px, 3vw, 32px);
}
.tr-trust {
	list-style: none;
	margin: 0;
	padding: 16px 20px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16px;
	background: color-mix(in srgb, var(--accent) 4%, var(--bg));
	border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
	border-radius: 2px;
}
.tr-trust__item {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 13px;
	line-height: 1.35;
	color: var(--fg);
}
.tr-trust__item svg {
	color: var(--accent);
	flex-shrink: 0;
}
@media (max-width: 720px) {
	.tr-trust {
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}
}
```

- [ ] **Step 4: Verify in browser at both viewports**

In DevTools:

- 1440 × 900: 4 items in one row, all visible above the calculator at first page load (no scroll past hero needed).
- 375 × 667: 2 × 2 grid below the hero, before the calculator.

Switch through `/hr/luksuzni-transferi`, `/en/luksuzni-transferi`, `/de/luksuzni-transferi` — each language shows its localised labels.

- [ ] **Step 5: Commit**

```bash
git add src/routes/[lang]/luksuzni-transferi/+page.svelte src/app.css src/lib/i18n/hr.ts src/lib/i18n/en.ts src/lib/i18n/de.ts
git commit -m "feat(transfers): add trust-signal strip above calculator"
```

---

## Task 6: Lead-Paragraph Wording Polish

**Files:**

- Modify: `src/lib/i18n/hr.ts` (and `en.ts`, `de.ts`)

Acceptance: the second and fourth paragraphs of `transfersPage.leadTwo` read naturally with inline anchor links, no orphan punctuation. (The HTML structure on `develop` already has the inline anchors — production was likely cached at an older revision. Confirm + lightly improve the HR wording where the sentence still reads stiff.)

- [ ] **Step 1: Read the current strings to confirm baseline**

Open `src/lib/i18n/hr.ts`, find `transfersPage.leadTwo` (line 612–613). Confirm it already contains:

```
... učinite to u našem <a href="#kalkulator">kalkulatoru</a>.</p>
...
... Pogledajte naš <a href="#kalkulator">kalkulator</a> ili <a href="#taksimetar">cjenik taksimetra</a>.</p>
```

If the strings already render correctly in the browser at `http://localhost:5173/hr/luksuzni-transferi` (no orphan period, links inline), only the optional polish in Step 2 is needed.

- [ ] **Step 2: Tighten the HR wording**

In `src/lib/i18n/hr.ts`, replace the entire `leadTwo:` string value with:

```ts
leadTwo:
    '<p>Sprinter je obiteljska tvrtka iz Pule. Organiziramo privatne transfere i taxi vožnje u Puli, po Istri i Europi — pouzdano, točno na vrijeme, bez iznenađenja.</p><p>Za rezervaciju vožnje iz ili u zračnu luku Pula koristite naš <a href="#kalkulator">kalkulator cijene</a>.</p><p>Za taxi vožnju po Puli ili dalje, jednostavno nam pošaljite poruku.</p><p>Cijene su transparentne — pogledajte <a href="#kalkulator">kalkulator</a> za transfere ili <a href="#taksimetar">cjenik taksimetra</a> za lokalne vožnje.</p>',
```

- [ ] **Step 3: Tighten the EN wording**

In `src/lib/i18n/en.ts`:

```ts
leadTwo:
    '<p>Sprinter is a family business from Pula. We arrange private transfers and taxi rides in Pula, across Istria and Europe — reliable, on time, no surprises.</p><p>To book a ride to or from Pula Airport, use our <a href="#kalkulator">price calculator</a>.</p><p>For a taxi ride around Pula or further afield, just send us a message.</p><p>Prices are transparent — see the <a href="#kalkulator">calculator</a> for transfers or the <a href="#taksimetar">taximeter rates</a> for local rides.</p>',
```

- [ ] **Step 4: Tighten the DE wording**

In `src/lib/i18n/de.ts`:

```ts
leadTwo:
    '<p>Sprinter ist ein Familienunternehmen aus Pula. Wir organisieren private Transfers und Taxifahrten in Pula, in ganz Istrien und Europa — zuverlässig, pünktlich, ohne Überraschungen.</p><p>Zur Buchung einer Fahrt vom oder zum Flughafen Pula nutzen Sie unseren <a href="#kalkulator">Preisrechner</a>.</p><p>Für eine Taxifahrt in Pula oder weiter weg schreiben Sie uns einfach eine Nachricht.</p><p>Unsere Preise sind transparent — sehen Sie den <a href="#kalkulator">Rechner</a> für Transfers oder die <a href="#taksimetar">Taxameter-Preise</a> für lokale Fahrten.</p>',
```

- [ ] **Step 5: Verify in browser in all three locales**

Open all three pages in succession; confirm each paragraph reads naturally, no `" ."` orphan spaces, all anchor-link clicks scroll to `#kalkulator` and `#taksimetar` as expected.

- [ ] **Step 6: Commit**

```bash
git add src/lib/i18n/hr.ts src/lib/i18n/en.ts src/lib/i18n/de.ts
git commit -m "copy(transfers): tighten lead paragraph and inline anchor links"
```

---

## Task 7: Verification & PR

**Files:** none (validation only)

- [ ] **Step 1: Run the full Playwright suite**

Run: `npx playwright test --project=chromium`
Expected: All tests pass, including the new `tests/date-input.spec.ts` and the calculator-flow tests in `tests/smoke.spec.ts`.

- [ ] **Step 2: Run svelte-check**

Run: `npm run check`
Expected: 0 errors. If errors exist about missing `addReturn` references (e.g. on lint of other pages) or about type-narrowing in the calculator, fix them inline and re-run.

- [ ] **Step 3: Verify booking-form happy path manually**

Open `http://localhost:5173/hr/luksuzni-transferi`:

1. Origin → Aerodrom Pula, Destination → Rovinj, Putnici → 1–3.
2. Click "Povratno · −10%" segmented control above the Calculate button.
3. Click "Izračunaj cijenu".
4. Fill name "Test", phone "+385 95 000 0000", date `15.06.2026.` (using DateInput), time `10:00`, return date `20.06.2026.`, return time `15:00`.
5. Summary should show: Polazak 75 €, Povratak 68 €, Ukupno **143 €**.
6. Set return date back to `10.06.2026.` (earlier than outbound). Click "Pošalji rezervaciju". Confirm inline red error "Datum povratka mora biti nakon datuma polaska." appears and WhatsApp does NOT open.
7. Fix return date to `20.06.2026.`. Click again — WhatsApp URL `https://wa.me/...` opens in a new tab.

- [ ] **Step 4: Lighthouse audit on production build**

Run: `npm run build && npm run preview -- --port 4173`
Then open `http://localhost:4173/hr/luksuzni-transferi` in incognito, DevTools → Lighthouse (mobile preset). Confirm:

- Performance ≥ baseline − 2 points (record baseline first by running Lighthouse on `develop` before merging if unsure).
- Accessibility ≥ 95 (must not regress).
- No new console warnings or errors.

- [ ] **Step 5: Confirm in EN + DE**

Repeat Step 3 happy path against `/en/luksuzni-transferi` and `/de/luksuzni-transferi`. Confirm all labels are translated, no Croatian text leaks into the EN or DE flow, validation error appears in the correct language.

- [ ] **Step 6: Push and open PR**

```bash
git push -u origin feat/transfers-page-polish
```

Then create the PR via `gh`:

```bash
gh pr create --base develop --title "feat(transfers): page polish — date format, return-trip CTA, trust strip" --body "$(cat <<'EOF'
## Summary
- Replace browser-native `<input type="date">` with `DateInput` so `dd.mm.yyyy.` displays in all locales (Chrome/Firefox/Safari ignore HTML `lang`).
- Move "Povratno · −10%" choice into step one of the calculator and remove the old hidden checkbox.
- Promote "Izračunaj cijenu" to a solid accent CTA (was outline only).
- Add a trust-signal strip (4 items) directly above the calculator so the value props are visible before the form.
- Tighten lead-paragraph wording in HR / EN / DE so anchor links read inline.
- Block return-date earlier than outbound with inline error.

## Test plan
- [ ] `npx playwright test --project=chromium` — all green
- [ ] `npm run check` — 0 errors
- [ ] `/hr/luksuzni-transferi` happy-path booking (Aerodrom → Rovinj, povratak): summary = 143 €
- [ ] Same flow on `/en` and `/de`
- [ ] Date validation: return < outbound → inline error, WhatsApp does NOT open
- [ ] Lighthouse mobile: Performance within 2 points of baseline, Accessibility ≥ 95
EOF
)"
```

- [ ] **Step 7: Stop the dev server**

Identify the background `npm run dev` process and stop it.

---

## Out of Scope (Brief's "Bonus" Section)

Deliberately skipped from this plan, to be re-evaluated after the five-izmjena ship:

- "Uštedjeli ste X €" line on summary (small psychological win, low cost — easy follow-up).
- "★ 4,9 · stotine prevezenih gostiju · Pula od 2024." trust line above calculator — the brief itself flags "samo ako odgovara stvarnim brojkama", and we don't have a verified review count to drop in. Defer until verified numbers exist.

If after merging the user wants either, treat as a separate small task — not worth bundling here.

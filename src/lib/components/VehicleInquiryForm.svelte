<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Vehicle } from '$lib/data/vehicles';
	import { computeQuote } from '$lib/data/vehicles';
	import type { Translations } from '$lib/i18n';
	import Turnstile from '$lib/components/Turnstile.svelte';

	interface FormResult {
		errors?: Record<string, string>;
		serverError?: string;
		values?: {
			name?: string;
			email?: string;
			phone?: string;
			dateFrom?: string;
			dateTo?: string;
			notes?: string;
		};
	}

	interface Props {
		vehicle: Vehicle;
		t: Translations;
		form?: FormResult | null;
	}

	let { vehicle, t, form = null }: Props = $props();

	// Sensible defaults: tomorrow → day after tomorrow
	function isoDate(offsetDays: number): string {
		const d = new Date();
		d.setDate(d.getDate() + offsetDays);
		return d.toISOString().split('T')[0];
	}

	const todayIso = isoDate(0);

	// svelte-ignore state_referenced_locally
	let dateFrom = $state(form?.values?.dateFrom ?? isoDate(1));
	// svelte-ignore state_referenced_locally
	let dateTo = $state(form?.values?.dateTo ?? isoDate(3));
	let submitting = $state(false);

	let days = $derived.by(() => {
		if (!dateFrom || !dateTo) return 0;
		const a = new Date(dateFrom);
		const b = new Date(dateTo);
		const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
		return diff;
	});

	let dateError = $derived(days <= 0);
	let exceedsMax = $derived(days > vehicle.maxDaysBeforeContact);
	let quote = $derived.by(() => {
		if (dateError || exceedsMax) return null;
		return computeQuote(vehicle.pricing, days);
	});
	let quoteText = $derived.by(() => {
		if (dateError) return '';
		if (exceedsMax) return t.rental.inquiryOnRequest;
		if (quote === null) return t.rental.inquiryOnRequest;
		return `${quote} €`;
	});
</script>

<form
	method="POST"
	class="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<h3 class="text-lg font-bold text-slate-900">{t.rental.inquiryTitle}</h3>

	<!-- Honeypot -->
	<div class="hidden" aria-hidden="true">
		<label for="veh-website">Website</label>
		<input type="text" id="veh-website" name="website" tabindex="-1" autocomplete="off" />
	</div>

	{#if form?.serverError}
		<div class="p-3 rounded bg-red-50 border border-red-200 text-sm text-red-800">
			{form.serverError}
		</div>
	{/if}

	<!-- Dates -->
	<div class="grid grid-cols-2 gap-3">
		<div>
			<label for="dateFrom" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
				{t.rental.inquiryFrom}
			</label>
			<input
				type="date"
				id="dateFrom"
				name="dateFrom"
				bind:value={dateFrom}
				min={todayIso}
				required
				class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
			/>
		</div>
		<div>
			<label for="dateTo" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
				{t.rental.inquiryTo}
			</label>
			<input
				type="date"
				id="dateTo"
				name="dateTo"
				bind:value={dateTo}
				min={dateFrom || todayIso}
				required
				class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
			/>
		</div>
	</div>

	<!-- Quote -->
	{#if dateError}
		<p class="text-sm text-red-600">{t.rental.inquiryDateError}</p>
	{:else}
		<div class="flex items-baseline justify-between bg-white border border-slate-200 rounded px-4 py-3">
			<span class="text-sm text-slate-500">
				{t.rental.inquiryDays}: <span class="font-semibold text-slate-800">{days}</span>
			</span>
			<span class="text-xs text-slate-500">
				{t.rental.inquiryEstimate}
			</span>
			<span class="text-xl font-bold text-brand-red">{quoteText}</span>
		</div>
		{#if exceedsMax}
			<p class="text-xs text-slate-500">
				{t.rental.inquiryContactForLonger.replace('{days}', String(vehicle.maxDaysBeforeContact))}
			</p>
		{/if}
	{/if}

	<input type="hidden" name="estimate" value={quoteText} />

	<!-- Contact fields -->
	<div>
		<label for="inq-name" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
			{t.rental.inquiryName} *
		</label>
		<input
			type="text"
			id="inq-name"
			name="name"
			required
			value={form?.values?.name ?? ''}
			class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
		/>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
		<div>
			<label for="inq-email" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
				{t.rental.inquiryEmail} *
			</label>
			<input
				type="email"
				id="inq-email"
				name="email"
				required
				value={form?.values?.email ?? ''}
				class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
			/>
		</div>
		<div>
			<label for="inq-phone" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
				{t.rental.inquiryPhoneLabel}
			</label>
			<input
				type="tel"
				id="inq-phone"
				name="phone"
				value={form?.values?.phone ?? ''}
				class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
			/>
		</div>
	</div>
	<div>
		<label for="inq-notes" class="block text-xs uppercase tracking-wide text-slate-500 mb-1">
			{t.rental.inquiryNotes}
		</label>
		<textarea
			id="inq-notes"
			name="notes"
			rows="3"
			class="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-vertical"
		>{form?.values?.notes ?? ''}</textarea>
	</div>

	<Turnstile />

	<button
		type="submit"
		disabled={submitting || dateError}
		class="w-full bg-brand-red text-white px-4 py-2.5 rounded font-medium hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
	>
		{submitting ? t.form.submitting : t.rental.inquirySubmit}
	</button>
</form>

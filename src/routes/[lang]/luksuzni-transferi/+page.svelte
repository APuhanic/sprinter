<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { transferService } from '$lib/jsonld';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	let submitting = $state(false);

	const serviceJsonLd = JSON.stringify(transferService());
</script>

<svelte:head>
	<title>{t.transfers.title} — Sprinter d.o.o.</title>
	{@html `<script type="application/ld+json">${serviceJsonLd}</` + `script>`}
</svelte:head>

<!-- Header -->
<section class="bg-white border-b border-slate-200">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<h1 class="text-3xl font-bold text-slate-900">{t.transfers.title}</h1>
	</div>
</section>

<!-- Vision -->
<section class="bg-white py-12">
	<div class="mx-auto max-w-4xl px-4">
		<p class="text-lg text-slate-600 leading-relaxed mb-4">{t.transfers.visionIntro}</p>
		<p class="text-slate-600 leading-relaxed mb-4">{t.transfers.visionService}</p>
		<p class="text-slate-700 font-medium">{t.transfers.visionVehicles}</p>
	</div>
</section>

<!-- Vehicles -->
<section class="bg-slate-50 py-12">
	<div class="mx-auto max-w-5xl px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- E-Class -->
			<div class="bg-white rounded-lg overflow-hidden shadow-sm">
				<div class="h-56 overflow-hidden">
					<img src="/images/transfers/e-class.jpg" alt={t.transfers.eClassName} class="w-full h-full object-cover" />
				</div>
				<div class="p-6">
					<h2 class="text-xl font-bold text-slate-900 mb-2">{t.transfers.eClassName}</h2>
					<p class="text-slate-600">{t.transfers.eClassDesc}</p>
				</div>
			</div>

			<!-- V-Class -->
			<div class="bg-white rounded-lg overflow-hidden shadow-sm">
				<div class="h-56 overflow-hidden">
					<img src="/images/transfers/v-class.jpg" alt={t.transfers.vClassName} class="w-full h-full object-cover" />
				</div>
				<div class="p-6">
					<h2 class="text-xl font-bold text-slate-900 mb-2">{t.transfers.vClassName}</h2>
					<p class="text-slate-600">{t.transfers.vClassDesc}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing -->
<section class="bg-white py-12">
	<div class="mx-auto max-w-4xl px-4">
		<h2 class="text-2xl font-bold text-slate-900 mb-4">{t.transfers.pricingTitle}</h2>
		<p class="text-slate-600 mb-4">{t.transfers.pricingIntro}</p>
		<p class="text-slate-600 mb-4">{t.transfers.pricingNote}</p>
		<p class="text-slate-600 mb-4">{t.transfers.pricingContact}</p>
		<p class="text-brand-red font-bold">{t.transfers.vipNote}</p>
	</div>
</section>

<!-- Inquiry form -->
<section class="bg-slate-800 py-12">
	<div class="mx-auto max-w-3xl px-4">
		<h2 class="text-2xl font-bold text-white text-center mb-8">{t.transfers.inquiryTitle}</h2>

		<form method="POST" class="space-y-4">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="firstName" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryFirstName} <span class="text-red-400">*</span></label>
					<input type="text" id="firstName" name="firstName" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red" />
				</div>
				<div>
					<label for="lastName" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryLastName} <span class="text-red-400">*</span></label>
					<input type="text" id="lastName" name="lastName" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red" />
				</div>
			</div>

			<div>
				<label for="transferEmail" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryEmail} <span class="text-red-400">*</span></label>
				<input type="email" id="transferEmail" name="email" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red" />
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="vehicle" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryVehicle}</label>
					<select id="vehicle" name="vehicle" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red">
						<option value="e-klasa">{t.transfers.eClassName}</option>
						<option value="v-klasa">{t.transfers.vClassName}</option>
					</select>
				</div>
				<div>
					<label for="transferPhone" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryPhone}</label>
					<input type="tel" id="transferPhone" name="phone" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red" />
				</div>
			</div>

			<div>
				<label for="transferMessage" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryMessage}</label>
				<textarea id="transferMessage" name="message" rows="4" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-brand-red resize-vertical"></textarea>
			</div>

			<div class="flex items-start gap-2">
				<input type="checkbox" id="transferConsent" name="consent" required class="mt-1 w-4 h-4 rounded border-slate-300 text-brand-red focus:ring-brand-red" />
				<label for="transferConsent" class="text-sm text-slate-300">
					{t.transfers.inquiryConsent}
				</label>
			</div>

			<div class="text-center pt-2">
				<button type="submit" class="bg-brand-green text-white px-10 py-2.5 rounded font-medium hover:brightness-110 transition">
					{t.transfers.inquirySubmit}
				</button>
			</div>
		</form>
	</div>
</section>

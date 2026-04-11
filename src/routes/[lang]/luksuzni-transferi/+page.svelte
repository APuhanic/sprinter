<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.transfers.title} — Sprinter d.o.o.</title>
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
				<div class="h-56 bg-slate-200 flex items-center justify-center text-slate-300">
					<svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h14.25m-14.25 0V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v4.5h6.75a1.125 1.125 0 011.125 1.125v2.25" />
					</svg>
				</div>
				<div class="p-6">
					<h2 class="text-xl font-bold text-slate-900 mb-2">{t.transfers.eClassName}</h2>
					<p class="text-slate-600">{t.transfers.eClassDesc}</p>
				</div>
			</div>

			<!-- V-Class -->
			<div class="bg-white rounded-lg overflow-hidden shadow-sm">
				<div class="h-56 bg-slate-200 flex items-center justify-center text-slate-300">
					<svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h14.25m-14.25 0V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v4.5h6.75a1.125 1.125 0 011.125 1.125v2.25" />
					</svg>
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
		<p class="text-red-600 font-bold">{t.transfers.vipNote}</p>
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
					<input type="text" id="firstName" name="firstName" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500" />
				</div>
				<div>
					<label for="lastName" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryLastName} <span class="text-red-400">*</span></label>
					<input type="text" id="lastName" name="lastName" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500" />
				</div>
			</div>

			<div>
				<label for="transferEmail" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryEmail} <span class="text-red-400">*</span></label>
				<input type="email" id="transferEmail" name="email" required class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500" />
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="vehicle" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryVehicle}</label>
					<select id="vehicle" name="vehicle" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500">
						<option value="e-klasa">E-Klasa</option>
						<option value="v-klasa">V-Klasa</option>
					</select>
				</div>
				<div>
					<label for="transferPhone" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryPhone}</label>
					<input type="tel" id="transferPhone" name="phone" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500" />
				</div>
			</div>

			<div>
				<label for="transferMessage" class="block text-sm text-slate-300 mb-1">{t.transfers.inquiryMessage}</label>
				<textarea id="transferMessage" name="message" rows="4" class="w-full px-4 py-2.5 rounded bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-red-500 resize-vertical"></textarea>
			</div>

			<div class="flex items-start gap-2">
				<input type="checkbox" id="transferConsent" name="consent" required class="mt-1 w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
				<label for="transferConsent" class="text-sm text-slate-300">
					{t.transfers.inquiryConsent}
				</label>
			</div>

			<div class="text-center pt-2">
				<button type="submit" class="bg-green-500 text-white px-10 py-2.5 rounded font-medium hover:bg-green-600 transition-colors">
					{t.transfers.inquirySubmit}
				</button>
			</div>
		</form>
	</div>
</section>

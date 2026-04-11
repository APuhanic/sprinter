<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.contact.title} — Sprinter d.o.o.</title>
</svelte:head>

<!-- Header -->
<section class="bg-white border-b border-slate-200">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<h1 class="text-3xl font-bold text-slate-900">{t.contact.title}</h1>
	</div>
</section>

<!-- Contact content -->
<section class="bg-white py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Form -->
			<div>
				<h2 class="text-xl font-bold text-slate-900 mb-6">{t.contact.formHeading}</h2>

				<form method="POST" class="space-y-5">
					<div>
						<label for="name" class="block text-sm text-slate-600 mb-1">
							{t.contact.formName}: <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="w-full px-4 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm text-slate-600 mb-1">
							{t.contact.formEmail}: <span class="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full px-4 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm text-slate-600 mb-1">
							{t.contact.formPhone}: <span class="text-red-500">*</span>
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							required
							class="w-full px-4 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm text-slate-600 mb-1">
							{t.contact.formMessage}: <span class="text-red-500">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							required
							class="w-full px-4 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800 resize-vertical"
						></textarea>
					</div>

					<div class="flex items-start gap-2">
						<input
							type="checkbox"
							id="privacy"
							name="privacy"
							required
							class="mt-1 w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
						/>
						<label for="privacy" class="text-sm text-slate-600">
							{t.contact.formPrivacy}
						</label>
					</div>

					<button
						type="submit"
						class="bg-red-600 text-white px-8 py-2.5 rounded font-medium hover:bg-red-700 transition-colors"
					>
						{t.contact.formSubmit}
					</button>
				</form>
			</div>

			<!-- Office info -->
			<div>
				<h2 class="text-xl font-bold text-slate-900 mb-6">{t.contact.office}</h2>

				<div class="space-y-4 text-sm">
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span class="text-slate-700">{t.common.address}</span>
					</div>

					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						<a href="tel:+385957226918" class="text-slate-700 hover:text-red-600">{t.common.phone}</a>
					</div>

					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<a href="mailto:sprinter@sprinter.hr" class="text-slate-700 hover:text-red-600">{t.common.email}</a>
					</div>
				</div>

				<h2 class="text-xl font-bold text-slate-900 mt-10 mb-6">{t.contact.workingHours}</h2>

				<div class="space-y-3 text-sm">
					<div class="flex items-center gap-3">
						<svg class="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="text-slate-700">{t.contact.weekdays}</span>
					</div>
					<div class="flex items-center gap-3">
						<svg class="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="text-slate-700">{t.contact.sunday}</span>
					</div>
				</div>

				<!-- WhatsApp CTA -->
				<a
					href="https://wa.me/385957226918"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-8 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
					</svg>
					{t.common.whatsapp}
				</a>
			</div>
		</div>
	</div>
</section>

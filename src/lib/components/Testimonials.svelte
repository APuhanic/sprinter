<script lang="ts">
	import { testimonials, type Testimonial } from '$lib/data/testimonials';
	import type { Translations } from '$lib/i18n';

	interface Props {
		t: Translations;
		/** Filter to a single service, or show all if omitted. */
		service?: Testimonial['service'];
		/** Max items to show. Default 6. */
		limit?: number;
	}

	let { t, service, limit = 6 }: Props = $props();

	let items = $derived.by(() => {
		const filtered = service ? testimonials.filter((x) => x.service === service) : testimonials;
		return filtered.slice(0, limit);
	});

	function formatDate(iso?: string): string {
		if (!iso) return '';
		try {
			return new Date(iso).toLocaleDateString('hr-HR', { year: 'numeric', month: 'long' });
		} catch {
			return iso;
		}
	}
</script>

{#if items.length > 0}
	<section class="bg-white py-16">
		<div class="mx-auto max-w-6xl px-4">
			<h2 class="text-3xl font-bold text-slate-900 text-center mb-10">
				{t.testimonials.title}
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each items as item}
					<figure class="bg-slate-50 rounded-lg p-6 border border-slate-100">
						{#if item.rating}
							<div class="flex gap-0.5 mb-3" aria-label="{item.rating} / 5">
								{#each Array(5) as _, i}
									<svg
										class="w-4 h-4 {i < item.rating! ? 'text-amber-500' : 'text-slate-200'}"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
										/>
									</svg>
								{/each}
							</div>
						{/if}
						<blockquote class="text-slate-700 leading-relaxed">
							"{item.content}"
						</blockquote>
						<figcaption class="mt-4 pt-4 border-t border-slate-200 text-sm">
							<p class="font-semibold text-slate-900">{item.name}</p>
							{#if item.role}<p class="text-slate-500 text-xs">{item.role}</p>{/if}
							{#if item.date || item.source}
								<p class="text-slate-400 text-xs mt-1">
									{formatDate(item.date)}{item.date && item.source ? ' · ' : ''}{item.source ?? ''}
								</p>
							{/if}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>
{/if}

<script lang="ts">
	/**
	 * A simple image carousel with thumbnail strip.
	 * - Click thumbnails to switch
	 * - Left/right arrow buttons
	 * - Keyboard navigation (left/right arrows)
	 */

	interface Props {
		images: string[];
		alt: string;
	}

	let { images, alt }: Props = $props();

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	class="relative"
	aria-label="Image gallery"
	aria-roledescription="carousel"
	onkeydown={handleKeydown}
>
	<!-- Main image -->
	<div class="relative aspect-[16/10] bg-slate-100 rounded-lg overflow-hidden">
		<img
			src={images[currentIndex]}
			alt="{alt} - {currentIndex + 1}"
			class="w-full h-full object-cover"
		/>

		<!-- Navigation arrows (only if multiple images) -->
		{#if images.length > 1}
			<button
				onclick={prev}
				class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 shadow-md transition-colors"
				aria-label="Previous image"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				onclick={next}
				class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 shadow-md transition-colors"
				aria-label="Next image"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Counter -->
			<div
				class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full"
			>
				{currentIndex + 1} / {images.length}
			</div>
		{/if}
	</div>

	<!-- Thumbnails -->
	{#if images.length > 1}
		<div class="flex gap-2 mt-3 overflow-x-auto pb-1">
			{#each images as image, i}
				<button
					onclick={() => (currentIndex = i)}
					class="shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-colors {i ===
					currentIndex
						? 'border-brand-red'
						: 'border-transparent hover:border-slate-300'}"
					aria-label="View image {i + 1}"
				>
					<img src={image} alt="{alt} thumbnail {i + 1}" class="w-full h-full object-cover" />
				</button>
			{/each}
		</div>
	{/if}
</section>

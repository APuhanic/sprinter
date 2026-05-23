<script lang="ts">
	type Props = {
		value: string;
		min?: string;
		id?: string;
		'aria-label'?: string;
		placeholder?: string;
		invalidMessage?: string;
		openPickerLabel?: string;
	};

	let {
		value = $bindable(''),
		min,
		id,
		'aria-label': ariaLabel,
		placeholder = 'dd.mm.gggg.',
		invalidMessage,
		openPickerLabel = 'Otvori kalendar'
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
		if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return null;
		return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
	}

	$effect(() => {
		const t = typed;
		if (t === '') {
			if (value !== '') value = '';
			invalid = false;
			return;
		}
		const iso = parseDisplay(t);
		if (!iso) {
			invalid = true;
			return;
		}
		if (min && iso < min) {
			invalid = true;
			return;
		}
		if (value !== iso) value = iso;
		invalid = false;
	});

	$effect(() => {
		const v = value;
		const currentParsed = parseDisplay(typed);
		if (currentParsed === v) return;
		// Don't clobber an in-progress invalid entry — let the user keep editing.
		// Covers both unparseable text (currentParsed === null) and parseable-but-rejected
		// dates (e.g. before `min`, where value wasn't written).
		if (typed !== '' && invalid) return;
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
				/* fall through */
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
		aria-label={ariaLabel ? `${ariaLabel} — ${openPickerLabel.toLowerCase()}` : openPickerLabel}
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

<script lang="ts">
	import { onMount } from 'svelte';
	import { calcFare, type Vehicle } from '$lib/data/transferPricing';
	import { loadGoogleMaps, hasGoogleMapsKey } from '$lib/googleMaps';
	import DateInput from './DateInput.svelte';
	import type { Lang } from '$lib/i18n';

	type CalcStrings = {
		title: string;
		vatNote: string;
		fromLabel: string;
		fromPh: string;
		toLabel: string;
		toPh: string;
		sendLocation: string;
		routeCalculating: string;
		routeError: string;
		mapsUnavailable: string;
		trafficNote: string;
		eClass: string;
		eClassRange: string;
		vClass: string;
		vClassRange: string;
		bookingTitle: string;
		travelTimeLabel: string;
		fullName: string;
		fullNamePh: string;
		paxCount: string;
		date: string;
		time: string;
		timePlaceholder: string;
		note: string;
		notePh: string;
		vatIncl: string;
		errorBook: string;
		openPickerLabel: string;
		sendBooking: string;
		formNote: string;
		whatsapp: string;
		call: string;
		email: string;
		hours: string;
		// WhatsApp message labels
		mDest: string;
		mVeh: string;
		mPrice: string;
		mDate: string;
		mTime: string;
		mPax: string;
		mName: string;
		mNote: string;
		bookMsg: string;
		locMsg: string;
		mailSubject: string;
	};

	type Props = {
		lang: Lang;
		strings: CalcStrings;
		whatsAppNumber: string;
		phoneNumber: string;
		emailAddress: string;
	};

	let { lang, strings: s, whatsAppNumber, phoneNumber, emailAddress }: Props = $props();

	// ── Route / Maps state ────────────────────────────────────────────────
	let fromInput = $state<HTMLInputElement | null>(null);
	let toInput = $state<HTMLInputElement | null>(null);
	let mapElement = $state<HTMLDivElement | null>(null);
	let fromText = $state('');
	let toText = $state('');
	let fromPlace: google.maps.places.PlaceResult | null = $state(null);
	let toPlace: google.maps.places.PlaceResult | null = $state(null);
	let lastKm = $state(0);
	let lastMin = $state(0);

	type RouteStatus = 'idle' | 'loading' | 'ok' | 'error';
	let routeStatus = $state<RouteStatus>('idle');
	let mapsError = $state(false);
	let directionsService: google.maps.DirectionsService | null = null;
	let directionsRenderer: google.maps.DirectionsRenderer | null = null;
	let mapInstance: google.maps.Map | null = null;

	// ── Vehicle + form ────────────────────────────────────────────────────
	let vehicle = $state<Vehicle>('e');
	let name = $state('');
	let paxCount = $state(1);
	let date = $state('');
	let time = $state('');
	let note = $state('');
	let errorBook = $state(false);

	let vehicleLabel = $derived(
		vehicle === 'e' ? `${s.eClass} · ${s.eClassRange}` : `${s.vClass} · ${s.vClassRange}`
	);

	let fare = $derived(routeStatus === 'ok' ? calcFare(lastKm, vehicle) : null);

	function placeLabel(p: google.maps.places.PlaceResult | null, fallback: string): string {
		const raw = p?.name || p?.formatted_address || fallback;
		return raw.split(',')[0].trim();
	}
	let fromName = $derived(placeLabel(fromPlace, fromText || s.fromLabel));
	let toName = $derived(placeLabel(toPlace, toText || s.toLabel));

	let travelTimeText = $derived(
		routeStatus === 'ok' && lastMin > 0 ? `~${lastMin} min · ${Math.round(lastKm)} km` : ''
	);

	const today = new Date().toISOString().split('T')[0];

	const timeOptions = (() => {
		const list: string[] = [];
		for (let h = 0; h < 24; h++) {
			for (const m of [0, 30]) {
				list.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
			}
		}
		return list;
	})();

	// ── Google Maps init ──────────────────────────────────────────────────
	let initialized = false;
	const removeListeners: Array<() => void> = [];

	const MAP_DEFAULT_CENTER = { lat: 44.8666, lng: 13.8496 };
	const MAP_DEFAULT_ZOOM = 9;

	async function initMaps() {
		if (initialized) return;
		initialized = true;

		if (!hasGoogleMapsKey()) {
			mapsError = true;
			return;
		}

		try {
			await loadGoogleMaps(lang);
			directionsService = new google.maps.DirectionsService();

			if (mapElement) {
				mapInstance = new google.maps.Map(mapElement, {
					center: MAP_DEFAULT_CENTER,
					zoom: MAP_DEFAULT_ZOOM,
					disableDefaultUI: true,
					zoomControl: true,
					gestureHandling: 'cooperative',
					clickableIcons: false
				});
				directionsRenderer = new google.maps.DirectionsRenderer({
					map: mapInstance,
					suppressMarkers: false,
					preserveViewport: false,
					polylineOptions: {
						strokeColor: '#c2603a',
						strokeWeight: 5,
						strokeOpacity: 0.9
					}
				});
			}

			const opts: google.maps.places.AutocompleteOptions = {
				fields: ['geometry', 'name', 'formatted_address']
			};

			if (fromInput) {
				const ac = new google.maps.places.Autocomplete(fromInput, opts);
				const listener = ac.addListener('place_changed', () => {
					fromPlace = ac.getPlace();
					fromText = fromInput?.value ?? '';
					maybeRunRoute();
				});
				removeListeners.push(() => google.maps.event.removeListener(listener));
			}
			if (toInput) {
				const ac = new google.maps.places.Autocomplete(toInput, opts);
				const listener = ac.addListener('place_changed', () => {
					toPlace = ac.getPlace();
					toText = toInput?.value ?? '';
					maybeRunRoute();
				});
				removeListeners.push(() => google.maps.event.removeListener(listener));
			}
		} catch (err) {
			console.warn('[Sprinter] Google Maps unavailable:', err);
			mapsError = true;
		}
	}

	function maybeRunRoute() {
		if (!fromPlace?.geometry?.location || !toPlace?.geometry?.location || !directionsService) {
			return;
		}
		routeStatus = 'loading';
		directionsService.route(
			{
				origin: fromPlace.geometry.location,
				destination: toPlace.geometry.location,
				travelMode: google.maps.TravelMode.DRIVING
			},
			(res, status) => {
				if (status !== 'OK' || !res) {
					routeStatus = 'error';
					return;
				}
				const leg = res.routes[0].legs[0];
				lastKm = (leg.distance?.value ?? 0) / 1000;
				lastMin = Math.round((leg.duration?.value ?? 0) / 60);
				routeStatus = 'ok';
				directionsRenderer?.setDirections(res);
			}
		);
	}

	function invalidateOnType(which: 'from' | 'to') {
		if (which === 'from' && fromPlace) {
			const v = fromInput?.value ?? '';
			const matched = fromPlace.formatted_address ?? fromPlace.name ?? '';
			if (v !== matched) {
				fromPlace = null;
				if (routeStatus !== 'idle') routeStatus = 'idle';
			}
		} else if (which === 'to' && toPlace) {
			const v = toInput?.value ?? '';
			const matched = toPlace.formatted_address ?? toPlace.name ?? '';
			if (v !== matched) {
				toPlace = null;
				if (routeStatus !== 'idle') routeStatus = 'idle';
			}
		}
	}

	onMount(() => {
		initMaps();
		return () => {
			while (removeListeners.length) removeListeners.pop()?.();
		};
	});

	// ── WhatsApp / actions ────────────────────────────────────────────────
	function fmtDate(d: string): string {
		if (!d) return '';
		const loc: Record<Lang, string> = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE' };
		try {
			return new Date(d).toLocaleDateString(loc[lang], {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return d;
		}
	}

	function fromFullText(): string {
		return fromPlace?.formatted_address ?? fromPlace?.name ?? fromText.trim();
	}
	function toFullText(): string {
		return toPlace?.formatted_address ?? toPlace?.name ?? toText.trim();
	}

	function buildBookingMessage(): string {
		const lines: string[] = [];
		lines.push(s.bookMsg);
		lines.push('');
		lines.push(`📍 ${fromFullText()} → ${toFullText()}`);
		lines.push(`🚘 ${s.mVeh}: ${vehicleLabel}`);
		if (fare !== null) lines.push(`💶 ${s.mPrice}: ${fare} €`);
		if (date) lines.push(`📅 ${s.mDate}: ${fmtDate(date)}`);
		if (time) lines.push(`⏰ ${s.mTime}: ${time}`);
		if (paxCount) lines.push(`👥 ${s.mPax}: ${paxCount}`);
		if (name.trim()) lines.push(`👤 ${s.mName}: ${name.trim()}`);
		if (note.trim()) lines.push(`✏ ${s.mNote}: ${note.trim()}`);
		return lines.join('\n');
	}

	let waHref = $derived.by(() => {
		if (routeStatus !== 'ok' || fare === null) {
			return `https://wa.me/${whatsAppNumber}`;
		}
		return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(buildBookingMessage())}`;
	});

	let mailHref = $derived.by(() => {
		if (routeStatus !== 'ok' || fare === null) {
			return `mailto:${emailAddress}`;
		}
		const subject = `${s.mailSubject}: ${fromName} → ${toName}`;
		return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
			buildBookingMessage()
		)}`;
	});

	function sendLocation(ev: Event) {
		ev.preventDefault();
		const dest = toFullText();
		let msg = s.locMsg;
		if (dest) msg += `\n🏁 ${s.mDest}: ${dest}`;
		window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(msg)}`, '_blank');
	}

	function sendBooking(ev: Event) {
		errorBook = false;
		if (routeStatus !== 'ok' || fare === null) {
			errorBook = true;
			ev.preventDefault();
			return;
		}
		if (!name.trim() || !date || !time) {
			errorBook = true;
			ev.preventDefault();
		}
	}
</script>

<div class="tr-calc">
	<div class="tr-calc__title">
		{s.title}
		<span class="tr-calc__title-sub">({s.vatNote})</span>
	</div>

	{#if mapsError}
		<div class="tr-calc__maps-warn">{s.mapsUnavailable}</div>
	{/if}

	<!-- Pickup -->
	<label class="tr-calc__field tr-calc__field--addr">
		<span class="tr-calc__label">{s.fromLabel}</span>
		<span class="tr-calc__pin tr-calc__pin--from" aria-hidden="true"></span>
		<input
			bind:this={fromInput}
			bind:value={fromText}
			oninput={() => invalidateOnType('from')}
			class="tr-calc__input tr-calc__input--addr"
			type="text"
			autocomplete="off"
			placeholder={s.fromPh}
		/>
	</label>
	<button type="button" class="tr-calc__send-loc" onclick={sendLocation}>
		<span aria-hidden="true">📍</span> {s.sendLocation}
	</button>

	<!-- Destination -->
	<label class="tr-calc__field tr-calc__field--addr">
		<span class="tr-calc__label">{s.toLabel}</span>
		<span class="tr-calc__pin tr-calc__pin--to" aria-hidden="true"></span>
		<input
			bind:this={toInput}
			bind:value={toText}
			oninput={() => invalidateOnType('to')}
			class="tr-calc__input tr-calc__input--addr"
			type="text"
			autocomplete="off"
			placeholder={s.toPh}
		/>
	</label>

	<!-- Vehicle -->
	<div class="tr-calc__veh">
		<button
			type="button"
			class="tr-calc__veh-btn"
			class:tr-calc__veh-btn--on={vehicle === 'e'}
			onclick={() => (vehicle = 'e')}
		>
			<span class="tr-calc__veh-title">{s.eClass}</span>
			<span class="tr-calc__veh-sub">{s.eClassRange}</span>
		</button>
		<button
			type="button"
			class="tr-calc__veh-btn"
			class:tr-calc__veh-btn--on={vehicle === 'v'}
			onclick={() => (vehicle = 'v')}
		>
			<span class="tr-calc__veh-title">{s.vClass}</span>
			<span class="tr-calc__veh-sub">{s.vClassRange}</span>
		</button>
	</div>

	<!-- Result panel -->
	{#if routeStatus === 'loading'}
		<div class="tr-calc__result tr-calc__result--soft">
			<span class="tr-calc__loading">{s.routeCalculating}</span>
		</div>
	{:else if routeStatus === 'error'}
		<p class="tr-calc__error">{s.routeError}</p>
	{:else if routeStatus === 'ok' && fare !== null}
		<div class="tr-calc__result">
			<div class="tr-calc__result-route">{fromName} → {toName}</div>
			<div class="tr-calc__result-price">{fare} €</div>
			<div class="tr-calc__result-vehicle">{vehicleLabel}</div>
			{#if travelTimeText}
				<p class="tr-calc__result-inquiry">🕐 {s.travelTimeLabel}: {travelTimeText}</p>
			{/if}
			<p class="tr-calc__traffic-note">⚠️ {s.trafficNote}</p>
		</div>
	{/if}

	<!-- Map preview -->
	{#if !mapsError}
		<div
			class="tr-calc__map"
			class:tr-calc__map--visible={routeStatus === 'ok' || routeStatus === 'loading'}
			bind:this={mapElement}
		></div>
	{/if}

	<!-- Booking form -->
	<div class="tr-calc__booking">
		<div class="tr-calc__title">{s.bookingTitle}</div>

		<div class="tr-calc__two-col">
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.date}</span>
				<DateInput
					bind:value={date}
					min={today}
					aria-label={s.date}
					openPickerLabel={s.openPickerLabel}
				/>
			</label>
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.time}</span>
				<select class="tr-calc__input" bind:value={time}>
					<option value="">{s.timePlaceholder}</option>
					{#each timeOptions as t (t)}
						<option value={t}>{t}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="tr-calc__two-col">
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.paxCount}</span>
				<input
					class="tr-calc__input"
					type="number"
					min="1"
					max="7"
					bind:value={paxCount}
				/>
			</label>
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.fullName}</span>
				<input
					class="tr-calc__input"
					type="text"
					bind:value={name}
					placeholder={s.fullNamePh}
				/>
			</label>
		</div>

		<label class="tr-calc__field">
			<span class="tr-calc__label">{s.note}</span>
			<input class="tr-calc__input" type="text" bind:value={note} placeholder={s.notePh} />
		</label>

		{#if errorBook}
			<p class="tr-calc__error">{s.errorBook}</p>
		{/if}

		<a
			class="tr-calc__send"
			href={waHref}
			target="_blank"
			rel="noopener noreferrer"
			onclick={sendBooking}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
				/>
			</svg>
			<span>{s.sendBooking}</span>
		</a>

		<div class="tr-calc__quick-row">
			<a class="tr-calc__quick tr-calc__quick--gold" href={`tel:${phoneNumber}`}>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path
						d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.8 2z"
					/>
				</svg>
				<span>{s.call}</span>
			</a>
			<a class="tr-calc__quick" href={mailHref}>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M4 4h16v16H4zM4 6l8 6 8-6" />
				</svg>
				<span>{s.email}</span>
			</a>
		</div>

		<p class="tr-calc__hours">🕐 {s.hours}</p>
	</div>
</div>

<style>
	.tr-calc__field--addr {
		position: relative;
	}
	.tr-calc__input--addr {
		padding-left: 36px;
	}
	.tr-calc__pin {
		position: absolute;
		left: 14px;
		bottom: 17px;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		pointer-events: none;
	}
	.tr-calc__pin--from {
		background: var(--accent);
	}
	.tr-calc__pin--to {
		background: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
	}

	.tr-calc__send-loc {
		display: inline-block;
		margin: -8px 0 14px;
		padding: 0;
		font-size: 12.5px;
		color: var(--accent);
		background: transparent;
		border: 0;
		text-decoration: none;
		cursor: pointer;
		font-family: inherit;
	}
	.tr-calc__send-loc:hover {
		text-decoration: underline;
	}

	.tr-calc__veh {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-bottom: 18px;
	}
	.tr-calc__veh-btn {
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 2px;
		padding: 14px;
		text-align: center;
		cursor: pointer;
		color: var(--fg);
		display: flex;
		flex-direction: column;
		gap: 2px;
		transition: border-color 0.18s ease, background 0.18s ease;
	}
	.tr-calc__veh-btn:hover {
		border-color: var(--accent);
	}
	.tr-calc__veh-btn--on {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 6%, var(--bg));
	}
	.tr-calc__veh-title {
		font-size: 15px;
		font-weight: 500;
	}
	.tr-calc__veh-btn--on .tr-calc__veh-title {
		color: var(--accent);
	}
	.tr-calc__veh-sub {
		font-size: 12px;
		color: var(--muted);
	}

	.tr-calc__maps-warn {
		margin-bottom: 18px;
		padding: 12px 14px;
		background: color-mix(in srgb, var(--accent) 6%, var(--bg));
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		border-radius: 2px;
		font-size: 13px;
		color: var(--accent);
		line-height: 1.5;
	}

	.tr-calc__loading {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
	}
	:global(.tr-calc__result--soft) {
		background: color-mix(in srgb, var(--soft) 30%, transparent) !important;
		color: var(--fg) !important;
	}

	.tr-calc__traffic-note {
		margin-top: 14px;
		font-size: 12.5px;
		line-height: 1.5;
		max-width: 44ch;
		margin-left: auto;
		margin-right: auto;
		color: color-mix(in srgb, var(--accent) 55%, white 45%);
		opacity: 0.85;
	}

	.tr-calc__map {
		display: none;
		width: 100%;
		height: 240px;
		margin-top: 18px;
		border-radius: 2px;
		overflow: hidden;
		background: color-mix(in srgb, var(--soft) 40%, transparent);
		border: 1px solid var(--line);
	}
	.tr-calc__map--visible {
		display: block;
	}

	.tr-calc__quick-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 12px;
	}
	.tr-calc__quick {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		border: 1px solid var(--line);
		border-radius: 2px;
		font-size: 14px;
		color: var(--muted);
		text-decoration: none;
		transition: border-color 0.18s ease, color 0.18s ease;
	}
	.tr-calc__quick:hover {
		border-color: var(--accent);
		color: var(--fg);
	}
	.tr-calc__quick--gold {
		border-color: color-mix(in srgb, var(--accent) 60%, transparent);
		color: var(--accent);
	}

	.tr-calc__hours {
		margin-top: 14px;
		text-align: center;
		font-size: 12.5px;
		color: var(--muted);
	}
</style>

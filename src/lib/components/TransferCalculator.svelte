<script lang="ts">
	import { onMount } from 'svelte';
	import {
		calcFare,
		vehicleFromPax,
		MAX_KM,
		type PaxKind,
		type Vehicle
	} from '$lib/data/transferPricing';
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
		swap: string;
		routeCalculating: string;
		routeError: string;
		mapsUnavailable: string;
		longTripTitle: string;
		longTripBody: string;
		trafficNote: string;
		passengers: string;
		eClass: string;
		eClassRange: string;
		vClass: string;
		vClassRange: string;
		errorRoute: string;
		bookingTitle: string;
		bookingInquiry: string;
		travelTimeLabel: string;
		onRequest: string;
		onRequestSub: string;
		fullName: string;
		fullNamePh: string;
		phone: string;
		email: string;
		date: string;
		time: string;
		timePlaceholder: string;
		flight: string;
		flightPh: string;
		note: string;
		notePh: string;
		returnDiscount: string;
		tripOneWay: string;
		tripReturn: string;
		tripReturnSuffix: string;
		returnDate: string;
		returnTime: string;
		returnNoteLabel: string;
		termsTitle: string;
		terms: string[];
		orderSummary: string;
		outbound: string;
		returnRow: string;
		total: string;
		vatIncl: string;
		errorBook: string;
		returnAfterOutboundError: string;
		openPickerLabel: string;
		sendBooking: string;
		sendInquiry: string;
		formNote: string;
		whatsapp: string;
	};

	type Props = {
		lang: Lang;
		strings: CalcStrings;
		whatsAppNumber: string;
	};

	let { lang, strings: s, whatsAppNumber }: Props = $props();

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

	type RouteStatus = 'idle' | 'loading' | 'ok' | 'long' | 'error';
	let routeStatus = $state<RouteStatus>('idle');
	let mapsError = $state(false);
	let directionsService: google.maps.DirectionsService | null = null;
	let directionsRenderer: google.maps.DirectionsRenderer | null = null;
	let mapInstance: google.maps.Map | null = null;

	// ── Vehicle / trip ────────────────────────────────────────────────────
	let pax = $state<PaxKind>('small');
	let returnEnabled = $state(false);

	// ── Booking form fields ───────────────────────────────────────────────
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('');
	let flight = $state('');
	let note = $state('');
	let returnDate = $state('');
	let returnTime = $state('');
	let errorBook = $state(false);

	// ── Derived ────────────────────────────────────────────────────────────
	let vehicle = $derived<Vehicle>(vehicleFromPax(pax));
	let vehicleLabel = $derived(
		pax === 'small' ? `${s.eClass} · ${s.eClassRange}` : `${s.vClass} · ${s.vClassRange}`
	);

	// One-way fare from the cascading tariff; null when route not OK or out of range.
	let oneWayFare = $derived(routeStatus === 'ok' ? calcFare(lastKm, vehicle) : null);
	let returnFare = $derived.by(() => {
		if (oneWayFare === null || !returnEnabled) return null;
		return Math.round(oneWayFare * 0.9);
	});
	let totalFare = $derived.by(() => {
		if (oneWayFare === null) return null;
		return oneWayFare + (returnFare ?? 0);
	});

	let isInquiry = $derived(
		routeStatus === 'long' || (mapsError && (fromText.trim() !== '' || toText.trim() !== ''))
	);

	let showBookingForm = $derived(
		routeStatus === 'ok' ||
			routeStatus === 'long' ||
			(mapsError && fromText.trim().length > 2 && toText.trim().length > 2)
	);

	function placeLabel(p: google.maps.places.PlaceResult | null, fallback: string): string {
		const raw = p?.name || p?.formatted_address || fallback;
		return raw.split(',')[0].trim();
	}
	let fromName = $derived(placeLabel(fromPlace, fromText || s.fromLabel));
	let toName = $derived(placeLabel(toPlace, toText || s.toLabel));

	let travelTimeText = $derived(
		(routeStatus === 'ok' || routeStatus === 'long') && lastMin > 0
			? `~${lastMin} min · ${Math.round(lastKm)} km`
			: ''
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

	// Centered on the Istrian peninsula at zoom 9 — covers Pula → Rovinj → Opatija.
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
				componentRestrictions: { country: 'hr' },
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
				routeStatus = lastKm > MAX_KM ? 'long' : 'ok';
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

	function swapInputs() {
		const tmpText = fromText;
		fromText = toText;
		toText = tmpText;
		if (fromInput) fromInput.value = fromText;
		if (toInput) toInput.value = toText;
		const tmpPlace = fromPlace;
		fromPlace = toPlace;
		toPlace = tmpPlace;
		if (fromPlace && toPlace) maybeRunRoute();
	}

	onMount(() => {
		initMaps();
		return () => {
			while (removeListeners.length) removeListeners.pop()?.();
		};
	});

	// ── WhatsApp ──────────────────────────────────────────────────────────
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

	function sendWhatsApp() {
		errorBook = false;
		if (!name.trim() || !phone.trim() || !date || !time) {
			errorBook = true;
			return;
		}
		if (returnEnabled && (!returnDate || !returnTime)) {
			errorBook = true;
			return;
		}

		const emoji = isInquiry ? '❓' : '🚗';
		const heading = isInquiry ? s.sendInquiry : s.sendBooking;

		let msg = `${emoji} *${heading.toUpperCase()} – SPRINTER*\n\n`;
		msg += `📍 ${fromName} → ${toName}\n`;
		if (routeStatus === 'ok' || routeStatus === 'long') {
			msg += `📏 ${Math.round(lastKm)} km · ~${lastMin} min\n`;
		}
		msg += `🚘 ${s.passengers}: ${vehicleLabel}\n`;

		if (isInquiry) {
			msg += `💶 ${s.onRequest}\n`;
		} else if (returnEnabled && returnFare !== null && oneWayFare !== null) {
			msg += `💶 *${s.total}: ${totalFare} €* (${s.vatIncl})\n`;
			msg += `   ↗ ${s.outbound}: ${oneWayFare} €\n`;
			msg += `   ↙ ${s.returnRow}: ${returnFare} € (−10%)\n`;
		} else if (oneWayFare !== null) {
			msg += `💶 *${s.total}: ${oneWayFare} €* (${s.vatIncl})\n`;
		}

		msg += `\n👤 ${s.fullName}: ${name.trim()}\n`;
		msg += `📞 ${s.phone}: ${phone.trim()}\n`;
		if (email.trim()) msg += `📧 ${s.email}: ${email.trim()}\n`;
		msg += `\n✈️ *${s.outbound.toUpperCase()}*\n`;
		msg += `📅 ${s.date}: ${fmtDate(date)}\n`;
		msg += `🕐 ${s.time}: ${time}\n`;
		if (flight.trim()) msg += `✈️ ${s.flight}: ${flight.trim()}\n`;

		if (returnEnabled && returnDate && returnTime) {
			msg += `\n🔄 *${s.returnRow.toUpperCase()}*\n`;
			msg += `📅 ${s.date}: ${fmtDate(returnDate)}\n`;
			msg += `🕐 ${s.time}: ${returnTime}\n`;
		}

		if (note.trim()) msg += `\n📝 ${s.note}: ${note.trim()}`;

		const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(msg)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
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

	<!-- Route inputs -->
	<div class="tr-calc__route">
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

		<button
			type="button"
			class="tr-calc__swap"
			onclick={swapInputs}
			aria-label={s.swap}
			tabindex="-1"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M7 10l-3 3 3 3M4 13h12M17 14l3-3-3-3M20 11H8" />
			</svg>
		</button>

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
	</div>

	<!-- Vehicle -->
	<div class="tr-calc__field">
		<span class="tr-calc__label">{s.passengers}</span>
		<div class="tr-calc__pax">
			<label class="tr-calc__pax-opt">
				<input type="radio" name="tr-pax" value="small" bind:group={pax} />
				<div>
					<span class="tr-calc__pax-title">{s.eClassRange}</span>
					<span class="tr-calc__pax-sub">{s.eClass}</span>
				</div>
			</label>
			<label class="tr-calc__pax-opt">
				<input type="radio" name="tr-pax" value="large" bind:group={pax} />
				<div>
					<span class="tr-calc__pax-title">{s.vClassRange}</span>
					<span class="tr-calc__pax-sub">{s.vClass}</span>
				</div>
			</label>
		</div>
	</div>

	<!-- Trip type -->
	<div class="tr-calc__trip">
		<div
			class="tr-calc__trip-toggle"
			role="radiogroup"
			aria-label={s.tripOneWay + ' / ' + s.tripReturn}
		>
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

	<!-- Result panel -->
	{#if routeStatus === 'loading'}
		<div class="tr-calc__result tr-calc__result--soft">
			<span class="tr-calc__loading">{s.routeCalculating}</span>
		</div>
	{:else if routeStatus === 'error'}
		<p class="tr-calc__error">{s.routeError}</p>
	{:else if routeStatus === 'long'}
		<div class="tr-calc__result tr-calc__result--inquiry">
			<div class="tr-calc__result-route">{fromName} → {toName}</div>
			<div class="tr-calc__longtrip-title">{s.longTripTitle}</div>
			<p class="tr-calc__longtrip-body">{s.longTripBody}</p>
			<div class="tr-calc__result-vehicle">{vehicleLabel}</div>
			{#if travelTimeText}
				<p class="tr-calc__result-inquiry">🕐 {s.travelTimeLabel}: {travelTimeText}</p>
			{/if}
		</div>
	{:else if routeStatus === 'ok' && oneWayFare !== null}
		<div class="tr-calc__result">
			<div class="tr-calc__result-route">{fromName} → {toName}</div>
			<div class="tr-calc__result-price">{totalFare ?? oneWayFare} €</div>
			<div class="tr-calc__result-vehicle">{vehicleLabel}</div>

			{#if returnEnabled && returnFare !== null}
				<div class="tr-calc__breakdown">
					<div class="tr-calc__brk-row">
						<span>{s.outbound}</span>
						<span>{oneWayFare} €</span>
					</div>
					<div class="tr-calc__brk-row">
						<span>{s.returnRow} <small class="tr-calc__discount">(−10%)</small></span>
						<span>{returnFare} €</span>
					</div>
					<div class="tr-calc__brk-row tr-calc__brk-total">
						<span>{s.total}</span>
						<span>{totalFare} €</span>
					</div>
				</div>
			{/if}

			{#if travelTimeText}
				<p class="tr-calc__result-inquiry">🕐 {s.travelTimeLabel}: {travelTimeText}</p>
			{/if}
			<p class="tr-calc__traffic-note">⚠️ {s.trafficNote}</p>
		</div>
	{/if}

	<!-- Map preview (route visualisation) -->
	{#if !mapsError}
		<div
			class="tr-calc__map"
			class:tr-calc__map--visible={routeStatus === 'ok' ||
				routeStatus === 'long' ||
				routeStatus === 'loading'}
			bind:this={mapElement}
		></div>
	{/if}

	<!-- Booking form -->
	{#if showBookingForm}
		<div class="tr-calc__booking" id="tr-booking">
			<div class="tr-calc__title">
				{isInquiry ? s.bookingInquiry : s.bookingTitle}
			</div>

			{#if isInquiry}
				<p class="tr-calc__result-inquiry" style="text-align:left; margin: -10px 0 18px;">
					{s.onRequestSub}
				</p>
			{/if}

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.fullName}</span>
				<input
					class="tr-calc__input"
					type="text"
					bind:value={name}
					placeholder={s.fullNamePh}
				/>
			</label>

			<div class="tr-calc__two-col">
				<label class="tr-calc__field">
					<span class="tr-calc__label">{s.phone}</span>
					<input class="tr-calc__input" type="tel" bind:value={phone} placeholder="+385..." />
				</label>
				<label class="tr-calc__field">
					<span class="tr-calc__label">{s.email}</span>
					<input
						class="tr-calc__input"
						type="email"
						bind:value={email}
						placeholder="your@email.com"
					/>
				</label>
			</div>

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

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.flight}</span>
				<input
					class="tr-calc__input"
					type="text"
					bind:value={flight}
					placeholder={s.flightPh}
				/>
			</label>

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.note}</span>
				<textarea class="tr-calc__input" bind:value={note} placeholder={s.notePh}></textarea>
			</label>

			{#if !isInquiry && returnEnabled}
				<div class="tr-calc__return">
					<div class="tr-calc__return-header">
						<span class="tr-calc__return-label">{s.returnRow}</span>
						<span class="tr-calc__discount-badge">{s.returnDiscount}</span>
					</div>
					<div class="tr-calc__return-fields tr-calc__return-fields--bare">
						<div class="tr-calc__two-col">
							<label class="tr-calc__field" style="margin-bottom:0">
								<span class="tr-calc__label">{s.returnDate}</span>
								<DateInput
									bind:value={returnDate}
									min={date || today}
									aria-label={s.returnDate}
									openPickerLabel={s.openPickerLabel}
									invalidMessage={s.returnAfterOutboundError}
								/>
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
						{#if returnFare !== null}
							<p class="tr-calc__return-note">
								{s.returnNoteLabel}: <strong>{returnFare} €</strong> (−10%)
							</p>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Terms -->
			<div class="tr-calc__terms">
				<div class="tr-calc__terms-title">{s.termsTitle}</div>
				<ul>
					{#each s.terms as term (term)}
						<li>{term}</li>
				{/each}
				</ul>
			</div>

			<!-- Summary -->
			{#if !isInquiry && oneWayFare !== null}
				<div class="tr-calc__summary">
					<div class="tr-calc__summary-title">{s.orderSummary}</div>
					<div class="tr-calc__summary-rows">
						{#if name.trim()}<div>👤 {name.trim()}</div>{/if}
						<div>📍 {fromName} → {toName}</div>
						<div>🚘 {vehicleLabel}</div>
						{#if date && time}
							<div>📅 {s.outbound}: {fmtDate(date)} · {time}</div>
						{/if}
						{#if returnEnabled && returnDate && returnTime}
							<div>🔄 {s.returnRow}: {fmtDate(returnDate)} · {returnTime}</div>
						{/if}
					</div>
					<div class="tr-calc__summary-totals">
						<div class="tr-calc__brk-row">
							<span>{s.outbound}</span>
							<span>{oneWayFare} €</span>
						</div>
						{#if returnEnabled && returnFare !== null}
							<div class="tr-calc__brk-row">
								<span
									>{s.returnRow} <small class="tr-calc__discount">(−10%)</small></span
								>
								<span>{returnFare} €</span>
							</div>
						{/if}
						<div class="tr-calc__summary-total">
							{s.total}: <strong>{totalFare} €</strong>
							<span class="tr-calc__vat">({s.vatIncl})</span>
						</div>
					</div>
				</div>
			{/if}

			{#if errorBook}
				<p class="tr-calc__error">{s.errorBook}</p>
			{/if}

			<button class="tr-calc__send" type="button" onclick={sendWhatsApp}>
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
				<span>{isInquiry ? s.sendInquiry : s.sendBooking}</span>
			</button>

			<p class="tr-calc__form-note">{s.formNote}</p>
		</div>
	{/if}
</div>

<style>
	/* Address inputs with pin + swap */
	.tr-calc__route {
		position: relative;
	}
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

	.tr-calc__swap {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg);
		border: 1px solid var(--line);
		color: var(--accent);
		border-radius: 50%;
		cursor: pointer;
		transition: border-color 0.18s ease, transform 0.25s ease;
		z-index: 2;
	}
	.tr-calc__swap:hover {
		border-color: var(--accent);
		transform: translateY(-50%) rotate(180deg);
	}
	.tr-calc__swap:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 45%, transparent);
		outline-offset: 2px;
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
	:global(.tr-calc__result--inquiry) {
		background: var(--fg);
		color: var(--bg);
	}
	.tr-calc__longtrip-title {
		font-family: var(--font-display);
		font-size: clamp(22px, 3vw, 28px);
		color: color-mix(in srgb, var(--accent) 70%, white 30%);
		margin: 6px 0 4px;
		letter-spacing: -0.005em;
	}
	.tr-calc__longtrip-body {
		font-size: 13.5px;
		line-height: 1.55;
		max-width: 42ch;
		margin: 0 auto 10px;
		opacity: 0.75;
	}

	/* Traffic delay note inside the result panel (dark bg) */
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

	/* Map preview */
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
</style>

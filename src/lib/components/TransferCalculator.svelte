<script lang="ts">
	import { onMount } from 'svelte';
	import { calcFare, type Vehicle } from '$lib/data/transferPricing';
	import { loadGoogleMaps, hasGoogleMapsKey } from '$lib/googleMaps';
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
		sendBooking: string;
		formNote: string;
		whatsapp: string;
		call: string;
		email: string;
		hours: string;
		estimateNote: string;
		longHaulCaveat: string;
		modeNowMain: string;
		modeLaterMain: string;
		nowToken: string;
		mapNavLabel: string;
		gpsAsking: string;
		gpsDenied: string;
		phone: string;
		// WhatsApp message labels
		mNow: string;
		mBooking: string;
		mAt: string;
		mConfirmNow: string;
		mConfirmLater: string;
		mFrom: string;
		mTo: string;
		mRoute: string;
		mDest: string;
		mVehE: string;
		mVehV: string;
		mPrice: string;
		mPax: string;
		mName: string;
		mNote: string;
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
	let phone = $state('');
	let paxCount = $state(1);
	let date = $state('');
	let time = $state('');
	let note = $state('');
	let errorBook = $state(false);

	let vehicleLabel = $derived(
		vehicle === 'e' ? `${s.eClass} · ${s.eClassRange}` : `${s.vClass} · ${s.vClassRange}`
	);
	// Concrete vehicle + plate for the WhatsApp dispatcher message.
	let vehicleDesc = $derived(vehicle === 'e' ? s.mVehE : s.mVehV);

	let fare = $derived(routeStatus === 'ok' ? calcFare(lastKm, vehicle) : null);
	let isEstimate = $derived(routeStatus === 'ok' && lastKm > 100);
	let isLongHaul = $derived(routeStatus === 'ok' && lastKm > 150);

	// ── Booking-mode gate ─────────────────────────────────────────────────
	// Dad's flow: user must pick "now" or "later" before the calculator unlocks.
	// 'now' hides date/time and auto-fills them with today + the locale's "ODMAH"
	// token so the WhatsApp message still has time info for the dispatcher.
	let mode = $state<'now' | 'later' | null>(null);

	function selectMode(next: 'now' | 'later') {
		mode = next;
		if (next === 'now') {
			date = today;
			time = s.nowToken;
		} else {
			// User picks fresh values for a scheduled ride.
			date = '';
			time = '';
		}
	}

	// Multilingual rotating welcome banner — cycles through HR/DE/EN regardless
	// of UI locale, so visitors landing in any language see all three.
	const WELCOME_WORDS = [
		'Dobrodošli',
		'Putujte s nama',
		'Uživajte',
		'Willkommen',
		'Reisen Sie mit uns',
		'Genießen Sie',
		'Welcome',
		'Travel with us',
		'Enjoy'
	];
	let welcomeIdx = $state(0);
	let welcomeFade = $state(true);
	let welcomeWord = $derived(WELCOME_WORDS[welcomeIdx]);
	// Shrink the font for longer words/phrases so they stay inside the fixed box.
	let welcomeSize = $derived(
		welcomeWord.length <= 8 ? 'lg' : welcomeWord.length <= 12 ? 'md' : 'sm'
	);

	function placeLabel(p: google.maps.places.PlaceResult | null, fallback: string): string {
		const raw = p?.name || p?.formatted_address || fallback;
		return raw.split(',')[0].trim();
	}
	let fromName = $derived(placeLabel(fromPlace, fromText || s.fromLabel));
	let toName = $derived(placeLabel(toPlace, toText || s.toLabel));

	function fmtTime(mins: number): string {
		if (mins < 60) return `${mins} min`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m} min` : `${h}h`;
	}

	let travelTimeText = $derived(
		routeStatus === 'ok' && lastMin > 0 ? `${fmtTime(lastMin)} · ${Math.round(lastKm)} km` : ''
	);

	const today = new Date().toISOString().split('T')[0];

	const timeOptions = (() => {
		const list: string[] = [];
		// Working hours only: 07:00 through 24:00, in 15-minute increments.
		for (let mins = 7 * 60; mins <= 24 * 60; mins += 15) {
			const h = Math.floor(mins / 60);
			const m = mins % 60;
			list.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
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
				fields: ['geometry', 'name', 'formatted_address'],
				// Keep suggestions to the realistic operating area so users don't
				// see Canada / Canary Islands in the dropdown.
				componentRestrictions: { country: ['hr', 'si', 'it', 'at', 'de'] }
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
		const welcomeTimer = window.setInterval(() => {
			welcomeFade = false;
			window.setTimeout(() => {
				welcomeIdx = (welcomeIdx + 1) % WELCOME_WORDS.length;
				welcomeFade = true;
			}, 500);
		}, 2200);
		return () => {
			window.clearInterval(welcomeTimer);
			while (removeListeners.length) removeListeners.pop()?.();
		};
	});

	// ── WhatsApp / actions ────────────────────────────────────────────────
	// Compact date for the booking header: "28.05." — never locale month names.
	function fmtBookingDateTime(): string {
		if (!date) return time;
		const [, mo, da] = date.split('-');
		const datePart = `${da}.${mo}.`;
		return time ? `${datePart} ${s.mAt} ${time}` : datePart;
	}

	function fromFullText(): string {
		return fromPlace?.formatted_address ?? fromPlace?.name ?? fromText.trim();
	}
	function toFullText(): string {
		return toPlace?.formatted_address ?? toPlace?.name ?? toText.trim();
	}

	// Single-point search link — drops one pin so the driver navigates from
	// their current location, not from a fixed origin.
	function buildSearchLink(addr: string): string {
		return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
	}

	// Full-route link (origin → destination) — the route-overview preview that
	// shows distance/time end to end.
	function buildDirLink(): string {
		const origin = encodeURIComponent(fromFullText());
		const destination = encodeURIComponent(toFullText());
		return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
	}

	const WA_LINE = '───────────────';

	// Emoji as explicit code points so the message can never degrade to □/�
	// boxes: \u{FE0F} forces emoji (not text) presentation for ✏ ⚠ 🗓 🗺, and
	// escapes survive any file-encoding round-trip.
	const E = {
		now: '\u{1F534}', // 🔴
		booking: '\u{1F5D3}\u{FE0F}', // 🗓️
		price: '\u{1F4B6}', // 💶
		from: '\u{1F4CD}', // 📍
		to: '\u{1F3C1}', // 🏁
		veh: '\u{1F698}', // 🚘
		pax: '\u{1F465}', // 👥
		name: '\u{1F464}', // 👤
		phone: '\u{1F4DE}', // 📞
		note: '\u{270F}\u{FE0F}', // ✏️
		warn: '\u{26A0}\u{FE0F}', // ⚠️
		route: '\u{1F5FA}\u{FE0F}' // 🗺️
	};

	function buildBookingMessage(): string {
		const L: string[] = [];

		// Status — "now" omits the date; "later" carries the scheduled date/time.
		if (mode === 'later') {
			L.push(`${E.booking} *${s.mBooking} — ${fmtBookingDateTime()}*`);
		} else {
			L.push(`${E.now} *${s.mNow}*`);
		}
		L.push('');

		// Price (bold, right under the status)
		if (fare !== null) {
			const priceText = isEstimate ? `~${fare} €` : `${fare} €`;
			L.push(`${E.price} *${s.mPrice.toUpperCase()}: ${priceText}*`);
			L.push('');
		}

		// Route — from / to on separate lines, full addresses.
		L.push(WA_LINE);
		L.push(`${E.from} *${s.mFrom}*`);
		L.push(fromFullText());
		L.push('');
		L.push(`${E.to} *${s.mTo}*`);
		L.push(toFullText());
		L.push(WA_LINE);

		// Vehicle + details
		L.push(`${E.veh} ${vehicleDesc}`);
		L.push(`${E.pax} ${s.mPax}: ${paxCount}`);
		if (name.trim()) L.push(`${E.name} ${s.mName}: ${name.trim()}`);
		if (phone.trim()) L.push(`${E.phone} ${phone.trim()}`);
		if (note.trim()) L.push(`${E.note} ${s.mNote}: ${note.trim()}`);
		L.push(WA_LINE);

		// Confirmation request — moved to the bottom, just above navigation.
		L.push(`_${mode === 'later' ? s.mConfirmLater : s.mConfirmNow}_`);
		if (isLongHaul) L.push(`${E.warn} ${s.longHaulCaveat}`);
		L.push(WA_LINE);

		// Navigation, all grouped at the bottom: full route overview (dir) +
		// single-pin From/To search links.
		L.push(`${s.mapNavLabel}:`);
		L.push(`${E.route} ${s.mRoute}: ${buildDirLink()}`);
		L.push(`From: ${buildSearchLink(fromFullText())}`);
		L.push(`To: ${buildSearchLink(toFullText())}`);

		return L.join('\n');
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

	let gpsBusy = $state(false);

	function sendLocationFallback() {
		const dest = toFullText();
		let msg = s.locMsg;
		if (dest) msg += `\n\n🏁 ${s.mDest}: ${dest}`;
		window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(msg)}`, '_blank');
	}

	function reverseGeocode(lat: number, lng: number): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!window.google?.maps) return reject(new Error('Maps not loaded'));
			const geocoder = new google.maps.Geocoder();
			geocoder.geocode({ location: { lat, lng } }, (results, status) => {
				if (status === 'OK' && results && results[0]) {
					resolve(results[0].formatted_address);
				} else {
					reject(new Error(`Geocoder failed: ${status}`));
				}
			});
		});
	}

	function sendLocation(ev: Event) {
		ev.preventDefault();
		if (gpsBusy) return;
		// No GPS or Maps API → original WhatsApp inquiry flow.
		if (!navigator.geolocation || mapsError) {
			sendLocationFallback();
			return;
		}
		gpsBusy = true;
		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				try {
					const addr = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
					// Populate the pickup field directly so the user sees the price.
					fromText = addr;
					fromPlace = {
						formatted_address: addr,
						name: addr,
						geometry: {
							location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
						}
					} as google.maps.places.PlaceResult;
					maybeRunRoute();
				} catch (err) {
					console.warn('[Sprinter] reverse geocode failed:', err);
					sendLocationFallback();
				} finally {
					gpsBusy = false;
				}
			},
			(err) => {
				console.warn('[Sprinter] geolocation denied:', err);
				gpsBusy = false;
				sendLocationFallback();
			},
			{ enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
		);
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

<div class="tr-welcome" aria-hidden="true">
	<span
		class="tr-welcome__word"
		class:tr-welcome__word--hidden={!welcomeFade}
		class:is-lg={welcomeSize === 'lg'}
		class:is-md={welcomeSize === 'md'}
		class:is-sm={welcomeSize === 'sm'}
	>
		{welcomeWord}
	</span>
</div>

<!-- Light point ("comet") that traces the active box border. SVG animateMotion
     is the primary path; on devices where it doesn't run, the solid rust fill +
     white text from .tr-mode__btn--on still makes the active box unmistakable. -->
{#snippet comet()}
	<svg
		class="tr-mode__comet"
		preserveAspectRatio="none"
		viewBox="0 0 170 92"
		aria-hidden="true"
	>
		<rect
			x="3"
			y="3"
			width="164"
			height="86"
			rx="12"
			fill="none"
			stroke="#ffe9a8"
			stroke-width="1"
			stroke-opacity="0.2"
		/>
		<circle r="2.2" fill="#ffe9a8" opacity="0.5">
			<animateMotion
				dur="4.5s"
				repeatCount="indefinite"
				begin="-0.1s"
				path="M15,3 H155 Q167,3 167,15 V77 Q167,89 155,89 H15 Q3,89 3,77 V15 Q3,3 15,3 Z"
			/>
		</circle>
		<circle r="1.6" fill="#ffe9a8" opacity="0.3">
			<animateMotion
				dur="4.5s"
				repeatCount="indefinite"
				begin="-0.22s"
				path="M15,3 H155 Q167,3 167,15 V77 Q167,89 155,89 H15 Q3,89 3,77 V15 Q3,3 15,3 Z"
			/>
		</circle>
		<circle r="3.5" fill="#fff6db">
			<animateMotion
				dur="4.5s"
				repeatCount="indefinite"
				rotate="auto"
				path="M15,3 H155 Q167,3 167,15 V77 Q167,89 155,89 H15 Q3,89 3,77 V15 Q3,3 15,3 Z"
			/>
		</circle>
	</svg>
{/snippet}

<div class="tr-mode" role="group" aria-label={s.bookingTitle}>
	<button
		type="button"
		class="tr-mode__btn"
		class:tr-mode__btn--on={mode === 'now'}
		onclick={() => selectMode('now')}
	>
		{#if mode === 'now'}{@render comet()}{/if}
		<span class="tr-mode__main">{s.modeNowMain}</span>
	</button>
	<button
		type="button"
		class="tr-mode__btn"
		class:tr-mode__btn--on={mode === 'later'}
		onclick={() => selectMode('later')}
	>
		{#if mode === 'later'}{@render comet()}{/if}
		<span class="tr-mode__main">{s.modeLaterMain}</span>
	</button>
</div>

<div class="tr-calc" class:tr-calc--locked={mode === null} aria-disabled={mode === null}>
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
	<button type="button" class="tr-calc__send-loc" onclick={sendLocation} disabled={gpsBusy}>
		<span aria-hidden="true">📍</span>
		{gpsBusy ? s.gpsAsking : s.sendLocation}
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
			<div class="tr-calc__result-price">
				{#if isEstimate}~{/if}{fare} €
			</div>
			{#if isEstimate}
				<div class="tr-calc__estimate-tag">({s.estimateNote})</div>
			{/if}
			{#if isLongHaul}
				<div class="tr-calc__longhaul">⚠ {s.longHaulCaveat}</div>
			{/if}
			<div class="tr-calc__result-vehicle">{vehicleLabel}</div>
			{#if travelTimeText}
				<p class="tr-calc__result-inquiry">🕐 {s.travelTimeLabel}: {travelTimeText}</p>
			{/if}
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

		{#if mode !== 'now'}
			<div class="tr-calc__two-col">
				<label class="tr-calc__field">
					<span class="tr-calc__label">{s.date}</span>
					<input
						class="tr-calc__input"
						type="date"
						bind:value={date}
						min={today}
						aria-label={s.date}
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
		{/if}

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
			<span class="tr-calc__label">{s.phone}</span>
			<input class="tr-calc__input" type="tel" bind:value={phone} placeholder="+385…" />
		</label>

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
	/* Dark calculator panel on the page's beige background.
	   Re-maps the global theme tokens for everything inside .tr-calc so app.css
	   rules that reference these vars resolve to dark values automatically.
	   Accent stays brand rust (#a84c28) for cohesion with the rest of the page. */
	:global(.tr-calc) {
		--bg: #14171c;
		--fg: #f2f1ec;
		--muted: #9aa0aa;
		--soft: #1b1f26;
		--line: rgba(255, 255, 255, 0.1);
		--line-strong: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.08) !important;
	}
	/* Result panel uses bg+fg inverted in app.css; remap so it stays dark. */
	:global(.tr-calc__result) {
		background: #1b1f26 !important;
		color: var(--fg) !important;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}
	:global(.tr-calc__result-price) {
		color: #d6764e !important;
	}
	:global(.tr-calc__result-vehicle) {
		border-color: rgba(255, 255, 255, 0.18);
		color: var(--muted);
	}
	.tr-calc__estimate-tag {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in srgb, #d6764e 70%, white 30%);
		margin: -2px 0 10px;
		opacity: 0.85;
	}
	.tr-calc__longhaul {
		display: inline-block;
		margin: 4px auto 12px;
		padding: 8px 14px;
		max-width: 44ch;
		background: color-mix(in srgb, #d6764e 14%, transparent);
		border: 1px solid color-mix(in srgb, #d6764e 50%, transparent);
		border-radius: 2px;
		font-size: 12.5px;
		line-height: 1.5;
		color: color-mix(in srgb, #d6764e 75%, white 25%);
		text-align: left;
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

	/* ── Welcome banner (animated multilingual greeting) ─────────────── */
	.tr-welcome {
		background: var(--accent);
		border-radius: 2px;
		padding: clamp(28px, 4vw, 40px) 22px;
		text-align: center;
		min-height: 86px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 18px;
	}
	.tr-welcome__word {
		font-family: var(--font-display, 'Cormorant Garamond', Georgia, serif);
		font-weight: 500;
		color: #fff;
		line-height: 1.15;
		transition: opacity 0.5s ease;
		opacity: 1;
		text-align: center;
		padding: 0 8px;
	}
	/* Font scales to word length so long phrases stay inside the fixed box. */
	.tr-welcome__word.is-lg {
		font-size: clamp(34px, 9vw, 46px);
	}
	.tr-welcome__word.is-md {
		font-size: clamp(28px, 7vw, 38px);
	}
	.tr-welcome__word.is-sm {
		font-size: clamp(22px, 5.6vw, 30px);
	}
	.tr-welcome__word--hidden {
		opacity: 0;
	}

	/* ── Mode picker (now / later) ───────────────────────────────────── */
	.tr-mode {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-bottom: 18px;
	}
	.tr-mode__btn {
		position: relative;
		overflow: hidden;
		background: #14171c;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 2px;
		padding: 18px 12px;
		min-height: 58px;
		text-align: center;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.18s ease, background 0.18s ease;
	}
	.tr-mode__btn:hover {
		border-color: var(--accent);
	}
	/* Active: solid rust + white text. This is the guaranteed cue — it always
	   works even when the comet animation below cannot run. */
	.tr-mode__btn--on {
		background: #a84c28;
		border-color: #a84c28;
	}
	.tr-mode__main {
		position: relative;
		z-index: 1;
		font-size: clamp(18px, 2.4vw, 20px);
		font-weight: 600;
		color: #5a5f68;
		transition: color 0.18s ease;
	}
	.tr-mode__btn--on .tr-mode__main {
		color: #fff;
	}
	.tr-mode__comet {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	/* ── Locked calculator (until a mode is chosen) ──────────────────── */
	.tr-calc--locked {
		opacity: 0.45;
		pointer-events: none;
		user-select: none;
		transition: opacity 0.2s ease;
	}
</style>

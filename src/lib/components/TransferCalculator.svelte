<script lang="ts">
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';
	import flatpickr from 'flatpickr';
	import { Croatian } from 'flatpickr/dist/l10n/hr.js';
	import { German } from 'flatpickr/dist/l10n/de.js';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import 'flatpickr/dist/flatpickr.css';
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
		datePlaceholder: string;
		time: string;
		timePlaceholder: string;
		note: string;
		notePh: string;
		vatIncl: string;
		errorRoute: string;
		errorName: string;
		errorDateTime: string;
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
		modePrompt: string;
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
		/** Partner deep-link pickup to prefill (label + coords; see /monumenti). */
		prefillPickup?: { label: string; lat: number; lng: number };
	};

	let {
		lang,
		strings: s,
		whatsAppNumber,
		phoneNumber,
		emailAddress,
		prefillPickup
	}: Props = $props();

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
	let bookErrorMsg = $state('');

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

	// ── Date picker ───────────────────────────────────────────────────────
	// Native <input type="date"> renders its format + calendar in the OS locale:
	// a US-English desktop shows mm/dd/yyyy and an English calendar even when the
	// page is HR/DE. flatpickr pins the display to dd.mm.yyyy on every device and
	// localizes the calendar to the page language (set once at mount — switching
	// language navigates to a new URL, which remounts this component). The stored
	// value stays ISO (yyyy-mm-dd) so the WhatsApp/message builders are untouched.
	function toISODate(d: Date): string {
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
			d.getDate()
		).padStart(2, '0')}`;
	}

	const datePicker: Action<HTMLInputElement> = (node) => {
		const locale = lang === 'hr' ? Croatian : lang === 'de' ? German : 'default';
		const fp = flatpickr(node, {
			dateFormat: 'd.m.Y', // always dd.mm.yyyy — never the OS-default US format
			locale,
			minDate: 'today',
			disableMobile: true, // force the same localized calendar on mobile too
			defaultDate: date ? new Date(date) : undefined,
			onChange: (selected) => {
				date = selected[0] ? toISODate(selected[0]) : '';
			}
		}) as Instance;
		return {
			destroy() {
				fp.destroy();
			}
		};
	};

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
				// Keep suggestions to Croatia only so users don't
				// see foreign addresses in the dropdown.
				componentRestrictions: { country: 'hr' }
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
				const leg = res.routes?.[0]?.legs?.[0];
				if (!leg) {
					routeStatus = 'error';
					return;
				}
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

	// Prefill the pickup from a partner deep-link (e.g. /monumenti). Coords come
	// from the partner map, so fromPlace gets a real location and a route + price
	// computes the moment the guest enters a destination — no Geocoding API call
	// (the project's key doesn't have it enabled). If Maps failed to load we at
	// least show the label so the guest sees their pickup.
	function applyPickupPrefill(pickup: { label: string; lat: number; lng: number }) {
		fromText = pickup.label;
		if (mapsError || !window.google?.maps) return;
		fromPlace = {
			name: pickup.label,
			formatted_address: pickup.label,
			geometry: { location: new google.maps.LatLng(pickup.lat, pickup.lng) }
		} as google.maps.places.PlaceResult;
		maybeRunRoute();
	}

	onMount(() => {
		initMaps().then(() => {
			if (prefillPickup) {
				// Partner deep-link: default to "now" so the guest meets an active
				// calculator (pickup already filled) instead of a greyed-out gate.
				// The now/later buttons stay, so they can switch to a scheduled ride.
				selectMode('now');
				applyPickupPrefill(prefillPickup);
			}
		});
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

	// One-tap navigation: opens Google Maps directions straight to this point
	// with the driver's current location as origin (dir + destination only →
	// Maps fills in "from here"). Actual turn-by-turn nav, not a search pin.
	function buildNavLink(addr: string): string {
		return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}&travelmode=driving`;
	}

	// Full-route link (origin → destination) — the route-overview preview that
	// shows distance/time end to end.
	function buildDirLink(): string {
		const origin = encodeURIComponent(fromFullText());
		const destination = encodeURIComponent(toFullText());
		return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
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
		L.push(`From: ${buildNavLink(fromFullText())}`);
		L.push(`To: ${buildNavLink(toFullText())}`);

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
		// Cause-specific messages: a single generic "enter name, date and time"
		// misled users — in "now" mode date/time are hidden, so when the real
		// blocker was a missing route (address typed but no suggestion picked →
		// no price), the error wrongly demanded fields they couldn't see.
		if (routeStatus !== 'ok' || fare === null) {
			bookErrorMsg = s.errorRoute;
			errorBook = true;
			ev.preventDefault();
			return;
		}
		if (!name.trim()) {
			bookErrorMsg = s.errorName;
			errorBook = true;
			ev.preventDefault();
			return;
		}
		// Date/time are auto-filled in "now" mode; only "later" can miss them.
		if (mode === 'later' && (!date || !time)) {
			bookErrorMsg = s.errorDateTime;
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

<div class="tr-mode" role="group" aria-label={s.bookingTitle}>
	<button
		type="button"
		class="tr-mode__btn"
		class:tr-mode__btn--on={mode === 'now'}
		onclick={() => selectMode('now')}
	>
		<span class="tr-mode__main">{s.modeNowMain}</span>
	</button>
	<button
		type="button"
		class="tr-mode__btn"
		class:tr-mode__btn--on={mode === 'later'}
		onclick={() => selectMode('later')}
	>
		<span class="tr-mode__main">{s.modeLaterMain}</span>
	</button>
</div>

{#if mode === null}
	<p class="tr-mode__hint">↑ {s.modePrompt}</p>
{/if}

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
						class="tr-calc__input tr-calc__date"
						type="text"
						use:datePicker
						placeholder={s.datePlaceholder}
						readonly
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
				<input class="tr-calc__input" type="number" min="1" max="7" bind:value={paxCount} />
			</label>
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.fullName}</span>
				<input class="tr-calc__input" type="text" bind:value={name} placeholder={s.fullNamePh} />
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
			<p class="tr-calc__error">{bookErrorMsg}</p>
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
	/* ── flatpickr calendar, themed to the dark calculator panel ───────────
	   The popup is portalled outside this component, so it needs :global. Brand
	   rust (#a84c28) marks today / selected; greys match the panel tokens. */
	:global(.flatpickr-calendar) {
		background: #1b1f26;
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
	}
	:global(.flatpickr-calendar.arrowTop::before),
	:global(.flatpickr-calendar.arrowTop::after) {
		border-bottom-color: #1b1f26;
	}
	:global(.flatpickr-calendar.arrowBottom::before),
	:global(.flatpickr-calendar.arrowBottom::after) {
		border-top-color: #1b1f26;
	}
	:global(.flatpickr-months .flatpickr-month),
	:global(.flatpickr-current-month .flatpickr-monthDropdown-months),
	:global(.flatpickr-current-month input.cur-year) {
		color: #f2f1ec;
		fill: #f2f1ec;
	}
	:global(.flatpickr-monthDropdown-months) {
		background: #1b1f26;
	}
	:global(span.flatpickr-weekday) {
		color: #9aa0aa;
	}
	:global(.flatpickr-prev-month svg),
	:global(.flatpickr-next-month svg) {
		fill: #f2f1ec;
	}
	:global(.flatpickr-prev-month:hover svg),
	:global(.flatpickr-next-month:hover svg) {
		fill: #a84c28;
	}
	:global(.flatpickr-day) {
		color: #e8e7e2;
	}
	:global(.flatpickr-day:hover),
	:global(.flatpickr-day:focus) {
		background: rgba(168, 76, 40, 0.22);
		border-color: transparent;
	}
	:global(.flatpickr-day.today) {
		border-color: #a84c28;
	}
	:global(.flatpickr-day.selected),
	:global(.flatpickr-day.selected:hover) {
		background: #a84c28;
		border-color: #a84c28;
		color: #fff;
	}
	:global(.flatpickr-day.flatpickr-disabled),
	:global(.flatpickr-day.prevMonthDay),
	:global(.flatpickr-day.nextMonthDay) {
		color: rgba(255, 255, 255, 0.25);
	}

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
		/* The single biggest, most important number on the screen — pure white
		   and larger so it reads instantly in sun (was rust = near-invisible). */
		color: #ffffff !important;
		font-size: clamp(48px, 13vw, 62px) !important;
		font-weight: 600 !important;
	}
	:global(.tr-calc__result-route) {
		color: #ffffff !important;
		opacity: 1 !important;
		font-size: 13px !important;
		font-weight: 600 !important;
	}
	:global(.tr-calc__result-inquiry) {
		color: #ffffff !important;
		opacity: 1 !important;
		font-size: 14px !important;
		font-weight: 600 !important;
		font-style: normal !important;
	}
	:global(.tr-calc__result-vehicle) {
		border-color: rgba(255, 255, 255, 0.4) !important;
		color: #ffffff !important;
		opacity: 1 !important;
	}
	.tr-calc__estimate-tag {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #f3e7e0;
		margin: -2px 0 10px;
		opacity: 1;
	}
	.tr-calc__longhaul {
		display: inline-block;
		margin: 4px auto 12px;
		padding: 8px 14px;
		max-width: 44ch;
		background: color-mix(in srgb, #d6764e 14%, transparent);
		border: 1px solid color-mix(in srgb, #d6764e 50%, transparent);
		border-radius: 2px;
		font-size: 13px;
		line-height: 1.5;
		color: #ffffff;
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
		font-size: 13px;
		font-weight: 600;
		color: #ffffff;
		background: transparent;
		border: 0;
		/* White, so persistent underline keeps the "this is tappable" cue. */
		text-decoration: underline;
		text-decoration-color: rgba(255, 255, 255, 0.45);
		text-underline-offset: 3px;
		cursor: pointer;
		font-family: inherit;
	}
	.tr-calc__send-loc:hover {
		text-decoration-color: #ffffff;
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
		transition:
			border-color 0.18s ease,
			background 0.18s ease;
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
		font-weight: 700;
		color: #ffffff;
	}
	/* Active vehicle is shown by the rust border + tinted fill, not rust text. */
	.tr-calc__veh-btn--on .tr-calc__veh-title {
		color: #ffffff;
	}
	.tr-calc__veh-sub {
		font-size: 12px;
		font-weight: 500;
		color: #ffffff;
	}

	.tr-calc__maps-warn {
		margin-bottom: 18px;
		padding: 12px 14px;
		background: color-mix(in srgb, var(--accent) 6%, var(--bg));
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		border-radius: 2px;
		font-size: 13px;
		color: #ffffff;
		line-height: 1.5;
	}

	.tr-calc__loading {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #ffffff;
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
		padding: 14px;
		border: 1px solid var(--line-strong);
		border-radius: 2px;
		font-size: 16px;
		font-weight: 600;
		color: #ffffff;
		text-decoration: none;
		transition:
			border-color 0.18s ease,
			color 0.18s ease;
	}
	.tr-calc__quick:hover {
		border-color: var(--accent);
		color: var(--fg);
	}
	.tr-calc__quick--gold {
		border-color: color-mix(in srgb, var(--accent) 70%, transparent);
		color: #ffffff;
	}

	.tr-calc__hours {
		margin-top: 14px;
		text-align: center;
		font-size: 13px;
		color: #f5f5f5;
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
		font-weight: 700;
		color: #ffffff;
		line-height: 1.15;
		transition: opacity 0.5s ease;
		opacity: 1;
		text-align: center;
		padding: 0 8px;
		/* Depth so the white serif holds up against the rust panel in sunlight. */
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
	}
	/* Font scales to word length so long phrases stay inside the fixed box. */
	.tr-welcome__word.is-lg {
		font-size: clamp(32px, 9vw, 44px);
	}
	.tr-welcome__word.is-md {
		font-size: clamp(26px, 7vw, 36px);
	}
	.tr-welcome__word.is-sm {
		font-size: clamp(22px, 5.6vw, 28px);
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
	/* Gate prompt — shown only while no mode is chosen, so the dimmed calculator
	   reads as "pick one first" rather than broken. On the light page bg, dark
	   rust is the high-contrast choice (not white). */
	.tr-mode__hint {
		margin: -8px 0 18px;
		text-align: center;
		font-size: 13px;
		font-weight: 600;
		color: #9a4a2a;
	}
	.tr-mode__btn {
		position: relative;
		overflow: hidden;
		background: #0d0f12;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 2px;
		padding: 18px 12px;
		min-height: 58px;
		text-align: center;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			border-color 0.18s ease,
			background 0.18s ease;
	}
	.tr-mode__btn:hover {
		border-color: var(--accent);
	}
	/* Active: solid rust + white text — the guaranteed cue, independent of the
	   animated border beam below (which is purely decorative). */
	.tr-mode__btn--on {
		background: #a84c28;
		border-color: #a84c28;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
	}
	.tr-mode__main {
		position: relative;
		z-index: 1;
		font-size: clamp(17px, 2.4vw, 20px);
		font-weight: 600;
		/* White even when inactive — gray was invisible in direct sun. The active
		   box is set apart by its rust fill + heavier weight, never by colour. */
		color: #ffffff;
		transition: color 0.18s ease;
	}
	.tr-mode__btn--on .tr-mode__main {
		color: #ffffff;
		font-weight: 700;
		letter-spacing: 0.02em;
		/* White-on-rust is the tightest contrast pair (5.6:1); the shadow lifts the
		   glyph edges so the active label stays crisp under glare. */
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
	/* Active cue: a light beam that sweeps the button border on a loop. A masked
	   conic-gradient ring — resolution-independent, stays exactly on the border
	   at any size, and never touches layout, so the button can't appear to
	   resize. (The old SVG comet distorted under non-uniform scaling, which read
	   as the edge "breathing".) */
	@property --tr-beam {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}
	.tr-mode__btn--on::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: inherit;
		padding: 1.5px;
		background: conic-gradient(
			from var(--tr-beam),
			transparent 0deg 290deg,
			rgba(255, 233, 168, 0.7) 325deg,
			#fff6db 348deg,
			rgba(255, 233, 168, 0.7) 360deg
		);
		-webkit-mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		animation: tr-beam-spin 4.5s linear infinite;
	}
	@keyframes tr-beam-spin {
		to {
			--tr-beam: 360deg;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.tr-mode__btn--on::after {
			animation: none;
		}
	}

	/* ── Locked calculator (until a mode is chosen) ──────────────────── */
	.tr-calc--locked {
		/* Dimmed = "pick now/later first", but not so faint the price/fields wash
		   out in direct sun before a mode is chosen. */
		opacity: 0.65;
		pointer-events: none;
		user-select: none;
		transition: opacity 0.2s ease;
	}
</style>

<script lang="ts">
	import {
		prices,
		travelTime,
		destinationsFor,
		destLabel,
		originLabel,
		originShortLabel,
		type Origin,
		type PaxKind,
		type Lang
	} from '$lib/data/transferPricing';
	import DateInput from './DateInput.svelte';

	type CalcStrings = {
		title: string;
		vatNote: string;
		pickup: string;
		pickupPlaceholder: string;
		pickupAirport: string;
		pickupPula: string;
		pickupCustom: string;
		yourPickup: string;
		yourPickupPh: string;
		yourDest: string;
		yourDestPh: string;
		customNote: string;
		destination: string;
		destinationPlaceholder: string;
		destinationCustom: string;
		passengers: string;
		eClass: string;
		eClassRange: string;
		vClass: string;
		vClassRange: string;
		calculate: string;
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
		nightNotice: string;
		flight: string;
		flightPh: string;
		note: string;
		notePh: string;
		addReturn: string;
		returnDiscount: string;
		returnDate: string;
		returnTime: string;
		returnNoteLabel: string;
		nightTag: string;
		termsTitle: string;
		terms: string[];
		orderSummary: string;
		outbound: string;
		returnRow: string;
		total: string;
		vatIncl: string;
		errorBook: string;
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

	// Form state
	let origin = $state<'' | Origin | 'custom'>('');
	let destination = $state<string>(''); // canonical key or 'custom_dest'
	let pax = $state<PaxKind>('small');
	let customOrigin = $state('');
	let customDest = $state('');

	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('');
	let flight = $state('');
	let note = $state('');
	let returnEnabled = $state(false);
	let returnDate = $state('');
	let returnTime = $state('');

	// UI flags
	let errorRoute = $state(false);
	let errorBook = $state(false);
	let resultShown = $state(false);

	let timeOptions = generateTimes();
	function generateTimes() {
		const list: string[] = [];
		for (let h = 0; h < 24; h++) {
			for (const m of [0, 30]) {
				list.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
			}
		}
		return list;
	}

	const today = new Date().toISOString().split('T')[0];

	// Resolved labels / data after Calculate is pressed
	type CurrentData = {
		originLabel: string;
		destLabel: string;
		vehicleLabel: string;
		oneWay: number | null; // null when inquiry
		isInquiry: boolean;
	};
	let current = $state<CurrentData | null>(null);

	// Reset visible result + booking when inputs change
	function resetResult() {
		resultShown = false;
		errorRoute = false;
		errorBook = false;
		returnEnabled = false;
		current = null;
	}

	// When origin changes, reset destination since the list depends on origin.
	$effect.pre(() => {
		// Pure tracking — Svelte will re-run on origin change
		origin;
		destination = '';
		resetResult();
	});

	let destOptions = $derived<string[]>(
		origin === 'airport' || origin === 'pula' ? destinationsFor(origin) : []
	);
	let showCustomOrigin = $derived(origin === 'custom');
	let showDestSelect = $derived(origin === 'airport' || origin === 'pula');
	let isCustomDest = $derived(destination === 'custom_dest');

	let vehicleLabel = $derived(
		pax === 'small'
			? `${s.eClass} · ${s.eClassRange}`
			: `${s.vClass} · ${s.vClassRange}`
	);

	function calculate() {
		errorRoute = false;
		resultShown = false;

		if (origin === 'custom') {
			const co = customOrigin.trim();
			const cd = customDest.trim();
			if (!co || !cd) {
				errorRoute = true;
				return;
			}
			current = {
				originLabel: co,
				destLabel: cd,
				vehicleLabel,
				oneWay: null,
				isInquiry: true
			};
		} else if (origin === 'airport' || origin === 'pula') {
			if (!destination) {
				errorRoute = true;
				return;
			}
			if (destination === 'custom_dest') {
				current = {
					originLabel: originShortLabel(origin, lang),
					destLabel: s.destinationCustom,
					vehicleLabel,
					oneWay: null,
					isInquiry: true
				};
			} else {
				const row = prices[origin][destination];
				if (!row) {
					errorRoute = true;
					return;
				}
				const fare = pax === 'small' ? row[0] : row[1];
				current = {
					originLabel: originShortLabel(origin, lang),
					destLabel: destLabel(destination, lang),
					vehicleLabel,
					oneWay: fare,
					isInquiry: false
				};
			}
		} else {
			errorRoute = true;
			return;
		}

		resultShown = true;
		// scroll booking into view
		setTimeout(() => {
			document
				.getElementById('tr-booking')
				?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 250);
	}

	// Derived computed pricing for the result + summary
	let parsedHour = $derived(time ? parseInt(time.split(':')[0], 10) : -1);
	let isNight = $derived(parsedHour >= 22 || (parsedHour >= 0 && parsedHour < 6));
	let baseFare = $derived.by(() => {
		if (!current || current.oneWay === null) return null;
		return isNight ? Math.round(current.oneWay * 1.25) : current.oneWay;
	});
	let returnFare = $derived.by(() => {
		if (!current || current.oneWay === null || !returnEnabled) return null;
		const base = Math.round(current.oneWay * 0.9);
		return isNight ? Math.round(base * 1.25) : base;
	});
	let totalFare = $derived.by(() => {
		if (baseFare === null) return null;
		return baseFare + (returnFare ?? 0);
	});

	function fmtDate(d: string) {
		if (!d) return '';
		const map: Record<Lang, string> = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE' };
		try {
			return new Date(d).toLocaleDateString(map[lang], {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return d;
		}
	}

	let travelTimeText = $derived.by(() => {
		if (!current || current.isInquiry) return '';
		if (origin !== 'airport' && origin !== 'pula') return '';
		const key = destination;
		const t = travelTime[origin][key];
		return t ? `${s.travelTimeLabel}: ${t}` : '';
	});

	function sendWhatsApp() {
		errorBook = false;
		if (!current) return;
		if (!name.trim() || !phone.trim() || !date || !time) {
			errorBook = true;
			return;
		}

		const emoji = current.isInquiry ? '❓' : '🚗';
		const type = current.isInquiry ? s.sendInquiry : s.sendBooking;

		let msg = `${emoji} *${type.toUpperCase()} – SPRINTER*\n\n`;
		msg += `📍 *${s.travelTimeLabel.split(':')[0] || 'Route'}:* ${current.originLabel} → ${current.destLabel}\n`;
		msg += `🚘 *${s.passengers}:* ${current.vehicleLabel}\n`;

		if (current.isInquiry) {
			msg += `💶 *${s.onRequest}:* ON REQUEST\n`;
		} else if (returnEnabled && returnFare !== null && baseFare !== null) {
			msg += `💶 *${s.total}:* ${totalFare} € (${s.vatIncl})\n`;
			msg += `   ↗ ${s.outbound}: ${baseFare} €${isNight ? ' (+25% night)' : ''}\n`;
			msg += `   ↙ ${s.returnRow}: ${returnFare} € (−10%)\n`;
		} else {
			msg += `💶 *${s.total}:* ${baseFare} €${isNight ? ' (+25% night)' : ''} (${s.vatIncl})\n`;
		}

		msg += `\n👤 *${s.fullName}:* ${name.trim()}\n`;
		msg += `📞 *${s.phone}:* ${phone.trim()}\n`;
		if (email.trim()) msg += `📧 *${s.email}:* ${email.trim()}\n`;
		msg += `\n✈️ *${s.outbound.toUpperCase()}*\n`;
		msg += `📅 ${s.date}: ${fmtDate(date)}\n`;
		msg += `🕐 ${s.time}: ${time}${isNight ? ' 🌙' : ''}\n`;
		if (flight.trim()) msg += `✈️ ${s.flight}: ${flight.trim()}\n`;

		if (returnEnabled && returnDate && returnTime) {
			msg += `\n🔄 *${s.returnRow.toUpperCase()}*\n`;
			msg += `📅 ${s.date}: ${fmtDate(returnDate)}\n`;
			msg += `🕐 ${s.time}: ${returnTime}\n`;
		}

		if (note.trim()) msg += `\n📝 *${s.note}:* ${note.trim()}`;

		const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(msg)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<div class="tr-calc">
	<div class="tr-calc__title">
		{s.title}
		<span class="tr-calc__title-sub">({s.vatNote})</span>
	</div>

	<!-- Pick-up -->
	<label class="tr-calc__field">
		<span class="tr-calc__label">{s.pickup}</span>
		<select class="tr-calc__input" bind:value={origin}>
			<option value="">{s.pickupPlaceholder}</option>
			<option value="airport">{s.pickupAirport}</option>
			<option value="pula">{s.pickupPula}</option>
			<option value="custom">📍 {s.pickupCustom}</option>
		</select>
	</label>

	<!-- Custom origin / destination -->
	{#if showCustomOrigin}
		<div class="tr-calc__custom">
			<p class="tr-calc__custom-note">{s.customNote}</p>
			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.yourPickup}</span>
				<input
					class="tr-calc__input"
					type="text"
					bind:value={customOrigin}
					placeholder={s.yourPickupPh}
				/>
			</label>
			<label class="tr-calc__field" style="margin-bottom:0">
				<span class="tr-calc__label">{s.yourDest}</span>
				<input
					class="tr-calc__input"
					type="text"
					bind:value={customDest}
					placeholder={s.yourDestPh}
				/>
			</label>
		</div>
	{/if}

	<!-- Destination -->
	{#if showDestSelect}
		<label class="tr-calc__field">
			<span class="tr-calc__label">{s.destination}</span>
			<select class="tr-calc__input" bind:value={destination}>
				<option value="">{s.destinationPlaceholder}</option>
				{#each destOptions as key (key)}
					<option value={key}>{destLabel(key, lang)}</option>
				{/each}
				<option value="custom_dest">📍 {s.destinationCustom}</option>
			</select>
		</label>
	{/if}

	<!-- Passengers -->
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

	<button class="tr-calc__btn" type="button" onclick={calculate}>{s.calculate}</button>
	{#if errorRoute}
		<p class="tr-calc__error">{s.errorRoute}</p>
	{/if}

	<!-- Result -->
	{#if resultShown && current}
		<div class="tr-calc__result">
			<div class="tr-calc__result-route">{current.originLabel} → {current.destLabel}</div>
			<div class="tr-calc__result-price">
				{#if current.isInquiry}
					{s.onRequest}
				{:else}
					{totalFare ?? baseFare} €
				{/if}
			</div>
			<div class="tr-calc__result-vehicle">{current.vehicleLabel}</div>

			{#if !current.isInquiry && returnEnabled && returnFare !== null && baseFare !== null}
				<div class="tr-calc__breakdown">
					<div class="tr-calc__brk-row">
						<span>{s.outbound}</span>
						<span>
							{baseFare} €
							{#if isNight}<small class="tr-calc__night-tag">&nbsp;· {s.nightTag}</small>{/if}
						</span>
					</div>
					<div class="tr-calc__brk-row">
						<span>{s.returnRow} <small class="tr-calc__discount">(−10%)</small></span>
						<span>
							{returnFare} €
							{#if isNight}<small class="tr-calc__night-tag">&nbsp;· {s.nightTag}</small>{/if}
						</span>
					</div>
					<div class="tr-calc__brk-row tr-calc__brk-total">
						<span>{s.total}</span>
						<span>{totalFare} €</span>
					</div>
				</div>
			{:else if !current.isInquiry && isNight}
				<div class="tr-calc__brk-note">
					{s.outbound}: {current.oneWay} € · {s.nightTag} → {baseFare} €
				</div>
			{/if}

			{#if current.isInquiry}
				<p class="tr-calc__result-inquiry">{s.onRequestSub}</p>
			{:else if travelTimeText}
				<p class="tr-calc__result-inquiry">🕐 {travelTimeText}</p>
			{/if}
		</div>
	{/if}

	<!-- Booking section -->
	{#if resultShown && current}
		<div class="tr-calc__booking" id="tr-booking">
			<div class="tr-calc__title">
				{current.isInquiry ? s.bookingInquiry : s.bookingTitle}
			</div>

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.fullName}</span>
				<input class="tr-calc__input" type="text" bind:value={name} placeholder={s.fullNamePh} />
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
					<DateInput bind:value={date} min={today} aria-label={s.date} />
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

			{#if isNight && !current.isInquiry}
				<div class="tr-calc__night-notice">🌙 {s.nightNotice}</div>
			{/if}

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.flight}</span>
				<input class="tr-calc__input" type="text" bind:value={flight} placeholder={s.flightPh} />
			</label>

			<label class="tr-calc__field">
				<span class="tr-calc__label">{s.note}</span>
				<textarea class="tr-calc__input" bind:value={note} placeholder={s.notePh}></textarea>
			</label>

			{#if !current.isInquiry}
				<div class="tr-calc__return">
					<label class="tr-calc__return-check">
						<input type="checkbox" bind:checked={returnEnabled} />
						<span class="tr-calc__return-label">{s.addReturn}</span>
						<span class="tr-calc__discount-badge">{s.returnDiscount}</span>
					</label>

					{#if returnEnabled}
						<div class="tr-calc__return-fields">
							<div class="tr-calc__two-col">
								<label class="tr-calc__field" style="margin-bottom:0">
									<span class="tr-calc__label">{s.returnDate}</span>
									<DateInput bind:value={returnDate} min={date || today} aria-label={s.returnDate} />
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
									{s.returnNoteLabel}: <strong>{returnFare} €</strong> (−10%{isNight
										? ` · ${s.nightTag}`
										: ''})
								</p>
							{/if}
						</div>
					{/if}
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

			<!-- Total summary -->
			{#if !current.isInquiry && baseFare !== null}
				<div class="tr-calc__summary">
					<div class="tr-calc__summary-title">{s.orderSummary}</div>
					<div class="tr-calc__summary-rows">
						{#if name.trim()}<div>👤 {name.trim()}</div>{/if}
						<div>📍 {current.originLabel} → {current.destLabel}</div>
						<div>🚘 {current.vehicleLabel}</div>
						{#if date && time}
							<div>📅 {s.outbound}: {fmtDate(date)} · {time}{isNight ? ' 🌙' : ''}</div>
						{/if}
						{#if returnEnabled && returnDate && returnTime}
							<div>🔄 {s.returnRow}: {fmtDate(returnDate)} · {returnTime}</div>
						{/if}
					</div>
					<div class="tr-calc__summary-totals">
						<div class="tr-calc__brk-row">
							<span>{s.outbound}</span>
							<span>{baseFare} €{isNight ? ' 🌙' : ''}</span>
						</div>
						{#if returnEnabled && returnFare !== null}
							<div class="tr-calc__brk-row">
								<span>{s.returnRow} <small class="tr-calc__discount">(−10%)</small></span>
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
				<span>{current.isInquiry ? s.sendInquiry : s.sendBooking}</span>
			</button>

			<p class="tr-calc__form-note">{s.formNote}</p>
		</div>
	{/if}
</div>

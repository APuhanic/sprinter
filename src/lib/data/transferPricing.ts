// Cascading per-km tariff with a flat €/km past 100 km. No distance cap.

export type Vehicle = 'e' | 'v' | 'f';

const E_START = 4.0;
const V_START = 5.0;
// Ford wagon — the value option: lower start + lower per-km, landing at ~92%
// of the E-class fare across the whole range.
const F_START = 3.45;

// Flat per-km rate applied to the entire distance for trips beyond 100 km.
const E_FAR = 1.71;
const V_FAR = 2.23;
const F_FAR = 1.61;

// [upper bound of segment in km, €/km within that segment]
const E_SEG: ReadonlyArray<readonly [number, number]> = [
	[5, 2.5],
	[10, 2.3],
	[15, 2.1],
	[20, 1.9],
	[25, 1.8],
	[30, 1.75],
	[35, 1.7],
	[40, 1.65],
	[45, 1.6],
	[50, 1.55],
	[60, 1.5],
	[70, 1.45],
	[80, 1.4],
	[95, 1.35],
	[100, 1.3]
];

const V_SEG: ReadonlyArray<readonly [number, number]> = [
	[5, 3.5],
	[10, 3.1],
	[15, 2.85],
	[20, 2.6],
	[25, 2.4],
	[30, 2.3],
	[35, 2.2],
	[40, 2.1],
	[45, 2.05],
	[50, 2.0],
	[60, 1.9],
	[70, 1.85],
	[80, 1.8],
	[95, 1.75],
	[100, 1.7]
];

const F_SEG: ReadonlyArray<readonly [number, number]> = [
	[5, 2.3],
	[10, 2.13],
	[15, 1.96],
	[20, 1.78],
	[25, 1.67],
	[30, 1.61],
	[35, 1.55],
	[40, 1.5],
	[45, 1.47],
	[50, 1.44],
	[60, 1.38],
	[70, 1.36],
	[80, 1.32],
	[95, 1.29],
	[100, 1.27]
];

// Promotional discount taken off every fare the calculator produces — the
// cascading per-km tariff and the flat >100 km rate alike. Set a share to 0 to
// end that vehicle's promo.
const DISCOUNT: Record<Vehicle, number> = { e: 0.15, v: 0.2, f: 0 };

const START: Record<Vehicle, number> = { e: E_START, v: V_START, f: F_START };
const FAR: Record<Vehicle, number> = { e: E_FAR, v: V_FAR, f: F_FAR };
const SEG: Record<Vehicle, ReadonlyArray<readonly [number, number]>> = {
	e: E_SEG,
	v: V_SEG,
	f: F_SEG
};

export function calcFare(km: number, vehicle: Vehicle): number | null {
	if (km <= 0) return null;

	// Discount the gross fare, then round once — so the shown price is always the
	// discounted one, whichever branch produced it.
	const net = (gross: number) => Math.round(gross * (1 - DISCOUNT[vehicle]));

	if (km > 100) {
		return net(km * FAR[vehicle]);
	}

	let total = START[vehicle];
	let prev = 0;
	for (const [to, rate] of SEG[vehicle]) {
		if (km <= prev) break;
		total += (Math.min(km, to) - prev) * rate;
		prev = to;
	}
	return net(total);
}

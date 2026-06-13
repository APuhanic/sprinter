// Cascading per-km tariff with a flat €/km past 100 km. No distance cap.

export type Vehicle = 'e' | 'v' | 'f';

const E_START = 4.0;
const V_START = 5.0;
// Ford wagon — the value option: lower start + lower per-km, landing at ~80%
// of the E-class fare across the whole range.
const F_START = 3.0;

// Flat per-km rate applied to the entire distance for trips beyond 100 km.
const E_FAR = 1.71;
const V_FAR = 2.23;
const F_FAR = 1.4;

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
	[5, 2.0],
	[10, 1.85],
	[15, 1.7],
	[20, 1.55],
	[25, 1.45],
	[30, 1.4],
	[35, 1.35],
	[40, 1.3],
	[45, 1.28],
	[50, 1.25],
	[60, 1.2],
	[70, 1.18],
	[80, 1.15],
	[95, 1.12],
	[100, 1.1]
];

const START: Record<Vehicle, number> = { e: E_START, v: V_START, f: F_START };
const FAR: Record<Vehicle, number> = { e: E_FAR, v: V_FAR, f: F_FAR };
const SEG: Record<Vehicle, ReadonlyArray<readonly [number, number]>> = {
	e: E_SEG,
	v: V_SEG,
	f: F_SEG
};

export function calcFare(km: number, vehicle: Vehicle): number | null {
	if (km <= 0) return null;

	if (km > 100) {
		return Math.round(km * FAR[vehicle]);
	}

	let total = START[vehicle];
	let prev = 0;
	for (const [to, rate] of SEG[vehicle]) {
		if (km <= prev) break;
		total += (Math.min(km, to) - prev) * rate;
		prev = to;
	}
	return Math.round(total);
}

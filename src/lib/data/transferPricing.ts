// Cascading per-km tariff with a flat €/km past 100 km. No distance cap.

export type Vehicle = 'e' | 'v';

const E_START = 4.0;
const V_START = 5.0;

// Flat per-km rate applied to the entire distance for trips beyond 100 km.
const E_FAR = 1.71;
const V_FAR = 2.23;

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

export function calcFare(km: number, vehicle: Vehicle): number | null {
	if (km <= 0) return null;

	if (km > 100) {
		const far = vehicle === 'e' ? E_FAR : V_FAR;
		return Math.round(km * far);
	}

	const seg = vehicle === 'e' ? E_SEG : V_SEG;
	const start = vehicle === 'e' ? E_START : V_START;

	let total = start;
	let prev = 0;
	for (const [to, rate] of seg) {
		if (km <= prev) break;
		total += (Math.min(km, to) - prev) * rate;
		prev = to;
	}
	return Math.round(total);
}

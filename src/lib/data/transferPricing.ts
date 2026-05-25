/**
 * Transfer tariff — Sprinter d.o.o.
 *
 * Per-km cascading tariff. The customer enters any pickup/destination address
 * (Google Places Autocomplete), Maps Directions returns the driving distance,
 * and this module turns that distance into a price.
 *
 * - Base "polazak" fare per vehicle (boarding fee)
 * - Each segment has its own €/km rate; rates fall as distance grows so longer
 *   trips are cheaper per km
 * - Trips beyond MAX_KM are inquiry-only — no auto-quote
 */

export type PaxKind = 'small' | 'large';
export type Vehicle = 'e' | 'v';

const E_START = 4.0;
const V_START = 5.0;

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

export const MAX_KM = 110;

/**
 * Returns the one-way fare in € (rounded to the nearest €), or null when the
 * distance exceeds MAX_KM (caller should switch to inquiry mode).
 */
export function calcFare(km: number, vehicle: Vehicle): number | null {
	if (km <= 0) return null;
	if (km > MAX_KM) return null;

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

export function vehicleFromPax(pax: PaxKind): Vehicle {
	return pax === 'small' ? 'e' : 'v';
}

import { describe, it, expect } from 'vitest';
import { calcFare } from './transferPricing';

describe('calcFare', () => {
	it('returns null for non-positive distance', () => {
		expect(calcFare(0, 'e')).toBeNull();
		expect(calcFare(-5, 'v')).toBeNull();
	});

	// Cascading per-km segment tariff for trips up to 100 km. Every expectation
	// below is post-promo: −15 % on the E-class, −20 % on the V-class.
	it('prices short economy trips via cascading segments', () => {
		expect(calcFare(5, 'e')).toBe(14); // 16.75 gross
		expect(calcFare(10, 'e')).toBe(24); // 28 gross
		expect(calcFare(50, 'e')).toBe(84); // 98.25 gross
		expect(calcFare(100, 'e')).toBe(143); // 168.75 gross
	});

	it('prices short van trips via cascading segments', () => {
		expect(calcFare(10, 'v')).toBe(30); // 38 gross
		expect(calcFare(100, 'v')).toBe(177); // 221.25 gross
	});

	// The 100 km flat-rate cliff (audit T-5): the instant distance exceeds
	// 100 km, a flat €/km applies to the WHOLE distance — a discontinuous
	// jump. Google Directions returns fractional km, so 100.x is realistic.
	// This test documents the current (intentional?) +2 jump; if the cliff is
	// ever judged a bug, change these expectations alongside the fix.
	it('jumps at the 100 km flat-rate cliff (economy)', () => {
		expect(calcFare(100, 'e')).toBe(143); // last segment-priced value
		expect(calcFare(100.01, 'e')).toBe(145); // +2 for a fraction of a km
		expect(calcFare(100.5, 'e')).toBe(146);
		expect(calcFare(101, 'e')).toBe(147);
		expect(calcFare(150, 'e')).toBe(218);
	});

	it('jumps at the 100 km flat-rate cliff (van)', () => {
		expect(calcFare(100, 'v')).toBe(177);
		expect(calcFare(100.01, 'v')).toBe(178);
		expect(calcFare(101, 'v')).toBe(180);
	});

	// Ford wagon — off-fleet and excluded from the promo, so its stored tariff is
	// unchanged. Kept under test so the numbers survive until the wagon returns.
	it('prices the Ford wagon via its cascading segments', () => {
		expect(calcFare(5, 'f')).toBe(15);
		expect(calcFare(10, 'f')).toBe(26);
		expect(calcFare(15, 'f')).toBe(35);
		expect(calcFare(20, 'f')).toBe(44);
		expect(calcFare(25, 'f')).toBe(53);
		expect(calcFare(30, 'f')).toBe(61);
		expect(calcFare(35, 'f')).toBe(68);
		expect(calcFare(45, 'f')).toBe(83);
		expect(calcFare(60, 'f')).toBe(104);
		expect(calcFare(80, 'f')).toBe(131);
		expect(calcFare(95, 'f')).toBe(150);
		expect(calcFare(100, 'f')).toBe(157);
	});

	it('applies the Ford flat far-rate past 100 km', () => {
		expect(calcFare(120, 'f')).toBe(193); // 120 · 1.61
		expect(calcFare(265, 'f')).toBe(427); // 265 · 1.61
	});

	// The Ford used to undercut the E-class at every distance. It no longer does:
	// the E-class carries a 15 % promo and the Ford, being off-fleet, carries none.
	// Re-tier the wagon (or give it a promo share) before putting it back on sale.
	it('leaves the Ford above the discounted E-class while it is off-fleet', () => {
		for (const km of [10, 25, 50, 100, 200]) {
			expect(calcFare(km, 'f')!).toBeGreaterThan(calcFare(km, 'e')!);
		}
	});

	it('discounts the E-class by 15 % and the V-class by 20 %', () => {
		// [km, vehicle, pre-promo fare] sampled across both pricing branches.
		const gross = [
			[10, 'e', 28],
			[100, 'e', 169],
			[150, 'e', 257],
			[10, 'v', 38],
			[100, 'v', 221],
			[101, 'v', 225]
		] as const;
		const share = { e: 0.15, v: 0.2 } as const;
		for (const [km, v, before] of gross) {
			// ±1 € of slack: the promo rounds once on the raw total, while the
			// reference above is the already-rounded gross fare.
			expect(Math.abs(calcFare(km, v)! - before * (1 - share[v]))).toBeLessThanOrEqual(1);
		}
	});
});

import { describe, it, expect } from 'vitest';
import { calcFare } from './transferPricing';

describe('calcFare', () => {
	it('returns null for non-positive distance', () => {
		expect(calcFare(0, 'e')).toBeNull();
		expect(calcFare(-5, 'v')).toBeNull();
	});

	// Cascading per-km segment tariff for trips up to 100 km.
	it('prices short economy trips via cascading segments', () => {
		expect(calcFare(5, 'e')).toBe(17);
		expect(calcFare(10, 'e')).toBe(28);
		expect(calcFare(50, 'e')).toBe(98);
		expect(calcFare(100, 'e')).toBe(169);
	});

	it('prices short van trips via cascading segments', () => {
		expect(calcFare(10, 'v')).toBe(38);
		expect(calcFare(100, 'v')).toBe(221);
	});

	// The 100 km flat-rate cliff (audit T-5): the instant distance exceeds
	// 100 km, a flat €/km applies to the WHOLE distance — a discontinuous
	// jump. Google Directions returns fractional km, so 100.x is realistic.
	// This test documents the current (intentional?) +2 jump; if the cliff is
	// ever judged a bug, change these expectations alongside the fix.
	it('jumps at the 100 km flat-rate cliff (economy)', () => {
		expect(calcFare(100, 'e')).toBe(169); // last segment-priced value
		expect(calcFare(100.01, 'e')).toBe(171); // +2 for a fraction of a km
		expect(calcFare(100.5, 'e')).toBe(172);
		expect(calcFare(101, 'e')).toBe(173);
		expect(calcFare(150, 'e')).toBe(257);
	});

	it('jumps at the 100 km flat-rate cliff (van)', () => {
		expect(calcFare(100, 'v')).toBe(221);
		expect(calcFare(100.01, 'v')).toBe(223);
		expect(calcFare(101, 'v')).toBe(225);
	});

	// Ford wagon — the value tier (~92% of the E-class fare after the 15% raise).
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

	it('keeps the Ford cheaper than the E-class at every distance', () => {
		for (const km of [3, 10, 25, 50, 90, 100, 120, 200]) {
			expect(calcFare(km, 'f')!).toBeLessThan(calcFare(km, 'e')!);
		}
	});
});

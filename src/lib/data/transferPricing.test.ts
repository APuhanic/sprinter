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

	// Ford wagon — the value tier (~80% of the E-class fare). The owner's
	// verification table is reproduced here; every distance matches it except
	// 20 km, where the segment total lands on an exact half-euro (38.5). The
	// shared round-half-up (identical to E-class, whose 5 km total of 16.5 → 17)
	// yields 39, not the 38 in the hand-check. Real routes return fractional km,
	// so an exact 20.0 km never occurs in practice.
	it('prices the Ford wagon via its cascading segments', () => {
		expect(calcFare(5, 'f')).toBe(13);
		expect(calcFare(10, 'f')).toBe(22);
		expect(calcFare(15, 'f')).toBe(31);
		expect(calcFare(20, 'f')).toBe(39); // owner's table notes 38 (38.5, rounded half-up)
		expect(calcFare(25, 'f')).toBe(46);
		expect(calcFare(30, 'f')).toBe(53);
		expect(calcFare(35, 'f')).toBe(60);
		expect(calcFare(45, 'f')).toBe(72);
		expect(calcFare(60, 'f')).toBe(91);
		expect(calcFare(80, 'f')).toBe(114);
		expect(calcFare(95, 'f')).toBe(131);
		expect(calcFare(100, 'f')).toBe(136);
	});

	it('applies the Ford flat far-rate past 100 km', () => {
		expect(calcFare(120, 'f')).toBe(168); // 120 · 1.40
		expect(calcFare(265, 'f')).toBe(371); // 265 · 1.40
	});

	it('keeps the Ford cheaper than the E-class at every distance', () => {
		for (const km of [3, 10, 25, 50, 90, 100, 120, 200]) {
			expect(calcFare(km, 'f')!).toBeLessThan(calcFare(km, 'e')!);
		}
	});
});

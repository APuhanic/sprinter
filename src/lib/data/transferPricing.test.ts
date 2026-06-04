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
});

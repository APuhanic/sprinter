/**
 * Transfer pricing — Sprinter d.o.o.
 *
 * Prices are stored per origin (airport / pula) → destination, with two columns:
 *   [E-Class fare, V-Class fare] in € including VAT.
 *
 * Destination *keys* are canonical (mostly place names). They are also the default
 * English label. For other languages, `destinationLabels` provides overrides.
 */

export type Origin = 'airport' | 'pula';
export type PaxKind = 'small' | 'large';

export const prices: Record<Origin, Record<string, [number, number]>> = {
	airport: {
		Pula: [30, 40],
		Verudela: [40, 50],
		Fažana: [40, 50],
		'Marina Veruda': [40, 50],
		'Banjole (Hotel Delmar)': [40, 60],
		'Ližnjan (Hotel Emotion)': [50, 60],
		Medulin: [40, 50],
		Stinjan: [40, 50],
		Rovinj: [75, 95],
		Vrsar: [85, 115],
		Poreč: [95, 125],
		Novigrad: [145, 185],
		Umag: [145, 185],
		Rabac: [90, 120],
		Opatija: [165, 210],
		'Mali Lošinj': [340, 420],
		Rijeka: [150, 200],
		'Rijeka (Airport RJK)': [200, 270],
		Zagreb: [380, 460],
		Trieste: [240, 340],
		'Trieste (Airport)': [290, 360],
		'Venice (Airport)': [440, 530],
		'Ljubljana (Airport)': [370, 460]
	},
	pula: {
		Rijeka: [150, 200],
		'Rijeka (Airport RJK)': [200, 270],
		Zagreb: [380, 460],
		Trieste: [240, 340],
		'Trieste (Airport)': [290, 360],
		'Venice (Airport)': [440, 530],
		'Ljubljana (Airport)': [370, 460]
	}
};

export const travelTime: Record<Origin, Record<string, string>> = {
	airport: {
		Pula: '~15 min',
		Verudela: '~15 min',
		Fažana: '~20 min',
		'Marina Veruda': '~15 min',
		'Banjole (Hotel Delmar)': '~25 min',
		'Ližnjan (Hotel Emotion)': '~30 min',
		Medulin: '~20 min',
		Stinjan: '~20 min',
		Rovinj: '~45 min',
		Vrsar: '~55 min',
		Poreč: '~1h',
		Novigrad: '~1h 10min',
		Umag: '~1h 15min',
		Rabac: '~1h',
		Opatija: '~1h 30min',
		'Mali Lošinj': '~2h 30min',
		Rijeka: '~1h 45min',
		'Rijeka (Airport RJK)': '~2h',
		Zagreb: '~3h 30min',
		Trieste: '~1h 30min',
		'Trieste (Airport)': '~1h 45min',
		'Venice (Airport)': '~2h 30min',
		'Ljubljana (Airport)': '~2h 30min'
	},
	pula: {
		Rijeka: '~1h 30min',
		'Rijeka (Airport RJK)': '~1h 45min',
		Zagreb: '~3h 30min',
		Trieste: '~1h 15min',
		'Trieste (Airport)': '~1h 30min',
		'Venice (Airport)': '~2h 15min',
		'Ljubljana (Airport)': '~2h 15min'
	}
};

export type Lang = 'hr' | 'en' | 'de';

/** Per-language overrides for destination labels. Keys not listed fall back to the canonical key. */
const destinationLabels: Record<Lang, Record<string, string>> = {
	en: {},
	hr: {
		'Rijeka (Airport RJK)': 'Rijeka (Aerodrom RJK)',
		Trieste: 'Trst',
		'Trieste (Airport)': 'Trst (Aerodrom)',
		'Venice (Airport)': 'Venecija (Aerodrom)',
		'Ljubljana (Airport)': 'Ljubljana (Aerodrom)'
	},
	de: {
		'Rijeka (Airport RJK)': 'Rijeka (Flughafen RJK)',
		Trieste: 'Triest',
		'Trieste (Airport)': 'Triest (Flughafen)',
		'Venice (Airport)': 'Venedig (Flughafen)',
		'Ljubljana (Airport)': 'Ljubljana (Flughafen)'
	}
};

export function destLabel(key: string, lang: Lang): string {
	return destinationLabels[lang]?.[key] ?? key;
}

const originLabels: Record<Origin, Record<Lang, string>> = {
	airport: {
		en: 'Pula Airport',
		hr: 'Aerodrom Pula',
		de: 'Flughafen Pula'
	},
	pula: {
		en: 'Pula (centre / hotel)',
		hr: 'Pula (centar / hotel)',
		de: 'Pula (Zentrum / Hotel)'
	}
};

export function originLabel(origin: Origin, lang: Lang): string {
	return originLabels[origin][lang];
}

export function originShortLabel(origin: Origin, lang: Lang): string {
	if (origin === 'airport') {
		return { en: 'Pula Airport', hr: 'Aerodrom Pula', de: 'Flughafen Pula' }[lang];
	}
	return 'Pula';
}

export function destinationsFor(origin: Origin): string[] {
	return Object.keys(prices[origin]);
}

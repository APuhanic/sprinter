import hr from './hr';
import en from './en';
import de from './de';

export type Lang = 'hr' | 'en' | 'de';
export type Translations = typeof hr;

export const languages: Record<Lang, Translations> = { hr, en, de };

// The default language — visitors hitting "/" get redirected here
export const defaultLang: Lang = 'hr';

// Used to validate the [lang] route param
export function isValidLang(lang: string): lang is Lang {
	return lang in languages;
}

// Get translations for a given language code
export function t(lang: Lang): Translations {
	return languages[lang];
}

// URL slug mappings per language (for translated URLs)
// All languages use the same Croatian slugs for now — keeps URLs consistent
export const slugs = {
	hr: {
		cleaning: 'usluge-ciscenja',
		transport: 'usluge-prijevoza',
		rental: 'najam-vozila',
		transfers: 'luksuzni-transferi',
		contact: 'kontakt'
	},
	en: {
		cleaning: 'usluge-ciscenja',
		transport: 'usluge-prijevoza',
		rental: 'najam-vozila',
		transfers: 'luksuzni-transferi',
		contact: 'kontakt'
	},
	de: {
		cleaning: 'usluge-ciscenja',
		transport: 'usluge-prijevoza',
		rental: 'najam-vozila',
		transfers: 'luksuzni-transferi',
		contact: 'kontakt'
	}
} as const;

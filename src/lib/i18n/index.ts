import hr from './hr';
import en from './en';

// All supported languages
export const languages = { hr, en } as const;
export type Lang = keyof typeof languages;
export type Translations = typeof hr;

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
// Both languages use the same slugs for now — we can translate them later if needed
export const slugs = {
	hr: {
		cleaning: 'usluge-ciscenja',
		rental: 'najam-vozila',
		transfers: 'luksuzni-transferi',
		contact: 'kontakt'
	},
	en: {
		cleaning: 'usluge-ciscenja',
		rental: 'najam-vozila',
		transfers: 'luksuzni-transferi',
		contact: 'kontakt'
	}
} as const;

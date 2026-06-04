// Light i18n config — safe to import from client components.
//
// `Translations` comes from './translations' as a TYPE-ONLY re-export, which the
// compiler erases — so the hr/en/de translation payloads never enter the client
// bundle. The runtime objects (`languages`, `t`) live in './translations' too and
// must only be imported from server-side code.
export type { Translations } from './translations';

export type Lang = 'hr' | 'en' | 'de';

// The set of supported languages. Use this instead of `Object.keys(languages)`
// so client code can list languages without importing the heavy translations.
export const LANGS = ['hr', 'en', 'de'] as const;

// The default language — visitors hitting "/" get redirected here
export const defaultLang: Lang = 'hr';

// Used to validate the [lang] route param
export function isValidLang(lang: string): lang is Lang {
	return (LANGS as readonly string[]).includes(lang);
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

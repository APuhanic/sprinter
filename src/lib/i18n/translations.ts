// Runtime translation objects. SERVER-ONLY: importing this pulls all three
// language payloads, so never import it from a client component — use the light
// helpers in './index' there instead. Only load functions, hooks, and +server
// endpoints need the actual translations.
import hr from './hr';
import en from './en';
import de from './de';
import type { Lang } from './index';

export type Translations = typeof hr;

export const languages: Record<Lang, Translations> = { hr, en, de };

export function t(lang: Lang): Translations {
	return languages[lang];
}

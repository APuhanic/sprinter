import { error } from '@sveltejs/kit';
import { isValidLang, type Lang } from '$lib/i18n';
import { t } from '$lib/i18n/translations';
import type { LayoutServerLoad } from './$types';

// This runs on the server for every page under /[lang]/...
// It validates the language param and passes translations to all child pages
export const load: LayoutServerLoad = ({ params }) => {
	if (!isValidLang(params.lang)) {
		error(404, 'Not found');
	}

	const lang = params.lang as Lang;

	return {
		lang,
		t: t(lang)
	};
};

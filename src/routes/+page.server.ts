import { redirect } from '@sveltejs/kit';
import { defaultLang } from '$lib/i18n';
import type { PageServerLoad } from './$types';

// Root "/" redirects to the default language
export const load: PageServerLoad = () => {
	redirect(307, `/${defaultLang}`);
};

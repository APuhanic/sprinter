import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendInquiry, renderInquiryHtml, renderInquiryText } from '$lib/server/mail';
import { FORM_MAX } from '$lib/server/formLimits';
import { checkRateLimit } from '$lib/server/rateLimit';
import { verifyTurnstile } from '$lib/server/turnstile';

export const actions: Actions = {
	default: async ({ request, params, getClientAddress }) => {
		const form = await request.formData();

		// Honeypot — real users leave this empty. Bots fill every field.
		if (form.get('website')) {
			return { success: true };
		}

		const rl = checkRateLimit(`form:${getClientAddress()}`, 5, 60 * 60 * 1000);
		if (!rl.ok) {
			return fail(429, {
				serverError: 'Previše pokušaja. Pokušajte ponovno za malo.',
				retryAfter: rl.retryAfter
			});
		}

		const turnstileOk = await verifyTurnstile(
			String(form.get('cf-turnstile-response') ?? ''),
			getClientAddress()
		);
		if (!turnstileOk) {
			return fail(400, {
				serverError: 'Sigurnosna provjera nije prošla. Pokušajte ponovno.'
			});
		}

		const name = String(form.get('name') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const message = String(form.get('message') ?? '').trim();
		const privacy = form.get('privacy') === 'on';

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'required';
		else if (name.length > FORM_MAX.name) errors.name = 'too_long';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';
		else if (email.length > FORM_MAX.email) errors.email = 'too_long';
		if (!phone) errors.phone = 'required';
		else if (phone.length > FORM_MAX.phone) errors.phone = 'too_long';
		if (!message) errors.message = 'required';
		else if (message.length > FORM_MAX.message) errors.message = 'too_long';
		if (!privacy) errors.privacy = 'required';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: { name, email, phone, message } });
		}

		const fields = { Ime: name, Email: email, Telefon: phone, Poruka: message };
		const result = await sendInquiry({
			subject: `Novi upit s web-a od ${name}`,
			replyTo: email,
			html: renderInquiryHtml(fields),
			text: renderInquiryText(fields)
		});

		if (!result.ok) {
			return fail(500, {
				serverError: 'Pošiljanje e-pošte nije uspjelo. Nazovite nas ili pokušajte ponovno.',
				values: { name, email, phone, message }
			});
		}

		throw redirect(303, `/${params.lang}/hvala`);
	}
};

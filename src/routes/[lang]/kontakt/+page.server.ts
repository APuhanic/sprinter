import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendInquiry, renderInquiryHtml, renderInquiryText } from '$lib/server/mail';

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();

		// Honeypot — real users leave this empty. Bots fill every field.
		if (form.get('website')) {
			return { success: true };
		}

		const name = String(form.get('name') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const message = String(form.get('message') ?? '').trim();
		const privacy = form.get('privacy') === 'on';

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'required';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';
		if (!phone) errors.phone = 'required';
		if (!message) errors.message = 'required';
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

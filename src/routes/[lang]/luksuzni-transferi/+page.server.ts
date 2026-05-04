import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendInquiry, renderInquiryHtml, renderInquiryText } from '$lib/server/mail';

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();

		if (form.get('website')) {
			return { success: true };
		}

		const firstName = String(form.get('firstName') ?? '').trim();
		const lastName = String(form.get('lastName') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const vehicle = String(form.get('vehicle') ?? '').trim();
		const message = String(form.get('message') ?? '').trim();
		const consent = form.get('consent') === 'on';

		const errors: Record<string, string> = {};
		if (!firstName) errors.firstName = 'required';
		if (!lastName) errors.lastName = 'required';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';
		if (!consent) errors.consent = 'required';

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				values: { firstName, lastName, email, phone, vehicle, message }
			});
		}

		const fields = {
			Ime: firstName,
			Prezime: lastName,
			Email: email,
			Telefon: phone,
			Vozilo: vehicle,
			Poruka: message
		};
		const result = await sendInquiry({
			subject: `Novi upit za transfer — ${firstName} ${lastName}`,
			replyTo: email,
			html: renderInquiryHtml(fields),
			text: renderInquiryText(fields)
		});

		if (!result.ok) {
			return fail(500, {
				serverError: 'Pošiljanje nije uspjelo. Nazovite nas ili pokušajte ponovno.',
				values: { firstName, lastName, email, phone, vehicle, message }
			});
		}

		throw redirect(303, `/${params.lang}/hvala`);
	}
};

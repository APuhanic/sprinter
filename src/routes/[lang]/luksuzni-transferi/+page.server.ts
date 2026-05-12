import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendInquiry, renderInquiryHtml, renderInquiryText } from '$lib/server/mail';
import { FORM_MAX } from '$lib/server/formLimits';
import { checkRateLimit } from '$lib/server/rateLimit';

export const actions: Actions = {
	default: async ({ request, params, getClientAddress }) => {
		const form = await request.formData();

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

		const firstName = String(form.get('firstName') ?? '').trim();
		const lastName = String(form.get('lastName') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const vehicle = String(form.get('vehicle') ?? '').trim();
		const message = String(form.get('message') ?? '').trim();
		const consent = form.get('consent') === 'on';

		const errors: Record<string, string> = {};
		if (!firstName) errors.firstName = 'required';
		else if (firstName.length > FORM_MAX.firstName) errors.firstName = 'too_long';
		if (!lastName) errors.lastName = 'required';
		else if (lastName.length > FORM_MAX.lastName) errors.lastName = 'too_long';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';
		else if (email.length > FORM_MAX.email) errors.email = 'too_long';
		if (phone.length > FORM_MAX.phone) errors.phone = 'too_long';
		if (vehicle.length > FORM_MAX.vehicle) errors.vehicle = 'too_long';
		if (message.length > FORM_MAX.message) errors.message = 'too_long';
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

import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { vehicles } from '$lib/data/vehicles';
import { sendInquiry, renderInquiryHtml, renderInquiryText } from '$lib/server/mail';

export const load: PageServerLoad = ({ params }) => {
	const vehicle = vehicles.find((v) => v.slug === params.slug);
	if (!vehicle) throw error(404, 'Vehicle not found');
	return { vehicle };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();

		if (form.get('website')) {
			return { success: true };
		}

		const vehicle = vehicles.find((v) => v.slug === params.slug);
		if (!vehicle) throw error(404);

		const name = String(form.get('name') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const dateFrom = String(form.get('dateFrom') ?? '').trim();
		const dateTo = String(form.get('dateTo') ?? '').trim();
		const notes = String(form.get('notes') ?? '').trim();
		const estimate = String(form.get('estimate') ?? '').trim();

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'required';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				values: { name, email, phone, dateFrom, dateTo, notes }
			});
		}

		const fields = {
			Vozilo: vehicle.name,
			Ime: name,
			Email: email,
			Telefon: phone,
			'Od datuma': dateFrom,
			'Do datuma': dateTo,
			'Procjena cijene': estimate,
			Napomene: notes
		};

		const result = await sendInquiry({
			subject: `Novi upit za ${vehicle.name} — ${name}`,
			replyTo: email,
			html: renderInquiryHtml(fields),
			text: renderInquiryText(fields)
		});

		if (!result.ok) {
			return fail(500, {
				serverError: 'Slanje nije uspjelo. Pokušajte ponovno ili nas nazovite.',
				values: { name, email, phone, dateFrom, dateTo, notes }
			});
		}

		throw redirect(303, `/${params.lang}/hvala`);
	}
};

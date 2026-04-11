import { error } from '@sveltejs/kit';
import { vehicles } from '$lib/data/vehicles';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const vehicle = vehicles.find((v) => v.slug === params.slug);

	if (!vehicle) {
		error(404, 'Vehicle not found');
	}

	return { vehicle };
};

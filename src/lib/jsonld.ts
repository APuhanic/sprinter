import type { Vehicle } from './data/vehicles';
import { contact } from './contact';

const SITE_URL = 'https://sprinter.hr';
const LEGAL_NAME = 'Sprinter d.o.o.';

export function localBusiness() {
	// LocalBusiness (umbrella) rather than AutoRental — current live scope is
	// cleaning + transfers; car rental is paused. Don't tell Google we're a
	// car-rental company when we aren't actively renting cars.
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_URL}/#business`,
		name: LEGAL_NAME,
		url: SITE_URL,
		telephone: contact.tel,
		email: contact.email,
		priceRange: '€€',
		address: {
			'@type': 'PostalAddress',
			streetAddress: contact.addressStreet,
			addressLocality: contact.addressCity,
			postalCode: contact.addressPostal,
			addressCountry: contact.addressCountry
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday'
				],
				opens: '08:00',
				closes: '19:00'
			}
		],
		areaServed: { '@type': 'Country', name: 'Croatia' }
	};
}

export function vehicleOffer(vehicle: Vehicle) {
	const prices = vehicle.pricing.map((p) => p.price / p.days);
	const low = Math.min(...prices);
	const high = Math.max(...prices);
	const images = vehicle.images.map((i) => `${SITE_URL}${i}`);

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: vehicle.name,
		description: vehicle.description.join(' '),
		image: images,
		category: vehicle.type,
		brand: {
			'@type': 'Brand',
			name: vehicle.name.split(' ')[0]
		},
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'EUR',
			lowPrice: low.toFixed(0),
			highPrice: high.toFixed(0),
			offerCount: vehicle.pricing.length,
			availability: 'https://schema.org/InStock',
			seller: { '@id': `${SITE_URL}/#business` }
		},
		additionalProperty: [
			{ '@type': 'PropertyValue', name: 'year', value: vehicle.year },
			{ '@type': 'PropertyValue', name: 'seats', value: vehicle.seats },
			{ '@type': 'PropertyValue', name: 'gearbox', value: vehicle.gearbox }
		]
	};
}

export function cleaningService() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Professional Cleaning',
		provider: { '@id': `${SITE_URL}/#business` },
		areaServed: { '@type': 'Country', name: 'Croatia' },
		name: 'Usluge čišćenja — Sprinter',
		description:
			'Profesionalne usluge čišćenja za privatne nekretnine, apartmane, vile i smještaj najviše kategorije.'
	};
}

export function transportService() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Goods Transport',
		provider: { '@id': `${SITE_URL}/#business` },
		areaServed: { '@type': 'Country', name: 'Croatia' },
		name: 'Sprinter Transport',
		description:
			'Brz, točan i siguran prijevoz robe diljem Istre, Hrvatske i šire. Renault Trafic do Mercedes Sprinter, GPS praćenje, asistencija pri utovaru i istovaru.'
	};
}

export function transferService() {
	return {
		'@context': 'https://schema.org',
		'@type': 'TaxiService',
		provider: { '@id': `${SITE_URL}/#business` },
		areaServed: { '@type': 'Country', name: 'Croatia' },
		name: 'Privatni transferi',
		description: 'Transferi Mercedes-Benz E-klasa i V-klasa s osobnim vozačem. Dostupno 0–24.'
	};
}

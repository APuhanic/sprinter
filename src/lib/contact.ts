export const contact = {
	// Default — used for transfers, rental, and general inquiries
	phone: '+385 95 722 6918',
	tel: '+385957226918',
	whatsappNumber: '385957226918',

	// Cleaning service line
	phoneCleaning: '+385 95 771 8504',
	telCleaning: '+385957718504',
	whatsappNumberCleaning: '385957718504',

	email: 'sprinter@sprinter.hr',
	address: 'Capelleri ul. 5, 52100 Pula',
	addressStreet: 'Capelleri ul. 5',
	addressPostal: '52100',
	addressCity: 'Pula',
	addressCountry: 'HR'
};

export const telHref = `tel:${contact.tel}`;
export const telHrefCleaning = `tel:${contact.telCleaning}`;
export const mailHref = `mailto:${contact.email}`;

export function waHref(message?: string) {
	const base = `https://wa.me/${contact.whatsappNumber}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function waHrefCleaning(message?: string) {
	const base = `https://wa.me/${contact.whatsappNumberCleaning}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

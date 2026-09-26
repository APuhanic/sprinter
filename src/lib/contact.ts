export const contact = {
	phone: '+385 95 722 6918',
	tel: '+385957226918',
	whatsappNumber: '385957226918',

	email: 'sprinter@sprinter.hr',
	address: 'Capelleri 5, 52100 Pula · Kralja Dmitra Zvonimira 1, 31326 Darda',
	addressStreet: 'Capelleri 5, Kralja Dmitra Zvonimira 1',
	addressPostal: '52100 · 31326',
	addressCity: 'Pula · Darda',
	addressCountry: 'HR'
};

export const telHref = `tel:${contact.tel}`;
export const mailHref = `mailto:${contact.email}`;

export function waHref(message?: string) {
	const base = `https://wa.me/${contact.whatsappNumber}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const contact = {
	phone: '+385 95 722 6918',
	tel: '+385957226918',
	email: 'sprinter@sprinter.hr',
	whatsappNumber: '385957226918',
	address: 'Kralja Dmitra Zvonimira 1, 31326 Darda',
	addressStreet: 'Kralja Dmitra Zvonimira 1',
	addressPostal: '31326',
	addressCity: 'Darda',
	addressCountry: 'HR'
};

export const telHref = `tel:${contact.tel}`;
export const mailHref = `mailto:${contact.email}`;

export function waHref(message?: string) {
	const base = `https://wa.me/${contact.whatsappNumber}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

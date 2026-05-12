// Length caps for form inputs. Reject submissions that exceed these to
// prevent cost-amplification via Resend payload size and to spot abuse.
export const FORM_MAX = {
	name: 120,
	firstName: 60,
	lastName: 60,
	email: 254,
	phone: 40,
	vehicle: 100,
	message: 5000,
	notes: 5000,
	date: 32,
	estimate: 200
} as const;

import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { contact } from '$lib/contact';

export interface InquiryEmail {
	subject: string;
	replyTo?: string;
	html: string;
	text: string;
}

function getClient(): Resend | null {
	const key = env.RESEND_API_KEY;
	if (!key) return null;
	return new Resend(key);
}

function getRecipients(): string[] {
	const raw = env.INQUIRY_TO || contact.email;
	return raw
		.split(',')
		.map((r) => r.trim())
		.filter(Boolean);
}

function getSender(): string {
	return env.MAIL_FROM || `Sprinter <onboarding@resend.dev>`;
}

export async function sendInquiry(payload: InquiryEmail): Promise<
	{ ok: true; id?: string; loggedOnly?: boolean } | { ok: false; error: string }
> {
	const to = getRecipients();
	const client = getClient();

	if (!client) {
		console.warn('[mail] RESEND_API_KEY not set — logging inquiry instead of sending');
		console.log('[mail] to:', to);
		console.log('[mail] subject:', payload.subject);
		console.log('[mail] text:\n' + payload.text);
		return { ok: true, loggedOnly: true };
	}

	const { data, error } = await client.emails.send({
		from: getSender(),
		to,
		replyTo: payload.replyTo,
		subject: payload.subject,
		html: payload.html,
		text: payload.text
	});

	if (error) {
		console.error('[mail] Resend error:', error);
		return { ok: false, error: error.message ?? 'Email delivery failed' };
	}
	return { ok: true, id: data?.id };
}

export function renderInquiryHtml(fields: Record<string, string>): string {
	const rows = Object.entries(fields)
		.filter(([, v]) => v)
		.map(
			([k, v]) =>
				`<tr><td style="padding:6px 12px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`
		)
		.join('');
	return `<table style="font-family:system-ui,-apple-system,sans-serif;border-collapse:collapse;min-width:400px">${rows}</table>`;
}

export function renderInquiryText(fields: Record<string, string>): string {
	return Object.entries(fields)
		.filter(([, v]) => v)
		.map(([k, v]) => `${k}: ${v}`)
		.join('\n');
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

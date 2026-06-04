// Cloudflare Turnstile server-side verification.
// When TURNSTILE_SECRET_KEY is unset, verification is a no-op IN DEV ONLY so dev
// works without a Cloudflare account. In production a missing secret fails closed
// (rejects the submission) so spam protection can never silently disappear.
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
	token: string | null | undefined,
	remoteIp?: string
): Promise<boolean> {
	const secret = env.TURNSTILE_SECRET_KEY;
	// Fail closed in prod: a missing secret must not silently disable spam protection.
	if (!secret) return dev;
	if (!token) return false;

	const body = new URLSearchParams({ secret, response: token });
	if (remoteIp) body.append('remoteip', remoteIp);

	try {
		const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
		if (!res.ok) return false;
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch (err) {
		console.error('[turnstile] verify failed:', err);
		return false;
	}
}

// In-memory token bucket. Survives only within a single serverless instance's
// lifetime, which is fine combined with Turnstile on the same forms.
// In dev mode the limiter is a no-op so the developer can spam-test.
import { dev } from '$app/environment';

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
	if (dev) return { ok: true };

	const now = Date.now();

	// Probabilistic sweep to keep the map from growing without bound.
	if (Math.random() < 0.01) {
		for (const [k, b] of buckets) {
			if (b.resetAt < now) buckets.delete(k);
		}
	}

	const bucket = buckets.get(key);
	if (!bucket || bucket.resetAt < now) {
		buckets.set(key, { count: 1, resetAt: now + windowMs });
		return { ok: true };
	}

	if (bucket.count >= limit) {
		return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
	}

	bucket.count++;
	return { ok: true };
}

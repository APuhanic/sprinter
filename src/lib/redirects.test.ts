import { describe, it, expect } from 'vitest';
import { resolveRedirect } from './redirects';

const q = (s = '') => new URLSearchParams(s);

describe('resolveRedirect', () => {
	it('returns null for unknown paths', () => {
		expect(resolveRedirect('/whatever', q())).toBeNull();
	});

	it('never strips the root slash', () => {
		expect(resolveRedirect('/', q())).toBeNull();
	});

	// Precedence: a query-string rule beats path matching, and the stale WP
	// locator param is dropped (target is the clean URL).
	it('query redirect wins and drops the stale param', () => {
		expect(resolveRedirect('/', q('page_id=3'))).toEqual({
			kind: 'redirect',
			to: '/hr/pravila-privatnosti',
			preserveQuery: false
		});
	});

	it('resolves a partner deep-link to a 302 carrying the slug', () => {
		expect(resolveRedirect('/monumenti', q())).toEqual({
			kind: 'redirect',
			to: '/hr/luksuzni-transferi?partner=monumenti',
			preserveQuery: false,
			status: 302
		});
	});

	it('normalizes a trailing slash before matching', () => {
		expect(resolveRedirect('/monumenti/', q())).toEqual({
			kind: 'redirect',
			to: '/hr/luksuzni-transferi?partner=monumenti',
			preserveQuery: false,
			status: 302
		});
		expect(resolveRedirect('/kontakt/', q())).toEqual({
			kind: 'redirect',
			to: '/hr/kontakt',
			preserveQuery: true
		});
	});

	// Path redirects keep the query so utm_* (Google Ads / GBP) survives.
	it('preserves the query on path redirects', () => {
		expect(resolveRedirect('/kontakt', q('utm_source=google'))).toEqual({
			kind: 'redirect',
			to: '/hr/kontakt',
			preserveQuery: true
		});
	});

	it('returns gone (410) for out-of-scope legacy URLs', () => {
		expect(resolveRedirect('/wp-login.php', q())).toEqual({ kind: 'gone' });
		expect(resolveRedirect('/rent-a-car', q())).toEqual({ kind: 'gone' });
	});
});

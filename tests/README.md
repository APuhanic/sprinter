# Tests

End-to-end tests (Playwright). Run with `npm run test:e2e`. The Playwright config
self-starts the dev server, so no separate `npm run dev` is needed.

## CI safety — the form e2e must not send live email (audit T-8)

`smoke.spec.ts` submits the **real** contact and rental forms and asserts the
`/hvala` redirect. This is safe locally because the dev environment has no mail or
Turnstile secrets:

- `RESEND_API_KEY` unset → `sendInquiry` runs in logged-only mode (no email sent).
- `TURNSTILE_SECRET_KEY` unset + `dev` → `verifyTurnstile` is a no-op that passes.

**When adding CI, do NOT expose `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` to the
e2e job** (or mock the form POST). Otherwise every run dispatches a live inquiry
email to the business inbox and burns the Resend + per-IP rate-limit budget.

Note: with the prod fail-closed change in `src/lib/server/turnstile.ts`, a
production build with no Turnstile secret rejects submissions — so a CI run against
a prod build would fail the form assertion rather than leak email. Keep e2e on the
dev server (the default) or mock the POST.

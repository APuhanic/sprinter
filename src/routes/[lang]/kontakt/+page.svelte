<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { telHref, mailHref, waHref, contact } from '$lib/contact';
	import Turnstile from '$lib/components/Turnstile.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let lang = $derived(data.lang);
	let t = $derived(data.t);

	let submitting = $state(false);

	const mapQuery = encodeURIComponent(contact.address);
	const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
	const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
</script>

<svelte:head>
	<title>Sprinter - {t.contact.title}</title>
	<meta name="description" content={t.contact.metaDescription} />
	<meta property="og:title" content="Sprinter - {t.contact.title}" />
	<meta property="og:description" content={t.contact.metaDescription} />
</svelte:head>

<main class="page-fade">
	<!-- Form + office info -->
	<section class="section">
		<div class="wrap">
			<div class="kontakt-grid">
				<!-- Form -->
				<div class="kontakt-form-col">
					<div class="eyebrow" style="margin-bottom:20px;">{t.contact.title}</div>
					<h2 class="section-title" style="max-width:18ch;">{t.contact.formHeading}</h2>

					<form
						method="POST"
						class="kontakt-form"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<!-- Honeypot — hidden from users, trap for bots -->
						<div class="kontakt-form__honeypot" aria-hidden="true">
							<label for="website">Website (leave empty)</label>
							<input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
						</div>

						{#if form?.serverError}
							<div class="kontakt-form__error" role="alert">
								{form.serverError}
							</div>
						{/if}

						<div class="kontakt-form__field">
							<label for="name" class="kontakt-form__label">
								{t.contact.formName} <span class="kontakt-form__req">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								value={form?.values?.name ?? ''}
								aria-invalid={form?.errors?.name ? 'true' : undefined}
								class="kontakt-form__input"
							/>
						</div>

						<div class="kontakt-form__field">
							<label for="email" class="kontakt-form__label">
								{t.contact.formEmail} <span class="kontakt-form__req">*</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								value={form?.values?.email ?? ''}
								aria-invalid={form?.errors?.email ? 'true' : undefined}
								class="kontakt-form__input"
							/>
							{#if form?.errors?.email === 'invalid'}
								<p class="kontakt-form__field-err">{t.form.errorEmail}</p>
							{/if}
						</div>

						<div class="kontakt-form__field">
							<label for="phone" class="kontakt-form__label">
								{t.contact.formPhone} <span class="kontakt-form__req">*</span>
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								required
								value={form?.values?.phone ?? ''}
								aria-invalid={form?.errors?.phone ? 'true' : undefined}
								class="kontakt-form__input"
							/>
						</div>

						<div class="kontakt-form__field">
							<label for="message" class="kontakt-form__label">
								{t.contact.formMessage} <span class="kontakt-form__req">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								required
								aria-invalid={form?.errors?.message ? 'true' : undefined}
								class="kontakt-form__input kontakt-form__textarea"
								>{form?.values?.message ?? ''}</textarea
							>
						</div>

						<label class="kontakt-form__privacy">
							<input type="checkbox" id="privacy" name="privacy" required />
							<span>
								{t.contact.formPrivacy}
								<a class="kontakt-form__privacy-link" href="/{lang}/pravila-privatnosti">
									{t.footer.privacy}
								</a>
							</span>
						</label>

						<Turnstile />

						<button
							type="submit"
							disabled={submitting}
							class="btn btn--primary"
							data-variant="pill"
							style="margin-top:4px;"
						>
							{submitting ? t.form.submitting : t.contact.formSubmit}
							<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
						</button>
					</form>
				</div>

				<!-- Office info -->
				<aside class="kontakt-info">
					<div class="eyebrow" style="margin-bottom:20px;">{t.contact.office}</div>
					<h2 class="section-title" style="max-width:14ch;">{t.banner.address.split(',')[0]}</h2>

					<dl class="kontakt-info__list">
						<div>
							<dt>{lang === 'hr' ? 'Adresa' : lang === 'de' ? 'Adresse' : 'Address'}</dt>
							<dd>{t.banner.address}</dd>
						</div>
						<div>
							<dt>{lang === 'hr' ? 'Telefon' : lang === 'de' ? 'Telefon' : 'Phone'}</dt>
							<dd><a href={telHref}>{t.banner.phone}</a></dd>
						</div>
						<div>
							<dt>Email</dt>
							<dd><a href={mailHref}>{t.common.email}</a></dd>
						</div>
						<div>
							<dt>{t.contact.workingHours}</dt>
							<dd>{t.contact.weekdays}</dd>
						</div>
					</dl>

					<a
						class="btn btn--primary"
						data-variant="pill"
						href={waHref()}
						target="_blank"
						rel="noopener noreferrer"
						style="margin-top:32px;"
					>
						<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="flex-shrink:0;">
							<circle cx="7" cy="7" r="6" fill="#25D366" />
							<path
								d="M4.6 5.2c.1-.4.4-.5.6-.5h.4c.1 0 .2.1.3.3l.4.9c.1.2 0 .3 0 .4l-.3.4c.4.7.9 1.2 1.6 1.6l.4-.3c.1-.1.2-.1.4 0l.9.4c.2.1.3.2.3.3v.4c0 .3-.2.5-.5.6-.4.1-.8.1-1.2 0a4.6 4.6 0 0 1-3-3c-.1-.4-.1-.8 0-1.1z"
								fill="#fff"
							/>
						</svg>
						<span>{t.common.whatsapp}</span>
						<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
					</a>
				</aside>
			</div>
		</div>
	</section>

	<!-- Map -->
	<section class="section section--tight">
		<div class="wrap">
			<div class="kontakt-map-head">
				<div>
					<div class="eyebrow">{lang === 'hr' ? 'Lokacija' : lang === 'de' ? 'Standort' : 'Location'}</div>
					<h2 class="section-title" style="margin-top:8px;">{t.contact.findUs}</h2>
				</div>
				<a
					class="btn btn--ghost"
					data-variant="pill"
					href={mapDirections}
					target="_blank"
					rel="noopener noreferrer"
				>
					{t.contact.getDirections}
					<span class="arrow" aria-hidden="true" style="margin-left:4px;">→</span>
				</a>
			</div>
			<div class="kontakt-map">
				<iframe
					src={mapEmbed}
					title={t.contact.findUs}
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>
</main>

<style>
	.kontakt-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(40px, 6vw, 96px);
		align-items: start;
	}
	@media (max-width: 900px) {
		.kontakt-grid {
			grid-template-columns: 1fr;
			gap: 56px;
		}
	}

	.kontakt-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 32px;
		max-width: 56ch;
	}
	.kontakt-form__honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	.kontakt-form__error {
		padding: 14px 18px;
		background: color-mix(in srgb, var(--accent) 8%, transparent);
		border-left: 3px solid var(--accent);
		color: var(--fg);
		font-size: 14px;
		line-height: 1.5;
	}
	.kontakt-form__field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.kontakt-form__label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.kontakt-form__req {
		color: var(--accent);
	}
	.kontakt-form__input {
		width: 100%;
		padding: 14px 16px;
		background: color-mix(in srgb, var(--soft) 50%, transparent);
		border: 1px solid var(--line);
		border-radius: 2px;
		color: var(--fg);
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 400;
		transition: border-color 0.18s ease, background 0.18s ease;
		-webkit-appearance: none;
		appearance: none;
	}
	.kontakt-form__input:focus {
		outline: none;
		border-color: var(--accent);
		background: var(--bg);
	}
	.kontakt-form__input[aria-invalid='true'] {
		border-color: var(--accent);
	}
	.kontakt-form__textarea {
		resize: vertical;
		min-height: 128px;
		line-height: 1.5;
	}
	.kontakt-form__field-err {
		margin: 0;
		font-size: 13px;
		color: var(--accent);
	}
	.kontakt-form__privacy {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		font-size: 14px;
		line-height: 1.5;
		color: var(--muted);
		cursor: pointer;
	}
	.kontakt-form__privacy input[type='checkbox'] {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		margin-top: 3px;
		accent-color: var(--accent);
		cursor: pointer;
	}
	.kontakt-form__privacy-link {
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.kontakt-form__privacy-link:hover {
		color: var(--accent);
	}

	.kontakt-info {
		position: sticky;
		top: 96px;
	}
	@media (max-width: 900px) {
		.kontakt-info {
			position: static;
		}
	}
	.kontakt-info__list {
		display: grid;
		gap: 0;
		margin: 32px 0 0;
	}
	.kontakt-info__list > div {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 20px;
		padding-block: 16px;
		border-top: 1px solid var(--line);
	}
	.kontakt-info__list > div:last-child {
		border-bottom: 1px solid var(--line);
	}
	.kontakt-info__list dt {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		align-self: center;
		margin: 0;
	}
	.kontakt-info__list dd {
		margin: 0;
		font-size: 15px;
		line-height: 1.5;
	}
	.kontakt-info__list a {
		color: var(--fg);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.18s ease;
	}
	.kontakt-info__list a:hover {
		border-bottom-color: var(--accent);
		color: var(--accent);
	}

	.kontakt-map-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
		margin-bottom: 32px;
	}
	.kontakt-map {
		aspect-ratio: 21 / 9;
		border: 1px solid var(--line-strong);
		border-radius: 4px;
		overflow: hidden;
		background: var(--soft);
	}
	@media (max-width: 700px) {
		.kontakt-map {
			aspect-ratio: 4 / 3;
		}
	}
	.kontakt-map iframe {
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
	}
</style>

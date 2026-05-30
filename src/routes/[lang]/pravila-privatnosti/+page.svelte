<script lang="ts">
	import type { PageData } from './$types';
	import { contact, mailHref } from '$lib/contact';

	let { data }: { data: PageData } = $props();
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>Sprinter - {t.footer.privacy}</title>
	<meta name="description" content={t.privacy.metaDescription} />
	<meta property="og:title" content="Sprinter - {t.footer.privacy}" />
	<meta property="og:description" content={t.privacy.metaDescription} />
</svelte:head>

<section class="bg-white py-12">
	<div class="mx-auto max-w-3xl px-4 prose prose-slate">
		<h1>Pravila privatnosti / Privacy Policy</h1>

		<h2>Voditelj obrade / Data Controller</h2>
		<p>
			Sprinter d.o.o.<br />
			{contact.address}<br />
			E-mail: {contact.email}<br />
			Telefon: {contact.phone}
		</p>

		<h2>Koji podaci se prikupljaju / Data We Collect</h2>
		<p>
			Putem kontakt obrasca na ovoj stranici prikupljamo: ime, e-mail adresu, telefonski broj i
			sadržaj poruke. Ovi podaci koriste se isključivo za odgovor na vaš upit.
		</p>
		<p>
			Through the contact form on this site, we collect: name, email address, phone number, and
			message content. This data is used solely to respond to your inquiry.
		</p>

		<h2>Pravna osnova / Legal Basis</h2>
		<p>
			Obrada podataka temelji se na vašoj privoli (čl. 6. st. 1. (a) GDPR) i legitimnom interesu
			za pružanje zatražene usluge (čl. 6. st. 1. (f) GDPR).
		</p>

		<h2>Treće strane / Third-Party Processors</h2>
		<p>
			Za dostavu poruka iz kontakt obrazaca koristimo uslugu <a href="https://resend.com" rel="noopener noreferrer">Resend</a> (Resend, Inc.).
			Sadržaj obrasca (ime, e-mail, telefon, poruka) obrađuje se isključivo radi isporuke
			elektroničke pošte na našu adresu. Resend obrađuje podatke unutar EU/EEA u skladu s GDPR-om.
		</p>
		<p>
			We use <a href="https://resend.com" rel="noopener noreferrer">Resend</a> (Resend, Inc.) to deliver contact form messages.
			Form content (name, email, phone, message) is processed solely to deliver the inquiry to
			our address. Resend processes data within the EU/EEA in compliance with GDPR.
		</p>

		<h2>Analitika i marketing / Analytics &amp; Marketing</h2>
		<p>
			Uz vašu privolu koristimo kolačiće za analitiku i marketing, kojima upravljamo putem Google
			Tag Managera: <strong>Google Analytics 4</strong> (Google Ireland Ltd.) za statistiku posjeta
			i <strong>Meta Pixel</strong> (Meta Platforms Ireland Ltd.) za mjerenje učinkovitosti oglasa.
			Ovi alati mogu prenositi podatke izvan EU/EEA-a (npr. u SAD) uz odgovarajuće zaštitne
			mehanizme (standardne ugovorne klauzule). Kolačići se postavljaju samo ako ih prihvatite putem
			trake za privolu pri prvom posjetu; svoj izbor možete povući brisanjem kolačića u pregledniku.
			Pravna osnova je privola (čl. 6. st. 1. (a) GDPR).
		</p>
		<p>
			With your consent, we use cookies for analytics and marketing, managed through Google Tag
			Manager: <strong>Google Analytics 4</strong> (Google Ireland Ltd.) for visit statistics and
			<strong>Meta Pixel</strong> (Meta Platforms Ireland Ltd.) for ad-performance measurement. These
			tools may transfer data outside the EU/EEA (e.g. to the USA) under appropriate safeguards
			(Standard Contractual Clauses). These cookies are set only if you accept them via the consent
			banner on your first visit; you can withdraw your choice by clearing cookies in your browser.
			The legal basis is consent (Art. 6(1)(a) GDPR).
		</p>

		<h2>Karte / Maps</h2>
		<p>
			Na stranici transfera koristimo <strong>Google Maps</strong> (Google Ireland Ltd.) za prikaz
			karte i izračun rute. Učitavanjem karte vaš preglednik komunicira s Googleovim poslužiteljima.
		</p>
		<p>
			On the transfers page we use <strong>Google Maps</strong> (Google Ireland Ltd.) to display the
			map and calculate routes. Loading the map causes your browser to communicate with Google's
			servers.
		</p>

		<h2>Pohrana podataka / Data Retention</h2>
		<p>
			Vaše osobne podatke čuvamo samo onoliko koliko je potrebno za obradu vašeg upita, a najduže
			12 mjeseci od zadnje komunikacije.
		</p>

		<h2>Vaša prava / Your Rights</h2>
		<p>Imate pravo na:</p>
		<ul>
			<li>Pristup svojim osobnim podacima</li>
			<li>Ispravak netočnih podataka</li>
			<li>Brisanje podataka ("pravo na zaborav")</li>
			<li>Ograničenje obrade</li>
			<li>Prigovor nadzornom tijelu (AZOP - Agencija za zaštitu osobnih podataka)</li>
		</ul>

		<h2>Kontakt / Contact</h2>
		<p>
			Za sva pitanja vezana uz privatnost obratite se na:
			<a href={mailHref}>{contact.email}</a>
		</p>
	</div>
</section>

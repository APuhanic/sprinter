<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.footer.privacy} — Sprinter d.o.o.</title>
</svelte:head>

<section class="bg-white py-12">
	<div class="mx-auto max-w-3xl px-4 prose prose-slate">
		<h1>Pravila privatnosti / Privacy Policy</h1>

		<h2>Voditelj obrade / Data Controller</h2>
		<p>
			Sprinter d.o.o.<br />
			Kralja Dmitra Zvonimira 1, 31326 Darda<br />
			E-mail: sprinter@sprinter.hr<br />
			Telefon: +385 95 722 6918
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
			<a href="mailto:sprinter@sprinter.hr">sprinter@sprinter.hr</a>
		</p>
	</div>
</section>

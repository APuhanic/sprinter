<!--
	BACKUP ROUTE — rental-terms document. Only relevant when /najam-vozila is live.
	Not linked from nav/footer, not in sitemap, noindex. Re-enable alongside rental.
-->
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>Sprinter - {t.footer.rentalTerms}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="bg-white py-12">
	<div class="mx-auto max-w-3xl px-4 prose prose-slate">
		<h1>Ugovor o najmu vozila — Sprinter</h1>

		<h2>Članak 1. Predmet ugovora i putovanje izvan RH</h2>
		<p>
			Predmet je najam tehnički ispravnog vozila s opremom i dokumentima.
			<strong
				>Napuštanje Republike Hrvatske zabranjeno je bez pisane autorizacije Najmodavca i dodatne
				police osiguranja.</strong
			>
		</p>

		<h2>Članak 2. Odgovornost korisnika i integritet imovine</h2>
		<p>
			Korisnik preuzima punu odgovornost za vozilo i obvezuje se koristiti ga prema propisima.
			Prekoračenje naznačene nosivosti predstavlja teško kršenje.
		</p>

		<h2>Članak 3. Zabranjeni tereti</h2>
		<p>
			<strong>Zabranjeni su:</strong> prijevoz ilegalnih i opasnih tvari, šute, otvorenog građevinskog
			materijala (pijesak, šljunak, cement, opeka), otvorenog smeća, gnojiva, kemikalija i tereta koji
			mogu zaprljati prostor vozila. Kršenje aktivira penal za dubinsko čišćenje.
		</p>

		<h2>Članak 4. Ograničenje brzine i GPS praćenje</h2>
		<p>
			Vozilo ima GPS sustav. Maksimalna brzina: <strong>130 km/h</strong> (teretna vozila),
			<strong>150 km/h</strong> (putnička vozila). Prekoračenja aktiviraju penale.
		</p>

		<h2>Članak 5. Protokol povrata i depozit</h2>
		<p>
			Gorivo pri povratu mora odgovarati razini pri preuzimanju. Vozilo se vraća uredno i čisto.
			Produžetak najma zahtijeva najmanje 24 sata obavijesti. <strong
				>Depozit pokriva samo penale i administrativne troškove</strong
			> i vraća se odmah ili do dva radna dana.
		</p>

		<h2>Članak 6. Fiksna tarifa penala</h2>
		<div class="not-prose">
			<table class="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
				<thead class="bg-slate-50">
					<tr>
						<th class="text-left px-4 py-3 font-medium text-slate-700 border-b border-slate-200"
							>Prekršaj</th
						>
						<th class="text-left px-4 py-3 font-medium text-slate-700 border-b border-slate-200"
							>Penal</th
						>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-slate-100">
						<td class="px-4 py-3 text-slate-700">Kašnjenje pri povratu</td>
						<td class="px-4 py-3 text-slate-900 font-medium">25 € po započetom satu</td>
					</tr>
					<tr class="border-b border-slate-100">
						<td class="px-4 py-3 text-slate-700">Dubinsko čišćenje</td>
						<td class="px-4 py-3 text-slate-900 font-medium">150 €</td>
					</tr>
					<tr class="border-b border-slate-100">
						<td class="px-4 py-3 text-slate-700">Nedostajuće gorivo</td>
						<td class="px-4 py-3 text-slate-900 font-medium">Fiksni trošak dopune + 25 €</td>
					</tr>
					<tr class="border-b border-slate-100">
						<td class="px-4 py-3 text-slate-700">Penal za brzinu</td>
						<td class="px-4 py-3 text-slate-900 font-medium">50 € minimalno</td>
					</tr>
					<tr>
						<td class="px-4 py-3 text-slate-700">Prometni prekršaji</td>
						<td class="px-4 py-3 text-slate-900 font-medium">Administrativni trošak + 50 €</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h2>Članak 7. Protokol podrške i jamstvo</h2>
		<p>
			Vozilo je redovito servisirano. Obaveza je obavijestiti policiju i najmodavca u slučaju
			nezgode. Popravci zahtijevaju prethodno odobrenje.
		</p>

		<h2>Članak 8. Protokol raskida ugovora</h2>
		<p>
			Ekstremno kršenje (prekoračenje <strong>15 km/h</strong> iznad granice, neovlašteno napuštanje RH
			ili višestruko kršenje) omogućava momentalni raskid bez upozorenja. Depozit se zadržava u cijelosti.
		</p>

		<h2>Članak 9. Završne odredbe</h2>
		<p>Potpisom Korisnik potvrđuje prihvaćanje svih uvjeta i tarife penala.</p>
	</div>
</section>

import { contact } from '../contact';

export default {
	lang: 'hr',
	langName: 'Hrvatski',

	// Nav (compact labels for the top bar)
	nav: {
		home: 'Početna',
		cleaning: 'Čišćenje',
		transport: 'Prijevoz',
		rental: 'Najam vozila',
		transfers: 'Transferi / Taxi',
		contact: 'Kontakt'
	},

	// Header banner / utility strip
	banner: {
		notice: 'Trenutno primamo nove klijente',
		address: 'Capelleri ul. 5, 52100 Pula',
		phone: contact.phone,
		hours: 'Pon – Ned · 07—24h'
	},

	// Homepage
	home: {
		// Hero
		eyebrow: 'Pula · Istra · od 2024.',
		titleA: 'Dom dostojan',
		titleB: 'razglednice',
		sub: 'Profesionalno čišćenje u Puli i Istri — od apartmana i obiteljskih kuća, do ureda i jahti. Pažljivo, bez improvizacije.',
		meta: [
			{ label: 'Sjedište', text: 'Capelleri ul. 5, 52100 Pula' },
			{ label: 'Pokrivenost', text: 'Pula + Istra' },
			{ label: 'Odgovor', text: 'Najavite dolazak — javljamo se isti dan' },
			{ label: 'Plaćanje', text: 'Gotovina · Transakcijski račun' }
		],
		// Section heads
		servicesEyebrow: '01 · Što radimo',
		servicesTitle: 'Pet vrsta čišćenja, jedan tim',
		servicesSub:
			'Specijalizirani smo za turistički najam, gdje se vrijeme između gostiju mjeri u satima. Iste navike donosimo u sve ostalo što čistimo.',
		otherEyebrow: '02 · I još',
		otherTitle: 'Sprinter ne staje na čišćenju',
		otherSub: 'Pomoćne usluge koje često idu uz turistički najam — istom rukom, istim brojem.',
		processEyebrow: '03 · Kako radimo',
		processTitle: 'Bez ekipa s ulice',
		processSub:
			'Stalna ekipa, vlastita oprema, pisani protokol za svaku vrstu objekta. Vlasnik dolazi na prvi termin.',
		contactEyebrow: '04 · Kontakt',
		contactTitle: 'Recite nam',
		contactTitleAccent: 'što vam treba',
		contactSub: 'WhatsApp je najbrži. Odgovor isti dan, najčešće unutar sata.',
		// CTAs
		ctaWhatsapp: 'WhatsApp',
		ctaCall: 'Nazovite',
		ctaServices: 'Sve usluge',
		ctaLearn: 'Saznaj više',
		ctaSeeAll: 'Otvori sve detalje',
		// Hours strip labels
		hoursLabel: 'Pon — Ned',
		hoursValue: '07 — 24h',
		featureAlt: 'Profesionalno čišćenje interijera u Istri',
		// Transfers hero (top of homepage)
		transfersEyebrow: 'Privatni transferi / taxi · Pula · Istra · Europa',
		transfersTitleA: 'Vozimo vas',
		transfersTitleB: 'pouzdano',
		transfersSub:
			'Privatni transfer s osobnim vozačem ili taxi vožnja u Puli — online kalkulator cijene, bez iznenađenja.',
		transfersCtaBook: 'Rezerviraj transfer',
		transfersCtaTaxi: 'Pošalji taxi upit',
		transfersCtaMore: 'Saznajte više',
		// Marquee
		marquee: [
			'Apartmanski turnover',
			'Dubinsko čišćenje',
			'Redovno čišćenje',
			'Uredi i poslovni prostori',
			'Jahte i brodovi',
			'Pula · Istra'
		],
		// Legacy carousel keys — kept for any code still referencing them
		heroCleaningTitle: 'Profesionalno Čišćenje',
		heroCleaningSubtitle: 'Usluge čišćenja za privatne nekretnine',
		heroRentalTitle: 'Rent a Car\nRent a Kombi',
		heroRentalSubtitle: 'Moguća dostava vozila',
		heroTransfersTitle: 'Osobni vozači i privatni transferi',
		heroTransfersSubtitle: 'Usluga dostupna 0-24',
		heroTransportTitle: 'Sprinter Transport',
		heroTransportSubtitle: 'Pametna logistika na istarskim cestama',
		learnMore: 'Saznaj više',
		rentMe: 'Iznajmi me...',
		requestQuote: 'Zatraži ponudu',
		deliveryAvailable: 'Svako naše vozilo možemo dostaviti na traženu adresu',
		driverAvailable: 'Za svako naše vozilo možete iznajmiti vozača',
		rentalTermsNotice: 'Molimo da obavezno pročitate uvjete i pravila najma vozila!',
		carouselPrev: 'Prethodni slajd',
		carouselNext: 'Sljedeći slajd',
		carouselPause: 'Pauziraj prezentaciju',
		carouselPlay: 'Pokreni prezentaciju',
		carouselGoTo: 'Idi na slajd'
	},

	// Cleaning services as shown on homepage row list (5 specialized lines)
	homeServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartmanski turnover',
			nameAccent: 'turnover',
			short: 'Brzo i pouzdano čišćenje između gostiju, sa standardnim hotelskim protokolom.'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Dubinsko čišćenje',
			nameAccent: 'Dubinsko',
			short:
				'Sezonska ili jednokratna obrada do detalja — kuhinja, kupaona, fuga, pećnica, prozori.'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Redovno čišćenje',
			nameAccent: 'Redovno',
			short: 'Tjedni ili dvotjedni termini za stanove i kuće — fiksna ekipa, fiksno vrijeme.'
		},
		{
			id: 'office',
			num: '04',
			name: 'Uredsko čišćenje',
			nameAccent: 'Uredsko',
			short: 'Čišćenje ureda i poslovnih prostora — diskretno, izvan radnog vremena.'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Čišćenje jahti i brodova',
			nameAccent: 'jahti',
			short: 'Interijer i eksterijer plovila — između charter tjedana ili sezonski.'
		}
	],

	// Sister services strip (Transport / Rental / Transfers)
	otherServices: [
		{
			tag: 'Prijevoz',
			title: 'Sprinter Transport',
			desc: 'Selidbe, dostave, manji prijevozi po Istri.',
			slug: 'transport' as const
		},
		{
			tag: 'Najam',
			title: 'Rent a Car / Kombi',
			desc: 'Putnička i teretna vozila — moguća dostava.',
			slug: 'rental' as const
		},
		{
			tag: 'Transferi',
			title: 'Privatni transferi',
			desc: 'Osobni vozač, premium vozilo, 0-24.',
			slug: 'transfers' as const
		}
	],

	// Process steps
	process: [
		{
			num: 'I',
			title: 'Pišite ili nazovite',
			desc: 'WhatsApp je najbrži kanal. Recite nam što čistimo, gdje, i kad.'
		},
		{
			num: 'II',
			title: 'Dogovor i ponuda',
			desc: 'Pisana ponuda u istom danu. Za veće objekte dolazimo na uvid.'
		},
		{
			num: 'III',
			title: 'Čišćenje',
			desc: 'Stalna ekipa, vlastita oprema. Bez podizvođača.'
		}
	],

	// Owner panel — pulls in the founder from the existing cleaning copy
	owner: {
		eyebrow: 'Tko stoji iza Sprintera',
		quote: 'Mali tim, vlastita oprema, jedan broj — ',
		quoteAccent: 'nazoveš i znaš tko dolazi.',
		name: 'Zvjezdana Puhanić',
		role: 'Direktorica · Sprinter Pula',
		bio: 'Sprintera vodim iz Pule. Na svaki prvi termin dolazim osobno — da vidim prostor, dogovorim ritam i znam što vam treba. Sve nakon toga ide kroz stalnu ekipu koju ste već upoznali.',
		portrait: 'Portret vlasnice'
	},

	// Cleaning page (new design)
	cleaningPage: {
		eyebrow: 'Usluga · 01',
		titleA: 'Profesionalno',
		titleB: 'čišćenje',
		sub: 'Pet vrsta usluga čišćenja u Puli i diljem Istre. Specijalisti za Airbnb i turistički najam, jednako pažljivi prema svemu ostalom.',
		index: 'Indeks',
		areasEyebrow: 'Pokrivamo',
		areasTitle: 'Pula i šira Istra',
		areasSub:
			'Dolazimo s opremom. Za područja izvan Pule moguća dostava — javite se za potvrdu.',
		processEyebrow: 'Postupak',
		processTitle: 'Bez ekipa s ulice',
		processSub: 'Stalna ekipa, vlastita oprema, isti vlasnik na svakoj prvoj smjeni.',
		testiEyebrow: 'Što kažu',
		testiTitle: 'Recenzije stižu',
		testiSub:
			'Tek smo krenuli s čišćenjem — recenzije ćemo dodavati od ljeta. Strpljenje, stiže.',
		testiPlaceholder: 'Ovdje će ići recenzija stvarnog klijenta. Po jedna iz svake kategorije.',
		testiClient: 'Ime klijenta',
		testiRoles: ['Vlasnik apartmana', 'Obiteljska kuća', 'Ured'],
		testiTagPlaceholder: '[ placeholder ]',
		faqEyebrow: 'Često pitano',
		faqTitle: 'Što obično pitaju',
		faqAccent: 'pitaju',
		faqSub: 'Ako nešto nije ovdje, pišite nam — odgovaramo u istom danu.',
		priceLabel: 'Cijena',
		priceDisclaimer: 'Sve cijene su bez PDV-a.',
		sendInquiry: 'Pošalji upit',
		airbnbTag: 'Airbnb · Booking · Vrbo',
		airbnbNote:
			'Specijalizirani smo za turistički najam — brzi turnover, dosljedan standard, fleksibilni termini između gostiju.',
		owner: {
			eyebrow: 'Tko stoji iza Sprintera',
			title: 'Više od čistoće',
			quote:
				'Red, estetika i apsolutna diskrecija. Vodim brigu o Vašem prostoru preciznošću i osobnom odgovornošću.',
			bio: [
				'Moje ime je Zvjezdana Puhanić. Iza čišćenja stojim osobno — od prvog izviđanja prostora do zadnjeg detalja. Godine u hotelijerstvu i održavanju ekskluzivnih vila u Njemačkoj usadile su mi standarde koje ne mijenjam.',
				'Luksuzan prostor zaslužuje više od običnog spremanja — disciplinu, diskreciju, oko za detalj. Zato svaki projekt vodim sama: organiziram proces, nadziem detalje, držim opremu u rukama.'
			],
			portraitAlt: 'Zvjezdana Puhanić — direktorica Sprinter d.o.o.',
			actionAlt: 'Zvjezdana Puhanić — profesionalno čišćenje s Kärcher opremom'
		}
	},

	// Per-service detail (used on cleaning page)
	cleaningServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartmanski turnover',
			nameAccent: 'turnover',
			long:
				'Najam apartmana ne dopušta improvizaciju. Mi ulazimo nakon odjave, odlazimo prije prijave, a vi ne morate brinuti.',
			bullets: [
				'Standardni protokol u 24 koraka',
				'Promjena posteljine i ručnika (donosimo)',
				'Prijava nedostataka uz fotografije',
				'Potvrda spremnosti prije prijave gosta',
				'Hitne intervencije unutar 2 sata'
			],
			price: 'od 70 €',
			priceNote: 'do 50 m²',
			tiers: [
				{ range: 'do 80 m²', price: 'od 100 €' },
				{ range: 'do 100 m²', price: 'od 120 €' },
				{ range: 'preko 100 m²', price: 'od 140 €' }
			],
			photoTag: 'Apartmanska kuhinja, posprema'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Dubinsko čišćenje',
			nameAccent: 'Dubinsko',
			long:
				'Sve ono što redovno čišćenje preskoči. Tipično prije sezone, nakon zime, ili prije ulaska u novi prostor.',
			bullets: [
				'Pećnica, hladnjak iznutra, ploča',
				'Fuge, silikoni, kupaonska keramika',
				'Prozori i prozorske letvice',
				'Iza i ispod namještaja',
				'Sredstva uključena'
			],
			price: 'od 2,00 €/m²',
			priceNote: 'generalno čišćenje',
			tiers: [{ range: 'Radni sat (1 osoba)', price: '15 € – 22 €' }],
			photoTag: 'Dubinsko čišćenje namještaja'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Redovno čišćenje',
			nameAccent: 'Redovno',
			long:
				'Dolazimo redovno, na isti dan i u isto vrijeme. Vodimo evidenciju, znamo gdje je što.',
			bullets: [
				'Fiksna ekipa, fiksni termin',
				'Tjedno, dvotjedno ili mjesečno',
				'Sredstva uključena',
				'Mogućnost ključa na povjerenje',
				'Otkaz bez naknade do 24h prije'
			],
			price: 'od 45 €',
			priceNote: 'do 45 m²',
			tiers: [
				{ range: '45 – 90 m²', price: 'od 60 €' },
				{ range: 'Pranje prozora', price: 'od 1,50 €/m²' },
				{ range: 'Radni sat (1 osoba)', price: '15 € – 22 €' }
			],
			photoTag: 'Sprinter dolazi s opremom'
		},
		{
			id: 'office',
			num: '04',
			name: 'Uredsko čišćenje',
			nameAccent: 'Uredsko',
			long:
				'Radimo u ranim jutarnjim ili kasnim večernjim terminima, bez ometanja vašeg tima.',
			bullets: [
				'Termini izvan radnog vremena',
				'Praznjenje koševa, dezinfekcija površina',
				'Sanitarije, zajednički prostori',
				'Mjesečno fakturiranje, R1 račun',
				'NDA na zahtjev'
			],
			price: '0,75 € – 2 €',
			priceNote: 'po m²',
			tiers: [{ range: 'Radni sat (1 osoba)', price: 'od 15 €' }],
			photoTag: 'Ured, recepcijski pult'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Čišćenje jahti i brodova',
			nameAccent: 'jahti',
			long:
				'Specijalizirana sredstva, posebno se bavimo plovilima, znamo razliku između teaka i gelcoata.',
			bullets: [
				'Charter turnover (subota)',
				'Interijer: kabine, salon, kuhinja',
				'Eksterijer: paluba, fly, oprema',
				'Sredstva sigurna za morsko okruženje',
				'Ne radimo poliranje trupa'
			],
			price: 'po dogovoru',
			priceNote: 'cijena specifična po plovilu',
			tiers: [{ range: 'Radni sat (1 osoba)', price: '15 € – 30 €' }],
			photoTag: 'Terasa s pogledom na more'
		}
	],

	// Areas covered
	areas: [
		{ name: 'Pula', primary: true },
		{ name: 'Medulin', primary: true },
		{ name: 'Banjole', primary: true },
		{ name: 'Premantura', primary: true },
		{ name: 'Vodnjan', primary: false },
		{ name: 'Fažana', primary: false },
		{ name: 'Štinjan', primary: false },
		{ name: 'Peroj', primary: false },
		{ name: 'Rovinj', primary: false },
		{ name: 'Bale', primary: false },
		{ name: 'Barban', primary: false },
		{ name: 'Marčana', primary: false }
	],

	// FAQ
	faq: [
		{
			q: 'Donosite li sredstva i opremu?',
			a: 'Da. Donosimo sva profesionalna sredstva, krpe, mopove i usisivače. Vi samo trebate dogovoriti pristup.'
		},
		{
			q: 'Trebam li ostaviti depozit?',
			a: 'Za jednokratne usluge — ne. Za redovne mjesečne aranžmane plaćanje je krajem mjeseca po izvršenom poslu, najčešće transakcijski uz R1 račun.'
		},
		{
			q: 'Što ako nešto oštetimo?',
			a: 'Imamo policu osiguranja od profesionalne odgovornosti. Oštećenja prijavljujemo pisano s fotografijama i nadoknađujemo kroz osiguranje.'
		},
		{
			q: 'Radite li hitne intervencije isti dan?',
			a: 'Za apartmanski turnover — da, ako nas javite do 10h ujutro. Ostale usluge — najčešće idući radni dan.'
		},
		{
			q: 'Izdajete li R1 račun?',
			a: 'Da, R1 račun na ime tvrtke ili obrta. Mjesečno fakturiranje za ugovorne klijente, redovita uplata na žiro.'
		},
		{
			q: 'Što s ljubimcima i alergijama?',
			a: 'Recite nam unaprijed. Imamo sredstva primjerena za životinje i hipoalergene varijante. Bez mirisa na zahtjev.'
		},
		{
			q: 'Koja je razlika između redovnog i dubinskog čišćenja?',
			a: 'Redovno održava prostor čistim — usisava, briše, sanitarije, kuhinja, površine. Dubinsko ide u detalje koje redovno preskoči — pećnica iznutra, fuge, prozori, iza i ispod namještaja, kupaonska keramika.'
		},
		{
			q: 'Kako pristupate apartmanu kad nisam tamo?',
			a: 'Najčešće sef za ključeve ili šifra na vratima. Za stalne klijente — ključ na povjerenje, evidentirani izlasci. Sve foto-dokumentirano.'
		}
	],

	// Quote calculator
	calc: {
		eyebrow: 'Procjena cijene',
		title: 'Provjeri cijenu',
		titleAccent: 'cijenu',
		sub: 'Indikativna procjena u minuti. Konačna cijena nakon kratkog WhatsApp dogovora.',
		typeLabel: 'Vrsta usluge',
		sizeLabel: 'Veličina prostora',
		freqLabel: 'Učestalost',
		types: [
			{ id: 'turnover' as const, label: 'Apartman turnover' },
			{ id: 'deep' as const, label: 'Dubinsko' },
			{ id: 'regular' as const, label: 'Redovno' },
			{ id: 'office' as const, label: 'Uredsko' },
			{ id: 'yacht' as const, label: 'Jahta / brod' }
		],
		freqs: [
			{ id: 'oneoff' as const, label: 'Jednokratno' },
			{ id: 'weekly' as const, label: 'Tjedno' },
			{ id: 'fortnight' as const, label: 'Dvotjedno' },
			{ id: 'monthly' as const, label: 'Mjesečno' }
		],
		estimateLabel: 'Procjena',
		cta: 'Pošalji upit na WhatsApp',
		yachtNote:
			'Za plovila javite duljinu i vrstu — cijena ovisi o tipu palube i opremi.',
		msgPrefix: 'Pozdrav, zanima me',
		msgFor: 'čišćenje za prostor ~',
		msgEstimate: '. Vidio sam procjenu',
		msgCanYou: 'Možete li mi javiti detalje?'
	},

	// Footer (extended for the new design)
	footerNew: {
		tag: 'Profesionalno čišćenje u Puli i Istri',
		colsServices: 'Usluge',
		colsCompany: 'Tvrtka',
		colsContact: 'Kontakt',
		legal: ['© 2026 Sprinter d.o.o.', 'Pravila privatnosti']
	},

	// Cleaning page
	cleaning: {
		title: 'Usluge čišćenja',
		heroSubtitle: 'Kultura čistoće i estetika prostora s potpisom',
		visionTitle: 'Moja vizija: Više od čistoće',
		visionPara1:
			'Moje ime je Zvjezdana Puhanić. Kao direktorica tvrtke, svoj poziv ne vidim kao puki servis za čišćenje, već kao misiju vraćanja sjaja i sklada u Vaš životni prostor.',
		visionPara2:
			'Vjerujem da privatan prostor zaslužuje više od „običnog spremanja“ – on zaslužuje njemačku disciplinu, apsolutnu diskreciju i oko koje vidi ono što drugima promiče.',
		visionPara3:
			'Svoje profesionalno iskustvo brusila sam u hotelijerstvu, gdje sam usvojila beskompromisne standarde organizacije i pedantnosti. Posljednji niz godina posvetila sam isključivo održavanju ekskluzivnih vila i rezidencija u Njemačkoj, shvaćajući da klijenti moga profila ne traže običnu radnu snagu, već partnera od povjerenja sa svom potrebnom vještinom.',
		visionPara4:
			'Za mene je ovaj posao strast. Iako vodim tvrtku, svakom projektu pristupam osobno. Ja sam ta koja organizira proces, ja sam ta koja nadzire svaki detalj i ja sam ona koja drži opremu u rukama. Samo tako mogu garantirati rezultat koji stoji iza moga imena.',
		exclusivityTitle: 'Ekskluzivnost bez kompromisa',
		exclusivityDesc:
			'Naša usluga nije namijenjena masovnom tržištu. Ne bavimo se čišćenjem stubišta, kafića ili frekventnih javnih prostora. Moj fokus i stručnost usmjereni su na:',
		residencesTitle: 'Privatne rezidencije i arhitektonska zdanja širom Istre',
		residencesDesc:
			'Vaša vila nije samo nekretnina, ona je Vaše utočište. Specijalizirana sam za cjelokupni ciklus brige o Vašem domu: od detaljne pripreme objekta prije Vašeg dolaska, preko diskretnog održavanja tijekom Vašeg boravka, pa sve do temeljite konzervacije prostora nakon odlaska. Moj cilj je da svaki put kada otvorite vrata, imate osjećaj da ulazite u potpuno nov, tek namješten dom.',
		accommodationsTitle: 'Smještaj najviše kategorije',
		accommodationsDesc:
			'Privatni apartmani, boutique hoteli i jahte zahtijevaju više od čišćenja – zahtijevaju poznavanje materijala. Bilo da je riječ o njezi plemenitog drva (tikovine), prirodnog kamena, visoko poliranih površina ili osjetljivih tkanina, moji postupci su prilagođeni očuvanju njihove dugovječnosti.',
		accommodationsStaging:
			'Moj rad u ovom segmentu uključuje i finalni „staging“ – dekoriranje i pripremu prostora po principima vrhunskog hotelijerstva, gdje je svaki ručnik, miris i detalj postavljen s namjerom da oduševi gosta ili vlasnika čim zakorači u prostor.',
		standardsTitle: 'Standardi koje donosim u Vaš dom',
		standardTech: 'Vrhunska tehnologija',
		standardTechDesc:
			'Koristim isključivo profesionalnu Kärcher opremu i certificirana, neagresivna sredstva koja čuvaju Vaše zdravlje i dugovječnost Vašeg namještaja.',
		standardDiscipline: 'Disciplina i zdravlje',
		standardDisciplineDesc:
			'Kao licencirani fitnes instruktor, u posao unosim visoku energiju, disciplinu i svijest o važnosti zdravog, čistog okruženja.',
		positioningTitle: 'Za one koji cijene izvrsnost',
		positioningBody:
			'Cijenim klijente koji respektiraju moju struku i razinu posvećenosti koju pružam. Ako tražite osobu koja će Vašoj nekretnini pristupiti s jednakim poštovanjem i brigom kao da je njezina vlastita, onda ste na pravoj adresi.',
		positioningQuote:
			'„Red, estetika i apsolutna diskrecija. Vodim brigu o Vašem prostoru preciznošću i osobnom odgovornošću.“',
		pricesTitle: 'Naše cijene',
		pricesVatNote: '(Sve cijene su bez PDV-a)',
		pricingDisclaimer:
			'Ako na terenu ustanovimo da je stanje objekta zahtjevnije od dogovorenog, cijenu korigiramo prema stvarnom trudu. Molim imati u vidu razliku da nije isto 4 sata lagano brisati prašinu ili 4 sata provesti u teškom uklanjanju kamenca i dubinskom čišćenju zapuštenih kutova. Rad na običnim površinama ide brzo. Rad na skupom mramoru, tikovini ili dizajnerskoj keramici zahtijeva poseban oprez, skupa sredstva i spora, precizna kretanja.',
		pricingDisclaimerLabel: 'Pravilo struke i napomena:',
		pricingFooterNote:
			'Sve cijene su okvirne i ovise o stvarnom stanju nekretnine te su podložne promjeni.',
		contactTitle: 'Kontaktirajte nas',
		contactDesc:
			'Slobodno nas kontaktirajte za ponudu putem WhatsAppa, nazovite ili nam pišite putem obrasca.',
		serviceArea: 'Naša baza nalazi se u Puli – Fažana',
		byFounder: 'by Zvjezdana Puhanić'
	},

	// Cleaning services data
	services: [
		{
			name: 'Kontinuirana besprijekornost',
			subtitle: 'Redovno održavanje',
			duration: '2 – 4 – 6 – 8 sati',
			price: '60 € – 250 €',
			description:
				'Održavanje visokog standarda čistoće prema dogovorenom protokolu i terminima.'
		},
		{
			name: 'Dubinska regeneracija interijera',
			subtitle: 'Kauči, madraci…',
			duration: '4 – 8 sati',
			price: '110 € – 300 €',
			description:
				'Potpuni tretman interijera i eksterijera uz primjenu vrhunske Kärcher tehnologije.'
		},
		{
			name: 'Prije – poslije najma',
			subtitle: 'Priprema objekta',
			duration: '2 – 3 sata',
			price: '80 € – 180 €',
			description:
				'Priprema objekta prije dolaska ili nakon odlaska vlasnika i gostiju.'
		},
		{
			name: 'Useljenje ili Iseljenje',
			subtitle: 'Sveobuhvatna priprema',
			duration: '6 – 10 sati',
			price: '150 € – 460 €',
			description:
				'Sveobuhvatna priprema nekretnine: dubinsko čišćenje, unutrašnjost ormarića i kućanski aparati.'
		},
		{
			name: 'Kristalna prozirnost staklenih površina',
			subtitle: 'Specijalizirana briga',
			duration: '2 – 4 sata',
			price: '45 € – 110 €',
			description:
				'Specijalizirana briga o velikim staklenim stijenama i zahtjevnim staklenim površinama.'
		},
		{
			name: 'Eksterijer, bazeni i okućnica',
			subtitle: 'Terasa i zona oko bazena',
			duration: '3 – 5 sati',
			price: '80 € – 180 €',
			description:
				'Priprema terasa i zona oko bazena za maksimalan vizualni užitak i higijenu.'
		},
		{
			name: 'Profesionalna njega tekstila',
			subtitle: 'Pranje i glačanje',
			duration: '2 – 4 sata',
			price: '45 € – 100 €',
			description:
				'Pranje i precizno glačanje rublja uz maksimalnu pažnju prema osjetljivim tkaninama.'
		},
		{
			name: 'Sjaj nakon završnih radova',
			subtitle: 'Post-građevinsko čišćenje',
			duration: '8 – 12 sati',
			price: '220 € – 600 €',
			description:
				'Detaljno i sustavno uklanjanje post-građevinske prašine i ostataka radova.'
		}
	],

	// Transport page
	transport: {
		title: 'Usluge prijevoza',
		heroTitle: 'Sprinter Transport',
		heroSubtitle: 'Pametna logistika na istarskim cestama',
		introPara1:
			'Zaboravite na komplicirane i spore servise za selidbe. Ako trebate brz, točan i siguran prijevoz robe iz točke A u točku B – Sprinter je Vaš profesionalni partner.',
		introPara2:
			'Specijalizirani smo za transport robe za klijente koji su organizirani i cijene efikasnost. Bilo da se radi o novoj kuhinji iz Ikee ili Rijeke, materijalu iz Pevexa i Elgrada, ili transportu vrijednog namještaja u Vašu vilu, mi osiguravamo rješenje koje štedi Vaše vrijeme i novac.',
		whyTitle: 'Zašto odabrati Sprinter uslugu prijevoza?',
		whyFleetTitle: 'Puna flota za svaku potrebu',
		whyFleetDesc:
			'Od okretnog Renault Trafica do prostranog Mercedes Sprintera. Imamo pravi volumen za svaki Vaš teret.',
		whyAreaTitle: 'Istra, Hrvatska i šire',
		whyAreaDesc:
			'Naša baza je Pula, ali Vašu robu dostavljamo točno tamo gdje je potrebna.',
		whyAssistTitle: 'Asistencija vozača',
		whyAssistDesc:
			'Ne ostavljamo Vas same s teretom. Naša usluga uključuje aktivnu pomoć pri utovaru i istovaru robe kod samog vozila.',
		whyTechTitle: 'Sigurnost i tehnologija',
		whyTechDesc:
			'Sva naša vozila opremljena su GPS sustavom, što nam omogućuje preciznu organizaciju i uvid u status Vašeg transporta u svakom trenutku.',
		logisticsTitle: 'Logistika „Do praga“ – Kako radimo?',
		logisticsPara1:
			'Naš poslovni model fokusiran je na maksimalnu efikasnost transporta. Kako bismo osigurali najpovoljniju cijenu i brzinu usluge, specijalizirani smo za dostavu do Vašeg kućnog broja ili ulaza u objekt.',
		logisticsPara2Label: 'Profesionalni standard:',
		logisticsPara2:
			'Naša primarna zadaća je siguran prijevoz i manipulacija teretom kod vozila. Uslugu nošenja stvari po katovima ne nudimo, što nam omogućuje da ostanemo brzi, točni i dostupni za Vaš sljedeći transport.',
		logisticsPara3Label: 'Čisto. Točno. Pouzdano.',
		logisticsPara3:
			'Kao tvrtka koja se bavi i održavanjem privatnih vila, znamo koliko je važna briga o detaljima. Naša vozila su uredna, a usluga diskretna i profesionalna.',
		quoteTitle: 'Trebate brzu ponudu?',
		quoteIntro:
			'Slobodno nas nazovite ili nam pišite na WhatsApp. Kako bismo Vam odmah mogli dati točnu informaciju, molimo pripremite sljedeće podatke:',
		quoteItem1: 'Točna adresa prikupljanja robe',
		quoteItem2: 'Krajnja destinacija',
		quoteItem3: 'Vrsta robe i okvirna kilaža',
		quoteItem4: 'Željeni datum prijevoza',
		contactTitle: 'Kontaktirajte nas',
		contactDesc: 'Nazovite ili pišite – odgovaramo brzo.',
		baseNote: 'Naša baza nalazi se u Puli',
		closing: 'Vaš Sprinter Team – profesionalna transportna logistika'
	},

	// Transfers page (redesign)
	transfersPage: {
		eyebrow: 'Usluga · 03',
		title: 'Privatni transferi / taxi',
		titleAccent: 'transferi / taxi',
		titleSuffix: ' — Pula · Istra · Europa',
		leadOne:
			'Sjednete. Vozač zatvori vrata. I više ne morate misliti ni na što drugo.',
		companyText:
			'Sprinter je obiteljska tvrtka iz Pule. Organiziramo privatne transfere i taxi vožnje u Puli, po Istri i Europi — pouzdano, točno na vrijeme, bez iznenađenja.',
		termsTitle: 'Uvjeti i informacije',
		terms: [
			'Doček s natpisom imena — na zahtjev.',
			'Besplatno dječje sjedalo — molimo navedite u napomeni.',
			'Potvrda rezervacije stiže na vaš WhatsApp u roku 30 minuta.',
			'Za duže transfere mogući su dodatni troškovi — noćenje vozača, vrijeme čekanja, trajekti.'
		],
		fleetEyebrow: 'Vozila',
		fleetTitle: 'Dva vozila, jedan standard',
		fleetSub: 'Odaberite veličinu — cijena ostaje transparentna u oba slučaja.',
		eClassName: 'Mercedes-Benz E-klasa',
		eClassDesc:
			'Elegancija i udobnost za do 3 putnika — pravi izbor kad su diskrecija i stil najvažniji.',
		vClassName: 'Mercedes-Benz V-klasa',
		vClassDesc:
			'Prostran i tih za do 7 putnika — opušten i siguran prijevoz za grupe, obitelji ili dodatnu prtljagu.',
		trustEyebrow: 'Što je uključeno',
		trustSignAirport: 'Doček s natpisom imena — na zahtjev',
		trustChildSeat: 'Besplatno dječje sjedalo',
		trustWhatsApp: 'Potvrda na WhatsApp u 30 min'
	},

	// Kalkulator transfera
	transferCalc: {
		title: 'Kalkulator cijene',
		vatNote: 'PDV uključen',
		fromLabel: 'Polazište',
		fromPh: 'Aerodrom Pula, hotel, adresa…',
		toLabel: 'Odredište',
		toPh: 'Rovinj, Opatija, adresa…',
		sendLocation: 'Ne znate adresu? Pošaljite lokaciju na WhatsApp',
		routeCalculating: 'Računam…',
		routeError: 'Rutu nije moguće izračunati. Provjerite adrese.',
		mapsUnavailable: 'Trenutno bez automatskog izračuna — pošaljite upit, javljamo se u 30 minuta.',
		eClass: 'E-klasa',
		eClassRange: '1 – 3 osobe',
		vClass: 'V-klasa',
		vClassRange: '1 – 7 osoba',
		bookingTitle: 'Vaši podaci za rezervaciju',
		travelTimeLabel: 'Vrijeme putovanja',
		fullName: 'Ime',
		fullNamePh: '',
		paxCount: 'Broj putnika',
		date: 'Datum',
		time: 'Vrijeme',
		timePlaceholder: '— Odaberite vrijeme —',
		phone: 'Telefon (neobavezno)',
		note: 'Napomena (neobavezno)',
		notePh: 'Let, dječje sjedalo…',
		vatIncl: 'PDV uklj.',
		estimateNote: 'okvirno',
		longHaulCaveat:
			'Na dugačkim rutama cijene su okvirne i podložne promjeni koja ovisi o dužini rute i dodatnim troškovima. Molimo sačekajte našu potvrdu.',
		modeNowMain: 'Vožnja odmah',
		modeLaterMain: 'Za kasnije',
		nowToken: 'ODMAH',
		mapNavLabel: 'Navigacija',
		gpsAsking: 'Tražim vašu lokaciju…',
		gpsDenied: 'Pristup lokaciji odbijen — šaljemo upit na WhatsApp.',
		errorBook: 'Molimo unesite ime, datum i vrijeme.',
		sendBooking: 'Rezerviraj na WhatsApp',
		formNote: 'Dostupni 07 – 24 · sprinter.hr · +385 95 722 6918',
		whatsapp: 'WhatsApp',
		call: 'Nazovi',
		email: 'E-mail',
		hours: 'Radno vrijeme: 07:00 – 24:00',
		// WhatsApp message labels
		mNow: 'VOŽNJA ODMAH',
		mBooking: 'REZERVACIJA',
		mAt: 'u',
		mConfirmNow: 'Molim potvrdu dolaska. Hvala!',
		mConfirmLater: 'Molim potvrdu dostupnosti. Hvala!',
		mFrom: 'OD:',
		mTo: 'DO:',
		mRoute: 'Pregled rute',
		mDest: 'Odredište',
		mVehE: 'Mercedes crni karavan · BM-979-DE',
		mVehV: 'Mercedes bijeli kombi · BM-507-DD',
		mPrice: 'Cijena',
		mPax: 'Putnika',
		mName: 'Ime',
		mNote: 'Napomena',
		locMsg: 'Dobrodošli! 👋\nMolimo kliknite na 📎 → 📍 Lokacija i pošaljite nam gdje se nalazite.',
		mailSubject: 'Rezervacija transfera'
	},

	// Transfers page (stara kopija — privremeno zadržano)
	transfers: {
		title: 'Privatni transferi s osobnim vozačem',
		visionIntro:
			'Naša vizija je aristokracija prijevoza koja ide daleko od samog vožnje. Nudimo iskustvo temeljeno na poštovanju, diskreciji i kvaliteti; stvarajući partnerstva s ljudima s kojima dijelimo zajedničke vrijednosti.',
		visionService:
			'Raditi uslugu te ne ograničavamo samo koji cijene vlak od očekujte vožnje. Radeemo sa sportašima, javnim i poslovnim ličnostima, te svima koji u prvoklasno i vrhunsko uslugu prijevoza profesionalnog stajlinga.',
		visionVehicles:
			'Ovo osiguravamo s našim pouzdanim vozilima, koja su sinonimi stila i sigurnosti!',
		eClassName: 'Mercedes-Benz E-klasa',
		eClassDesc:
			'Simbol elegancije i udobnosti. Idealan za transfere do 3 putnika, gdje su diskrecija i stil najvažniji.',
		vClassName: 'Mercedes-Benz V-klasa',
		vClassDesc:
			'Prostranstva bez kompromisa. Naša V-klasa nudi relaksirajući i siguran prijevoz za grupe ili obitelji.',
		pricingTitle: 'Kako do cijene za Vaš transfer?',
		pricingIntro:
			'Svaki je transfer specifičan i uključuje varijabilne troškove poput noćenja vozača, parking usluga, trajekata te vrijeme prijevoza.',
		pricingNote:
			'Svaki Vaš upit i svaku cijenu prilagoditi individualno, brzo i jednostavno nećon što nam pošaljete detalje putovanja.',
		pricingContact:
			'Slobodno za planiranje putovanja šaljite nam na e-mail ili WhatsApp. Za trentnu upite, slobodno nas nazovite!',
		vipNote: 'VIP usluga dostupna je 0 - 24.',
		inquiryTitle: 'Saznajte više o privatnim transferima!',
		inquiryFirstName: 'Ime',
		inquiryLastName: 'Prezime',
		inquiryEmail: 'Email',
		inquiryVehicle: 'Koja klasa vas zanima?',
		inquiryPhone: 'Phone',
		inquiryMessage: 'Poruka',
		inquiryConsent:
			'I consent to Sprinter s Rent a car - Rent a kombi - International/domestic private vehicle storing my submitted information so they can respond to my inquiry.',
		inquirySubmit: 'Spremi'
	},

	// Rental page
	rental: {
		title: 'Rentanje Vozila',
		breadcrumb: 'Rentanje Vozila',
		seats: 'Putnika',
		year: 'Godište',
		gearboxLabel: 'Mjenjač',
		climate: 'Klima',
		cruise: 'Tempomat',
		capacity: 'Kapacitet',
		payload: 'Nosivost',
		yes: 'Da',
		no: 'Ne',
		manual: 'Ručni',
		automatic: 'Automatski',
		deliveryNote: 'Svako naše vozilo možemo dostaviti na traženu adresu.',
		driverNote: 'Za svako naše vozilo možete iznajmiti vozača.',
		termsNotice: 'Molimo da obavezno pročitate uvjete i pravila najma vozila!',
		viewTerms: 'UVJETI I PRAVILA NAJMA',
		rentMe: 'Iznajmi me...',
		waTemplate: 'Pozdrav, zanima me najam vozila {vehicle}. Molim Vas za više informacija.',
		inquiryTitle: 'Provjerite dostupnost i cijenu',
		inquiryFrom: 'Od datuma',
		inquiryTo: 'Do datuma',
		inquiryDays: 'Broj dana',
		inquiryEstimate: 'Procjena cijene',
		inquiryContactForLonger: 'Za najam dulji od {days} dana, kontaktirajte nas direktno.',
		inquiryDateError: 'Datum povratka mora biti nakon datuma preuzimanja.',
		inquiryName: 'Vaše ime',
		inquiryEmail: 'E-mail',
		inquiryPhoneLabel: 'Telefon',
		inquiryNotes: 'Dodatne napomene',
		inquirySubmit: 'Pošalji upit',
		inquiryOnRequest: 'Cijena na upit',
		filterLabel: 'Kategorija',
		filterAll: 'Sva vozila',
		filterPassenger: 'Putnička',
		filterCargo: 'Teretna',
		sortLabel: 'Sortiraj',
		sortDefault: 'Zadano',
		sortYear: 'Najnovije',
		sortPriceAsc: 'Cijena (niska → visoka)',
		noResults: 'Nema vozila u ovoj kategoriji.',
		pricingTitle: 'Cijene najma:',
		pricingVatNote: '(* Izražene cijene su sa PDV-om)',
		pricingDisclaimer: 'Nakon isteka rezerviranih kilometara svaki dodatni km se naplaćuje prema tablici iznad.',
		extendedStayNotice: 'Za sve upite koji se odnose na putovanja dulja od {days} dana, putovanja izvan granica Hrvatske, kao i za izradu personaliziranih ponuda, molimo Vas da nas direktno kontaktirate.',
		speedLimitNotice: 'Brzina ovog vozila ograničena je na {limit} km/h. To nam omogućuje da održimo svako vozilo u optimalnom stanju, spremno za sljedećeg putnika.',
		colDays: 'Najam na:',
		colPrice: 'Cijena €',
		colKm: 'Km',
		colExtraKm: 'Dodatni Km',
		day: 'dan',
		days: 'dana',
		upTo: 'Do',
		insuranceTitle: 'Osiguranja',
		insuranceSubtitle: 'Osiguranje i depozit',
		insurancePremium: 'Premium – 1 dan / 10 eura',
		insuranceRequirement: 'Da biste mogli ostvariti Premium osiguranje, potreban je policijski zapisnik o nezgodi. Ovim osiguranjem nije pokrivena šteta nastala unutar vozila nepažnjom putnika ili vozača.',
		insuranceCoverage: 'S našim premium osiguranjem nemate materijalne odgovornosti. Uključena je zaštita od krađe, sudara, oštećenja na vjetrobranskim staklima i gumama, te od vremenskih nepogoda.',
		insuranceDeposit: 'Depozit je obavezan za svako vozilo. Iznos se kreće u rasponu od 200 do 1000 eura.',
		insuranceIncluded: 'Osiguranje je uključeno u cijenu najma.',
		pickupTitle: 'Upute o preuzimanju vozila',
		pickupHours: 'Preuzimanje i vraćanje vozila u radno vrijeme poslovnice dogovoreno ugovorom',
		pickupLocations: 'Preuzimanje u poslovnici Dardi, na Vašoj adresi (Osijek), na parkinzima trgovačkih centara',
		pickupFuel: 'Vozilo se dobija sa punim tankom – po vraćanju vozila nadopuniti tank',
		pickupTerms: 'Molimo obavezno pročitajte Uvjete najma',
		paymentTitle: 'Uvjeti i načini plaćanja:',
		paymentMethod: 'Plaćanje se vrši odmah po predavanju vozila, dodatni kilometri po završetku najma',
		paymentAccepted: 'Primamo kartice, gotovinu i transakcijske uplate.',
		farewell: 'Hvala na razumijevanju, sretan put želi vam Sprinter d.o.o.',
		backToList: 'Povratak na vozila',
		specifications: 'Specifikacije',
		type: 'Tip',
		contactUs: 'Kontaktirajte nas za najam',
		whatsappInquiry: 'Upit putem WhatsAppa',
		callUs: 'Nazovite nas',
		vehicleNotFound: 'Vozilo nije pronađeno'
	},

	// Footer
	footer: {
		howToReachUs: 'KAKO DO NAS',
		advisory:
			'Naša vozila su često na dostavi, servisu i održavanju, stoga vas molimo da Vaš dolazak najavite. Hvala na razumijevanju!',
		newsletter: 'Primajte novosti o novim oglasima',
		emailPlaceholder: 'Vaša e-mail adresa',
		subscribe: 'Pretplatite se',
		copyright: '© Sprinter | Sva prava pridržana',
		cookies: 'Cookies Policy',
		privacy: 'Pravila privatnosti',
		rentalTerms: 'Pravila - Uvjeti najma vozila',
		addressLabel: 'ADRESA:',
		complaintTitle: 'Obavijest o načinu podnošenja pisanog prigovora',
		complaint: `Sukladno čl. 6. st. 3. Zakona o pružanju usluga u turizmu (NN 130/17), pisani prigovor možete podnijeti na ${contact.email}`
	},

	// Contact page
	contact: {
		title: 'Kontakt',
		metaDescription:
			'Kontaktirajte Sprinter d.o.o. — profesionalno čišćenje u Puli i Istri. WhatsApp, telefon i email.',
		formHeading: 'Pošaljite nam upit',
		formName: 'Vaše ime',
		formEmail: 'Vaša e-mail adresa',
		formPhone: 'Vaš telefon',
		formMessage: 'Vaša poruka ili komentar',
		formPrivacy: 'prihvaćam politiku zaštite osobnih podataka',
		formSubmit: 'Pošalji',
		office: 'Ured',
		workingHours: 'Radno vrijeme',
		weekdays: 'Ponedjeljak — Nedjelja: 08:00 – 19:00 h',
		findUs: 'Pronađite nas',
		getDirections: 'Upute za dolazak'
	},

	// Kontakt WhatsApp bridge page (Google Ads landing)
	contactWa: {
		title: 'Kontakt WhatsApp — Sprinter Transferi Pula',
		metaDescription:
			'Rezervirajte privatni transfer ili taxi vožnju u Puli putem WhatsAppa. Brz odgovor, fiksne cijene, dostupni 24/7.',
		eyebrow: 'Kontakt · WhatsApp',
		h1: 'Kontaktirajte nas putem WhatsAppa',
		intro1:
			'Sprinter organizira privatne transfere i taxi vožnje u Puli i diljem Istre — doček na zračnoj luci Pula s natpisom imena, međugradski transferi, lokalne taxi vožnje. Vozimo Mercedes E-klasu i V-klasu, 0–24, fiksne cijene bez iznenađenja.',
		intro2:
			'WhatsApp je najbrži način da dobijete ponudu i potvrdite rezervaciju. Javljamo se unutar nekoliko minuta, na hrvatskom, engleskom, njemačkom ili talijanskom. Bez pozivnih centara — pišete izravno s nama.',
		intro3:
			'Kliknite gumb ispod da otvorite razgovor. Ako više volite telefon, broj se nalazi neposredno ispod gumba.',
		ctaButton: '💬 Pošaljite poruku na WhatsApp',
		phoneFallback: 'Ili nas nazovite na',
		tipsTitle: 'Što napisati u prvoj poruci',
		tipsList: [
			'Datum i okvirno vrijeme polaska',
			'Mjesto preuzimanja (npr. „Zračna luka Pula, terminal“)',
			'Destinacija (grad, hotel ili točna adresa)',
			'Broj putnika i količina prtljage',
			'Trebate li povratak ili samo u jednom smjeru'
		]
	},

	// Common
	common: {
		phone: contact.phone,
		email: contact.email,
		address: contact.address,
		whatsapp: 'WhatsApp'
	},

	// Testimonials (live Google reviews)
	testimonials: {
		eyebrow: 'Recenzije',
		title: 'Što kažu naši klijenti',
		basedOn: 'na temelju {n} Google recenzija',
		translatedBy: 'Prevedeno s Google-a',
		showOriginal: 'Prikaži original',
		hideOriginal: 'Sakrij original',
		viewAll: 'Pogledajte sve na Google-u'
	},

	// Thank you page
	thankYou: {
		title: 'Hvala na upitu',
		subtitle: 'Vaša poruka je zaprimljena. Javljamo se u najkraćem mogućem roku.',
		responseTime: 'Obično odgovaramo unutar 24 sata u radne dane.',
		goHome: 'Početna',
		goRental: 'Pregledajte vozila',
		meanwhileWhatsapp: 'Ako vam je hitno, javite nam se odmah putem WhatsAppa.'
	},

	// Generic form statuses
	form: {
		submitting: 'Šaljem...',
		errorServer: 'Došlo je do pogreške. Molimo pokušajte ponovno ili nas nazovite.',
		errorRequired: 'Ovo polje je obvezno',
		errorEmail: 'Neispravna e-mail adresa'
	},

	// Privacy policy page
	privacy: {
		metaDescription:
			'Pravila privatnosti za sprinter.hr — kako prikupljamo i obrađujemo osobne podatke prema GDPR-u.'
	},

	// Error page
	error: {
		notFoundTitle: 'Stranica nije pronađena',
		notFoundDesc: 'Stranica koju tražite ne postoji ili je uklonjena.',
		goHome: 'Početna',
		goCleaning: 'Usluge čišćenja'
	}
};

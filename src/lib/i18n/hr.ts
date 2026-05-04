import { contact } from '../contact';

export default {
	lang: 'hr',
	langName: 'Hrvatski',

	// Nav
	nav: {
		home: 'Početna',
		cleaning: 'Usluge čišćenja',
		rental: 'Rent a Kombi/Car',
		transfers: 'Luksuzni transferi',
		contact: 'Kontakt'
	},

	// Header banner
	banner: {
		notice: 'Molimo vašu najavu prije dolaska',
		address: contact.address,
		phone: contact.phone,
		hours: 'Pon - Ned: 08h - 19h'
	},

	// Homepage
	home: {
		heroCleaningTitle: 'Profesionalno Čišćenje',
		heroCleaningSubtitle: 'Usluge čišćenja za luksuzne nekretnine',
		heroRentalTitle: 'Rent a Car\nRent a Kombi',
		heroRentalSubtitle: 'Moguća dostava vozila',
		heroTransfersTitle: 'Osobni vozači i luksuzni transferi',
		heroTransfersSubtitle: 'Usluga dostupna 0-24',
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

	// Cleaning page
	cleaning: {
		title: 'Usluge čišćenja',
		visionTitle: 'Moja vizija: Više od čistoće',
		visionIntro:
			'Kao direktorica tvrtke, svoj poziv ne vidim kao puki servis za čišćenje, već kao misiju vraćanja sjaja i sklada u Vaš životni prostor.',
		visionHospitality: 'Profesionalna pozadina u ugostiteljstvu',
		visionExperience: 'Iskustvo održavanja ekskluzivnih njemačkih vila i rezidencija',
		visionPersonal: 'Osobna uključenost u svaki projekt',
		visionDiscipline: 'Njemačka disciplina i apsolutna diskrecija',
		exclusivityTitle: 'Ekskluzivnost bez kompromisa',
		exclusivityDesc:
			'Naša usluga cilja na zahtjevne klijente, isključujući stubišta, kafiće ili javne prostore.',
		residencesTitle: 'Privatne rezidencije i arhitektonska zdanja širom Istre',
		residencesDesc:
			'Vaša vila nije samo nekretnina, ona je Vaše utočište. Usluge uključuju pripremu prije dolaska, diskretno održavanje tijekom boravka i sveobuhvatnu konzervaciju.',
		accommodationsTitle: 'Smještaj najviše kategorije',
		accommodationsDesc:
			'Luksuzni apartmani, boutique hoteli, jahte. Specijalizirana njega materijala: plemenito drvo, prirodni kamen, polirane površine, delikatne tkanine.',
		standardsTitle: 'Standardi koje donosim u Vaš dom',
		standardTech: 'Vrhunska tehnologija',
		standardTechDesc: 'Profesionalna Kärcher oprema',
		standardDiscipline: 'Disciplina i zdravlje',
		standardDisciplineDesc: 'Licencirani fitness instruktor',
		pricesTitle: 'Naše cijene',
		pricesVatNote: '(Sve navedene cijene uključuju PDV)',
		pricingDisclaimer:
			'Ako na terenu ustanovimo da je stanje objekta zahtjevnije od dogovorenog, cijenu korigiramo prema stvarnom trudu.',
		pricingDisclaimerLabel: 'Pravilo struke i napomena:',
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
			price: '80 € – 320 €',
			description:
				'Održavanje visokog standarda čistoće prema dogovorenom protokolu i terminima.'
		},
		{
			name: 'Dubinska regeneracija interijera',
			subtitle: 'Kauči, madraci…',
			duration: '4 – 8 sati',
			price: '150 € – 400 €',
			description:
				'Potpuni tretman interijera i eksterijera uz primjenu vrhunske Kärcher tehnologije.'
		},
		{
			name: 'Prije – poslije najma',
			subtitle: 'Priprema objekta',
			duration: '2 – 3 sata',
			price: '100 € – 250 €',
			description:
				'Priprema objekta prije dolaska ili nakon odlaska vlasnika i gostiju.'
		},
		{
			name: 'Useljenje ili Iseljenje',
			subtitle: 'Sveobuhvatna priprema',
			duration: '6 – 10 sati',
			price: '200 € – 500 €',
			description:
				'Sveobuhvatna priprema nekretnine: dubinsko čišćenje, unutrašnjost ormarića i kućanski aparati.'
		},
		{
			name: 'Kristalna prozirnost staklenih površina',
			subtitle: 'Specijalizirana briga',
			duration: '2 – 4 sata',
			price: '60 € – 150 €',
			description:
				'Specijalizirana briga o velikim staklenim stijenama i zahtjevnim staklenim površinama.'
		},
		{
			name: 'Eksterijer, bazeni i okućnica',
			subtitle: 'Terasa i zona oko bazena',
			duration: '3 – 5 sati',
			price: '100 € – 250 €',
			description:
				'Priprema terasa i zona oko bazena za maksimalan vizualni užitak i higijenu.'
		},
		{
			name: 'Profesionalna njega tekstila',
			subtitle: 'Pranje i glačanje',
			duration: '2 – 4 sata',
			price: '50 € – 120 €',
			description:
				'Pranje i precizno glačanje rublja uz maksimalnu pažnju prema osjetljivim tkaninama.'
		},
		{
			name: 'Sjaj nakon završnih radova',
			subtitle: 'Post-građevinsko čišćenje',
			duration: '8 – 12 sati',
			price: '300 € – 800 €',
			description:
				'Detaljno i sustavno uklanjanje post-građevinske prašine i ostataka radova.'
		}
	],

	// Transfers page
	transfers: {
		title: 'Luksuzni transferi s osobnim vozačem',
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
			'Svaki je transfer specifičan i uključuje varijabilne troškove poput noćenja vozača, parking usluga, trajekta ili cestarina te vrijeme prijevoza.',
		pricingNote:
			'Svaki Vaš upit i svaku cijenu prilagoditi individualno, brzo i jednostavno nećon što nam pošaljete detalje putovanja.',
		pricingContact:
			'Slobodno za planiranje putovanja šaljite nam na e-mail ili WhatsApp. Za trentnu upite, slobodno nas nazovite!',
		vipNote: 'VIP usluga dostupna je 0 - 24.',
		inquiryTitle: 'Saznajte više o luksuznim transferima!',
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
		formHeading: 'Pošaljite nam upit',
		formName: 'Vaše ime',
		formEmail: 'Vaša e-mail adresa',
		formPhone: 'Vaš telefon',
		formMessage: 'Vaša poruka ili komentar',
		formPrivacy: 'prihvaćam politiku zaštite osobnih podataka',
		formSubmit: 'Pošalji',
		office: 'Ured',
		workingHours: 'Radno vrijeme',
		weekdays: 'Ponedjeljak - Subota: 08:00 – 20:00 h',
		sunday: 'Nedjelja: 09:00 – 13:00 h',
		findUs: 'Pronađite nas',
		getDirections: 'Upute za dolazak'
	},

	// Common
	common: {
		phone: contact.phone,
		email: contact.email,
		address: contact.address,
		whatsapp: 'WhatsApp'
	},

	// Testimonials
	testimonials: {
		title: 'Što kažu naši klijenti'
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

	// Error page
	error: {
		notFoundTitle: 'Stranica nije pronađena',
		notFoundDesc: 'Stranica koju tražite ne postoji ili je uklonjena.',
		goHome: 'Početna',
		goRental: 'Najam vozila'
	},

	// Cookie banner
	cookieBanner: {
		message: 'Koristimo kolačiće isključivo za osnovnu funkcionalnost stranice. Nastavkom korištenja prihvaćate našu politiku.',
		accept: 'Prihvaćam',
		learnMore: 'Saznaj više'
	}
};

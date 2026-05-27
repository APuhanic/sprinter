import { contact } from '../contact';

export default {
	lang: 'de',
	langName: 'Deutsch',

	// Nav (compact labels for the top bar)
	nav: {
		home: 'Start',
		cleaning: 'Reinigung',
		transport: 'Transport',
		rental: 'Mieten',
		transfers: 'Transfers / Taxi',
		contact: 'Kontakt'
	},

	// Header banner / utility strip
	banner: {
		notice: 'Wir nehmen aktuell neue Kunden an',
		address: 'Capelleri ul. 5, 52100 Pula',
		phone: contact.phone,
		hours: 'Mo – So · 07—24 Uhr'
	},

	// Homepage
	home: {
		// Hero
		eyebrow: 'Pula · Istrien · seit 2024',
		titleA: 'Ein Zuhause, würdig einer',
		titleB: 'Postkarte',
		sub: 'Professionelle Reinigung in Pula und Istrien — von Apartments und Familienhäusern bis zu Büros und Yachten. Sorgfältig, ohne Improvisation.',
		meta: [
			{ label: 'Sitz', text: 'Capelleri ul. 5, 52100 Pula' },
			{ label: 'Einsatzgebiet', text: 'Pula + Istrien' },
			{ label: 'Antwort', text: 'Antwort am selben Tag, oft binnen einer Stunde' },
			{ label: 'Zahlung', text: 'Bar · Banküberweisung' }
		],
		// Section heads
		servicesEyebrow: '01 · Was wir tun',
		servicesTitle: 'Fünf Reinigungsarten, ein Team',
		servicesSub:
			'Spezialisiert auf Ferienvermietung, wo der Wechsel zwischen Gästen in Stunden gemessen wird. Dieselbe Sorgfalt fließt in alles andere, was wir reinigen.',
		otherEyebrow: '02 · Und mehr',
		otherTitle: 'Sprinter hört nicht beim Reinigen auf',
		otherSub: 'Schwesterdienste, die oft mit Vermietung einhergehen — gleiche Hände, gleiche Nummer.',
		processEyebrow: '03 · So arbeiten wir',
		processTitle: 'Keine zufälligen Crews',
		processSub:
			'Festes Team, eigene Ausrüstung, schriftliches Protokoll je Objekttyp. Beim ersten Termin kommt der Inhaber persönlich.',
		contactEyebrow: '04 · Kontakt',
		contactTitle: 'Sagen Sie uns',
		contactTitleAccent: 'was Sie brauchen',
		contactSub: 'WhatsApp ist am schnellsten. Antwort am selben Tag, meist binnen einer Stunde.',
		// CTAs
		ctaWhatsapp: 'WhatsApp',
		ctaCall: 'Anrufen',
		ctaServices: 'Alle Leistungen',
		ctaLearn: 'Mehr erfahren',
		ctaSeeAll: 'Alle Details öffnen',
		// Hours strip labels
		hoursLabel: 'Mo — So',
		hoursValue: '07 — 24 Uhr',
		featureAlt: 'Professionelle Innenreinigung in ganz Istrien',
		// Transfers hero (top of homepage)
		transfersEyebrow: 'Private Transfers / Taxi · Pula · Istrien · Europa',
		transfersTitleA: 'Wir fahren Sie',
		transfersTitleB: 'zuverlässig',
		transfersSub:
			'Privattransfer mit persönlichem Fahrer oder Taxifahrt in Pula — Online-Preisrechner, keine Überraschungen.',
		transfersCtaBook: 'Transfer buchen',
		transfersCtaTaxi: 'Taxi-Anfrage senden',
		transfersCtaMore: 'Mehr erfahren',
		// Marquee
		marquee: [
			'Apartment-Wechsel',
			'Grundreinigung',
			'Regelmäßige Reinigung',
			'Büros & Geschäftsräume',
			'Yachten & Boote',
			'Pula · Istrien'
		],
		// Legacy carousel keys
		heroCleaningTitle: 'Professionelle Reinigung',
		heroCleaningSubtitle: 'Reinigungsservice für Privatimmobilien',
		heroRentalTitle: 'Auto mieten\nKombi mieten',
		heroRentalSubtitle: 'Fahrzeuglieferung möglich',
		heroTransfersTitle: 'Privatfahrer & Private Transfers',
		heroTransfersSubtitle: 'Service rund um die Uhr verfügbar',
		heroTransportTitle: 'Sprinter Transport',
		heroTransportSubtitle: 'Smarte Logistik auf istrischen Straßen',
		learnMore: 'Mehr erfahren',
		rentMe: 'Jetzt mieten...',
		requestQuote: 'Angebot anfordern',
		deliveryAvailable: 'Wir können jedes Fahrzeug an Ihre gewünschte Adresse liefern',
		driverAvailable: 'Für jedes unserer Fahrzeuge kann ein Fahrer gebucht werden',
		rentalTermsNotice: 'Bitte lesen Sie die Mietbedingungen sorgfältig durch!',
		carouselPrev: 'Vorheriger Slide',
		carouselNext: 'Nächster Slide',
		carouselPause: 'Slideshow pausieren',
		carouselPlay: 'Slideshow starten',
		carouselGoTo: 'Gehe zu Slide'
	},

	// Cleaning services as shown on homepage row list
	homeServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartment-Wechsel',
			nameAccent: 'Wechsel',
			short: 'Schnelle, zuverlässige Wechsel zwischen Gästen, mit hotelartigem Protokoll.'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Grundreinigung',
			nameAccent: 'Grund',
			short:
				'Saisonal oder einmalig, bis ins Detail — Küche, Bad, Fugen, Backofen, Fenster.'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Regelmäßige Reinigung',
			nameAccent: 'Regelmäßige',
			short: 'Wöchentlich oder zweiwöchentlich für Wohnungen und Häuser — festes Team, fester Termin.'
		},
		{
			id: 'office',
			num: '04',
			name: 'Büroreinigung',
			nameAccent: 'Büro',
			short: 'Büros und Geschäftsräume — diskret, außerhalb der Arbeitszeit.'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Yacht- & Bootsreinigung',
			nameAccent: 'Yacht',
			short: 'Innen und außen — zwischen Charter-Wochen oder saisonal.'
		}
	],

	// Sister services strip
	otherServices: [
		{
			tag: 'Transport',
			title: 'Sprinter Transport',
			desc: 'Umzüge, Lieferungen, kleinere Touren in Istrien.',
			slug: 'transport' as const
		},
		{
			tag: 'Vermietung',
			title: 'Auto / Kombi mieten',
			desc: 'Personen- und Lastfahrzeuge — Lieferung möglich.',
			slug: 'rental' as const
		},
		{
			tag: 'Transfers',
			title: 'Private Transfers',
			desc: 'Privater Fahrer, Premium-Fahrzeug, rund um die Uhr.',
			slug: 'transfers' as const
		}
	],

	// Process steps
	process: [
		{
			num: 'I',
			title: 'Schreiben oder anrufen',
			desc: 'WhatsApp ist am schnellsten. Sagen Sie uns, was, wo und wann zu reinigen ist.'
		},
		{
			num: 'II',
			title: 'Angebot',
			desc: 'Schriftliches Angebot am selben Tag. Bei größeren Objekten kommen wir zur Besichtigung.'
		},
		{
			num: 'III',
			title: 'Die Reinigung',
			desc: 'Festes Team, eigene Ausrüstung. Keine Subunternehmer.'
		}
	],

	// Owner panel
	owner: {
		eyebrow: 'Wer hinter Sprinter steht',
		quote: 'Ein kleines Team, eigene Ausrüstung, eine Nummer — ',
		quoteAccent: 'Sie rufen an und wissen, wer kommt.',
		name: 'Zvjezdana Puhanić',
		role: 'Geschäftsführerin · Sprinter Pula',
		bio: 'Ich leite Sprinter aus Pula. Zum ersten Termin komme ich persönlich — um den Ort zu sehen, den Rhythmus festzulegen und zu verstehen, was Sie brauchen. Danach übernimmt das Team, das Sie bereits kennen, alles weitere.',
		portrait: 'Inhaberin-Porträt'
	},

	// Cleaning page (new design)
	cleaningPage: {
		eyebrow: 'Leistung · 01',
		titleA: 'Professionelle',
		titleB: 'Reinigung',
		sub: 'Fünf Reinigungsdienste in Pula und ganz Istrien. Spezialisten für Airbnb und Ferienvermietung, ebenso sorgfältig bei allem anderen.',
		index: 'Index',
		areasEyebrow: 'Wir decken ab',
		areasTitle: 'Pula und das weitere Istrien',
		areasSub:
			'Wir bringen unsere Ausrüstung mit. Außerhalb Pulas auf Anfrage — bitte kurz bestätigen.',
		processEyebrow: 'Ablauf',
		processTitle: 'Keine zufälligen Crews',
		processSub: 'Festes Team, eigene Ausrüstung, der Inhaber kommt zu jedem ersten Termin.',
		testiEyebrow: 'Was Kunden sagen',
		testiTitle: 'Bewertungen folgen bald',
		testiSub:
			'Wir haben mit diesem Bereich gerade erst begonnen — Bewertungen werden im Sommer ergänzt.',
		testiPlaceholder: 'Hier wird eine echte Kundenbewertung stehen. Eine pro Service-Kategorie.',
		testiClient: 'Kundenname',
		testiRoles: ['Apartment-Inhaber', 'Familienhaus', 'Büro'],
		testiTagPlaceholder: '[ Platzhalter ]',
		faqEyebrow: 'Häufig gefragt',
		faqTitle: 'Was Leute fragen',
		faqAccent: 'fragen',
		faqSub: 'Wenn Ihre Frage nicht dabei ist, schreiben Sie uns — Antwort am selben Tag.',
		priceLabel: 'Preis',
		priceDisclaimer: 'Alle Preise verstehen sich ohne MwSt.',
		sendInquiry: 'Anfrage senden',
		airbnbTag: 'Airbnb · Booking · Vrbo',
		airbnbNote:
			'Spezialisiert auf Kurzzeitvermietung — schneller Wechsel, gleichbleibender Standard, flexible Termine zwischen den Gästen.',
		owner: {
			eyebrow: 'Wer hinter Sprinter steht',
			title: 'Mehr als Sauberkeit',
			quote:
				'Ordnung, Ästhetik und absolute Diskretion. Ich kümmere mich um Ihren Raum mit Präzision und persönlicher Verantwortung.',
			bio: [
				'Mein Name ist Zvjezdana Puhanić. Hinter der Reinigung stehe ich persönlich — vom ersten Rundgang bis zum letzten Detail. Jahre in der Hotellerie und in der Pflege exklusiver Villen in Deutschland haben Standards geformt, bei denen ich keine Kompromisse mache.',
				'Ein luxuriöser Raum verdient mehr als gewöhnliches Aufräumen — Disziplin, Diskretion, ein Auge fürs Detail. Deshalb führe ich jedes Projekt selbst: organisiere den Ablauf, überwache die Details, halte die Geräte in den Händen.'
			],
			portraitAlt: 'Zvjezdana Puhanić — Geschäftsführerin, Sprinter d.o.o.',
			actionAlt: 'Zvjezdana Puhanić — professionelle Reinigung mit Kärcher-Ausrüstung'
		}
	},

	// Per-service detail
	cleaningServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartment-Wechsel',
			nameAccent: 'Wechsel',
			long:
				'Ferienvermietung lässt keine Improvisation zu. Wir kommen nach dem Auschecken, gehen vor dem Einchecken — Sie müssen sich keine Gedanken machen.',
			bullets: [
				'Standardprotokoll in 24 Schritten',
				'Bett- und Handtuchwechsel (bringen wir mit)',
				'Schadens- / Mängelbericht mit Fotos',
				'Bestätigung der Bereitschaft vor Gastankunft',
				'Notfalleinsatz innerhalb von 2 Stunden'
			],
			price: 'ab 70 €',
			priceNote: 'bis 50 m²',
			tiers: [
				{ range: 'bis 80 m²', price: 'ab 100 €' },
				{ range: 'bis 100 m²', price: 'ab 120 €' },
				{ range: 'über 100 m²', price: 'ab 140 €' }
			],
			photoTag: 'Apartment-Küche, frisch'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Grundreinigung',
			nameAccent: 'Grund',
			long:
				'Alles, was die regelmäßige Reinigung auslässt. Typisch vor der Saison, nach dem Winter oder vor dem Einzug.',
			bullets: [
				'Backofen, Kühlschrank innen, Kochfeld',
				'Fugen, Silikon, Badezimmerfliesen',
				'Fenster und Fensterrahmen',
				'Hinter und unter Möbeln',
				'Mittel inklusive'
			],
			price: 'ab 2,00 €/m²',
			priceNote: 'Grundreinigung',
			tiers: [{ range: 'Stundensatz (1 Person)', price: '15 € – 22 €' }],
			photoTag: 'Tiefenreinigung von Polstermöbeln'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Regelmäßige Reinigung',
			nameAccent: 'Regelmäßige',
			long:
				'Wir kommen nach festem Plan, am gleichen Tag, zur gleichen Zeit. Wir machen Notizen, wir wissen, wo alles hingehört.',
			bullets: [
				'Festes Team, fester Termin',
				'Wöchentlich, zweiwöchentlich oder monatlich',
				'Mittel inklusive',
				'Schlüssel auf Vertrauensbasis möglich',
				'Kostenlose Stornierung bis 24h vorher'
			],
			price: 'ab 45 €',
			priceNote: 'bis 45 m²',
			tiers: [
				{ range: '45 – 90 m²', price: 'ab 60 €' },
				{ range: 'Fensterreinigung', price: 'ab 1,50 €/m²' },
				{ range: 'Stundensatz (1 Person)', price: '15 € – 22 €' }
			],
			photoTag: 'Sprinter trifft mit Ausrüstung ein'
		},
		{
			id: 'office',
			num: '04',
			name: 'Büroreinigung',
			nameAccent: 'Büro',
			long:
				'Wir arbeiten früh morgens oder spät abends — Ihr Team sieht uns nicht bei der Arbeit.',
			bullets: [
				'Termine außerhalb der Arbeitszeit',
				'Mülleimer, Oberflächen, desinfizierte Tische',
				'Sanitäranlagen, gemeinsame Räume',
				'Monatliche Rechnung, R1-Beleg',
				'NDA auf Anfrage'
			],
			price: '0,75 € – 2 €',
			priceNote: 'pro m²',
			tiers: [{ range: 'Stundensatz (1 Person)', price: 'ab 15 €' }],
			photoTag: 'Büro, Empfang'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Yacht- & Bootsreinigung',
			nameAccent: 'Yacht',
			long:
				'Marinetaugliche Mittel, echte Bootserfahrung — wir kennen den Unterschied zwischen Teak und Gelcoat.',
			bullets: [
				'Charter-Wechsel am Samstag',
				'Innen: Kabinen, Salon, Pantry',
				'Außen: Deck, Fly, Beschläge',
				'Marinetaugliche Mittel',
				'Wir polieren keine Rümpfe'
			],
			price: 'auf Anfrage',
			priceNote: 'Preis je nach Boot',
			tiers: [{ range: 'Stundensatz (1 Person)', price: '15 € – 30 €' }],
			photoTag: 'Terrasse mit Meerblick'
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
			q: 'Bringen Sie Mittel und Ausrüstung mit?',
			a: 'Ja. Wir bringen alle professionellen Mittel, Tücher, Mops und Staubsauger mit. Sie müssen nur den Zugang regeln.'
		},
		{
			q: 'Brauchen Sie eine Anzahlung?',
			a: 'Für Einzelaufträge — nein. Bei monatlichen Verträgen erfolgt die Zahlung am Monatsende nach erbrachter Leistung, meist per Überweisung mit R1-Rechnung.'
		},
		{
			q: 'Was, wenn etwas beschädigt wird?',
			a: 'Wir haben eine Berufshaftpflichtversicherung. Schäden werden schriftlich mit Fotos gemeldet und über die Versicherung erstattet.'
		},
		{
			q: 'Übernehmen Sie Aufträge am selben Tag?',
			a: 'Für Apartment-Wechsel — ja, wenn Sie bis 10 Uhr morgens schreiben. Andere Leistungen — meist am nächsten Werktag.'
		},
		{
			q: 'Stellen Sie eine R1-Rechnung aus?',
			a: 'Ja, R1-Rechnung an Unternehmen oder Selbstständige. Monatliche Abrechnung für Vertragskunden, Zahlung per Überweisung.'
		},
		{
			q: 'Haustiere oder Allergien?',
			a: 'Sagen Sie uns vorher Bescheid. Wir haben tierfreundliche Mittel und hypoallergene Varianten. Auf Wunsch geruchsneutral.'
		},
		{
			q: 'Was ist der Unterschied zwischen regelmäßiger und Grundreinigung?',
			a: 'Regelmäßig hält den Raum sauber — saugen, wischen, Oberflächen, Küche, Bad. Grundreinigung übernimmt, was die regelmäßige auslässt — Backofen innen, Fugen, Fenster, hinter und unter Möbeln, Badezimmerfliesen.'
		},
		{
			q: 'Wie kommen Sie ins Apartment, wenn ich nicht da bin?',
			a: 'Meist Schlüsseltresor oder Türcode. Bei Stammkunden Schlüssel auf Vertrauensbasis mit dokumentierten Besuchen. Alles foto-dokumentiert.'
		}
	],

	// Quote calculator
	calc: {
		eyebrow: 'Preisschätzer',
		title: 'Preis prüfen',
		titleAccent: 'Preis',
		sub: 'Grobe Schätzung in einer Minute. Endgültiger Preis per kurzer WhatsApp-Bestätigung.',
		typeLabel: 'Art der Leistung',
		sizeLabel: 'Größe',
		freqLabel: 'Häufigkeit',
		types: [
			{ id: 'turnover' as const, label: 'Apartment-Wechsel' },
			{ id: 'deep' as const, label: 'Grundreinigung' },
			{ id: 'regular' as const, label: 'Regelmäßig' },
			{ id: 'office' as const, label: 'Büro' },
			{ id: 'yacht' as const, label: 'Yacht / Boot' }
		],
		freqs: [
			{ id: 'oneoff' as const, label: 'Einmalig' },
			{ id: 'weekly' as const, label: 'Wöchentlich' },
			{ id: 'fortnight' as const, label: 'Zweiwöchentlich' },
			{ id: 'monthly' as const, label: 'Monatlich' }
		],
		estimateLabel: 'Schätzung',
		cta: 'An WhatsApp senden',
		yachtNote:
			'Für Boote bitte Länge und Typ angeben — der Preis hängt von Decktyp und Beschlägen ab.',
		msgPrefix: 'Hallo, ich interessiere mich für',
		msgFor: 'Reinigung für ca.',
		msgEstimate: '. Ich habe eine Schätzung von',
		msgCanYou: 'Können Sie die Details bestätigen?'
	},

	// Footer (extended)
	footerNew: {
		tag: 'Professionelle Reinigung in Pula und Istrien',
		colsServices: 'Leistungen',
		colsCompany: 'Unternehmen',
		colsContact: 'Kontakt',
		legal: ['© 2026 Sprinter d.o.o.', 'Datenschutz']
	},

	// Cleaning page
	cleaning: {
		title: 'Reinigungsservice',
		heroSubtitle: 'Eine Kultur der Sauberkeit und Ästhetik mit Handschrift',
		visionTitle: 'Meine Vision: Mehr als Sauberkeit',
		visionPara1:
			'Mein Name ist Zvjezdana Puhanić. Als Geschäftsführerin sehe ich meine Berufung nicht als bloßen Reinigungsservice, sondern als eine Mission, Glanz und Harmonie in Ihren Wohnraum zurückzubringen.',
		visionPara2:
			'Ich bin überzeugt, dass ein luxuriöser Raum mehr verdient als „gewöhnliches Aufräumen“ – er verdient deutsche Disziplin, absolute Diskretion und ein Auge, das sieht, was anderen entgeht.',
		visionPara3:
			'Meine fachliche Erfahrung habe ich in der Hotellerie geschliffen, wo ich kompromisslose Standards für Organisation und Genauigkeit verinnerlicht habe. In den letzten Jahren habe ich mich ausschließlich der Pflege exklusiver Villen und Residenzen in Deutschland gewidmet, im Bewusstsein, dass Kunden meines Profils keine gewöhnliche Arbeitskraft suchen, sondern einen vertrauenswürdigen Partner mit allen erforderlichen Fähigkeiten.',
		visionPara4:
			'Für mich ist diese Arbeit eine Leidenschaft. Auch wenn ich das Unternehmen leite, gehe ich jedes Projekt persönlich an. Ich bin diejenige, die den Prozess organisiert, jedes Detail überwacht und die Geräte selbst in der Hand hält. Nur so kann ich ein Ergebnis garantieren, das hinter meinem Namen steht.',
		exclusivityTitle: 'Exklusivität ohne Kompromisse',
		exclusivityDesc:
			'Unser Service richtet sich nicht an den Massenmarkt. Wir reinigen keine Treppenhäuser, Cafés oder stark frequentierte öffentliche Räume. Mein Fokus und meine Expertise gelten:',
		residencesTitle: 'Privatresidenzen und Architektur-Anwesen in ganz Istrien',
		residencesDesc:
			'Ihre Villa ist nicht nur eine Immobilie – sie ist Ihr Rückzugsort. Ich bin auf den vollständigen Pflegezyklus für Ihr Zuhause spezialisiert: von der detaillierten Vorbereitung vor Ihrer Ankunft über die diskrete Pflege während Ihres Aufenthalts bis zur gründlichen Konservierung nach der Abreise. Mein Ziel ist es, dass Sie jedes Mal, wenn Sie die Tür öffnen, das Gefühl haben, ein völlig neues, frisch eingerichtetes Zuhause zu betreten.',
		accommodationsTitle: 'Unterkünfte der höchsten Kategorie',
		accommodationsDesc:
			'Privatwohnungen, Boutique-Hotels und Yachten verlangen mehr als Reinigung – sie verlangen Materialkenntnis. Ob es um die Pflege von Edelholz (Teak), Naturstein, hochpolierten Oberflächen oder empfindlichen Stoffen geht – meine Verfahren sind auf die Erhaltung ihrer Langlebigkeit zugeschnitten.',
		accommodationsStaging:
			'Meine Arbeit in diesem Segment umfasst auch das finale „Staging“ – das Dekorieren und Vorbereiten des Raums nach den Prinzipien erstklassiger Hotellerie, bei dem jedes Handtuch, jeder Duft und jedes Detail mit der Absicht platziert wird, den Gast oder Eigentümer beim Betreten zu begeistern.',
		standardsTitle: 'Standards, die ich in Ihr Zuhause bringe',
		standardTech: 'Premium-Technologie',
		standardTechDesc:
			'Ich verwende ausschließlich professionelle Kärcher-Ausstattung und zertifizierte, nicht aggressive Produkte, die Ihre Gesundheit und die Langlebigkeit Ihrer Möbel schonen.',
		standardDiscipline: 'Disziplin & Gesundheit',
		standardDisciplineDesc:
			'Als lizenzierte Fitnesstrainerin bringe ich hohe Energie, Disziplin und ein Bewusstsein für die Bedeutung einer gesunden, sauberen Umgebung in die Arbeit ein.',
		positioningTitle: 'Für jene, die Exzellenz schätzen',
		positioningBody:
			'Ich schätze Kunden, die meinen Beruf und die Hingabe respektieren, mit der ich arbeite. Wenn Sie jemanden suchen, der Ihre Immobilie mit dem gleichen Respekt und der gleichen Sorgfalt behandelt wie seine eigene, sind Sie an der richtigen Adresse.',
		positioningQuote:
			'„Ordnung, Ästhetik und absolute Diskretion. Ich kümmere mich um Ihren Raum mit Präzision und persönlicher Verantwortung.“',
		pricesTitle: 'Unsere Preise',
		pricesVatNote: '(Alle angegebenen Preise verstehen sich ohne MwSt.)',
		pricingDisclaimer:
			'Sollten die Bedingungen vor Ort anspruchsvoller sein als vereinbart, wird der Preis dem tatsächlichen Aufwand angepasst. Bitte bedenken Sie den Unterschied zwischen 4 Stunden leichten Staubwischens und 4 Stunden intensiver Kalkentfernung oder Tiefenreinigung vernachlässigter Ecken. Arbeiten auf gewöhnlichen Oberflächen gehen schnell. Arbeiten an teurem Marmor, Teak oder Designer-Keramik erfordern besondere Vorsicht, hochwertige Mittel und langsame, präzise Bewegungen.',
		pricingDisclaimerLabel: 'Hinweis zur Praxis:',
		pricingFooterNote:
			'Alle Preise sind Richtwerte, hängen vom tatsächlichen Zustand der Immobilie ab und können sich ändern.',
		contactTitle: 'Kontaktieren Sie uns',
		contactDesc:
			'Kontaktieren Sie uns gerne für ein Angebot per WhatsApp, Telefon oder über das Kontaktformular.',
		serviceArea: 'Unser Standort befindet sich in Pula – Fažana',
		byFounder: 'von Zvjezdana Puhanić'
	},

	// Cleaning services data
	services: [
		{
			name: 'Kontinuierliche Makellosigkeit',
			subtitle: 'Regelmäßige Pflege',
			duration: '2 – 4 – 6 – 8 Stunden',
			price: '€60 – €250',
			description:
				'Aufrechterhaltung hoher Sauberkeitsstandards nach vereinbartem Protokoll und Zeitplan.'
		},
		{
			name: 'Intensive Innenraumregeneration',
			subtitle: 'Sofas, Matratzen…',
			duration: '4 – 8 Stunden',
			price: '€110 – €300',
			description:
				'Vollständige Innen- und Außenbehandlung mit Premium-Kärcher-Technologie.'
		},
		{
			name: 'Vor & nach der Vermietung',
			subtitle: 'Objektvorbereitung',
			duration: '2 – 3 Stunden',
			price: '€80 – €180',
			description:
				'Objektvorbereitung vor der Ankunft des Eigentümers/Gastes oder nach der Abreise.'
		},
		{
			name: 'Ein- oder Auszug',
			subtitle: 'Umfassende Vorbereitung',
			duration: '6 – 10 Stunden',
			price: '€150 – €460',
			description:
				'Umfassende Objektvorbereitung: Grundreinigung, Schrankinnenräume und Küchengeräte.'
		},
		{
			name: 'Kristallklare Glasflächen',
			subtitle: 'Spezialpflege',
			duration: '2 – 4 Stunden',
			price: '€45 – €110',
			description:
				'Spezialpflege für große Glaswände und anspruchsvolle Glasflächen.'
		},
		{
			name: 'Außenbereich, Pools & Gelände',
			subtitle: 'Terrassen- und Poolbereich',
			duration: '3 – 5 Stunden',
			price: '€80 – €180',
			description:
				'Vorbereitung von Terrassen- und Poolbereichen für maximalen optischen Genuss und Hygiene.'
		},
		{
			name: 'Professionelle Textilpflege',
			subtitle: 'Waschen und Bügeln',
			duration: '2 – 4 Stunden',
			price: '€45 – €100',
			description:
				'Präzises Waschen und Bügeln mit höchster Sorgfalt für empfindliche Stoffe.'
		},
		{
			name: 'Glanz nach dem Bau',
			subtitle: 'Bauendreinigung',
			duration: '8 – 12 Stunden',
			price: '€220 – €600',
			description:
				'Detaillierte, systematische Entfernung von Baustaub und Rückständen.'
		}
	],

	// Transport page
	transport: {
		title: 'Transportdienste',
		heroTitle: 'Sprinter Transport',
		heroSubtitle: 'Smarte Logistik auf istrischen Straßen',
		introPara1:
			'Vergessen Sie komplizierte, langsame Umzugsdienste. Wenn Sie schnellen, präzisen und sicheren Warentransport von A nach B benötigen – Sprinter ist Ihr professioneller Partner.',
		introPara2:
			'Wir sind auf den Warentransport für Kunden spezialisiert, die organisiert sind und Effizienz schätzen. Ob eine neue Küche aus Ikea oder Rijeka, Material aus Pevex und Elgrad oder der Transport wertvoller Möbel in Ihre Villa – wir liefern eine Lösung, die Zeit und Geld spart.',
		whyTitle: 'Warum Sprinter Transport wählen?',
		whyFleetTitle: 'Komplette Flotte für jeden Bedarf',
		whyFleetDesc:
			'Vom wendigen Renault Trafic bis zum geräumigen Mercedes Sprinter – wir haben das passende Volumen für jede Ladung.',
		whyAreaTitle: 'Istrien, Kroatien und darüber hinaus',
		whyAreaDesc:
			'Unser Standort ist Pula, doch wir liefern Ihre Ware genau dorthin, wo sie gebraucht wird.',
		whyAssistTitle: 'Fahrer-Assistenz',
		whyAssistDesc:
			'Wir lassen Sie nicht mit der Ladung allein. Unser Service umfasst aktive Hilfe beim Be- und Entladen am Fahrzeug.',
		whyTechTitle: 'Sicherheit und Technologie',
		whyTechDesc:
			'Alle unsere Fahrzeuge sind mit GPS ausgestattet, was uns präzise Organisation und jederzeitige Einsicht in den Status Ihres Transports ermöglicht.',
		logisticsTitle: '„Bis zur Tür“-Logistik – So arbeiten wir',
		logisticsPara1:
			'Unser Geschäftsmodell ist auf maximale Transporteffizienz ausgerichtet. Um den günstigsten Preis und die schnellste Servicegeschwindigkeit zu gewährleisten, sind wir auf die Lieferung bis zu Ihrer Hausnummer oder dem Eingang des Gebäudes spezialisiert.',
		logisticsPara2Label: 'Professioneller Standard:',
		logisticsPara2:
			'Unsere primäre Aufgabe ist der sichere Transport und die Handhabung der Ladung am Fahrzeug. Das Tragen der Sachen über mehrere Stockwerke bieten wir nicht an, was uns erlaubt, schnell, präzise und für Ihren nächsten Transport verfügbar zu bleiben.',
		logisticsPara3Label: 'Sauber. Pünktlich. Zuverlässig.',
		logisticsPara3:
			'Als Unternehmen, das auch Privatvillen pflegt, wissen wir, wie wichtig Liebe zum Detail ist. Unsere Fahrzeuge sind gepflegt, unser Service ist diskret und professionell.',
		quoteTitle: 'Brauchen Sie ein schnelles Angebot?',
		quoteIntro:
			'Rufen Sie uns gerne an oder schreiben Sie uns auf WhatsApp. Damit wir Ihnen sofort genaue Informationen geben können, halten Sie bitte folgende Angaben bereit:',
		quoteItem1: 'Genaue Abholadresse',
		quoteItem2: 'Endziel',
		quoteItem3: 'Art der Ware und ungefähres Gewicht',
		quoteItem4: 'Gewünschtes Transportdatum',
		contactTitle: 'Kontaktieren Sie uns',
		contactDesc: 'Rufen Sie an oder schreiben Sie – wir antworten schnell.',
		baseNote: 'Unser Standort befindet sich in Pula',
		closing: 'Ihr Sprinter Team – professionelle Transportlogistik'
	},

	// Transfers page (Redesign)
	transfersPage: {
		eyebrow: 'Service · 03',
		title: 'Private Transfers / Taxi',
		titleAccent: 'Transfers / Taxi',
		titleSuffix: ' - Pula - Istrien - Europa',
		leadOne:
			'Sie setzen sich. Der Fahrer schließt die Tür. Und Sie müssen an nichts anderes mehr denken.',
		ctaCallout:
			'Buchen Sie schnell und einfach Ihre Taxifahrt oder Ihren Transfer über unser Formular.',
		companyText:
			'Sprinter ist ein Familienunternehmen aus Pula. Wir organisieren private Transfers und Taxifahrten in Pula, in ganz Istrien und Europa — zuverlässig, pünktlich, ohne Überraschungen.',
		termsTitle: 'Bedingungen & Informationen',
		terms: [
			'Bei Verkehrsstaus kann sich der Preis um 0,30 € pro Minute Verzögerung erhöhen.',
			'Empfang mit Namensschild — auf Anfrage.',
			'Kindersitz kostenlos — bitte in der Anmerkung angeben.',
			'Buchungsbestätigung per WhatsApp innerhalb von 30 Minuten.',
			'Bei längeren Transfers können zusätzliche Kosten anfallen — Übernachtung des Fahrers, Maut, Wartezeit, Fähren.'
		],
		fleetEyebrow: 'Fuhrpark',
		fleetTitle: 'Zwei Fahrzeuge, ein Standard',
		fleetSub: 'Wählen Sie die richtige Größe — die Preisgestaltung bleibt transparent.',
		eClassName: 'Mercedes-Benz E-Klasse',
		eClassDesc:
			'Eleganz und Komfort für bis zu 3 Passagiere — die richtige Wahl, wenn Diskretion und Stil zählen.',
		vClassName: 'Mercedes-Benz V-Klasse',
		vClassDesc:
			'Geräumig und ruhig für bis zu 7 Passagiere — entspannte und sichere Beförderung für Gruppen oder Familien.',
		trustEyebrow: 'Was inklusive ist',
		trustSignAirport: 'Empfang mit Namensschild — auf Anfrage',
		trustChildSeat: 'Kindersitz kostenlos',
		trustWhatsApp: 'WhatsApp-Bestätigung in 30 Min.'
	},

	// Transfer-Kalkulator
	transferCalc: {
		title: 'Preisrechner',
		vatNote: 'inkl. MwSt.',
		fromLabel: 'Abholort',
		fromPh: 'Flughafen Pula, Hotel, Adresse…',
		toLabel: 'Zielort',
		toPh: 'Rovinj, Opatija, Adresse…',
		sendLocation: 'Adresse unbekannt? Senden Sie Ihren Standort per WhatsApp',
		routeCalculating: 'Berechne…',
		routeError: 'Route konnte nicht berechnet werden. Bitte Adressen prüfen.',
		mapsUnavailable: 'Live-Berechnung derzeit nicht verfügbar — senden Sie eine Anfrage, Antwort innerhalb von 30 Minuten.',
		trafficNote: 'Bei Verkehrsstaus kann sich der Preis um 0,30 € pro Minute Verzögerung erhöhen.',
		eClass: 'E-Klasse',
		eClassRange: '1 – 3 Personen',
		vClass: 'V-Klasse',
		vClassRange: '1 – 7 Personen',
		bookingTitle: 'Ihre Buchungsdaten',
		travelTimeLabel: 'Fahrtzeit',
		fullName: 'Name',
		fullNamePh: '',
		paxCount: 'Personen',
		date: 'Datum',
		time: 'Uhrzeit',
		timePlaceholder: '— Uhrzeit wählen —',
		phone: 'Telefon (optional)',
		note: 'Anmerkung (optional)',
		notePh: 'Flugnr., Kindersitz…',
		vatIncl: 'inkl. MwSt.',
		estimateNote: 'ca.',
		longHaulCaveat: 'Preis enthält keine Übernachtung des Fahrers, Maut, Fähren.',
		errorBook: 'Bitte geben Sie Name, Datum und Uhrzeit ein.',
		sendBooking: 'Über WhatsApp buchen',
		formNote: 'Verfügbar 07 – 24 · sprinter.hr · +385 95 722 6918',
		whatsapp: 'WhatsApp',
		call: 'Anrufen',
		email: 'E-Mail',
		hours: 'Öffnungszeiten: 07:00 – 24:00',
		// WhatsApp message labels
		mDest: 'Zielort',
		mVeh: 'Fahrzeug',
		mPrice: 'Preis',
		mDate: 'Datum',
		mTime: 'Uhrzeit',
		mPax: 'Personen',
		mName: 'Name',
		mNote: 'Anmerkung',
		bookMsg: 'Hallo, ich möchte einen Transfer buchen:',
		locMsg: 'Hallo, ich kenne meine Abholadresse nicht. Ich sende meinen Standort.',
		mailSubject: 'Transfer-Buchung'
	},

	// Transfers page (alte Kopie — vorübergehend behalten)
	transfers: {
		title: 'Private Transfers mit Privatfahrer',
		visionIntro:
			'Unsere Vision ist eine Aristokratie des Transports, die weit über das bloße Fahren hinausgeht. Wir bieten ein Erlebnis, das auf Respekt, Diskretion und Qualität aufgebaut ist – und schaffen Partnerschaften mit Menschen, die unsere Werte teilen.',
		visionService:
			'Wir arbeiten mit Sportlern, Persönlichkeiten des öffentlichen Lebens und Geschäftsleuten, die Premium-Service und professionelle Beziehungen schätzen – umgesetzt mit zuverlässigen Fahrzeugen, die für Stil und Sicherheit stehen.',
		visionVehicles:
			'Dies gewährleisten wir mit unseren bewährten Fahrzeugen – Synonym für Stil und Sicherheit!',
		eClassName: 'Mercedes-Benz E-Klasse',
		eClassDesc:
			'Ein Symbol für Eleganz und Komfort. Ideal für Transfers von bis zu 3 Passagieren, bei denen Diskretion und Stil im Vordergrund stehen.',
		vClassName: 'Mercedes-Benz V-Klasse',
		vClassDesc:
			'Großzügigkeit ohne Kompromisse. Unsere V-Klasse bietet entspannten und sicheren Transport für Gruppen oder Familien.',
		pricingTitle: 'Wie erhalten Sie ein Angebot für Ihren Transfer?',
		pricingIntro:
			'Jeder Transfer ist einzigartig und beinhaltet variable Kosten wie Fahrerübernachtungen, Parkgebühren, Fähr-/Mautgebühren und Reisezeit.',
		pricingNote:
			'Wir erstellen jedes Angebot individuell, schnell und unkompliziert, sobald Sie uns Ihre Reisedetails mitteilen.',
		pricingContact:
			'Senden Sie uns gerne Ihre Reisepläne per E-Mail oder WhatsApp. Für sofortige Anfragen rufen Sie uns einfach an!',
		vipNote: 'VIP-Service rund um die Uhr verfügbar.',
		inquiryTitle: 'Erfahren Sie mehr über private Transfers!',
		inquiryFirstName: 'Vorname',
		inquiryLastName: 'Nachname',
		inquiryEmail: 'E-Mail',
		inquiryVehicle: 'Welche Klasse interessiert Sie?',
		inquiryPhone: 'Telefon',
		inquiryMessage: 'Nachricht',
		inquiryConsent:
			'Ich stimme zu, dass Sprinter meine übermittelten Daten speichert, um auf meine Anfrage antworten zu können.',
		inquirySubmit: 'Absenden'
	},

	// Rental page
	rental: {
		title: 'Fahrzeugvermietung',
		breadcrumb: 'Fahrzeugvermietung',
		seats: 'Sitzplätze',
		year: 'Baujahr',
		gearboxLabel: 'Getriebe',
		climate: 'Klimaanlage',
		cruise: 'Tempomat',
		capacity: 'Fassungsvermögen',
		payload: 'Nutzlast',
		yes: 'Ja',
		no: 'Nein',
		manual: 'Schaltgetriebe',
		automatic: 'Automatik',
		deliveryNote: 'Wir können jedes Fahrzeug an Ihre gewünschte Adresse liefern.',
		driverNote: 'Für jedes unserer Fahrzeuge kann ein Fahrer gebucht werden.',
		termsNotice: 'Bitte lesen Sie die Mietbedingungen sorgfältig durch!',
		viewTerms: 'MIETBEDINGUNGEN',
		rentMe: 'Jetzt mieten...',
		waTemplate: 'Hallo, ich interessiere mich für die Miete des {vehicle}. Könnten Sie mir weitere Informationen senden?',
		inquiryTitle: 'Verfügbarkeit und Preis prüfen',
		inquiryFrom: 'Von',
		inquiryTo: 'Bis',
		inquiryDays: 'Tage',
		inquiryEstimate: 'Preisschätzung',
		inquiryContactForLonger: 'Für Mietzeiträume über {days} Tage kontaktieren Sie uns bitte direkt.',
		inquiryDateError: 'Rückgabedatum muss nach dem Abholdatum liegen.',
		inquiryName: 'Ihr Name',
		inquiryEmail: 'E-Mail',
		inquiryPhoneLabel: 'Telefon',
		inquiryNotes: 'Zusätzliche Anmerkungen',
		inquirySubmit: 'Anfrage senden',
		inquiryOnRequest: 'Preis auf Anfrage',
		filterLabel: 'Kategorie',
		filterAll: 'Alle Fahrzeuge',
		filterPassenger: 'PKW',
		filterCargo: 'Transporter',
		sortLabel: 'Sortieren',
		sortDefault: 'Standard',
		sortYear: 'Neueste',
		sortPriceAsc: 'Preis (niedrig → hoch)',
		noResults: 'Keine Fahrzeuge in dieser Kategorie.',
		pricingTitle: 'Mietpreise:',
		pricingVatNote: '(* Alle Preise inkl. MwSt.)',
		pricingDisclaimer: 'Nach Überschreitung der inkludierten Kilometer wird jeder zusätzliche km gemäß der obigen Tabelle berechnet.',
		extendedStayNotice: 'Für Anfragen zu Mietzeiträumen über {days} Tage, Reisen außerhalb Kroatiens oder individuelle Angebote kontaktieren Sie uns bitte direkt.',
		speedLimitNotice: 'Dieses Fahrzeug ist auf {limit} km/h begrenzt. So halten wir jedes Fahrzeug in optimalem Zustand für den nächsten Fahrer.',
		colDays: 'Mietdauer:',
		colPrice: 'Preis €',
		colKm: 'Km',
		colExtraKm: 'Zusätzl. Km',
		day: 'Tag',
		days: 'Tage',
		upTo: 'Bis',
		insuranceTitle: 'Versicherungen',
		insuranceSubtitle: 'Versicherung & Kaution',
		insurancePremium: 'Premium – 1 Tag / 10 Euro',
		insuranceRequirement: 'Um die Premium-Versicherung in Anspruch nehmen zu können, ist ein polizeilicher Unfallbericht erforderlich. Diese Versicherung deckt keine Schäden im Fahrzeuginneren ab, die durch Fahrlässigkeit von Passagieren oder Fahrern verursacht wurden.',
		insuranceCoverage: 'Mit unserer Premium-Versicherung haben Sie keine materielle Haftung. Schutz vor Diebstahl, Kollision, Windschutzscheiben- und Reifenschäden sowie wetterbedingten Schäden ist enthalten.',
		insuranceDeposit: 'Eine Kaution ist für jedes Fahrzeug obligatorisch. Der Betrag liegt zwischen 200 und 1.000 Euro.',
		insuranceIncluded: 'Die Versicherung ist im Mietpreis enthalten.',
		pickupTitle: 'Hinweise zur Fahrzeugübernahme',
		pickupHours: 'Übernahme und Rückgabe während der Bürozeiten gemäß Vertrag',
		pickupLocations: 'Übernahme in unserer Filiale in Darda, an Ihrer Adresse (Osijek) oder auf Einkaufszentrum-Parkplätzen',
		pickupFuel: 'Das Fahrzeug wird mit vollem Tank übergeben — bitte vor der Rückgabe volltanken',
		pickupTerms: 'Bitte lesen Sie unbedingt die Mietbedingungen',
		paymentTitle: 'Zahlungsbedingungen:',
		paymentMethod: 'Zahlung erfolgt sofort bei Fahrzeugübergabe, zusätzliche Kilometer nach Mietende',
		paymentAccepted: 'Wir akzeptieren Karten, Bargeld und Banküberweisungen.',
		farewell: 'Vielen Dank für Ihr Verständnis, Sprinter d.o.o. wünscht Ihnen eine gute Fahrt.',
		backToList: 'Zurück zu Fahrzeugen',
		specifications: 'Spezifikationen',
		type: 'Typ',
		contactUs: 'Kontaktieren Sie uns zur Miete',
		whatsappInquiry: 'Anfrage per WhatsApp',
		callUs: 'Rufen Sie uns an',
		vehicleNotFound: 'Fahrzeug nicht gefunden'
	},

	// Footer
	footer: {
		howToReachUs: 'SO ERREICHEN SIE UNS',
		advisory:
			'Unsere Fahrzeuge befinden sich häufig in Auslieferung, Service und Wartung. Bitte kündigen Sie Ihren Besuch im Voraus an. Vielen Dank für Ihr Verständnis!',
		newsletter: 'Neuigkeiten über neue Angebote erhalten',
		emailPlaceholder: 'Ihre E-Mail-Adresse',
		subscribe: 'Abonnieren',
		copyright: '© Sprinter | Alle Rechte vorbehalten',
		cookies: 'Cookie-Richtlinie',
		privacy: 'Datenschutzrichtlinie',
		rentalTerms: 'Mietbedingungen',
		addressLabel: 'ADRESSE:',
		complaintTitle: 'Hinweis zur Einreichung schriftlicher Beschwerden',
		complaint:
			`Gemäß Artikel 6, Absatz 3 des Gesetzes über Tourismusdienstleistungen (NN 130/17) können schriftliche Beschwerden an ${contact.email} gerichtet werden`
	},

	// Contact page
	contact: {
		title: 'Kontakt',
		metaDescription:
			'Kontaktieren Sie Sprinter d.o.o. — professionelle Reinigung in Pula und Istrien. WhatsApp, Telefon, E-Mail.',
		formHeading: 'Senden Sie uns eine Anfrage',
		formName: 'Ihr Name',
		formEmail: 'Ihre E-Mail-Adresse',
		formPhone: 'Ihre Telefonnummer',
		formMessage: 'Ihre Nachricht oder Ihr Kommentar',
		formPrivacy: 'Ich akzeptiere die Datenschutzrichtlinie',
		formSubmit: 'Senden',
		office: 'Büro',
		workingHours: 'Öffnungszeiten',
		weekdays: 'Montag — Sonntag: 08:00 – 19:00',
		findUs: 'So finden Sie uns',
		getDirections: 'Wegbeschreibung'
	},

	// Kontakt WhatsApp bridge page (Google Ads landing)
	contactWa: {
		title: 'Kontakt WhatsApp — Sprinter Transfers Pula',
		metaDescription:
			'Buchen Sie einen privaten Transfer oder eine Taxifahrt in Pula per WhatsApp. Schnelle Antwort, Festpreise, rund um die Uhr verfügbar.',
		eyebrow: 'Kontakt · WhatsApp',
		h1: 'Kontaktieren Sie uns über WhatsApp',
		intro1:
			'Sprinter organisiert private Transfers und Taxifahrten in Pula und in ganz Istrien — Empfang am Flughafen Pula mit Namensschild, Stadtübergreifende Transfers, lokale Taxifahrten. Wir fahren Mercedes E-Klasse und V-Klasse, rund um die Uhr, Festpreise ohne Überraschungen.',
		intro2:
			'WhatsApp ist der schnellste Weg, ein Angebot einzuholen und eine Buchung zu bestätigen. Wir antworten innerhalb weniger Minuten, auf Deutsch, Kroatisch, Englisch oder Italienisch. Keine Callcenter — Sie sprechen direkt mit uns.',
		intro3:
			'Tippen Sie auf den Button unten, um den Chat zu öffnen. Falls Sie lieber telefonieren, finden Sie die Nummer direkt unter dem Button.',
		ctaButton: '💬 Nachricht über WhatsApp senden',
		phoneFallback: 'Oder rufen Sie uns an',
		tipsTitle: 'Was Ihre erste Nachricht enthalten sollte',
		tipsList: [
			'Datum und ungefähre Abfahrtszeit',
			'Abholort (z. B. „Flughafen Pula, Terminal")',
			'Ziel (Stadt, Hotel oder genaue Adresse)',
			'Anzahl der Passagiere und Gepäckmenge',
			'Ob Sie eine Rückfahrt oder nur eine einfache Fahrt benötigen'
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
		eyebrow: 'Bewertungen',
		title: 'Stimmen unserer Kunden',
		basedOn: 'basierend auf {n} Google-Bewertungen',
		translatedBy: 'Übersetzt von Google',
		showOriginal: 'Original anzeigen',
		hideOriginal: 'Original ausblenden',
		viewAll: 'Alle auf Google ansehen'
	},

	// Thank you page
	thankYou: {
		title: 'Danke für Ihre Anfrage',
		subtitle: 'Ihre Nachricht ist eingegangen. Wir melden uns schnellstmöglich bei Ihnen.',
		responseTime: 'In der Regel antworten wir innerhalb von 24 Stunden an Werktagen.',
		goHome: 'Startseite',
		goRental: 'Fahrzeuge ansehen',
		meanwhileWhatsapp: 'Bei dringenden Anfragen kontaktieren Sie uns direkt über WhatsApp.'
	},

	// Generic form statuses
	form: {
		submitting: 'Wird gesendet...',
		errorServer: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
		errorRequired: 'Dieses Feld ist erforderlich',
		errorEmail: 'Ungültige E-Mail-Adresse'
	},

	// Privacy policy page
	privacy: {
		metaDescription:
			'Datenschutzerklärung für sprinter.hr — wie wir personenbezogene Daten gemäß DSGVO verarbeiten.'
	},

	// Error page
	error: {
		notFoundTitle: 'Seite nicht gefunden',
		notFoundDesc: 'Die gesuchte Seite existiert nicht oder wurde entfernt.',
		goHome: 'Startseite',
		goCleaning: 'Reinigungsdienste'
	}
};

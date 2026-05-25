import { contact } from '../contact';

export default {
	lang: 'en',
	langName: 'English',

	// Nav (compact labels for the top bar)
	nav: {
		home: 'Home',
		cleaning: 'Cleaning',
		transport: 'Transport',
		rental: 'Rentals',
		transfers: 'Transfers / Taxi',
		contact: 'Contact'
	},

	// Header banner / utility strip
	banner: {
		notice: 'Currently accepting new clients',
		address: 'Capelleri ul. 5, 52100 Pula',
		phone: contact.phone,
		hours: 'Mon – Sun · 07—24h'
	},

	// Homepage
	home: {
		// Hero
		eyebrow: 'Pula · Istria · est. 2024',
		titleA: 'A home worth a',
		titleB: 'postcard',
		sub: 'Professional cleaning across Pula and Istria — apartments and family homes, offices and yachts. Done carefully, without improvising.',
		meta: [
			{ label: 'Based in', text: 'Capelleri ul. 5, 52100 Pula' },
			{ label: 'Service area', text: 'Pula + Istria' },
			{ label: 'Response', text: 'Same-day reply, often within an hour' },
			{ label: 'Payment', text: 'Cash · Bank transfer' }
		],
		// Section heads
		servicesEyebrow: '01 · What we do',
		servicesTitle: 'Five kinds of clean, one team',
		servicesSub:
			'We specialise in holiday-rental turnover, where the gap between guests is measured in hours. The same habits go into everything else we clean.',
		otherEyebrow: '02 · And more',
		otherTitle: "Sprinter doesn't stop at cleaning",
		otherSub: 'Sister services that often pair with rental management — same hands, same number.',
		processEyebrow: '03 · How it works',
		processTitle: 'No drop-in crews',
		processSub:
			'A consistent team, our own kit, a written protocol per property type. The owner shows up to your first job.',
		contactEyebrow: '04 · Contact',
		contactTitle: 'Tell us',
		contactTitleAccent: 'what you need',
		contactSub: 'WhatsApp is fastest. Same-day reply, usually within the hour.',
		// CTAs
		ctaWhatsapp: 'WhatsApp',
		ctaCall: 'Call',
		ctaServices: 'All services',
		ctaLearn: 'Learn more',
		ctaSeeAll: 'See full service page',
		// Hours strip labels
		hoursLabel: 'Mon — Sun',
		hoursValue: '07 — 24h',
		featureAlt: 'Professional interior cleaning across Istria',
		// Transfers hero (top of homepage)
		transfersEyebrow: 'Private transfers / taxi · Pula · Istria · Europe',
		transfersTitleA: 'We drive you',
		transfersTitleB: 'reliably',
		transfersSub:
			'Private transfer with a personal driver or a taxi ride around Pula — online price calculator, no surprises.',
		transfersCtaBook: 'Book a transfer',
		transfersCtaTaxi: 'Send a taxi inquiry',
		transfersCtaMore: 'Learn more',
		// Marquee
		marquee: [
			'Apartment turnover',
			'Deep cleaning',
			'Regular cleaning',
			'Offices & commercial',
			'Yachts & boats',
			'Pula · Istria'
		],
		// Legacy carousel keys
		heroCleaningTitle: 'Professional Cleaning',
		heroCleaningSubtitle: 'Cleaning services for private properties',
		heroRentalTitle: 'Rent a Car\nRent a Kombi',
		heroRentalSubtitle: 'Vehicle delivery available',
		heroTransfersTitle: 'Private drivers & private transfers',
		heroTransfersSubtitle: 'Service available 24/7',
		heroTransportTitle: 'Sprinter Transport',
		heroTransportSubtitle: 'Smart logistics on Istrian roads',
		learnMore: 'Learn more',
		rentMe: 'Rent me...',
		requestQuote: 'Request a quote',
		deliveryAvailable: 'We can deliver any vehicle to your requested address',
		driverAvailable: 'A driver can be hired for any of our vehicles',
		rentalTermsNotice: 'Please make sure to read the rental terms and conditions!',
		carouselPrev: 'Previous slide',
		carouselNext: 'Next slide',
		carouselPause: 'Pause slideshow',
		carouselPlay: 'Play slideshow',
		carouselGoTo: 'Go to slide'
	},

	// Cleaning services as shown on homepage row list
	homeServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartment turnover',
			nameAccent: 'turnover',
			short: 'Quick, dependable change-overs between guests, with a hotel-grade protocol.'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Deep cleaning',
			nameAccent: 'Deep',
			short:
				'Seasonal or one-off, down to the detail — kitchen, bathroom, grout, oven, windows.'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Regular cleaning',
			nameAccent: 'Regular',
			short: 'Weekly or fortnightly visits for homes and flats — same team, same time.'
		},
		{
			id: 'office',
			num: '04',
			name: 'Office cleaning',
			nameAccent: 'Office',
			short: 'Offices and commercial spaces — discreet, outside working hours.'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Yacht & boat cleaning',
			nameAccent: 'Yacht',
			short: 'Interior and exterior — between charter weeks or seasonally.'
		}
	],

	// Sister services strip
	otherServices: [
		{
			tag: 'Transport',
			title: 'Sprinter Transport',
			desc: 'Moves, deliveries, smaller hauls across Istria.',
			slug: 'transport' as const
		},
		{
			tag: 'Rental',
			title: 'Rent a Car / Van',
			desc: 'Passenger and cargo vehicles — delivery available.',
			slug: 'rental' as const
		},
		{
			tag: 'Transfers',
			title: 'Private transfers',
			desc: 'Personal driver, premium vehicle, 24/7.',
			slug: 'transfers' as const
		}
	],

	// Process steps
	process: [
		{
			num: 'I',
			title: 'Message or call',
			desc: 'WhatsApp is the fastest channel. Tell us what to clean, where, and when.'
		},
		{
			num: 'II',
			title: 'Quote',
			desc: 'A written quote within the day. For larger jobs, we come for a walkthrough first.'
		},
		{
			num: 'III',
			title: 'The clean',
			desc: 'Permanent team, our own kit. No subcontractors.'
		}
	],

	// Owner panel
	owner: {
		eyebrow: "Who's behind Sprinter",
		quote: 'A small team, our own kit, one number — ',
		quoteAccent: "you call and you know who's coming.",
		name: 'Zvjezdana Puhanić',
		role: 'Founder · Sprinter Pula',
		bio: "I run Sprinter from Pula. I come to every first job in person — to see the place, agree on the rhythm, and understand what you need. From there the same team you've already met handles everything.",
		portrait: 'Owner portrait'
	},

	// Cleaning page (new design)
	cleaningPage: {
		eyebrow: 'Service · 01',
		titleA: 'Professional',
		titleB: 'cleaning',
		sub: 'Five cleaning services in Pula and across Istria. Airbnb and holiday-rental specialists, equally careful with everything else.',
		index: 'Index',
		areasEyebrow: 'We cover',
		areasTitle: 'Pula and wider Istria',
		areasSub:
			'We arrive with our own kit. Outside Pula, travel on request — message us to confirm.',
		processEyebrow: 'Process',
		processTitle: 'No drop-in crews',
		processSub: 'A consistent team, our own kit, the owner shows up on every first job.',
		testiEyebrow: 'What clients say',
		testiTitle: 'Reviews coming soon',
		testiSub:
			"We just started this side of the business — testimonials will land here over the summer.",
		testiPlaceholder: 'A real client review will sit here. One per service category.',
		testiClient: 'Client name',
		testiRoles: ['Apartment owner', 'Family home', 'Office'],
		testiTagPlaceholder: '[ placeholder ]',
		faqEyebrow: 'Frequently asked',
		faqTitle: 'What people ask',
		faqAccent: 'ask',
		faqSub: "If your question isn't here, message us — we reply same-day.",
		priceLabel: 'Price',
		priceDisclaimer: 'All prices exclude VAT.',
		sendInquiry: 'Send a request',
		airbnbTag: 'Airbnb · Booking · Vrbo',
		airbnbNote:
			'Specialised in short-term rentals — fast turnover, consistent standards, flexible scheduling between guests.',
		owner: {
			eyebrow: 'Who stands behind Sprinter',
			title: 'More than cleanliness',
			quote:
				'Order, aesthetics, and absolute discretion. I look after your space with precision and personal responsibility.',
			bio: [
				"My name is Zvjezdana Puhanić. I stand behind the cleaning personally — from the first walk-through to the last detail. Years in hospitality and maintaining exclusive villas in Germany shaped standards I don't compromise on.",
				'A luxury space deserves more than ordinary tidying — discipline, discretion, an eye for detail. That is why I run every project myself: organising the process, overseeing the details, holding the equipment.'
			],
			portraitAlt: 'Zvjezdana Puhanić — director, Sprinter d.o.o.',
			actionAlt: 'Zvjezdana Puhanić — professional cleaning with Kärcher equipment'
		}
	},

	// Per-service detail
	cleaningServices: [
		{
			id: 'turnover',
			num: '01',
			name: 'Apartment turnover',
			nameAccent: 'turnover',
			long:
				"Holiday rentals don't allow improvising. We come in after check-out, leave before check-in, and you don't have to think about it.",
			bullets: [
				'24-step standard protocol',
				'Linen and towels swapped (we bring them)',
				'Damage / shortage report with photos',
				'Ready-confirmation before guest arrival',
				'Emergency call-outs within 2 hours'
			],
			price: 'from €70',
			priceNote: 'up to 50 m²',
			tiers: [
				{ range: 'up to 80 m²', price: 'from €100' },
				{ range: 'up to 100 m²', price: 'from €120' },
				{ range: 'over 100 m²', price: 'from €140' }
			],
			photoTag: 'Apartment kitchen, made up'
		},
		{
			id: 'deep',
			num: '02',
			name: 'Deep cleaning',
			nameAccent: 'Deep',
			long:
				'Everything regular cleaning skips. Typically before season, after winter, or before moving in.',
			bullets: [
				'Oven, fridge interior, hob',
				'Grout, silicone, bathroom tile',
				'Windows and window tracks',
				'Behind and underneath furniture',
				'All chemicals included'
			],
			price: 'from €2.00/m²',
			priceNote: 'general deep clean',
			tiers: [{ range: 'Hour rate (1 person)', price: '€15 – €22' }],
			photoTag: 'Deep cleaning of upholstered furniture'
		},
		{
			id: 'regular',
			num: '03',
			name: 'Regular cleaning',
			nameAccent: 'Regular',
			long:
				'We come on a fixed schedule, same day, same hours. We keep notes, we know where things go.',
			bullets: [
				'Fixed team, fixed slot',
				'Weekly, fortnightly or monthly',
				'Chemicals included',
				'Key-holding on trust',
				'Free cancellation up to 24h before'
			],
			price: 'from €45',
			priceNote: 'up to 45 m²',
			tiers: [
				{ range: '45 – 90 m²', price: 'from €60' },
				{ range: 'Window cleaning', price: 'from €1.50/m²' },
				{ range: 'Hour rate (1 person)', price: '€15 – €22' }
			],
			photoTag: 'Sprinter arrives with equipment'
		},
		{
			id: 'office',
			num: '04',
			name: 'Office cleaning',
			nameAccent: 'Office',
			long:
				'We work early mornings or late evenings, so your team never sees us at it.',
			bullets: [
				'Out-of-hours scheduling',
				'Bins, surfaces, sanitised desks',
				'Bathrooms, shared spaces',
				'Monthly invoicing, R1 receipt',
				'NDA on request'
			],
			price: '€0.75 – €2',
			priceNote: 'per m²',
			tiers: [{ range: 'Hour rate (1 person)', price: 'from €15' }],
			photoTag: 'Office, reception desk'
		},
		{
			id: 'yacht',
			num: '05',
			name: 'Yacht & boat cleaning',
			nameAccent: 'Yacht',
			long:
				"Marine-safe products, real boat experience — we know the difference between teak and gelcoat.",
			bullets: [
				'Saturday charter turnover',
				'Interior: cabins, saloon, galley',
				'Exterior: deck, fly, fittings',
				'Marine-safe chemicals',
				"We don't polish hulls"
			],
			price: 'by quote',
			priceNote: 'priced per vessel',
			tiers: [{ range: 'Hour rate (1 person)', price: '€15 – €30' }],
			photoTag: 'Terrace overlooking the sea'
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
			q: 'Do you bring supplies and equipment?',
			a: 'Yes. We bring all professional chemicals, cloths, mops and vacuums. You only need to arrange access.'
		},
		{
			q: 'Do you take a deposit?',
			a: 'For one-off jobs — no. For recurring monthly arrangements, payment is at month-end after the work is done, usually by bank transfer with an R1 invoice.'
		},
		{
			q: 'What if something gets damaged?',
			a: 'We carry professional liability insurance. Damages are reported in writing with photos and reimbursed through the policy.'
		},
		{
			q: 'Do you handle same-day jobs?',
			a: 'For apartment turnovers — yes, if you message by 10am. Other services — usually next working day.'
		},
		{
			q: 'Can you issue an R1 invoice?',
			a: 'Yes, R1 invoice to a registered company or sole trader. Monthly invoicing for contract clients, paid by bank transfer.'
		},
		{
			q: 'Pets or allergies?',
			a: 'Tell us in advance. We carry pet-safe products and hypoallergenic options. Fragrance-free on request.'
		},
		{
			q: "What's the difference between regular and deep cleaning?",
			a: 'Regular keeps the place clean — vacuum, mop, surfaces, kitchen, bathrooms. Deep handles what regular skips — oven interior, grout, windows, behind and under furniture, bathroom tile.'
		},
		{
			q: "How do you access the apartment when I'm not there?",
			a: 'Usually a key safe or door code. For long-term clients, key on trust with logged visits. Everything photo-documented.'
		}
	],

	// Quote calculator
	calc: {
		eyebrow: 'Price estimator',
		title: 'Check the price',
		titleAccent: 'price',
		sub: 'Rough estimate in a minute. Final figure confirmed in a quick WhatsApp message.',
		typeLabel: 'Service type',
		sizeLabel: 'Size',
		freqLabel: 'Frequency',
		types: [
			{ id: 'turnover' as const, label: 'Apartment turnover' },
			{ id: 'deep' as const, label: 'Deep' },
			{ id: 'regular' as const, label: 'Regular' },
			{ id: 'office' as const, label: 'Office' },
			{ id: 'yacht' as const, label: 'Yacht / boat' }
		],
		freqs: [
			{ id: 'oneoff' as const, label: 'One-off' },
			{ id: 'weekly' as const, label: 'Weekly' },
			{ id: 'fortnight' as const, label: 'Fortnightly' },
			{ id: 'monthly' as const, label: 'Monthly' }
		],
		estimateLabel: 'Estimate',
		cta: 'Send to WhatsApp',
		yachtNote:
			'For boats, send length and type — price depends on deck type and fittings.',
		msgPrefix: "Hi, I'd like a",
		msgFor: 'clean for a ~',
		msgEstimate: '. I saw an estimate of',
		msgCanYou: 'Can you confirm details?'
	},

	// Footer (extended)
	footerNew: {
		tag: 'Professional cleaning in Pula and Istria',
		colsServices: 'Services',
		colsCompany: 'Company',
		colsContact: 'Contact',
		legal: ['© 2026 Sprinter d.o.o.', 'Privacy']
	},

	// Cleaning page
	cleaning: {
		title: 'Cleaning Services',
		heroSubtitle: 'A culture of cleanliness and aesthetics with a signature',
		visionTitle: 'My Vision: More Than Cleanliness',
		visionPara1:
			'My name is Zvjezdana Puhanić. As the company director, I see my calling not as a mere cleaning service, but as a mission to restore shine and harmony to your living space.',
		visionPara2:
			'I believe a private space deserves more than “ordinary tidying” — it deserves German discipline, absolute discretion, and an eye that catches what others miss.',
		visionPara3:
			'I honed my professional experience in hospitality, where I absorbed uncompromising standards of organization and meticulousness. For the past several years I have been dedicated exclusively to maintaining exclusive villas and residences in Germany, understanding that clients of my profile are not looking for ordinary labor, but a trustworthy partner with every necessary skill.',
		visionPara4:
			'For me, this work is a passion. Even though I run the company, I approach every project personally. I am the one who organizes the process, supervises every detail, and holds the equipment in my hands. Only that way can I guarantee a result that stands behind my name.',
		exclusivityTitle: 'Exclusivity Without Compromise',
		exclusivityDesc:
			'Our service is not aimed at the mass market. We do not clean stairwells, cafés, or busy public spaces. My focus and expertise are directed at:',
		residencesTitle: 'Private residences and architectural estates across Istria',
		residencesDesc:
			'Your villa is not just a property — it is your sanctuary. I specialize in the full cycle of care for your home: from detailed preparation of the property before your arrival, through discreet maintenance during your stay, to thorough conservation of the space after departure. My goal is that every time you open the door, you feel as though you are entering a brand-new, freshly furnished home.',
		accommodationsTitle: 'Highest-category accommodations',
		accommodationsDesc:
			'Private apartments, boutique hotels and yachts demand more than cleaning — they demand material expertise. Whether it is the care of noble wood (teak), natural stone, highly polished surfaces or delicate fabrics, my methods are tailored to preserve their longevity.',
		accommodationsStaging:
			'My work in this segment also includes final “staging” — decorating and preparing the space according to the principles of top-tier hospitality, where every towel, scent and detail is placed with the intention of delighting the guest or owner the moment they step inside.',
		standardsTitle: 'Standards I Bring to Your Home',
		standardTech: 'Premium Technology',
		standardTechDesc:
			'I use exclusively professional Kärcher equipment and certified, non-aggressive products that protect your health and the longevity of your furniture.',
		standardDiscipline: 'Discipline & Health',
		standardDisciplineDesc:
			'As a licensed fitness instructor, I bring high energy, discipline, and an awareness of the importance of a healthy, clean environment to the work.',
		positioningTitle: 'For Those Who Value Excellence',
		positioningBody:
			'I value clients who respect my profession and the level of dedication I bring. If you are looking for someone who will treat your property with the same respect and care as if it were her own, you are in the right place.',
		positioningQuote:
			'“Order, aesthetics, and absolute discretion. I take care of your space with precision and personal responsibility.”',
		pricesTitle: 'Our Prices',
		pricesVatNote: '(All listed prices exclude VAT)',
		pricingDisclaimer:
			'If on-site conditions are more demanding than agreed, pricing is adjusted according to actual effort. Please bear in mind there is a difference between 4 hours of light dusting and 4 hours of heavy limescale removal or deep cleaning of neglected corners. Work on ordinary surfaces moves quickly. Work on expensive marble, teak or designer ceramics requires special care, costly products, and slow, precise movements.',
		pricingDisclaimerLabel: 'Professional practice note:',
		pricingFooterNote:
			'All prices are indicative, depend on the actual condition of the property, and are subject to change.',
		contactTitle: 'Contact Us',
		contactDesc:
			'Feel free to contact us for a quote via WhatsApp, phone, or the contact form.',
		serviceArea: 'Our base is located in Pula – Fažana',
		byFounder: 'by Zvjezdana Puhanić'
	},

	// Cleaning services data
	services: [
		{
			name: 'Continuous Impeccability',
			subtitle: 'Regular maintenance',
			duration: '2 – 4 – 6 – 8 hours',
			price: '€60 – €250',
			description:
				'Maintaining high cleanliness standards per agreed protocol and schedule.'
		},
		{
			name: 'Interior Deep Regeneration',
			subtitle: 'Couches, mattresses…',
			duration: '4 – 8 hours',
			price: '€110 – €300',
			description:
				'Complete interior and exterior treatment utilizing premium Kärcher technology.'
		},
		{
			name: 'Before & After Rental',
			subtitle: 'Property preparation',
			duration: '2 – 3 hours',
			price: '€80 – €180',
			description:
				'Property preparation before owner/guest arrival or after departure.'
		},
		{
			name: 'Move-in or Move-out',
			subtitle: 'Comprehensive preparation',
			duration: '6 – 10 hours',
			price: '€150 – €460',
			description:
				'Comprehensive property preparation: deep cleaning, cabinet interiors, and kitchen appliances.'
		},
		{
			name: 'Crystal-Clear Glass Surfaces',
			subtitle: 'Specialized care',
			duration: '2 – 4 hours',
			price: '€45 – €110',
			description:
				'Specialized care for large glass walls and demanding glass surfaces.'
		},
		{
			name: 'Exterior, Pools & Grounds',
			subtitle: 'Terrace and pool area',
			duration: '3 – 5 hours',
			price: '€80 – €180',
			description:
				'Terrace and pool area preparation for maximum visual enjoyment and hygiene.'
		},
		{
			name: 'Professional Textile Care',
			subtitle: 'Washing and ironing',
			duration: '2 – 4 hours',
			price: '€45 – €100',
			description:
				'Precise washing and ironing with maximum attention to delicate fabrics.'
		},
		{
			name: 'Post-Construction Shine',
			subtitle: 'Post-construction cleaning',
			duration: '8 – 12 hours',
			price: '€220 – €600',
			description:
				'Detailed, systematic removal of post-construction dust and debris.'
		}
	],

	// Transport page
	transport: {
		title: 'Transport Services',
		heroTitle: 'Sprinter Transport',
		heroSubtitle: 'Smart logistics on Istrian roads',
		introPara1:
			'Forget complicated, slow moving services. If you need fast, accurate, and safe transport of goods from point A to point B — Sprinter is your professional partner.',
		introPara2:
			'We specialize in transporting goods for clients who are organized and value efficiency. Whether it is a new kitchen from Ikea or Rijeka, materials from Pevex and Elgrad, or moving valuable furniture into your villa, we deliver a solution that saves you time and money.',
		whyTitle: 'Why choose Sprinter transport?',
		whyFleetTitle: 'Full fleet for every need',
		whyFleetDesc:
			'From the agile Renault Trafic to the spacious Mercedes Sprinter — we have the right volume for every load.',
		whyAreaTitle: 'Istria, Croatia and beyond',
		whyAreaDesc: 'Our base is in Pula, but we deliver your goods exactly where they are needed.',
		whyAssistTitle: 'Driver assistance',
		whyAssistDesc:
			'We do not leave you alone with the load. Our service includes active help with loading and unloading at the vehicle.',
		whyTechTitle: 'Safety and technology',
		whyTechDesc:
			'All our vehicles are equipped with GPS, allowing us precise organization and real-time visibility into your transport status.',
		logisticsTitle: '“Doorstep” logistics — How we work',
		logisticsPara1:
			'Our business model is focused on maximum transport efficiency. To ensure the most favourable price and fastest service, we specialize in delivery to your front door or building entrance.',
		logisticsPara2Label: 'Professional standard:',
		logisticsPara2:
			'Our primary task is the safe transport and handling of cargo at the vehicle. We do not offer carrying items up floors, which lets us stay fast, accurate, and available for your next transport.',
		logisticsPara3Label: 'Clean. Punctual. Reliable.',
		logisticsPara3:
			'As a company that also maintains private villas, we know how important attention to detail is. Our vehicles are tidy and our service is discreet and professional.',
		quoteTitle: 'Need a quick quote?',
		quoteIntro:
			'Feel free to call or message us on WhatsApp. So we can give you accurate information immediately, please have the following ready:',
		quoteItem1: 'Exact pickup address',
		quoteItem2: 'Final destination',
		quoteItem3: 'Type of goods and approximate weight',
		quoteItem4: 'Preferred transport date',
		contactTitle: 'Contact us',
		contactDesc: 'Call or message — we respond quickly.',
		baseNote: 'Our base is located in Pula',
		closing: 'Your Sprinter Team — professional transport logistics'
	},

	// Transfers page (new redesign)
	transfersPage: {
		eyebrow: 'Service · 03',
		title: 'Private transfers / taxi',
		titleAccent: 'transfers / taxi',
		titleSuffix: ' - Pula - Istria - Europe',
		leadOne:
			'You sit down. The driver closes the door. And you no longer need to think about anything else.',
		leadTwo:
			'<p>Sprinter is a family business from Pula. We arrange private transfers and taxi rides in Pula, across Istria and Europe — reliable, on time, no surprises.</p><p>To book a ride to or from Pula Airport, use our <a href="#kalkulator">price calculator</a>.</p><p>For a taxi ride around Pula or further afield, just send us a message.</p>',
		fleetEyebrow: 'Fleet',
		fleetTitle: 'Two vehicles, one standard',
		fleetSub: 'Pick the right size — pricing stays transparent either way.',
		eClassName: 'Mercedes-Benz E-Class',
		eClassDesc:
			'Elegance and comfort for up to 3 passengers — the right choice when discretion and style matter most.',
		vClassName: 'Mercedes-Benz V-Class',
		vClassDesc:
			'Roomy and quiet for up to 7 passengers — relaxed, safe transport for groups, families, or extra luggage.',
		trustEyebrow: 'What is included',
		trustSignAirport: 'Name-sign meet & greet — on request',
		trustChildSeat: 'Free child seat',
		trustWhatsApp: 'WhatsApp confirmation in 30 min'
	},

	// Transfer calculator UI strings
	transferCalc: {
		title: 'Price calculator',
		vatNote: 'VAT included',
		fromLabel: 'Pickup',
		fromPh: 'e.g. Pula Airport, hotel, address…',
		toLabel: 'Destination',
		toPh: 'e.g. Rovinj, Opatija, address…',
		swap: 'Swap pickup and destination',
		routeCalculating: 'Calculating route…',
		routeError: 'Route could not be calculated. Please check the addresses.',
		mapsUnavailable: 'Live quotes unavailable right now — send a request, we reply within 30 minutes.',
		longTripTitle: 'Trip longer than 110 km',
		longTripBody: 'For this route we confirm the price personally. Send a request or fill in the form — we reply right away.',
		trafficNote: 'In case of traffic delays, the fare may increase by €0.30 per minute of delay.',
		passengers: 'Passengers',
		eClass: 'Mercedes E-Class',
		eClassRange: '1 – 3 passengers',
		vClass: 'Mercedes V-Class',
		vClassRange: '1 – 7 passengers',
		errorRoute: 'Please enter a pickup and destination.',
		bookingTitle: 'Booking',
		bookingInquiry: 'Your details',
		travelTimeLabel: 'Travel time',
		onRequest: 'On request',
		onRequestSub: 'Price will be confirmed on WhatsApp within 30 minutes.',
		fullName: 'Full name',
		fullNamePh: 'Your full name',
		phone: 'Phone',
		email: 'Email',
		date: 'Date',
		time: 'Time',
		timePlaceholder: '— Select time —',
		flight: 'Flight number (if airport transfer)',
		flightPh: 'e.g. FR1234 (optional)',
		note: 'Note',
		notePh: 'Child seat, special requests, extra stops…',
		returnDiscount: '−10% discount',
		tripOneWay: 'One-way',
		tripReturn: 'Round trip',
		tripReturnSuffix: '−10%',
		returnDate: 'Return date',
		returnTime: 'Return time',
		returnNoteLabel: 'Return',
		termsTitle: 'Terms & information',
		terms: [
			'💶 Price is calculated from the actual route distance. Trips over 110 km — price confirmed personally on WhatsApp.',
			'⚠️ In case of traffic delays, the fare may increase by €0.30 per minute of delay.',
			'🚗 Name-sign meet & greet at the airport — on request.',
			'👶 Child seat available free of charge — please note in the comment field.',
			'🔄 Return journey at 10% discount.',
			'❌ Free cancellation up to 24 hours before. Within 24 hours — 50% charge.',
			'📱 Booking confirmation sent to your WhatsApp within 30 minutes.'
		],
		orderSummary: 'Order summary',
		outbound: 'Outbound',
		returnRow: 'Return',
		total: 'Total',
		vatIncl: 'VAT incl.',
		errorBook: 'Please enter your name, phone, date and time.',
		returnAfterOutboundError: 'Return date must be on or after the outbound date.',
		openPickerLabel: 'Open calendar',
		sendBooking: 'Send booking via WhatsApp',
		sendInquiry: 'Send price request via WhatsApp',
		formNote: 'Available 07 – 24 · sprinter.hr · +385 95 722 6918',
		whatsapp: 'WhatsApp'
	},

	// Transfers page (legacy keys — kept until older copy is fully retired)
	transfers: {
		title: 'Private Transfers with Personal Driver',
		visionIntro:
			'Our vision is an aristocracy of transport that goes far beyond mere driving. We offer an experience built on respect, discretion, and quality — creating partnerships with people who share our values.',
		visionService:
			'We work with athletes, public figures, and business people who value premium service and professional relationships, delivered through reliable vehicles representing style and safety.',
		visionVehicles:
			'We ensure this with our trusted vehicles — synonymous with style and safety!',
		eClassName: 'Mercedes-Benz E-Class',
		eClassDesc:
			'A symbol of elegance and comfort. Ideal for transfers of up to 3 passengers, where discretion and style matter most.',
		vClassName: 'Mercedes-Benz V-Class',
		vClassDesc:
			'Spaciousness without compromise. Our V-Class offers relaxing and safe transport for groups or families.',
		pricingTitle: 'How to get a quote for your transfer?',
		pricingIntro:
			'Each transfer is unique and includes variable costs such as driver overnight stays, parking, ferry/toll charges, and travel time.',
		pricingNote:
			'We tailor every quote individually, quickly, and simply once you send us your journey details.',
		pricingContact:
			'Feel free to send us your travel plans via email or WhatsApp. For immediate inquiries, give us a call!',
		vipNote: 'VIP service available 24/7.',
		inquiryTitle: 'Learn more about private transfers!',
		inquiryFirstName: 'First name',
		inquiryLastName: 'Last name',
		inquiryEmail: 'Email',
		inquiryVehicle: 'Which class interests you?',
		inquiryPhone: 'Phone',
		inquiryMessage: 'Message',
		inquiryConsent:
			'I consent to Sprinter storing my submitted information so they can respond to my inquiry.',
		inquirySubmit: 'Submit'
	},

	// Rental page
	rental: {
		title: 'Vehicle Rental',
		breadcrumb: 'Vehicle Rental',
		seats: 'Passengers',
		year: 'Year',
		gearboxLabel: 'Transmission',
		climate: 'Climate',
		cruise: 'Cruise control',
		capacity: 'Capacity',
		payload: 'Payload',
		yes: 'Yes',
		no: 'No',
		manual: 'Manual',
		automatic: 'Automatic',
		deliveryNote: 'We can deliver any vehicle to your requested address.',
		driverNote: 'A driver can be hired for any of our vehicles.',
		termsNotice: 'Please make sure to read the rental terms and conditions!',
		viewTerms: 'RENTAL TERMS & CONDITIONS',
		rentMe: 'Rent me...',
		waTemplate: 'Hello, I am interested in renting the {vehicle}. Could you send me more information?',
		inquiryTitle: 'Check availability and price',
		inquiryFrom: 'From date',
		inquiryTo: 'To date',
		inquiryDays: 'Days',
		inquiryEstimate: 'Estimated price',
		inquiryContactForLonger: 'For rentals longer than {days} days, please contact us directly.',
		inquiryDateError: 'Return date must be after pickup date.',
		inquiryName: 'Your name',
		inquiryEmail: 'Email',
		inquiryPhoneLabel: 'Phone',
		inquiryNotes: 'Additional notes',
		inquirySubmit: 'Send inquiry',
		inquiryOnRequest: 'Price on request',
		filterLabel: 'Category',
		filterAll: 'All vehicles',
		filterPassenger: 'Passenger',
		filterCargo: 'Cargo van',
		sortLabel: 'Sort',
		sortDefault: 'Default',
		sortYear: 'Newest',
		sortPriceAsc: 'Price (low → high)',
		noResults: 'No vehicles in this category.',
		pricingTitle: 'Rental prices:',
		pricingVatNote: '(* All prices include VAT)',
		pricingDisclaimer: 'After exceeding the included kilometers, each additional km is charged as shown in the table above.',
		extendedStayNotice: 'For inquiries regarding rentals longer than {days} days, trips outside Croatia, or customized offers, please contact us directly.',
		speedLimitNotice: 'This vehicle is limited to {limit} km/h. This allows us to keep every vehicle in optimal condition, ready for the next driver.',
		colDays: 'Rental period:',
		colPrice: 'Price €',
		colKm: 'Km',
		colExtraKm: 'Extra Km',
		day: 'day',
		days: 'days',
		upTo: 'Up to',
		insuranceTitle: 'Insurance',
		insuranceSubtitle: 'Insurance & deposit',
		insurancePremium: 'Premium – 1 day / €10',
		insuranceRequirement: 'To claim Premium insurance, a police report of the accident is required. This insurance does not cover damage inside the vehicle caused by passenger or driver negligence.',
		insuranceCoverage: 'With our premium insurance you have no material liability. Protection against theft, collision, windshield and tire damage, and weather-related damage is included.',
		insuranceDeposit: 'A deposit is mandatory for every vehicle. The amount ranges from €200 to €1,000.',
		insuranceIncluded: 'Insurance is included in the rental price.',
		pickupTitle: 'Vehicle pickup instructions',
		pickupHours: 'Pickup and return during office hours as agreed in the contract',
		pickupLocations: 'Pickup at our Darda office, at your address (Osijek), or at shopping center parking lots',
		pickupFuel: 'The vehicle is provided with a full tank — please refuel before returning',
		pickupTerms: 'Please make sure to read the Rental Terms',
		paymentTitle: 'Payment terms:',
		paymentMethod: 'Payment is due upon vehicle handover, extra kilometers charged after rental completion',
		paymentAccepted: 'We accept cards, cash, and bank transfers.',
		farewell: 'Thank you for your understanding, Sprinter d.o.o. wishes you a safe journey.',
		backToList: 'Back to vehicles',
		specifications: 'Specifications',
		type: 'Type',
		contactUs: 'Contact us to rent',
		whatsappInquiry: 'Inquire via WhatsApp',
		callUs: 'Call us',
		vehicleNotFound: 'Vehicle not found'
	},

	// Footer
	footer: {
		howToReachUs: 'HOW TO REACH US',
		advisory:
			'Our vehicles are frequently in delivery, service, and maintenance. Please announce your visit in advance. Thank you for understanding!',
		newsletter: 'Receive news about new listings',
		emailPlaceholder: 'Your email address',
		subscribe: 'Subscribe',
		copyright: '© Sprinter | All rights reserved',
		cookies: 'Cookies Policy',
		privacy: 'Privacy Policy',
		rentalTerms: 'Rental Terms & Conditions',
		addressLabel: 'ADDRESS:',
		complaintTitle: 'Complaint Submission Notice',
		complaint:
			`Per Article 6, Section 3 of the Tourism Services Law (NN 130/17), written complaints may be submitted to ${contact.email}`
	},

	// Contact page
	contact: {
		title: 'Contact',
		metaDescription:
			'Contact Sprinter d.o.o. — professional cleaning in Pula and Istria. WhatsApp, phone, email.',
		formHeading: 'Send us an inquiry',
		formName: 'Your name',
		formEmail: 'Your email address',
		formPhone: 'Your phone',
		formMessage: 'Your message or comment',
		formPrivacy: 'I accept the privacy policy',
		formSubmit: 'Send',
		office: 'Office',
		workingHours: 'Working Hours',
		weekdays: 'Monday — Sunday: 08:00 – 19:00',
		findUs: 'Find us',
		getDirections: 'Get directions'
	},

	// Kontakt WhatsApp bridge page (Google Ads landing)
	contactWa: {
		title: 'Contact WhatsApp — Sprinter Transfers Pula',
		metaDescription:
			'Book a private transfer or taxi ride in Pula via WhatsApp. Quick response, fixed prices, available 24/7.',
		eyebrow: 'Contact · WhatsApp',
		h1: 'Contact us on WhatsApp',
		intro1:
			'Sprinter arranges private transfers and taxi rides in Pula and across Istria — name-sign meet-and-greet at Pula Airport, intercity transfers, local taxi rides. We drive Mercedes E-Class and V-Class, 24/7, fixed prices with no surprises.',
		intro2:
			'WhatsApp is the fastest way to get a quote and confirm a booking. We respond within minutes, in English, Croatian, German or Italian. No call centres — you speak directly with us.',
		intro3:
			'Tap the button below to open the chat. If you prefer the phone, the number is right under the button.',
		ctaButton: '💬 Send a message on WhatsApp',
		phoneFallback: 'Or call us at',
		tipsTitle: 'What to include in your first message',
		tipsList: [
			'Date and approximate departure time',
			'Pickup location (e.g. "Pula Airport, terminal")',
			'Destination (city, hotel, or exact address)',
			'Number of passengers and amount of luggage',
			'Whether you need a return trip or one-way only'
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
		eyebrow: 'Reviews',
		title: 'What our clients say',
		basedOn: 'based on {n} Google reviews',
		translatedBy: 'Translated by Google',
		showOriginal: 'Show original',
		hideOriginal: 'Hide original',
		viewAll: 'See all on Google'
	},

	// Thank you page
	thankYou: {
		title: 'Thank you for your inquiry',
		subtitle: 'Your message has been received. We will respond as soon as possible.',
		responseTime: 'We usually respond within 24 hours on business days.',
		goHome: 'Home',
		goRental: 'Browse vehicles',
		meanwhileWhatsapp: 'If it is urgent, reach us immediately on WhatsApp.'
	},

	// Generic form statuses
	form: {
		submitting: 'Sending...',
		errorServer: 'Something went wrong. Please try again or call us.',
		errorRequired: 'This field is required',
		errorEmail: 'Invalid email address'
	},

	// Privacy policy page
	privacy: {
		metaDescription:
			'Privacy policy for sprinter.hr — how we collect and process personal data under GDPR.'
	},

	// Error page
	error: {
		notFoundTitle: 'Page not found',
		notFoundDesc: 'The page you are looking for does not exist or has been removed.',
		goHome: 'Home',
		goCleaning: 'Cleaning services'
	}
};

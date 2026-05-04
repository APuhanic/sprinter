import { contact } from '../contact';

export default {
	lang: 'en',
	langName: 'English',

	// Nav
	nav: {
		home: 'Home',
		cleaning: 'Cleaning Services',
		rental: 'Rent a Kombi/Car',
		transfers: 'Luxury Transfers',
		contact: 'Contact'
	},

	// Header banner
	banner: {
		notice: 'Please announce your visit in advance',
		address: contact.address,
		phone: contact.phone,
		hours: 'Mon - Sun: 08h - 19h'
	},

	// Homepage
	home: {
		heroCleaningTitle: 'Professional Cleaning',
		heroCleaningSubtitle: 'Cleaning services for luxury properties',
		heroRentalTitle: 'Rent a Car\nRent a Kombi',
		heroRentalSubtitle: 'Vehicle delivery available',
		heroTransfersTitle: 'Private drivers & luxury transfers',
		heroTransfersSubtitle: 'Service available 24/7',
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

	// Cleaning page
	cleaning: {
		title: 'Cleaning Services',
		visionTitle: 'My Vision: More Than Cleanliness',
		visionIntro:
			'As the company director, I see my calling not as a mere cleaning service, but as a mission to restore shine and harmony to your living space.',
		visionHospitality: 'Professional background in hospitality',
		visionExperience: 'Experience maintaining exclusive German villas and residences',
		visionPersonal: 'Personal involvement in every project',
		visionDiscipline: 'German discipline and absolute discretion',
		exclusivityTitle: 'Exclusivity Without Compromise',
		exclusivityDesc:
			'Our service targets discerning clients, excluding stairwells, cafés, or public spaces.',
		residencesTitle: 'Private residences and architectural estates across Istria',
		residencesDesc:
			'Your villa is not just a property — it is your sanctuary. Services include pre-arrival preparation, discreet maintenance during your stay, and comprehensive conservation.',
		accommodationsTitle: 'Highest-category accommodations',
		accommodationsDesc:
			'Luxury apartments, boutique hotels, yachts. Specialized care for noble wood, natural stone, polished surfaces, and delicate fabrics.',
		standardsTitle: 'Standards I Bring to Your Home',
		standardTech: 'Premium Technology',
		standardTechDesc: 'Professional Kärcher equipment',
		standardDiscipline: 'Discipline & Health',
		standardDisciplineDesc: 'Licensed fitness instructor',
		pricesTitle: 'Our Prices',
		pricesVatNote: '(All listed prices include VAT)',
		pricingDisclaimer:
			'If on-site conditions exceed expectations, pricing is adjusted according to actual effort required.',
		pricingDisclaimerLabel: 'Professional practice note:',
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
			price: '€80 – €320',
			description:
				'Maintaining high cleanliness standards per agreed protocol and schedule.'
		},
		{
			name: 'Interior Deep Regeneration',
			subtitle: 'Couches, mattresses…',
			duration: '4 – 8 hours',
			price: '€150 – €400',
			description:
				'Complete interior and exterior treatment utilizing premium Kärcher technology.'
		},
		{
			name: 'Before & After Rental',
			subtitle: 'Property preparation',
			duration: '2 – 3 hours',
			price: '€100 – €250',
			description:
				'Property preparation before owner/guest arrival or after departure.'
		},
		{
			name: 'Move-in or Move-out',
			subtitle: 'Comprehensive preparation',
			duration: '6 – 10 hours',
			price: '€200 – €500',
			description:
				'Comprehensive property preparation: deep cleaning, cabinet interiors, and kitchen appliances.'
		},
		{
			name: 'Crystal-Clear Glass Surfaces',
			subtitle: 'Specialized care',
			duration: '2 – 4 hours',
			price: '€60 – €150',
			description:
				'Specialized care for large glass walls and demanding glass surfaces.'
		},
		{
			name: 'Exterior, Pools & Grounds',
			subtitle: 'Terrace and pool area',
			duration: '3 – 5 hours',
			price: '€100 – €250',
			description:
				'Terrace and pool area preparation for maximum visual enjoyment and hygiene.'
		},
		{
			name: 'Professional Textile Care',
			subtitle: 'Washing and ironing',
			duration: '2 – 4 hours',
			price: '€50 – €120',
			description:
				'Precise washing and ironing with maximum attention to delicate fabrics.'
		},
		{
			name: 'Post-Construction Shine',
			subtitle: 'Post-construction cleaning',
			duration: '8 – 12 hours',
			price: '€300 – €800',
			description:
				'Detailed, systematic removal of post-construction dust and debris.'
		}
	],

	// Transfers page
	transfers: {
		title: 'Luxury Transfers with Private Driver',
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
		inquiryTitle: 'Learn more about luxury transfers!',
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
		formHeading: 'Send us an inquiry',
		formName: 'Your name',
		formEmail: 'Your email address',
		formPhone: 'Your phone',
		formMessage: 'Your message or comment',
		formPrivacy: 'I accept the privacy policy',
		formSubmit: 'Send',
		office: 'Office',
		workingHours: 'Working Hours',
		weekdays: 'Monday - Saturday: 08:00 – 20:00',
		sunday: 'Sunday: 09:00 – 13:00',
		findUs: 'Find us',
		getDirections: 'Get directions'
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
		title: 'What our clients say'
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

	// Error page
	error: {
		notFoundTitle: 'Page not found',
		notFoundDesc: 'The page you are looking for does not exist or has been removed.',
		goHome: 'Home',
		goRental: 'Vehicle rental'
	},

	// Cookie banner
	cookieBanner: {
		message: 'We use cookies only for essential site functionality. By continuing to use the site you accept our policy.',
		accept: 'Accept',
		learnMore: 'Learn more'
	}
};

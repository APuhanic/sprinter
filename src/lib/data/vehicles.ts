export interface PricingRow {
	days: number;
	price: number;
	includedKm: number;
	extraKmRate: number;
}

export interface Vehicle {
	name: string;
	slug: string;
	type: string;
	seats: string;
	hasAC: boolean;
	hasCruise: boolean;
	year: number;
	gearbox: string;
	capacity?: string;
	payload?: string;
	images: string[];
	description: string[];
	pricing: PricingRow[];
	maxDaysBeforeContact: number;
	speedLimit?: number;
	insuranceIncluded?: boolean;
	hasPaymentTerms?: boolean;
}

export const vehicles: Vehicle[] = [
	{
		name: 'Ford Focus Karavan 1.5tdci',
		slug: 'ford-focus-karavan',
		type: 'Karavan',
		seats: '5',
		hasAC: true,
		hasCruise: true,
		year: 2021,
		gearbox: 'Ručni',
		images: ['/images/vehicles/ford-focus/1.jpg', '/images/vehicles/ford-focus/2.jpg', '/images/vehicles/ford-focus/3.jpg'],
		description: [
			'Upoznajte Ford Focus Karavan, savršen izbor za one koji traže praktičnost i udobnost.',
			'Ovo vozilo pokreće štedljivi 1,5-litreni TDCi motor poznat po niskoj potrošnji goriva, što ga čini idealnim za duža putovanja.',
			'Unutrašnjost je iznimno prostrana, s dovoljno mjesta za putnike i prtljagu, dok automatska klima osigurava ugodnu temperaturu u svakom trenutku. Dodatna oprema poput grijanih sjedala i grijanog volana donosi luksuz i udobnost tijekom hladnijih dana.',
			'Vanjski izgled vozila odlikuje se atraktivnim dizajnom, a LED svjetla ne samo da pružaju odličnu vidljivost već i daju moderan izgled.'
		],
		pricing: [
			{ days: 1, price: 60, includedKm: 500, extraKmRate: 0.12 },
			{ days: 2, price: 120, includedKm: 800, extraKmRate: 0.12 },
			{ days: 3, price: 180, includedKm: 1000, extraKmRate: 0.12 },
			{ days: 4, price: 240, includedKm: 1200, extraKmRate: 0.12 },
			{ days: 5, price: 300, includedKm: 1500, extraKmRate: 0.12 }
		],
		maxDaysBeforeContact: 5
	},
	{
		name: 'Mercedes Benz E 300 Avantgarde',
		slug: 'mercedes-e300',
		type: 'Putnički',
		seats: '5',
		hasAC: true,
		hasCruise: true,
		year: 2021,
		gearbox: 'Automatski',
		images: ['/images/vehicles/mercedes-e300/1.jpg', '/images/vehicles/mercedes-e300/2.jpg', '/images/vehicles/mercedes-e300/3.jpg'],
		description: [
			'Predstavljamo Mercedes-Benz E 300 s Avantgarde Luxury paketom opreme.',
			'Vozilo pokreće benzinski motor s plug-in hibridnim sustavom, što omogućuje vožnju do 50 km isključivo na struju, a ukupna snaga sustava iznosi 320 KS.',
			'Iz opreme izdvajamo: Sportska sjedala s memorijom te sportski volan. Unutrašnjost je obogaćena mahagonij završnom obradom. Ambijentalna rasvjeta stvara ugodnu atmosferu. Grijana sjedala i automatska klima za maksimalan komfor. Navigacija s proširenom stvarnošću (Augmented Reality) olakšava snalaženje na cesti.'
		],
		pricing: [
			{ days: 1, price: 120, includedKm: 300, extraKmRate: 0.20 },
			{ days: 2, price: 240, includedKm: 600, extraKmRate: 0.20 },
			{ days: 3, price: 360, includedKm: 900, extraKmRate: 0.20 },
			{ days: 4, price: 480, includedKm: 1200, extraKmRate: 0.20 },
			{ days: 5, price: 600, includedKm: 1500, extraKmRate: 0.20 },
			{ days: 6, price: 720, includedKm: 1800, extraKmRate: 0.20 },
			{ days: 7, price: 840, includedKm: 2100, extraKmRate: 0.20 }
		],
		maxDaysBeforeContact: 7,
		insuranceIncluded: true
	},
	{
		name: 'Mercedes V Klassa',
		slug: 'mercedes-v-klassa',
		type: 'Putnički',
		seats: '7+1',
		hasAC: true,
		hasCruise: true,
		year: 2021,
		gearbox: 'Automatski',
		images: ['/images/vehicles/mercedes-v-class/1.jpg', '/images/vehicles/mercedes-v-class/2.jpg', '/images/vehicles/mercedes-v-class/3.jpg'],
		description: [
			'Tražite vrhunski prijevoz za grupu do osam osoba? Mercedes-Benz V-klasa je idealno rješenje.',
			'Ova luksuzna putnička krstarica osigurava iznimnu udobnost, čineći svako putovanje pravim užitkom.',
			'Opremljena je modernom tehnologijom, uključujući napredni 9G automatski mjenjač za uglađenu i ekonomičnu vožnju. Užitak upotpunjuje multimedijski sustav, koji pruža vrhunsku zabavu za sve putnike.',
			'Bez obzira na to radi li se o poslovnom putovanju ili obiteljskom izletu, V-klasa jamči luksuzan i udoban prijevoz.'
		],
		pricing: [
			{ days: 1, price: 120, includedKm: 300, extraKmRate: 0.20 },
			{ days: 2, price: 240, includedKm: 600, extraKmRate: 0.20 },
			{ days: 3, price: 360, includedKm: 900, extraKmRate: 0.20 },
			{ days: 4, price: 480, includedKm: 1200, extraKmRate: 0.20 },
			{ days: 5, price: 600, includedKm: 1500, extraKmRate: 0.20 },
			{ days: 6, price: 720, includedKm: 1800, extraKmRate: 0.20 },
			{ days: 7, price: 840, includedKm: 2100, extraKmRate: 0.20 }
		],
		maxDaysBeforeContact: 7
	},
	{
		name: 'Renault Master L3H2',
		slug: 'renault-master',
		type: 'L3H2',
		seats: '2+1',
		hasAC: true,
		hasCruise: true,
		year: 2020,
		gearbox: 'Ručni',
		capacity: '13 m²',
		payload: '1300 kg',
		images: ['/images/vehicles/renault-master/1.jpg', '/images/vehicles/renault-master/2.jpg'],
		description: [
			'Renault Master s pogonom na prednje kotače dokazuje da posao i udobnost idu ruku pod ruku. Bez obzira vozite li gradom ili idete na dulji put, ovaj kombi će vas oduševiti.',
			'Za lakšu vožnju na otvorenoj cesti, tu je tempomat, dok parking senzori sa stražnjom kamerom čine parkiranje jednostavnim, čak i u najužim gradskim ulicama.',
			'Osim što pruža udobnost, Master osigurava i sigurnost. Drive Assistant pomaže u praćenju vašeg stila vožnje, a sustav upozorenja na mrtvi kut služi kao dodatni par očiju. S ovim kombijem vaše poslovanje postaje još učinkovitije i sigurnije, bez kompromisa.'
		],
		pricing: [
			{ days: 1, price: 100, includedKm: 500, extraKmRate: 0.12 },
			{ days: 2, price: 200, includedKm: 1000, extraKmRate: 0.12 },
			{ days: 3, price: 300, includedKm: 1500, extraKmRate: 0.12 },
			{ days: 4, price: 400, includedKm: 2000, extraKmRate: 0.12 },
			{ days: 5, price: 500, includedKm: 2500, extraKmRate: 0.12 }
		],
		maxDaysBeforeContact: 5,
		speedLimit: 130
	},
	{
		name: 'Mercedes Benz Sprinter L4H2',
		slug: 'mercedes-sprinter',
		type: 'L4H2',
		seats: '2',
		hasAC: true,
		hasCruise: false,
		year: 2020,
		gearbox: 'Ručni',
		capacity: '15 m²',
		payload: '1200 kg',
		images: ['/images/vehicles/mercedes-sprinter/1.jpg', '/images/vehicles/mercedes-sprinter/2.jpg', '/images/vehicles/mercedes-sprinter/3.jpg'],
		description: [
			'Mercedes-Benz Sprinter se s pravom naziva krstaricom među kombijima, kombinirajući impresivnu kvalitetu izrade s izvanrednom funkcionalnošću.',
			'Odlikuje ga prostrani tovarni prostor, koji nudi obilje mjesta za prijevoz robe, što ga čini idealnim partnerom za posao. Njegova robusna konstrukcija i pouzdanost osiguravaju da će sve vaše dostave biti sigurne.',
			'Unutrašnjost je dizajnirana s naglaskom na udobnost vozača, s intuitivnim kontrolama. Ugrađena stražnja kamera pruža dodatnu sigurnost i znatno olakšava parkiranje i manevriranje, čak i u uskim prostorima.',
			'U vožnji je stabilan i siguran, čak i kad je potpuno natovaren. S obzirom na sve njegove karakteristike, Sprinter je vozilo koje vam omogućuje da radite brže, lakše i sigurnije, bez kompromisa.'
		],
		pricing: [
			{ days: 1, price: 110, includedKm: 500, extraKmRate: 0.12 },
			{ days: 2, price: 220, includedKm: 1000, extraKmRate: 0.12 },
			{ days: 3, price: 330, includedKm: 1500, extraKmRate: 0.12 },
			{ days: 4, price: 440, includedKm: 2000, extraKmRate: 0.12 },
			{ days: 5, price: 550, includedKm: 2500, extraKmRate: 0.12 }
		],
		maxDaysBeforeContact: 5,
		speedLimit: 130
	},
	{
		name: 'Renault Trafic L2H1',
		slug: 'renault-trafic',
		type: 'L2H1',
		seats: '2',
		hasAC: true,
		hasCruise: false,
		year: 2020,
		gearbox: 'Ručni',
		capacity: '6 m²',
		payload: '1000 kg',
		images: ['/images/vehicles/renault-trafic/1.jpg', '/images/vehicles/renault-trafic/2.jpg'],
		description: [
			'Tražite kombi koji je okretan, ekonomičan i prostran? Renault Trafic je idealan izbor. S nosivošću od 1000 kg, savršeno je rješenje za prijevoz tereta u gradskoj vožnji.',
			'Ovaj model, s potrošnjom goriva od oko 7 litara, osigurava značajnu uštedu. Opremljen je modernim multimedijskim sustavom koji omogućuje povezivanje i ugodnije putovanje. Zbog svoje spretnosti i okretnosti, idealan je za sve vrste dostave i jednostavan je za upravljanje.',
			'Zajedničkim djelovanjem osiguravamo pouzdanost i dugovječnost cijele flote, a vama mirnu i sigurnu vožnju. Hvala na razumijevanju, sretan put želi vam Sprinter d.o.o.'
		],
		pricing: [
			{ days: 1, price: 95, includedKm: 500, extraKmRate: 0.12 },
			{ days: 2, price: 190, includedKm: 1000, extraKmRate: 0.12 },
			{ days: 3, price: 285, includedKm: 1500, extraKmRate: 0.12 },
			{ days: 4, price: 380, includedKm: 2000, extraKmRate: 0.12 },
			{ days: 5, price: 475, includedKm: 2500, extraKmRate: 0.12 }
		],
		maxDaysBeforeContact: 5,
		speedLimit: 130,
		hasPaymentTerms: true
	}
];

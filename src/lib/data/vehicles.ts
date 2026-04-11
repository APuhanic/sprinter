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
	imageUrl?: string;
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
		gearbox: 'Ručni'
	},
	{
		name: 'Mercedes Benz E 300 Avantgarde',
		slug: 'mercedes-e300',
		type: 'Putnički',
		seats: '5',
		hasAC: true,
		hasCruise: true,
		year: 2021,
		gearbox: 'Automatski'
	},
	{
		name: 'Mercedes V Klassa',
		slug: 'mercedes-v-klassa',
		type: 'Putnički',
		seats: '7+1',
		hasAC: true,
		hasCruise: true,
		year: 2021,
		gearbox: 'Automatski'
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
		payload: '1300 kg'
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
		payload: '1200 kg'
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
		payload: '1000 kg'
	}
];

export const trackTypes = {
	beat: 'Beat',
	beatWithHook: 'Beat with Hook',
	song: 'Song',
	topLine: 'Top Line',
	vocal: 'Vocal',
} as const
export const genres = {
	pop: 'Pop',
	techno: 'Techno',
	drill: 'Drill',
	rock: 'Rock',
	hiphop: 'Hiphop',
	edm: 'EDM',
	country: 'Country',
	jazz: 'Jazz',
	classical: 'Classical',
	rnb: 'R&B',
	indie: 'Indie/Alternative',
	trap: 'Trap',
	lofi: 'Lofi',
	ambient: 'Ambient',
	house: 'House',
	dubstep: 'Dubstep',
	latin: 'Latin',
	hyperpop: 'Hyperpop',
	rage: 'Rage',
	oldSchool: 'Old School',
	electronic: 'Electronic',
	kpop: 'Kpop',
	orchestral: 'Orchestral',
	reggae: 'Reggae',
	reggaeton: 'Reggaeton',
} as const
export const moods = {
	happy: 'Happy',
	sad: 'Sad',
	energetic: 'Energetic',
	relaxed: 'Relaxed',
	angry: 'Angry',
	chill: 'Chill',
	dark: 'Dark',
	romantic: 'Romantic',
	inspiring: 'Inspiring',
	determined: 'Determined',
	rebellious: 'Rebellious',
	grateful: 'Grateful',
	peaceful: 'Peaceful',
	accomplished: 'Accomplished',
	lonely: 'Lonely',
	confident: 'Confident',
	soulful: 'Soulful',
} as const
export const keys = {
	c: 'C',
	cSharp: 'C#',
	d: 'D',
	dSharp: 'D#',
	e: 'E',
	f: 'F',
	fSharp: 'F#',
	g: 'G',
	gSharp: 'G#',
	a: 'A',
	aSharp: 'A#',
	b: 'B',
	cMinor: 'Cm',
	cSharpMinor: 'C#m',
	dMinor: 'Dm',
	dSharpMinor: 'D#m',
	eMinor: 'Em',
	fMinor: 'Fm',
	fSharpMinor: 'F#m',
	gMinor: 'Gm',
	gSharpMinor: 'G#m',
	aMinor: 'Am',
	aSharpMinor: 'A#m',
	bMinor: 'Bm',
} as const

export const trackMetadataArrays = {
	trackTypes: Object.keys(trackTypes).map(
		(key) => trackTypes[key as keyof typeof trackTypes]
	),
	genres: Object.keys(genres).map((key) => genres[key as keyof typeof genres]),
	moods: Object.keys(moods).map((key) => moods[key as keyof typeof moods]),
	keys: Object.keys(keys).map((key) => keys[key as keyof typeof keys]),
}

export const sortOptions = [
	{ label: 'Date: Old to new', value: 'asc(releaseDate)' },
	{
		label: 'Date: New to old',
		value: 'desc(releaseDate)',
	},
	{ label: 'Price: Low to high', value: 'asc(price)' },
	{ label: 'Price: High to low', value: 'desc(price)' },
	{
		label: 'Alphabetical: A to Z',
		value: 'asc(title)',
	},
	{
		label: 'Alphabetical: Z to A',
		value: 'desc(title)',
	},
]

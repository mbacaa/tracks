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
} as const

export const trackMetadataArrays = {
	trackTypes: Object.keys(trackTypes).map(
		(key) => trackTypes[key as keyof typeof trackTypes]
	),
	genres: Object.keys(genres).map((key) => genres[key as keyof typeof genres]),
	moods: Object.keys(moods).map((key) => moods[key as keyof typeof moods]),
	keys: Object.keys(keys).map((key) => keys[key as keyof typeof keys]),
}

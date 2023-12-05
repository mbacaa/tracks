import { genres, keys, moods, trackTypes } from '@/config/tracks'
import * as z from 'zod'
import { getValues } from '../utils'

export const trackUploadSchema = z.object({
	imageUrl: z.string().url(),
	audioUrl: z.string().url(),
	title: z.string().min(4).max(255),
	description: z.string().max(500).optional(),
	type: z.enum(getValues(trackTypes), {
		required_error: 'Must be a valid track type',
	}),
	genre: z.enum(getValues(genres), {
		required_error: 'Must be a valid genre',
	}),
	mood: z.enum(getValues(moods), {
		required_error: 'Must be a valid mood',
	}),
	key: z.enum(getValues(keys), {
		required_error: 'Must be a valid key',
	}),
	bpm: z.number().int().min(1).max(300),
	price: z.number().min(0.01).max(100000),
})

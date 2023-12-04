import { insertTrackSchema, selectTrackSchema } from '@/server/db/schema'
import { z } from 'zod'
import { trackTypes, genres, moods, keys } from '@/config/tracks'

export type Track = z.infer<typeof selectTrackSchema>
export type NewTrack = z.infer<typeof insertTrackSchema>

export type trackTypes = (typeof trackTypes)[keyof typeof trackTypes]
export type genres = (typeof genres)[keyof typeof genres]
export type moods = (typeof moods)[keyof typeof moods]
export type keys = (typeof keys)[keyof typeof keys]

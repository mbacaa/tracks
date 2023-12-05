import {
	integer,
	pgTableCreator,
	primaryKey,
	text,
	timestamp,
	pgEnum,
	doublePrecision,
	serial,
	varchar,
} from 'drizzle-orm/pg-core'
import { type AdapterAccount } from 'next-auth/adapters'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { trackMetadataArrays } from '@/config/tracks'

export const typeEnum = pgEnum('type', [...trackMetadataArrays.trackTypes] as [
	string,
	...string[]
])
export const genreEnum = pgEnum('genre', [...trackMetadataArrays.genres] as [
	string,
	...string[]
])
export const moodEnum = pgEnum('mood', [...trackMetadataArrays.moods] as [
	string,
	...string[]
])
export const keyEnum = pgEnum('key', [...trackMetadataArrays.keys] as [
	string,
	...string[]
])

export const pgTable = pgTableCreator((name) => `beats_${name}`)

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
})

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
)

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
)

export const tracks = pgTable('tracks', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: varchar('description', { length: 500 }),
	type: typeEnum('type').notNull().default('Beat'),
	genre: genreEnum('genre').notNull().default('Pop'),
	mood: moodEnum('mood').notNull().default('Happy'),
	key: keyEnum('key').notNull().default('C'),
	bpm: integer('bpm').notNull().notNull().default(120),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	imageUrl: text('imageUrl').notNull().default(''),
	audioUrl: text('audioUrl').notNull().default(''),
	price: doublePrecision('price').default(0.0),
	releaseDate: timestamp('releaseDate').defaultNow(),
})

export const selectTrackSchema = createSelectSchema(tracks)
export const insertTrackSchema = createInsertSchema(tracks).omit({
	userId: true,
})

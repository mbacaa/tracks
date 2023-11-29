import { pgTableCreator, serial } from 'drizzle-orm/pg-core'

export const pgTable = pgTableCreator((name) => `beats_${name}`)

export const test = pgTable('test', {
	id: serial('id').primaryKey(),
})

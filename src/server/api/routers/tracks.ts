import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'
import { db } from '@/server/db'
import { tracks, users } from '@/server/db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

export const tracksRouter = createTRPCRouter({
	getAllTracks: publicProcedure.query(async () => {
		return db.select().from(tracks)
	}),
	getUserTracks: protectedProcedure.query(async ({ ctx }) => {
		return db
			.select()
			.from(tracks)
			.where(eq(tracks.userId, ctx.session.user.id))
	}),
})

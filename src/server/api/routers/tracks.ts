import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'
import { db } from '@/server/db'
import { tracks, users } from '@/server/db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { insertTrackSchema } from '@/server/db/schema'

export const tracksRouter = createTRPCRouter({
	getAllTracks: publicProcedure.query(async () => {
		return db.select().from(tracks)
	}),
	getUsersTracks: protectedProcedure.query(async ({ ctx }) => {
		return db
			.select()
			.from(tracks)
			.where(eq(tracks.userId, ctx.session.user.id))
	}),

	createTrack: protectedProcedure
		.input(insertTrackSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id

			return await db
				.insert(tracks)
				.values({
					...input,
					userId,
				})
				.returning()
		}),
})

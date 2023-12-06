import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'
import { db } from '@/server/db'
import { tracks, users } from '@/server/db/schema'
import { z } from 'zod'
import { desc, eq } from 'drizzle-orm'
import { insertTrackSchema } from '@/server/db/schema'

export const tracksRouter = createTRPCRouter({
	getUsersTracks: protectedProcedure.query(async ({ ctx }) => {
		const result = await db
			.select({
				track: tracks,
				user: users,
			})
			.from(tracks)
			.leftJoin(users, eq(tracks.userId, users.id))
			.where(eq(tracks.userId, ctx.session.user.id))
			.orderBy(desc(tracks.releaseDate))

		return result.map((row) => {
			return {
				...row.track,
				username: row.user?.name ?? 'Unknown',
			}
		})
	}),

	getLatestTracks: publicProcedure
		.input(z.object({ amount: z.number().min(1) }))
		.query(async ({ input }) => {
			const result = await db
				.select({
					track: tracks,
					user: users,
				})
				.from(tracks)
				.leftJoin(users, eq(tracks.userId, users.id))
				.orderBy(desc(tracks.releaseDate))
				.limit(input.amount)

			return result.map((row) => {
				return {
					...row.track,
					username: row.user?.name ?? 'Unknown',
				}
			})
		}),

	createTrack: protectedProcedure
		.input(insertTrackSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id

			return await db.insert(tracks).values({
				...input,
				userId,
			})
		}),
})

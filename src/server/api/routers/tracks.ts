import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'
import { db } from '@/server/db'
import { tracks, users } from '@/server/db/schema'
import { z } from 'zod'
import {
	Column,
	ColumnBaseConfig,
	ColumnDataType,
	and,
	desc,
	eq,
	ne,
	notInArray,
} from 'drizzle-orm'
import { insertTrackSchema } from '@/server/db/schema'
import { TRPCError } from '@trpc/server'

export const tracksRouter = createTRPCRouter({
	getTrackById: publicProcedure
		.input(z.object({ trackId: z.number() }))
		.query(async ({ input }) => {
			const result = await db
				.select({
					track: tracks,
					user: users,
				})
				.from(tracks)
				.leftJoin(users, eq(tracks.userId, users.id))
				.where(eq(tracks.id, input.trackId))
				.limit(1)

			if (result.length === 0) return null

			const row = result[0]

			return {
				...row.track,
				username: row.user?.name ?? 'Unknown',
			}
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

	getRelatedTracks: publicProcedure
		.input(
			z.object({
				amount: z.number().min(1),
				trackId: z.number(),
			})
		)
		.query(async ({ input }) => {
			const { amount, trackId } = input

			const selectedTrack = await db.query.tracks.findFirst({
				where: eq(tracks.id, trackId),
				with: { user: true },
			})

			if (!selectedTrack) throw new TRPCError({ code: 'NOT_FOUND' })

			const relatedTracks = await db.query.tracks.findMany({
				where: and(
					ne(tracks.id, trackId),
					eq(tracks.genre, selectedTrack.genre)
				),

				with: { user: true },
				limit: amount,
			})

			return relatedTracks.map((track) => ({
				...track,
				username: track.user?.name ?? 'Unknown',
			}))
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

	deleteTrack: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input }) => {
			return await db.delete(tracks).where(eq(tracks.id, input.id))
		}),
})

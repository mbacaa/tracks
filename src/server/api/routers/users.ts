import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const usersRouter = createTRPCRouter({
	updateUsername: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id

			const usersWithSameName = await db
				.select()
				.from(users)
				.where(eq(users.name, input.name))
				.limit(1)

			if (usersWithSameName.length !== 0)
				throw new Error('Username already taken')

			return await db
				.update(users)
				.set({ name: input.name })
				.where(eq(users.id, userId))
		}),
})

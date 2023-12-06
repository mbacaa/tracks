import { createTRPCRouter } from '@/server/api/trpc'
import { usersRouter } from './routers/users'
import { tracksRouter } from './routers/tracks'

export const appRouter = createTRPCRouter({
	users: usersRouter,
	tracks: tracksRouter,
})

export type AppRouter = typeof appRouter

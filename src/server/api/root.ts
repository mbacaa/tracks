import { createTRPCRouter } from '@/server/api/trpc'
import { tracksRouter } from './routers/tracks'

export const appRouter = createTRPCRouter({
	tracks: tracksRouter,
})

export type AppRouter = typeof appRouter

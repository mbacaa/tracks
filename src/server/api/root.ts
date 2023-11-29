import { testRouter } from '@/server/api/routers/test'
import { createTRPCRouter } from '@/server/api/trpc'

export const appRouter = createTRPCRouter({
	test: testRouter,
})

export type AppRouter = typeof appRouter

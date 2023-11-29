import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'

import { getBaseUrl } from '@/lib/utils'
import { type AppRouter } from '@/server/api/root'

export const transformer = superjson

export function getUrl() {
	return getBaseUrl() + '/api/trpc'
}

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

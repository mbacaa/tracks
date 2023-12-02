import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
	getServerSession,
	DefaultUser,
	type DefaultSession,
	type NextAuthOptions,
} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'
import { db } from '@/server/db'
import { pgTable } from '@/server/db/schema'

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
			email?: string
			name?: string
			image?: string
		} & DefaultSession['user']
	}
}

export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
				email: user.email,
				name: user.name,
				image: user.image,
			},
		}),
	},
	adapter: DrizzleAdapter(db, pgTable),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		}),
	],
}

export const getServerAuthSession = () => getServerSession(authOptions)

export interface User extends DefaultUser {
	id: string
	email?: string
	name?: string
	image?: string
}

export const getUser = async (): Promise<User | null> => {
	const session = await getServerAuthSession()
	return session ? session.user : null
}

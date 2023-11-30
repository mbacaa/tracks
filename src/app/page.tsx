import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'
import { signIn } from 'next-auth/react'

export default async function Home() {
	const hello = await api.test.hello.query({ text: 'from tRPC' })
	const session = await getServerAuthSession()

	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<h1 className='text-6xl'>
				{hello ? hello.greeting : 'Loading tRPC query...'}
			</h1>

			{session ? (
				<span>Logged in as {session.user?.name}</span>
			) : (
				<span>Logged out</span>
			)}
		</main>
	)
}

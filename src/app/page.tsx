import { api } from '@/trpc/server'

export default async function Home() {
	const hello = await api.test.hello.query({ text: 'from tRPC' })

	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<h1 className='text-6xl'>
				{hello ? hello.greeting : 'Loading tRPC query...'}
			</h1>
			<p></p>
		</main>
	)
}

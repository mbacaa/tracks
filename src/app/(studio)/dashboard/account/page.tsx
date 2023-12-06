import UserAccountForm from '@/components/UserAccountForm'
import { getUserAuth } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function Account() {
	const user = await getUserAuth()
	await new Promise((resolve) => setTimeout(resolve, 1000))

	if (!user) {
		redirect('/login')
	}

	return (
		<main>
			<section className='flex justify-between items-center border-b pb-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Account
				</h2>
			</section>
			<section className='mt-8 '>
				<UserAccountForm user={user} />
			</section>
		</main>
	)
}

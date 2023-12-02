import Header from '@/components/Header'
import { getUser } from '@/server/auth'

interface LandingLayoutProps {
	children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
	const user = await getUser()

	return (
		<div className='min-h-screen flex flex-col'>
			<Header user={user} />
			<main className='flex-1'>{children}</main>
		</div>
	)
}

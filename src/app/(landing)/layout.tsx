import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getUserAuth } from '@/server/auth'

interface LandingLayoutProps {
	children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
	const user = await getUserAuth()

	return (
		<div className='min-h-screen flex flex-col'>
			<Header user={user} />
			<main className='flex-1 min-h-screen'>{children}</main>
			<Footer />
		</div>
	)
}

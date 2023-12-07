import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getUserAuth } from '@/server/auth'

interface TracksLayoutProps {
	children: React.ReactNode
}

export default async function TracksLayout({ children }: TracksLayoutProps) {
	const user = await getUserAuth()

	return (
		<div className='min-h-screen flex flex-col'>
			<Header user={user} />
			<main className='flex-1 min-h-screen container'>{children}</main>
			<Footer />
		</div>
	)
}

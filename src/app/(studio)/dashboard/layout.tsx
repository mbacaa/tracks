import { checkAuth } from '@/server/auth'
import DashboardNav from '@/components/DashboardNav'

interface DashboardLayoutProps {
	children: React.ReactNode
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	await checkAuth()

	return (
		<div className='min-h-screen flex flex-col'>
			<div className='container grid flex-1 md:grid-cols-[200px_1fr]'>
				<aside className='hidden flex-col md:flex  py-8'>
					<DashboardNav />
				</aside>
				<main className='py-8 md:pl-8 md:border-l'>{children}</main>
			</div>
		</div>
	)
}

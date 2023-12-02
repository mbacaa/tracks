import Header from '@/components/Header'

interface LandingLayoutProps {
	children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1'>{children}</main>
		</div>
	)
}

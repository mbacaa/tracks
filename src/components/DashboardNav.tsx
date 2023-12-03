import Link from 'next/link'
import { Icons } from './Icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

export default async function DashboardNav() {
	return (
		<nav className='flex flex-col space-y-4 text-sm'>
			<Link
				href='/dashboard/account'
				className={cn(
					buttonVariants({ variant: 'ghost', size: 'sm' }),
					'w-full flex justify-start'
				)}
			>
				<Icons.account className='w-4 h-4 mr-2' />
				Account
			</Link>

			<Link
				href='/dashboard'
				className={cn(
					buttonVariants({ variant: 'ghost', size: 'sm' }),
					'w-full flex justify-start'
				)}
			>
				<Icons.dashboard className='w-4 h-4 mr-2' />
				Dashboard
			</Link>

			<Link
				href='/dashboard/billing'
				className={cn(
					buttonVariants({ variant: 'ghost', size: 'sm' }),
					'w-full flex justify-start'
				)}
			>
				<Icons.billing className='w-4 h-4 mr-2' />
				Billing
			</Link>
		</nav>
	)
}

import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import { Icons } from './Icons'
import { siteConfig } from '@/config/site'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export default function Footer() {
	return (
		<footer className='border-t py-2'>
			<div className='container w-full flex items-center justify-between'>
				<div className='flex items-center'>
					<Link href='/' className='flex items-center space-x-2'>
						<Icons.logo className='h-6 w-6' aria-hidden='true' />
						<span className='hidden text-lg font-bold tracking-tighter lg:inline-block'>
							{siteConfig.name}
						</span>
					</Link>
				</div>
				<div className='flex items-center'>
					<Link
						href={siteConfig.links.github}
						className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
					>
						<Icons.github className='h-4 w-4' aria-hidden='true' />
					</Link>
					<ModeToggle />
				</div>
			</div>
		</footer>
	)
}

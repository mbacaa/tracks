import Link from 'next/link'

import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { siteConfig } from '@/config/site'
import { User } from 'next-auth'
import AvatarDropdown from './AvatarDropdown'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
	user: User | null
}

export default async function Header({ user }: HeaderProps) {
	return (
		<header className='md:sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b'>
			<div className='container w-full h-16 flex items-center justify-between'>
				<div className='flex items-center'>
					<MainNav name={siteConfig.name} items={siteConfig.mainNav} />
					<MobileNav name={siteConfig.name} items={siteConfig.mainNav} />
				</div>
				<div className='flex items-center'>
					{user ? (
						<AvatarDropdown user={user} />
					) : (
						<Link
							href='/login'
							className={cn(
								buttonVariants({ variant: 'default', size: 'sm' }),
								'text-sm ml-auto'
							)}
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

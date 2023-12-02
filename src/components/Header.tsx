import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { siteConfig } from '@/config/site'

export default async function Header() {
	return (
		<header className='md:sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b'>
			<div className='container w-full h-16 flex items-center'>
				<MainNav name={siteConfig.name} items={siteConfig.mainNav} />
				<MobileNav name={siteConfig.name} items={siteConfig.mainNav} />
			</div>
		</header>
	)
}

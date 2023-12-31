import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/Icons'
import FeaturedTracks from '@/components/FeaturedTracks'

export default async function Home() {
	return (
		<main className='h-full flex flex-col'>
			<section className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 px-8 py-12 md:pt-32 md:px-0 text-center '>
				<Link href={siteConfig.links.github} target='_blank'>
					<Badge
						aria-hidden='true'
						className='rounded-md px-3.5 py-1.5'
						variant='secondary'
					>
						<Icons.github className='inline-block mr-2 h-3.5 w-3.5' />
						Explore the code on GitHub
					</Badge>
				</Link>

				<h1 className='font-bold tracking-tighter text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
					Unleash the rhythm with our vibrant collection of tracks.
				</h1>
				<h2 className='max-w-[40rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
					Explore a playground of tracks and witness the seamless magic of
					Next.js 14 in crafting this unique e-commerce experience.
				</h2>
				<div className='flex flex-wrap items-center justify-center gap-4'>
					<Link href='/tracks' className={buttonVariants()}>
						Start shopping
					</Link>
					<Link
						href='/dashboard'
						className={cn(
							buttonVariants({
								variant: 'outline',
							})
						)}
					>
						Become a seller
					</Link>
				</div>
			</section>
			<FeaturedTracks />
		</main>
	)
}

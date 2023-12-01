import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { links } from '@/config/site'
import { Badge } from '@/components/ui/badge'

export default async function Home() {
	return (
		<section className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-32'>
			<Link href={links.github} target='_blank'>
				<Badge
					aria-hidden='true'
					className='rounded-md px-3.5 py-1.5'
					variant='secondary'
				>
					<Github className='inline-block mr-2 h-3.5 w-3.5' />
					Follow along on GitHub
				</Badge>
			</Link>

			<h1 className='font-bold tracking-tighter text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
				An e-commerce platform for music producers and artists.
			</h1>
			<h2 className='max-w-[40rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
				I&apos;m building a platform for music producers and artists to sell
				their music and digital products.
			</h2>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				<Link href='/' className={buttonVariants()}>
					Start shopping
				</Link>
				<Link
					href='/'
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
	)
}

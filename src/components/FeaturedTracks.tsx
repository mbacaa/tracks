import Link from 'next/link'
import TrackArtwork from './TrackArtwork'
import { buttonVariants } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { api } from '@/trpc/server'
import { Icons } from './Icons'

export default async function FeaturedTracks() {
	const featuredTracks = await api.tracks.getLatestTracks.query({ amount: 6 })

	return (
		<section className='container flex flex-col md:mt-24 lg:mt-32 md:w-4/5 lg:w-3/4 gap-8'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col'>
					<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
						Featured Tracks
					</h2>
					<p className='mt-2 text-muted-foreground'>
						Here&apos;s a selection of our favorites.
					</p>
				</div>
				<Link
					href='/tracks'
					className={buttonVariants({ variant: 'ghost', size: 'sm' })}
				>
					<span>View more</span>
					<Icons.next className='w-4 h-4 ml-2' />
				</Link>
			</div>
			<div className='relative'>
				<ScrollArea>
					<div className='flex space-x-4 pb-4'>
						{featuredTracks.map((track, index) => (
							<TrackArtwork
								key={index}
								track={track}
								className='w-[250px]'
								aspectRatio='portrait'
								width={250}
								height={330}
							/>
						))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>
		</section>
	)
}

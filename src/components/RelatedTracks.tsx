'use client'

import Link from 'next/link'
import TrackArtwork from './TrackArtwork'
import { buttonVariants } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { api } from '@/trpc/react'
import { Icons } from './Icons'
import { CAROUSEL_QUERY_LIMIT } from '@/config/query-limits'

interface RelatedTracksProps {
	trackId: number
}

export default function RelatedTracks({ trackId }: RelatedTracksProps) {
	const { data: relatedTracks, isLoading } =
		api.tracks.getRelatedTracks.useQuery({
			amount: CAROUSEL_QUERY_LIMIT,
			trackId: trackId,
		})

	return (
		<section className='flex flex-col md:mt-24 lg:mt-32 gap-8 mb-12'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col'>
					<h2 className='font-bold tracking-tighter text-2xl lg:text-4xl'>
						You might also like
					</h2>
					<p className='mt-2 text-muted-foreground'>
						Here are some tracks that are similar to the one you're currently
						viewing.
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
						{isLoading || !relatedTracks
							? null
							: relatedTracks.map((track, index) => (
									<TrackArtwork
										key={index}
										track={track}
										className='w-[200px]'
										aspectRatio='square'
										width={200}
										height={200}
									/>
							  ))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>
		</section>
	)
}

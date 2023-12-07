'use client'

import { api } from '@/trpc/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import RelatedTracks from '@/components/RelatedTracks'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'

export default function TrackPage() {
	const params = useParams()

	const { data: track } = api.tracks.getTrackById.useQuery(
		{
			trackId: Number(params.trackId),
		},
		{ suspense: true }
	)

	const formattedDate = track?.releaseDate?.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	const trackMetadata = [
		{
			title: 'Release Date',
			value: formattedDate,
			icon: <Icons.date className='w-3 h-3 mr-1' />,
		},
		{
			title: 'BPM',
			value: track?.bpm,
			icon: <Icons.bpm className='w-3 h-3 mr-1' />,
		},
		{
			title: 'Key',
			value: track?.key,
			icon: <Icons.key className='w-3 h-3 mr-1' />,
		},
		{
			title: 'Mood',
			value: track?.mood,
			icon: <Icons.mood className='w-3 h-3 mr-1' />,
		},
	]

	return (
		<main className='h-full md:w-2/3 mx-auto py-4 space-y-4'>
			<section className='flex items-center gap-2 text-muted-foreground'>
				<Link
					href={`/tracks`}
					className={cn(
						buttonVariants({ variant: 'link', size: 'sm' }),
						'text-muted-foreground text-sm p-0'
					)}
				>
					Tracks
				</Link>
				<span>/</span>
				<Link
					href={`/tracks/${track?.genre}`}
					className={cn(
						buttonVariants({ variant: 'link', size: 'sm' }),
						'text-muted-foreground text-sm p-0'
					)}
				>
					{track?.genre}
				</Link>
				<span>/</span>
				<Button
					variant='ghost'
					size='sm'
					className='text-foreground text-sm p-0 bg-none hover:bg-transparent hover:cursor-default'
				>
					{track?.title}
				</Button>
			</section>
			<section className='flex flex-col lg:flex-row gap-12 md:gap-24 lg:gap-32 justify-center sm:justify-start'>
				<div className='w-fit justify-center'>
					{track?.imageUrl && track.imageUrl !== '' ? (
						<Image
							src={track.imageUrl}
							alt={'Track Artwork Image'}
							width={400}
							height={400}
							className='object-cover transition-all duration-200 ease-in-out transform group-hover:scale-105 aspect-[3/4] rounded-md border'
						/>
					) : (
						<div
							style={{
								height: '525px',
								width: '400px',
							}}
							className={
								'transition-all duration-200 ease-in-out transform group-hover:scale-105 border rounded-md'
							}
						/>
					)}
				</div>
				<div className='flex-1 flex flex-col gap-8'>
					<div>
						<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl truncate'>
							{track?.title}
						</h2>
						<h3 className='text-muted-foreground'>
							<Link
								href={`/artist/${track?.username}`}
								className={cn(
									buttonVariants({ variant: 'link', size: 'sm' }),
									'text-muted-foreground text-sm p-0 truncate'
								)}
							>
								{track?.username}
							</Link>
						</h3>
					</div>

					<div className='flex items-center gap-4'>
						<p className='text-2xl font-bold'>{track?.price} $</p>
						<Button
							variant='outline'
							size='sm'
							className='text-sm font-bold'
							onClick={() => {}}
						>
							<Icons.cart className='w-4 h-4 mr-2' />
							Add to cart
						</Button>
					</div>

					<Accordion type='multiple' className='w-full'>
						<AccordionItem value='item-1'>
							<AccordionTrigger>About</AccordionTrigger>
							<AccordionContent className='text-sm text-muted-foreground'>
								{track?.description}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>Information</AccordionTrigger>
							<AccordionContent>
								<div className='flex flex-col gap-1 text-sm text-muted-foreground'>
									{trackMetadata.map((item, index) =>
										item.value ? (
											<div key={index} className='flex items-center'>
												{item.icon}
												{item.value}
											</div>
										) : null
									)}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
			{track?.id ? (
				<section>
					<RelatedTracks trackId={track.id} />
				</section>
			) : null}
		</main>
	)
}

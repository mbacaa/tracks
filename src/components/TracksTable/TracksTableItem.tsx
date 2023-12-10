import { TrackWithUsername } from '@/types/tracks'
import Image from 'next/image'

import TracksTablePlayButton from './TracksPlayButton'
import { Icons } from '../Icons'
import AddToCartButton from '../AddToCartButton'
import Link from 'next/link'

interface TracksTableItemProps {
	track: Pick<
		TrackWithUsername,
		| 'id'
		| 'userId'
		| 'imageUrl'
		| 'price'
		| 'bpm'
		| 'title'
		| 'username'
		| 'genre'
		| 'mood'
	>
	index: number
}

export default async function TracksTableItem({
	track,
	index,
}: TracksTableItemProps) {
	return (
		<div className='w-full flex justify-between md:p-4 rounded-md items-center transition-opacity duration-100 ease-in-out hover:bg-muted'>
			<div className='flex items-center space-x-4'>
				<TracksTablePlayButton track={track} index={index} />

				<Link href={`/track/${track.id}`} className='min-w-[50px]'>
					<Image
						src={track.imageUrl}
						alt={`${track.title} Artwork`}
						width={50}
						height={50}
						className='aspect-square object-cover rounded-md transition-all duration-200 ease-in-out'
					/>
				</Link>
				<div className='flex flex-col justify-center md:justify-start w-40 sm:w-48 md:w-full'>
					<Link href={`/track/${track.id}`} className='w-full'>
						<h3 className='text-sm md:text-base font-medium leading-none truncate'>
							{track.title}
						</h3>
					</Link>
					<Link href={`/artist/${track.userId}`}>
						<div className='text-xs text-muted-foreground'>
							{track.username}
						</div>
					</Link>
				</div>
			</div>
			<div className='flex sm:gap-4'>
				<div className='items-center space-x-4 hidden lg:flex ml-4'>
					<div className='bg-background p-2 rounded-md text-xs text-muted-foreground px-2 flex'>
						<Icons.headphones className='w-4 h-4 mr-2' />
						{track.genre}
					</div>
					<div className='bg-background p-2 rounded-md text-xs text-muted-foreground px-2 flex'>
						<Icons.mood className='w-4 h-4 mr-2' />
						{track.mood}
					</div>
					<div className='bg-background p-2 rounded-md text-xs text-muted-foreground px-2 flex'>
						<Icons.bpm className='w-4 h-4 mr-2' />
						{track.bpm}
					</div>
				</div>
				<AddToCartButton track={track} />
			</div>
		</div>
	)
}

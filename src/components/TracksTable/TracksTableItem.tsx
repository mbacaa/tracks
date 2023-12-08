import { TrackWithUsername } from '@/types/tracks'
import Image from 'next/image'
import TracksTablePlayButton from './TracksPlayButton'
import { Icons } from '../Icons'
import AddToCartButton from '../AddToCartButton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
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

export default function TracksTableItem({
	track,
	index,
}: TracksTableItemProps) {
	return (
		<div className='group w-full flex justify-between p-4 rounded-md items-center transition-opacity duration-100 ease-in-out hover:bg-muted'>
			<div className='flex items-center space-x-4'>
				<TracksTablePlayButton track={track} index={index} />
				<Link href={`/track/${track.id}`}>
					<Image
						src={track.imageUrl}
						alt={`${track.title} Artwork`}
						width={50}
						height={50}
						className='aspect-square object-cover rounded-md transition-all duration-200 ease-in-out transform hover:scale-105'
					/>
				</Link>
				<div className='flex flex-col space-y-1'>
					<Link href={`/track/${track.id}`}>
						<h3 className='font-medium leading-none'>{track.title}</h3>
					</Link>
					<Link href={`/artist/${track.userId}`}>
						<div className='text-xs text-muted-foreground'>
							{track.username}
						</div>
					</Link>
				</div>
			</div>
			<div className='flex items-center space-x-4'>
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
				<AddToCartButton track={track} />
			</div>
		</div>
	)
}

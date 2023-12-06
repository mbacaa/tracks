import Image from 'next/image'

import { cn } from '@/lib/utils'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import type { TrackWithUsername } from '@/types/tracks'
import { Icons } from './Icons'

interface TrackArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
	track: Pick<
		TrackWithUsername,
		'releaseDate' | 'imageUrl' | 'price' | 'bpm' | 'key' | 'title' | 'username'
	>
	aspectRatio?: 'portrait' | 'square'
	width?: number
	height?: number
}

export default function TrackArtwork({
	track,
	aspectRatio = 'portrait',
	width,
	height,
	className,
	...props
}: TrackArtworkProps) {
	const formattedDate = track.releaseDate?.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	return (
		<div className={cn('space-y-3', className)} {...props}>
			<ContextMenu>
				<ContextMenuTrigger>
					<div className='group relative overflow-hidden rounded-md'>
						{track.imageUrl ? (
							<Image
								src={track.imageUrl}
								alt={'Track Artwork Preview'}
								width={width}
								height={height}
								className={cn(
									'object-cover transition-all duration-200 ease-in-out transform group-hover:scale-105 border',
									aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
								)}
							/>
						) : (
							<div
								className={cn(
									`h-[${height}px] w-[${width}px]`,
									'transition-all duration-200 ease-in-out transform group-hover:scale-105 border'
								)}
							/>
						)}
						<div className='absolute flex-col justify-end items-end gap-1 opacity-0 p-2 top-0 z-10 text-xs font-medium text-muted-background transition-opacity duration-50 ease-in-out group-hover:opacity-100 flex w-full h-full bg-background/50 group-hover:backdrop-blur-[3px]'>
							<p className='text-lg font-bold mb-auto'>{track.price} $</p>
							<p className='flex items-center'>
								{track.bpm}
								<Icons.bpm className='w-3 h-3 ml-1' />
							</p>
							<p className='flex items-center'>
								{track.key}
								<Icons.key className='w-3 h-3 ml-1' />
							</p>
							<p className='flex items-center'>
								{formattedDate}
								<Icons.date className='w-3 h-3 ml-1' />
							</p>
						</div>
					</div>
				</ContextMenuTrigger>
			</ContextMenu>
			<div>
				<div className='space-y-1 text-sm'>
					<h3 className='font-medium leading-none truncate'>{track.title}</h3>
					{track.username ? (
						<p className='text-xs text-muted-foreground'>{track.username}</p>
					) : null}
				</div>
			</div>
		</div>
	)
}

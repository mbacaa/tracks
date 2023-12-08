'use client'

import { TrackWithUsername } from '@/types/tracks'
import { Icons } from '../Icons'

interface TracksTablePlayButtonProps {
	track: Pick<TrackWithUsername, 'id'>
	index: number
}

export default function TracksTablePlayButton({
	track,
	index,
}: TracksTablePlayButtonProps) {
	return (
		<div className='relative flex justify-center items-center w-6'>
			<div className='text-xs text-muted-foreground group-hover:opacity-0'>
				{index}
			</div>

			<div className='hidden group-hover:inline hover:cursor-pointer'>
				<Icons.play className='w-5 h-5 text-muted-foreground hover:text-primary' />
			</div>
		</div>
	)
}

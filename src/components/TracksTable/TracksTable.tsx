import { TrackWithUsername } from '@/types/tracks'
import TracksTableItem from './TracksTableItem'

interface TracksTableProps {
	tracks: TrackWithUsername[]
}

export default async function TracksTable({ tracks }: TracksTableProps) {
	return (
		<div className='flex flex-col gap-4 md:gap-0'>
			{tracks.map((track, index) => (
				<TracksTableItem key={index} index={index + 1} track={track} />
			))}
		</div>
	)
}

import { TrackWithUsername } from '@/types/tracks'
import TracksTableItem from './TracksTableItem'

interface TracksTableProps {
	tracks: TrackWithUsername[]
}

export default function TracksTable({ tracks }: TracksTableProps) {
	return (
		<div className='flex flex-col'>
			{tracks.map((track, index) => (
				<TracksTableItem key={index} index={index + 1} track={track} />
			))}
		</div>
	)
}

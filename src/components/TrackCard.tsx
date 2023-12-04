import type { Track } from '@/types/tracks'

interface TrackCardProps {
	track: Track
}

export default function TrackCard({ track }: TrackCardProps) {
	return <>{track.id}</>
}

import TrackCard from '@/components/TrackCard'
import UploadTrackForm from '@/components/UploadTrackForm/UploadTrackForm'
import { api } from '@/trpc/server'

export default async function Dashboard() {
	const myTracks = await api.tracks.getUserTracks.query()

	return (
		<main className='h-full flex flex-col'>
			<section className='flex justify-between items-center'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Your Tracks
				</h2>
				<UploadTrackForm />
			</section>
			<section className='mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{myTracks && myTracks.length > 0 ? (
					myTracks.map((track) => <TrackCard key={track.id} track={track} />)
				) : (
					<h3 className='mt-24 col-span-full font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl text-center text-muted'>
						You haven&apos;t uploaded any tracks yet.
					</h3>
				)}
			</section>
		</main>
	)
}

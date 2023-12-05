import TrackArtwork from '@/components/TrackArtwork'
import UploadTrackForm from '@/components/UploadTrackForm/UploadTrackForm'
import { api } from '@/trpc/server'

export default async function Dashboard() {
	const myTracks = await api.tracks.getUsersTracks.query()

	return (
		<main className='h-full flex flex-col'>
			<section className='flex justify-between items-center border-b pb-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Your Tracks
				</h2>
				<UploadTrackForm />
			</section>
			<section className='mt-8 flex flex-wrap gap-8'>
				{myTracks && myTracks.length > 0 ? (
					myTracks.map((track, index) => (
						<TrackArtwork
							key={index}
							track={track}
							className='w-[220px]'
							aspectRatio='square'
							width={220}
							height={220}
						/>
					))
				) : (
					<h3 className='mt-24 col-span-full font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl text-center text-muted'>
						You haven&apos;t uploaded any tracks yet.
					</h3>
				)}
			</section>
		</main>
	)
}

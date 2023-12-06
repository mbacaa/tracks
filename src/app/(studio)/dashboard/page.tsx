import { Icons } from '@/components/Icons'
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
			<section className='mt-8 flex flex-wrap gap-8 justify-center md:justify-start'>
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
					<h3 className='mt-24 w-full h-full flex flex-col justify-center items-center font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl text-center text-muted-foreground/20'>
						<Icons.ghost className='w-12 h-12 mb-4' />
						<p>You haven&apos;t uploaded any tracks yet.</p>
					</h3>
				)}
			</section>
		</main>
	)
}

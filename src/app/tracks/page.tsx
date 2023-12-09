import TracksTable from '@/components/TracksTable/TracksTable'
import TracksTableToolbar from '@/components/TracksTable/TracksTableToolbar'
import { api } from '@/trpc/server'

interface TracksPageProps {
	searchParams: {
		[key: string]: string | undefined
	}
}

export default async function TracksPage({ searchParams }: TracksPageProps) {
	const { genres, moods, sort } = searchParams

	const tracks = await api.tracks.getTracksBySearchParams.query({
		searchParams: {
			genres: genres,
			moods: moods,
			sort: sort,
			amount: 10,
		},
	})

	return (
		<main className='flex flex-col gap-4'>
			<div className='border-b pb-4 flex items-center justify-between mt-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl '>
					Explore Tracks
				</h2>
				<TracksTableToolbar />
			</div>

			<TracksTable tracks={tracks} />
		</main>
	)
}

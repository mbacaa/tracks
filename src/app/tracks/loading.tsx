import { Skeleton } from '@/components/ui/skeleton'

export default function TracksLoading() {
	return (
		<main className='flex flex-col gap-4'>
			<div className='border-b pb-4 flex items-center justify-between mt-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl '>
					Explore Tracks
				</h2>
				<div className='flex items-center gap-2'>
					<Skeleton className='w-[200px] h-8' />
					<Skeleton className='w-24 h-8' />
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				{Array.from({ length: 7 }, (_, i) => i).map((i) => (
					<Skeleton key={i} className='h-20' />
				))}
			</div>
		</main>
	)
}

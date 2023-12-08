import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingTrackPage() {
	return (
		<main className='h-full py-4 space-y-4'>
			<section className='flex items-center gap-2 text-muted-foreground'>
				<Skeleton className='my-3 w-60 h-3' />
			</section>
			<section className='flex flex-col lg:flex-row gap-12 md:gap-24 lg:gap-32 justify-center sm:justify-start'>
				<div className='w-fit justify-center'>
					<Skeleton className='h-[525px] w-[400px] rounded-md' />
				</div>
				<div className='flex-1 flex flex-col gap-6'>
					<div>
						<Skeleton className='w-60 h-10' />
						<Skeleton className='w-24 h-3 mt-4' />
					</div>
					<div className='flex items-center gap-4'>
						<Skeleton className='w-20 h-10' />
						<Skeleton className='w-32 h-10' />
					</div>

					<div className='flex flex-col gap-4'>
						<Skeleton className='h-12 w-full' />
						<Skeleton className='h-12 w-full' />
					</div>
				</div>
			</section>
		</main>
	)
}

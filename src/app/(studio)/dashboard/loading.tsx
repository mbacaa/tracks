import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Dashboard() {
	const array = Array.from({ length: 6 })

	return (
		<main className='h-full flex flex-col'>
			<section className='flex justify-between items-center border-b pb-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Your Tracks
				</h2>
				<Button>
					<Icons.plus className='w-4 h-4 mr-2' />
					Upload new beat
				</Button>
			</section>
			<section className='mt-8 flex flex-wrap gap-8 justify-center md:justify-start'>
				{array.map((_, index) => (
					<div key={index} className='flex flex-col gap-2'>
						<Skeleton className='w-[220px] h-[220px] rounded-md' />
						<Skeleton className='w-[100px] h-[14px] rounded-lg' />
						<Skeleton className='w-[150px] h-[10px] rounded-lg' />
					</div>
				))}
			</section>
		</main>
	)
}

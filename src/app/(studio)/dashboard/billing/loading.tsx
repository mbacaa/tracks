import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Account() {
	return (
		<main>
			<section className='flex justify-between items-center border-b pb-8'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Account
				</h2>
			</section>
			<section className='mt-8'>
				<div className='w-full space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle>
								<Skeleton className='w-1/3 h-8' />
							</CardTitle>
							<CardDescription>
								<Skeleton className='w-1/2 h-4' />
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Skeleton className='w-1/2 h-9' />
						</CardContent>
						<CardFooter>
							<Skeleton className='w-20 h-10' />
						</CardFooter>
					</Card>
				</div>
			</section>
		</main>
	)
}

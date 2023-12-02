import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function notFound({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<html>
			<body className='min-h-screen flex flex-col justify-center items-center gap-6'>
				<h2 className='font-bold tracking-tighter text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
					Oops! Page Not Found
				</h2>
				<h3 className='max-w-[40rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center'>
					It seems like you've stumbled upon a non-existent page. This might be
					due to a broken link or a slight typo in the address bar. Feel free to
					head back to the home page and start afresh.
				</h3>
				<Link
					href='/'
					className={cn(
						buttonVariants({ variant: 'outline', size: 'lg' }),
						'flex items-center'
					)}
				>
					<Icons.back className='mr-2 h-3.5 w-3.5' />
					Home
				</Link>
			</body>
		</html>
	)
}

'use client'

import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Icons } from './Icons'
import { Button } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

interface DeleteTrackButtonProps {
	trackId: number
	title: string
}

export default function DeleteTrackButton({
	trackId,
	title,
}: DeleteTrackButtonProps) {
	const router = useRouter()
	const [isConfirmationOpen, setConfirmationOpen] = useState(false)

	const { mutate: deleteTrack, isLoading } = api.tracks.deleteTrack.useMutation(
		{
			onSuccess: () => {
				router.refresh()
				toast.success('Track deleted successfully!')
			},
			onError: (err) => {
				toast.error(err.message)
			},
		}
	)

	return (
		<div className='relative'>
			<AlertDialog
				open={isConfirmationOpen}
				onOpenChange={() => setConfirmationOpen(!isConfirmationOpen)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-center space-y-4'>
							<p>Are you sure?</p>
							<p className='text-sm font-normal text-muted-foreground/60 flex flex-col'>
								Are you sure you want to delete track titled
								<span className='text-muted-foreground font-bold'>{title}</span>
							</p>
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter className='flex m-auto'>
						<AlertDialogCancel onClick={() => setConfirmationOpen(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={() => deleteTrack({ id: trackId })}>
							{isLoading ? (
								<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<p>Delete</p>
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
				<AlertDialogTrigger
					className='flex transition-all hover:bg-muted rounded-md'
					asChild
				>
					<Button
						className='absolute bottom-0 right-0 bg-transparent hover:bg-transparent p-0 border-none'
						variant='outline'
						size='icon'
						onClick={() => setConfirmationOpen(true)} // Open the confirmation modal
					>
						<Icons.trash className='w-4 h-4 -mr-5 hover:text-red-500' />
					</Button>
				</AlertDialogTrigger>
			</AlertDialog>
		</div>
	)
}

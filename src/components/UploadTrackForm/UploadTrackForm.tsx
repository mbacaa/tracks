'use client'

import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Icons } from '../Icons'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import FilesCard from './FilesCard'
import MetadataCard from './MetadataCard'
import ReviewCard from './ReviewCard'

export default function UploadTrackForm() {
	const form = useForm<z.infer<typeof trackUploadSchema>>({
		resolver: zodResolver(trackUploadSchema),
		defaultValues: {
			imageUrl: '',
			audioUrl: '',
			title: '',
			description: '',
			type: 'Beat',
			genre: 'Pop',
			mood: 'Happy',
			key: 'C',
			bpm: 0,
			price: 0,
		},
	})

	async function onSubmit(data: z.infer<typeof trackUploadSchema>) {
		return toast(`${JSON.stringify(data, null, 2)}`)
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Icons.plus className='w-4 h-4 mr-2' />
								Upload new beat
							</Button>
						</DialogTrigger>

						<DialogContent
							className='max-w-4xl h-5/6 flex flex-col justify-between'
							onInteractOutside={(e) => {
								e.preventDefault()
							}}
						>
							<DialogHeader>
								<DialogTitle>Upload your tracks</DialogTitle>
								<DialogDescription>
									Fill in the details for your track.
								</DialogDescription>
							</DialogHeader>

							<Tabs defaultValue='files' className='h-full flex flex-col'>
								<TabsList className='grid w-full grid-cols-3'>
									<TabsTrigger value='files'>Files</TabsTrigger>
									<TabsTrigger value='metadata'>Metadata</TabsTrigger>
									<TabsTrigger value='review'>Review</TabsTrigger>
								</TabsList>
								<TabsContent value='files' className='h-full'>
									<FilesCard form={form} />
								</TabsContent>
								<TabsContent value='metadata' className='h-full'>
									<MetadataCard form={form} />
								</TabsContent>
								<TabsContent value='review' className='h-full'>
									<ReviewCard form={form} />
								</TabsContent>
							</Tabs>
						</DialogContent>
					</Dialog>
				</form>
			</Form>
		</>
	)
}

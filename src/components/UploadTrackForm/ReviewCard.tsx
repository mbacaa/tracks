'use client'

import { Textarea } from '@/components/ui/textarea'
import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Button, buttonVariants } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Icons } from '../Icons'
import { cn } from '@/lib/utils'
import TrackArtworkPreview from '../TrackArtworkPreview'

interface ReviewCardProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
	onSubmit: (data: z.infer<typeof trackUploadSchema>) => void
	isLoading?: boolean
}

export default function ReviewCard({
	form,
	onSubmit,
	isLoading,
}: ReviewCardProps) {
	return (
		<>
			<Card className='h-full'>
				<CardHeader>
					<CardTitle>Review</CardTitle>
					<CardDescription>
						You&apos;re almost there! Take a moment to review your details
						before publishing.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col sm:flex-row gap-6'>
					<div className='flex flex-1 flex-col gap-4'>
						{/* Title */}
						<div className='flex flex-col gap-2 w-full'>
							<FormLabel>Title</FormLabel>
							<FormField
								control={form.control}
								name={'title' as const}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Title' type='text' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Description */}
						<div className='flex flex-col gap-2 w-full'>
							<FormLabel>Description</FormLabel>
							<FormField
								control={form.control}
								name={'description' as const}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder='Description (optional)'
												className='resize-none'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-4 md:ml-12 items-center sm:items-end'>
						{/*Preview Artwork*/}
						<TrackArtworkPreview
							track={{
								title: form.getValues().title,
								imageUrl: form.getValues().imageUrl,
								bpm: form.getValues().bpm,
								key: form.getValues().key,
								price: form.getValues().price,
								releaseDate: new Date(),
							}}
							width={200}
							height={200}
							aspectRatio='square'
						/>

						{/* Submit */}
						<div className='flex justify-end'>
							<Button
								type='submit'
								onClick={() => onSubmit(form.getValues())}
								className={cn(
									buttonVariants({ size: 'sm' }),
									'flex items-center w-20'
								)}
								disabled={isLoading}
							>
								{isLoading ? (
									<Icons.loader className='w-4 h-4 mr-2 animate-spin' />
								) : (
									<span>Submit</span>
								)}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

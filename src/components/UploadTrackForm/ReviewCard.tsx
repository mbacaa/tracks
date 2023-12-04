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

interface ReviewCardProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
}

export default function ReviewCard({ form }: ReviewCardProps) {
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
				<CardContent>
					<div className='flex flex-col gap-4'>
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

						{/* Submit */}
						<div className='flex justify-end'>
							<Button type='submit' className={buttonVariants({ size: 'sm' })}>
								Submit
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

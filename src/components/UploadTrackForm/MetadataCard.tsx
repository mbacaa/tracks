'use client'

import { trackMetadataArrays } from '@/config/tracks'
import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
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
import ComboboxFormField from './ComboboxFormField'

interface MetadataCardProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
}

export default function MetadataCard({ form }: MetadataCardProps) {
	return (
		<>
			<Card className='h-full'>
				<CardHeader>
					<CardTitle>Metadata</CardTitle>
					<CardDescription>
						Make it easier for others to discover and understand your music.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 justify-center'>
					{/* Type */}
					<div className='flex flex-col gap-2'>
						<FormLabel>Type</FormLabel>
						<ComboboxFormField
							form={form}
							fieldName={'type' as const}
							items={trackMetadataArrays.trackTypes}
						/>
					</div>

					{/* Genre */}
					<div className='flex flex-col gap-2'>
						<FormLabel>Genre</FormLabel>
						<ComboboxFormField
							form={form}
							fieldName={'genre' as const}
							items={trackMetadataArrays.genres}
						/>
					</div>

					{/* Mood */}
					<div className='flex flex-col gap-2'>
						<FormLabel>Mood</FormLabel>
						<ComboboxFormField
							form={form}
							fieldName={'mood' as const}
							items={trackMetadataArrays.moods}
						/>
					</div>

					{/* Key */}
					<div className='flex flex-col gap-2'>
						<FormLabel>Key</FormLabel>
						<ComboboxFormField
							form={form}
							fieldName={'key' as const}
							items={trackMetadataArrays.keys}
						/>
					</div>

					{/* BPM */}
					<div className='flex flex-col gap-2 w-[200px]'>
						<FormLabel>BPM</FormLabel>
						<FormField
							control={form.control}
							name={'bpm' as const}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='BPM'
											type='number'
											min='0'
											max='100'
											value={field.value <= 300 ? field.value : 300}
											onChange={(e) => {
												const numericValue = parseFloat(e.target.value)
												field.onChange(isNaN(numericValue) ? '' : numericValue)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Price */}
					<div className='flex flex-col gap-2 w-[200px]'>
						<FormLabel>Price</FormLabel>
						<FormField
							control={form.control}
							name={'price' as const}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='Price'
											type='number'
											min='0'
											max='10000'
											value={field.value <= 10000 ? field.value : 10000}
											onChange={(e) => {
												const numericValue = parseFloat(e.target.value)
												const roundedValue = isNaN(numericValue)
													? ''
													: Math.round(numericValue * 100) / 100
												field.onChange(roundedValue)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

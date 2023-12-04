'use client'

import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from 'sonner'
import { FormField, FormItem, FormMessage } from '../ui/form'

interface UploadAudioFieldProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
	className: string
}

export default function UploadAudioField({
	form,
	className,
}: UploadAudioFieldProps) {
	return (
		<>
			<FormField
				control={form.control}
				name={'imageUrl' as const}
				render={({ field }) => (
					<FormItem>
						<UploadDropzone
							className={className}
							endpoint='audioUploader'
							onClientUploadComplete={(res) => {
								toast.success('Audio Upload Completed')
								const audioUrl = res[0].url
								form.setValue('audioUrl', audioUrl)
							}}
							onUploadError={(error: Error) => {
								toast.warning(`ERROR! ${error.message}`)
							}}
							{...field}
						/>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

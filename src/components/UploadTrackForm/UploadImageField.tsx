'use client'

import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from 'sonner'
import { FormField, FormItem, FormMessage } from '../ui/form'

interface UploadImageFieldProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
	className: string
}

export default function UploadImageField({
	form,
	className,
}: UploadImageFieldProps) {
	return (
		<>
			<FormField
				name={'imageUrl' as const}
				render={({ field }) => (
					<FormItem>
						<UploadDropzone
							content={{
								label({ ready }) {
									if (ready && form.getValues().imageUrl != '') {
										return `Change Image File`
									} else {
										return 'Choose Image or Drag and Drop'
									}
								},
							}}
							className={className}
							endpoint='imageUploader'
							onClientUploadComplete={(res) => {
								toast.success('Image Upload Completed')
								const imageUrl = res[0].url
								form.setValue('imageUrl', imageUrl)
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

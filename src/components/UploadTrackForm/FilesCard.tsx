'use client'

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
import { FormLabel } from '../ui/form'
import UploadAudioField from './UploadAudioField'
import UploadImageField from './UploadImageField'

interface FilesCardProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
}

export default function FilesCard({ form }: FilesCardProps) {
	const uploadDropzoneClassName: string =
		'border-muted-foreground pb-16 sm:pb-10 h-64 ut-button:bg-primary ut-button:ut-readying:bg-primary ut-button:ut-uploading:bg-primary ut-button:ut-ready:bg-primary ut-label:text-muted-foreground'

	return (
		<>
			<Card className='flex flex-col h-full'>
				
					<CardHeader>
						<CardTitle>Files</CardTitle>
						<CardDescription>
							Upload your track and cover image.
						</CardDescription>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center flex-1'>
						{/* imageUrl */}
						<div className='flex flex-col'>
							<FormLabel>Image Upload</FormLabel>
							<UploadImageField
								form={form}
								className={uploadDropzoneClassName}
							/>
						</div>
						{/* audioUrl */}
						<div className='flex flex-col'>
							<FormLabel>Audio Upload</FormLabel>
							<UploadAudioField
								form={form}
								className={uploadDropzoneClassName}
							/>
						</div>
					</CardContent>
		
			</Card>
		</>
	)
}

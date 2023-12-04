import { getUserAuth } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async () => {
			const user = await getUserAuth()

			if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

			return { success: true }
		})
		.onUploadComplete(async ({ file }) => {
			return { imageUrl: file.url }
		}),
	audioUploader: f({ audio: { maxFileSize: '4MB' } })
		.middleware(async () => {
			const user = await getUserAuth()

			if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

			return { success: true }
		})
		.onUploadComplete(async ({ file }) => {
			return { audioUrl: file.url }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

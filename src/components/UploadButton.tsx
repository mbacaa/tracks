'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Icons } from './Icons'

export default function UploadButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v)
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<Button>
					<Icons.plus className='w-4 h-4 mr-2' />
					Upload new beat
				</Button>
			</DialogTrigger>

			<DialogContent>
				<p>There will be a dropzone for dropping mp3s</p>
			</DialogContent>
		</Dialog>
	)
}

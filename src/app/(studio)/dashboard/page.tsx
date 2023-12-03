import UploadButton from '@/components/UploadButton'

export default async function Dashboard() {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<h2 className='font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl'>
					Your beats
				</h2>
				<UploadButton />
			</div>
		</div>
	)
}

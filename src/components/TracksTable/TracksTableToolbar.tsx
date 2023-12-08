import { Button } from '../ui/button'

export default function TracksTableToolbar() {
	return (
		<div className='flex gap-2'>
			<Button variant='outline' size='sm' className='px-6'>
				Filter
			</Button>
			<Button variant='outline' size='sm' className='px-6'>
				Sort
			</Button>
		</div>
	)
}

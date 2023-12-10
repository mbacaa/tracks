import { TrackWithUsername } from '@/types/tracks'
import { Button } from './ui/button'
import { Icons } from './Icons'

interface AddToCartButtonProps {
	track: Pick<TrackWithUsername, 'id' | 'price'>
}

export default function AddToCartButton({ track }: AddToCartButtonProps) {
	return (
		<Button size='sm' className='text-xs md:w-24'>
			<Icons.cart className='w-4 h-4 md:mr-2' />
			<span className='hidden md:flex'>${track.price}</span>
		</Button>
	)
}

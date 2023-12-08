import { TrackWithUsername } from '@/types/tracks'
import { Button } from './ui/button'
import { Icons } from './Icons'

interface AddToCartButtonProps {
	track: Pick<TrackWithUsername, 'id' | 'price'>
}

export default function AddToCartButton({ track }: AddToCartButtonProps) {
	return (
		<Button size='sm' className='text-xs w-24'>
			<Icons.cart className='w-4 h-4 mr-2' />${track.price}
		</Button>
	)
}

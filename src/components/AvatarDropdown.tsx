'use client'

import { Icons } from './Icons'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import Link from 'next/link'

interface AvatarDropdownProps {
	user: User
}

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const firstNameLetter = user?.name?.charAt(0).toLocaleUpperCase() ?? ''

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='h-8 w-8'>
					<AvatarImage src={user.image!} alt={user.name ?? ''} />
					<AvatarFallback>{firstNameLetter}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-52 font-medium' align='end'>
				<DropdownMenuLabel>
					<div className='flex flex-col space-y-1 p-2'>
						<p className='text-sm font-medium leading-none'>{user.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuLabel className='flex w-full h-full p-2 items-center transition-all hover:bg-muted rounded-md text-sm font-normal'>
					<Link href='/account' className='flex items-center w-full'>
						<Icons.account className='w-4 h-4 mr-2' />
						Account
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuLabel className='flex w-full h-full p-2 items-center transition-all hover:bg-muted rounded-md text-sm font-normal'>
					<Link href='/dashboard' className='flex items-center w-full'>
						<Icons.dashboard className='w-4 h-4 mr-2' />
						Dashboard
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuLabel className='flex w-full h-full p-2 items-center transition-all hover:bg-muted rounded-md text-sm font-normal'>
					<Link href='/billing' className='flex items-center w-full'>
						<Icons.billing className='w-4 h-4 mr-2' />
						Billing
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuLabel>
					<AlertDialog>
						<AlertDialogTrigger className='flex w-full h-full p-2 items-center transition-all hover:bg-muted rounded-md'>
							<Icons.logout className='w-4 h-4 mr-2' />
							Log out
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className='text-center'>
									Are you sure you want to log out?
								</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter className='flex m-auto'>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => {
										setIsLoading(true)
										signOut()
									}}
								>
									{isLoading ? (
										<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
									) : (
										<p>Log out</p>
									)}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

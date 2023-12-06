'use client'

import { userAccountSchema } from '@/lib/validations/userAccount'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from '@/server/auth'
import { Button, buttonVariants } from './ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Icons } from './Icons'

interface UserAccountFormProps {
	user: Pick<User, 'name'>
}

export default function UserAccountForm({ user }: UserAccountFormProps) {
	const router = useRouter()

	const form = useForm<z.infer<typeof userAccountSchema>>({
		resolver: zodResolver(userAccountSchema),
		mode: 'onSubmit',
		defaultValues: {
			name: user.name,
		},
	})

	const { mutate: updateUsername, isLoading } =
		api.users.updateUsername.useMutation({
			onSuccess: () => {
				toast.success('Updated your account successfully!')
				router.refresh()
			},
			onError: (err) => {
				if (err.message.includes('Username already taken')) {
					form.setError('name', { message: 'Username is already taken' })
				} else {
					toast.error(err.message)
				}
			},
		})

	function onSubmit(data: z.infer<typeof userAccountSchema>) {
		updateUsername(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
				<Card>
					<CardHeader>
						<CardTitle>Your (Artist) Name</CardTitle>
						<CardDescription>
							Please enter your display name you are comfortable with. This will
							be visible to other users.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name={'name' as const}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											id='name'
											className='w-[400px]'
											{...form.register('name')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type='submit' className='w-20' disabled={isLoading}>
							{isLoading ? (
								<Icons.loader className='w-4 h-4 animate-spin' />
							) : (
								<span>Update</span>
							)}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}

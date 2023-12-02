'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from './Icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	isLogin?: boolean
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({
	className,
	isLogin,
	...props
}: UserAuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userAuthSchema),
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
	const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)

	async function onSubmit(data: FormData) {
		return toast('This feature is not implemented yet..')
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<div className='flex flex-col space-y-2'>
				<button
					type='button'
					className={cn(buttonVariants({ variant: 'outline' }))}
					onClick={() => {
						setIsGoogleLoading(true)
						signIn('google', { callbackUrl: '/dashboard' })
					}}
					disabled={isLoading || isGitHubLoading || isGoogleLoading}
				>
					{isGoogleLoading ? (
						<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.google className='mr-2 h-4 w-4' />
					)}{' '}
					Google
				</button>
				<button
					type='button'
					className={cn(buttonVariants({ variant: 'outline' }))}
					onClick={() => {
						setIsGitHubLoading(true)
						signIn('github', { callbackUrl: '/dashboard' })
					}}
					disabled={isLoading || isGitHubLoading || isGoogleLoading}
				>
					{isGitHubLoading ? (
						<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.github className='mr-2 h-4 w-4' />
					)}{' '}
					Github
				</button>
			</div>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading || isGitHubLoading || isGoogleLoading}
							{...register('email')}
						/>
						{errors?.email && (
							<p className='px-1 text-xs text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>
					<button className={cn(buttonVariants())} disabled={isLoading}>
						{isLoading && (
							<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
						)}
						{isLogin ? 'Sign In' : 'Sign Up'}
					</button>
				</div>
			</form>
		</div>
	)
}

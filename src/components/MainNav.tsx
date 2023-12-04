'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { MainNavItem } from '@/types/nav'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { siteConfig } from '@/config/site'

interface MainNavProps {
	name?: string
	items?: MainNavItem[]
}

export default function MainNav({ name, items }: MainNavProps) {
	return (
		<div className='hidden gap-6 md:flex'>
			<Link href='/' className='hidden items-center space-x-2 md:flex'>
				<Icons.logo className='h-6 w-6' aria-hidden='true' />
				<span className='hidden text-lg font-bold tracking-tighter lg:inline-block'>
					{name}
				</span>
			</Link>
			<NavigationMenu>
				<NavigationMenuList>
					{items?.[0]?.items ? (
						<NavigationMenuItem>
							<NavigationMenuTrigger className='h-auto'>
								{items[0].title}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
									<li className='row-span-3'>
										<NavigationMenuLink asChild>
											<Link
												href='/'
												className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
											>
												<Icons.logo className='h-6 w-6' aria-hidden='true' />
												<div className='mb-2 mt-4 text-lg font-medium'>
													{siteConfig.name}
												</div>
												<p className='text-sm leading-tight text-muted-foreground'>
													{siteConfig.description}
												</p>
												<span className='sr-only'>Home</span>
											</Link>
										</NavigationMenuLink>
									</li>
									{items[0].items.map((item) => (
										<ListItem
											key={item.title}
											title={item.title}
											href={item.href}
										>
											{item.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					) : null}
					{items
						?.filter((item) => item.title !== items[0]?.title)
						.map((item) =>
							item?.items ? (
								<NavigationMenuItem key={item.title}>
									<NavigationMenuTrigger className='h-auto capitalize'>
										{item.title}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className='flex flex-col md:w-[400px] lg:w-[500px] gap-3 p-4'>
											{item.items.map((item) => (
												<ListItem
													key={item.title}
													title={item.title}
													href={item.href}
												>
													{item.description}
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							) : (
								item.href && (
									<NavigationMenuItem key={item.title}>
										<Link href={item.href} legacyBehavior passHref>
											<NavigationMenuLink
												className={cn(navigationMenuTriggerStyle(), 'h-auto')}
											>
												{item.title}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								)
							)
						)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					ref={ref}
					href={String(href)}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

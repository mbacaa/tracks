'use client'

import Link from 'next/link'

import { MainNavItem } from '@/types/nav'
import { Icons } from '@/components/Icons'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MainNavProps {
	name: string
	items?: MainNavItem[]
}

export default function MobileNav({ name, items }: MainNavProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className='flex gap-6 md:hidden'>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<Icons.menu />
				</SheetTrigger>
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle
							onClick={() => setIsOpen(false)}
							className='flex items-center mb-8'
						>
							<Icons.logo className='h-6 w-6' aria-hidden='true' />
							<span className='ml-2 text-lg font-bold tracking-tighter'>
								{name}
							</span>
						</SheetTitle>
						<SheetDescription>
							<Accordion
								type='multiple'
								defaultValue={items?.map((item) => item.title)}
								className='w-full'
							>
								{items?.map((item, key) =>
									item.items ? (
										<AccordionItem key={key} value={`item-${key}`}>
											<AccordionTrigger className='text-foreground'>
												{item.title}
											</AccordionTrigger>
											<AccordionContent className='flex flex-col gap-2 justify-start'>
												<div className='flex flex-col space-y-2'>
													{item.items?.map((subItem, key) =>
														subItem.href ? (
															<MobileLink
																key={key}
																href={String(subItem.href)}
																setIsOpen={setIsOpen}
																disabled={subItem.disabled}
															>
																{subItem.title}
															</MobileLink>
														) : (
															<div
																key={key}
																className='text-foreground/70 transition-colors'
															>
																{item.title}
															</div>
														)
													)}
												</div>
											</AccordionContent>
										</AccordionItem>
									) : (
										<AccordionItem
											key={key}
											value={`item-${key}`}
											className='flex justify-start'
										>
											<MobileLink
												key={key}
												href={String(item.href)}
												setIsOpen={setIsOpen}
												disabled={item.disabled}
											>
												<div className='text-foreground transition-colors py-4 hover:underline font-medium text-start'>
													{item.title}
												</div>
											</MobileLink>
										</AccordionItem>
									)
								)}
							</Accordion>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}

interface MobileLinkProps extends React.PropsWithChildren {
	href: string
	disabled?: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({ children, href, disabled, setIsOpen }: MobileLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				'w-full text-foreground/70 transition-colors hover:text-foreground text-start',
				disabled && 'pointer-events-none opacity-60'
			)}
			onClick={() => setIsOpen(false)}
		>
			{children}
		</Link>
	)
}

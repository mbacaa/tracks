'use client'

import { cn } from '@/lib/utils'
import { trackUploadSchema } from '@/lib/validations/trackUpload'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Icons } from '../Icons'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ComboboxFormFieldProps {
	form: UseFormReturn<z.infer<typeof trackUploadSchema>>
	fieldName: keyof z.infer<typeof trackUploadSchema>
	items: string[]
}

export default function ComboboxFormField({
	form,
	fieldName,
	items,
}: ComboboxFormFieldProps) {
	return (
		<>
			<FormField
				control={form.control}
				name={fieldName}
				render={({ field }) => (
					<FormItem>
						<Popover modal={true}>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant='outline'
										role='combobox'
										className={cn(
											'w-[200px] justify-between',
											!field.value && 'text-muted-foreground'
										)}
									>
										{field.value
											? items.find((item) => item === field.value)
											: 'Select language'}
										<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent side='bottom' className='w-[200px] p-0'>
								<Command>
									<CommandInput placeholder={`Search ${fieldName}...`} />
									<CommandEmpty>No language found.</CommandEmpty>
									<CommandGroup>
										<ScrollArea className='h-32 whitespace-nowrap'>
											{items.map((item) => (
												<CommandItem
													value={item}
													key={item}
													onSelect={() => {
														form.setValue(fieldName, item)
													}}
												>
													<Icons.check
														className={cn(
															'mr-2 h-4 w-4',
															item === field.value ? 'opacity-100' : 'opacity-0'
														)}
													/>
													{item}
												</CommandItem>
											))}
										</ScrollArea>
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

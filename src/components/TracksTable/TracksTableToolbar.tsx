'use client'

import { sortOptions, trackMetadataArrays } from '@/config/tracks'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Icons } from '../Icons'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '../ui/command'

export default function TracksTableToolbar() {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedMoods, setSelectedMoods] = useState<string[]>([])
	const [selectedSort, setSelectedSort] = useState<string>('')

	const router = useRouter()
	const pathname = usePathname()

	const handleGenreChange = (genre: string) => {
		setSelectedGenres((prevGenres) => {
			if (prevGenres.includes(genre)) {
				return prevGenres.filter((selectedGenre) => selectedGenre !== genre)
			} else {
				return [...prevGenres, genre]
			}
		})
	}

	const handleMoodChange = (mood: string) => {
		setSelectedMoods((prevMoods) => {
			if (prevMoods.includes(mood)) {
				return prevMoods.filter((selectedMood) => selectedMood !== mood)
			} else {
				return [...prevMoods, mood]
			}
		})
	}

	const handleSortChange = (sort: string) => {
		setSelectedSort(sort)
		handleApplyFilters()
	}

	const handleApplyFilters = () => {
		const params = new URLSearchParams()

		if (selectedGenres.length > 0) {
			params.append('genres', selectedGenres.join(','))
		}

		if (selectedMoods.length > 0) {
			params.append('moods', selectedMoods.join(','))
		}

		if (selectedSort !== '') {
			if (params.has('sort')) {
				params.delete('sort')
			}

			params.append('sort', selectedSort)
		}

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}

	return (
		<div className='flex gap-2'>
			<Popover modal={true}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						size={'sm'}
						role='combobox'
						className={cn(
							'w-[200px] justify-between',
							selectedSort === '' ?? 'text-muted-foreground'
						)}
					>
						{selectedSort === ''
							? 'Sort by'
							: sortOptions.find((item) => item.value === selectedSort)?.label}
						<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent side='bottom' className='w-[200px] p-0'>
					<Command>
						<CommandInput placeholder={'Sort by'} />
						<CommandEmpty>No sort option found.</CommandEmpty>
						<CommandGroup>
							<ScrollArea className='h-32 whitespace-nowrap'>
								{sortOptions.map((item, index) => (
									<CommandItem
										value={item.value}
										key={index}
										onSelect={() => {
											handleSortChange(item.value)
										}}
									>
										<Icons.check
											className={cn(
												'mr-2 h-4 w-4',
												item.value === selectedSort
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
										{item.label}
									</CommandItem>
								))}
							</ScrollArea>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='sm' className='px-6'>
						Filters
					</Button>
				</SheetTrigger>
				<SheetContent className='w-50 flex flex-col justify-between'>
					<SheetHeader>
						<SheetTitle className='mb-8'>Filters</SheetTitle>
						<SheetDescription className='flex flex-col gap-2'>
							<Popover modal={true}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										role='combobox'
										className='w-[200px] justify-between'
									>
										Genres
										<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
									</Button>
								</PopoverTrigger>
								<PopoverContent side='bottom' className='w-[200px] p-0'>
									<ScrollArea className='h-36 whitespace-nowrap p-2'>
										{trackMetadataArrays.genres.map((genre) => (
											<div key={genre} className='flex items-center gap-2 my-2'>
												<Checkbox
													name='genres'
													value={genre}
													defaultChecked={selectedGenres.includes(genre)}
													onCheckedChange={() => handleGenreChange(genre)}
													className='text-muted-foreground border-muted-foreground outline:none focus:outline-none'
												/>
												{genre}
											</div>
										))}
										<ScrollBar />
									</ScrollArea>
								</PopoverContent>
							</Popover>

							<Popover modal={true}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										role='combobox'
										className='w-[200px] justify-between'
									>
										Moods
										<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
									</Button>
								</PopoverTrigger>

								<PopoverContent side='bottom' className='w-[200px] p-0'>
									<ScrollArea className='h-36 whitespace-nowrap p-2'>
										{trackMetadataArrays.moods.map((mood) => (
											<div key={mood} className='flex items-center gap-2 my-2'>
												<Checkbox
													name='moods'
													value={mood}
													defaultChecked={selectedMoods.includes(mood)}
													onCheckedChange={() => handleMoodChange(mood)}
													className='text-muted-foreground border-muted-foreground outline:none focus:outline-none'
												/>
												{mood}
											</div>
										))}
										<ScrollBar />
									</ScrollArea>
								</PopoverContent>
							</Popover>
						</SheetDescription>
					</SheetHeader>
					<SheetFooter>
						<Button className='w-[200px] mt-8' onClick={handleApplyFilters}>
							<Icons.filter className='w-4 h-4 mr-2' />
							Apply Filters
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}

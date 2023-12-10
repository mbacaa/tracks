'use client'

import { sortOptions, trackMetadataArrays } from '@/config/tracks'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '../ui/label'

export default function TracksTableToolbar() {
	const [selectedSort, setSelectedSort] = useState<string>('')
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedMoods, setSelectedMoods] = useState<string[]>([])
	const [selectedType, setSelectedType] = useState<string>('')
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])

	const [allFilters, setAllFilters] = useState<string[]>([])
	const [isSortPopoverOpen, setIsSortPopoverOpen] = useState<boolean>(false)
	const [isTypePopoverOpen, setIsTypePopoverOpen] = useState<boolean>(false)

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

	const handleSortChange = async (sort: string) => {
		setSelectedSort(sort)
		setIsSortPopoverOpen(false)
	}

	const handleTypeChange = (type: string) => {
		setSelectedType(type)
		setIsTypePopoverOpen(false)
	}

	const handleKeysChange = (key: string) => {
		setSelectedKeys((prevKeys) => {
			if (prevKeys.includes(key)) {
				return prevKeys.filter((selectedKey) => selectedKey !== key)
			} else {
				return [...prevKeys, key]
			}
		})
	}

	const handleApplyFilters = () => {
		const params = new URLSearchParams()

		if (selectedGenres.length > 0) {
			params.append('genres', selectedGenres.join(','))
		}

		if (selectedMoods.length > 0) {
			params.append('moods', selectedMoods.join(','))
		}

		if (selectedType !== '') {
			params.append('type', selectedType)
		}

		if (selectedKeys.length > 0) {
			params.append('keys', selectedKeys.join(','))
		}

		if (selectedSort !== '') {
			if (params.has('sort')) {
				params.delete('sort')
			}
			params.append('sort', selectedSort)
			setAllFilters([
				...selectedGenres,
				...selectedMoods,
				selectedSort,
				selectedType,
				...selectedKeys,
			])
		}

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}

	useEffect(() => {
		handleApplyFilters()
	}, [selectedSort, selectedGenres, selectedMoods, selectedType, selectedKeys])

	const handleClearFilters = () => {
		setSelectedGenres([])
		setSelectedMoods([])
		setSelectedKeys([])
		setSelectedSort('')
		setSelectedType('')
		setAllFilters([])

		router.push(`${pathname}`, {
			scroll: false,
		})
	}

	return (
		<div className='flex flex-col md:flex-row gap-2'>
			{allFilters.length > 0 && (
				<Button
					onClick={() => handleClearFilters()}
					variant='outline'
					size='sm'
				>
					<Icons.x className='w-4 h-4 mr-2' />
					Clear Filters
				</Button>
			)}
			<Popover
				modal={true}
				open={isSortPopoverOpen}
				onOpenChange={() => setIsSortPopoverOpen(!isSortPopoverOpen)}
			>
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
										onSelect={() => handleSortChange(item.value)}
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
										{selectedGenres.length > 0 ? (
											<Label className='text-muted-foreground'>
												{selectedGenres.length} genres selected
											</Label>
										) : (
											'Genres'
										)}
										<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
									</Button>
								</PopoverTrigger>
								<PopoverContent side='bottom' className='w-[200px] p-0'>
									<ScrollArea className='h-36 whitespace-nowrap p-2'>
										{trackMetadataArrays.genres.map((genre) => (
											<div key={genre} className='flex items-center gap-2'>
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
										{selectedMoods.length > 0 ? (
											<Label className='text-muted-foreground'>
												{selectedMoods.length} moods selected
											</Label>
										) : (
											'Moods'
										)}
										<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
									</Button>
								</PopoverTrigger>

								<PopoverContent side='bottom' className='w-[200px] p-0'>
									<ScrollArea className='h-36 whitespace-nowrap p-2'>
										{trackMetadataArrays.moods.map((mood) => (
											<div key={mood} className='flex items-center gap-2'>
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

							<Popover modal={true}>
								<Popover modal={true}>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											role='combobox'
											className='w-[200px] justify-between'
										>
											{selectedKeys.length > 0 ? (
												<Label className='text-muted-foreground'>
													{selectedKeys.length} keys selected
												</Label>
											) : (
												'Keys'
											)}
											<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
										</Button>
									</PopoverTrigger>

									<PopoverContent side='bottom' className='w-[200px] p-0'>
										<ScrollArea className='h-36 whitespace-nowrap p-2'>
											{trackMetadataArrays.keys.map((key) => (
												<div key={key} className='flex items-center gap-2'>
													<Checkbox
														name='keys'
														value={key}
														defaultChecked={selectedKeys.includes(key)}
														onCheckedChange={() => handleKeysChange(key)}
														className='text-muted-foreground border-muted-foreground outline:none focus:outline-none'
													/>
													{key}
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
											{selectedType !== '' ? <>{selectedType}</> : 'Track type'}
											<Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
										</Button>
									</PopoverTrigger>

									<PopoverContent side='bottom' className='w-[200px] p-0'>
										<ScrollArea className='h-36 whitespace-nowrap p-2'>
											<RadioGroup>
												{trackMetadataArrays.trackTypes.map((item) => (
													<div key={item} className='flex items-center gap-2 '>
														<RadioGroupItem
															value={item}
															onClick={() => handleTypeChange(item)}
															checked={selectedType === item}
															className='text-muted-foreground border-muted-foreground outline:none focus:outline-none'
														/>
														{item}
													</div>
												))}
											</RadioGroup>
											<ScrollBar />
										</ScrollArea>
									</PopoverContent>
								</Popover>
							</Popover>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}

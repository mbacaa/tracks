import { FooterItem, MainNavItem } from '@/types'

const links = {
	github: 'https://github.com/mbacaa/beats',
	githubAccount: 'https://github.com/mbacaa',
}

export const siteConfig = {
	name: 'NextBeats',
	description: 'Your go-to marketplace for beats.',
	links,
	mainNav: [
		{
			title: 'Explore',
			items: [
				{
					title: 'Beats',
					href: '/beats',
					description: 'All the beats you need.',
					items: [],
				},
				{
					title: 'Genres',
					href: '/genres',
					description: 'Pick your favorite genre.',
					items: [],
				},
				{
					title: 'Artists',
					href: '/artists',
					description: 'Find your favorite artist.',
					items: [],
				},
			],
		},
		{
			title: 'Studio',
			items: [
				{
					title: 'Dashboard',
					href: '/dashboard',
					description: 'Start selling your beats.',
					items: [],
				},
				{
					title: 'Pricing',
					href: '/pricing',
					description: 'Choose your pricing plan.',
					items: [],
				},
			],
		},
		{
			title: 'Documentation',
			href: '/docs',
		},
	] satisfies MainNavItem[],
	footerNav: [
		{
			title: 'Credits',
			items: [
				{
					title: 'OneStopShop',
					href: 'https://onestopshop.jackblatch.com',
					external: true,
				},
			],
		},
		{
			title: 'Help',
			items: [
				{
					title: 'About',
					href: '/about',
					external: false,
				},
			],
		},
		{
			title: 'Social',
			items: [
				{
					title: 'GitHub',
					href: links.githubAccount,
					external: true,
				},
			],
		},
	] satisfies FooterItem[],
}

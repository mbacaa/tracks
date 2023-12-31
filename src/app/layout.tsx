import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import { cookies } from 'next/headers'
import './globals.css'
import { cn } from '@/lib/utils'
import { TRPCReactProvider } from '@/trpc/react'
import { ThemeProvider } from '@/components/ThemeProvider'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import { ourFileRouter } from '@/app/api/uploadthing/core'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					GeistSans.className
				)}
			>
				<TRPCReactProvider cookies={cookies().toString()}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
						<Toaster closeButton={true} position='top-center' />
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	)
}

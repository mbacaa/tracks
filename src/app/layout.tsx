import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { cookies } from 'next/headers'

import { TRPCReactProvider } from '@/trpc/react'

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
			<body className={GeistSans.className}>
				<TRPCReactProvider cookies={cookies().toString()}>
					{children}
				</TRPCReactProvider>
			</body>
		</html>
	)
}

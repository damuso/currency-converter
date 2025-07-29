import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import LayoutFooter from '@/components/layout/layout-footer'
import LayoutHeader from '@/components/layout/layout-header'
import ThemeProvider from '@/context/ThemeProvider.tsx'
import QueryProvider from '@/context/QueryProvider.tsx'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Currency Converter',
	description: 'A simple currency converter application'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<QueryProvider>
						<LayoutHeader />

						<main className="bg-background flex-1">
							<div className="containe-xl mx-auto px-4 py-8">
								<div className="mx-auto max-w-4xl">{children}</div>
							</div>
						</main>

						<LayoutFooter />
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

import React from 'react'
import Image from 'next/image'
import ThemeSwitcher from '@/components/theme/theme-switcher'

const LayoutHeader = () => {
	return (
		<header className="bg-primary/95 supports-[backdrop-filter]:bg-primary/85 sticky top-0 z-50 border-b backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center space-x-2">
					<Image
						src="/logo.svg"
						alt="Currency Converter Logo"
						width={32}
						height={32}
					/>
					<span className="text-lg font-semibold text-white">
						Currency converter
					</span>
				</div>

				<ThemeSwitcher />
			</div>
		</header>
	)
}

export default LayoutHeader

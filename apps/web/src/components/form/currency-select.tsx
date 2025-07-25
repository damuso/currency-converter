'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { currencies } from 'country-data-list'
import { getCountryCodeByCurrency } from '@/lib/helpers/currencies'

export interface Currency {
	code: string
	decimals: number
	name: string
	number: string
	symbol?: string
}

const CurrencySelect = () => {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState<Currency | null>(null)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value ? (
						<img
							src={`https://flagcdn.com/h20/${getCountryCodeByCurrency(value.code)?.toLowerCase()}.png`}
							className="h-[16]"
							alt={`${value.code} flag`}
						/>
					) : null}
					{value ? value.code : 'Select currency...'}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
				<Command>
					<CommandInput placeholder="Search currency..." className="h-9" />
					<CommandList>
						<CommandEmpty>No currency found.</CommandEmpty>
						<CommandGroup>
							{currencies.all.map((currency) => (
								<CommandItem
									key={currency.code}
									value={`${currency.code} ${currency.name}`}
									onSelect={() => {
										setValue(currency)
										setOpen(false)
									}}
								>
									{getCountryCodeByCurrency(currency.code) && (
										<img
											src={`https://flagcdn.com/w20/${getCountryCodeByCurrency(currency.code)?.toLowerCase()}.png`}
											className="w-[18]"
											alt={`${currency.code} flag`}
										/>
									)}
									{currency.code} - {currency.name}
									<Check
										className={cn(
											'ml-auto',
											value === currency ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default CurrencySelect

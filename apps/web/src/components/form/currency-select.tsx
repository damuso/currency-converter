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
import { CURRENCY_LIST } from '@currency_converter/shared/constants'
import { getCountryCodeByCurrency } from '@currency_converter/shared/utils'
import { Currency } from '@currency_converter/shared/types'

interface CurrencySelectProps {
	value?: Currency | null
	onChange?: (value: Currency | null) => void
	disabledValues?: Currency[]
}

const CurrencySelect = ({
	value,
	onChange,
	disabledValues = []
}: CurrencySelectProps) => {
	const [open, setOpen] = React.useState(false)

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
				<Command
					filter={(value, search) => {
						if (new RegExp(search, 'i').test(value)) return 1
						return 0
					}}
				>
					<CommandInput placeholder="Search currency..." className="h-9" />
					<CommandList>
						<CommandEmpty>No currency found.</CommandEmpty>
						<CommandGroup>
							{CURRENCY_LIST.map((currency) => (
								<CommandItem
									key={currency.code}
									value={`${currency.code} ${currency.name}`}
									disabled={disabledValues.some(
										(disabledCurrency) =>
											disabledCurrency.code === currency.code
									)}
									onSelect={() => {
										onChange?.(currency)
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

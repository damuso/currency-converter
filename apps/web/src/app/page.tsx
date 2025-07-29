'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IconTransfer } from '@tabler/icons-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import CurrencySelect, { Currency } from '@/components/form/currency-select'
import { NumberInput } from '@/components/form/number-input.tsx'

const formSchema = z.object({
	amount: z.number().min(0, 'Amount must be a positive number'),
	baseCurrency: z
		.object({
			code: z.string(),
			decimals: z.number(),
			name: z.string(),
			number: z.string(),
			symbol: z.string().optional()
		})
		.nullable()
		.refine((value) => value !== null, 'Base currency is required'),
	targetCurrency: z
		.object({
			code: z.string(),
			decimals: z.number(),
			name: z.string(),
			number: z.string(),
			symbol: z.string().optional()
		})
		.nullable()
		.refine((value) => value !== null, 'Target currency is required')
})

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 1.0,
			baseCurrency: null,
			targetCurrency: null
		},
		mode: 'onSubmit'
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<>
			<div className="bg-card text-card-foreground rounded-lg border p-8 shadow-sm">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount to convert</FormLabel>
									<FormControl>
										<NumberInput
											placeholder="Enter amount"
											min={0}
											stepper={0.01}
											decimalScale={4}
											thousandSeparator={' '}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
							<FormField
								control={form.control}
								name="baseCurrency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>From</FormLabel>
										<FormControl>
											<CurrencySelect
												disabledValues={
													form.watch('targetCurrency') !== null
														? ([form.watch('targetCurrency')] as Currency[])
														: []
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="button"
								variant="outline"
								className="mx-auto w-min"
								disabled={
									!form.watch('baseCurrency') || !form.watch('targetCurrency')
								}
								onClick={() => {
									const baseCurrency = form.watch('baseCurrency')
									const targetCurrency = form.watch('targetCurrency')
									if (baseCurrency && targetCurrency) {
										form.setValue('baseCurrency', targetCurrency)
										form.setValue('targetCurrency', baseCurrency)
									}
								}}
							>
								<IconTransfer /> Swap
							</Button>
							<FormField
								control={form.control}
								name="targetCurrency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>To</FormLabel>
										<FormControl>
											<CurrencySelect
												disabledValues={
													form.watch('baseCurrency') !== null
														? ([form.watch('baseCurrency')] as Currency[])
														: []
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Convert
						</Button>
					</form>
				</Form>
				<Separator className="mb-2 mt-4" />
				<div className="mb-4 text-center">
					<h2 className="text-2xl font-semibold">x EUR = y USD</h2>
				</div>
			</div>
		</>
	)
}

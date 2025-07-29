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
import CurrencySelect from '@/components/form/currency-select'
import { NumberInput } from '@/components/form/number-input.tsx'
import { useTRPC } from '@/context/QueryProvider.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConversionResult from '@/components/conversion/conversion-result.tsx'
import {
	Currency,
	currencyConversionFormSchema
} from '@currency_converter/shared'
import { useEffect } from 'react'

export default function ConversionForm() {
	const trpc = useTRPC()
	const queryClient = useQueryClient()
	const { data, isPending, error, mutate, reset } = useMutation(
		trpc.exchangeRate.convertCurrency.mutationOptions({
			onSuccess: () =>
				queryClient.invalidateQueries({
					queryKey: trpc.statistics.getAll.queryKey()
				})
		})
	)
	const form = useForm<z.infer<typeof currencyConversionFormSchema>>({
		resolver: zodResolver(currencyConversionFormSchema),
		defaultValues: {
			amount: 1.0,
			baseCurrency: null,
			targetCurrency: null
		},
		mode: 'onSubmit'
	})

	const onSubmit = async (
		values: z.infer<typeof currencyConversionFormSchema>
	) => {
		if (!values.baseCurrency?.code || !values.targetCurrency?.code) {
			return
		}
		mutate({
			baseCurrency: values.baseCurrency.code,
			targetCurrency: values.targetCurrency.code,
			amount: values.amount
		})
	}

	useEffect(() => {
		reset()
	}, [
		form.watch('amount'),
		form.watch('baseCurrency'),
		form.watch('targetCurrency')
	])

	return (
		<div className="bg-card text-card-foreground flex min-h-[550px] flex-col rounded-lg border p-8 shadow-sm md:min-h-[400px]">
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
										value={field.value}
										onValueChange={field.onChange}
										placeholder="Enter amount"
										min={0}
										stepper={0.01}
										decimalScale={2}
										thousandSeparator={' '}
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
					<Button type="submit" className="w-full" disabled={isPending}>
						Convert
					</Button>
				</form>
			</Form>
			<Separator className="mb-2 mt-4" />
			<div className="grid flex-1 place-content-center">
				<ConversionResult
					isLoading={isPending}
					baseCurrency={form.watch('baseCurrency')}
					targetCurrency={form.watch('targetCurrency')}
					conversionResult={data ?? null}
					error={error?.message}
				/>
			</div>
		</div>
	)
}

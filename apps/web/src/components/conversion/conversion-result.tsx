import React from 'react'
import { Currency } from '@currency_converter/shared/types'
import { z, ZodFlattenedError } from 'zod'
import { currencyConversionOutputSchema } from '@currency_converter/shared'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Badge } from '@/components/ui/badge.tsx'

interface ConversionResultProps {
	isLoading: boolean
	error: ZodFlattenedError<unknown, string> | null | undefined
	baseCurrency: Currency | null
	targetCurrency: Currency | null
	conversionResult: z.infer<typeof currencyConversionOutputSchema> | null
}

const ConversionResult = ({
	isLoading,
	error,
	baseCurrency,
	targetCurrency,
	conversionResult
}: ConversionResultProps) => {
	if (!baseCurrency || !targetCurrency || !conversionResult) {
		return null
	}

	if (isLoading) {
		return (
			<div className="my-4">
				<Skeleton className="h-[20px] w-full rounded-full" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="my-4 text-red-500">
				<pre>{JSON.stringify(error, null, 2)}</pre>
			</div>
		)
	}

	return (
		<div className="my-4 text-center">
			<h2 className="my-2 text-2xl font-semibold">
				{conversionResult.amount} {baseCurrency.code} ={' '}
				{conversionResult.convertedAmount.toFixed(2)} {targetCurrency.code}
			</h2>
			<Badge variant="secondary">
				Rate: 1.00 {baseCurrency.code} ={' '}
				{conversionResult.exchangeRate.toFixed(2)} {targetCurrency.code}
			</Badge>
		</div>
	)
}

export default ConversionResult

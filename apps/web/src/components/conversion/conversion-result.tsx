import React from 'react'
import { Currency } from '@currency_converter/shared/types'
import { z } from 'zod'
import { currencyConversionOutputSchema } from '@currency_converter/shared'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Badge } from '@/components/ui/badge.tsx'

interface ConversionResultProps {
	isLoading: boolean
	error: string | undefined
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
	if (isLoading) {
		return (
			<div className="my-4">
				<Skeleton className="h-[20px] w-full rounded-full" />
			</div>
		)
	}

	if (error) {
		return <p className="text-red-500">Failed to convert: {error}</p>
	}

	if (!baseCurrency || !targetCurrency || !conversionResult) {
		return null
	}

	return (
		<div className="my-4 text-center">
			<h2 className="my-2 text-2xl font-semibold">
				{conversionResult.amount} {baseCurrency.code} ={' '}
				{conversionResult.convertedAmount.toFixed(2)} {targetCurrency.code}
			</h2>
			<Badge variant="secondary">
				1.00 {baseCurrency.code} = {conversionResult.exchangeRate.toFixed(2)}{' '}
				{targetCurrency.code} (
				{new Date(conversionResult.rateDate).toLocaleDateString()})
			</Badge>
		</div>
	)
}

export default ConversionResult

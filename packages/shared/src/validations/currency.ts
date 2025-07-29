import { z } from 'zod'

export const currencyConversionFormSchema = z.object({
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

export const currencyConversionInputSchema = z.object({
	baseCurrency: z.string(),
	targetCurrency: z.string(),
	amount: z.number().min(0, 'Amount must be a positive number')
})

export const currencyConversionOutputSchema = z.object({
	baseCurrency: z.string(),
	targetCurrency: z.string(),
	exchangeRate: z.number(),
	amount: z.number(),
	convertedAmount: z.number(),
	rateDate: z.string()
})

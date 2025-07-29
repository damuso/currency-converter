import { z } from 'zod'

export const statsOutputSchema = z.object({
	topBaseCurrencies: z.array(
		z.object({
			code: z.string(),
			conversions: z.number()
		})
	),
	topTargetCurrencies: z.array(
		z.object({
			code: z.string(),
			conversions: z.number()
		})
	),
	totalConversions: z.number()
})

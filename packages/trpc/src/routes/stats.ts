import { publicProcedure, router } from '../trpc'
import { statsOutputSchema } from '@currency_converter/shared'

export const statisticsRouter = router({
	getAll: publicProcedure.output(statsOutputSchema).query(async ({ ctx }) => {
		const baseConversions = (await ctx.prisma.conversion.groupBy({
			by: ['baseCurrency'],
			_count: {
				baseCurrency: true
			},
			orderBy: {
				_count: {
					baseCurrency: 'desc'
				}
			},
			take: 3
		})) as { baseCurrency: string; _count: { baseCurrency: number } }[]

		const targetConversions = (await ctx.prisma.conversion.groupBy({
			by: ['targetCurrency'],
			_count: {
				targetCurrency: true
			},
			orderBy: {
				_count: {
					targetCurrency: 'desc'
				}
			},
			take: 3
		})) as { targetCurrency: string; _count: { targetCurrency: number } }[]

		const conversionCount = await ctx.prisma.conversion.count()

		return {
			topBaseCurrencies: baseConversions.map((item) => ({
				code: item.baseCurrency,
				conversions: item._count.baseCurrency
			})),
			topTargetCurrencies: targetConversions.map((item) => ({
				code: item.targetCurrency,
				conversions: item._count.targetCurrency
			})),
			totalConversions: conversionCount
		}
	})
})

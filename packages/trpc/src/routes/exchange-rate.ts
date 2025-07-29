import { publicProcedure, router } from '../trpc'
import {
	CURRENCY_LIST,
	currencyConversionInputSchema,
	currencyConversionOutputSchema
} from '@currency_converter/shared'

export const exchangeRateRouter = router({
	convertCurrency: publicProcedure
		.input(currencyConversionInputSchema)
		.output(currencyConversionOutputSchema)
		.mutation(async ({ ctx, input }) => {
			const { baseCurrency, targetCurrency, amount } = input

			if (!baseCurrency || !targetCurrency || !amount) {
				throw new Error(
					'Base currency, target currency, and amount are required'
				)
			}

			const exchangeRate = await ctx.prisma.exchangeRate.findFirst({
				where: {
					baseCurrency,
					targetCurrency
				},
				orderBy: {
					rateDate: 'desc'
				}
			})

			if (!exchangeRate) {
				throw new Error(
					`Exchange rate not found for ${baseCurrency} to ${targetCurrency}`
				)
			}

			const convertedAmount = exchangeRate.rate.times(amount)

			await ctx.prisma.conversion.create({
				data: {
					fromAmount: amount,
					toAmount: convertedAmount,
					exchangeRate: exchangeRate.rate,
					baseCurrency: baseCurrency,
					targetCurrency: targetCurrency
				}
			})

			return {
				baseCurrency,
				targetCurrency,
				amount,
				exchangeRate: exchangeRate.rate.toNumber(),
				convertedAmount: convertedAmount.toNumber(),
				rateDate: exchangeRate.rateDate.toISOString()
			}
		}),
	updateExchangeRates: publicProcedure.query(async ({ ctx }) => {
		const currentDate = new Date()
		const currentDateString = currentDate.toISOString().split('T')[0]

		console.log(`Updating exchange rates for date: ${currentDateString}`)

		await Promise.all(
			CURRENCY_LIST.map(async (currency) => {
				try {
					const response = await fetch(
						`https://${currentDateString}.currency-api.pages.dev/v1/currencies/${currency.code.toLowerCase()}.json`
					)
					if (!response.ok) {
						console.error(
							`Failed to fetch exchange rate for ${currency.code}: ${response.statusText}`
						)
					}
					const data = await response.json()
					for (const [targetCurrency, rate] of Object.entries(
						data[currency.code.toLowerCase()]
					)) {
						if (
							CURRENCY_LIST.findIndex(
								(c) => c.code === targetCurrency.toUpperCase()
							) === -1
						) {
							continue
						}
						if (typeof rate !== 'number') {
							console.warn(
								`Invalid rate for ${currency.code} to ${targetCurrency}: ${rate}`
							)
							continue
						}
						await ctx.prisma.exchangeRate.upsert({
							where: {
								baseCurrency_targetCurrency_rateDate: {
									baseCurrency: currency.code,
									targetCurrency: targetCurrency.toUpperCase(),
									rateDate: currentDate
								}
							},
							create: {
								baseCurrency: currency.code,
								targetCurrency: targetCurrency.toUpperCase(),
								rate: rate as number,
								rateDate: currentDate
							},
							update: {
								rate: rate as number
							}
						})
					}
				} catch (error) {
					console.error(
						`Error updating exchange rate for ${currency.code}:`,
						error
					)
				}
			})
		)

		console.log('Exchange rates updated successfully')

		return { message: 'Exchange rates updated successfully' }
	})
})

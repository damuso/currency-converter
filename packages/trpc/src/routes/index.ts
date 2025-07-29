import { router } from '../trpc'
import { currencyRouter } from './currency'
import { exchangeRateRouter } from './exchange-rate'

export const appRouter = router({
	currency: currencyRouter,
	exchangeRate: exchangeRateRouter
})

export type AppRouter = typeof appRouter

import { publicProcedure, router } from '../trpc'
import { currencyRouter } from './currency'
import { exchangeRateRouter } from './exchange-rate'
import { statisticsRouter } from './stats'

export const appRouter = router({
	health: publicProcedure.query(() => 'ok'),
	currency: currencyRouter,
	exchangeRate: exchangeRateRouter,
	statistics: statisticsRouter
})

export type AppRouter = typeof appRouter

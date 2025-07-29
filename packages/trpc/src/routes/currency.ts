import { publicProcedure, router } from '../trpc'

export const currencyRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		return ctx.prisma.currency.findMany({
			orderBy: {
				name: 'asc'
			}
		})
	})
})

import { initTRPC } from '@trpc/server'
import SuperJson from 'superjson'
import { Context } from './context'
import { ZodError } from 'zod'

export const t = initTRPC.context<Context>().create({
	transformer: SuperJson,
	errorFormatter(opts) {
		const { shape, error } = opts
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null
			}
		}
	}
})

export const router = t.router
export const publicProcedure = t.procedure

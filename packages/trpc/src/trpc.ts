import { initTRPC } from '@trpc/server'
import SuperJson from 'superjson'
import { Context } from './context'

export const t = initTRPC.context<Context>().create({
	transformer: SuperJson
})

export const router = t.router
export const publicProcedure = t.procedure

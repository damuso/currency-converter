import { initTRPC } from '@trpc/server'
import SuperJson from 'superjson'
import { Context } from './context'
import { OpenApiMeta } from 'trpc-to-openapi'

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create({
	transformer: SuperJson
})

export const router = t.router
export const publicProcedure = t.procedure

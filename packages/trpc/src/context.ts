import { prisma } from '@currency_converter/db'
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
	prisma,
	req,
	res
})

export type Context = ReturnType<typeof createContext>

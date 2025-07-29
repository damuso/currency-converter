import { prisma } from '@currency_converter/db'
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export type Context = {
	prisma: typeof prisma
	req: CreateFastifyContextOptions['req']
	res: CreateFastifyContextOptions['res']
}

export const createContext: ({
	req,
	res
}: CreateFastifyContextOptions) => Context = ({
	req,
	res
}: CreateFastifyContextOptions) => ({
	prisma,
	req,
	res
})

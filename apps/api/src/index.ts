import {
	fastifyTRPCPlugin,
	FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { AppRouter, appRouter, createContext } from '@currency_converter/trpc'

const server = fastify({
	maxParamLength: 5000
})
server.register(cors, {
	origin: '*', // TODO: Set this from an environment variable in production
	methods: ['GET', 'POST']
})

server.register(fastifyTRPCPlugin, {
	prefix: '/trpc',
	trpcOptions: {
		router: appRouter,
		createContext,
		onError({ path, error }) {
			console.error(`Error in tRPC handler on path '${path}':`, error)
		}
	} satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions']
})
;(async () => {
	try {
		await server.listen({ port: 5000 })
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
})()

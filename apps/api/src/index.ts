import {
	fastifyTRPCPlugin,
	FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import { AppRouter, appRouter, createContext } from '@currency_converter/trpc'

const server = fastify({
	maxParamLength: 5000
})
server.register(fastifyTRPCPlugin, {
	prefix: '/trpc',
	trpcOptions: {
		router: appRouter,
		createContext,
		onError({ path, error }) {
			// report to error monitoring
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

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
	origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
		await server.listen({
			port: parseInt(process.env.API_PORT || '5000'),
			host: process.env.API_HOST || 'localhost'
		})
		console.log(
			`Server is running at http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT || '5000'}`
		)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
})()

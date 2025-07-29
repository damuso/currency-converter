'use client'

import { FC, ReactNode, useState } from 'react'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import type { AppRouter } from '@currency_converter/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import SuperJson from 'superjson'

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>()

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000
			}
		}
	})
}
let browserQueryClient: QueryClient | undefined = undefined
function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

const QueryProvider: FC<{ children?: ReactNode }> = ({ children }) => {
	const queryClient = getQueryClient()
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: 'http://localhost:5000/trpc',
					transformer: SuperJson
				})
			]
		})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
			</TRPCProvider>
		</QueryClientProvider>
	)
}

export default QueryProvider

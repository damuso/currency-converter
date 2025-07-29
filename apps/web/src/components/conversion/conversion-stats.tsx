'use client'

import React from 'react'
import { useTRPC } from '@/context/QueryProvider.tsx'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { getCountryCodeByCurrency } from '@currency_converter/shared'

const ConversionStatsWrapper = ({
	children
}: {
	children: React.ReactNode
}) => {
	return (
		<div className="bg-card text-card-foreground rounded-lg border p-8 shadow-sm">
			<h2 className="mb-4 text-xl font-semibold">Statistics</h2>
			{children}
		</div>
	)
}

const ConversionStats = () => {
	const trpc = useTRPC()

	const { data, isPending, error } = useQuery(
		trpc.statistics.getAll.queryOptions()
	)

	if (isPending) {
		return (
			<ConversionStatsWrapper>
				<Skeleton className="mb-4 h-6 w-1/2" />
			</ConversionStatsWrapper>
		)
	}

	return (
		<ConversionStatsWrapper>
			{error ? (
				<p className="text-red-500">
					Error loading statistics: {error.message}
				</p>
			) : (
				<>
					<p className="mb-2">
						<b>Total Conversions:</b> {data?.totalConversions}
					</p>
					<div className="flex flex-col flex-wrap gap-4 md:flex-row md:justify-around">
						<div>
							<p className="mb-2">
								<b>Top base currencies:</b>{' '}
							</p>
							<ul className="mb-4 list-outside list-decimal space-y-4 pl-5">
								{data?.topBaseCurrencies.map((currency) => (
									<li key={currency.code}>
										<p className="flex items-center">
											{getCountryCodeByCurrency(currency.code) && (
												<img
													src={`https://flagcdn.com/h20/${getCountryCodeByCurrency(currency.code)?.toLowerCase()}.png`}
													className="mr-2 h-[15px] w-auto"
													alt={`${currency.code} flag`}
												/>
											)}
											{currency.code} ({currency.conversions})
										</p>
									</li>
								))}
							</ul>
						</div>

						<div>
							<p className="mb-2">
								<b>Top target currencies:</b>{' '}
							</p>
							<ul className="mb-4 list-decimal space-y-4 pl-5">
								{data?.topTargetCurrencies.map((currency) => (
									<li key={currency.code}>
										<p className="flex items-center">
											{getCountryCodeByCurrency(currency.code) && (
												<img
													src={`https://flagcdn.com/h20/${getCountryCodeByCurrency(currency.code)?.toLowerCase()}.png`}
													className="mr-2 h-[15px] w-auto"
													alt={`${currency.code} flag`}
												/>
											)}
											{currency.code} ({currency.conversions})
										</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</ConversionStatsWrapper>
	)
}

export default ConversionStats

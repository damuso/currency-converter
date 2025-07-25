'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IconTransfer } from '@tabler/icons-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import CurrencySelect from '@/components/form/currency-select'

const formSchema = z.object({
	amount: z.number().min(0, 'Amount must be a positive number')
})

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 1
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<>
			<div className="bg-card text-card-foreground rounded-lg border p-8 shadow-sm">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount to convert</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter amount"
											{...field}
											onChange={(e) => {
												const value = e.target.value
												field.onChange(value ? parseFloat(value) : 0)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
							<FormItem>
								<FormLabel>From</FormLabel>
								<FormControl>
									<CurrencySelect />
								</FormControl>
								<FormMessage />
							</FormItem>
							<Button type="button" variant="outline" className="mx-auto w-min">
								<IconTransfer /> Swap
							</Button>
							<FormItem>
								<FormLabel>To</FormLabel>
								<FormControl>
									<CurrencySelect />
								</FormControl>
								<FormMessage />
							</FormItem>
						</div>
						<Button type="submit" className="w-full">
							Convert
						</Button>
					</form>
				</Form>
				<Separator className="mb-2 mt-4" />
				<div className="mb-4 text-center">
					<h2 className="text-2xl font-semibold">x EUR = y USD</h2>
				</div>
			</div>
		</>
	)
}

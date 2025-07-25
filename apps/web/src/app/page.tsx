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
import { Label } from '@/components/ui/label'

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
						<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
							<Label>From</Label>
							<Button type="button" variant="outline">
								<IconTransfer /> Swap
							</Button>
							<Label>To</Label>
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

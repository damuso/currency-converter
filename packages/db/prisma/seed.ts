import { PrismaClient } from '../index'
import { CURRENCY_LIST } from '@currency_converter/shared/constants'

const prisma = new PrismaClient({})
async function main() {
	console.log('Seeding currencies...')
	await Promise.all(
		CURRENCY_LIST.map((currency) =>
			prisma.currency.upsert({
				where: {
					code: currency.code
				},
				update: {},
				create: {
					code: currency.code,
					name: currency.name,
					symbol: currency.symbol,
					decimalPlaces: currency.decimals ?? 2
				}
			})
		)
	)
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

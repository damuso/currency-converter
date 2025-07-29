import ConversionForm from '@/components/conversion/conversion-form.tsx'
import ConversionStats from '@/components/conversion/conversion-stats.tsx'

export default function Home() {
	return (
		<div className="space-y-4">
			<ConversionForm />
			<ConversionStats />
		</div>
	)
}

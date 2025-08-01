import { ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

export interface NumberInputProps
	extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
	stepper?: number
	thousandSeparator?: string
	placeholder?: string
	defaultValue?: number
	min?: number
	max?: number
	value?: number
	suffix?: string
	prefix?: string
	onValueChange?: (value: number | undefined) => void
	fixedDecimalScale?: boolean
	decimalScale?: number
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			stepper,
			thousandSeparator,
			placeholder,
			defaultValue,
			min = -Infinity,
			max = Infinity,
			onValueChange,
			fixedDecimalScale = false,
			decimalScale = 0,
			suffix,
			prefix,
			value: controlledValue,
			...props
		},
		ref
	) => {
		const internalRef = useRef<HTMLInputElement>(null) // Create an internal ref

		const combinedRef = ref || internalRef // Use provided ref or internal ref

		const [value, setValue] = useState<number | undefined>(
			controlledValue ?? defaultValue
		)

		const handleIncrement = useCallback(() => {
			setValue((prev) =>
				prev === undefined
					? (stepper ?? 1)
					: Math.min(prev + (stepper ?? 1), max)
			)
		}, [stepper, max])

		const handleDecrement = useCallback(() => {
			setValue((prev) =>
				prev === undefined
					? -(stepper ?? 1)
					: Math.max(prev - (stepper ?? 1), min)
			)
		}, [stepper, min])

		useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (
					document.activeElement ===
					(combinedRef as React.RefObject<HTMLInputElement>).current
				) {
					if (e.key === 'ArrowUp') {
						handleIncrement()
					} else if (e.key === 'ArrowDown') {
						handleDecrement()
					}
				}
			}

			window.addEventListener('keydown', handleKeyDown)

			return () => {
				window.removeEventListener('keydown', handleKeyDown)
			}
		}, [handleIncrement, handleDecrement, combinedRef])

		useEffect(() => {
			if (controlledValue !== undefined) {
				setValue(controlledValue)
			}
		}, [controlledValue])

		const handleChange = (values: {
			value: string
			floatValue: number | undefined
		}) => {
			const newValue =
				values.floatValue === undefined ? undefined : values.floatValue
			setValue(newValue)
			if (onValueChange) {
				onValueChange(newValue)
			}
		}

		const handleBlur = () => {
			if (value !== undefined) {
				if (value < min) {
					setValue(min)
					;(ref as React.RefObject<HTMLInputElement>).current!.value =
						String(min)
				} else if (value > max) {
					setValue(max)
					;(ref as React.RefObject<HTMLInputElement>).current!.value =
						String(max)
				}
			}
		}

		return (
			<div className="flex items-center">
				<NumericFormat
					value={value}
					onValueChange={handleChange}
					thousandSeparator={thousandSeparator}
					decimalScale={decimalScale}
					fixedDecimalScale={fixedDecimalScale}
					allowNegative={min < 0}
					valueIsNumericString
					onBlur={handleBlur}
					max={max}
					min={min}
					suffix={suffix}
					prefix={prefix}
					customInput={Input}
					placeholder={placeholder}
					className="relative rounded-r-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					getInputRef={combinedRef} // Use combined ref
					{...props}
				/>

				<div className="flex flex-col">
					<Button
						aria-label="Increase value"
						className="border-input h-4 rounded-l-none rounded-br-none border-b-[0.5px] border-l-0 px-2 focus-visible:relative"
						variant="outline"
						onClick={handleIncrement}
						disabled={value === max}
						type="button"
					>
						<ChevronUp size={15} />
					</Button>
					<Button
						aria-label="Decrease value"
						className="border-input h-4 rounded-l-none rounded-tr-none border-l-0 border-t-[0.5px] px-2 focus-visible:relative"
						variant="outline"
						onClick={handleDecrement}
						disabled={value === min}
						type="button"
					>
						<ChevronDown size={15} />
					</Button>
				</div>
			</div>
		)
	}
)

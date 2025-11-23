"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value)

    React.useEffect(() => {
      setInternalValue(value)
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [Number(e.target.value)]
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    const percentage = ((internalValue[0] - min) / (max - min)) * 100

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          className="absolute w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          min={min}
          max={max}
          step={step}
          value={internalValue[0]}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

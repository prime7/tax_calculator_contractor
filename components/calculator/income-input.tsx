"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign } from "lucide-react"

interface IncomeInputProps {
  value: number
  onChange: (value: number) => void
  label?: string
  id?: string
  min?: number
  max?: number
  helpText?: string
}

export function IncomeInput({
  value,
  onChange,
  label = "Annual Contract Income",
  id = "income",
  min = 0,
  max = 10000000,
  helpText,
}: IncomeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "")
    const numValue = Number.parseInt(rawValue, 10) || 0
    onChange(Math.min(Math.max(numValue, min), max))
  }

  const displayValue = value > 0 ? value.toLocaleString("en-CA") : ""

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {label && (
        <Label htmlFor={id} className="text-xs sm:text-sm font-medium text-foreground">
          {label}
        </Label>
      )}
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          inputMode="numeric"
          id={id}
          value={displayValue}
          onChange={handleChange}
          placeholder="0"
          className="pl-9 h-11 sm:h-10 text-base sm:text-lg font-medium"
        />
      </div>
      {helpText && <p className="text-[11px] sm:text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
}

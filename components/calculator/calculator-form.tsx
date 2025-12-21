"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IncomeInput } from "./income-input"
import { ProvinceSelector } from "./province-selector"
import { Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface CalculatorFormProps {
  income: number
  province: string
  deductions: number
  onIncomeChange: (value: number) => void
  onProvinceChange: (value: string) => void
  onDeductionsChange: (value: number) => void
  onCalculate: () => void
  isCalculating?: boolean
}

export function CalculatorForm({
  income,
  province,
  deductions,
  onIncomeChange,
  onProvinceChange,
  onDeductionsChange,
  onCalculate,
  isCalculating = false,
}: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const canCalculate = income > 0 && province !== ""

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Income Details
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">Enter your annual contract income and province</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        <IncomeInput value={income} onChange={onIncomeChange} helpText="Gross annual contract income" />

        <ProvinceSelector value={province} onChange={onProvinceChange} />

        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            <span>Advanced Options</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 sm:pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Personal Deductions</span>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center"
                        aria-label="More information about deductions"
                      >
                        <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs" side="top">
                      <p className="text-xs sm:text-sm">
                        RRSP contributions and other deductions. Leave at $0 for default 15%.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <IncomeInput
                value={deductions}
                onChange={onDeductionsChange}
                label=""
                id="deductions"
                helpText="RRSP, business expenses, etc."
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          onClick={onCalculate}
          disabled={!canCalculate || isCalculating}
          className="w-full h-11 sm:h-12 text-sm sm:text-base"
          size="lg"
        >
          {isCalculating ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Tax Comparison
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

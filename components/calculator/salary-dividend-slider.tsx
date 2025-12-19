"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { formatCurrency } from "@/lib/tax-calculation"
import { Sliders, Zap } from "lucide-react"

interface SalaryDividendSliderProps {
  salary: number
  maxSalary: number
  optimalSalary: number
  dividends: number
  onSalaryChange: (value: number) => void
}

export function SalaryDividendSlider({
  salary,
  maxSalary,
  optimalSalary,
  dividends,
  onSalaryChange,
}: SalaryDividendSliderProps) {
  const salaryPercentage = maxSalary > 0 ? (salary / maxSalary) * 100 : 0
  const isOptimal = Math.abs(salary - optimalSalary) < 5000

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Sliders className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500" />
            <span className="truncate">Salary / Dividend Split</span>
          </CardTitle>
          {isOptimal && (
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 text-xs shrink-0">
              <Zap className="h-3 w-3 mr-1" />
              Optimal
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1 text-xs sm:text-sm">
          Adjust how you pay yourself from your corporation
          <InfoTooltip content="Salary creates RRSP room and CPP benefits, while dividends are taxed at preferential rates." />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">All Salary</span>
            <span className="text-muted-foreground">All Dividends</span>
          </div>

          <div className="relative py-2">
            <Slider
              value={[salary]}
              max={maxSalary}
              step={1000}
              onValueChange={(value) => onSalaryChange(value[0])}
              className="w-full touch-pan-y"
            />
            {/* Optimal marker */}
            {optimalSalary > 0 && optimalSalary < maxSalary && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-teal-500 pointer-events-none"
                style={{ left: `${(optimalSalary / maxSalary) * 100}%` }}
              >
                <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="outline" className="text-[10px] sm:text-xs bg-background px-1 sm:px-2">
                    Optimal
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-muted-foreground">$0</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">{formatCurrency(maxSalary)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="rounded-lg bg-blue-50 p-2 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-blue-600 uppercase tracking-wide mb-0.5 sm:mb-1">Salary</p>
            <p className="text-base sm:text-xl font-bold text-blue-700">{formatCurrency(salary)}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
              {salaryPercentage.toFixed(0)}%
            </p>
          </div>
          <div className="rounded-lg bg-teal-50 p-2 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-teal-600 uppercase tracking-wide mb-0.5 sm:mb-1">Dividends</p>
            <p className="text-base sm:text-xl font-bold text-teal-700">{formatCurrency(dividends)}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
              {(100 - salaryPercentage).toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 hidden sm:block">
          <p>
            <strong>Tip:</strong> The optimal salary is typically between $60,000-$75,000 to maximize CPP benefits and
            RRSP room while keeping taxes low.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

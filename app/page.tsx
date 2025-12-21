"use client"

import { useState, useCallback, useEffect } from "react"
import { CalculatorForm } from "@/components/calculator/calculator-form"
import { ResultsSection } from "@/components/results/results-selection"
import { SalaryDividendSlider } from "@/components/calculator/salary-dividend-slider"
import { TaxBreakdownChart } from "@/components/charts/tax-breakdown-chart"
import { ComparisonChart } from "@/components/charts/comparison-chart"
import { Disclaimer } from "@/components/disclaimer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComparisonResult } from "@/lib/types"
import { compareStrategies, findOptimalSalary } from "@/lib/tax-calculation"
import { LucideLeaf as MapleLeaf } from "lucide-react"

export default function TaxCalculatorPage() {
  // Input state
  const [income, setIncome] = useState(100000)
  const [province, setProvince] = useState("ON")
  const [deductions, setDeductions] = useState(0)
  const [salaryAmount, setSalaryAmount] = useState(65000)

  // Results state
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [optimalSalary, setOptimalSalary] = useState(65000)
  const [isCalculating, setIsCalculating] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  // Calculate results
  const handleCalculate = useCallback(() => {
    if (income <= 0 || !province) return

    setIsCalculating(true)

    // Small delay for UI feedback
    setTimeout(() => {
      try {
        // Find optimal salary
        const optimal = findOptimalSalary(income, province, deductions)
        setOptimalSalary(optimal)
        setSalaryAmount(optimal)

        // Calculate comparison with optimal salary
        const comparison = compareStrategies({
          income,
          province,
          deductions,
          salaryAmount: optimal,
        })

        setResult(comparison)
        setHasCalculated(true)
      } catch (error) {
        console.error("Calculation error:", error)
      } finally {
        setIsCalculating(false)
      }
    }, 300)
  }, [income, province, deductions])

  // Recalculate when salary slider changes
  useEffect(() => {
    if (!hasCalculated || !province) return

    const comparison = compareStrategies({
      income,
      province,
      deductions,
      salaryAmount,
    })

    setResult(comparison)
  }, [salaryAmount, hasCalculated, income, province, deductions])

  // Calculate max salary (net business income)
  const maxSalary = Math.max(0, income - (deductions > 0 ? deductions : income * 0.1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-600 text-white shrink-0">
              <MapleLeaf className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-foreground truncate">
                Canadian Contractor Tax Calculator
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Compare sole proprietorship vs. incorporation tax strategies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8">
          {/* Disclaimer at top */}
          <Disclaimer />

          <div className="grid gap-4 sm:gap-8 lg:grid-cols-[400px_1fr]">
            {/* Left Column - Input Form */}
            <div className="space-y-4 sm:space-y-6">
              <CalculatorForm
                income={income}
                province={province}
                deductions={deductions}
                onIncomeChange={setIncome}
                onProvinceChange={setProvince}
                onDeductionsChange={setDeductions}
                onCalculate={handleCalculate}
                isCalculating={isCalculating}
              />

              {income > 0 && (
                <Card className="hidden lg:block">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Quick Reference</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Annual Income</p>
                        <p className="font-semibold">
                          {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(income)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly</p>
                        <p className="font-semibold">
                          {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(income / 12)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-4 sm:space-y-6">
              {!hasCalculated ? (
                <Card className="min-h-[250px] sm:min-h-[400px] border-dashed bg-muted/20">
                  <CardContent className="flex flex-col items-center justify-center text-center p-4 sm:p-8 h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
                    <MapleLeaf className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                    <CardTitle className="text-base sm:text-lg mb-2">Ready to Calculate</CardTitle>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Enter your annual contract income and select your province, then click &quot;Calculate Tax
                    Comparison&quot; to see a detailed breakdown.
                  </p>
                </div>
              ) : result ? (
                <>
                  <ResultsSection
                    result={result}
                    province={province}
                    salarySlider={
                      <SalaryDividendSlider
                        salary={salaryAmount}
                        maxSalary={maxSalary}
                        optimalSalary={optimalSalary}
                        dividends={result.corporation.dividendsPaid}
                        onSalaryChange={setSalaryAmount}
                      />
                    }
                  />

                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    <TaxBreakdownChart result={result} type="sole-proprietorship" />
                    <TaxBreakdownChart result={result} type="corporation" />
                  </div>

                  <ComparisonChart result={result} />
                </>
              ) : null}
            </div>
          </div>

          <footer className="border-t border-border/50 pt-4 sm:pt-8 mt-4 sm:mt-8">
            <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
              <p>Tax rates are based on 2024 Canadian federal and provincial rates.</p>
              <p className="hidden sm:block">
                This calculator assumes small business corporate tax rates and eligible dividends.
                <br />
                For personalized advice, consult a licensed CPA or tax professional.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

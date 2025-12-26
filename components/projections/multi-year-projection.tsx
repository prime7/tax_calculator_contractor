"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, TrendingUp, Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { formatCurrency } from "@/lib/tax-calculation"
import { calculateMultiYearProjection } from "@/lib/projection-engine"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"

interface MultiYearProjectionProps {
  baseIncome: number
  province: string
  baseDeductions: number
  onProjectionChange?: (projection: any) => void
}

export function MultiYearProjection({
  baseIncome,
  province,
  baseDeductions,
  onProjectionChange
}: MultiYearProjectionProps) {
  const [assumptions, setAssumptions] = useState({
    incomeGrowthRate: 5.0,
    inflationRate: 2.0,
    includeRRSPGrowth: true,
    includeCorpGrowth: true,
    years: 5
  })
  
  const [projection, setProjection] = useState<any>(null)
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculateProjection = async () => {
    setIsCalculating(true)
    
    try {
      const result = calculateMultiYearProjection(
        baseIncome,
        province,
        baseDeductions,
        assumptions
      )
      
      setProjection(result)
      onProjectionChange?.(result)
    } catch (error) {
      console.error("Error calculating projection:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const chartData = projection?.yearlyProjections.map((year: any) => ({
    year: `Year ${year.year}`,
    income: year.grossIncome,
    solePropTax: year.soleProprietorship.totalTax,
    corpTax: year.corporation.totalTax,
    savings: year.cumulativeTaxSavings,
    rrspBalance: year.rrspBalance || 0,
    corpEarnings: year.corpRetainedEarnings || 0
  })) || []

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Multi-Year Tax Projections
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Project your tax savings over multiple years with growth assumptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        {/* Assumptions Panel */}
        <Collapsible open={showAssumptions} onOpenChange={setShowAssumptions}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            <span>Projection Assumptions</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAssumptions ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 sm:pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="growth-rate">Income Growth Rate (%)</Label>
                <Input
                  id="growth-rate"
                  type="number"
                  step="0.1"
                  value={assumptions.incomeGrowthRate}
                  onChange={(e) => setAssumptions(prev => ({ 
                    ...prev, 
                    incomeGrowthRate: parseFloat(e.target.value) || 0 
                  }))}
                  helpText="Expected annual income growth"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projection-years">Projection Years</Label>
                <Select 
                  value={assumptions.years.toString()} 
                  onValueChange={(value) => setAssumptions(prev => ({ 
                    ...prev, 
                    years: parseInt(value) 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="include-rrsp">Include RRSP Growth</Label>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex items-center justify-center">
                          <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs" side="top">
                        <p className="text-xs">Include estimated 6% annual investment growth in RRSP contributions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select 
                  value={assumptions.includeRRSPGrowth.toString()} 
                  onValueChange={(value) => setAssumptions(prev => ({ 
                    ...prev, 
                    includeRRSPGrowth: value === "true" 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="include-corp-growth">Include Corporate Growth</Label>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex items-center justify-center">
                          <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs" side="top">
                        <p className="text-xs">Include estimated 5% annual investment growth on retained earnings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select 
                  value={assumptions.includeCorpGrowth.toString()} 
                  onValueChange={(value) => setAssumptions(prev => ({ 
                    ...prev, 
                    includeCorpGrowth: value === "true" 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculateProjection}
          disabled={isCalculating}
          className="w-full h-11 sm:h-12 text-sm sm:text-base"
          size="lg"
        >
          {isCalculating ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Calculating Projections...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Multi-Year Projections
            </>
          )}
        </Button>

        {/* Results */}
        {projection && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Cumulative Savings</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(projection.totalCumulativeSavings)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Break-Even Year</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {projection.breakEvenYear}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Annual Growth Rate</div>
                  <div className="text-2xl font-bold">
                    {assumptions.incomeGrowthRate}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tax Savings Over Time</CardTitle>
                <CardDescription>
                  Cumulative tax savings from incorporation vs. sole proprietorship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <RechartsTooltip 
                        formatter={(value: any) => formatCurrency(value)}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Cumulative Savings"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Income"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Year-by-Year Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Year-by-Year Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projection.yearlyProjections.map((yearData: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Year {yearData.year}</h4>
                        <div className="text-sm text-muted-foreground">
                          Income: {formatCurrency(yearData.grossIncome)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Sole Prop Tax</div>
                          <div className="font-medium">{formatCurrency(yearData.soleProprietorship.totalTax)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Corp Tax</div>
                          <div className="font-medium">{formatCurrency(yearData.corporation.totalTax)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Annual Savings</div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(yearData.soleProprietorship.totalTax - yearData.corporation.totalTax)}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Cumulative</div>
                          <div className="font-medium text-blue-600">
                            {formatCurrency(yearData.cumulativeTaxSavings)}
                          </div>
                        </div>
                      </div>
                      
                      {assumptions.includeRRSPGrowth && yearData.rrspBalance && (
                        <div className="text-sm text-muted-foreground">
                          RRSP Balance: {formatCurrency(yearData.rrspBalance)}
                        </div>
                      )}
                      
                      {assumptions.includeCorpGrowth && yearData.corpRetainedEarnings && (
                        <div className="text-sm text-muted-foreground">
                          Retained Earnings: {formatCurrency(yearData.corpRetainedEarnings)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Recommendation</h4>
                    <p className="text-sm text-muted-foreground">{projection.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
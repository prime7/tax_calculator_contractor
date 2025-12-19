"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CorporationResult } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/tax-calculation"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Building2 } from "lucide-react"

interface CorporationCardProps {
  result: CorporationResult
}

export function CorporationCard({ result }: CorporationCardProps) {
  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500" />
            Corporation
          </CardTitle>
          <Badge variant="secondary" className="font-mono text-[10px] sm:text-xs shrink-0">
            {formatPercentage(result.effectiveRate)} eff.
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">CCPC Structure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <span className="text-xs sm:text-sm text-muted-foreground">Gross Income</span>
            <span className="text-sm sm:text-base font-medium">{formatCurrency(result.grossIncome)}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Salary</span>
              <InfoTooltip content="Salary paid from your corporation" />
            </div>
            <span className="text-sm sm:text-base font-medium">{formatCurrency(result.salary)}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Dividends</span>
              <InfoTooltip content="Eligible dividends from after-tax income" />
            </div>
            <span className="text-sm sm:text-base font-medium">{formatCurrency(result.dividendsPaid)}</span>
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2 rounded-lg bg-destructive/5 p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-medium text-destructive">Tax Breakdown</h4>

          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Corp Tax</span>
                <InfoTooltip content="Small business corporate tax rate" />
              </div>
              <span className="text-destructive">{formatCurrency(result.corporateTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Personal (Salary)</span>
              <span className="text-destructive">{formatCurrency(result.personalTaxOnSalary)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Dividend Tax</span>
                <InfoTooltip content="After gross-up and credits" />
              </div>
              <span className="text-destructive">{formatCurrency(result.personalTaxOnDividends)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1 sm:pt-2">
          <div className="flex items-center justify-between border-t border-border pt-2 sm:pt-3">
            <span className="text-sm font-semibold text-destructive">Total Tax</span>
            <span className="text-base sm:text-lg font-bold text-destructive">{formatCurrency(result.totalTax)}</span>
          </div>

          <div className="flex items-center justify-between bg-primary/5 rounded-lg p-2 sm:p-3">
            <span className="text-sm font-semibold text-primary">Net Income</span>
            <span className="text-lg sm:text-xl font-bold text-primary">{formatCurrency(result.netIncome)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm pt-1 sm:pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">RRSP Room</span>
            <InfoTooltip content="Only salary creates RRSP room" />
          </div>
          <span className="font-medium text-green-600">{formatCurrency(result.rrspRoom)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SoleProprietorshipResult } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/tax-calculation"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { User } from "lucide-react"

interface SoleProprietorshipCardProps {
  result: SoleProprietorshipResult
}

export function SoleProprietorshipCard({ result }: SoleProprietorshipCardProps) {
  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            Sole Proprietorship
          </CardTitle>
          <Badge variant="secondary" className="font-mono text-[10px] sm:text-xs shrink-0">
            {formatPercentage(result.effectiveRate)} eff.
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">Self-employed individual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <span className="text-xs sm:text-sm text-muted-foreground">Gross Income</span>
            <span className="text-sm sm:text-base font-medium">{formatCurrency(result.grossIncome)}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Deductions</span>
              <InfoTooltip content="Business expenses like home office, vehicle, equipment, professional development (15% default)" />
            </div>
            <span className="text-sm sm:text-base font-medium text-muted-foreground">
              -{formatCurrency(result.businessDeductions)}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-border/50">
            <span className="text-xs sm:text-sm text-muted-foreground">Net Business</span>
            <span className="text-sm sm:text-base font-medium">{formatCurrency(result.netBusinessIncome)}</span>
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2 rounded-lg bg-destructive/5 p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-medium text-destructive">Tax Breakdown</h4>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Federal Tax</span>
              <span className="text-destructive">{formatCurrency(result.federalTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provincial Tax</span>
              <span className="text-destructive">{formatCurrency(result.provincialTax)}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">CPP</span>
                <InfoTooltip content="Self-employed pay both employee (5.95%) and employer (5.95%) portions. Max $7,735/year." />
              </div>
              <span className="text-destructive">{formatCurrency(result.cppContributions)}</span>
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
            <InfoTooltip content="18% of earned income, max $31,560. Use this room to reduce next year's taxes." />
          </div>
          <span className="font-medium text-green-600">{formatCurrency(result.rrspRoom)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

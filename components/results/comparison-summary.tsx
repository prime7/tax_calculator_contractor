"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ComparisonResult } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/tax-calculation"
import { TrendingUp, TrendingDown, Minus, CheckCircle2 } from "lucide-react"

interface ComparisonSummaryProps {
  result: ComparisonResult
}

export function ComparisonSummary({ result }: ComparisonSummaryProps) {
  const { recommendation, taxSavings, savingsPercentage } = result

  const getRecommendationContent = () => {
    switch (recommendation) {
      case "corporation":
        return {
          icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
          title: "Corporation Recommended",
          description: `Incorporating could save you ${formatCurrency(taxSavings)} annually (${formatPercentage(savingsPercentage)} less tax)`,
          color: "text-teal-600",
          bgColor: "bg-teal-50",
          borderColor: "border-teal-200",
        }
      case "sole-proprietorship":
        return {
          icon: <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6" />,
          title: "Sole Proprietorship Recommended",
          description: `Staying unincorporated saves you ${formatCurrency(Math.abs(taxSavings))} annually`,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        }
      default:
        return {
          icon: <Minus className="h-5 w-5 sm:h-6 sm:w-6" />,
          title: "Similar Tax Outcomes",
          description: "Both strategies result in similar tax obligations. Consider other factors.",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        }
    }
  }

  const content = getRecommendationContent()

  return (
    <Card className={`${content.bgColor} ${content.borderColor} border-2`}>
      <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className={`${content.color} p-2 sm:p-3 rounded-full bg-background/80`}>{content.icon}</div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className={`text-lg sm:text-xl font-bold ${content.color}`}>{content.title}</h3>
            <p className="text-sm text-muted-foreground max-w-md">{content.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-md pt-2 sm:pt-4">
            <div className="rounded-lg bg-background/80 p-2 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-0.5 sm:mb-1">
                Sole Prop Net
              </p>
              <p className="text-sm sm:text-lg font-bold">{formatCurrency(result.soleProprietorship.netIncome)}</p>
            </div>
            <div className="rounded-lg bg-background/80 p-2 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-0.5 sm:mb-1">
                Corp Net
              </p>
              <p className="text-sm sm:text-lg font-bold">{formatCurrency(result.corporation.netIncome)}</p>
            </div>
          </div>

          {recommendation !== "similar" && (
            <Badge variant="outline" className={`${content.color} border-current text-xs sm:text-sm`}>
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Annual Savings: {formatCurrency(Math.abs(taxSavings))}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { InstallmentSchedule } from "@/lib/types"
import { formatCurrency } from "@/lib/tax-calculation"

interface InstallmentScheduleCardProps {
  schedule: InstallmentSchedule
}

export function InstallmentScheduleCard({ schedule }: InstallmentScheduleCardProps) {
  if (!schedule.requiresInstallments) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Quarterly Tax Installments
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            You are not required to pay quarterly installments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 sm:p-4 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
            <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
              <strong>Good news!</strong> Your estimated tax owing ({formatCurrency(schedule.annualTaxOwing)}) is below the $3,000 threshold, so you can pay your taxes in full when you file your return.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Quarterly Tax Installments
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-xs sm:text-sm">
                  CRA requires quarterly installments if your net tax owing exceeds $3,000 this year AND exceeded $3,000 in either of the previous 2 years.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs sm:text-sm">
          Based on {formatCurrency(schedule.annualTaxOwing)} annual tax owing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 sm:p-4 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            <strong>Installments Required:</strong> Your tax owing exceeds $3,000. You must make quarterly payments to avoid interest charges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {schedule.quarterlyPayments.map((quarter) => (
            <div
              key={quarter.quarter}
              className="p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Q{quarter.quarter}
                </span>
                <span className="text-xs text-muted-foreground">Due: {quarter.dueDate}</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-foreground">
                  {formatCurrency(quarter.totalPayment)}
                </div>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div>Federal: {formatCurrency(quarter.federalTax)}</div>
                  <div>Provincial: {formatCurrency(quarter.provincialTax)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-muted border border-border">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-medium text-foreground">
              Total Annual Tax Owing
            </span>
            <span className="text-base sm:text-lg font-bold text-foreground">
              {formatCurrency(schedule.annualTaxOwing)}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>
            <strong>Note:</strong> These are estimated installment amounts. Actual requirements may vary based on your previous year's tax owing. Consult CRA or a tax professional for personalized advice.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

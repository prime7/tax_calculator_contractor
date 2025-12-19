"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { ComparisonResult } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/tax-calculation"
import { ChevronDown, FileText } from "lucide-react"
import { useState } from "react"
import { getProvinceByCode } from "@/lib/tax-data"

interface DetailedBreakdownProps {
  result: ComparisonResult
  province: string
}

export function DetailedBreakdown({ result, province }: DetailedBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const provinceData = getProvinceByCode(province)

  const { soleProprietorship: sole, corporation: corp } = result

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-border/50">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <span>Detailed Breakdown</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 sm:space-y-6 px-3 sm:px-6">
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <table className="w-full text-xs sm:text-sm min-w-[320px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 sm:py-3 font-medium text-muted-foreground pl-3 sm:pl-0">Item</th>
                    <th className="text-right py-2 sm:py-3 font-medium text-blue-600">Sole Prop</th>
                    <th className="text-right py-2 sm:py-3 font-medium text-teal-600 pr-3 sm:pr-0">Corp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Gross Income</td>
                    <td className="text-right py-1.5 sm:py-2">{formatCurrency(sole.grossIncome)}</td>
                    <td className="text-right py-1.5 sm:py-2 pr-3 sm:pr-0">{formatCurrency(corp.grossIncome)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Deductions</td>
                    <td className="text-right py-1.5 sm:py-2">-{formatCurrency(sole.businessDeductions)}</td>
                    <td className="text-right py-1.5 sm:py-2 pr-3 sm:pr-0">
                      -{formatCurrency(sole.businessDeductions)}
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="py-1.5 sm:py-2 font-medium pl-3 sm:pl-0">Net Business</td>
                    <td className="text-right py-1.5 sm:py-2 font-medium">{formatCurrency(sole.netBusinessIncome)}</td>
                    <td className="text-right py-1.5 sm:py-2 font-medium pr-3 sm:pr-0">
                      {formatCurrency(sole.netBusinessIncome)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 text-muted-foreground pl-3 sm:pl-0">— Salary</td>
                    <td className="text-right py-1.5 sm:py-2">N/A</td>
                    <td className="text-right py-1.5 sm:py-2 pr-3 sm:pr-0">{formatCurrency(corp.salary)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 text-muted-foreground pl-3 sm:pl-0">— Dividends</td>
                    <td className="text-right py-1.5 sm:py-2">N/A</td>
                    <td className="text-right py-1.5 sm:py-2 pr-3 sm:pr-0">{formatCurrency(corp.dividendsPaid)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Federal Tax</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive">{formatCurrency(sole.federalTax)}</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.personalTaxOnSalary * 0.6)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Provincial Tax</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive">{formatCurrency(sole.provincialTax)}</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.personalTaxOnSalary * 0.4)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Corporate Tax</td>
                    <td className="text-right py-1.5 sm:py-2">N/A</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.corporateTax)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Dividend Tax</td>
                    <td className="text-right py-1.5 sm:py-2">N/A</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.personalTaxOnDividends)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">CPP</td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive">
                      {formatCurrency(sole.cppContributions)}
                    </td>
                    <td className="text-right py-1.5 sm:py-2 text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.employerCpp * 2)}
                    </td>
                  </tr>
                  <tr className="bg-destructive/5">
                    <td className="py-1.5 sm:py-2 font-semibold text-destructive pl-3 sm:pl-0">Total Tax</td>
                    <td className="text-right py-1.5 sm:py-2 font-bold text-destructive">
                      {formatCurrency(sole.totalTax)}
                    </td>
                    <td className="text-right py-1.5 sm:py-2 font-bold text-destructive pr-3 sm:pr-0">
                      {formatCurrency(corp.totalTax)}
                    </td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="py-2 sm:py-3 font-semibold text-primary pl-3 sm:pl-0">Net Income</td>
                    <td className="text-right py-2 sm:py-3 font-bold text-primary">{formatCurrency(sole.netIncome)}</td>
                    <td className="text-right py-2 sm:py-3 font-bold text-primary pr-3 sm:pr-0">
                      {formatCurrency(corp.netIncome)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 pl-3 sm:pl-0">Effective Rate</td>
                    <td className="text-right py-1.5 sm:py-2">{formatPercentage(sole.effectiveRate)}</td>
                    <td className="text-right py-1.5 sm:py-2 pr-3 sm:pr-0">{formatPercentage(corp.effectiveRate)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 text-green-600 pl-3 sm:pl-0">RRSP Room</td>
                    <td className="text-right py-1.5 sm:py-2 text-green-600">{formatCurrency(sole.rrspRoom)}</td>
                    <td className="text-right py-1.5 sm:py-2 text-green-600 pr-3 sm:pr-0">
                      {formatCurrency(corp.rrspRoom)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Province Info */}
            {provinceData && (
              <div className="rounded-lg bg-muted/30 p-3 sm:p-4 space-y-2">
                <h4 className="text-sm font-medium">Province: {provinceData.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Corp Rate:</span>{" "}
                    <span className="font-medium">{formatPercentage(provinceData.combinedCorpRate * 100)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dividend Credit:</span>{" "}
                    <span className="font-medium">{formatPercentage(provinceData.dividendTaxCredit * 100)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

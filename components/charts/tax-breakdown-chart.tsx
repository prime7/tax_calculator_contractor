"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { ComparisonResult, SoleProprietorshipResult } from "@/lib/types"
import { formatCurrency } from "@/lib/tax-calculation"
import { PieChartIcon } from "lucide-react"

interface TaxBreakdownChartProps {
  result: ComparisonResult
  type: "sole-proprietorship" | "corporation"
}

export function TaxBreakdownChart({ result, type }: TaxBreakdownChartProps) {
  const isSole = type === "sole-proprietorship"
  const data = isSole ? result.soleProprietorship : result.corporation

  const chartData = isSole
    ? [
        { name: "Federal", value: (data as SoleProprietorshipResult).federalTax, color: "#ef4444" },
        { name: "Provincial", value: (data as SoleProprietorshipResult).provincialTax, color: "#f97316" },
        { name: "CPP", value: (data as SoleProprietorshipResult).cppContributions, color: "#eab308" },
        { name: "Net", value: data.netIncome, color: "#22c55e" },
      ]
    : [
        { name: "Corp Tax", value: result.corporation.corporateTax, color: "#ef4444" },
        { name: "Personal", value: result.corporation.personalTaxOnSalary, color: "#f97316" },
        { name: "Dividend", value: result.corporation.personalTaxOnDividends, color: "#eab308" },
        { name: "Net", value: result.corporation.netIncome, color: "#22c55e" },
      ]

  // Filter out zero values
  const filteredData = chartData.filter((item) => item.value > 0)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          {isSole ? "Sole Prop" : "Corporation"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[200px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : 'N/A'}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-[10px] sm:text-xs text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

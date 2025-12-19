"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { ComparisonResult } from "@/lib/types"
import { formatCurrency } from "@/lib/tax-calculation"
import { BarChart3 } from "lucide-react"

interface ComparisonChartProps {
  result: ComparisonResult
}

export function ComparisonChart({ result }: ComparisonChartProps) {
  const data = [
    {
      name: "Total Tax",
      "Sole Prop": result.soleProprietorship.totalTax,
      Corporation: result.corporation.totalTax,
    },
    {
      name: "Net Income",
      "Sole Prop": result.soleProprietorship.netIncome,
      Corporation: result.corporation.netIncome,
    },
    {
      name: "RRSP Room",
      "Sole Prop": result.soleProprietorship.rrspRoom,
      Corporation: result.corporation.rrspRoom,
    },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[220px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 10 }}
              />
              <YAxis dataKey="name" type="category" width={55} tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : 'N/A'}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="Sole Prop" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Corporation" fill="#14b8a6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2 sm:mt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-blue-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Sole Prop</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-teal-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Corporation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

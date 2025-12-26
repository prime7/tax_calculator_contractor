"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import type { DetailedDeductions } from "@/lib/types"

interface DetailedDeductionsProps {
  deductions: DetailedDeductions
  onChange: (deductions: DetailedDeductions) => void
}

export function DetailedDeductionsForm({ deductions, onChange }: DetailedDeductionsProps) {
  const updateDeduction = (key: keyof DetailedDeductions, value: string) => {
    const numValue = parseFloat(value) || 0
    onChange({ ...deductions, [key]: numValue })
  }

  const total = Object.values(deductions).reduce((sum, val) => sum + val, 0)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Business Deductions
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center"
                  aria-label="More information about business deductions"
                >
                  <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  Common business expenses that can reduce your taxable income.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label htmlFor="homeOffice" className="text-sm">Home Office Expenses</Label>
            <Input
              id="homeOffice"
              type="number"
              value={deductions.homeOffice || ""}
              onChange={(e) => updateDeduction("homeOffice", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="vehicle" className="text-sm">Vehicle Expenses</Label>
            <Input
              id="vehicle"
              type="number"
              value={deductions.vehicle || ""}
              onChange={(e) => updateDeduction("vehicle", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="supplies" className="text-sm">Office Supplies & Equipment</Label>
            <Input
              id="supplies"
              type="number"
              value={deductions.supplies || ""}
              onChange={(e) => updateDeduction("supplies", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="professionalFees" className="text-sm">Professional Fees</Label>
            <Input
              id="professionalFees"
              type="number"
              value={deductions.professionalFees || ""}
              onChange={(e) => updateDeduction("professionalFees", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="advertising" className="text-sm">Advertising & Marketing</Label>
            <Input
              id="advertising"
              type="number"
              value={deductions.advertising || ""}
              onChange={(e) => updateDeduction("advertising", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="insurance" className="text-sm">Insurance</Label>
            <Input
              id="insurance"
              type="number"
              value={deductions.insurance || ""}
              onChange={(e) => updateDeduction("insurance", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="other" className="text-sm">Other Expenses</Label>
            <Input
              id="other"
              type="number"
              value={deductions.other || ""}
              onChange={(e) => updateDeduction("other", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Total Deductions:</span>
            <span className="font-semibold">
              {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
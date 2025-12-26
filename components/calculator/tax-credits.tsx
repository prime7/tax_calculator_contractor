"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import type { TaxCredits } from "@/lib/types"

interface TaxCreditsProps {
  credits: TaxCredits
  onChange: (credits: TaxCredits) => void
}

export function TaxCreditsForm({ credits, onChange }: TaxCreditsProps) {
  const updateCredit = (key: keyof TaxCredits, value: string) => {
    const numValue = parseFloat(value) || 0
    onChange({ ...credits, [key]: numValue })
  }

  const total = Object.values(credits).reduce((sum, val) => sum + val, 0)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Tax Credits
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center"
                  aria-label="More information about tax credits"
                >
                  <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  Tax credits reduce your tax payable dollar for dollar.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label htmlFor="medical" className="text-sm">Medical Expenses</Label>
            <Input
              id="medical"
              type="number"
              value={credits.medical || ""}
              onChange={(e) => updateCredit("medical", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="charitable" className="text-sm">Charitable Donations</Label>
            <Input
              id="charitable"
              type="number"
              value={credits.charitable || ""}
              onChange={(e) => updateCredit("charitable", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="education" className="text-sm">Education & Training</Label>
            <Input
              id="education"
              type="number"
              value={credits.education || ""}
              onChange={(e) => updateCredit("education", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="otherCredits" className="text-sm">Other Credits</Label>
            <Input
              id="otherCredits"
              type="number"
              value={credits.other || ""}
              onChange={(e) => updateCredit("other", e.target.value)}
              placeholder="0"
              className="h-9"
            />
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Total Credits:</span>
            <span className="font-semibold">
              {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
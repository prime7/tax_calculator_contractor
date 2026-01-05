"use client"

import { Info } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EI_2026 } from "@/lib/tax-data/ei-2026"

interface EIOptionsProps {
  enrolled: boolean
  onChange: (enrolled: boolean) => void
  province: string
}

export function EIOptions({ enrolled, onChange, province }: EIOptionsProps) {
  const isQuebec = province === "QC"
  const rate = isQuebec ? EI_2026.employeePremiumRateQC : EI_2026.employeePremiumRate
  const maxPremium = isQuebec ? EI_2026.maxEmployeePremiumQC : EI_2026.maxEmployeePremium

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-medium text-foreground">
          Employment Insurance (EI)
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="font-semibold">Self-Employed EI (Optional)</p>
                <p>
                  Self-employed individuals can voluntarily enroll in EI for special benefits:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Maternity benefits</li>
                  <li>Parental benefits</li>
                  <li>Sickness benefits</li>
                  <li>Compassionate care benefits</li>
                  <li>Family caregiver benefits</li>
                </ul>
                <p className="text-muted-foreground text-xs mt-2">
                  <strong>Note:</strong> Self-employed EI does NOT cover regular EI (job loss).
                  You pay employee rate only ({(rate * 100).toFixed(2)}%), up to ${maxPremium.toFixed(2)} annually.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="ei-enrollment"
          checked={enrolled}
          onCheckedChange={(checked) => onChange(checked === true)}
        />
        <Label
          htmlFor="ei-enrollment"
          className="text-xs sm:text-sm font-normal cursor-pointer"
        >
          Enroll in EI for special benefits (self-employed only)
        </Label>
      </div>

      {enrolled && (
        <div className="mt-2 p-2 sm:p-3 rounded-md bg-muted/50 border border-border text-xs sm:text-sm">
          <p className="text-muted-foreground">
            <strong>Rate:</strong> {(rate * 100).toFixed(2)}%{" "}
            {isQuebec && <span className="text-xs">(Quebec QPIP)</span>}
            <br />
            <strong>Max Annual Premium:</strong> ${maxPremium.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  )
}

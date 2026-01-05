"use client"

import { Info, TrendingUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MultiYearOptionsProps {
  enabled: boolean
  years: number
  incomeGrowthRate: number
  rrspContributionRate: number
  investmentGrowthRate: number
  onEnabledChange: (enabled: boolean) => void
  onYearsChange: (years: number) => void
  onIncomeGrowthRateChange: (rate: number) => void
  onRRSPContributionRateChange: (rate: number) => void
  onInvestmentGrowthRateChange: (rate: number) => void
}

export function MultiYearOptions({
  enabled,
  years,
  incomeGrowthRate,
  rrspContributionRate,
  investmentGrowthRate,
  onEnabledChange,
  onYearsChange,
  onIncomeGrowthRateChange,
  onRRSPContributionRateChange,
  onInvestmentGrowthRateChange,
}: MultiYearOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <span className="text-xs sm:text-sm font-medium text-foreground">Multi-Year Planning</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="font-semibold">Long-Term Tax Planning</p>
                <p>
                  Project your tax situation over multiple years, including retained earnings growth,
                  RRSP accumulation, and income changes.
                </p>
                <p className="text-muted-foreground text-xs">
                  Useful for understanding long-term tax strategies and incorporation benefits.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="multi-year-enabled"
          checked={enabled}
          onCheckedChange={(checked) => onEnabledChange(checked === true)}
        />
        <Label htmlFor="multi-year-enabled" className="text-xs sm:text-sm font-normal cursor-pointer">
          Enable multi-year projection (corporations only)
        </Label>
      </div>

      {enabled && (
        <div className="space-y-4 p-3 sm:p-4 rounded-lg border border-border bg-muted/30">
          {/* Years to Project */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs sm:text-sm">Years to Project</Label>
              <span className="text-xs sm:text-sm font-semibold text-primary">{years} years</span>
            </div>
            <Slider
              value={[years]}
              onValueChange={(value) => onYearsChange(value[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Income Growth Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Label className="text-xs sm:text-sm">Income Growth</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Expected annual increase in contract income</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary">
                {(incomeGrowthRate * 100).toFixed(1)}% / year
              </span>
            </div>
            <Slider
              value={[incomeGrowthRate * 100]}
              onValueChange={(value) => onIncomeGrowthRateChange(value[0] / 100)}
              min={0}
              max={10}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* RRSP Contribution Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Label className="text-xs sm:text-sm">RRSP Contributions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Percentage of available RRSP room to contribute annually</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary">
                {(rrspContributionRate * 100).toFixed(0)}% of room
              </span>
            </div>
            <Slider
              value={[rrspContributionRate * 100]}
              onValueChange={(value) => onRRSPContributionRateChange(value[0] / 100)}
              min={0}
              max={100}
              step={10}
              className="w-full"
            />
          </div>

          {/* Investment Growth Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Label className="text-xs sm:text-sm">Investment Growth</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Expected annual growth rate on retained earnings invested inside corporation
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary">
                {(investmentGrowthRate * 100).toFixed(1)}% / year
              </span>
            </div>
            <Slider
              value={[investmentGrowthRate * 100]}
              onValueChange={(value) => onInvestmentGrowthRateChange(value[0] / 100)}
              min={0}
              max={15}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}

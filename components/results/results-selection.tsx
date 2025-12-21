"use client"

import type React from "react"

import type { ComparisonResult } from "@/lib/types"
import { SoleProprietorshipCard } from "./sole-proprietorship-card"
import { CorporationCard } from "./corporation-card"
import { ComparisonSummary } from "./comparison-summary"
import { DetailedBreakdown } from "./detailed-breakdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface ResultsSectionProps {
  result: ComparisonResult
  province: string
  salarySlider?: React.ReactNode
}

export function ResultsSection({ result, province, salarySlider }: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Recommendation Summary */}
      <ComparisonSummary result={result} />

      <Separator />

      {/* Salary/Dividend Slider */}
      {salarySlider && <div>{salarySlider}</div>}

      <Separator />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Side-by-side comparison cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <SoleProprietorshipCard result={result.soleProprietorship} />
            <CorporationCard result={result.corporation} />
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {/* Detailed Breakdown */}
          <DetailedBreakdown result={result} province={province} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import type React from "react"

import type { ComparisonResult } from "@/lib/types"
import { SoleProprietorshipCard } from "./sole-proprietorship-card"
import { CorporationCard } from "./corporation-card"
import { ComparisonSummary } from "./comparison-summary"
import { DetailedBreakdown } from "./detailed-breakdown"

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

      {/* Salary/Dividend Slider */}
      {salarySlider && <div>{salarySlider}</div>}

      {/* Side-by-side comparison cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <SoleProprietorshipCard result={result.soleProprietorship} />
        <CorporationCard result={result.corporation} />
      </div>

      {/* Detailed Breakdown */}
      <DetailedBreakdown result={result} province={province} />
    </div>
  )
}

import type {
  ProjectionAssumptions,
  YearlyProjection,
  MultiYearProjection,
  SoleProprietorshipResult,
  CorporationResult
} from "./enhanced-types"
import { 
  calculateSoleProprietorship, 
  calculateCorporation, 
  findOptimalSalary,
  formatCurrency 
} from "./tax-calculation"

// Constants for projection calculations
const RRSP_GROWTH_RATE = 0.06 // Assume 6% annual investment growth
const CORPORATE_INVESTMENT_RATE = 0.05 // Assume 5% return on retained earnings

/**
 * Calculate multi-year tax projections
 */
export function calculateMultiYearProjection(
  baseIncome: number,
  provinceCode: string,
  baseDeductions: number,
  assumptions: ProjectionAssumptions
): MultiYearProjection {
  const yearlyProjections: YearlyProjection[] = []
  let cumulativeSavings = 0
  let breakEvenYear = 1
  
  for (let year = 1; year <= assumptions.years; year++) {
    // Calculate projected income with growth
    const projectedIncome = baseIncome * Math.pow(1 + assumptions.incomeGrowthRate / 100, year - 1)
    
    // Apply inflation to deductions (maintain same percentage)
    const projectedDeductions = projectedIncome * (baseDeductions / baseIncome)
    
    // Calculate optimal salary for this year
    const optimalSalary = findOptimalSalary(projectedIncome, provinceCode, projectedDeductions)
    
    // Calculate both scenarios
    const soleProp = calculateSoleProprietorship(projectedIncome, provinceCode, projectedDeductions)
    const corporation = calculateCorporation(projectedIncome, provinceCode, optimalSalary, projectedDeductions)
    
    // Calculate year-over-year savings
    const yearlySavings = soleProp.totalTax - corporation.totalTax
    cumulativeSavings += yearlySavings
    
    // Track break-even year (first year with positive cumulative savings)
    if (breakEvenYear === 1 && cumulativeSavings > 0) {
      breakEvenYear = year
    }
    
    // Calculate RRSP balance if enabled
    let rrspBalance: number | undefined
    if (assumptions.includeRRSPGrowth) {
      // Estimate RRSP contributions based on salary
      const estimatedRRSP = Math.min(
        corporation.salary * 0.18, // 18% of salary
        31560 // 2024 RRSP limit
      )
      rrspBalance = estimatedRRSP * Math.pow(1 + RRSP_GROWTH_RATE, year - 1)
    }
    
    // Calculate corporate retained earnings if enabled
    let corpRetainedEarnings: number | undefined
    if (assumptions.includeCorpGrowth) {
      // Estimate retained earnings (after-tax corporate income not paid as dividends)
      const estimatedRetained = corporation.afterTaxCorporateIncome - corporation.dividendsPaid
      corpRetainedEarnings = estimatedRetained * Math.pow(1 + CORPORATE_INVESTMENT_RATE, year - 1)
    }
    
    yearlyProjections.push({
      year,
      grossIncome: projectedIncome,
      soleProprietorship: soleProp,
      corporation: corporation,
      cumulativeTaxSavings: cumulativeSavings,
      rrspBalance,
      corpRetainedEarnings
    })
  }
  
  // Generate recommendation
  const totalCumulativeSavings = yearlyProjections[yearlyProjections.length - 1]?.cumulativeTaxSavings || 0
  const recommendation = generateProjectionRecommendation(totalCumulativeSavings, breakEvenYear, assumptions.years)
  
  return {
    assumptions,
    yearlyProjections,
    totalCumulativeSavings,
    breakEvenYear,
    recommendation
  }
}

/**
 * Generate recommendation based on projection results
 */
function generateProjectionRecommendation(
  totalSavings: number,
  breakEvenYear: number,
  projectionYears: number
): string {
  if (totalSavings <= 0) {
    return "Based on the projections, incorporation does not provide significant tax savings over the projected period. Consider maintaining sole proprietorship status."
  }
  
  if (breakEvenYear <= 2) {
    return `Incorporation shows strong tax advantages with break-even in year ${breakEvenYear} and total projected savings of ${formatCurrency(totalSavings)} over ${projectionYears} years. This suggests incorporation is financially beneficial.`
  }
  
  if (breakEvenYear <= 5) {
    return `Incorporation becomes profitable in year ${breakEvenYear} with total projected savings of ${formatCurrency(totalSavings)} over ${projectionYears} years. Consider incorporation if you can retain earnings in the corporation.`
  }
  
  return `Incorporation shows long-term benefits with total projected savings of ${formatCurrency(totalSavings)} over ${projectionYears} years, but break-even occurs in year ${breakEvenYear}. Consider your specific circumstances and ability to retain corporate earnings.`
}

/**
 * Calculate break-even analysis for incorporation decision
 */
export function calculateBreakEvenAnalysis(
  baseIncome: number,
  provinceCode: string,
  baseDeductions: number
): {
  breakEvenIncome: number
  recommendedAction: string
  reasoning: string
} {
  // Test different income levels to find break-even point
  let testIncome = baseIncome
  let solePropResult: SoleProprietorshipResult
  let corpResult: CorporationResult
  let iterations = 0
  const maxIterations = 100
  
  // Binary search for break-even point
  let low = 10000 // Minimum test income
  let high = 500000 // Maximum test income
  
  while (iterations < maxIterations && high - low > 1000) {
    const mid = (low + high) / 2
    const testDeductions = mid * (baseDeductions / baseIncome)
    const optimalSalary = findOptimalSalary(mid, provinceCode, testDeductions)
    
    solePropResult = calculateSoleProprietorship(mid, provinceCode, testDeductions)
    corpResult = calculateCorporation(mid, provinceCode, optimalSalary, testDeductions)
    
    const savings = solePropResult.totalTax - corpResult.totalTax
    
    if (savings > 0) {
      // Corporation saves money, try lower income
      high = mid
    } else {
      // Sole prop saves money, try higher income
      low = mid
    }
    
    iterations++
  }
  
  const breakEvenIncome = Math.round((low + high) / 2)
  
  let recommendedAction: string
  let reasoning: string
  
  if (baseIncome >= breakEvenIncome) {
    recommendedAction = "Incorporate"
    reasoning = `Your income of ${formatCurrency(baseIncome)} exceeds the break-even point of ${formatCurrency(breakEvenIncome)}. Incorporation will likely save you money in taxes.`
  } else {
    recommendedAction = "Stay Sole Proprietor"
    reasoning = `Your income of ${formatCurrency(baseIncome)} is below the break-even point of ${formatCurrency(breakEvenIncome)}. The costs and complexity of incorporation may outweigh the tax benefits at your income level.`
  }
  
  return {
    breakEvenIncome,
    recommendedAction,
    reasoning
  }
}

/**
 * Compare different growth scenarios
 */
export function compareGrowthScenarios(
  baseIncome: number,
  provinceCode: string,
  baseDeductions: number,
  growthRates: number[]
): {
  scenarios: Array<{
    growthRate: number
    totalSavings: number
    recommendation: string
  }>
  optimalGrowthRate: number
} {
  const scenarios = growthRates.map(growthRate => {
    const assumptions: ProjectionAssumptions = {
      incomeGrowthRate: growthRate,
      inflationRate: 2.0,
      includeRRSPGrowth: true,
      includeCorpGrowth: true,
      years: 5
    }
    
    const projection = calculateMultiYearProjection(baseIncome, provinceCode, baseDeductions, assumptions)
    
    return {
      growthRate,
      totalSavings: projection.totalCumulativeSavings,
      recommendation: projection.recommendation
    }
  })
  
  // Find optimal growth rate (highest savings)
  const optimalScenario = scenarios.reduce((best, current) => 
    current.totalSavings > best.totalSavings ? current : best
  )
  
  return {
    scenarios,
    optimalGrowthRate: optimalScenario.growthRate
  }
}

/**
 * Calculate the impact of different incorporation timing
 */
export function calculateTimingImpact(
  baseIncome: number,
  provinceCode: string,
  baseDeductions: number,
  delayYears: number[]
): {
  scenarios: Array<{
    delayYears: number
    totalCost: number
    opportunityCost: number
    recommendation: string
  }>
} {
  const scenarios = delayYears.map(delay => {
    const assumptions: ProjectionAssumptions = {
      incomeGrowthRate: 5.0, // Assume 5% annual growth
      inflationRate: 2.0,
      includeRRSPGrowth: true,
      includeCorpGrowth: true,
      years: 10
    }
    
    // Calculate immediate incorporation benefits
    const immediateProjection = calculateMultiYearProjection(baseIncome, provinceCode, baseDeductions, assumptions)
    
    // Calculate delayed incorporation benefits
    const delayedIncome = baseIncome * Math.pow(1.05, delay) // 5% growth during delay
    const delayedProjection = calculateMultiYearProjection(delayedIncome, provinceCode, baseDeductions, assumptions)
    
    // Calculate opportunity cost (lost savings during delay)
    const opportunityCost = immediateProjection.totalCumulativeSavings - delayedProjection.totalCumulativeSavings
    
    // Calculate additional cost of delay (taxes paid during delay years)
    let additionalTaxesPaid = 0
    for (let year = 1; year <= delay; year++) {
      const incomeThisYear = baseIncome * Math.pow(1.05, year - 1)
      const deductionsThisYear = incomeThisYear * (baseDeductions / baseIncome)
      const soleProp = calculateSoleProprietorship(incomeThisYear, provinceCode, deductionsThisYear)
      const optimalSalary = findOptimalSalary(incomeThisYear, provinceCode, deductionsThisYear)
      const corp = calculateCorporation(incomeThisYear, provinceCode, optimalSalary, deductionsThisYear)
      
      // Extra taxes paid by not incorporating
      additionalTaxesPaid += (soleProp.totalTax - corp.totalTax)
    }
    
    const totalCost = opportunityCost + additionalTaxesPaid
    
    let recommendation: string
    if (delay === 0) {
      recommendation = "Immediate incorporation recommended to maximize tax savings."
    } else if (totalCost > 10000) {
      recommendation = `Delay of ${delay} years results in significant opportunity cost of ${formatCurrency(totalCost)}. Consider earlier incorporation.`
    } else {
      recommendation = `Delay of ${delay} years has manageable cost of ${formatCurrency(totalCost)}. Consider your current business needs.`
    }
    
    return {
      delayYears: delay,
      totalCost,
      opportunityCost,
      recommendation
    }
  })
  
  return { scenarios }
}
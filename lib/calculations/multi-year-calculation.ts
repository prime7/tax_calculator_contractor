import type { MultiYearPlan, YearlyResult, RetainedEarningsAnalysis } from "../types"
import { calculateCorporation } from "../tax-calculation"

/**
 * Calculate multi-year corporation tax projections with retained earnings
 *
 * Projects tax results over multiple years, tracking:
 * - Year-over-year income growth
 * - Cumulative retained earnings with investment growth
 * - RRSP contributions and accumulation
 * - Total tax paid and average effective rate
 *
 * @param startingIncome - Initial annual income
 * @param provinceCode - Province code
 * @param salaryAmount - Annual salary to pay owner
 * @param deductions - Business deductions
 * @param years - Number of years to project (1-10)
 * @param incomeGrowthRate - Annual income growth rate (default 3%)
 * @param rrspContributionRate - Percentage of RRSP room to contribute (default 10%)
 * @param investmentGrowthRate - Annual investment growth rate inside corp (default 5%)
 * @returns Multi-year projection with cumulative results
 */
export function calculateMultiYearPlan(
  startingIncome: number,
  provinceCode: string,
  salaryAmount: number,
  deductions: number,
  years: number = 5,
  incomeGrowthRate: number = 0.03,
  rrspContributionRate: number = 0.1,
  investmentGrowthRate: number = 0.05,
): MultiYearPlan {
  const startYear = 2026
  const yearlyResults: YearlyResult[] = []

  let cumulativeRetained = 0
  let cumulativeRRSP = 0
  let totalNetIncome = 0
  let totalTaxPaid = 0

  for (let i = 0; i < years; i++) {
    const year = startYear + i

    // Apply income growth
    const income = startingIncome * Math.pow(1 + incomeGrowthRate, i)

    // Calculate corporation results for this year
    const result = calculateCorporation(income, provinceCode, salaryAmount, deductions)

    // RRSP contribution (percentage of available room)
    const rrspContribution = result.rrspRoom * rrspContributionRate

    // Investment growth on existing retained earnings
    cumulativeRetained = cumulativeRetained * (1 + investmentGrowthRate)

    // Add this year's retained earnings
    const retainedThisYear = result.retainedInCorp
    cumulativeRetained += retainedThisYear

    // Accumulate RRSP
    cumulativeRRSP += rrspContribution

    // Accumulate totals
    totalNetIncome += result.netIncome
    totalTaxPaid += result.totalTax

    yearlyResults.push({
      year,
      grossIncome: income,
      totalTax: result.totalTax,
      netIncome: result.netIncome,
      retainedInCorp: retainedThisYear,
      cumulativeRetained,
      rrspContribution,
      cumulativeRRSP,
    })
  }

  const averageEffectiveRate =
    totalNetIncome > 0 ? (totalTaxPaid / (totalNetIncome + totalTaxPaid)) * 100 : 0

  return {
    startYear,
    years,
    yearlyResults,
    totalNetIncome,
    totalTaxPaid,
    averageEffectiveRate,
    finalRetainedEarnings: cumulativeRetained,
    finalRRSPValue: cumulativeRRSP,
  }
}

/**
 * Analyze retained earnings tax implications
 *
 * Shows the tax deferral benefit of keeping money in a corporation
 * vs withdrawing it immediately as salary/dividends.
 *
 * Key insights:
 * - Corporate tax already paid on retained earnings
 * - Projected investment growth inside corporation
 * - Tax owing on eventual withdrawal
 * - Net deferral benefit (corporate rate vs personal rate)
 *
 * @param retainedInCorp - Current retained earnings in corporation
 * @param corporateTaxRate - Effective corporate tax rate
 * @param personalMarginalRate - Owner's personal marginal tax rate
 * @param yearsToWithdrawal - Years until withdrawal (default 5)
 * @param investmentGrowthRate - Annual investment growth rate (default 5%)
 * @returns Retained earnings analysis with deferral benefits
 *
 * Example:
 * - $50,000 retained in corp at 12% corporate rate = $6,000 corp tax paid
 * - If withdrawn now at 40% personal rate = $20,000 personal tax
 * - Deferral benefit = $14,000 saved by keeping in corp
 * - After 5 years growth at 5% = $63,814
 */
export function analyzeRetainedEarnings(
  retainedInCorp: number,
  corporateTaxRate: number,
  personalMarginalRate: number,
  yearsToWithdrawal: number = 5,
  investmentGrowthRate: number = 0.05,
): RetainedEarningsAnalysis {
  const currentYear = 2026

  // Tax already paid at corporate level
  // If $100k was earned and $12k corp tax paid, then $88k is retained
  // We need to reverse-calculate the original amount before tax
  const originalAmountBeforeTax = retainedInCorp / (1 - corporateTaxRate)
  const corporateTaxAlreadyPaid = originalAmountBeforeTax * corporateTaxRate

  // Project investment growth inside corporation
  const projectedGrowth = retainedInCorp * Math.pow(1 + investmentGrowthRate, yearsToWithdrawal)

  // Tax on eventual withdrawal as eligible dividend
  // Simplified: dividend gross-up and tax credit calculation
  // For eligible dividends: 38% gross-up, ~25% effective personal rate (varies by province)
  const grossedUpDividend = projectedGrowth * 1.38
  const estimatedPersonalTaxRate = personalMarginalRate * 0.6 // Rough estimate with dividend credit
  const personalWithdrawalTax = projectedGrowth * estimatedPersonalTaxRate

  // Deferral benefit: amount saved by deferring personal tax
  // By keeping money in corp, you defer paying the difference between
  // personal rate and corporate rate
  const effectiveDeferralBenefit = retainedInCorp * (personalMarginalRate - corporateTaxRate)

  return {
    currentYear,
    retainedInCorp,
    personalWithdrawalTax,
    corporateTaxAlreadyPaid,
    effectiveDeferralBenefit,
    yearsToWithdrawal,
    projectedGrowth,
  }
}

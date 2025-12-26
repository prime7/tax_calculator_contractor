import type {
  PassiveIncomeData,
  PassiveIncomeImpact
} from "./enhanced-types"
import { formatCurrency } from "./tax-calculation"
import { SBD_LIMIT } from "./tax-data"

// Passive income constants
const PASSIVE_INCOME_SBD_THRESHOLD = 50000 // $50,000 threshold for SBD reduction
const SBD_REDUCTION_FACTOR = 5 // $5 reduction in SBD limit for every $1 of passive income over threshold
const RDTOH_REFUND_RATE = 0.3333 // 1/3 refundable dividend tax on hand rate

/**
 * Calculate the impact of passive income on Small Business Deduction
 */
export function calculatePassiveIncomeImpact(
  passiveIncome: PassiveIncomeData,
  businessIncome: number
): PassiveIncomeImpact {
  // Calculate SBD reduction
  const excessPassiveIncome = Math.max(0, passiveIncome.totalPassiveIncome - PASSIVE_INCOME_SBD_THRESHOLD)
  const sbdReduction = Math.min(excessPassiveIncome * SBD_REDUCTION_FACTOR, businessIncome)
  
  // Calculate additional tax from reduced SBD
  const originalSBD = Math.min(businessIncome, SBD_LIMIT)
  const reducedSBD = Math.max(0, originalSBD - sbdReduction)
  
  // Assume 17% combined small business tax rate (federal + provincial average)
  const smallBusinessRate = 0.17
  const generalRate = 0.27 // General corporate tax rate
  
  const originalTax = reducedSBD * smallBusinessRate + (businessIncome - originalSBD) * generalRate
  const newTax = (reducedSBD - sbdReduction) * smallBusinessRate + (businessIncome - (reducedSBD - sbdReduction)) * generalRate
  
  const additionalTax = Math.max(0, newTax - originalTax)
  
  // Calculate RDTOH benefits (refundable dividend tax on hand)
  const rdtohBenefits = calculateRDTOHBenefits(passiveIncome)
  
  // Generate recommendations
  const recommendations = generatePassiveIncomeRecommendations(
    passiveIncome,
    sbdReduction,
    additionalTax,
    rdtohBenefits
  )
  
  return {
    sbdReduction,
    additionalTax,
    rdtohBenefits,
    recommendations
  }
}

/**
 * Calculate RDTOH (Refundable Dividend Tax on Hand) benefits
 */
function calculateRDTOHBenefits(passiveIncome: PassiveIncomeData): number {
  // RDTOH primarily comes from:
  // 1. Investment income in corporation
  // 2. Dividends from other Canadian corporations
  
  let rdtohBenefits = 0
  
  // Investment income creates RDTOH at approximately 26.67% refundable rate
  // This is a simplified calculation - actual RDTOH is more complex
  const investmentIncome = passiveIncome.interest + passiveIncome.dividends
  rdtohBenefits += investmentIncome * 0.2667
  
  // Some dividends may be refundable
  if (passiveIncome.rdtohBalance) {
    rdtohBenefits += passiveIncome.rdtohBalance
  }
  
  return rdtohBenefits
}

/**
 * Generate recommendations for passive income optimization
 */
function generatePassiveIncomeRecommendations(
  passiveIncome: PassiveIncomeData,
  sbdReduction: number,
  additionalTax: number,
  rdtohBenefits: number
): string[] {
  const recommendations: string[] = []
  
  // SBD reduction recommendations
  if (sbdReduction > 0) {
    recommendations.push(`Passive income reduces SBD limit by ${formatCurrency(sbdReduction)}`)
    recommendations.push("Consider timing passive income recognition to optimize SBD limit")
    recommendations.push("Evaluate if passive income can be earned outside the corporation")
    
    if (sbdReduction > 100000) {
      recommendations.push("High passive income significantly impacts SBD - consider professional tax planning")
    }
  }
  
  // RDTOH recommendations
  if (rdtohBenefits > 0) {
    recommendations.push(`RDTOH balance provides potential refund of ${formatCurrency(rdtohBenefits)}`)
    recommendations.push("Consider paying eligible dividends to access RDTOH refund")
    recommendations.push("Monitor RDTOH balance for optimal dividend timing")
  }
  
  // Investment strategy recommendations
  if (passiveIncome.totalPassiveIncome > 100000) {
    recommendations.push("High passive income may warrant separate investment corporation")
    recommendations.push("Consider Tax-Free Savings Account (TFSA) for investment income")
    recommendations.push("Evaluate real estate investment for income splitting opportunities")
  }
  
  // Tax planning recommendations
  if (additionalTax > 5000) {
    recommendations.push(`Additional tax of ${formatCurrency(additionalTax)} from passive income`)
    recommendations.push("Consider professional tax planning consultation")
    recommendations.push("Explore income attribution rules for family members")
  }
  
  // General optimization
  recommendations.push("Track passive income separately for accurate SBD calculations")
  recommendations.push("Consider passive income timing relative to business income")
  recommendations.push("Monitor annual changes to SBD passive income rules")
  
  return recommendations
}

/**
 * Optimize passive income distribution for tax efficiency
 */
export function optimizePassiveIncomeDistribution(
  passiveIncome: PassiveIncomeData,
  businessIncome: number,
  familyMembers: Array<{ id: string; age: number; income: number }>
): {
  optimalDistribution: Array<{
    recipientId: string
    incomeType: keyof PassiveIncomeData
    amount: number
    taxEfficiency: number
  }>
  totalTaxSavings: number
  recommendations: string[]
} {
  // This is a simplified optimization - real implementation would be more complex
  
  const distribution: Array<{
    recipientId: string
    incomeType: keyof PassiveIncomeData
    amount: number
    taxEfficiency: number
  }> = []
  
  let totalTaxSavings = 0
  const recommendations: string[] = []
  
  // Strategy 1: Distribute investment income to family members with low incomes
  const adults = familyMembers.filter(member => member.age >= 18 && member.income < 50000)
  
  if (adults.length > 0 && passiveIncome.interest > 0) {
    const interestPerAdult = passiveIncome.interest / adults.length
    adults.forEach(adult => {
      distribution.push({
        recipientId: adult.id,
        incomeType: 'interest',
        amount: interestPerAdult,
        taxEfficiency: calculateTaxEfficiency(interestPerAdult, adult.income)
      })
    })
    recommendations.push("Distribute interest income to family members with low incomes")
  }
  
  // Strategy 2: Hold dividend income in corporation for RDTOH benefits
  if (passiveIncome.dividends > 0) {
    distribution.push({
      recipientId: 'corporation',
      incomeType: 'dividends',
      amount: passiveIncome.dividends,
      taxEfficiency: calculateDividendEfficiency(passiveIncome.dividends, businessIncome)
    })
    recommendations.push("Retain dividend income in corporation for RDTOH benefits")
  }
  
  // Strategy 3: Time capital gains recognition
  if (passiveIncome.capitalGains > 0) {
    const lowIncomeAdults = adults.filter(adult => adult.income < 30000)
    if (lowIncomeAdults.length > 0) {
      const gainsPerAdult = passiveIncome.capitalGains / lowIncomeAdults.length
      lowIncomeAdults.forEach(adult => {
        distribution.push({
          recipientId: adult.id,
          incomeType: 'capitalGains',
          amount: gainsPerAdult,
          taxEfficiency: calculateCapitalGainsEfficiency(gainsPerAdult, adult.income)
        })
      })
      recommendations.push("Distribute capital gains to family members in lower tax brackets")
    }
  }
  
  return {
    optimalDistribution: distribution,
    totalTaxSavings,
    recommendations
  }
}

/**
 * Calculate tax efficiency of income distribution
 */
function calculateTaxEfficiency(amount: number, recipientIncome: number): number {
  // Simplified tax efficiency calculation
  // In practice, this would consider marginal tax rates, basic personal amounts, etc.
  
  const recipientMarginalRate = getMarginalTaxRate(recipientIncome)
  const corporateRate = 0.15 // Assume 15% small business rate
  
  return Math.max(0, recipientMarginalRate - corporateRate)
}

/**
 * Calculate dividend distribution efficiency
 */
function calculateDividendEfficiency(dividendAmount: number, businessIncome: number): number {
  const sbdLimit = Math.min(businessIncome, SBD_LIMIT)
  const sbdRate = 0.12 // Approximate small business rate
  const personalDividendRate = 0.20 // Approximate personal tax rate on dividends
  
  // Simplified calculation - in practice would be more complex
  return personalDividendRate - sbdRate
}

/**
 * Calculate capital gains efficiency
 */
function calculateCapitalGainsEfficiency(gainsAmount: number, recipientIncome: number): number {
  const marginalRate = getMarginalTaxRate(recipientIncome)
  const capitalGainsRate = marginalRate * 0.5 // Capital gains are taxed at 50% inclusion rate
  
  return capitalGainsRate
}

/**
 * Get marginal tax rate (simplified)
 */
function getMarginalTaxRate(income: number): number {
  // Simplified marginal tax rates - in practice would use actual tax brackets
  if (income < 50000) return 0.20
  if (income < 100000) return 0.30
  if (income < 150000) return 0.35
  return 0.40
}

/**
 * Calculate passive income tax planning scenarios
 */
export function calculatePassiveIncomeScenarios(
  businessIncome: number,
  basePassiveIncome: PassiveIncomeData,
  scenarios: Array<{
    name: string
    modifications: Partial<PassiveIncomeData>
  }>
): Array<{
  scenarioName: string
  passiveIncome: PassiveIncomeData
  impact: PassiveIncomeImpact
  netBenefit: number
}> {
  return scenarios.map(scenario => {
    const modifiedPassiveIncome: PassiveIncomeData = {
      ...basePassiveIncome,
      ...scenario.modifications
    }
    
    // Recalculate total
    modifiedPassiveIncome.totalPassiveIncome = 
      modifiedPassiveIncome.interest +
      modifiedPassiveIncome.dividends +
      modifiedPassiveIncome.capitalGains +
      modifiedPassiveIncome.rentalIncome +
      modifiedPassiveIncome.foreignIncome
    
    const impact = calculatePassiveIncomeImpact(modifiedPassiveIncome, businessIncome)
    const netBenefit = impact.rdtohBenefits - impact.additionalTax
    
    return {
      scenarioName: scenario.name,
      passiveIncome: modifiedPassiveIncome,
      impact,
      netBenefit
    }
  })
}

/**
 * Analyze passive income strategies for high-income earners
 */
export function analyzeHighIncomeStrategies(
  businessIncome: number,
  passiveIncome: PassiveIncomeData,
  targetIncome: number
): {
  strategies: Array<{
    strategy: string
    implementation: string
    taxImpact: number
    feasibility: "high" | "medium" | "low"
  }>
  recommendations: string[]
} {
  const strategies = []
  const recommendations = []
  
  // Strategy 1: Separate investment corporation
  if (passiveIncome.totalPassiveIncome > 200000) {
    strategies.push({
      strategy: "Separate Investment Corporation",
      implementation: "Transfer passive assets to new corporation for investment income",
      taxImpact: -50000, // Estimated savings
      feasibility: "high"
    })
    recommendations.push("Consider separate investment corporation for significant passive income")
  }
  
  // Strategy 2: Family trust for income splitting
  strategies.push({
    strategy: "Family Trust Income Splitting",
    implementation: "Establish family trust to distribute investment income",
    taxImpact: -25000, // Estimated savings
    feasibility: "medium"
  })
  recommendations.push("Family trusts can provide income splitting for investment income")
  
  // Strategy 3: Prescribed rate loans
  strategies.push({
    strategy: "Prescribed Rate Loans",
    implementation: "Loan funds to family members at CRA prescribed rate",
    taxImpact: -15000, // Estimated savings
    feasibility: "medium"
  })
  recommendations.push("Prescribed rate loans can shift investment income to family members")
  
  // Strategy 4: Real estate investment
  strategies.push({
    strategy: "Real Estate Investment",
    implementation: "Invest in rental properties for income splitting opportunities",
    taxImpact: -30000, // Estimated savings
    feasibility: "low"
  })
  recommendations.push("Real estate investment provides depreciation and income splitting benefits")
  
  return {
    strategies,
    recommendations
  }
}
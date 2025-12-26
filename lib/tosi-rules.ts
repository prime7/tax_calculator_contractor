import type {
  FamilyMember,
  TOSICheck,
  TOSIAnalysis,
  IncomeSplittingScenario
} from "./enhanced-types"
import { formatCurrency } from "./tax-calculation"

/**
 * TOSI (Tax on Split Income) Rules Engine
 * 
 * TOSI applies to certain types of income received by family members under 18
 * or between 18-24 in specific circumstances. This engine checks compliance
 * and provides recommendations.
 */

// TOSI Rule Constants
const TOSI_AGE_THRESHOLD = 18
const TOSI_SAFE_INCOME_THRESHOLD = {
  UNDER_18: 75000, // Maximum safe income for minors
  AGE_18_TO_24: 50000 // Maximum safe income for young adults
}

const SPECIFIED_INCOME_THRESHOLD = 100000 // Income level that triggers specified individual status

/**
 * Check if TOSI applies to a family member
 */
export function checkTOSIApplicability(
  familyMember: FamilyMember,
  totalFamilyIncome: number
): TOSICheck {
  const check: TOSICheck = {
    appliesToFamilyMember: familyMember.id,
    reason: "",
    isCompliant: false,
    safeIncomeThreshold: 0,
    recommendations: []
  }
  
  // Age-based checks
  if (familyMember.age < TOSI_AGE_THRESHOLD) {
    // Minor - TOSI applies to most income types
    check.reason = `Minor (under ${TOSI_AGE_THRESHOLD}) - TOSI applies to specified investment income and business income`
    check.safeIncomeThreshold = TOSI_SAFE_INCOME_THRESHOLD.UNDER_18
    check.exemptionType = determineMinorExemption(familyMember, totalFamilyIncome)
    check.isCompliant = checkMinorCompliance(familyMember, check.safeIncomeThreshold, check.exemptionType)
    check.recommendations = generateMinorRecommendations(familyMember, check)
    
  } else if (familyMember.age >= TOSI_AGE_THRESHOLD && familyMember.age <= 24) {
    // Age 18-24 - TOSI applies under specific conditions
    check.reason = `Age ${familyMember.age} - TOSI may apply if receiving income from related business`
    check.safeIncomeThreshold = TOSI_SAFE_INCOME_THRESHOLD.AGE_18_TO_24
    check.exemptionType = determineYoungAdultExemption(familyMember, totalFamilyIncome)
    check.isCompliant = checkYoungAdultCompliance(familyMember, check.safeIncomeThreshold, check.exemptionType)
    check.recommendations = generateYoungAdultRecommendations(familyMember, check)
    
  } else {
    // Age 25+ - TOSI generally doesn't apply
    check.reason = `Adult (age ${familyMember.age}) - TOSI generally does not apply`
    check.safeIncomeThreshold = 0
    check.isCompliant = true
    check.recommendations = ["TOSI does not apply to adults age 25 and older"]
  }
  
  return check
}

/**
 * Determine exemption type for minors
 */
function determineMinorExemption(
  familyMember: FamilyMember,
  totalFamilyIncome: number
): "specified" | "excluded" | "grandfathered" | undefined {
  // Specified individual rules
  if (totalFamilyIncome > SPECIFIED_INCOME_THRESHOLD) {
    // If family income exceeds threshold, check if minor is specified individual
    if (familyMember.relationship === "child" && 
        (familyMember.age === 17 || familyMember.age === 18)) {
      return "specified"
    }
  }
  
  // Excluded individual rules (certain disabled individuals)
  // This would need more specific medical/legal criteria
  
  // Grandfathered income (income earned before TOSI rules took effect)
  // Not applicable for new income streams
  
  return undefined
}

/**
 * Determine exemption type for young adults (18-24)
 */
function determineYoungAdultExemption(
  familyMember: FamilyMember,
  totalFamilyIncome: number
): "specified" | "excluded" | "grandfathered" | undefined {
  // Specified individual rules for young adults
  if (totalFamilyIncome > SPECIFIED_INCOME_THRESHOLD && 
      familyMember.age >= 18 && 
      familyMember.age <= 24) {
    return "specified"
  }
  
  // Excluded individual rules (full-time students, disabled individuals)
  // Would need verification of student status or disability
  
  return undefined
}

/**
 * Check compliance for minors
 */
function checkMinorCompliance(
  familyMember: FamilyMember,
  safeIncomeThreshold: number,
  exemptionType?: string
): boolean {
  // If exempt, check compliance with exemption rules
  if (exemptionType === "specified") {
    // Specified individuals have very limited safe income
    return familyMember.income <= 5000 // Very low threshold for specified individuals
  }
  
  if (exemptionType === "excluded") {
    // Excluded individuals (disabled) may have different rules
    // This would need medical/legal verification
    return true // Assume compliant pending verification
  }
  
  // Regular minor - check against safe income threshold
  return familyMember.income <= safeIncomeThreshold
}

/**
 * Check compliance for young adults
 */
function checkYoungAdultCompliance(
  familyMember: FamilyMember,
  safeIncomeThreshold: number,
  exemptionType?: string
): boolean {
  if (exemptionType === "specified") {
    return familyMember.income <= 5000
  }
  
  if (exemptionType === "excluded") {
    // Check if qualifies as excluded (full-time student, disabled)
    // Would need verification of student status
    return familyMember.income <= safeIncomeThreshold
  }
  
  // Regular young adult
  return familyMember.income <= safeIncomeThreshold
}

/**
 * Generate recommendations for minors
 */
function generateMinorRecommendations(
  familyMember: FamilyMember,
  check: TOSICheck
): string[] {
  const recommendations: string[] = []
  
  if (!check.isCompliant) {
    recommendations.push(`Reduce ${familyMember.name}'s income to below ${formatCurrency(check.safeIncomeThreshold)} to avoid TOSI`)
    recommendations.push("Consider family trust structure (with professional advice)")
    recommendations.push("Delay income splitting until family member reaches age 18")
    
    if (check.exemptionType === "specified") {
      recommendations.push("Consider income attribution to parent instead")
      recommendations.push("Explore alternative tax planning strategies")
    }
  } else {
    recommendations.push("Current income level is TOSI compliant")
    recommendations.push("Monitor income levels annually for changes")
  }
  
  return recommendations
}

/**
 * Generate recommendations for young adults
 */
function generateYoungAdultRecommendations(
  familyMember: FamilyMember,
  check: TOSICheck
): string[] {
  const recommendations: string[] = []
  
  if (!check.isCompliant) {
    recommendations.push(`Reduce ${familyMember.name}'s income to below ${formatCurrency(check.safeIncomeThreshold)} to avoid TOSI`)
    
    if (familyMember.age >= 18 && familyMember.age <= 24) {
      recommendations.push("Verify if family member qualifies as full-time student for exemption")
      recommendations.push("Consider waiting until age 25 for income splitting")
    }
  } else {
    recommendations.push("Current income level is TOSI compliant")
    
    if (familyMember.age >= 18 && familyMember.age <= 24) {
      recommendations.push("Ensure continued full-time student status if claiming exemption")
    }
  }
  
  return recommendations
}

/**
 * Perform comprehensive TOSI analysis for family
 */
export function performTOSIAnalysis(
  familyMembers: FamilyMember[],
  primaryIncome: number
): TOSIAnalysis {
  const totalFamilyIncome = familyMembers.reduce((sum, member) => sum + member.income, 0) + primaryIncome
  
  const checks = familyMembers.map(member => 
    checkTOSIApplicability(member, totalFamilyIncome)
  )
  
  const isFullyCompliant = checks.every(check => check.isCompliant)
  const riskLevel = assessTOSIRiskLevel(checks)
  const mitigationStrategies = generateMitigationStrategies(checks, isFullyCompliant)
  
  return {
    totalFamilyIncome,
    checks,
    isFullyCompliant,
    riskLevel,
    mitigationStrategies
  }
}

/**
 * Assess overall TOSI risk level
 */
function assessTOSIRiskLevel(checks: TOSICheck[]): "low" | "medium" | "high" {
  const nonCompliantCount = checks.filter(check => !check.isCompliant).length
  const totalChecks = checks.length
  
  if (totalChecks === 0) return "low"
  
  const nonCompliantRatio = nonCompliantCount / totalChecks
  
  if (nonCompliantRatio === 0) return "low"
  if (nonCompliantRatio <= 0.5) return "medium"
  return "high"
}

/**
 * Generate mitigation strategies
 */
function generateMitigationStrategies(
  checks: TOSICheck[],
  isFullyCompliant: boolean
): string[] {
  const strategies: string[] = []
  
  if (!isFullyCompliant) {
    strategies.push("Implement income reduction strategies for non-compliant family members")
    strategies.push("Consider professional tax planning consultation")
    strategies.push("Explore alternative family income splitting methods")
    strategies.push("Implement annual income monitoring and adjustment")
  }
  
  // General strategies
  strategies.push("Maintain detailed records of family member income sources")
  strategies.push("Review TOSI compliance annually as family circumstances change")
  strategies.push("Consider timing of income payments to optimize TOSI compliance")
  
  // Professional strategies
  strategies.push("Consult with tax lawyer for complex family structures")
  strategies.push("Consider family trust establishment (requires professional setup)")
  strategies.push("Explore prescribed rate loan arrangements")
  
  return strategies
}

/**
 * Validate income splitting scenario for TOSI compliance
 */
export function validateIncomeSplittingScenario(
  scenario: IncomeSplittingScenario
): {
  isValid: boolean
  violations: string[]
  recommendations: string[]
} {
  const violations: string[] = []
  const recommendations: string[] = []
  
  // Check TOSI compliance
  if (scenario.familyMembers.some(member => member.age < 25)) {
    const tosIAnalysis = performTOSIAnalysis(scenario.familyMembers, scenario.primaryIncome)
    
    if (!tosIAnalysis.isFullyCompliant) {
      violations.push("Income splitting scenario violates TOSI rules for minor or young adult family members")
      recommendations.push(...tosIAnalysis.mitigationStrategies)
    }
  }
  
  // Validate splitting strategy
  switch (scenario.splittingStrategy) {
    case "spousal-rrsp":
      validateSpousalRRSStrategy(scenario, violations, recommendations)
      break
    case "family-trust":
      validateFamilyTrustStrategy(scenario, violations, recommendations)
      break
    case "dividend-distribution":
      validateDividendDistributionStrategy(scenario, violations, recommendations)
      break
    case "salary-allocation":
      validateSalaryAllocationStrategy(scenario, violations, recommendations)
      break
  }
  
  return {
    isValid: violations.length === 0,
    violations,
    recommendations
  }
}

/**
 * Validate spousal RRSP strategy
 */
function validateSpousalRRSStrategy(
  scenario: IncomeSplittingScenario,
  violations: string[],
  recommendations: string[]
): void {
  const spouse = scenario.familyMembers.find(member => member.relationship === "spouse")
  
  if (!spouse) {
    violations.push("Spousal RRSP strategy requires a spouse family member")
    return
  }
  
  if (spouse.age < 18) {
    violations.push("Spouse must be at least 18 years old for RRSP contributions")
  }
  
  if (spouse.income > 0) {
    recommendations.push("Consider maximizing spouse's RRSP room before other splitting strategies")
  }
}

/**
 * Validate family trust strategy
 */
function validateFamilyTrustStrategy(
  scenario: IncomeSplittingScenario,
  violations: string[],
  recommendations: string[]
): void {
  recommendations.push("Family trust strategies require professional legal and tax advice")
  recommendations.push("Consider establishment costs vs. tax benefits")
  recommendations.push("Family trusts have specific income distribution rules")
}

/**
 * Validate dividend distribution strategy
 */
function validateDividendDistributionStrategy(
  scenario: IncomeSplittingScenario,
  violations: string[],
  recommendations: string[]
): void {
  const minorMembers = scenario.familyMembers.filter(member => member.age < 18)
  
  if (minorMembers.length > 0) {
    violations.push("Dividend distribution to minors may trigger TOSI")
    recommendations.push("Consider alternative strategies for minor family members")
  }
}

/**
 * Validate salary allocation strategy
 */
function validateSalaryAllocationStrategy(
  scenario: IncomeSplittingScenario,
  violations: string[],
  recommendations: string[]
): void {
  const minorMembers = scenario.familyMembers.filter(member => member.age < 18)
  
  if (minorMembers.length > 0) {
    violations.push("Salary allocation to minors is not allowed under Canadian tax law")
    recommendations.push("Remove minors from salary allocation strategy")
  }
  
  const youngAdults = scenario.familyMembers.filter(member => member.age >= 18 && member.age <= 24)
  youngAdults.forEach(member => {
    if (member.income > TOSI_SAFE_INCOME_THRESHOLD.AGE_18_TO_24) {
      recommendations.push(`Consider reducing ${member.name}'s salary to avoid TOSI`)
    }
  })
}
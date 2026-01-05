import type {
  TaxBracket,
  Province,
  SoleProprietorshipResult,
  CorporationResult,
  ComparisonResult,
  CalculatorInputs,
  TaxCalculationOptions,
} from "./types"
import {
  FEDERAL_BRACKETS,
  FEDERAL_BASIC_PERSONAL_AMOUNT,
  QUEBEC_ABATEMENT,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_BASIC_EXEMPTION,
  CPP_RATE,
  CPP_MAX_CONTRIBUTION,
  QPP_MAX_PENSIONABLE_EARNINGS,
  QPP_BASIC_EXEMPTION,
  QPP_RATE,
  QPP_MAX_CONTRIBUTION,
  QPIP_MAX_INSURABLE_EARNINGS,
  QPIP_EMPLOYEE_RATE,
  QPIP_EMPLOYER_RATE,
  QPIP_SELF_EMPLOYED_RATE,
  EI_MAX_INSURABLE_EARNINGS,
  EI_EMPLOYEE_RATE,
  EI_EMPLOYER_RATE,
  EI_MAX_EMPLOYEE_CONTRIBUTION,
  EI_MAX_EMPLOYER_CONTRIBUTION,
  EI_QUEBEC_EMPLOYEE_RATE,
  EI_QUEBEC_EMPLOYER_RATE,
  RRSP_RATE,
  RRSP_MAX,
  SBD_LIMIT,
  GENERAL_CORP_RATE,
  NON_ELIGIBLE_DIVIDEND_GROSS_UP,
  NON_ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT,
  ONTARIO_HEALTH_PREMIUM_BRACKETS,
  getProvinceByCode,
} from "./tax-data"
import { calculateEmployeeEI, calculateSelfEmployedEI } from "./calculations/ei-calculation"
import { calculateInstallments } from "./calculations/installment-calculation"

// Calculate progressive tax from brackets
function calculateProgressiveTax(income: number, brackets: TaxBracket[]): number {
  let tax = 0
  let previousMax = 0

  for (const bracket of brackets) {
    if (income <= previousMax) break

    const bracketMax = bracket.max ?? Number.POSITIVE_INFINITY
    const incomeInBracket = Math.min(income, bracketMax) - previousMax

    if (incomeInBracket > 0) {
      tax += incomeInBracket * bracket.rate
    }

    previousMax = bracketMax
  }

  return tax
}

// Calculate federal tax
function calculateFederalTax(taxableIncome: number, isQuebec: boolean = false): number {
  const adjustedIncome = Math.max(0, taxableIncome - FEDERAL_BASIC_PERSONAL_AMOUNT)
  let federalTax = calculateProgressiveTax(adjustedIncome, FEDERAL_BRACKETS)

  // Apply Quebec abatement
  if (isQuebec) {
    federalTax *= 1 - QUEBEC_ABATEMENT
  }

  return federalTax
}

// Calculate provincial tax
function calculateProvincialTax(taxableIncome: number, province: Province): number {
  const adjustedIncome = Math.max(0, taxableIncome - province.basicPersonalAmount)
  return calculateProgressiveTax(adjustedIncome, province.personalBrackets)
}

// Calculate Ontario Health Premium
function calculateOntarioHealthPremium(taxableIncome: number): number {
  if (taxableIncome <= 20000) return 0
  if (taxableIncome >= 200000) return 900

  for (const bracket of ONTARIO_HEALTH_PREMIUM_BRACKETS) {
    if (taxableIncome >= bracket.min && (bracket.max === null || taxableIncome < bracket.max)) {
      if (bracket.rate) {
        return bracket.amount + (taxableIncome - bracket.min) * bracket.rate
      }
      return bracket.amount
    }
  }

  return 0
}

// Calculate CPP contributions for self-employed
function calculateSelfEmployedCpp(netIncome: number, isQuebec: boolean = false): number {
  if (isQuebec) {
    const pensionableEarnings = Math.min(netIncome, QPP_MAX_PENSIONABLE_EARNINGS)
    const contributoryEarnings = Math.max(0, pensionableEarnings - QPP_BASIC_EXEMPTION)
    const contribution = contributoryEarnings * QPP_RATE * 2
    return Math.min(contribution, QPP_MAX_CONTRIBUTION * 2)
  }

  const pensionableEarnings = Math.min(netIncome, CPP_MAX_PENSIONABLE_EARNINGS)
  const contributoryEarnings = Math.max(0, pensionableEarnings - CPP_BASIC_EXEMPTION)
  const contribution = contributoryEarnings * CPP_RATE * 2
  return Math.min(contribution, CPP_MAX_CONTRIBUTION * 2)
}

// Calculate employee CPP/QPP
function calculateEmployeeCpp(salary: number, isQuebec: boolean = false): number {
  if (isQuebec) {
    const pensionableEarnings = Math.min(salary, QPP_MAX_PENSIONABLE_EARNINGS)
    const contributoryEarnings = Math.max(0, pensionableEarnings - QPP_BASIC_EXEMPTION)
    return Math.min(contributoryEarnings * QPP_RATE, QPP_MAX_CONTRIBUTION)
  }

  const pensionableEarnings = Math.min(salary, CPP_MAX_PENSIONABLE_EARNINGS)
  const contributoryEarnings = Math.max(0, pensionableEarnings - CPP_BASIC_EXEMPTION)
  return Math.min(contributoryEarnings * CPP_RATE, CPP_MAX_CONTRIBUTION)
}

// Calculate employer CPP/QPP
function calculateEmployerCpp(salary: number, isQuebec: boolean = false): number {
  return calculateEmployeeCpp(salary, isQuebec)
}

// Calculate EI contributions for employee
function calculateEmployeeEi(salary: number, isQuebec: boolean = false): number {
  const insurable = Math.min(salary, EI_MAX_INSURABLE_EARNINGS)
  const rate = isQuebec ? EI_QUEBEC_EMPLOYEE_RATE : EI_EMPLOYEE_RATE
  const maxContribution = isQuebec ? insurable * EI_QUEBEC_EMPLOYEE_RATE : EI_MAX_EMPLOYEE_CONTRIBUTION
  return Math.min(insurable * rate, maxContribution)
}

// Calculate EI contributions for employer
function calculateEmployerEi(salary: number, isQuebec: boolean = false): number {
  const insurable = Math.min(salary, EI_MAX_INSURABLE_EARNINGS)
  const rate = isQuebec ? EI_QUEBEC_EMPLOYER_RATE : EI_EMPLOYER_RATE
  const maxContribution = isQuebec ? insurable * EI_QUEBEC_EMPLOYER_RATE : EI_MAX_EMPLOYER_CONTRIBUTION
  return Math.min(insurable * rate, maxContribution)
}

// Calculate QPIP for employee
function calculateQpipEmployee(salary: number): number {
  const insurable = Math.min(salary, QPIP_MAX_INSURABLE_EARNINGS)
  return insurable * QPIP_EMPLOYEE_RATE
}

// Calculate QPIP for employer
function calculateQpipEmployer(salary: number): number {
  const insurable = Math.min(salary, QPIP_MAX_INSURABLE_EARNINGS)
  return insurable * QPIP_EMPLOYER_RATE
}

// Calculate QPIP for self-employed
function calculateQpipSelfEmployed(netIncome: number): number {
  const insurable = Math.min(netIncome, QPIP_MAX_INSURABLE_EARNINGS)
  return insurable * QPIP_SELF_EMPLOYED_RATE
}

// Calculate RRSP room created
function calculateRrspRoom(earnedIncome: number): number {
  return Math.min(earnedIncome * RRSP_RATE, RRSP_MAX)
}

// Calculate dividend tax with gross-up and credits (non-eligible dividends from small business)
function calculateDividendTax(
  dividends: number,
  province: Province,
  otherIncome: number,
): { tax: number; grossedUp: number } {
  if (dividends <= 0) return { tax: 0, grossedUp: 0 }

  // Use non-eligible dividend rates (from small business income)
  const grossedUp = dividends * (1 + NON_ELIGIBLE_DIVIDEND_GROSS_UP)
  const totalIncome = otherIncome + grossedUp

  // Calculate marginal tax on the grossed-up dividends
  const isQuebec = province.isQuebec || false
  const taxWithDividends = calculateFederalTax(totalIncome, isQuebec) + calculateProvincialTax(totalIncome, province)
  const taxWithoutDividends = calculateFederalTax(otherIncome, isQuebec) + calculateProvincialTax(otherIncome, province)
  const grossTaxOnDividends = taxWithDividends - taxWithoutDividends

  // Calculate dividend tax credits
  const federalCredit = grossedUp * NON_ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT
  const provincialCredit = grossedUp * province.nonEligibleDividendTaxCredit

  const netTax = Math.max(0, grossTaxOnDividends - federalCredit - provincialCredit)

  return { tax: netTax, grossedUp }
}

// Calculate sole proprietorship results
export function calculateSoleProprietorship(
  income: number,
  provinceCode: string,
  deductions: number,
  eiEnrollment: boolean = false,
  options: TaxCalculationOptions = {},
): SoleProprietorshipResult {
  const province = getProvinceByCode(provinceCode)
  if (!province) {
    throw new Error(`Province ${provinceCode} not found`)
  }

  const isQuebec = province.isQuebec || false

  // Improved default business deductions (15% instead of 10%)
  const businessDeductions = deductions > 0 ? deductions : income * 0.15
  const netBusinessIncome = Math.max(0, income - businessDeductions)

  const federalTax = calculateFederalTax(netBusinessIncome, isQuebec)
  const provincialTax = calculateProvincialTax(netBusinessIncome, province)
  const cppContributions = calculateSelfEmployedCpp(netBusinessIncome, isQuebec)

  // Phase 1: Calculate EI if enrolled
  const eiPremiums = eiEnrollment ? calculateSelfEmployedEI(netBusinessIncome, true, provinceCode) : undefined
  const eiContributions = eiPremiums?.totalPremium || 0

  // Quebec QPIP for self-employed
  const qpipContributions = isQuebec ? calculateQpipSelfEmployed(netBusinessIncome) : undefined

  // Ontario Health Premium
  const healthPremium = province.hasHealthPremium ? calculateOntarioHealthPremium(netBusinessIncome) : undefined

  let totalTax =
    federalTax + provincialTax + cppContributions + eiContributions + (qpipContributions || 0) + (healthPremium || 0)

  // Apply tax credits (simplified - assuming non-refundable credits)
  const totalCredits = options.credits ? Object.values(options.credits).reduce((sum, val) => sum + val, 0) : 0
  totalTax = Math.max(0, totalTax - totalCredits)

  const netIncome = income - totalTax - businessDeductions
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
  const rrspRoom = calculateRrspRoom(netBusinessIncome)

  // Phase 1: Calculate installment schedule
  const installmentSchedule = calculateInstallments(federalTax, provincialTax, totalTax, 0, 0)

  return {
    grossIncome: income,
    businessDeductions,
    netBusinessIncome,
    federalTax,
    provincialTax,
    cppContributions,
    eiContributions,
    qpipContributions,
    healthPremium,
    totalTax,
    netIncome,
    effectiveRate,
    rrspRoom,
    eiPremiums,
    installmentSchedule,
  }
}

// Calculate corporation results
export function calculateCorporation(
  income: number,
  provinceCode: string,
  salaryAmount: number,
  deductions: number,
  options: TaxCalculationOptions = {},
): CorporationResult {
  const province = getProvinceByCode(provinceCode)
  if (!province) {
    throw new Error(`Province ${provinceCode} not found`)
  }

  const isQuebec = province.isQuebec || false

  // Improved default business deductions (15% instead of 10%)
  const businessDeductions = deductions > 0 ? deductions : income * 0.15
  const netBusinessIncome = Math.max(0, income - businessDeductions)

  // Salary paid to owner
  const salary = Math.min(salaryAmount, netBusinessIncome)
  const employeeCpp = calculateEmployeeCpp(salary, isQuebec)
  const employerCpp = calculateEmployerCpp(salary, isQuebec)
  const employeeEi = calculateEmployeeEi(salary, isQuebec)
  const employerEi = calculateEmployerEi(salary, isQuebec)

  // Phase 1: Calculate EI premiums for result object
  const eiPremiums = calculateEmployeeEI(salary, provinceCode)

  // Quebec QPIP
  const qpipEmployee = isQuebec ? calculateQpipEmployee(salary) : undefined
  const qpipEmployer = isQuebec ? calculateQpipEmployer(salary) : undefined

  // Corporate taxable income after salary and employer portions
  const totalEmployerCosts = employerCpp + employerEi + (qpipEmployer || 0)
  const corporateTaxableIncome = Math.max(0, netBusinessIncome - salary - totalEmployerCosts)

  // Corporate tax with Small Business Deduction limit
  let corporateTax = 0
  if (corporateTaxableIncome <= SBD_LIMIT) {
    // All income eligible for small business rate
    corporateTax = corporateTaxableIncome * province.combinedCorpRate
  } else {
    // Split between small business rate and general rate
    const sbdIncome = SBD_LIMIT
    const generalIncome = corporateTaxableIncome - SBD_LIMIT
    corporateTax = sbdIncome * province.combinedCorpRate + generalIncome * GENERAL_CORP_RATE
  }

  const afterTaxCorporateIncome = corporateTaxableIncome - corporateTax

  // Personal tax on salary
  const federalTaxOnSalary = calculateFederalTax(salary, isQuebec)
  const provincialTaxOnSalary = calculateProvincialTax(salary, province)
  const healthPremium = province.hasHealthPremium ? calculateOntarioHealthPremium(salary) : undefined
  const personalTaxOnSalary =
    federalTaxOnSalary +
    provincialTaxOnSalary +
    employeeCpp +
    employeeEi +
    (qpipEmployee || 0) +
    (healthPremium || 0)

  // Dividends - pay out all available after-tax corporate income
  const dividendsPaid = afterTaxCorporateIncome
  const { tax: personalTaxOnDividends } = calculateDividendTax(dividendsPaid, province, salary)

  let totalPersonalTax = personalTaxOnSalary + personalTaxOnDividends

  // Apply tax credits to personal tax (simplified)
  const totalCredits = options.credits ? Object.values(options.credits).reduce((sum, val) => sum + val, 0) : 0
  totalPersonalTax = Math.max(0, totalPersonalTax - totalCredits)

  const totalTax = corporateTax + totalPersonalTax + totalEmployerCosts
  const netIncome = salary + dividendsPaid - totalPersonalTax
  const retainedInCorp = 0 // We're paying out all dividends for comparison
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
  const rrspRoom = calculateRrspRoom(salary) // Only salary creates RRSP room

  // Phase 1: Calculate installment schedule
  const installmentSchedule = calculateInstallments(
    federalTaxOnSalary + calculateFederalTax(0, isQuebec),
    provincialTaxOnSalary + calculateProvincialTax(0, province),
    totalTax,
    0,
    0,
  )

  return {
    grossIncome: income,
    salary,
    employeeCpp,
    employerCpp,
    employeeEi,
    employerEi,
    qpipEmployee,
    qpipEmployer,
    corporateTaxableIncome,
    corporateTax,
    afterTaxCorporateIncome,
    dividendsPaid,
    personalTaxOnSalary,
    personalTaxOnDividends,
    healthPremium,
    totalPersonalTax,
    totalTax,
    netIncome,
    retainedInCorp,
    effectiveRate,
    rrspRoom,
    eiPremiums,
    installmentSchedule,
  }
}

// Find optimal salary amount using improved algorithm
export function findOptimalSalary(
  income: number,
  provinceCode: string,
  deductions: number,
  options: TaxCalculationOptions = {},
): number {
  const netIncome = Math.max(0, income - (deductions > 0 ? deductions : income * 0.15))

  // Start with known optimal ranges
  const testPoints = [
    0, // All dividends
    CPP_MAX_PENSIONABLE_EARNINGS, // CPP max
    FEDERAL_BASIC_PERSONAL_AMOUNT, // Basic personal amount
    netIncome * 0.25,
    netIncome * 0.5,
    netIncome * 0.75,
    netIncome, // All salary
  ].filter((point) => point <= netIncome)

  let optimalSalary = 0
  let minTax = Number.POSITIVE_INFINITY

  // Test key points
  for (const salary of testPoints) {
    const result = calculateCorporation(income, provinceCode, salary, deductions, options)
    if (result.totalTax < minTax) {
      minTax = result.totalTax
      optimalSalary = salary
    }
  }

  // Fine-tune around the optimal with $1000 increments
  const searchRange = 10000
  for (
    let salary = Math.max(0, optimalSalary - searchRange);
    salary <= Math.min(netIncome, optimalSalary + searchRange);
    salary += 1000
  ) {
    const result = calculateCorporation(income, provinceCode, salary, deductions, options)
    if (result.totalTax < minTax) {
      minTax = result.totalTax
      optimalSalary = salary
    }
  }

  return optimalSalary
}

// Compare sole proprietorship vs corporation
export function compareStrategies(inputs: CalculatorInputs): ComparisonResult {
  const options: TaxCalculationOptions = {
    credits: inputs.credits,
  }

  const soleProprietorship = calculateSoleProprietorship(
    inputs.income,
    inputs.province,
    inputs.deductions,
    inputs.eiEnrollment || false,
    options,
  )

  const corporation = calculateCorporation(
    inputs.income,
    inputs.province,
    inputs.salaryAmount,
    inputs.deductions,
    options,
  )

  const taxSavings = soleProprietorship.totalTax - corporation.totalTax
  const savingsPercentage = soleProprietorship.totalTax > 0 ? (taxSavings / soleProprietorship.totalTax) * 100 : 0

  let recommendation: "sole-proprietorship" | "corporation" | "similar"
  if (Math.abs(taxSavings) < 1000) {
    recommendation = "similar"
  } else if (taxSavings > 0) {
    recommendation = "corporation"
  } else {
    recommendation = "sole-proprietorship"
  }

  return {
    soleProprietorship,
    corporation,
    taxSavings,
    savingsPercentage,
    recommendation,
  }
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

import type {
    TaxBracket,
    Province,
    SoleProprietorshipResult,
    CorporationResult,
    ComparisonResult,
    CalculatorInputs,
  } from "./types"
  import {
    FEDERAL_BRACKETS,
    FEDERAL_BASIC_PERSONAL_AMOUNT,
    CPP_MAX_PENSIONABLE_EARNINGS,
    CPP_BASIC_EXEMPTION,
    CPP_RATE,
    CPP_MAX_CONTRIBUTION,
    RRSP_RATE,
    RRSP_MAX,
    DIVIDEND_GROSS_UP,
    FEDERAL_DIVIDEND_TAX_CREDIT,
    getProvinceByCode,
  } from "./tax-data"
  
  // Calculate progressive tax from brackets
  function calculateProgressiveTax(income: number, brackets: TaxBracket[]): number {
    let tax = 0
    let remainingIncome = income
  
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break
  
      const bracketMax = bracket.max ?? Number.POSITIVE_INFINITY
      const taxableInBracket = Math.min(remainingIncome, bracketMax - bracket.min)
  
      if (taxableInBracket > 0) {
        tax += taxableInBracket * bracket.rate
        remainingIncome -= taxableInBracket
      }
    }
  
    return tax
  }
  
  // Calculate federal tax
  function calculateFederalTax(taxableIncome: number): number {
    const adjustedIncome = Math.max(0, taxableIncome - FEDERAL_BASIC_PERSONAL_AMOUNT)
    return calculateProgressiveTax(adjustedIncome, FEDERAL_BRACKETS)
  }
  
  // Calculate provincial tax
  function calculateProvincialTax(taxableIncome: number, province: Province): number {
    const adjustedIncome = Math.max(0, taxableIncome - province.basicPersonalAmount)
    return calculateProgressiveTax(adjustedIncome, province.personalBrackets)
  }
  
  // Calculate CPP contributions for self-employed
  function calculateSelfEmployedCpp(netIncome: number): number {
    const pensionableEarnings = Math.min(netIncome, CPP_MAX_PENSIONABLE_EARNINGS)
    const contributoryEarnings = Math.max(0, pensionableEarnings - CPP_BASIC_EXEMPTION)
    // Self-employed pays both employee and employer portions
    const contribution = contributoryEarnings * CPP_RATE * 2
    return Math.min(contribution, CPP_MAX_CONTRIBUTION * 2)
  }
  
  // Calculate employee CPP
  function calculateEmployeeCpp(salary: number): number {
    const pensionableEarnings = Math.min(salary, CPP_MAX_PENSIONABLE_EARNINGS)
    const contributoryEarnings = Math.max(0, pensionableEarnings - CPP_BASIC_EXEMPTION)
    return Math.min(contributoryEarnings * CPP_RATE, CPP_MAX_CONTRIBUTION)
  }
  
  // Calculate employer CPP
  function calculateEmployerCpp(salary: number): number {
    return calculateEmployeeCpp(salary)
  }
  
  // Calculate RRSP room created
  function calculateRrspRoom(earnedIncome: number): number {
    return Math.min(earnedIncome * RRSP_RATE, RRSP_MAX)
  }
  
  // Calculate dividend tax with gross-up and credits
  function calculateDividendTax(
    dividends: number,
    province: Province,
    otherIncome: number,
  ): { tax: number; grossedUp: number } {
    if (dividends <= 0) return { tax: 0, grossedUp: 0 }
  
    const grossedUp = dividends * (1 + DIVIDEND_GROSS_UP)
    const totalIncome = otherIncome + grossedUp
  
    // Calculate marginal tax on the grossed-up dividends
    const taxWithDividends = calculateFederalTax(totalIncome) + calculateProvincialTax(totalIncome, province)
    const taxWithoutDividends = calculateFederalTax(otherIncome) + calculateProvincialTax(otherIncome, province)
    const grossTaxOnDividends = taxWithDividends - taxWithoutDividends
  
    // Calculate dividend tax credits
    const federalCredit = grossedUp * FEDERAL_DIVIDEND_TAX_CREDIT
    const provincialCredit = grossedUp * province.dividendTaxCredit
  
    const netTax = Math.max(0, grossTaxOnDividends - federalCredit - provincialCredit)
  
    return { tax: netTax, grossedUp }
  }
  
  // Calculate sole proprietorship results
  export function calculateSoleProprietorship(
    income: number,
    provinceCode: string,
    deductions: number,
  ): SoleProprietorshipResult {
    const province = getProvinceByCode(provinceCode)
    if (!province) {
      throw new Error(`Province ${provinceCode} not found`)
    }
  
    // Standard business deductions (10% or user input)
    const businessDeductions = deductions > 0 ? deductions : income * 0.1
    const netBusinessIncome = Math.max(0, income - businessDeductions)
  
    const federalTax = calculateFederalTax(netBusinessIncome)
    const provincialTax = calculateProvincialTax(netBusinessIncome, province)
    const cppContributions = calculateSelfEmployedCpp(netBusinessIncome)
  
    const totalTax = federalTax + provincialTax + cppContributions
    const netIncome = income - totalTax - businessDeductions
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
    const rrspRoom = calculateRrspRoom(netBusinessIncome)
  
    return {
      grossIncome: income,
      businessDeductions,
      netBusinessIncome,
      federalTax,
      provincialTax,
      cppContributions,
      totalTax,
      netIncome,
      effectiveRate,
      rrspRoom,
    }
  }
  
  // Calculate corporation results
  export function calculateCorporation(
    income: number,
    provinceCode: string,
    salaryAmount: number,
    deductions: number,
  ): CorporationResult {
    const province = getProvinceByCode(provinceCode)
    if (!province) {
      throw new Error(`Province ${provinceCode} not found`)
    }
  
    // Business deductions
    const businessDeductions = deductions > 0 ? deductions : income * 0.1
    const netBusinessIncome = Math.max(0, income - businessDeductions)
  
    // Salary paid to owner
    const salary = Math.min(salaryAmount, netBusinessIncome)
    const employerCpp = calculateEmployerCpp(salary)
  
    // Corporate taxable income after salary and employer CPP
    const corporateTaxableIncome = Math.max(0, netBusinessIncome - salary - employerCpp)
  
    // Corporate tax
    const corporateTax = corporateTaxableIncome * province.combinedCorpRate
    const afterTaxCorporateIncome = corporateTaxableIncome - corporateTax
  
    // Personal tax on salary
    const employeeCpp = calculateEmployeeCpp(salary)
    const federalTaxOnSalary = calculateFederalTax(salary)
    const provincialTaxOnSalary = calculateProvincialTax(salary, province)
    const personalTaxOnSalary = federalTaxOnSalary + provincialTaxOnSalary + employeeCpp
  
    // Dividends - pay out all available after-tax corporate income
    const dividendsPaid = afterTaxCorporateIncome
    const { tax: personalTaxOnDividends } = calculateDividendTax(dividendsPaid, province, salary)
  
    const totalPersonalTax = personalTaxOnSalary + personalTaxOnDividends
    const totalTax = corporateTax + totalPersonalTax
    const netIncome = salary + dividendsPaid - totalPersonalTax
    const retainedInCorp = 0 // We're paying out all dividends for comparison
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
    const rrspRoom = calculateRrspRoom(salary) // Only salary creates RRSP room
  
    return {
      grossIncome: income,
      salary,
      employerCpp,
      corporateTaxableIncome,
      corporateTax,
      afterTaxCorporateIncome,
      dividendsPaid,
      personalTaxOnSalary,
      personalTaxOnDividends,
      totalPersonalTax,
      totalTax,
      netIncome,
      retainedInCorp,
      effectiveRate,
      rrspRoom,
    }
  }
  
  // Find optimal salary amount
  export function findOptimalSalary(income: number, provinceCode: string, deductions: number): number {
    let optimalSalary = 0
    let minTax = Number.POSITIVE_INFINITY
  
    // Test salary amounts from 0 to income in $5000 increments
    const netIncome = Math.max(0, income - (deductions > 0 ? deductions : income * 0.1))
  
    for (let salary = 0; salary <= netIncome; salary += 5000) {
      const result = calculateCorporation(income, provinceCode, salary, deductions)
      if (result.totalTax < minTax) {
        minTax = result.totalTax
        optimalSalary = salary
      }
    }
  
    // Fine-tune around the optimal
    for (
      let salary = Math.max(0, optimalSalary - 5000);
      salary <= Math.min(netIncome, optimalSalary + 5000);
      salary += 1000
    ) {
      const result = calculateCorporation(income, provinceCode, salary, deductions)
      if (result.totalTax < minTax) {
        minTax = result.totalTax
        optimalSalary = salary
      }
    }
  
    return optimalSalary
  }
  
  // Compare sole proprietorship vs corporation
  export function compareStrategies(inputs: CalculatorInputs): ComparisonResult {
    const soleProprietorship = calculateSoleProprietorship(inputs.income, inputs.province, inputs.deductions)
  
    const corporation = calculateCorporation(inputs.income, inputs.province, inputs.salaryAmount, inputs.deductions)
  
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
  
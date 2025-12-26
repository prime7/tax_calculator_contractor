export interface Province {
    code: string
    name: string
    personalBrackets: TaxBracket[]
    basicPersonalAmount: number
    smallBusinessRate: number
    combinedCorpRate: number
    dividendTaxCredit: number
    nonEligibleDividendTaxCredit: number
    hasHealthPremium?: boolean
    isQuebec?: boolean
  }
  
  export interface TaxBracket {
    min: number
    max: number | null
    rate: number
  }
  
  export interface DetailedDeductions {
    homeOffice: number
    vehicle: number
    supplies: number
    professionalFees: number
    advertising: number
    insurance: number
    other: number
  }

  export interface TaxCredits {
    medical: number
    charitable: number
    education: number
    other: number
  }

  export interface CalculatorInputs {
    income: number
    province: string
    deductions: number
    detailedDeductions?: DetailedDeductions
    credits?: TaxCredits
    salaryAmount: number
  }

  export interface TaxCalculationOptions {
    credits?: TaxCredits
  }
  
  export interface SoleProprietorshipResult {
      grossIncome: number
      businessDeductions: number
      netBusinessIncome: number
      federalTax: number
      provincialTax: number
      cppContributions: number
      eiContributions: number
      qpipContributions?: number
      healthPremium?: number
      totalTax: number
      netIncome: number
      effectiveRate: number
      rrspRoom: number
    }
  
  export interface CorporationResult {
      grossIncome: number
      salary: number
      employeeCpp: number
      employerCpp: number
      employeeEi: number
      employerEi: number
      qpipEmployee?: number
      qpipEmployer?: number
      corporateTaxableIncome: number
      corporateTax: number
      afterTaxCorporateIncome: number
      dividendsPaid: number
      personalTaxOnSalary: number
      personalTaxOnDividends: number
      healthPremium?: number
      totalPersonalTax: number
      totalTax: number
      netIncome: number
      retainedInCorp: number
      effectiveRate: number
      rrspRoom: number
    }
  
  export interface ComparisonResult {
    soleProprietorship: SoleProprietorshipResult
    corporation: CorporationResult
    taxSavings: number
    savingsPercentage: number
    recommendation: "sole-proprietorship" | "corporation" | "similar"
  }
  
  export interface TaxBreakdownItem {
    label: string
    amount: number
    description?: string
  }
  
export interface Province {
    code: string
    name: string
    personalBrackets: TaxBracket[]
    basicPersonalAmount: number
    smallBusinessRate: number
    combinedCorpRate: number
    dividendTaxCredit: number
  }
  
  export interface TaxBracket {
    min: number
    max: number | null
    rate: number
  }
  
  export interface CalculatorInputs {
    income: number
    province: string
    deductions: number
    salaryAmount: number
  }
  
  export interface SoleProprietorshipResult {
    grossIncome: number
    businessDeductions: number
    netBusinessIncome: number
    federalTax: number
    provincialTax: number
    cppContributions: number
    totalTax: number
    netIncome: number
    effectiveRate: number
    rrspRoom: number
  }
  
  export interface CorporationResult {
    grossIncome: number
    salary: number
    employerCpp: number
    corporateTaxableIncome: number
    corporateTax: number
    afterTaxCorporateIncome: number
    dividendsPaid: number
    personalTaxOnSalary: number
    personalTaxOnDividends: number
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
  
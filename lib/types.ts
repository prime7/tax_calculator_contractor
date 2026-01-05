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
    // Phase 1: EI enrollment
    eiEnrollment?: boolean
    // Phase 3: Multi-year planning
    enableMultiYear?: boolean
    planningYears?: number
    incomeGrowthRate?: number
    rrspContributionRate?: number
    investmentGrowthRate?: number
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
    // Phase 1: EI and installments
    eiPremiums?: EIPremiums
    installmentSchedule?: InstallmentSchedule
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
    // Phase 1: EI and installments
    eiPremiums?: EIPremiums
    installmentSchedule?: InstallmentSchedule
    // Phase 3: Multi-year and retained earnings
    retainedEarningsAnalysis?: RetainedEarningsAnalysis
    multiYearPlan?: MultiYearPlan
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

  // === PHASE 1: EI AND INSTALLMENT TYPES ===

  export interface EIPremiums {
    employeePremium: number
    employerPremium: number
    totalPremium: number
    isEnrolled: boolean
    province: string
  }

  export interface QuarterlyInstallment {
    quarter: 1 | 2 | 3 | 4
    dueDate: string
    federalTax: number
    provincialTax: number
    totalPayment: number
  }

  export interface InstallmentSchedule {
    annualTaxOwing: number
    quarterlyPayments: QuarterlyInstallment[]
    requiresInstallments: boolean
    previousYearThreshold: number
  }

  // === PHASE 3: MULTI-YEAR PLANNING TYPES ===

  export interface YearlyResult {
    year: number
    grossIncome: number
    totalTax: number
    netIncome: number
    retainedInCorp: number
    cumulativeRetained: number
    rrspContribution: number
    cumulativeRRSP: number
  }

  export interface MultiYearPlan {
    startYear: number
    years: number
    yearlyResults: YearlyResult[]
    totalNetIncome: number
    totalTaxPaid: number
    averageEffectiveRate: number
    finalRetainedEarnings: number
    finalRRSPValue: number
  }

  export interface RetainedEarningsAnalysis {
    currentYear: number
    retainedInCorp: number
    personalWithdrawalTax: number
    corporateTaxAlreadyPaid: number
    effectiveDeferralBenefit: number
    yearsToWithdrawal: number
    projectedGrowth: number
  }

  export interface PDFExportData {
    calculationDate: string
    inputs: CalculatorInputs
    comparison: ComparisonResult
    installmentSchedule?: InstallmentSchedule
    multiYear?: MultiYearPlan
    metadata: {
      appVersion: string
      taxYear: number
      disclaimer: string
    }
  }
  
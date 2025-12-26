import type { 
  CalculatorInputs, 
  SoleProprietorshipResult, 
  CorporationResult, 
  ComparisonResult 
} from "./base-types"

// NEW: Multi-Year Projection Types
export interface ProjectionAssumptions {
  incomeGrowthRate: number // Annual income growth percentage
  inflationRate: number // For tax bracket adjustments
  includeRRSPGrowth: boolean // Include investment growth in RRSP
  includeCorpGrowth: boolean // Include retained earnings growth
  years: number // 3, 5, or 10 years
}

export interface YearlyProjection {
  year: number
  grossIncome: number
  soleProprietorship: SoleProprietorshipResult
  corporation: CorporationResult
  cumulativeTaxSavings: number
  rrspBalance?: number
  corpRetainedEarnings?: number
}

export interface MultiYearProjection {
  assumptions: ProjectionAssumptions
  yearlyProjections: YearlyProjection[]
  totalCumulativeSavings: number
  breakEvenYear: number
  recommendation: string
}

// NEW: Family/Income Splitting Types
export interface FamilyMember {
  id: string
  name: string
  age: number
  relationship: "spouse" | "child" | "parent" | "other"
  income: number
  rrspRoom: number
  canReceiveDividends: boolean
  tosIExempt: boolean // Tax on Split Income exemption
}

export interface IncomeSplittingScenario {
  primaryIncome: number
  familyMembers: FamilyMember[]
  splittingStrategy: "spousal-rrsp" | "family-trust" | "dividend-distribution" | "salary-allocation"
  projectedSavings: number
  tosICompliant: boolean
  recommendations: string[]
}

// NEW: TOSI Rules Types
export interface TOSICheck {
  appliesToFamilyMember: string // Family member ID
  reason: string // Why TOSI applies
  exemptionType?: "specified" | "excluded" | "grandfathered"
  safeIncomeThreshold: number
  isCompliant: boolean
  recommendations: string[]
}

export interface TOSIAnalysis {
  totalFamilyIncome: number
  checks: TOSICheck[]
  isFullyCompliant: boolean
  riskLevel: "low" | "medium" | "high"
  mitigationStrategies: string[]
}

// NEW: Capital Dividend Account Types
export interface CDAData {
  openingBalance: number
  lifeInsuranceProceeds: number
  capitalGains: number
  investmentIncome: number
  dividendsPaid: number
  currentBalance: number
  taxFreeDividendCapacity: number
}

// NEW: Passive Income Types
export interface PassiveIncomeData {
  interest: number
  dividends: number
  capitalGains: number
  rentalIncome: number
  foreignIncome: number
  totalPassiveIncome: number
  rdtohBalance?: number // Refundable Dividend Tax on Hand
}

export interface PassiveIncomeImpact {
  sbdReduction: number // Reduction in Small Business Deduction limit
  additionalTax: number
  rdtohBenefits: number
  recommendations: string[]
}

// NEW: Enhanced Business Expense Types
export interface BusinessExpenses {
  // Detailed expenses
  homeOffice: {
    squareFootage: number
    totalHomeSize: number
    utilities: number
    internet: number
    insurance: number
    repairs: number
  }
  vehicle: {
    totalKm: number
    businessKm: number
    fuel: number
    insurance: number
    maintenance: number
    lease: number
  }
  equipment: {
    computers: number
    software: number
    furniture: number
    tools: number
    ccaClass: string // Capital Cost Allowance class
  }
  professional: {
    courses: number
    conferences: number
    certifications: number
    memberships: number
  }
  other: {
    advertising: number
    officeSupplies: number
    travel: number
    meals: number
    bankCharges: number
  }
}

export interface ExpenseSummary {
  totalExpenses: number
  deductibleAmount: number
  ccaDeduction: number
  rrspImpact: number
  recommendations: string[]
}

// NEW: Integration Types
export interface AccountingSoftwareImport {
  source: "quickbooks" | "xero" | "sage" | "manual"
  data: {
    income: number
    expenses: BusinessExpenses
    assets: any[]
    liabilities: any[]
  }
  importDate: Date
  validationErrors: string[]
}

export interface TaxRateUpdate {
  rateType: "federal-bracket" | "provincial-bracket" | "cpp-rate" | "ei-rate" | "basic-personal-amount"
  province?: string
  effectiveDate: Date
  oldValue: number
  newValue: number
  impactAnalysis: string
}

// NEW: Optimization Engine Types
export interface TaxOptimizationRecommendation {
  id: string
  category: "income-splitting" | "expense-optimization" | "timing" | "structure" | "investment"
  title: string
  description: string
  potentialSavings: number
  implementationDifficulty: "easy" | "medium" | "complex"
  timeframe: "immediate" | "this-year" | "long-term"
  steps: string[]
  riskLevel: "low" | "medium" | "high"
  prerequisites: string[]
}

export interface OptimizationAnalysis {
  currentTaxBurden: number
  optimizedTaxBurden: number
  totalPotentialSavings: number
  recommendations: TaxOptimizationRecommendation[]
  implementationPriority: "high" | "medium" | "low"
}

// NEW: Quarterly Planning Types
export interface QuarterlyEstimate {
  quarter: 1 | 2 | 3 | 4
  estimatedIncome: number
  estimatedTax: number
  dueDate: Date
  paymentRequired: number
  gstHstCollected: number
  gstHstRemittable: number
}

export interface QuarterlyPlan {
  year: number
  estimates: QuarterlyEstimate[]
  annualProjection: number
  recommendedPayments: number
  cashFlowImpact: number
}

// Enhanced calculator interfaces
export interface EnhancedCalculatorInputs extends CalculatorInputs {
  // Multi-year projection
  projectionAssumptions?: ProjectionAssumptions
  
  // Family and income splitting
  familyMembers?: FamilyMember[]
  incomeSplittingEnabled?: boolean
  
  // TOSI compliance
  tosICheckEnabled?: boolean
  
  // Passive income
  passiveIncome?: PassiveIncomeData
  
  // Enhanced expenses
  detailedExpenses?: BusinessExpenses
  
  // CDA tracking
  cdaData?: CDAData
  
  // Optimization
  optimizationEnabled?: boolean
  
  // Quarterly planning
  quarterlyPlanning?: boolean
}

export interface EnhancedComparisonResult extends ComparisonResult {
  // Multi-year projections
  multiYearProjection?: MultiYearProjection
  
  // Income splitting
  incomeSplittingScenario?: IncomeSplittingScenario
  
  // TOSI analysis
  tosIAnalysis?: TOSIAnalysis
  
  // Passive income impact
  passiveIncomeImpact?: PassiveIncomeImpact
  
  // Expense summary
  expenseSummary?: ExpenseSummary
  
  // CDA data
  cdaData?: CDAData
  
  // Optimization recommendations
  optimizationAnalysis?: OptimizationAnalysis
  
  // Quarterly plan
  quarterlyPlan?: QuarterlyPlan
}
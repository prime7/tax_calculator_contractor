/**
 * Canada Pension Plan (CPP) Constants for 2026
 *
 * Key changes from 2024:
 * - Max pensionable earnings increased to $71,300 (from $68,500)
 * - Max employee contribution: $4,230.45 (from $3,867.50)
 * - Max self-employed contribution: $8,460.90 (from $7,735.00)
 *
 * Source: Canada Revenue Agency (CRA)
 * https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp.html
 */

export const CPP_2026 = {
  year: 2026,

  // Maximum pensionable earnings for the year
  maxPensionableEarnings: 71300, // Up from $68,500 in 2024

  // Basic exemption amount (unchanged)
  basicExemption: 3500,

  // Contribution rates
  employeeRate: 0.0595, // 5.95% (unchanged)
  employerRate: 0.0595, // 5.95% (unchanged)
  selfEmployedRate: 0.119, // 11.9% (employee + employer)

  // Maximum contributions
  maxEmployeeContribution: 4230.45, // Up from $3,867.50
  maxEmployerContribution: 4230.45,
  maxSelfEmployedContribution: 8460.9, // Up from $7,735.00
}

// Export individual constants for backward compatibility
export const CPP_MAX_PENSIONABLE_EARNINGS_2026 = CPP_2026.maxPensionableEarnings
export const CPP_BASIC_EXEMPTION_2026 = CPP_2026.basicExemption
export const CPP_RATE_2026 = CPP_2026.employeeRate
export const CPP_MAX_CONTRIBUTION_2026 = CPP_2026.maxEmployeeContribution

/**
 * Employment Insurance (EI) Constants for 2026
 *
 * NEW FEATURE: EI calculations for both employees (corp) and self-employed (optional)
 *
 * Key Points:
 * - Quebec has different rates (QPIP - Quebec Parental Insurance Plan)
 * - Self-employed can opt-in for special benefits (maternity, parental, etc.)
 * - Employers pay 1.4x the employee premium
 *
 * Source: Canada Revenue Agency (CRA)
 * https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei.html
 */

export const EI_2026 = {
  year: 2026,

  // Premium rates
  employeePremiumRate: 0.0164, // 1.64% for all provinces except Quebec
  employeePremiumRateQC: 0.013, // 1.30% for Quebec (lower due to QPIP)

  // Employer premium is 1.4x employee premium
  employerMultiplier: 1.4,

  // Maximum insurable earnings
  maxInsurableEarnings: 68900, // Up from $63,200 in 2024

  // Maximum premiums
  maxEmployeePremium: 1130.16, // $68,900 × 1.64%
  maxEmployeePremiumQC: 895.7, // $68,900 × 1.30%
  maxEmployerPremium: 1582.22, // $68,900 × 1.64% × 1.4
  maxEmployerPremiumQC: 1253.98, // $68,900 × 1.30% × 1.4

  // Self-employed enrollment
  selfEmployedEnrollment: {
    isOptional: true,
    benefits: [
      "Maternity benefits",
      "Parental benefits",
      "Sickness benefits",
      "Compassionate care benefits",
      "Family caregiver benefits",
    ],
    note: "Self-employed do NOT pay employer portion, only employee rate",
  },
}

// Export individual constants for easier imports
export const EI_EMPLOYEE_RATE_2026 = EI_2026.employeePremiumRate
export const EI_EMPLOYEE_RATE_QC_2026 = EI_2026.employeePremiumRateQC
export const EI_EMPLOYER_MULTIPLIER_2026 = EI_2026.employerMultiplier
export const EI_MAX_INSURABLE_2026 = EI_2026.maxInsurableEarnings
export const EI_MAX_EMPLOYEE_PREMIUM_2026 = EI_2026.maxEmployeePremium
export const EI_MAX_EMPLOYEE_PREMIUM_QC_2026 = EI_2026.maxEmployeePremiumQC

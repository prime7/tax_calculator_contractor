import type { EIPremiums } from "../types"
import { EI_2026 } from "../tax-data/ei-2026"

/**
 * Calculate Employment Insurance (EI) premiums for employees in a corporation
 *
 * Employees pay EI on their salary (up to max insurable earnings)
 * Employers pay 1.4x the employee premium
 * Quebec has different rates due to QPIP
 *
 * @param salary - Annual salary paid to employee
 * @param province - Province code (needed for Quebec rates)
 * @returns EI premiums breakdown
 *
 * Source: CRA EI Premium Rates and Maximum
 * https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html
 */
export function calculateEmployeeEI(salary: number, province: string): EIPremiums {
  const isQuebec = province === "QC"
  const rate = isQuebec ? EI_2026.employeePremiumRateQC : EI_2026.employeePremiumRate

  // Calculate insurable earnings (capped at max)
  const insurable = Math.min(salary, EI_2026.maxInsurableEarnings)

  // Calculate employee premium
  const employeePremium = Math.min(
    insurable * rate,
    isQuebec ? EI_2026.maxEmployeePremiumQC : EI_2026.maxEmployeePremium,
  )

  // Calculate employer premium (1.4x employee premium)
  const employerPremium = employeePremium * EI_2026.employerMultiplier

  return {
    employeePremium,
    employerPremium,
    totalPremium: employeePremium + employerPremium,
    isEnrolled: true,
    province,
  }
}

/**
 * Calculate Employment Insurance (EI) premiums for self-employed individuals
 *
 * Self-employed individuals can OPT-IN to EI for special benefits:
 * - Maternity benefits
 * - Parental benefits
 * - Sickness benefits
 * - Compassionate care benefits
 * - Family caregiver benefits
 *
 * Self-employed do NOT pay the employer portion (only employee rate)
 * Self-employed do NOT get regular EI (job loss) benefits
 *
 * @param income - Annual self-employment income
 * @param enrolled - Whether self-employed has opted into EI
 * @param province - Province code (needed for Quebec rates)
 * @returns EI premiums breakdown
 *
 * Source: CRA - EI for Self-Employed People
 * https://www.canada.ca/en/services/benefits/ei/ei-self-employed-workers.html
 */
export function calculateSelfEmployedEI(
  income: number,
  enrolled: boolean,
  province: string,
): EIPremiums {
  if (!enrolled) {
    return {
      employeePremium: 0,
      employerPremium: 0,
      totalPremium: 0,
      isEnrolled: false,
      province,
    }
  }

  const isQuebec = province === "QC"
  const rate = isQuebec ? EI_2026.employeePremiumRateQC : EI_2026.employeePremiumRate

  // Calculate insurable earnings (capped at max)
  const insurable = Math.min(income, EI_2026.maxInsurableEarnings)

  // Calculate premium (only employee rate, no employer portion)
  const premium = Math.min(
    insurable * rate,
    isQuebec ? EI_2026.maxEmployeePremiumQC : EI_2026.maxEmployeePremium,
  )

  return {
    employeePremium: premium,
    employerPremium: 0, // Self-employed don't pay employer portion
    totalPremium: premium,
    isEnrolled: true,
    province,
  }
}

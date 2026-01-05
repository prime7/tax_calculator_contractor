import type { InstallmentSchedule, QuarterlyInstallment } from "../types"

/**
 * CRA threshold for requiring quarterly installments
 * You must pay installments if:
 * 1. Your net tax owing this year is MORE than $3,000 AND
 * 2. Your net tax owing was MORE than $3,000 in either of the previous 2 years
 *
 * Source: CRA - Paying your income tax by instalments
 * https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/making-payments-individuals/paying-your-income-tax-instalments.html
 */
const INSTALLMENT_THRESHOLD = 3000

/**
 * Quarterly installment due dates for 2026
 */
const QUARTERLY_DUE_DATES = [
  "Mar 15, 2026",
  "Jun 15, 2026",
  "Sep 15, 2026",
  "Dec 15, 2026",
]

/**
 * Calculate quarterly tax installment schedule
 *
 * CRA requires quarterly installments if:
 * - Net tax owing this year > $3,000 AND
 * - Net tax owing in either of previous 2 years > $3,000
 *
 * Payments are distributed equally across 4 quarters:
 * - Quarter 1: Due March 15
 * - Quarter 2: Due June 15
 * - Quarter 3: Due September 15
 * - Quarter 4: Due December 15
 *
 * @param federalTax - Annual federal tax owing
 * @param provincialTax - Annual provincial tax owing
 * @param currentYearTaxOwing - Total tax owing this year (may differ from fed+prov if CPP/EI included)
 * @param previousYear1Owing - Tax owing in previous year 1 (default 0 if unknown)
 * @param previousYear2Owing - Tax owing in previous year 2 (default 0 if unknown)
 * @returns Installment schedule with quarterly payments
 */
export function calculateInstallments(
  federalTax: number,
  provincialTax: number,
  currentYearTaxOwing: number,
  previousYear1Owing: number = 0,
  previousYear2Owing: number = 0,
): InstallmentSchedule {
  const totalTax = federalTax + provincialTax

  // Check if installments are required
  const currentYearExceedsThreshold = currentYearTaxOwing > INSTALLMENT_THRESHOLD
  const previousYearExceedsThreshold =
    previousYear1Owing > INSTALLMENT_THRESHOLD || previousYear2Owing > INSTALLMENT_THRESHOLD

  const requiresInstallments = currentYearExceedsThreshold && previousYearExceedsThreshold

  if (!requiresInstallments) {
    return {
      annualTaxOwing: totalTax,
      quarterlyPayments: [],
      requiresInstallments: false,
      previousYearThreshold: Math.max(previousYear1Owing, previousYear2Owing),
    }
  }

  // Calculate quarterly amounts (equal distribution)
  const quarterlyFederal = federalTax / 4
  const quarterlyProvincial = provincialTax / 4

  const quarters: QuarterlyInstallment[] = [1, 2, 3, 4].map((q) => ({
    quarter: q as 1 | 2 | 3 | 4,
    dueDate: QUARTERLY_DUE_DATES[q - 1],
    federalTax: quarterlyFederal,
    provincialTax: quarterlyProvincial,
    totalPayment: quarterlyFederal + quarterlyProvincial,
  }))

  return {
    annualTaxOwing: totalTax,
    quarterlyPayments: quarters,
    requiresInstallments: true,
    previousYearThreshold: Math.max(previousYear1Owing, previousYear2Owing),
  }
}

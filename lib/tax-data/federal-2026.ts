import type { TaxBracket } from "../types"

/**
 * Federal Tax Data for 2026
 *
 * Key changes from 2024:
 * - Lowest bracket reduced from 15% to 14%
 * - All bracket thresholds indexed for inflation
 * - Basic Personal Amount increased to $16,452
 *
 * Source: Canada Revenue Agency (CRA)
 * https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html
 */

export const FEDERAL_BRACKETS_2026: TaxBracket[] = [
  { min: 0, max: 58523, rate: 0.14 }, // 14% (reduced from 15%)
  { min: 58523, max: 117045, rate: 0.205 }, // 20.5%
  { min: 117045, max: 181440, rate: 0.26 }, // 26%
  { min: 181440, max: 258482, rate: 0.29 }, // 29%
  { min: 258482, max: null, rate: 0.33 }, // 33%
]

export const FEDERAL_BASIC_PERSONAL_AMOUNT_2026 = 16452 // Up from $15,705 in 2024
export const FEDERAL_SMALL_BUSINESS_RATE_2026 = 0.09 // 9% (unchanged)

// Dividend taxation for eligible dividends (CCPC)
export const DIVIDEND_GROSS_UP_2026 = 0.38 // 38% gross-up
export const FEDERAL_DIVIDEND_TAX_CREDIT_2026 = 0.150198 // Federal credit rate

/**
 * Registered Retirement Savings Plan (RRSP) Constants for 2026
 *
 * Key changes from 2024:
 * - Annual maximum increased to $33,810 (from $31,560)
 * - Contribution rate remains 18% of earned income
 *
 * Source: Canada Revenue Agency (CRA)
 * https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp.html
 */

export const RRSP_2026 = {
  year: 2026,

  // Contribution rate as percentage of earned income
  contributionRate: 0.18, // 18% (unchanged)

  // Maximum annual contribution limit
  annualMaximum: 33810, // Up from $31,560 in 2024

  // Notes
  notes: {
    earnedIncome: "Includes employment income, self-employment income, rental income, and certain other types of income",
    carryForward: "Unused RRSP contribution room can be carried forward indefinitely",
    deductionYear: "Contributions can be deducted in the year made or carried forward to future years",
  },
}

// Export individual constants for easier imports
export const RRSP_RATE_2026 = RRSP_2026.contributionRate
export const RRSP_MAX_2026 = RRSP_2026.annualMaximum

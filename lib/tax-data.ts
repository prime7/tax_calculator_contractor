/**
 * Main Tax Data File
 *
 * UPDATED FOR 2026 TAX YEAR
 *
 * Key Changes from 2025 to 2026:
 * - Federal lowest bracket reduced from 15% to 14%
 * - CPP max earnings increased to $71,300
 * - EI max insurable earnings increased to $68,900
 * - RRSP max increased to $33,810
 * - All provincial brackets indexed for inflation (~2%)
 */

import type { Province, TaxBracket } from "./types"

// === TAX YEAR ===
export const TAX_YEAR = 2026

// === FEDERAL TAX DATA 2026 ===
export const FEDERAL_BRACKETS: TaxBracket[] = [
  { min: 0, max: 58523, rate: 0.14 }, // 14% (reduced from 15%)
  { min: 58523, max: 117045, rate: 0.205 },
  { min: 117045, max: 181440, rate: 0.26 },
  { min: 181440, max: 258482, rate: 0.29 },
  { min: 258482, max: null, rate: 0.33 },
]

export const FEDERAL_BASIC_PERSONAL_AMOUNT = 16452 // Up from $14,398 (2025)
export const FEDERAL_SMALL_BUSINESS_RATE = 0.09
export const QUEBEC_ABATEMENT = 0.165 // 16.5% reduction in federal tax for Quebec

// === CPP/QPP CONSTANTS 2026 ===
export const CPP_MAX_PENSIONABLE_EARNINGS = 71300 // Up from $66,600 (2025)
export const CPP_BASIC_EXEMPTION = 3500
export const CPP_RATE = 0.0595
export const CPP_MAX_CONTRIBUTION = 4230.45 // Employee portion
export const CPP_MAX_SELF_EMPLOYED = 8460.9 // Self-employed (2x employee)

// QPP Constants 2026 (Quebec Pension Plan)
export const QPP_MAX_PENSIONABLE_EARNINGS = 71300
export const QPP_BASIC_EXEMPTION = 3500
export const QPP_RATE = 0.064
export const QPP_MAX_CONTRIBUTION = 4339.2

// === QPIP CONSTANTS 2026 (Quebec Parental Insurance Plan) ===
export const QPIP_MAX_INSURABLE_EARNINGS = 96500 // Up from $94,000 (2025)
export const QPIP_EMPLOYEE_RATE = 0.00494
export const QPIP_EMPLOYER_RATE = 0.00692
export const QPIP_SELF_EMPLOYED_RATE = 0.00878

// === EI CONSTANTS 2026 (Employment Insurance) ===
export const EI_MAX_INSURABLE_EARNINGS = 68900 // Up from $61,500 (2025)
export const EI_EMPLOYEE_RATE = 0.0164 // 1.64%
export const EI_EMPLOYER_RATE = 0.02296 // 1.4x employee rate
export const EI_MAX_EMPLOYEE_CONTRIBUTION = 1130.16
export const EI_MAX_EMPLOYER_CONTRIBUTION = 1582.22
// Quebec has reduced EI rates (no EI for parental benefits, covered by QPIP)
export const EI_QUEBEC_EMPLOYEE_RATE = 0.013 // 1.30%
export const EI_QUEBEC_EMPLOYER_RATE = 0.0182 // 1.4x employee rate

// === RRSP CONSTANTS 2026 ===
export const RRSP_RATE = 0.18
export const RRSP_MAX = 33810 // Up from $31,560 (2025)

// === SMALL BUSINESS DEDUCTION ===
export const SBD_LIMIT = 500000
export const GENERAL_CORP_RATE = 0.265 // Combined federal + provincial average for income over SBD limit

// === DIVIDEND TAX CONSTANTS ===
// Eligible dividends (from public corps or CCPCs with general rate income)
export const ELIGIBLE_DIVIDEND_GROSS_UP = 0.38
export const ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT = 0.150198

// Non-eligible dividends (from CCPCs with small business rate income)
export const NON_ELIGIBLE_DIVIDEND_GROSS_UP = 0.15
export const NON_ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT = 0.090301

// === ONTARIO HEALTH PREMIUM 2026 ===
export const ONTARIO_HEALTH_PREMIUM_BRACKETS = [
  { min: 0, max: 20000, amount: 0, rate: 0 },
  { min: 20000, max: 25000, amount: 0, rate: 0.06 }, // $0-$300
  { min: 25000, max: 36000, amount: 300, rate: 0.06 }, // $300-$450
  { min: 36000, max: 48000, amount: 450, rate: 0.25 }, // $450-$600
  { min: 48000, max: 72000, amount: 600, rate: 0.25 }, // $600-$750
  { min: 72000, max: 200000, amount: 750, rate: 0.25 }, // $750-$900
  { min: 200000, max: null, amount: 900, rate: 0 }, // $900 flat
]

// === PROVINCIAL DATA 2026 ===
export const PROVINCES: Province[] = [
  {
    code: "AB",
    name: "Alberta",
    personalBrackets: [
      { min: 0, max: 151234, rate: 0.1 },
      { min: 151234, max: 181481, rate: 0.12 },
      { min: 181481, max: 241975, rate: 0.13 },
      { min: 241975, max: 362963, rate: 0.14 },
      { min: 362963, max: null, rate: 0.15 },
    ],
    basicPersonalAmount: 22326,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.0812,
    nonEligibleDividendTaxCredit: 0.0218,
  },
  {
    code: "BC",
    name: "British Columbia",
    personalBrackets: [
      { min: 0, max: 48896, rate: 0.0506 },
      { min: 48896, max: 97792, rate: 0.077 },
      { min: 97792, max: 112317, rate: 0.105 },
      { min: 112317, max: 136337, rate: 0.1229 },
      { min: 136337, max: 184857, rate: 0.147 },
      { min: 184857, max: 257808, rate: 0.168 },
      { min: 257808, max: null, rate: 0.205 },
    ],
    basicPersonalAmount: 12832,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.1,
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "SK",
    name: "Saskatchewan",
    personalBrackets: [
      { min: 0, max: 53098, rate: 0.105 },
      { min: 53098, max: 151711, rate: 0.125 },
      { min: 151711, max: null, rate: 0.145 },
    ],
    basicPersonalAmount: 18014,
    smallBusinessRate: 0.01,
    combinedCorpRate: 0.1,
    dividendTaxCredit: 0.0837,
    nonEligibleDividendTaxCredit: 0.0294,
  },
  {
    code: "MB",
    name: "Manitoba",
    personalBrackets: [
      { min: 0, max: 47940, rate: 0.108 },
      { min: 47940, max: 102000, rate: 0.1275 },
      { min: 102000, max: null, rate: 0.174 },
    ],
    basicPersonalAmount: 15300,
    smallBusinessRate: 0.0,
    combinedCorpRate: 0.09,
    dividendTaxCredit: 0.08,
    nonEligibleDividendTaxCredit: 0.0008,
  },
  {
    code: "ON",
    name: "Ontario",
    personalBrackets: [
      { min: 0, max: 52475, rate: 0.0505 },
      { min: 52475, max: 104951, rate: 0.0915 },
      { min: 104951, max: 153000, rate: 0.1116 },
      { min: 153000, max: 224400, rate: 0.1216 },
      { min: 224400, max: null, rate: 0.1316 },
    ],
    basicPersonalAmount: 12102,
    smallBusinessRate: 0.032,
    combinedCorpRate: 0.122,
    dividendTaxCredit: 0.1,
    nonEligibleDividendTaxCredit: 0.029863,
    hasHealthPremium: true,
  },
  {
    code: "QC",
    name: "Quebec",
    personalBrackets: [
      { min: 0, max: 52816, rate: 0.14 },
      { min: 52816, max: 105616, rate: 0.19 },
      { min: 105616, max: 128528, rate: 0.24 },
      { min: 128528, max: null, rate: 0.2575 },
    ],
    basicPersonalAmount: 18417,
    smallBusinessRate: 0.032,
    combinedCorpRate: 0.122,
    dividendTaxCredit: 0.1178,
    nonEligibleDividendTaxCredit: 0.0404,
    isQuebec: true,
  },
  {
    code: "NB",
    name: "New Brunswick",
    personalBrackets: [
      { min: 0, max: 50958, rate: 0.094 },
      { min: 50958, max: 101915, rate: 0.14 },
      { min: 101915, max: 188765, rate: 0.16 },
      { min: 188765, max: null, rate: 0.195 },
    ],
    basicPersonalAmount: 13305,
    smallBusinessRate: 0.025,
    combinedCorpRate: 0.115,
    dividendTaxCredit: 0.064,
    nonEligibleDividendTaxCredit: 0.0275,
  },
  {
    code: "NS",
    name: "Nova Scotia",
    personalBrackets: [
      { min: 0, max: 30182, rate: 0.0879 },
      { min: 30182, max: 60363, rate: 0.1495 },
      { min: 60363, max: 94860, rate: 0.1667 },
      { min: 94860, max: 153000, rate: 0.175 },
      { min: 153000, max: null, rate: 0.21 },
    ],
    basicPersonalAmount: 11979,
    smallBusinessRate: 0.025,
    combinedCorpRate: 0.115,
    dividendTaxCredit: 0.0885,
    nonEligibleDividendTaxCredit: 0.0299,
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    personalBrackets: [
      { min: 0, max: 33309, rate: 0.098 },
      { min: 33309, max: 65599, rate: 0.138 },
      { min: 65599, max: 107100, rate: 0.167 },
      { min: 107100, max: null, rate: 0.18 },
    ],
    basicPersonalAmount: 13770,
    smallBusinessRate: 0.01,
    combinedCorpRate: 0.1,
    dividendTaxCredit: 0.078,
    nonEligibleDividendTaxCredit: 0.0291,
  },
  {
    code: "NL",
    name: "Newfoundland & Labrador",
    personalBrackets: [
      { min: 0, max: 44062, rate: 0.087 },
      { min: 44062, max: 88123, rate: 0.145 },
      { min: 88123, max: 157329, rate: 0.158 },
      { min: 157329, max: 220262, rate: 0.173 },
      { min: 220262, max: 281387, rate: 0.183 },
      { min: 281387, max: 562774, rate: 0.193 },
      { min: 562774, max: 1125548, rate: 0.203 },
      { min: 1125548, max: null, rate: 0.213 },
    ],
    basicPersonalAmount: 10590,
    smallBusinessRate: 0.03,
    combinedCorpRate: 0.12,
    dividendTaxCredit: 0.054,
    nonEligibleDividendTaxCredit: 0.0256,
  },
  {
    code: "YT",
    name: "Yukon",
    personalBrackets: [
      { min: 0, max: 56985, rate: 0.064 },
      { min: 56985, max: 113968, rate: 0.09 },
      { min: 113968, max: 176669, rate: 0.109 },
      { min: 176669, max: 510000, rate: 0.128 },
      { min: 510000, max: null, rate: 0.15 },
    ],
    basicPersonalAmount: 16019,
    smallBusinessRate: 0.0,
    combinedCorpRate: 0.09,
    dividendTaxCredit: 0.1102,
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "NT",
    name: "Northwest Territories",
    personalBrackets: [
      { min: 0, max: 51609, rate: 0.059 },
      { min: 51609, max: 103222, rate: 0.086 },
      { min: 103222, max: 167816, rate: 0.122 },
      { min: 167816, max: null, rate: 0.1405 },
    ],
    basicPersonalAmount: 16925,
    smallBusinessRate: 0.04,
    combinedCorpRate: 0.13,
    dividendTaxCredit: 0.115,
    nonEligibleDividendTaxCredit: 0.06,
  },
  {
    code: "NU",
    name: "Nunavut",
    personalBrackets: [
      { min: 0, max: 54333, rate: 0.04 },
      { min: 54333, max: 108668, rate: 0.07 },
      { min: 108668, max: 176669, rate: 0.09 },
      { min: 176669, max: null, rate: 0.115 },
    ],
    basicPersonalAmount: 19142,
    smallBusinessRate: 0.03,
    combinedCorpRate: 0.12,
    dividendTaxCredit: 0.115,
    nonEligibleDividendTaxCredit: 0.0551,
  },
]

// Helper function to get province by code
export function getProvinceByCode(code: string): Province | undefined {
  return PROVINCES.find((p) => p.code === code)
}

// === GST/HST DATA 2026 (Phase 2 - for future use) ===
export { GST_HST_2026, getProvinceGSTHST } from "./tax-data/gst-hst-2026"

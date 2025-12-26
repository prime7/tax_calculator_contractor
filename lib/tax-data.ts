import type { Province, TaxBracket } from "./base-types"

// Federal tax brackets 2025
export const FEDERAL_BRACKETS: TaxBracket[] = [
  { min: 0, max: 53359, rate: 0.15 },
  { min: 53359, max: 106717, rate: 0.205 },
  { min: 106717, max: 165430, rate: 0.26 },
  { min: 165430, max: 235675, rate: 0.29 },
  { min: 235675, max: null, rate: 0.33 },
]

export const FEDERAL_BASIC_PERSONAL_AMOUNT = 14398
export const FEDERAL_SMALL_BUSINESS_RATE = 0.09
export const QUEBEC_ABATEMENT = 0.165 // 16.5% reduction in federal tax for Quebec

// CPP Constants 2025
export const CPP_MAX_PENSIONABLE_EARNINGS = 66600
export const CPP_BASIC_EXEMPTION = 3500
export const CPP_RATE = 0.0595
export const CPP_MAX_CONTRIBUTION = 3500

// QPP Constants 2025 (Quebec Pension Plan)
export const QPP_MAX_PENSIONABLE_EARNINGS = 66600
export const QPP_BASIC_EXEMPTION = 3500
export const QPP_RATE = 0.064
export const QPP_MAX_CONTRIBUTION = 4038.4

// QPIP Constants 2024 (Quebec Parental Insurance Plan)
export const QPIP_MAX_INSURABLE_EARNINGS = 94000
export const QPIP_EMPLOYEE_RATE = 0.00494
export const QPIP_EMPLOYER_RATE = 0.00692
export const QPIP_SELF_EMPLOYED_RATE = 0.00878

// EI Constants 2025 (Employment Insurance)
export const EI_MAX_INSURABLE_EARNINGS = 61500
export const EI_EMPLOYEE_RATE = 0.0163
export const EI_EMPLOYER_RATE = 0.02282
export const EI_MAX_EMPLOYEE_CONTRIBUTION = 1002.45
export const EI_MAX_EMPLOYER_CONTRIBUTION = 1403.43
// Quebec has reduced EI rates (no EI for parental benefits, covered by QPIP)
export const EI_QUEBEC_EMPLOYEE_RATE = 0.0132
export const EI_QUEBEC_EMPLOYER_RATE = 0.01848

// RRSP Constants 2025
export const RRSP_RATE = 0.18
export const RRSP_MAX = 31560

// Small Business Deduction Limit
export const SBD_LIMIT = 500000
export const GENERAL_CORP_RATE = 0.265 // Combined federal + provincial average for income over SBD limit

// Dividend gross-up and federal credits
// Eligible dividends (from public corps or CCPCs with general rate income)
export const ELIGIBLE_DIVIDEND_GROSS_UP = 0.38
export const ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT = 0.150198

// Non-eligible dividends (from CCPCs with small business rate income)
export const NON_ELIGIBLE_DIVIDEND_GROSS_UP = 0.15
export const NON_ELIGIBLE_FEDERAL_DIVIDEND_TAX_CREDIT = 0.090301

// Ontario Health Premium 2025 (indexed)
export const ONTARIO_HEALTH_PREMIUM_BRACKETS = [
  { min: 0, max: 20000, amount: 0 },
  { min: 20000, max: 25000, amount: 0, rate: 0.06 }, // $0-$300
  { min: 25000, max: 36000, amount: 300, rate: 0.06 }, // $300-$450
  { min: 36000, max: 48000, amount: 450, rate: 0.25 }, // $450-$600
  { min: 48000, max: 72000, amount: 600, rate: 0.25 }, // $600-$750
  { min: 72000, max: 200000, amount: 750, rate: 0.25 }, // $750-$900
  { min: 200000, max: null, amount: 900, rate: 0 }, // $900 flat
]

export const PROVINCES: Province[] = [
  {
    code: "AB",
    name: "Alberta",
    personalBrackets: [
      { min: 0, max: 148269, rate: 0.1 },
      { min: 148269, max: 177922, rate: 0.12 },
      { min: 177922, max: 237230, rate: 0.13 },
      { min: 237230, max: 355845, rate: 0.14 },
      { min: 355845, max: null, rate: 0.15 },
    ],
    basicPersonalAmount: 21181,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.0812,
    nonEligibleDividendTaxCredit: 0.0218,
  },
  {
    code: "BC",
    name: "British Columbia",
    personalBrackets: [
      { min: 0, max: 47937, rate: 0.0506 },
      { min: 47937, max: 95875, rate: 0.077 },
      { min: 95875, max: 110076, rate: 0.105 },
      { min: 110076, max: 133664, rate: 0.1229 },
      { min: 133664, max: 181232, rate: 0.147 },
      { min: 181232, max: 252752, rate: 0.168 },
      { min: 252752, max: null, rate: 0.205 },
    ],
    basicPersonalAmount: 12181,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.1,
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "SK",
    name: "Saskatchewan",
    personalBrackets: [
      { min: 0, max: 52057, rate: 0.105 },
      { min: 52057, max: 148734, rate: 0.125 },
      { min: 148734, max: null, rate: 0.145 },
    ],
    basicPersonalAmount: 17081,
    smallBusinessRate: 0.01,
    combinedCorpRate: 0.1,
    dividendTaxCredit: 0.0837,
    nonEligibleDividendTaxCredit: 0.0294,
  },
  {
    code: "MB",
    name: "Manitoba",
    personalBrackets: [
      { min: 0, max: 47000, rate: 0.108 },
      { min: 47000, max: 100000, rate: 0.1275 },
      { min: 100000, max: null, rate: 0.174 },
    ],
    basicPersonalAmount: 15000,
    smallBusinessRate: 0.0,
    combinedCorpRate: 0.09,
    dividendTaxCredit: 0.08,
    nonEligibleDividendTaxCredit: 0.0008,
  },
  {
    code: "ON",
    name: "Ontario",
    personalBrackets: [
      { min: 0, max: 49231, rate: 0.0505 },
      { min: 49231, max: 98463, rate: 0.0915 },
      { min: 98463, max: 150000, rate: 0.1116 },
      { min: 150000, max: 220000, rate: 0.1216 },
      { min: 220000, max: null, rate: 0.1316 },
    ],
    basicPersonalAmount: 11481,
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
      { min: 0, max: 51780, rate: 0.14 },
      { min: 51780, max: 103545, rate: 0.19 },
      { min: 103545, max: 126000, rate: 0.24 },
      { min: 126000, max: null, rate: 0.2575 },
    ],
    basicPersonalAmount: 17481,
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
      { min: 0, max: 49958, rate: 0.094 },
      { min: 49958, max: 99916, rate: 0.14 },
      { min: 99916, max: 185064, rate: 0.16 },
      { min: 185064, max: null, rate: 0.195 },
    ],
    basicPersonalAmount: 13044,
    smallBusinessRate: 0.025,
    combinedCorpRate: 0.115,
    dividendTaxCredit: 0.064,
    nonEligibleDividendTaxCredit: 0.0275,
  },
  {
    code: "NS",
    name: "Nova Scotia",
    personalBrackets: [
      { min: 0, max: 29590, rate: 0.0879 },
      { min: 29590, max: 59180, rate: 0.1495 },
      { min: 59180, max: 93000, rate: 0.1667 },
      { min: 93000, max: 150000, rate: 0.175 },
      { min: 150000, max: null, rate: 0.21 },
    ],
    basicPersonalAmount: 11744,
    smallBusinessRate: 0.025,
    combinedCorpRate: 0.115,
    dividendTaxCredit: 0.0885,
    nonEligibleDividendTaxCredit: 0.0299,
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    personalBrackets: [
      { min: 0, max: 32656, rate: 0.098 },
      { min: 32656, max: 64313, rate: 0.138 },
      { min: 64313, max: 105000, rate: 0.167 },
      { min: 105000, max: null, rate: 0.18 },
    ],
    basicPersonalAmount: 13500,
    smallBusinessRate: 0.01,
    combinedCorpRate: 0.1,
    dividendTaxCredit: 0.078,
    nonEligibleDividendTaxCredit: 0.0291,
  },
  {
    code: "NL",
    name: "Newfoundland & Labrador",
    personalBrackets: [
      { min: 0, max: 43198, rate: 0.087 },
      { min: 43198, max: 86395, rate: 0.145 },
      { min: 86395, max: 154244, rate: 0.158 },
      { min: 154244, max: 215943, rate: 0.173 },
      { min: 215943, max: 275870, rate: 0.183 },
      { min: 275870, max: 551739, rate: 0.193 },
      { min: 551739, max: 1103478, rate: 0.203 },
      { min: 1103478, max: null, rate: 0.213 },
    ],
    basicPersonalAmount: 10382,
    smallBusinessRate: 0.03,
    combinedCorpRate: 0.12,
    dividendTaxCredit: 0.054,
    nonEligibleDividendTaxCredit: 0.0256,
  },
  {
    code: "YT",
    name: "Yukon",
    personalBrackets: [
      { min: 0, max: 55867, rate: 0.064 },
      { min: 55867, max: 111733, rate: 0.09 },
      { min: 111733, max: 173205, rate: 0.109 },
      { min: 173205, max: 500000, rate: 0.128 },
      { min: 500000, max: null, rate: 0.15 },
    ],
    basicPersonalAmount: 15705,
    smallBusinessRate: 0.0,
    combinedCorpRate: 0.09,
    dividendTaxCredit: 0.1102,
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "NT",
    name: "Northwest Territories",
    personalBrackets: [
      { min: 0, max: 50597, rate: 0.059 },
      { min: 50597, max: 101198, rate: 0.086 },
      { min: 101198, max: 164525, rate: 0.122 },
      { min: 164525, max: null, rate: 0.1405 },
    ],
    basicPersonalAmount: 16593,
    smallBusinessRate: 0.04,
    combinedCorpRate: 0.13,
    dividendTaxCredit: 0.115,
    nonEligibleDividendTaxCredit: 0.06,
  },
  {
    code: "NU",
    name: "Nunavut",
    personalBrackets: [
      { min: 0, max: 53268, rate: 0.04 },
      { min: 53268, max: 106537, rate: 0.07 },
      { min: 106537, max: 173205, rate: 0.09 },
      { min: 173205, max: null, rate: 0.115 },
    ],
    basicPersonalAmount: 18767,
    smallBusinessRate: 0.03,
    combinedCorpRate: 0.12,
    dividendTaxCredit: 0.115,
    nonEligibleDividendTaxCredit: 0.0551,
  },
]

export function getProvinceByCode(code: string): Province | undefined {
  return PROVINCES.find((p) => p.code === code)
}

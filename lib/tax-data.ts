import type { Province, TaxBracket } from "./types"

// Federal tax brackets 2024
export const FEDERAL_BRACKETS: TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: null, rate: 0.33 },
]

export const FEDERAL_BASIC_PERSONAL_AMOUNT = 15705
export const FEDERAL_SMALL_BUSINESS_RATE = 0.09

// CPP Constants 2024
export const CPP_MAX_PENSIONABLE_EARNINGS = 68500
export const CPP_BASIC_EXEMPTION = 3500
export const CPP_RATE = 0.0595
export const CPP_MAX_CONTRIBUTION = 3867.5

// RRSP Constants 2024
export const RRSP_RATE = 0.18
export const RRSP_MAX = 31560

// Dividend gross-up and federal credit
export const DIVIDEND_GROSS_UP = 0.38
export const FEDERAL_DIVIDEND_TAX_CREDIT = 0.150198

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
    basicPersonalAmount: 21885,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.0812,
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
    basicPersonalAmount: 12580,
    smallBusinessRate: 0.02,
    combinedCorpRate: 0.11,
    dividendTaxCredit: 0.1,
  },
  {
    code: "SK",
    name: "Saskatchewan",
    personalBrackets: [
      { min: 0, max: 52057, rate: 0.105 },
      { min: 52057, max: 148734, rate: 0.125 },
      { min: 148734, max: null, rate: 0.145 },
    ],
    basicPersonalAmount: 17661,
    smallBusinessRate: 0.01,
    combinedCorpRate: 0.1,
    dividendTaxCredit: 0.0837,
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
  },
  {
    code: "ON",
    name: "Ontario",
    personalBrackets: [
      { min: 0, max: 51446, rate: 0.0505 },
      { min: 51446, max: 102894, rate: 0.0915 },
      { min: 102894, max: 150000, rate: 0.1116 },
      { min: 150000, max: 220000, rate: 0.1216 },
      { min: 220000, max: null, rate: 0.1316 },
    ],
    basicPersonalAmount: 11865,
    smallBusinessRate: 0.032,
    combinedCorpRate: 0.122,
    dividendTaxCredit: 0.1,
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
    basicPersonalAmount: 18056,
    smallBusinessRate: 0.032,
    combinedCorpRate: 0.122,
    dividendTaxCredit: 0.1178,
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
  },
]

export function getProvinceByCode(code: string): Province | undefined {
  return PROVINCES.find((p) => p.code === code)
}

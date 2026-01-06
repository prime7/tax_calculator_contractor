import type { Province } from "../types"

/**
 * Provincial and Territorial Tax Data for 2026
 *
 * All provinces have been indexed for inflation (~2% increase in thresholds and BPA)
 * Small business rates and dividend tax credits remain largely unchanged
 *
 * Sources:
 * - TaxTips.ca: https://www.taxtips.ca/taxrates/canada.htm
 * - Individual provincial finance ministries
 * - CRA Provincial Tax Information
 */

export const PROVINCES_2026: Province[] = [
  {
    code: "AB",
    name: "Alberta",
    personalBrackets: [
      { min: 0, max: 151234, rate: 0.1 }, // 10%
      { min: 151234, max: 181481, rate: 0.12 }, // 12%
      { min: 181481, max: 241975, rate: 0.13 }, // 13%
      { min: 241975, max: 362963, rate: 0.14 }, // 14%
      { min: 362963, max: null, rate: 0.15 }, // 15%
    ],
    basicPersonalAmount: 22326, // Up from $21,885 (2024) - ~2% indexation
    smallBusinessRate: 0.02, // 2%
    combinedCorpRate: 0.11, // 11% (federal 9% + provincial 2%)
    dividendTaxCredit: 0.0812, // 8.12%
    nonEligibleDividendTaxCredit: 0.0218,
  },
  {
    code: "BC",
    name: "British Columbia",
    personalBrackets: [
      { min: 0, max: 48896, rate: 0.0506 }, // 5.06%
      { min: 48896, max: 97792, rate: 0.077 }, // 7.7%
      { min: 97792, max: 112317, rate: 0.105 }, // 10.5%
      { min: 112317, max: 136337, rate: 0.1229 }, // 12.29%
      { min: 136337, max: 184857, rate: 0.147 }, // 14.7%
      { min: 184857, max: 257808, rate: 0.168 }, // 16.8%
      { min: 257808, max: null, rate: 0.205 }, // 20.5%
    ],
    basicPersonalAmount: 12832, // Up from $12,580 (2024) - ~2% indexation
    smallBusinessRate: 0.02, // 2%
    combinedCorpRate: 0.11, // 11%
    dividendTaxCredit: 0.1, // 10%
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "SK",
    name: "Saskatchewan",
    personalBrackets: [
      { min: 0, max: 53098, rate: 0.105 }, // 10.5%
      { min: 53098, max: 151711, rate: 0.125 }, // 12.5%
      { min: 151711, max: null, rate: 0.145 }, // 14.5%
    ],
    basicPersonalAmount: 18014, // Up from $17,661 (2024) - ~2% indexation
    smallBusinessRate: 0.01, // 1%
    combinedCorpRate: 0.1, // 10%
    dividendTaxCredit: 0.0837, // 8.37%
    nonEligibleDividendTaxCredit: 0.0294,
  },
  {
    code: "MB",
    name: "Manitoba",
    personalBrackets: [
      { min: 0, max: 47940, rate: 0.108 }, // 10.8%
      { min: 47940, max: 102000, rate: 0.1275 }, // 12.75%
      { min: 102000, max: null, rate: 0.174 }, // 17.4%
    ],
    basicPersonalAmount: 15300, // Up from $15,000 (2024) - ~2% indexation
    smallBusinessRate: 0.0, // 0%
    combinedCorpRate: 0.09, // 9%
    dividendTaxCredit: 0.08, // 8%
    nonEligibleDividendTaxCredit: 0.0008,
  },
  {
    code: "ON",
    name: "Ontario",
    personalBrackets: [
      { min: 0, max: 52475, rate: 0.0505 }, // 5.05%
      { min: 52475, max: 104951, rate: 0.0915 }, // 9.15%
      { min: 104951, max: 153000, rate: 0.1116 }, // 11.16%
      { min: 153000, max: 224400, rate: 0.1216 }, // 12.16%
      { min: 224400, max: null, rate: 0.1316 }, // 13.16%
    ],
    basicPersonalAmount: 12102, // Up from $11,865 (2024) - ~2% indexation
    smallBusinessRate: 0.032, // 3.2%
    combinedCorpRate: 0.122, // 12.2%
    dividendTaxCredit: 0.1, // 10%
    nonEligibleDividendTaxCredit: 0.029863,
    hasHealthPremium: true,
  },
  {
    code: "QC",
    name: "Quebec",
    personalBrackets: [
      { min: 0, max: 52816, rate: 0.14 }, // 14%
      { min: 52816, max: 105616, rate: 0.19 }, // 19%
      { min: 105616, max: 128528, rate: 0.24 }, // 24%
      { min: 128528, max: null, rate: 0.2575 }, // 25.75%
    ],
    basicPersonalAmount: 18417, // Up from $18,056 (2024) - ~2% indexation
    smallBusinessRate: 0.032, // 3.2%
    combinedCorpRate: 0.122, // 12.2%
    dividendTaxCredit: 0.1178, // 11.78%
    nonEligibleDividendTaxCredit: 0.0404,
    isQuebec: true,
  },
  {
    code: "NB",
    name: "New Brunswick",
    personalBrackets: [
      { min: 0, max: 50958, rate: 0.094 }, // 9.4%
      { min: 50958, max: 101915, rate: 0.14 }, // 14%
      { min: 101915, max: 188765, rate: 0.16 }, // 16%
      { min: 188765, max: null, rate: 0.195 }, // 19.5%
    ],
    basicPersonalAmount: 13305, // Up from $13,044 (2024) - ~2% indexation
    smallBusinessRate: 0.025, // 2.5%
    combinedCorpRate: 0.115, // 11.5%
    dividendTaxCredit: 0.064, // 6.4%
    nonEligibleDividendTaxCredit: 0.0275,
  },
  {
    code: "NS",
    name: "Nova Scotia",
    personalBrackets: [
      { min: 0, max: 30182, rate: 0.0879 }, // 8.79%
      { min: 30182, max: 60363, rate: 0.1495 }, // 14.95%
      { min: 60363, max: 94860, rate: 0.1667 }, // 16.67%
      { min: 94860, max: 153000, rate: 0.175 }, // 17.5%
      { min: 153000, max: null, rate: 0.21 }, // 21%
    ],
    basicPersonalAmount: 11979, // Up from $11,744 (2024) - ~2% indexation
    smallBusinessRate: 0.025, // 2.5%
    combinedCorpRate: 0.115, // 11.5%
    dividendTaxCredit: 0.0885, // 8.85%
    nonEligibleDividendTaxCredit: 0.0299,
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    personalBrackets: [
      { min: 0, max: 33309, rate: 0.098 }, // 9.8%
      { min: 33309, max: 65599, rate: 0.138 }, // 13.8%
      { min: 65599, max: 107100, rate: 0.167 }, // 16.7%
      { min: 107100, max: null, rate: 0.18 }, // 18%
    ],
    basicPersonalAmount: 13770, // Up from $13,500 (2024) - ~2% indexation
    smallBusinessRate: 0.01, // 1%
    combinedCorpRate: 0.1, // 10%
    dividendTaxCredit: 0.078, // 7.8%
    nonEligibleDividendTaxCredit: 0.0291,
  },
  {
    code: "NL",
    name: "Newfoundland & Labrador",
    personalBrackets: [
      { min: 0, max: 44062, rate: 0.087 }, // 8.7%
      { min: 44062, max: 88123, rate: 0.145 }, // 14.5%
      { min: 88123, max: 157329, rate: 0.158 }, // 15.8%
      { min: 157329, max: 220262, rate: 0.173 }, // 17.3%
      { min: 220262, max: 281387, rate: 0.183 }, // 18.3%
      { min: 281387, max: 562774, rate: 0.193 }, // 19.3%
      { min: 562774, max: 1125548, rate: 0.203 }, // 20.3%
      { min: 1125548, max: null, rate: 0.213 }, // 21.3%
    ],
    basicPersonalAmount: 10590, // Up from $10,382 (2024) - ~2% indexation
    smallBusinessRate: 0.03, // 3%
    combinedCorpRate: 0.12, // 12%
    dividendTaxCredit: 0.054, // 5.4%
    nonEligibleDividendTaxCredit: 0.0256,
  },
  {
    code: "YT",
    name: "Yukon",
    personalBrackets: [
      { min: 0, max: 56985, rate: 0.064 }, // 6.4%
      { min: 56985, max: 113968, rate: 0.09 }, // 9%
      { min: 113968, max: 176669, rate: 0.109 }, // 10.9%
      { min: 176669, max: 510000, rate: 0.128 }, // 12.8%
      { min: 510000, max: null, rate: 0.15 }, // 15%
    ],
    basicPersonalAmount: 16019, // Up from $15,705 (2024) - ~2% indexation
    smallBusinessRate: 0.0, // 0%
    combinedCorpRate: 0.09, // 9%
    dividendTaxCredit: 0.1102, // 11.02%
    nonEligibleDividendTaxCredit: 0.0196,
  },
  {
    code: "NT",
    name: "Northwest Territories",
    personalBrackets: [
      { min: 0, max: 51609, rate: 0.059 }, // 5.9%
      { min: 51609, max: 103222, rate: 0.086 }, // 8.6%
      { min: 103222, max: 167816, rate: 0.122 }, // 12.2%
      { min: 167816, max: null, rate: 0.1405 }, // 14.05%
    ],
    basicPersonalAmount: 16925, // Up from $16,593 (2024) - ~2% indexation
    smallBusinessRate: 0.04, // 4%
    combinedCorpRate: 0.13, // 13%
    dividendTaxCredit: 0.115, // 11.5%
    nonEligibleDividendTaxCredit: 0.06,
  },
  {
    code: "NU",
    name: "Nunavut",
    personalBrackets: [
      { min: 0, max: 54333, rate: 0.04 }, // 4%
      { min: 54333, max: 108668, rate: 0.07 }, // 7%
      { min: 108668, max: 176669, rate: 0.09 }, // 9%
      { min: 176669, max: null, rate: 0.115 }, // 11.5%
    ],
    basicPersonalAmount: 19142, // Up from $18,767 (2024) - ~2% indexation
    smallBusinessRate: 0.03, // 3%
    combinedCorpRate: 0.12, // 12%
    dividendTaxCredit: 0.115, // 11.5%
    nonEligibleDividendTaxCredit: 0.0551,
  },
]

/**
 * Helper function to get province by code
 */
export function getProvinceByCode2026(code: string): Province | undefined {
  return PROVINCES_2026.find((p) => p.code === code)
}

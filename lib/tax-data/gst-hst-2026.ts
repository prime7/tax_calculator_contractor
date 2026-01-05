/**
 * GST/HST/PST Sales Tax Data for 2026
 *
 * Types of sales tax in Canada:
 * - GST: Federal Goods and Services Tax (5%)
 * - HST: Harmonized Sales Tax (combines federal and provincial)
 * - PST: Provincial Sales Tax (separate from GST, may not be recoverable)
 * - QST: Quebec Sales Tax (similar to HST but administered separately)
 *
 * For businesses:
 * - GST/HST paid on business expenses can be claimed as Input Tax Credits (ITCs)
 * - PST is generally NOT recoverable
 *
 * Source: Canada Revenue Agency
 * https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html
 */

export interface ProvinceGSTHST {
  type: "gst" | "hst" | "gst+pst" | "gst+qst"
  rate?: number // For HST provinces
  gstRate?: number // For GST+PST/QST provinces
  pstRate?: number // For PST provinces
  qstRate?: number // For Quebec
  totalRate: number // Combined rate for calculations
  pstRecoverable?: boolean // Whether PST can be claimed as ITC
}

export const GST_HST_2026 = {
  year: 2026,
  federalGSTRate: 0.05, // 5% GST nationwide

  provinces: {
    AB: {
      type: "gst" as const,
      rate: 0.05,
      totalRate: 0.05,
      description: "GST only, no provincial sales tax",
    },
    BC: {
      type: "gst+pst" as const,
      gstRate: 0.05,
      pstRate: 0.07,
      totalRate: 0.12,
      pstRecoverable: false,
      description: "GST + PST (PST NOT recoverable as ITC)",
    },
    SK: {
      type: "gst+pst" as const,
      gstRate: 0.05,
      pstRate: 0.06,
      totalRate: 0.11,
      pstRecoverable: false,
      description: "GST + PST (PST NOT recoverable as ITC)",
    },
    MB: {
      type: "gst+pst" as const,
      gstRate: 0.05,
      pstRate: 0.07,
      totalRate: 0.12,
      pstRecoverable: false,
      description: "GST + PST (PST NOT recoverable as ITC)",
    },
    ON: {
      type: "hst" as const,
      rate: 0.13,
      totalRate: 0.13,
      description: "HST (fully recoverable as ITC)",
    },
    QC: {
      type: "gst+qst" as const,
      gstRate: 0.05,
      qstRate: 0.09975,
      totalRate: 0.14975,
      description: "GST + QST (both recoverable as ITCs)",
    },
    NB: {
      type: "hst" as const,
      rate: 0.15,
      totalRate: 0.15,
      description: "HST (fully recoverable as ITC)",
    },
    NS: {
      type: "hst" as const,
      rate: 0.15, // Reduced from 15% to 14% in April 2025, may be 14% in 2026
      totalRate: 0.15,
      description: "HST (fully recoverable as ITC)",
      note: "Rate may be 14% - verify current rate",
    },
    PE: {
      type: "hst" as const,
      rate: 0.15,
      totalRate: 0.15,
      description: "HST (fully recoverable as ITC)",
    },
    NL: {
      type: "hst" as const,
      rate: 0.15,
      totalRate: 0.15,
      description: "HST (fully recoverable as ITC)",
    },
    YT: {
      type: "gst" as const,
      rate: 0.05,
      totalRate: 0.05,
      description: "GST only, no territorial sales tax",
    },
    NT: {
      type: "gst" as const,
      rate: 0.05,
      totalRate: 0.05,
      description: "GST only, no territorial sales tax",
    },
    NU: {
      type: "gst" as const,
      rate: 0.05,
      totalRate: 0.05,
      description: "GST only, no territorial sales tax",
    },
  },

  // Reporting period thresholds
  reportingThresholds: {
    monthly: 6000000, // Revenue > $6M = monthly reporting
    quarterly: 1500000, // Revenue > $1.5M = quarterly reporting
    annual: 0, // Default for smaller businesses
  },

  // Registration threshold
  registrationThreshold: {
    amount: 30000,
    description: "Businesses with revenue over $30,000 in 4 consecutive quarters must register",
  },
}

/**
 * Helper function to get province GST/HST data
 */
export function getProvinceGSTHST(provinceCode: string): ProvinceGSTHST | undefined {
  return GST_HST_2026.provinces[provinceCode as keyof typeof GST_HST_2026.provinces]
}

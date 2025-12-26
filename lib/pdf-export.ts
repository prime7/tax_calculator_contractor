import jsPDF from 'jspdf'
import type { ComparisonResult } from './types'
import { formatCurrency, formatPercentage } from './tax-calculation'

export function generateTaxReportPDF(result: ComparisonResult, province: string, income: number): void {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(20)
  doc.text('Canadian Contractor Tax Calculator Report', 20, 30)

  // Input summary
  doc.setFontSize(12)
  doc.text(`Annual Income: ${formatCurrency(income)}`, 20, 50)
  doc.text(`Province: ${province}`, 20, 60)

  let yPos = 80

  // Sole Proprietorship Section
  doc.setFontSize(14)
  doc.text('Sole Proprietorship', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  const sole = result.soleProprietorship
  doc.text(`Net Income: ${formatCurrency(sole.netIncome)}`, 30, yPos)
  yPos += 8
  doc.text(`Total Tax: ${formatCurrency(sole.totalTax)}`, 30, yPos)
  yPos += 8
  doc.text(`Effective Rate: ${formatPercentage(sole.effectiveRate)}`, 30, yPos)
  yPos += 8
  doc.text(`RRSP Room: ${formatCurrency(sole.rrspRoom)}`, 30, yPos)
  yPos += 15

  // Corporation Section
  doc.setFontSize(14)
  doc.text('Incorporation', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  const corp = result.corporation
  doc.text(`Net Income: ${formatCurrency(corp.netIncome)}`, 30, yPos)
  yPos += 8
  doc.text(`Total Tax: ${formatCurrency(corp.totalTax)}`, 30, yPos)
  yPos += 8
  doc.text(`Effective Rate: ${formatPercentage(corp.effectiveRate)}`, 30, yPos)
  yPos += 8
  doc.text(`Salary: ${formatCurrency(corp.salary)}`, 30, yPos)
  yPos += 8
  doc.text(`Dividends: ${formatCurrency(corp.dividendsPaid)}`, 30, yPos)
  yPos += 8
  doc.text(`RRSP Room: ${formatCurrency(corp.rrspRoom)}`, 30, yPos)
  yPos += 15

  // Comparison
  doc.setFontSize(14)
  doc.text('Comparison', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  const savings = result.taxSavings > 0 ? 'Incorporation' : 'Sole Proprietorship'
  doc.text(`Recommended: ${savings}`, 30, yPos)
  yPos += 8
  doc.text(`Tax Savings: ${formatCurrency(Math.abs(result.taxSavings))}`, 30, yPos)
  yPos += 8
  doc.text(`Savings Percentage: ${formatPercentage(result.savingsPercentage)}`, 30, yPos)

  // Footer
  yPos += 20
  doc.setFontSize(8)
  doc.text('This report is for informational purposes only. Consult a tax professional for personalized advice.', 20, yPos)

  // Save the PDF
  doc.save('tax-calculator-report.pdf')
}
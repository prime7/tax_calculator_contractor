# 🍁 Canadian Contractor Tax Calculator

A comprehensive tax planning tool for Canadian contractors and business owners to compare sole proprietorship vs. incorporation strategies.

## 🎯 Features

### ✅ Complete Tax Calculations
- **Federal & Provincial Tax**: Accurate 2024 tax brackets for all provinces and territories
- **CPP/QPP Contributions**: Includes both employee and employer portions
- **EI Premiums**: Employment Insurance calculations (including Quebec's reduced rates)
- **QPIP**: Quebec Parental Insurance Plan for Quebec residents
- **Ontario Health Premium**: Automatic calculation for Ontario residents
- **Quebec Abatement**: 16.5% federal tax reduction for Quebec

### 💼 Business Structure Comparison
- **Sole Proprietorship**: Direct income taxation with self-employed deductions
- **Corporation**: Salary/dividend mix optimization with corporate tax deferral
- **Optimal Salary Calculator**: Finds the best salary/dividend split to minimize taxes
- **Small Business Deduction**: Properly handles the $500,000 SBD limit

### 📊 Advanced Features
- **Real-time Calculations**: Instant updates as you adjust salary/dividend mix
- **Visual Charts**: Tax breakdown and comparison charts
- **Detailed Breakdown**: Line-by-line tax calculation display
- **RRSP Room Tracking**: Shows contribution room created by earned income
- **Effective Tax Rate**: Clear percentage of total tax burden

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Clean Interface**: Modern, professional UI with Tailwind CSS
- **Interactive Sliders**: Easy salary/dividend adjustment
- **Collapsible Sections**: Advanced options and detailed breakdowns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tax_app

# Install dependencies
npm install
# or
pnpm install
# or
bun install

# Run development server
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Cloudflare Pages

```bash
npm run deploy
```

## 📖 How to Use

### 1. Enter Your Income
- Input your annual gross contract income
- Select your province or territory
- Optionally add business deductions (default is 15%)

### 2. Calculate
- Click "Calculate Tax Comparison"
- The calculator finds the optimal salary/dividend mix
- View results for both sole proprietorship and corporation

### 3. Adjust & Compare
- Use the salary/dividend slider to test different mixes
- See real-time updates to tax calculations
- Compare effective tax rates and net income

### 4. Review Details
- Expand "Detailed Breakdown" for line-by-line calculations
- View tax breakdown charts
- Check RRSP room created

## 💡 Tax Planning Tips

### When to Incorporate

**Consider incorporation if:**
- Annual income > $80,000-$100,000
- You can leave money in the corporation
- You want income splitting opportunities
- You need liability protection

**Stay sole proprietor if:**
- Annual income < $60,000
- You need all income for living expenses
- You want simplicity and lower accounting costs
- You're just starting out

### Optimal Salary Strategies

1. **CPP Max Strategy**: Pay salary up to CPP maximum ($68,500) to maximize pension benefits
2. **Basic Personal Amount**: Pay salary equal to basic personal amount (~$15,000) to minimize taxes
3. **Zero Salary**: Take all dividends if you have other income sources or RRSP room isn't important
4. **Balanced Approach**: Mix salary and dividends based on your specific situation

### Province-Specific Considerations

#### Ontario
- Health Premium adds $0-$900 depending on income
- Higher combined corporate rate (12.2%)
- Consider salary around $50,000-$70,000 range

#### Quebec
- QPP rate is higher than CPP (6.4% vs 5.95%)
- QPIP adds additional 0.494% for employees
- Federal tax abatement reduces federal tax by 16.5%
- Reduced EI rates (no parental benefits)

#### Alberta
- No provincial health premium
- Lower combined corporate rate (11%)
- More favorable for high-income earners

#### British Columbia
- No health premium (eliminated in 2020)
- Progressive tax brackets favor lower incomes
- Consider salary around $60,000-$80,000

### RRSP vs. Corporate Retention

**RRSP Advantages:**
- Immediate tax deduction
- Tax-deferred growth
- Creditor protection
- Retirement savings discipline

**Corporate Retention Advantages:**
- Lower initial tax rate (11-12% vs 26-53%)
- Flexibility in withdrawal timing
- Investment income taxed in corporation
- Estate planning opportunities

### Common Mistakes to Avoid

1. **Paying Too Much Salary**: Reduces corporate tax deferral advantage
2. **Paying No Salary**: Loses RRSP room and CPP benefits
3. **Ignoring Incorporation Costs**: $3,000-$5,000 annually in accounting/legal
4. **Not Planning Year-End**: Timing of dividends matters for tax planning
5. **Forgetting Health Premiums**: Ontario residents often overlook this

## 🔧 Technical Details

### Tax Rates (2024)

#### Federal Tax Brackets
- $0 - $55,867: 15%
- $55,867 - $111,733: 20.5%
- $111,733 - $173,205: 26%
- $173,205 - $246,752: 29%
- $246,752+: 33%

#### CPP/QPP (2024)
- CPP Rate: 5.95% (employee + employer)
- QPP Rate: 6.4% (employee + employer)
- Maximum Pensionable Earnings: $68,500
- Basic Exemption: $3,500
- Maximum Contribution: $3,867.50 (CPP) / $4,038.40 (QPP)

#### EI (2024)
- EI Rate: 1.66% (employee) + 2.324% (employer)
- Quebec EI Rate: 1.32% (employee) + 1.848% (employer)
- Maximum Insurable Earnings: $63,200
- Maximum Contribution: $1,049.12 (employee) / $1,468.77 (employer)

#### Small Business Deduction
- First $500,000: 9% federal + 0-4% provincial = 9-13% combined
- Over $500,000: 15% federal + 11.5% provincial = 26.5% combined

#### Dividend Tax Credits
- **Eligible Dividends**: 38% gross-up, 15.02% federal credit
- **Non-Eligible Dividends**: 15% gross-up, 9.03% federal credit

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages

## 📊 Calculation Methodology

### Sole Proprietorship
1. Gross Income - Business Deductions = Net Business Income
2. Calculate Federal Tax (with basic personal amount)
3. Calculate Provincial Tax (with basic personal amount)
4. Calculate CPP/QPP (self-employed rate × 2)
5. Calculate EI (optional for self-employed, set to $0)
6. Calculate QPIP (Quebec only)
7. Calculate Health Premium (Ontario only)
8. Total Tax = Federal + Provincial + CPP + EI + QPIP + Health Premium
9. Net Income = Gross Income - Total Tax - Business Deductions

### Corporation
1. Gross Income - Business Deductions = Net Business Income
2. Pay Salary (reduces corporate income)
3. Calculate Employer CPP/QPP and EI
4. Corporate Taxable Income = Net Business Income - Salary - Employer Costs
5. Calculate Corporate Tax (with SBD limit)
6. After-Tax Corporate Income = Corporate Taxable Income - Corporate Tax
7. Pay Dividends = After-Tax Corporate Income
8. Calculate Personal Tax on Salary (Federal + Provincial + Employee CPP/EI + QPIP + Health Premium)
9. Calculate Personal Tax on Dividends (with gross-up and credits)
10. Total Tax = Corporate Tax + Personal Tax + Employer Costs
11. Net Income = Salary + Dividends - Personal Tax

### Optimal Salary Algorithm
1. Test key salary points: $0, CPP max, basic personal amount, 25%, 50%, 75%, 100%
2. Calculate total tax for each point
3. Find minimum tax point
4. Fine-tune with $1,000 increments within ±$10,000 range
5. Return optimal salary amount

## ⚠️ Important Disclaimers

### Accuracy
- Tax rates are based on 2024 Canadian federal and provincial rates
- Calculations assume small business corporate tax rates
- Dividends are assumed to be non-eligible (from small business income)
- Does not account for passive income, capital gains, or other income sources

### Limitations
- Does not include provincial sales tax (PST/HST) considerations
- Does not account for incorporation costs ($3,000-$5,000 annually)
- Does not include accounting and legal fees
- Simplified business deduction calculation
- Does not consider income splitting with family members
- Does not account for TOSI (Tax on Split Income) rules

### Professional Advice
**This calculator provides estimates only and should not be considered professional tax advice.**

Always consult with:
- A licensed Chartered Professional Accountant (CPA)
- A tax lawyer for complex situations
- A financial advisor for investment strategies

Tax laws change frequently, and individual circumstances vary significantly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Improvement
- [ ] Multi-year projections
- [ ] Capital Dividend Account (CDA) tracking
- [ ] Passive income considerations
- [ ] Income splitting scenarios
- [ ] TOSI rule calculations
- [ ] Export to PDF functionality
- [ ] Save/compare multiple scenarios
- [ ] Integration with accounting software

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Tax rates sourced from Canada Revenue Agency (CRA)
- Provincial tax data from respective provincial governments
- Built with Next.js, Tailwind CSS, and Radix UI

## 📞 Support

For questions or issues:
1. Check the [Issues](../../issues) page
2. Review the tax planning tips above
3. Consult with a licensed CPA for personalized advice

---

**Last Updated**: December 2024  
**Tax Year**: 2024  
**Version**: 2.0.0

Made with 🍁 for Canadian contractors and business owners

# Tax Calculator Validation Tests

## Test Case 1: Ontario Contractor - $100,000

### Input
- Gross Income: $100,000
- Province: Ontario (ON)
- Business Deductions: $15,000 (15% default)

### Expected Sole Proprietorship Results
- Net Business Income: $85,000
- Federal Tax (after $15,705 BPA): ~$10,394
- Provincial Tax (after $11,865 BPA): ~$6,682
- CPP (self-employed): ~$6,999
- EI: $0 (optional for self-employed)
- Ontario Health Premium: ~$600
- **Total Tax: ~$24,675**
- **Net Income: ~$60,325**
- **Effective Rate: ~24.7%**

### Expected Corporation Results (Optimal Salary ~$65,000)
- Salary: $65,000
- Employee CPP: ~$3,651
- Employer CPP: ~$3,651
- Employee EI: ~$1,049
- Employer EI: ~$1,469
- Corporate Taxable Income: ~$14,180
- Corporate Tax (12.2%): ~$1,730
- Dividends: ~$12,450
- Personal Tax on Salary: ~$8,500
- Personal Tax on Dividends: ~$500
- Ontario Health Premium: ~$600
- **Total Tax: ~$21,150**
- **Net Income: ~$63,850**
- **Savings: ~$3,525 (14.3%)**

---

## Test Case 2: Alberta Contractor - $150,000

### Input
- Gross Income: $150,000
- Province: Alberta (AB)
- Business Deductions: $22,500 (15% default)

### Expected Sole Proprietorship Results
- Net Business Income: $127,500
- Federal Tax (after $15,705 BPA): ~$20,869
- Provincial Tax (after $21,885 BPA): ~$10,562
- CPP (self-employed): ~$7,735
- EI: $0
- **Total Tax: ~$39,166**
- **Net Income: ~$88,334**
- **Effective Rate: ~26.1%**

### Expected Corporation Results (Optimal Salary ~$68,500)
- Salary: $68,500 (CPP max)
- Employee CPP: ~$3,868
- Employer CPP: ~$3,868
- Employee EI: ~$1,049
- Employer EI: ~$1,469
- Corporate Taxable Income: ~$49,146
- Corporate Tax (11%): ~$5,406
- Dividends: ~$43,740
- Personal Tax on Salary: ~$10,200
- Personal Tax on Dividends: ~$2,500
- **Total Tax: ~$28,360**
- **Net Income: ~$99,140**
- **Savings: ~$10,806 (27.6%)**

---

## Test Case 3: Quebec Contractor - $200,000

### Input
- Gross Income: $200,000
- Province: Quebec (QC)
- Business Deductions: $30,000 (15% default)

### Expected Sole Proprietorship Results
- Net Business Income: $170,000
- Federal Tax (after $15,705 BPA, with 16.5% abatement): ~$26,500
- Provincial Tax (after $18,056 BPA): ~$31,000
- QPP (self-employed): ~$8,077
- QPIP (self-employed): ~$825
- EI: $0
- **Total Tax: ~$66,402**
- **Net Income: ~$103,598**
- **Effective Rate: ~33.2%**

### Expected Corporation Results (Optimal Salary ~$70,000)
- Salary: $70,000
- Employee QPP: ~$4,038
- Employer QPP: ~$4,038
- Employee EI: ~$834
- Employer EI: ~$1,168
- QPIP Employee: ~$346
- QPIP Employer: ~$484
- Corporate Taxable Income: ~$89,092
- Corporate Tax (12.2%): ~$10,869
- Dividends: ~$78,223
- Personal Tax on Salary: ~$13,500
- Personal Tax on Dividends: ~$8,500
- **Total Tax: ~$51,777**
- **Net Income: ~$118,223**
- **Savings: ~$14,625 (22%)**

---

## Test Case 4: Low Income - $50,000 (Ontario)

### Input
- Gross Income: $50,000
- Province: Ontario (ON)
- Business Deductions: $7,500 (15% default)

### Expected Results
- **Sole Prop Total Tax: ~$8,500 (17%)**
- **Corporation Total Tax: ~$9,200 (18.4%)**
- **Recommendation: Sole Proprietorship**
- At lower incomes, incorporation costs outweigh tax savings

---

## Test Case 5: High Income - $500,000 (Ontario)

### Input
- Gross Income: $500,000
- Province: Ontario (ON)
- Business Deductions: $75,000 (15% default)

### Expected Results
- **Sole Prop Total Tax: ~$185,000 (37%)**
- **Corporation Total Tax: ~$145,000 (29%)**
- **Savings: ~$40,000 (21.6%)**
- At high incomes, incorporation provides significant tax deferral

---

## Test Case 6: SBD Limit Test - $600,000 (Ontario)

### Input
- Gross Income: $600,000
- Province: Ontario (ON)
- Business Deductions: $90,000 (15% default)

### Expected Corporation Results
- Net Business Income: $510,000
- First $500,000 at 12.2%: $61,000
- Next $10,000 at 26.5%: $2,650
- **Total Corporate Tax: ~$63,650**
- Demonstrates proper SBD limit handling

---

## Validation Checklist

### ✅ Tax Bracket Calculations
- [ ] Federal brackets apply correctly
- [ ] Provincial brackets apply correctly
- [ ] Basic personal amounts deducted properly
- [ ] Progressive taxation works correctly

### ✅ CPP/QPP Calculations
- [ ] Self-employed pays double rate
- [ ] Employee portion calculated correctly
- [ ] Employer portion calculated correctly
- [ ] Maximum contributions enforced
- [ ] Quebec uses QPP rates

### ✅ EI Calculations
- [ ] Employee rate correct (1.66%)
- [ ] Employer rate correct (2.324%)
- [ ] Quebec reduced rates applied
- [ ] Maximum contributions enforced
- [ ] Self-employed EI is optional ($0)

### ✅ QPIP Calculations (Quebec Only)
- [ ] Employee rate correct (0.494%)
- [ ] Employer rate correct (0.692%)
- [ ] Self-employed rate correct (0.878%)
- [ ] Maximum insurable earnings enforced

### ✅ Ontario Health Premium
- [ ] Applies only to Ontario residents
- [ ] Brackets calculated correctly
- [ ] Maximum $900 enforced

### ✅ Quebec Abatement
- [ ] 16.5% reduction in federal tax
- [ ] Applies only to Quebec residents

### ✅ Dividend Tax Credits
- [ ] Non-eligible dividend gross-up (15%)
- [ ] Federal credit applied (9.03%)
- [ ] Provincial credit applied (varies by province)
- [ ] Integration with salary income

### ✅ Small Business Deduction
- [ ] First $500,000 at small business rate
- [ ] Income over $500,000 at general rate
- [ ] Proper split calculation

### ✅ RRSP Room
- [ ] 18% of earned income
- [ ] Maximum $31,560 enforced
- [ ] Only salary creates room (not dividends)

### ✅ Business Deductions
- [ ] Default 15% applied if not specified
- [ ] User input respected when provided
- [ ] Reduces taxable income properly

### ✅ Optimal Salary Algorithm
- [ ] Tests key salary points
- [ ] Finds minimum tax scenario
- [ ] Fine-tunes around optimal
- [ ] Returns reasonable result

---

## Known Edge Cases

### 1. Very Low Income (<$20,000)
- May show negative tax due to basic personal amount
- Should be handled with Math.max(0, tax)

### 2. Income Exactly at Bracket Boundaries
- Should handle $55,867, $111,733, etc. correctly
- No double taxation at boundaries

### 3. Zero Salary in Corporation
- Should calculate properly with all dividends
- No CPP/EI contributions
- No RRSP room created

### 4. Salary Exceeds Net Business Income
- Should cap salary at net business income
- No negative corporate income

### 5. Quebec with High Income
- Federal abatement + high provincial rates
- QPP + QPIP + reduced EI
- Complex interaction of all factors

---

## Manual Verification Steps

1. **Compare with CRA Tax Calculator**
   - Use official CRA calculator for personal tax
   - Verify federal and provincial amounts match

2. **Check CPP/EI Maximums**
   - Verify 2024 rates from CRA website
   - Confirm maximum contributions

3. **Validate Province-Specific Rules**
   - Ontario Health Premium brackets
   - Quebec abatement and QPIP
   - Provincial dividend tax credits

4. **Test Optimal Salary**
   - Manually test several salary points
   - Confirm algorithm finds true minimum

5. **Cross-Reference with Accountant**
   - Provide sample calculations to CPA
   - Verify methodology and results

---

## Regression Tests

Run these tests after any code changes:

```typescript
// Test 1: Basic calculation
const result1 = calculateSoleProprietorship(100000, "ON", 15000)
assert(result1.totalTax > 20000 && result1.totalTax < 30000)

// Test 2: Corporation calculation
const result2 = calculateCorporation(100000, "ON", 65000, 15000)
assert(result2.totalTax < result1.totalTax)

// Test 3: Quebec abatement
const result3 = calculateSoleProprietorship(100000, "QC", 15000)
assert(result3.federalTax < result1.federalTax)

// Test 4: Optimal salary
const optimal = findOptimalSalary(150000, "AB", 22500)
assert(optimal > 0 && optimal < 150000)

// Test 5: SBD limit
const result5 = calculateCorporation(600000, "ON", 100000, 90000)
assert(result5.corporateTax > 60000)
```

---

## Performance Benchmarks

- Single calculation: <10ms
- Optimal salary search: <100ms
- Full comparison: <150ms
- UI update: <50ms

---

## Accuracy Targets

- Tax calculations: ±$100 vs. CRA calculator
- CPP/EI: Exact match to CRA tables
- Optimal salary: Within $1,000 of true optimal
- Effective rate: ±0.1%

---

**Last Updated**: December 2024  
**Validated Against**: CRA 2024 tax tables

import React, { useState } from 'react'

export default function CarEMI() {
  const [vehiclePrice, setVehiclePrice] = useState('')
  const [rate, setRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [cashIncentives, setCashIncentives] = useState('0')
  const [downPayment, setDownPayment] = useState('0')
  const [tradeInValue, setTradeInValue] = useState('0')
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState('0')
  const [hasTradeIn, setHasTradeIn] = useState(false)
  const [salesTax, setSalesTax] = useState('0')
  const [otherFees, setOtherFees] = useState('0')
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState(false)

  const [result, setResult] = useState(null)

  function toNumber(v) { const n = parseFloat(v); return Number.isFinite(n) ? n : 0 }

  function formatCurrency(v) { return v == null ? '-' : v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }) }

  function calculateEMI(e) {
    e.preventDefault()

    const P0 = toNumber(vehiclePrice)
    const cash = toNumber(cashIncentives)
    const down = toNumber(downPayment)
    const trade = hasTradeIn ? toNumber(tradeInValue) : 0
    const owed = hasTradeIn ? toNumber(amountOwedOnTradeIn) : 0
    const fees = toNumber(otherFees)
    const taxPct = toNumber(salesTax)
    const annual = toNumber(rate)
    const n = parseInt(tenure, 10) || 0

    // taxable base typically vehicle price minus incentives
    const taxableBase = Math.max(0, P0 - cash)
    const taxAmount = taxableBase * (taxPct / 100)

    // financed principal calculation
    // start with vehicle price minus incentives
    let financed = P0 - cash
    // subtract down payment and trade-in value
    financed = financed - down - trade
    // if trade-in has amount owed, that adds to financed
    financed = financed + owed
    // include taxes and fees into loan if selected
    if (includeFeesInLoan) financed = financed + taxAmount + fees

    financed = Math.max(0, financed)

    // EMI calc
    const r = annual / 100 / 12
    let monthly = null
    if (r > 0 && n > 0) {
      const x = Math.pow(1 + r, n)
      monthly = financed * r * x / (x - 1)
    } else if (n > 0) {
      monthly = financed / n
    }

    const totalPayments = monthly ? monthly * n : 0
    const totalInterest = Math.max(0, totalPayments - financed)
    const upfrontPayment = down + cash + (hasTradeIn ? Math.max(0, trade - owed) : 0)
    const totalCost = toNumber(P0) + totalInterest + taxAmount + fees

    setResult({ financed, taxAmount, monthly, totalPayments, totalInterest, upfrontPayment, totalCost })
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">Car EMI Calculator</h3>
              <form onSubmit={calculateEMI}>
                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Auto Price</label>
                  <div className="col-6">
                    <input className="form-control" type="number" step="0.01" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="e.g. 30000" />
                  </div>
                </div>

                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Loan Term (months)</label>
                  <div className="col-6">
                    <input className="form-control" type="number" value={tenure} onChange={e => setTenure(e.target.value)} placeholder="60" />
                  </div>
                </div>

                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Interest Rate (%)</label>
                  <div className="col-6">
                    <input className="form-control" type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} placeholder="5" />
                  </div>
                </div>

                  <div className="mb-2 row">
                    <label className="col-6 col-form-label">Cash Incentives</label>
                    <div className="col-6">
                      <input className="form-control" type="number" step="0.01" value={cashIncentives} onChange={e => setCashIncentives(e.target.value)} />
                    </div>
                  </div>

                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Down Payment</label>
                  <div className="col-6">
                    <input className="form-control" type="number" step="0.01" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
                  </div>
                </div>

                

                

                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Sales Tax (%)</label>
                  <div className="col-6">
                    <input className="form-control" type="number" step="0.01" value={salesTax} onChange={e => setSalesTax(e.target.value)} />
                  </div>
                </div>

                <div className="mb-2 row">
                  <label className="col-6 col-form-label">Title, Registration and Other Fees</label>
                  <div className="col-6">
                    <input className="form-control" type="number" step="0.01" value={otherFees} onChange={e => setOtherFees(e.target.value)} />
                  </div>
                </div>


                

                <div className="mb-2 form-check">
                  <input className="form-check-input" type="checkbox" id="hasTradeIn" checked={hasTradeIn} onChange={e => setHasTradeIn(e.target.checked)} />
                  <label className="form-check-label" htmlFor="hasTradeIn">I have a trade-in</label>
                </div>

                {hasTradeIn && (
                  <>
                    <div className="mb-2 row">
                      <label className="col-6 col-form-label">Trade-in Value</label>
                      <div className="col-6">
                        <input className="form-control" type="number" step="0.01" value={tradeInValue} onChange={e => setTradeInValue(e.target.value)} />
                      </div>
                    </div>

                    <div className="mb-2 row">
                      <label className="col-6 col-form-label">Amount Owed on Trade-in</label>
                      <div className="col-6">
                        <input className="form-control" type="number" step="0.01" value={amountOwedOnTradeIn} onChange={e => setAmountOwedOnTradeIn(e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="includeFees" checked={includeFeesInLoan} onChange={e => setIncludeFeesInLoan(e.target.checked)} />
                  <label className="form-check-label" htmlFor="includeFees">Include taxes and fees in loan</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-success" type="submit">Calculate</button>
                </div>
              </form>

              {result && (
                <div className="mt-3">
                  <div className="p-2 mb-2" style={{ background: '#2e8b57', color: 'white' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ fontSize: '1.25rem' }}>Monthly Pay:</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{result.monthly ? formatCurrency(result.monthly) : '-'}</div>
                    </div>
                  </div>

                  <div className="mb-1 d-flex justify-content-between"><div>Total Loan Amount</div><div>{formatCurrency(result.financed)}</div></div>
                  <div className="mb-1 d-flex justify-content-between"><div>Sale Tax</div><div>{formatCurrency(result.taxAmount)}</div></div>
                  <div className="mb-1 d-flex justify-content-between"><div>Upfront Payment</div><div>{formatCurrency(result.upfrontPayment)}</div></div>

                  <div className="mt-2 mb-1 d-flex justify-content-between"><div>Total of {tenure || 0} Loan Payments</div><div>{formatCurrency(result.totalPayments)}</div></div>
                  <div className="mb-1 d-flex justify-content-between"><div>Total Loan Interest</div><div>{formatCurrency(result.totalInterest)}</div></div>
                  <div className="mb-1 d-flex justify-content-between"><div>Total Cost (price, interest, tax, fees)</div><div>{formatCurrency(result.totalCost)}</div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

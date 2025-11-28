const qs = id => document.getElementById(id)
const fmt = n => n.toLocaleString('en-PK')

const calc = () => {
  const car = Number(qs('carModel').value)
  const variant = qs('variant').value
  const tenure = Number(qs('tenure').value)
  const deposit = Number(qs('deposit').value)
  const booking = Number(qs('booking').value)
  const procType = qs('procFeeOpt').value
  const insurance = Number(qs('insurance').value)

  if(!car || !tenure){
    alert("Please select a car and tenure.")
    return
  }

  let price = car
  if(variant === "deluxe") price *= 1.05
  if(variant === "sports") price *= 1.10
  price = Math.round(price)

  const loanAmount = Math.max(0, price - deposit)

  let rate = 0.1
  if(tenure <= 12) rate = 0.08
  else if(tenure <= 36) rate = 0.10
  else rate = 0.12

  const r = rate / 12
  const n = tenure
  const monthly = Math.round(loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1))

  let procFee = 15000
  if(procType === "percent") procFee = Math.round(loanAmount * 0.01)

  const totalPay = Math.round((monthly * tenure) + booking + insurance + procFee)

  qs('outCarPrice').textContent = "PKR " + fmt(price)
  qs('outDeposit').textContent = "PKR " + fmt(deposit)
  qs('outLoanAmount').textContent = "PKR " + fmt(loanAmount)
  qs('outRate').textContent = (rate*100).toFixed(2) + "%"
  qs('outMonthly').textContent = "PKR " + fmt(monthly)
  qs('outTotal').textContent = "PKR " + fmt(totalPay)

  qs('notes').textContent =
    "Processing Fee: PKR " + fmt(procFee) +
    " | Booking: PKR " + fmt(booking) +
    " | Insurance: PKR " + fmt(insurance)

  qs('results').classList.remove('hidden')
}

const resetAll = () => {
  qs('loanForm').reset()
  qs('results').classList.add('hidden')
}

qs('calculateBtn').addEventListener('click', calc)
qs('resetBtn').addEventListener('click', resetAll)

import { getCoefficient, getKA, getMP } from './utils';

function income(monthlyTotal: number, correctionFactor: number): number {
  return monthlyTotal / correctionFactor;
}

function createCalculateIncomeCreditPayment() {
  let previousMonthlyTotalValue = 0;
  let previousTotalPercentCreditPayment = 0;

  return function calculateIncomeCreditPayment(
    amount: number,
    periodMonths: number,
    interestRate: number,
    maxSum: number,
  ) {
    const MP = getMP(interestRate);
    const KA = getKA(MP, periodMonths);
    const correctionFactor = getCoefficient(amount);

    let monthlyTotalValue = previousMonthlyTotalValue;
    let totalPercentValue = previousTotalPercentCreditPayment;

    if (amount <= maxSum) {
      monthlyTotalValue = KA * amount;
      totalPercentValue = monthlyTotalValue * periodMonths - amount;
    }

    previousMonthlyTotalValue = monthlyTotalValue;
    previousTotalPercentCreditPayment = totalPercentValue;

    const incomeValue = income(monthlyTotalValue, correctionFactor);

    return {
      income: Math.round(incomeValue * 100) / 100,
      monthlyTotalCreditPayment: Math.round(monthlyTotalValue * 100) / 100,
      totalPercentCreditPayment: Math.round(totalPercentValue * 100) / 100,
    };
  };
}

const calculateIncomeCreditPayment = createCalculateIncomeCreditPayment();

export { calculateIncomeCreditPayment };

import { getCoefficient, getMP, getKA } from './utils';

function monthlyTotal(monthlyIncome: number, coefficient: number): number {
  return monthlyIncome * coefficient;
}

function maxPossibleSum(monthlyTotal: number, KA: number, maxSum: number, minSum: number): number {
  if (monthlyTotal / KA > maxSum) {
    return maxSum;
  } else if (monthlyTotal / KA < minSum) {
    return minSum;
  } else {
    return monthlyTotal / KA;
  }
}

function totalPercent(
  monthlyTotalValue: number,
  periodMonths: number,
  maxPossibleSum: number,
): number {
  return monthlyTotalValue * periodMonths - maxPossibleSum;
}

export function calculateSumCreditPayment(
  monthlyIncome: number,
  periodMonths: number,
  minSum: number,
  maxSum: number,
  interestRate: number,
) {
  const MP = getMP(interestRate);
  const KA = getKA(MP, periodMonths);

  const maxPossibleSumValue = maxPossibleSum(
    monthlyTotal(monthlyIncome, getCoefficient(monthlyIncome)),
    KA,
    maxSum,
    minSum,
  );
  const monthlyTotalValue = monthlyTotal(maxPossibleSumValue, KA);
  const totalPercentValue = totalPercent(monthlyTotalValue, periodMonths, maxPossibleSumValue);

  return {
    maxPossibleSum: Math.round(maxPossibleSumValue * 100) / 100,
    monthlyTotalCreditPayment: Math.round(monthlyTotalValue * 100) / 100,
    totalPercentCreditPayment: Math.round(totalPercentValue * 100) / 100,
  };
}

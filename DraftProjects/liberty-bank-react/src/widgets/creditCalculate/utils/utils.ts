export function getCoefficient(amount: number) {
  switch (true) {
    case amount < 50000:
      return 0.3;
    case amount >= 50000 && amount < 100000:
      return 0.4;
    case amount >= 100000 && amount < 200000:
      return 0.5;
    case amount >= 200000:
      return 0.6;
    default:
      return 0;
  }
}

export function getMP(interestRate: number) {
  return interestRate / 12 / 100;
}

export function getKA(MP: number, periodMonths: number) {
  return (MP * Math.pow(1 + MP, periodMonths)) / (Math.pow(1 + MP, periodMonths) - 1);
}

export const validateValueNumber = (value: string): string => {
  return value.replace(/^0+|[^\d]*/, '');
};

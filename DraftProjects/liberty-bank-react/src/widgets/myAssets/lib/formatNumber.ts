export const getSign = (number: number) => {
  return number > 0 ? '+' : '';
};

export const formatNumber = (
  number: number,
  decimalOrder: number = 0,
  withSign: boolean = true,
) => {
  const sign = withSign ? getSign(number) : '';
  return sign + Intl.NumberFormat('de-DE', { minimumFractionDigits: decimalOrder }).format(number);
};

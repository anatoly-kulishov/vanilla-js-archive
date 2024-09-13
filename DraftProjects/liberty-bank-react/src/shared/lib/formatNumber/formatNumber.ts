export const getSign = (number: number) => {
  return number > 0 ? '+' : '';
};

export const formatNumber = (number: number, withSign: boolean = true) => {
  const sign = withSign ? getSign(number) : '';
  return sign + number.toFixed(2).replace('.', ',');
};

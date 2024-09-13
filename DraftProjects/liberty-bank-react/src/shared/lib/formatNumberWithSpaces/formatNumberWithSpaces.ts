export const formatNumberWithSpaces = (value: number, decimals: number = 0): string => {
  if (decimals > 0) {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })
      .format(value)
      .replace(/\./g, ',')
      .replace(/\u00A0/g, ' ')
      .trim();
  }
  return value
    .toLocaleString('ru-RU')
    .replace(/\u00A0/g, ' ')
    .trim();
};

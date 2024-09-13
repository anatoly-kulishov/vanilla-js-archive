export const getPriceRange = (prices: number[], size: string): string[] => {
  let min: number = Math.min(...prices);
  let max: number = Math.max(...prices);
  const resPrices: string[] = [];
  let currentNumber: number;
  let currentString: string;
  const range: number = roundRange((max - min) / (size === 'small' ? 4 : 6));
  let rounding: number;

  if (range > 1) {
    rounding = 0;
    if (range >= 10) {
      max = roundNumber(max, range);
    }
    min = +Math.floor(min).toFixed(rounding);
    max = +Math.ceil(max).toFixed(rounding);
  } else {
    rounding = 2;
    min = +min.toFixed(rounding);
    max = +max.toFixed(rounding);
  }

  currentNumber = max + range;
  currentString = Number(currentNumber).toFixed(rounding);
  while (currentNumber >= min - range) {
    resPrices.push(currentString);
    currentString = Number(currentNumber - range).toFixed(rounding);
    currentNumber = +currentString;
  }

  return resPrices;
};

function roundNumber(number: number, divider: number = 10): number {
  let current: number = number;
  let multiplier: number = 1;
  let remainder: number = 0;
  let saveCurrent: number;

  while (current > divider) {
    saveCurrent = current;
    current = Math.floor(current / divider);
    remainder = multiplier > 1 ? remainder + (saveCurrent % divider) * multiplier : 0;
    multiplier *= divider;
  }

  return current * multiplier > 1 ? current * multiplier + remainder : +current.toFixed(2);
}

function roundRange(range: number): number {
  return range < 1 ? +range.toFixed(2) : range < 10 ? Math.ceil(range) : Math.ceil(range / 10) * 10;
}

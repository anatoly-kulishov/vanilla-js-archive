interface AssetSum {
  stockSum: number;
  bondsSum: number;
}

export const useCalculateAssetSum = (data: (string | number)[][]) => {
  return data.reduce(
    (acc: AssetSum, elem: (string | number)[]) => {
      if (elem[0] === 'Акция') {
        acc.stockSum += elem[5] as number;
      } else if (elem[0] === 'Облигация') {
        acc.bondsSum += elem[5] as number;
      }
      return acc;
    },
    { stockSum: 0, bondsSum: 0 },
  );
};

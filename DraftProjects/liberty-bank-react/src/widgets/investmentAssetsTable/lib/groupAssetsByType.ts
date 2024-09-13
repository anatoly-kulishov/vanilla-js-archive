export const groupAssetsByType = (data: (string | number)[][]) => {
  const sortOrder: { [key: string]: number } = { Акция: 1, Облигация: 2, Валюта: 3 };
  return data.sort((a, b) => {
    const orderA = sortOrder[a[0]];
    const orderB = sortOrder[b[0]];
    return orderA - orderB;
  });
};

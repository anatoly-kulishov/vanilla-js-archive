export const calculateAssetSum = (data: (string | number)[][]) => {
  const newData = [...data.slice(1)];
  return newData.map((item: (string | number)[]) => {
    const price = Number(item[2]);
    const quantity = Number(item[4]);
    item[5] = price * quantity;
    return item;
  });
};

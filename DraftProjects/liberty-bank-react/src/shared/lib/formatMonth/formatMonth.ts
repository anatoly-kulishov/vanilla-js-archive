export const formatMonth = (numberOfMonth: number) => {
  const month = numberOfMonth + 1;
  if (month % 10 === 1 && month !== 11) return `${month} месяц`;
  else if ([2, 3, 4].includes(month % 10) && ![12, 13, 14].includes(month % 100))
    return `${month} месяца`;
  else return `${month} месяцев`;
};

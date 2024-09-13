export const getDateFromArray = (dateArray: number[]): string => {
  const [year, month, day] = dateArray;
  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
};

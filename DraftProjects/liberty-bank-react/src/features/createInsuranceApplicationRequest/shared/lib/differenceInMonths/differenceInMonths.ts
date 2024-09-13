export function differenceInMonths(date1: Date, date2: Date) {
  const diffMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.4375; // Среднее количество миллисекунд в месяце
  const diffMonths = Math.round(diffMilliseconds / millisecondsInMonth);
  return diffMonths;
}

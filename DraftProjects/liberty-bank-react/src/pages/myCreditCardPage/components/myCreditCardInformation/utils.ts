export function formatDateToMMYY(dateString: string) {
  const [year, month] = dateString.split('-');
  return `${month}/${year.slice(-2)}`;
}

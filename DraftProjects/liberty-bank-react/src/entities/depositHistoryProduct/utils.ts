export const formatDateWithLocale = (currentDate: string) => {
  const [year, month, day] = currentDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ru-RU');
};

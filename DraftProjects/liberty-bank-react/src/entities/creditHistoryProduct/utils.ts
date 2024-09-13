export const formatDateWithLocale = (creationDate: string) => {
  const [day, month, year] = creationDate.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ru-RU');
};

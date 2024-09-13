/**
 * Возвращает количество дней до целевой даты от текущей даты.
 *
 * @param {string} targetDate - Целевая дата в формате строки (например, '2024-05-17').
 * @param {string} [currentDate] - Текущая дата в формате строки. Если не указана, используется текущая системная дата.
 * @returns {number} Количество дней до целевой даты.
 */
export const getDaysUntilDate = (targetDate: string, currentDate?: string): number => {
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const current = currentDate ? new Date(currentDate) : new Date();
  current.setHours(0, 0, 0, 0);

  return Math.round((target.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
};

const LENGTH = 15;
const MAX_NUM = Math.pow(10, LENGTH) - 1;
const MIN_NUM = Math.pow(10, LENGTH - 1);

/** Функция для расчёта уникальных id
 *
 * @returns {number} Уникальная числовая последовательность из 15-ти символов. Пример: 635973144853452
 */
export const generateUniqueID = (): number =>
  Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1) + MIN_NUM);

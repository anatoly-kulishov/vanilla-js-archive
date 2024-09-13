import { TEXT } from '../../constants';

export const createValidityTermValue = (validityTerm: number): string => {
  /*
   * validityTerm - это срок действия карты который может быть от 12
   * до 60 месяцев и кратен 1 году. Поэтому число 24 единственное
   * исключение в данном случае.
   */
  if (validityTerm) {
    if (validityTerm === 24) {
      return `${validityTerm} месяца`;
    }

    return `${validityTerm} месяцев`;
  }

  return TEXT.description.noData;
};

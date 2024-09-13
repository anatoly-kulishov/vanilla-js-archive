export const parseLocaleStringToNumber = (sting: string): number => {
  return parseFloat(sting.replace(/,/g, '.').replace(/\s+/g, ''));
};

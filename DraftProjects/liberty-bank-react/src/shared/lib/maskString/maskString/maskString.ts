/**
 * Маскирует строку, оставляя видимыми только указанное количество символов в конце.
 *
 * @param {string} string - Строка для маскировки.
 * @param {number} visibleEnding - Количество символов в конце строки, которые должны остаться видимыми.
 * @param {string} maskSymbol - Символ используемый для маскировки.
 * @returns {string} Маскированная строка, где все символы, кроме указанного количества в конце, заменены на переданный символ.
 */

export const maskString = (string: string, visibleEnding: number, maskSymbol: string): string => {
  if (visibleEnding >= string.length) {
    return string;
  }

  const maskedLength = string.length - visibleEnding;
  const maskedPart = new Array(maskedLength + 1).join(maskSymbol);

  return maskedPart + string.slice(-visibleEnding);
};

export const separation = (value: string, scale: number) => {
  const filterReg = /[^\d.,]/g;
  const intReg = /\d*/;
  const floatReg = new RegExp(`[.,]\\d{0,${scale}}`);

  const str = value.replace(filterReg, '');
  const int = Number(str.match(intReg)?.[0] || '').toLocaleString('ru-RU');
  const float = str.match(floatReg)?.[0] || '';
  return int + float;
};

/**
 * Обрабатывает значение по переданной маске.
 *
 * @param {string} value - Введенное значение.
 * @param {string} maskString - Строка с маской. Допустимые значения:
 * '*' - означает что на данную позицию встанет символ из введённого значения;
 * ' ' - пробельный символ между другими символами.
 * Например: '**** **** **** ****'.
 * @returns {string} Обработанное значение с учетом маски.
 * @throws {Error} Если маска содержит недопустимый символ.
 */
export const handleMasking = (value: string, maskString: string): string => {
  const digits = value.replace(/\D/g, '');
  let formattedValue = '';
  let digitIndex = 0;

  for (let i = 0; i < maskString.length; i++) {
    const char = maskString[i];
    if (char === '*') {
      if (digitIndex < digits.length) {
        formattedValue += digits[digitIndex];
        digitIndex++;
      }
    } else if (char === ' ') {
      if (digitIndex < digits.length) {
        formattedValue += ' ';
      }
    } else {
      throw new Error('Некорректный формат маски');
    }
  }

  if (formattedValue.length > maskString.length) {
    formattedValue = formattedValue.slice(0, maskString.length);
  }

  return formattedValue;
};

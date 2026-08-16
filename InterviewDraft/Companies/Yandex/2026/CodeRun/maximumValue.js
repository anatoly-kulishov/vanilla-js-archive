/**
 * Максимальное «числовое значение» среди строк words:
 * - только цифры → Number(str)
 * - иначе → длина строки
 */
export const maximumValue = (words) => {
    let max = 0;

    for (const word of words) {
        // /^\d+$/ — строка целиком из цифр (пустая не подойдёт)
        const value = /^\d+$/.test(word) ? Number(word) : word.length;

        if (value > max) {
            max = value;
        }
    }

    return max;
};

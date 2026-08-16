/**
 * Максимум «числовых значений» строк из words:
 * - только цифры → Number(word)
 * - иначе → длина строки
 */
export const maximumValue = (words) => {
    let max = 0;

    for (const word of words) {
        // вся строка из цифр? иначе берём length
        const value = /^\d+$/.test(word) ? Number(word) : word.length;

        if (value > max) {
            max = value;
        }
    }

    return max;
};

// maximumValue(["a", "bb", "ccc"]) // 3
// maximumValue(["1", "01", "001", "0001"]) // 1
// maximumValue(["abcdefghijklmnopqrstuvwxyz"]) // 26

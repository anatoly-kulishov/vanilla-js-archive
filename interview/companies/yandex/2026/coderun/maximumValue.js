/**
 * Максимум «числовых значений» строк из words:
 * - только цифры → число
 * - иначе → длина строки
 */
export const maximumValue = (words) => {
    let max = 0;

    for (let w = 0; w < words.length; w++) {
        const word = words[w];
        const len = word.length;

        // проверка «только цифры» без regex
        let onlyDigits = len > 0;
        for (let i = 0; i < len; i++) {
            const code = word.charCodeAt(i);
            if (code < 48 || code > 57) {
                onlyDigits = false;
                break;
            }
        }

        if (!onlyDigits) {
            if (len > max) max = len;
            continue;
        }

        // убираем ведущие нули: "00012" → смотрим с "12"
        let start = 0;
        while (start < len - 1 && word.charCodeAt(start) === 48) {
            start += 1;
        }

        const digits = len - start;

        // очень длинное число — Infinity, не парсим
        // Number(word) по всей строке с нулями — тормозит, берём slice
        const value = digits > 308 ? Infinity : Number(word.slice(start));

        if (value > max) max = value;
    }

    return max;
};

/**
 * Разбить каждую строку words по separator, собрать в один массив.
 * Пустые куски после split не включаем.
 */
export const splitWordsBySeparator = (words, separator) => {
    const result = [];

    for (const word of words) {
        for (const part of word.split(separator)) {
            if (part !== "") {
                result.push(part);
            }
        }
    }

    return result;
};

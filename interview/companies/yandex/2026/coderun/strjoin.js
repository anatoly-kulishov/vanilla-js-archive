/**
 * Необходимо написать функцию strjoin, которая склеивает строки через разделитель.
 *
 * Первый аргумент — разделитель, остальные — строки для склейки.
 * Разделитель ставится МЕЖДУ элементами, но не после последнего.
 */

function strjoin(divider, ...symbols) {
    let result = '';

    for (let i = 0; i < symbols.length; i++) {
        // Не первый элемент → сначала вставляем разделитель
        if (i > 0) result += divider;

        // Каждый элемент дописываем как есть
        result += symbols[i];
    }

    return result;
}

console.log(strjoin('.', 'a', 'b', 'c')); // 'a.b.c'
console.log(strjoin('-', 'a', 'b', 'c', 'd', 'e', 'f')); // 'a-b-c-d-e-f'
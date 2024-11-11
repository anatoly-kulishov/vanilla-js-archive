/**
 * Нужно написать функцию, которая принимает массив строк и чисел
 * и возвращает сумму всех чисел и значений строк, которые начинаются с цифр. В этом случае в качестве
 * числового значения нужно использовать эту начальную последовательность цифр.
 * Массив может содержать любые типы данных, быть не плоским.
 * ** Нельзя использовать встроенные методы типа .flat, .flatMap**
 */

function flat(list) {
    const stack = [...list];
    const result = [];

    while(stack.length) {
        const last = stack.pop();

        if(Array.isArray(last)) {
            stack.push(...last);
        } else {
            result.push(last);
        }
    }

    return result.reverse();
}

// O(2^n)
function sum(arr) {
    const flattenArr = flat(arr);

    return flattenArr.reduce((acc, curr) => {
        if(isNaN(parseInt(curr))) {
            return acc;
        }
        return acc + parseInt(curr);
    }, 0);
}

console.log(sum([1, 'x', '2x', ['3', ['x2', '5']]])); // 11

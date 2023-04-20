const testCase = require("../../../Helpers/testCase");

/**
 * flatten.
 *
 * Дан массив, в котором могут храниться любые типы данных.
 * Нужно реализовать функцию, которая разворачивает вложенные массивы в исходный массив.
 * Данные остальных типов должны остаться без изменений.
 * Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы).
 * Встроенный метод Array.prototype.flat() использовать нельзя
 */
function flatten(list) {
    const res = [];
    for (let i = 0; i < list.length; i++) {
        const curr = list[i];
        if (Array.isArray(curr)) {
            const flat = flatten(curr);
            for (let j = 0; j < flat.length; j++) {
                res.push(flat[j]);
            }
        } else {
            res.push(curr);
        }
    }
    return res;
}

function flattenLoop(list)
{
    const stack = [...list];
    const res = [];

    while (stack.length) {
        const next = stack.pop();

        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            res.push(next);
        }
    }

    return res.reverse();
}

testCase(flatten([1, 'any [complex] string', null, function () {
}, [1, 2, [3, '4'], 0], [], {a: 1}]), [1, 'any [complex] string', null, function () {
}, 1, 2, 3, '4', 0, {a: 1}], true, 'flatten');
testCase(flatten([0, [1, [2, 3]], 4]), [0, 1, 2, 3, 4]);
testCase(flatten([[1, 5]]), [1, 5]);

testCase(flattenLoop([1, 'any [complex] string', null, function () {
}, [1, 2, [3, '4'], 0], [], {a: 1}]), [1, 'any [complex] string', null, function () {
}, 1, 2, 3, '4', 0, {a: 1}], true, 'flattenLoop');
testCase(flattenLoop([0, [1, [2, 3]], 4]), [0, 1, 2, 3, 4]);
testCase(flattenLoop([[1, 5]]), [1, 5]);

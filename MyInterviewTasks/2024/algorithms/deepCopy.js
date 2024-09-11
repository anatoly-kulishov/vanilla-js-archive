const testCase = require("../../../Helpers/testCase");

function deepCopy(obj) {
    let result;

    // Примитивные типы (числа, строки, булевые значения, null и т.д.)
    if (typeof obj !== 'object' || obj === null) {
        return obj; // Примитивы возвращаются как есть
    }
    // Если obj является массивом
    if (Array.isArray(obj)) {
        result = []; // Создаем новый пустой массив
        for (let i = 0; i < obj.length; i++) {
            result[i] = deepCopy(obj[i]); // Рекурсивно копируем каждый элемент массива
        }
    }
    // Если obj является объектом (не массивом)
    if(typeof obj === 'object' && !Array.isArray(obj)) {
        result = {}; // Создаем новый пустой объект
        for (let [key, value] of Object.entries(obj)) {
            result[key] = deepCopy(value); // Рекурсивно копируем каждое значение объекта
        }
    }

    return result; // Возвращаем глубоко скопированный объект или массив
}


testCase(deepCopy([{a: {b: [{c: 1}]}}, [1, 2, 3]]), [{a: {b: [{c: 1}]}}, [1, 2, 3]]);
testCase(deepCopy([[1, '2', null], undefined, true]), [[1, '2', null], undefined, true]);
testCase(deepCopy({a: [{ b: []}]}), {a: [{ b: []}]});
testCase(deepCopy([{}, {}, {}]), [{}, {}, {}]);
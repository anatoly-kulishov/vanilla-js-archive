const testCase = require("../../../Helpers/testCase");

/**
 * Есть строка “a b a b c c e d d d d”
 * Нужно вывести массив уникальных значений, который отсортирован по частоте включения в строке
 */
function uniqueValues(str) {}

testCase(uniqueValues("a b a b c c e d d d d"), ['d', 'a', 'b', 'c', 'e'], true)

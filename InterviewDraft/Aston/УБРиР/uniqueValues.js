const testCase = require("../../../Helpers/testCase");

/**
 * Есть строка “a b a b c c e d d d d”
 * Нужно вывести массив уникальных значений, который отсортирован по частоте включения в строке
 */

function uniqueValues(str) {
	const formattedStr = str.split(" ");
	const res = [];
	const map = {};

	for (let i = 0; i < formattedStr.length; i++) {
		const current = formattedStr[i];

		if (map[current] === undefined) {
			map[current] = 1
			res.push(current)
		} else {
			map[current] = map[current] + 1
		}
	}

	return res.sort((a, b) => map[b] - map[a])
}

testCase(uniqueValues("a b a b c c e d d d d"), ['d', 'a', 'b', 'c', 'e'], true)

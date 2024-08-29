const testCase = require("../../../../Helpers/testCase");

/**
 * Есть строка вида a.b.c.d.e
 * Необходимо написать функцию, которая преобразует строку в объект вида
 * {
 *     "a": {
 *         "b": {
 *             "c": {
 *                 "d": {
 *                     "e": {}
 *                 }
 *             }
 *         }
 *     }
 * }
 */


const strToObj = (str) => {
	return str
		.split('.')
		.reverse()
		.reduce((previousValue, currentValue) => {
			let n = {};

			return n[currentValue] = previousValue, n
		}, {})
}

const expected = {
	"a": {
		"b": {
			"c": {
				"d": {
					"e": {}
				}
			}
		}
	}
}

testCase(strToObj("a.b.c.d.e"), expected, true);

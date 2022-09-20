/**
 * Есть строка вида a.b.c.d.e
 * Необходимо написать функцию которая преобразует строку в объект вида
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

const testCase = require("../../../Helpers/testCase");

const strToObj = (str) => {
	return str
		.split('.')
		.reverse()
		.reduce((acc, a) => {
			let n = {};

			return n[a] = acc, n
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
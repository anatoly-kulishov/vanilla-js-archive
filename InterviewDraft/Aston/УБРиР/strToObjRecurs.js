const testCase = require("../../../Helpers/testCase");

function strToObjRecurs(path) {
	if (path.length === 0) return {}; // возвращаем пустой объект и выходим из рекурсии

	let [key, ...rest] = path; // определяем текущий ключ

	return { // возвращаем объект с нужным ключом и уходим в рекурсию.
		[key]: strToObjRecurs(rest)
	};
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

testCase(strToObjRecurs("a.b.c.d.e".split('.')), expected, true);
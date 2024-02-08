const testCase = require("../../../../Helpers/testCase");

function flatten(array) {
	const res = [];
	for (let i = 0; i < array.length; i++) {
		if (Array.isArray(array[i])) {
			const flat = flatten(array[i]);
			for (let j = 0; j < flat.length; j++) {
				res.push(flat[j]);
			}
		} else {
			res.push(array[i])
		}
	}
	return res;
}

testCase(flatten([[[1]], [[2, 3]], [[[[4]]]]]), [1, 2, 3, 4], true);
testCase(flatten([0, [1, 2], [[3, 4, [5, [6, 7]]]], 8, [[9], [10]]]), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

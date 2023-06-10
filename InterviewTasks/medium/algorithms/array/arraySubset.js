const testCase = require("../../../../Helpers/testCase");

/**
 * @param {number[]} source
 * @param {number[]} subset
 * @returns {boolean}
 */
function arraySubset(source, subset) {

	if (source.length < subset.length) {
		return false;
	}

	for (let i = 0; i < subset.length; i++) {
		const index = source.indexOf(subset[i]);

		if (index === -1) {
			return false;
		}

		delete source[index];
	}

	return true;
}

testCase(arraySubset([2, 1, 3], [1, 2, 3]), true, true);
testCase(arraySubset([1, 1, 1, 3], [1, 3, 3]), false);
testCase(arraySubset([1, 2], [1, 2, 3]), false);

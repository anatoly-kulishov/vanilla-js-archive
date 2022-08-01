const testCase = require("../../../Helpers/testCase");

/**
 * @param str
 * @returns {*}
 */
const findVowels = (str) => {
	const VOWELS = ['a', 'e', 'i', 'o', 'u'];
	let count = 0;

	if (str.length < 1) {
		return 0;
	}

	for (let char of str.toLowerCase()) {
		if (VOWELS.includes(char)) {
			count++;
		}
	}

	return count;
}

testCase(findVowels('JAVASCRIPT'), 3, true);
testCase(findVowels('hello'), 2);
testCase(findVowels('why'), 0);
testCase(findVowels(''), 0);
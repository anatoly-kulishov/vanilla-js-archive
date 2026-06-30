const testCase = require('#shared/testCase');

function reverseString(s) {
	let left = 0;
	let right = s.length - 1;

	while (left <= right) {
		const temp = s[left];
		s[left] = s[right];
		s[right] = temp;
		left += 1;
		right -= 1;
	}

	return s;
}

module.exports = { reverseString };

testCase(reverseString(['h', 'e', 'l', 'l', 'o']), ['o', 'l', 'l', 'e', 'h'], true);
testCase(reverseString(['H', 'a', 'n', 'n', 'a', 'h']), ['h', 'a', 'n', 'n', 'a', 'H']);

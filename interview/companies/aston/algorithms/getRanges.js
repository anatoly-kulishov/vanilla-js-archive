/**
 * На вход подаётся строка типа
 * 1,2,3,5,6,9
 *
 * Нужно вывести
 * 1-3,5-6,9
 */

const testCase = require("../../../../Helpers/testCase");

const getRange = (numbers) => {
	const range = [];

	for (let i = 0; i < numbers.length; i++) {
		const current = numbers[i];

		if (current - range[range.length - 1] > 1) {
			break;
		}

		range[range.length] = current;
	}

	return range;
};

const getRanges = (numbersString) => {
	let numbers = numbersString.split(",").map(Number);
	const ranges = [];

	while (numbers.length) {
		const range = getRange(numbers);

		ranges.push(range);

		numbers = numbers.slice(range.length);
	}

	return ranges
		.reduce((acc, range) => {
			if (range.length === 1) {
				return [...acc, range[0]];
			}

			return [...acc, `${range[0]}-${range[range.length - 1]}`];
		}, [])
		.join(",");
};

testCase(getRanges("1,2,3,5,6,9"), "1-3,5-6,9", true);


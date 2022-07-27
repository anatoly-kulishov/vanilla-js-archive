const testCase = require("../../../Helper/testCase");
const timePerformanceStart = require("../../../Helper/timePerfomanceStart");
const timePerformanceResult = require("../../../Helper/timePerfomanceResult");

const time = timePerformanceStart();

/**
 * @param n
 * @returns {number[]}
 */
function fibonacci(n) {
	const sequence = [1, 1];

	if (n < 2) {
		return sequence.slice(0, n);
	}

	while (sequence.length < n) {
		const last = sequence[sequence.length - 1];
		const prev = sequence[sequence.length - 2];

		sequence.push(last + prev);
	}

	return sequence;
}

testCase(fibonacci(20), [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765], true, 'fibonacci', timePerformanceResult(time));
testCase(fibonacci(10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
testCase(fibonacci(6), [1, 1, 2, 3, 5, 8]);
testCase(fibonacci(4), [1, 1, 2, 3]);
testCase(fibonacci(2), [1, 1]);
testCase(fibonacci(1), [1]);
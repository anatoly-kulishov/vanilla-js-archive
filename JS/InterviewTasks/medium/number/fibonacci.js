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

testCase(fibonacci(8), [1, 1, 2, 3, 5, 8, 13, 21], true, 'fibonacci', timePerformanceResult(time));
testCase(fibonacci(10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
testCase(fibonacci(6), [1, 1, 2, 3, 5, 8]);
testCase(fibonacci(4), [1, 1, 2, 3]);
testCase(fibonacci(2), [1, 1]);
testCase(fibonacci(1), [1]);

/**
 * @param n
 * @returns {*}
 */
function fibonacci2(n) {
	if (n < 2) {
		return n;
	}

	return fibonacci2(n - 1) + fibonacci2(n - 2);
}

testCase(fibonacci2(10), 55, true, 'fibonacci2', timePerformanceResult(time));
testCase(fibonacci2(5), 5);
testCase(fibonacci2(1), 1);
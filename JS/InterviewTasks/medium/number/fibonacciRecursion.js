const testCase = require("../../../Helpers/testCase");
const timePerformanceStart = require("../../../Helpers/timePerfomanceStart");
const timePerformanceResult = require("../../../Helpers/timePerfomanceResult");

const time = timePerformanceStart();

/**
 * @param n
 * @returns {*}
 */
function fibonacciRecursion(n) {
	if (n < 2) {
		return n;
	}

	return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}

testCase(fibonacciRecursion(20), 6765, true, 'fibonacciRecursion', timePerformanceResult(time));
testCase(fibonacciRecursion(10), 55);
testCase(fibonacciRecursion(5), 5);
testCase(fibonacciRecursion(1), 1);
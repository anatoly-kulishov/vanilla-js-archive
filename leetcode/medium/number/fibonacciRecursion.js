const testCase = require("#shared/testCase");
const timePerformanceStart = require("#shared/timePerformanceStart");
const timePerformanceResult = require("#shared/timePerformanceResult");

const time = timePerformanceStart();

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

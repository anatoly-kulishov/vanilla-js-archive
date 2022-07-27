const testCase = require("../../../Helper/testCase");
const timePerformanceStart = require("../../../Helper/timePerfomanceStart");
const timePerformanceResult = require("../../../Helper/timePerfomanceResult");

const time = timePerformanceStart();

const input = [
	['usd', 'buy', 10000],
	['usd', 'sell', 5000],
	['gbp', 'buy', 9000],
	['eur', 'sell', 7000],
	['uah', 'buy', 10000],
	['usd', 'sell', 25000],
];

const output = {
	usd: [10000, 30000],
	gbp: [9000, 0],
	eur: [0, 7000],
	uah: [10000, 0]
}

/**
 * @param operations
 * @returns {{}}
 */
function compareCurrencies(operations) {
	const result = {};

	for (let operation of operations) {
		const [currency, type, amount] = operation;

		if (!result[currency]) {
			result[currency] = [0, 0];
		}

		result[currency][type === 'buy' ? 0 : 1] += amount;
	}

	return result;
}

testCase(compareCurrencies(input), output, true, 'compareCurrencies', timePerformanceResult(time));
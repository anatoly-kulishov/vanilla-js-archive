/**
 * Имеется магазин, в котором имеется некоторое количество касс.
 * Клиенты приходят в магазин и необходимо рассчитать количество времени через которое все клиенты пройдут эти кассы.
 * Т.е. нужно написать программу или алгоритм для расчёта времени.
 *
 * queueTime ([5,3,4], 1) - где три клиента и каждый проходит кассу 5 минут, 3 минуты и 4 минуты и имеется одна касса.
 * Время прохода будет - 12 минут.
 *
 * queueTime ([10,2,3,3], 2) - где четыре клиента и каждый проходит кассу 10 минут, 2 минуты, 3 минуты и 3 минуты.
 * Имеется две кассы.
 * Время прохода будет - 10 минут."
 */

const testCase = require("../../../../Helpers/testCase");

function queueTime(customers, tillCount) {
	if (!Array.isArray(customers)) {
		throw new Error(`InvalidArgumentException: Parameter 1 must be an array, received: ${typeof customers}`);
	} else if (!customers.every(time => Number.isInteger(time))) {
		throw new Error(`InvalidArgumentException: Parameter 1 must be an array of integers. At least one element in the array does not conform to this, received: ${customers}`);
	} else if (!Number.isInteger(tillCount)) {
		throw new Error(`InvalidArgumentException: Parameter 2 must be an integer, received: ${typeof tillCount}`);
	}

	let tills = Array(tillCount <= 0 ? 1 : tillCount).fill(0);

	customers.forEach(customer => {
		const fastest = tills.indexOf(Math.min(...tills));

		tills[fastest] += customer;
	});

	return Math.max(...tills);
}



testCase(queueTime([5, 3, 4], 1), 12, true);
testCase(queueTime([10, 2, 3, 3], 2), 10);
testCase(queueTime([2,2,3,3,4,4], 2), 9);
testCase(queueTime([1,2,3,4], 10), 4);
testCase(queueTime([1,2,3,4,5], 10), 5);
testCase(queueTime([], 1), 0);

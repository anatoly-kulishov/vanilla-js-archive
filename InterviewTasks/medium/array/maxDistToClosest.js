/**
 * You are given an array representing a row of seats where seats[i] = 1 represents a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty (0-indexed).
 * There is at least one empty seat, and at least one person sitting.
 * Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized.
 * Return that maximum distance to the closest person.
 *
 * 2 <= seats.length <= 2 * 104
 * seats[i] is 0 or 1.
 * At least one seat is empty.
 * At least one seat is occupied.
 */

const testCase = require("../../../Helpers/testCase");

/**
 * @param seats
 * @returns {number}
 * O(n)
 */
function maxDistToClosest(seats) {
	let max = 0;
	let count = 0;
	let i = 0;

	if(seats[i] === 0) {
		while (seats[i] === 0) {
			i++;
			count += 1;
		}

		max = count;
		count = 0;
	}

	for (; i < seats.length; i++) {
		const current = seats[i];

		if(i === seats.length - 1 && current === 0) {
			count += 1;
			max = Math.max(max, count);
			break;
		}

		if (current === 1) {
			count = 0;
		} else {
			count += 1;
			max = Math.max(max, Math.ceil(count / 2))
		}
	}

	return max;
}

testCase(maxDistToClosest([1, 0, 0, 0, 1, 0, 1]), 2, true, 'maxDistToClosest');
testCase(maxDistToClosest([0, 0, 0, 1, 0, 0, 0, 1]), 3);
testCase(maxDistToClosest([1, 0, 0, 0]), 3);
testCase(maxDistToClosest([0, 1]), 1);
const testCase = require("../../../../Helpers/testCase");

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

const testCase = require("../../../../Helpers/testCase");

/**
 * @param nums
 * @returns {number|*}
 */
const singleNumber = (nums) => {
	if (nums.length === 1) return nums[0];

	let uniq = new Set();
	let uniqSum = 0;
	let numSum = 0;

	for (let i = 0; i < nums.length; i++) {
		const current = nums[i];

		if (!uniq.has(current)) {
			uniq.add(current);
			uniqSum += current;
		}

		numSum += current;
	}

	return uniqSum * 2 - numSum;
};

testCase(singleNumber([4, 1, 2, 1, 2]), 4, true, 'singleNumber');
testCase(singleNumber([2, 2, 1]), 1);
testCase(singleNumber([1]), 1);

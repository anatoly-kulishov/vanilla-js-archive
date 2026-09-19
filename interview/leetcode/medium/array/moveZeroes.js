/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 */

const testCase = require("../../../../Helpers/testCase");

const moveZeroes = (nums) => {
	if (nums.length <= 1) return nums;

	let left = 0;
	let right = 0;
	let temp = null;

	while (right < nums.length) {
		if (nums[right] === 0) {
			right++;
		} else {
			// [nums[left], nums[right]] = [nums[right], nums[left]]
			temp = nums[left];
			nums[left] = nums[right];
			nums[right] = temp;

			left++;
			right++;
		}
	}

	return nums;
};

testCase(moveZeroes([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0], true);
testCase(moveZeroes([0]), [0]);

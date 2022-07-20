/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 *
 * Constraints:
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param nums
 * @returns {*}
 */
const moveZeroes = (nums) => {
  const n = nums.length;

  if (n <= 1) return nums;

  let left = 0;
  let right = 0;
  let temp = null;

  while (right < n) {
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
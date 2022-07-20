/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * 1 <= nums.length <= 3 * 104
 * -3 * 104 <= nums[i] <= 3 * 104
 * Each element in the array appears twice except for one element which appears only once.
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param nums
 * @returns {number|*}
 */
const singleNumber = (nums) => {
  const map = {};
  const n = nums.length;

  if (n === 1) {
    return nums[0];
  }

  for (let i = 0; i < n; i++) {
    const current = nums[i];
    if (map[current] !== undefined) {
      map[current] += 1;
    } else {
      map[current] = 1;
    }
  }

  for (let key in map) {
    const value = map[key];
    if(value === 1) {
      return Number(key)
    }
  }
};


testCase(singleNumber([2, 2, 1]), 1, true);
testCase(singleNumber([4, 1, 2, 1, 2]), 4);
testCase(singleNumber([1, 0, 1]), 0);
testCase(singleNumber([1]), 1);

/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param nums
 * @param target
 * @returns {[*,number]}
 */
const twoSum = (nums, target) => {
  const hashtable = {};
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let complement = target - nums[i];

    if (hashtable.hasOwnProperty(complement)) {
      return [hashtable[complement], i]
    }

    hashtable[nums[i]] = i;
  }
};

testCase(twoSum([2, 7, 11, 15], 9), [0, 1], true);
testCase(twoSum([3, 2, 4], 6), [1, 2]);
testCase(twoSum([3, 3], 6), [0, 1]);

/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 * You must write an algorithm with O(log n) runtime complexity.
 */

const testCase = require("../../../../Helpers/testCase");

/**
 * @param nums
 * @param target
 * @returns {number}
 */
const searchInsert = (nums, target) => {
  const n = nums.length;
  let pos = 0;

  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (num === target) return i;
    if(target > num) pos++;
  }

  return pos;
};

testCase(searchInsert([1, 3, 5, 6], 5), 2, true);
testCase(searchInsert([1, 3, 5, 6], 2), 1);
testCase(searchInsert([1, 3, 5, 6], 7), 4);

const testCase = require("../../../../Helpers/testCase");

/**
 * @param nums
 * @param target
 * @returns {[*,number]}
 */
const twoSum = (nums, target) => {
  const hashtable = {};

  for (let i = 0; i < nums.length; i++) {
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

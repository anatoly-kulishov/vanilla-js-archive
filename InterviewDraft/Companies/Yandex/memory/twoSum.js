const testCase = require("../../../../Helpers/testCase");

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
};


testCase(twoSum([2, 7, 11, 15], 9), [0, 1], true);
testCase(twoSum([3, 2, 4], 6), [1, 2]);
testCase(twoSum([3, 2, 3], 6), [0, 2]);
testCase(twoSum([3, 3], 6), [0, 1]);

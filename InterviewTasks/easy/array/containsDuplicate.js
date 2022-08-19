/**
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
 *
 * 1 <= nums.length <= 105
 * -109 <= nums[i] <= 109
 */

const testCase = require("../../../Helpers/testCase");

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {
    const n = nums.length;
    const map = {};

    for (let i = 0; i < n; i++) {
        const current = nums[i];
        if (map[current] === undefined) {
            map[current] = 1;
        } else {
            map[current] += 1;
            return true;
        }
    }

    return false;
};

testCase(containsDuplicate([1, 2, 3, 1]), true, true);
testCase(containsDuplicate([1, 2, 3, 4]), false);
testCase(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);